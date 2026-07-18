/**
 * 雲端教練課程系統 - Google Apps Script (GAS) API 範本
 * 
 * 使用說明：
 * 1. 在學員的 Google Sheet 中，點擊上方選單的「擴充功能」->「Apps Script」。
 * 2. 清空原本的程式碼，將此檔案的所有內容貼上。
 * 3. 修改下方 CONFIG 中的 LINE_WEBHOOK_URL（選填，若需要即時卡關通知）。
 * 4. 點擊右上方「部署」->「新增部署」。
 * 5. 選取類型為「網頁應用程式 (Web App)」。
 * 6. 設定：
 *    - 說明：課程 API v1
 *    - 執行身分：我 (您的帳號)
 *    - 誰能存取：任何人 (Anyone) -> **這非常重要，否則前端網頁會因為權限問題無法讀取**
 * 7. 點擊「部署」，並授予 Google 帳號存取權限。
 * 8. 複製產生的「網頁應用程式網址」，此網址即為前端網頁要串接的 API 節點。
 */

const CONFIG = {
  LINE_WEBHOOK_URL: "" // 如果有 LINE Notify 或 Discord Webhook 可以貼在這裡，用於紅黃燈即時警報
};

/**
 * 處理 GET 請求：將 Google Sheet 的內容轉換為 JSON 傳回前端
 */
function doGet(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const data = {};
  
  // 1. 讀取 OKR 工作表
  try {
    const okrSheet = spreadsheet.getSheetByName("OKR");
    if (okrSheet) {
      const values = okrSheet.getDataRange().getValues();
      data.okr = parseOkrSheet(values);
    }
  } catch(err) {
    data.okrError = err.toString();
  }

  // 2. 讀取 日誌 工作表
  try {
    const logSheet = spreadsheet.getSheetByName("日誌");
    if (logSheet) {
      const values = logSheet.getDataRange().getValues();
      data.logs = parseLogSheet(values);
    }
  } catch(err) {
    data.logsError = err.toString();
  }

  // 3. 讀取 表格 工作表 (包含感情目標、生活藍圖、話題等)
  try {
    const tableSheet = spreadsheet.getSheetByName("表格");
    if (tableSheet) {
      const values = tableSheet.getDataRange().getValues();
      data.tables = parseTableSheet(values);
    }
  } catch(err) {
    data.tablesError = err.toString();
  }

  // 傳回 JSON，開啟 CORS 跨域支援
  return ContentService.createTextOutput(JSON.stringify({ success: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 處理 POST 請求：寫入資料到 Google Sheet 中
 */
function doPost(e) {
  let responseData = { success: false };
  
  try {
    const postData = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (postData.action === "updateCell") {
      // 更新特定儲存格：{ action: "updateCell", sheetName: "工作表名稱", row: 行號, col: 列號, value: 新值 }
      const sheet = spreadsheet.getSheetByName(postData.sheetName);
      if (sheet) {
        const range = sheet.getRange(postData.row, postData.col);
        range.setValue(postData.value);
        
        // 特殊觸發：如果是回報紅黃綠燈且為紅黃燈，觸發即時通知
        if (postData.sheetName === "日誌" && postData.col === 3 && (postData.value === "🔴" || postData.value === "🟡")) {
          sendStuckAlert(postData.row, postData.value);
        }
        
        responseData = { success: true, message: "儲存格更新成功" };
      } else {
        responseData = { success: false, error: "找不到工作表: " + postData.sheetName };
      }
      
    } else if (postData.action === "appendRow") {
      // 新增一行資料：{ action: "appendRow", sheetName: "工作表名稱", values: [值1, 值2, ...] }
      const sheet = spreadsheet.getSheetByName(postData.sheetName);
      if (sheet) {
        sheet.appendRow(postData.values);
        responseData = { success: true, message: "資料新增成功" };
      } else {
        responseData = { success: false, error: "找不到工作表: " + postData.sheetName };
      }
    } else {
      responseData = { success: false, error: "未知的 action" };
    }
  } catch (err) {
    responseData = { success: false, error: err.toString() };
  }
  
  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 解析 OKR 工作表
 */
function parseOkrSheet(values) {
  const list = [];
  // 假設第一行是標題：課前評估, 主題 Object, 目標 KeyResult, 進度, 教材工具, 行動指引, 設計說明
  // 資料從第二行 (index 1) 開始
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row[1] && !row[2]) continue; // 略過空白行
    
    list.push({
      rowNum: i + 1, // 記錄對應 Sheet 的實體行號 (1-based)，供前端寫回時使用
      assessment: row[0],  // 課前評估
      object: row[1],      // 主題 Object
      keyResult: row[2],   // 目標 KeyResult
      progress: row[3],    // 進度
      tool: row[4],        // 教材工具
      actionGuide: row[5], // 行動指引
      designDesc: row[6]   // 設計說明
    });
  }
  return list;
}

/**
 * 解析 日誌 工作表
 */
function parseLogSheet(values) {
  const list = [];
  // 第一行是標題：日期, 重大排程（放假時間、約會、攝影、等等）, 約會對象 (或狀態燈號)
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row[0]) continue;
    
    list.push({
      rowNum: i + 1,
      date: row[0],
      schedule: row[1],
      targetOrStatus: row[2]
    });
  }
  return list;
}

/**
 * 解析 表格 工作表（抓取核心的故事彙整與生活藍圖區域）
 * 註：可根據實際表格 Range 進行更精確的定位讀取，以下為示範基礎讀取
 */
function parseTableSheet(values) {
  const rawTables = {
    goals: "",      // 感情目標
    blueprints: [], // 生活藍圖
    stories: []     // 人生話題故事彙整
  };
  
  // 感情目標定位在 Row 3 (index 2)
  if (values[2]) {
    rawTables.goals = values[2][1]; // B3
  }
  
  // 解析生活藍圖
  // 健康/生活習慣 (B5/B6), 事業/工作 (B7/B8), 夢想/興趣 (B9/B10), 人際關係 (B11/B12)
  const categories = ["健康/生活習慣", "事業/工作/成就", "夢想/興趣/愛好", "人際關係"];
  for (let i = 0; i < categories.length; i++) {
    const startRow = 4 + (i * 2); // 4, 6, 8, 10 (index)
    if (values[startRow]) {
      rawTables.blueprints.push({
        category: categories[i],
        targetRow: startRow + 1, // Sheet row
        content: values[startRow][1], // B 列內容
        howToRow: startRow + 2,
        howTo: values[startRow + 1] ? values[startRow + 1][1] : ""
      });
    }
  }

  // 解析人生故事彙整 (從第 16 行開始，index 15)
  for (let i = 15; i < values.length; i++) {
    const row = values[i];
    if (!row[0] && !row[1]) continue;
    if (row[0] === "說明" || row[0] === "＃感情目標" || row[0] === "＃生活藍圖" || row[0] === "＃人生重大話題 ＃對話脈絡") continue;
    
    rawTables.stories.push({
      rowNum: i + 1,
      section: row[0],      // 吸引/談心/曖昧
      category: row[1],     // 興趣/生活/學涯等
      topics: row[2],       // 故事主題
      headline: row[3],     // 頭條標題
      emotion: row[4],      // 情緒
      trait: row[5],        // 人格特質
      value: row[6],        // 高價值
      guidance: row[7]      // 引導問句
    });
  }
  
  return rawTables;
}

/**
 * 當學員回報黃燈或紅燈時，發送警報給教練
 */
function sendStuckAlert(rowNum, status) {
  if (!CONFIG.LINE_WEBHOOK_URL) return;
  
  const payload = JSON.stringify({
    text: `⚠️ 【學員卡關通知】學員在日誌第 ${rowNum} 列回報了 ${status} 狀態，請教練儘速主動協助！`
  });
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: payload,
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(CONFIG.LINE_WEBHOOK_URL, options);
}
