chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_TO_NOTION") {
    const { token, databaseId, payload } = message;
    
    (async () => {
      let activeDbId = databaseId;
      let newDbCreated = false;
      
      try {
        // 嘗試寫入頁面至資料庫
        let createResponse = await executeCreatePage(token, activeDbId, payload);
        
        if (!createResponse.ok) {
          const errData = await createResponse.json();
          
          const isPageNotDb = errData.message && (
            errData.message.includes("is a page") || 
            errData.message.includes("Use the pages API instead")
          );
          
          // 情況 1: 填入的是 Page ID 而不是 Database ID (回傳 404 或 object_not_found，或明確回報該 ID 是頁面而非資料庫)
          if (createResponse.status === 404 || errData.code === "object_not_found" || isPageNotDb) {
            try {
              // 嘗試直接在此頁面下建立一個新的資料庫！
              activeDbId = await createDatabase(token, databaseId);
              newDbCreated = true;
              
              // 用新建好的資料庫 ID 重新嘗試寫入
              createResponse = await executeCreatePage(token, activeDbId, payload);
              if (!createResponse.ok) {
                const retryErr = await createResponse.json();
                throw new Error(retryErr.message || `重試寫入失敗: ${createResponse.status}`);
              }
            } catch (createDbErr) {
              throw new Error(`無法在該頁面下自動建立資料庫。請確認已將新頁面的連線授權開啟。(${createDbErr.message})`);
            }
          }
          
          // 情況 2: 欄位錯誤 (如缺少 Link 或 分類 欄位，回傳 400 或 validation_error)
          else if (createResponse.status === 400 || errData.code === "validation_error") {
            try {
              // 嘗試自動幫資料庫修復/新增所需要的欄位屬性！
              await updateDatabaseProperties(token, activeDbId);
              
              // 再次重試寫入
              createResponse = await executeCreatePage(token, activeDbId, payload);
              if (!createResponse.ok) {
                const retryErr = await createResponse.json();
                throw new Error(retryErr.message || `修復欄位後重試失敗: ${createResponse.status}`);
              }
            } catch (patchErr) {
              throw new Error(`欄位格式不相符且自動修復失敗。請確認資料庫中包含 Name (標題)、Link (URL) 與 分類 (Select) 欄位。(${errData.message})`);
            }
          } else {
            throw new Error(errData.message || `Notion API 錯誤: ${createResponse.status}`);
          }
        }
        
        const finalData = await createResponse.json();
        sendResponse({ 
          success: true, 
          data: finalData,
          newDbId: newDbCreated ? activeDbId : null 
        });
        
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    })();
    
    return true; // 保持通道開啟以利非同步回應
  }
});

async function executeCreatePage(token, databaseId, payload) {
  return fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28"
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: payload.properties,
      children: payload.children
    })
  });
}

async function createDatabase(token, pageId) {
  const response = await fetch("https://api.notion.com/v1/databases", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28"
    },
    body: JSON.stringify({
      parent: { type: "page_id", page_id: pageId },
      title: [{ type: "text", text: { content: "Threads 脆文整理資料庫" } }],
      properties: {
        "Name": { title: {} },
        "Link": { url: {} },
        "分類": {
          "select": {
            "options": [
              { "name": "好文存檔", "color": "blue" },
              { "name": "商業用途", "color": "purple" }
            ]
          }
        },
        "記錄時間": { date: {} },
        "備注": { rich_text: {} }
      }
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `建立資料庫失敗: ${response.status}`);
  }
  return data.id;
}

async function updateDatabaseProperties(token, databaseId) {
  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28"
    },
    body: JSON.stringify({
      properties: {
        "Link": { url: {} },
        "分類": {
          "select": {
            "options": [
              { "name": "好文存檔", "color": "blue" },
              { "name": "商業用途", "color": "purple" }
            ]
          }
        },
        "記錄時間": { date: {} },
        "備注": { rich_text: {} }
      }
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `自動修改欄位失敗: ${response.status}`);
  }
  return true;
}
