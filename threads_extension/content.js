(function () {
  const isThreads = window.location.hostname.includes("threads.net") || window.location.hostname.includes("threads.com");

  // 如果不在 Threads，代表是在 AI 網頁，執行自動填入並送出邏輯
  if (!isThreads) {
    runAiAutofillLogic();
    return;
  }

  // 建立並注入樣式表
  const style = document.createElement("style");
  style.innerHTML = `
    #threads-helper-fab {
      position: fixed;
      bottom: 80px;
      right: 30px;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* ── FAB Main Trigger ── */
    .fab-main {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #101010;
      border: 1px solid #262626;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #ffffff;
      user-select: none;
      transition: background 0.2s, border-color 0.2s;
    }

    .fab-main:hover {
      background: #1f1f1f;
      border-color: #363636;
    }

    .fab-main:active {
      background: #2a2a2a;
    }

    /* ── Compact Panel ── */
    .fab-compact-panel {
      position: fixed;
      bottom: 135px;
      right: 30px;
      width: 240px;
      background: #101010;
      border: 1px solid #262626;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      display: none;
      flex-direction: column;
      padding: 14px;
      box-sizing: border-box;
      color: #ffffff;
      z-index: 9999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .fab-compact-panel.open {
      display: flex;
    }

    /* Panel Header */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .panel-title {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
    }

    .panel-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .panel-action-btn {
      cursor: pointer;
      color: #777777;
      font-size: 14px;
      user-select: none;
      transition: color 0.2s;
    }

    .panel-action-btn:hover {
      color: #ffffff;
    }

    /* Range Selector (Segment Control) */
    .range-selector {
      display: flex;
      background: #1f1f1f;
      border-radius: 8px;
      padding: 2px;
      margin-bottom: 12px;
      border: 1px solid #262626;
    }

    .range-opt {
      flex: 1;
      background: transparent;
      border: none;
      color: #777777;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 0;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s, color 0.2s;
      outline: none;
    }

    .range-opt:hover {
      color: #ffffff;
    }

    .range-opt.active {
      background: #363636;
      color: #ffffff;
    }

    /* Action Buttons */
    .panel-actions {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .flat-btn {
      background: #1f1f1f;
      border: 1px solid #262626;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background 0.2s, border-color 0.2s;
      outline: none;
      box-sizing: border-box;
      width: 100%;
    }

    .flat-btn:hover {
      background: #2a2a2a;
      border-color: #363636;
    }

    .flat-btn:active {
      background: #363636;
    }

    .flat-btn.primary {
      background: #ffffff;
      color: #000000;
      border: 1px solid #ffffff;
    }

    .flat-btn.primary:hover {
      background: #e0e0e0;
      border-color: #e0e0e0;
    }

    .flat-btn.primary:active {
      background: #c8c8c8;
      border-color: #c8c8c8;
    }

    /* AI Row */
    .ai-row {
      display: flex;
      gap: 6px;
    }

    .ai-btn {
      flex: 1;
    }

    /* Notion Settings Modal (Flat Redesign) */
    .notion-settings-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: 380px;
      max-width: 90vw;
      background: #101010;
      border: 1px solid #262626;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7);
      border-radius: 12px;
      padding: 20px;
      z-index: 10000000;
      color: #ffffff;
      display: none;
      opacity: 0;
      transition: transform 0.2s, opacity 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .notion-settings-modal.show {
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .settings-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid #262626;
      padding-bottom: 8px;
    }

    .settings-title {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
    }

    .settings-close {
      cursor: pointer;
      color: #777777;
      font-size: 16px;
      transition: color 0.2s;
      user-select: none;
    }

    .settings-close:hover {
      color: #ffffff;
    }

    .settings-field {
      margin-bottom: 12px;
      text-align: left;
    }

    .settings-label {
      font-size: 10px;
      color: #777777;
      margin-bottom: 4px;
      display: block;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .settings-input, .settings-select, .settings-textarea {
      width: 100%;
      background: #1f1f1f;
      border: 1px solid #262626;
      border-radius: 8px;
      padding: 8px 12px;
      color: #ffffff;
      font-size: 12px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .settings-input:focus, .settings-select:focus, .settings-textarea:focus {
      border-color: #ffffff;
    }

    .settings-textarea {
      resize: vertical;
      font-family: inherit;
    }

    .settings-btn {
      width: 100%;
      background: #ffffff;
      border: none;
      color: #000000;
      padding: 10px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 8px;
    }

    .settings-btn:hover {
      background: #e0e0e0;
    }

    /* Toast Notification styles (Flat Redesign) */
    .threads-helper-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10000000;
      background: #101010;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      border: 1px solid #262626;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
      font-size: 12px;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.2s, transform 0.2s;
      pointer-events: none;
    }

    .threads-helper-toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // 1. 建立並注入 FAB 懸浮選單 HTML
  const fab = document.createElement("div");
  fab.id = "threads-helper-fab";
  fab.innerHTML = `
    <!-- 懸浮面板 -->
    <div class="fab-compact-panel" id="fab-compact-panel">
      <div class="panel-header">
        <span class="panel-title">Threads 整理助手</span>
        <div class="panel-header-actions">
          <span class="panel-action-btn" id="fab-settings-toggle" title="設定">⚙️</span>
          <span class="panel-action-btn" id="panel-close-btn" title="關閉">✕</span>
        </div>
      </div>
      
      <!-- 擷取範圍 -->
      <div class="range-selector">
        <button class="range-opt" id="mode-author">主文</button>
        <button class="range-opt" id="mode-full">完整</button>
        <button class="range-opt" id="mode-select">選取</button>
      </div>
      
      <!-- 快捷動作與 AI -->
      <div class="panel-actions">
        <button class="flat-btn primary" id="dash-copy-btn">📋 複製 Markdown</button>
        <button class="flat-btn" id="dash-notion-btn">💾 儲存至 Notion</button>
        <div class="ai-row">
          <button class="flat-btn ai-btn" id="fab-ai-good">🤖 AI 整理</button>
          <button class="flat-btn ai-btn" id="fab-ai-biz">📊 AI 分析</button>
        </div>
      </div>
    </div>
    
    <!-- 長駐 FAB 啟動按鈕 -->
    <div class="fab-main" id="fab-main-btn" title="開啟整理助手">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="9" x2="15" y2="9"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="13" y2="17"/>
        <polyline points="5 9 7 11 5 13"/>
      </svg>
    </div>
  `;
  document.body.appendChild(fab);

  // 2. 建立並注入 Notion 設定彈跳視窗 HTML
  const settingsModal = document.createElement("div");
  settingsModal.className = "notion-settings-modal";
  settingsModal.id = "notion-settings-modal";
  settingsModal.innerHTML = `
    <div class="settings-header">
      <span class="settings-title">⚙️ Notion & AI 整合設定</span>
      <span class="settings-close" id="settings-close-btn">✕</span>
    </div>
    <div class="settings-field">
      <label class="settings-label">NOTION INTEGRATION TOKEN</label>
      <input type="password" class="settings-input" id="cfg-notion-token" placeholder="secret_...">
    </div>
    <div class="settings-field">
      <label class="settings-label">NOTION 資料庫 ID (好文 / 商業用途)</label>
      <input type="text" class="settings-input" id="cfg-notion-main-db" placeholder="貼入 32 位字元資料庫 ID 或完整網址">
    </div>
    <div class="settings-field">
      <label class="settings-label">預設分析 AI 平台</label>
      <select class="settings-select" id="cfg-ai-platform">
        <option value="chatgpt">ChatGPT (chatgpt.com)</option>
        <option value="gemini">Gemini (gemini.google.com)</option>
        <option value="claude">Claude (claude.ai)</option>
      </select>
    </div>
    <div class="settings-field">
      <label class="settings-label">自訂「好文存檔」AI 整理提示詞</label>
      <textarea class="settings-textarea" id="cfg-ai-prompt-good" rows="2" placeholder="例如：整理貼文與所有熱門回覆中的美食、笑話精華..."></textarea>
    </div>
    <div class="settings-field">
      <label class="settings-label">自訂「商業用途」AI 分析提示詞</label>
      <textarea class="settings-textarea" id="cfg-ai-prompt-biz" rows="2" placeholder="例如：分析這篇文為什麼會爆、鉤子設計、如何複製..."></textarea>
    </div>
    <button class="settings-btn" id="settings-save-btn">儲存設定</button>
  `;
  document.body.appendChild(settingsModal);

  // ── Compact Panel Elements & Logic ──
  const panel = document.getElementById("fab-compact-panel");
  const fabMain = document.getElementById("fab-main-btn");
  const panelCloseBtn = document.getElementById("panel-close-btn");

  // 開啟懸浮面板
  function openPanel() {
    if (panel) {
      panel.classList.add("open");
    }
  }

  // 關閉懸浮面板
  function closePanel() {
    if (panel) {
      panel.classList.remove("open");
    }
  }

  // 切換面板顯示
  function togglePanel() {
    if (panel) {
      panel.classList.toggle("open");
    }
  }

  // 點擊關閉
  panelCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePanel();
  });

  // 貼文資訊預覽卡片動態更新
  function updateDrawerPreview() {
    const authorEl = document.getElementById("preview-author");
    const statsEl = document.getElementById("preview-stats");
    const textEl = document.getElementById("preview-text-box");
    
    if (!authorEl || !statsEl || !textEl) return;
    
    const arts = document.querySelectorAll('article');
    if (arts && arts.length > 0) {
      const mainArt = arts[0];
      
      let username = "Threads 用戶";
      const userEl = mainArt.querySelector('a[href*="/@"]');
      if (userEl) {
        const href = userEl.getAttribute('href');
        username = href.split('/@')[1] || "user";
      }
      authorEl.textContent = `@${username}`;
      
      let bodyText = "";
      const textContainer = mainArt.querySelector('div[dir="auto"]');
      if (textContainer) {
        bodyText = textContainer.textContent.trim();
      }
      textEl.textContent = bodyText || "無文字內容預覽";
      
      statsEl.textContent = `💬 已載入留言 ${arts.length - 1} 則`;
    } else {
      authorEl.textContent = "無法擷取貼文";
      textEl.textContent = "請確認目前在貼文詳細頁面。";
      statsEl.textContent = "💬 0 則";
    }
  }

  // 拖曳控制與點擊開啟
  let isDragging = false;
  let startX, startY;
  let initialRight, initialBottom;

  fabMain.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // 僅限滑鼠左鍵
    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;
    
    const rect = fab.getBoundingClientRect();
    initialRight = window.innerWidth - rect.right;
    initialBottom = window.innerHeight - rect.bottom;
    
    function onMouseMove(moveEvent) {
      const dx = startX - moveEvent.clientX;
      const dy = startY - moveEvent.clientY;
      
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        isDragging = true;
      }
      
      if (isDragging) {
        fab.style.right = `${initialRight + dx}px`;
        fab.style.bottom = `${initialBottom + dy}px`;
        fab.style.left = "auto";
        fab.style.top = "auto";
      }
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      // 如果沒有觸發拖曳，代表是一般點擊，開關儀表板
      if (!isDragging) {
        togglePanel();
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // 2. SPA URL 監控：只有在貼文詳細頁面 (含 /post/) 才顯示按鈕
  function checkUrlVisibility() {
    const isPostPage = window.location.pathname.includes('/post/');
    fab.style.display = isPostPage ? "flex" : "none";
  }

  setInterval(checkUrlVisibility, 1000);
  checkUrlVisibility(); // 首次執行

  // 3. 模式設定與切換 UI 亮起邏輯
  let currentMode = "author"; // "author" 或 "full"

  chrome.storage.local.get(["extractMode"], (res) => {
    if (res.extractMode) {
      currentMode = res.extractMode;
    }
    updateSelectionHighlight();
  });

  function updateSelectionHighlight() {
    const selection = window.getSelection();
    const hasSelection = selection && selection.toString().trim().length > 0;

    const optAuthor = document.getElementById("mode-author");
    const optFull = document.getElementById("mode-full");
    const optSelect = document.getElementById("mode-select");

    if (!optAuthor || !optFull || !optSelect) return;

    // 重設所有樣式
    [optAuthor, optFull, optSelect].forEach(el => {
      el.classList.remove("active");
    });

    let activeEl = null;
    if (hasSelection) {
      activeEl = optSelect;
    } else {
      activeEl = currentMode === "author" ? optAuthor : optFull;
    }

    if (activeEl) {
      activeEl.classList.add("active");
    }
  }

  // 定時監測反白狀態以動態切換高亮
  setInterval(updateSelectionHighlight, 500);

  // --- Notion & 設定功能綁定與實作 ---
  const DEFAULT_PROMPT_GOOD = `你是一位內容整理員，負責把雜亂的 Threads 留言串整理成清單格式。

以下是一篇 Threads 貼文及其所有留言。

【核心原則：忠實還原，不得化約】
- ❌ 禁止：把多筆資料合併成一句話（例如「大家推薦了各地美食」）
- ❌ 禁止：省略任何一則留言中的具體資訊（名稱、地點、細節）
- ✅ 要求：每一則有效留言都要被獨立列出，保留原始資訊
- ✅ 要求：內容不足的留言（如純表情、已刪除）可略過，其餘全數保留

【第一步：識別內容類型】
判斷貼文主題（美食/景點推薦、笑話/語錄、知識分享、產品推薦、生活技巧、其他），決定整理架構。

【第二步：依類型整理，但保留所有原始資訊】
- 推薦類（美食/景點/產品）：
  每項格式 → 「📍 [名稱] — [地點] — [特色描述] — [備註（價位/注意事項）]」
  每則留言獨立一行，不得合併，依類別或地區分組
- 笑話/語錄類：
  完整保留每則原文，不得截斷或改寫，以編號條列全部收錄
- 知識/教學類：
  保留每則留言的完整觀點，條列呈現，可整合重複內容但不得刪減獨特觀點
- 其他：完整條列所有留言中有實質內容的部分

【第三步：輸出格式】
▍主題（一句話）
▍[類型]
▍整理清單（完整條列，每項不超過 3 行）
▍補充備注（原文中有趣的細節或爭議，另列）

全程繁體中文。保留原文精神，僅重新排列格式。`;


  const DEFAULT_PROMPT_BIZ = `你是一位頂尖的社群行銷策略師，擅長解析爆文結構與複製成功模式。以下是一篇 Threads 熱門貼文及其留言串。

請依照以下框架進行完整分析：

【一、貼文定位】
- 主題/類型與目標受眾
- 情緒基調（共鳴型／娛樂型／震驚型／實用型／爭議型）

【二、爆紅結構解析】
1. 開頭鉤子（Hook）：前 1-2 句如何抓住注意力？用了什麼技巧？
2. 核心張力：製造了什麼懸念、矛盾或情感衝擊？
3. 留言引爆點：哪個設計讓人想留言？（提問/爭議/填空/認同感）
4. 分享動機：讀者為什麼想轉發或儲存這篇文？

【三、心理機制】
指出使用了哪些心理學機制（社會認同、FOMO、好奇缺口、情感驗證、從眾心理等）

【四、格式技巧】
- 長度與節奏、段落切割、句子長短
- 視覺結構（條列/符號/空行）
- 語氣風格（口語/正式、第一/第三人稱）

【五、可用模板】
根據分析，提供一個可直接套用的貼文模板（保留結構，換掉主題），並附上 3 個不同主題的改寫方向。

請全程使用繁體中文，分析要有觀點有深度，避免表面描述。`;

  // 開關設定面板
  const modal = document.getElementById("notion-settings-modal");
  document.getElementById("fab-settings-toggle").addEventListener("click", (e) => {
    e.stopPropagation();
    // 載入當前設定
    chrome.storage.local.get([
      "notionToken",
      "notionMainDb",
      "aiPlatform",
      "aiPromptGood",
      "aiPromptBiz"
    ], (res) => {
      document.getElementById("cfg-notion-token").value = res.notionToken || "";
      document.getElementById("cfg-notion-main-db").value = res.notionMainDb || "";
      document.getElementById("cfg-ai-platform").value = res.aiPlatform || "chatgpt";
      document.getElementById("cfg-ai-prompt-good").value = res.aiPromptGood || DEFAULT_PROMPT_GOOD;
      document.getElementById("cfg-ai-prompt-biz").value = res.aiPromptBiz || DEFAULT_PROMPT_BIZ;

      modal.classList.add("show");
    });
  });

  document.getElementById("settings-close-btn").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // 輔助函式：從輸入的字串或網址中提取 32 位 Notion 資料庫 ID
  function extractNotionDbId(input) {
    const clean = input.trim();
    if (!clean) return "";

    // 如果已經是純 32 位英數字，直接返回
    if (/^[a-fA-F0-9]{32}$/.test(clean)) {
      return clean;
    }

    // 從 Notion 網址中擷取 32 位字元
    // 支援: https://www.notion.so/workspace/8a71d88258384918a38c238b1f592d30?v=...
    // 支援: https://www.notion.so/8a71d88258384918a38c238b1f592d30
    const urlMatch = clean.match(/\/([a-fA-F0-9]{32})(?:\?|$)/) || clean.match(/([a-fA-F0-9]{32})/);
    if (urlMatch) {
      return urlMatch[1];
    }

    return null;
  }

  // 儲存設定
  document.getElementById("settings-save-btn").addEventListener("click", () => {
    const token = document.getElementById("cfg-notion-token").value.trim();
    const mainDbRaw = document.getElementById("cfg-notion-main-db").value.trim();
    const platform = document.getElementById("cfg-ai-platform").value;
    const promptGood = document.getElementById("cfg-ai-prompt-good").value.trim();
    const promptBiz = document.getElementById("cfg-ai-prompt-biz").value.trim();

    // 1. 驗證 Token 格式
    const isValidToken = token.startsWith("secret_") || token.startsWith("ntn_");
    if (token && !isValidToken) {
      alert("⚠️ Notion Token 格式不正確（正常應以 secret_ 或 ntn_ 開頭）！");
      document.getElementById("cfg-notion-token").focus();
      return;
    }

    // 2. 解析並驗證主資料庫 ID
    let mainDb = "";
    if (mainDbRaw) {
      mainDb = extractNotionDbId(mainDbRaw);
      if (!mainDb) {
        alert("⚠️ 資料庫連結格式不正確！\n請直接貼上完整的 Notion 資料庫網址，或者填入正確的 32 位資料庫 ID。");
        document.getElementById("cfg-notion-main-db").focus();
        return;
      }
    }

    chrome.storage.local.set({
      notionToken: token,
      notionMainDb: mainDb,
      aiPlatform: platform,
      aiPromptGood: promptGood,
      aiPromptBiz: promptBiz
    }, () => {
      // 成功儲存後，把輸入框內容更新為解析後的乾淨 ID，方便使用者確認
      document.getElementById("cfg-notion-main-db").value = mainDb;

      alert("✅ 設定儲存成功！已為您自動解析資料庫 ID！");
      modal.classList.remove("show");
    });
  });

  // 綁定儀表板底部的動作按鈕
  document.getElementById("dash-copy-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    runFlow();
    closePanel();
  });

  document.getElementById("dash-notion-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    runNotionFlow();
    closePanel();
  });

  // AI 快捷按鈕：直接抓取內容並開啟 AI，不存 Notion
  async function runAiOnlyFlow(promptType) {
    chrome.storage.local.get(["aiPlatform", "aiPromptGood", "aiPromptBiz"], async (res) => {
      const platform = res.aiPlatform || "chatgpt";
      const promptTpl = promptType === "good"
        ? (res.aiPromptGood || DEFAULT_PROMPT_GOOD)
        : (res.aiPromptBiz || DEFAULT_PROMPT_BIZ);

      const result = await collectPosts();
      if (!result || result.finalPosts.length === 0) {
        showNotification("⚠️ 找不到可抓取的貼文內容！");
        return;
      }
      const posts = result.finalPosts;

      let mdText = "";
      posts.forEach((p) => {
        const statsStr = p.stats || "";
        if (p.isMain) {
          mdText += `【原貼文】\n作者: ${p.username}${statsStr}\n內容:\n${p.text}\n\n`;
        } else {
          mdText += `【回覆】\n作者: ${p.username}${statsStr}\n內容:\n${p.text}\n\n`;
        }
      });

      const fullPrompt = `${promptTpl}\n\n${mdText}`;
      chrome.storage.local.set({ pendingPrompt: fullPrompt }, async () => {
        await copyToClipboard(fullPrompt);

        let aiUrl = "https://chatgpt.com/";
        if (platform === "gemini") aiUrl = "https://gemini.google.com/";
        else if (platform === "claude") aiUrl = "https://claude.ai/";

        window.open(aiUrl, "_blank");
        showNotification("🤖 已開啟 AI 分頁並複製 Prompt！");
      });
    });
  }

  document.getElementById("fab-ai-good").addEventListener("click", (e) => {
    e.stopPropagation();
    runAiOnlyFlow("good");
  });

  document.getElementById("fab-ai-biz").addEventListener("click", (e) => {
    e.stopPropagation();
    runAiOnlyFlow("biz");
  });

  // 手動點選模式
  document.getElementById("mode-author").addEventListener("click", () => {
    window.getSelection().removeAllRanges();
    currentMode = "author";
    chrome.storage.local.set({ extractMode: currentMode }, updateSelectionHighlight);
  });

  document.getElementById("mode-full").addEventListener("click", () => {
    window.getSelection().removeAllRanges();
    currentMode = "full";
    chrome.storage.local.set({ extractMode: currentMode }, updateSelectionHighlight);
  });

  document.getElementById("mode-select").addEventListener("click", () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim().length === 0) {
      alert("⚠️ 請先用滑鼠在網頁中「反白選取」你想要擷取的留言範圍！");
    }
  });

  // 用於暫存所有擷取到的貼文
  const postsMap = new Map();

  // 將按讚數文字 (如 2,088、1.2k、2.9萬) 轉換為純數字以利排序與篩選
  function parseLikeCount(str) {
    if (!str) return 0;
    let clean = str.trim().replace(/,/g, '');
    let multiplier = 1;
    if (clean.includes('萬')) {
      multiplier = 10000;
      clean = clean.replace('萬', '');
    } else if (clean.toLowerCase().includes('k')) {
      multiplier = 1000;
      clean = clean.toLowerCase().replace('k', '');
    }
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : val * multiplier;
  }

  // 輔助函式：從卡片 DOM 中取得非頭像的圖片及影片附件
  function extractCardMedia(art) {
    const mediaList = [];

    // 1. 尋找圖片附件
    const imgs = art.querySelectorAll('img');
    imgs.forEach(img => {
      const src = img.getAttribute('src');
      if (!src) return;
      if (src.startsWith('blob:')) return;

      // 排除大頭貼：尺寸小於 48px，或網址中包含 profile, Avatar 字眼
      const rect = img.getBoundingClientRect();
      const isAvatar = (rect.width > 0 && rect.width < 48) ||
        src.includes('/profile/') ||
        src.includes('profile_id') ||
        img.classList.contains('Avatar') ||
        img.getAttribute('alt')?.includes('的頭像') ||
        img.getAttribute('alt')?.includes('Profile picture');

      if (isAvatar) return;

      mediaList.push(`![圖片附件](${src})`);
    });

    // 2. 尋找影片附件
    const vids = art.querySelectorAll('video');
    vids.forEach(vid => {
      const src = vid.getAttribute('src') || vid.querySelector('source')?.getAttribute('src');
      if (!src) return;
      if (src.startsWith('blob:')) return;

      mediaList.push(`[🎥 點此播放影片附件](${src})`);
    });

    return mediaList;
  }

  // 核心功能：從當前 DOM 中擷取貼文並存入暫存器
  function extractCurrentVisibleCards(onlyAuthor = false) {
    const cards = document.querySelectorAll('div[data-pressable-container="true"], article');
    let authorUsername = "";

    cards.forEach((art, index) => {
      if (art.offsetWidth === 0 && art.offsetHeight === 0) {
        return;
      }

      // 尋找所有的 a 連結，判斷誰是用戶名
      let username = '未知';
      const links = art.querySelectorAll('a');
      for (let link of links) {
        const href = link.getAttribute('href') || '';
        const match = href.match(/\/@([a-zA-Z0-9_\.]+)/) || href.match(/^\/([a-zA-Z0-9_\.]+)/);
        if (match) {
          const name = match[1];
          if (!['terms', 'privacy', 'login', 'signup', 'explore', 'search', 'notifications', 'write'].includes(name)) {
            username = '@' + name;
            break;
          }
        }
      }

      const isMain = index === 0;
      if (isMain) {
        authorUsername = username;
      }

      // 如果開啟了「僅主文與作者」模式，且這則回覆不是作者發的，則過濾掉
      if (onlyAuthor && !isMain && username !== authorUsername) {
        return;
      }

      // 取得所有文字內容
      const spans = Array.from(art.querySelectorAll('span, div'));
      let textNodes = [];
      spans.forEach(el => {
        if (el.children.length === 0) {
          const txt = el.innerText.trim();
          if (txt) textNodes.push(txt);
        }
      });

      // 解析按讚數與分享/回覆數
      let likesVal = 0;
      let repliesVal = 0;
      let repostsVal = 0;

      const countNodes = textNodes.filter(txt => {
        return /^[0-9,.\s]+(k|K|萬|個|次|則)?$/.test(txt) || txt.includes("按讚") || txt.includes("轉發") || txt.includes("分享") || txt.includes("回覆");
      });

      countNodes.forEach(txt => {
        const numVal = parseLikeCount(txt.replace(/個按讚|次按讚|則回覆|次回覆|次轉發|次分享/g, ""));
        if (txt.includes("按讚")) {
          likesVal = numVal;
        } else if (txt.includes("回覆")) {
          repliesVal = numVal;
        } else if (txt.includes("轉發") || txt.includes("分享")) {
          repostsVal = numVal;
        } else {
          if (!likesVal) likesVal = numVal;
          else if (!repliesVal) repliesVal = numVal;
          else if (!repostsVal) repostsVal = numVal;
        }
      });

      let stats = "";
      const parts = [];
      if (likesVal) parts.push(`❤️ ${likesVal}`);
      if (repliesVal) parts.push(`💬 ${repliesVal}`);
      if (parts.length > 0) {
        stats = ` (${parts.join(" | ")})`;
      }

      const totalInteractions = likesVal + repliesVal + repostsVal;

      // 過濾無效文字
      const cleanTexts = textNodes.filter(txt => {
        if (txt.startsWith('@')) return false;
        if (txt === username || txt === username.replace('@', '')) return false;
        if (/^\d+[dmh]$/.test(txt) || txt.includes('小時') || txt.includes('分鐘') || txt.includes('天') || txt.includes('秒') || txt.includes('週') || txt.includes('年')) return false;
        if (['回覆', '分享', '按讚', '轉發', '查看更多', '展開', '隱藏', '翻譯', '原創', '已編輯', '取消', '確定'].includes(txt)) return false;
        if (/^[0-9,.\s]+(k|K|萬|個|次|則)?$/.test(txt) || txt.includes('按讚') || txt.includes('轉發') || txt.includes('回覆')) return false;
        return true;
      });

      let postText = Array.from(new Set(cleanTexts)).join('\n');

      // 擷取媒體附件（圖片/影片）並串接到內文尾端
      const mediaList = extractCardMedia(art);
      if (mediaList.length > 0) {
        postText += "\n\n" + mediaList.join("\n");
      }

      if (username !== '未知' && postText.length > 0) {
        const key = `${username}_${postText.substring(0, 40)}`;
        if (!postsMap.has(key)) {
          postsMap.set(key, {
            username,
            text: postText,
            isMain,
            stats,
            likesCount: likesVal,
            totalInteractions: totalInteractions
          });
        }
      }
    });
  }

  // 核心功能：擷取反白選取區相交的卡片 (特定選取/Q&A 模式)
  function extractSelectedCards(selection) {
    const cards = document.querySelectorAll('div[data-pressable-container="true"], article');
    cards.forEach((art, index) => {
      if (art.offsetWidth === 0 && art.offsetHeight === 0) {
        return;
      }

      let username = '未知';
      const links = art.querySelectorAll('a');
      for (let link of links) {
        const href = link.getAttribute('href') || '';
        const match = href.match(/\/@([a-zA-Z0-9_\.]+)/) || href.match(/^\/([a-zA-Z0-9_\.]+)/);
        if (match) {
          const name = match[1];
          if (!['terms', 'privacy', 'login', 'signup', 'explore', 'search', 'notifications', 'write'].includes(name)) {
            username = '@' + name;
            break;
          }
        }
      }

      const isMain = index === 0;
      const isSelected = selection.containsNode(art, true);

      if (!isMain && !isSelected) {
        return;
      }

      const spans = Array.from(art.querySelectorAll('span, div'));
      let textNodes = [];
      spans.forEach(el => {
        if (el.children.length === 0) {
          const txt = el.innerText.trim();
          if (txt) textNodes.push(txt);
        }
      });

      // 解析按讚數與分享/回覆數
      let likesVal = 0;
      let repliesVal = 0;
      let repostsVal = 0;

      const countNodes = textNodes.filter(txt => {
        return /^[0-9,.\s]+(k|K|萬|個|次|則)?$/.test(txt) || txt.includes("按讚") || txt.includes("轉發") || txt.includes("分享") || txt.includes("回覆");
      });

      countNodes.forEach(txt => {
        const numVal = parseLikeCount(txt.replace(/個按讚|次按讚|則回覆|次回覆|次轉發|次分享/g, ""));
        if (txt.includes("按讚")) {
          likesVal = numVal;
        } else if (txt.includes("回覆")) {
          repliesVal = numVal;
        } else if (txt.includes("轉發") || txt.includes("分享")) {
          repostsVal = numVal;
        } else {
          if (!likesVal) likesVal = numVal;
          else if (!repliesVal) repliesVal = numVal;
          else if (!repostsVal) repostsVal = numVal;
        }
      });

      let stats = "";
      const parts = [];
      if (likesVal) parts.push(`❤️ ${likesVal}`);
      if (repliesVal) parts.push(`💬 ${repliesVal}`);
      if (parts.length > 0) {
        stats = ` (${parts.join(" | ")})`;
      }

      const totalInteractions = likesVal + repliesVal + repostsVal;

      const cleanTexts = textNodes.filter(txt => {
        if (txt.startsWith('@')) return false;
        if (txt === username || txt === username.replace('@', '')) return false;
        if (/^\d+[dmh]$/.test(txt) || txt.includes('小時') || txt.includes('分鐘') || txt.includes('天') || txt.includes('秒') || txt.includes('週') || txt.includes('年')) return false;
        if (['回覆', '分享', '按讚', '轉發', '查看更多', '展開', '隱藏', '翻譯', '原創', '已編輯', '取消', '確定'].includes(txt)) return false;
        if (/^[0-9,.\s]+(k|K|萬|個|次|則)?$/.test(txt) || txt.includes('按讚') || txt.includes('轉發') || txt.includes('回覆')) return false;
        return true;
      });

      let postText = Array.from(new Set(cleanTexts)).join('\n');

      // 擷取媒體附件（圖片/影片）並串接到內文尾端
      const mediaList = extractCardMedia(art);
      if (mediaList.length > 0) {
        postText += "\n\n" + mediaList.join("\n");
      }

      if (username !== '未知' && postText.length > 0) {
        const key = `${username}_${postText.substring(0, 40)}`;
        if (!postsMap.has(key)) {
          postsMap.set(key, {
            username,
            text: postText,
            isMain,
            stats,
            likesCount: likesVal,
            totalInteractions: totalInteractions
          });
        }
      }
    });
  }

  // 核心自動載入與擷取流程
  async function runFlow() {
    let statusEl = null;
    postsMap.clear();

    const selection = window.getSelection();
    const hasSelection = selection && selection.toString().trim().length > 0;

    try {
      let statusMsg = "";
      if (hasSelection) {
        statusMsg = "⏳ 正在擷取特定選取與原貼文內容...";
      } else if (currentMode === "author") {
        statusMsg = "⏳ 正在擷取原貼文與作者續言...";
      } else {
        statusMsg = "⏳ 正在自動向下捲動載入回覆中...";
      }
      statusEl = showStatusToast(statusMsg);

      if (hasSelection) {
        // ================== 特定選取 (反白) 模式 ==================
        extractSelectedCards(selection);
      } else if (currentMode === "author") {
        // ================== 僅主文與作者續言 模式 ==================
        window.scrollTo(0, 0);
        await new Promise(resolve => setTimeout(resolve, 400));
        extractCurrentVisibleCards(true);
      } else {
        // ================== 完整熱門討論 模式 ==================
        window.scrollTo(0, 0);
        await new Promise(resolve => setTimeout(resolve, 400));

        extractCurrentVisibleCards(false);

        let currentScrollY = 0;
        let scrolls = 0;
        const maxScrolls = 80;
        const targetCount = 100;
        let noProgressCount = 0;
        let lastCount = postsMap.size;

        while (scrolls < maxScrolls) {
          if (postsMap.size >= targetCount) {
            break;
          }

          currentScrollY += window.innerHeight * 0.8;
          window.scrollTo(0, currentScrollY);
          scrolls++;

          await new Promise(resolve => setTimeout(resolve, 350));

          extractCurrentVisibleCards(false);

          if (postsMap.size === lastCount) {
            noProgressCount++;
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
              if (noProgressCount >= 2) break;
            }
            if (noProgressCount >= 6) break;
          } else {
            noProgressCount = 0;
            lastCount = postsMap.size;
          }
        }
      }

      // 將暫存的 Map 轉為陣列
      const rawPosts = Array.from(postsMap.values());

      removeStatusToast(statusEl);

      if (rawPosts.length === 0) {
        alert("⚠️ 未能成功擷取貼文內容。請確認是否在 Threads 貼文詳細頁面。");
        return;
      }

      // ================== 重組、過濾與排序邏輯 ==================
      const mainPost = rawPosts[0];
      const authorUsername = mainPost.username;

      const pinnedPosts = []; // 主貼文 + 作者連續發出的連載文 (置頂，不參與讚數過濾)
      const otherReplies = []; // 其他使用者或非連續的作者回覆

      let stillConsecutive = true;

      rawPosts.forEach((p, i) => {
        if (i === 0) {
          pinnedPosts.push(p);
          return;
        }

        if (p.username === authorUsername && stillConsecutive) {
          pinnedPosts.push(p);
        } else {
          stillConsecutive = false;
          otherReplies.push(p);
        }
      });

      let finalReplies = otherReplies;

      // 如果是「完整討論」模式，套用加權門檻過濾（(按讚+回覆+分享) 總和 > 3 才保留）並且按讚數排序
      if (!hasSelection && currentMode === "full") {
        // 過濾留言：互動加權總數大於 3
        finalReplies = otherReplies.filter(p => (p.totalInteractions || 0) > 3);

        // 依照按讚數由高到低排序
        finalReplies.sort((a, b) => b.likesCount - a.likesCount);
      }

      const finalPosts = [...pinnedPosts, ...finalReplies];

      // 格式化為 Markdown
      let mdResult = "";
      finalPosts.forEach((p, i) => {
        const statsStr = p.stats || "";
        if (p.isMain) {
          mdResult += `### 📌 原貼文 [${p.username}]${statsStr}\n\n${p.text}\n\n---\n\n### 💬 熱門回覆\n\n`;
        } else {
          mdResult += `* **${p.username}**${statsStr}:\n  ${p.text.replace(/\n/g, '\n  ')}\n\n`;
        }
      });

      // 執行複製到剪貼簿
      const copied = await copyToClipboard(mdResult);
      if (copied) {
        showNotification(`✅ 已整理 ${finalPosts.length} 篇貼文並複製到剪貼簿！`);
      } else {
        alert("❌ 複製到剪貼簿失敗，請重試。");
      }

    } catch (err) {
      removeStatusToast(statusEl);
      alert("❌ 執行時發生錯誤: " + err.message);
      console.error(err);
    }
  }

  // 複製輔助函式
  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) { }
    }
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    const success = document.execCommand("copy");
    document.body.removeChild(tempInput);
    return success;
  }

  // 建立並顯示狀態 Toast
  function showStatusToast(msg) {
    const el = document.createElement("div");
    el.className = "threads-helper-toast";
    el.innerHTML = msg;
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add("show");
    }, 10);
    return el;
  }

  // 移除狀態 Toast（附帶淡出動畫）
  function removeStatusToast(el) {
    if (el) {
      el.classList.remove("show");
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }
  }

  // 顯示暫時通知
  function showNotification(msg) {
    const toast = showStatusToast(msg);
    setTimeout(() => {
      removeStatusToast(toast);
    }, 3000);
  }

  // --- Notion 轉換與儲存邏輯 ---
  function convertPostsToNotionBlocks(posts) {
    const blocks = [];

    posts.forEach((p, i) => {
      const statsStr = p.stats || "";
      if (p.isMain) {
        blocks.push({
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ text: { content: `📌 原貼文 [${p.username}]${statsStr}` } }]
          }
        });

        p.text.split("\n").forEach(line => {
          const trimmed = line.trim();
          if (!trimmed) return;

          const imgMatch = trimmed.match(/^!\[圖片附件\]\((https:\/\/[^\)]+)\)$/);
          if (imgMatch) {
            blocks.push({
              object: "block",
              type: "image",
              image: {
                type: "external",
                external: { url: imgMatch[1] }
              }
            });
          } else {
            blocks.push({
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ text: { content: trimmed } }]
              }
            });
          }
        });

        blocks.push({
          object: "block",
          type: "divider",
          divider: {}
        });

        blocks.push({
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [{ text: { content: "💬 熱門回覆" } }]
          }
        });
      } else {
        const lines = p.text.split("\n");
        let txtContent = "";
        const replyImgs = [];

        lines.forEach(line => {
          const trimmed = line.trim();
          const imgMatch = trimmed.match(/^!\[圖片附件\]\((https:\/\/[^\)]+)\)$/);
          if (imgMatch) {
            replyImgs.push(imgMatch[1]);
          } else {
            if (txtContent) txtContent += "\n";
            txtContent += trimmed;
          }
        });

        blocks.push({
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              { text: { content: p.username }, annotations: { bold: true } },
              { text: { content: `${statsStr}: ` } },
              { text: { content: txtContent } }
            ]
          }
        });

        replyImgs.forEach(url => {
          blocks.push({
            object: "block",
            type: "image",
            image: {
              type: "external",
              external: { url: url }
            }
          });
        });
      }
    });

    return blocks.slice(0, 95);
  }

  // 共用：抓取頁面貼文，回傳 { finalPosts, mainPost }
  async function collectPosts() {
    postsMap.clear();
    const selection = window.getSelection();
    const hasSelection = selection && selection.toString().trim().length > 0;

    if (hasSelection) {
      extractSelectedCards(selection);
    } else if (currentMode === "author") {
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 400));
      extractCurrentVisibleCards(true);
    } else {
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 400));
      extractCurrentVisibleCards(false);

      let currentScrollY = 0;
      let scrolls = 0;
      const maxScrolls = 40;
      let lastCount = postsMap.size;
      let noProgress = 0;

      while (scrolls < maxScrolls) {
        currentScrollY += window.innerHeight * 0.8;
        window.scrollTo(0, currentScrollY);
        scrolls++;
        await new Promise(resolve => setTimeout(resolve, 350));
        extractCurrentVisibleCards(false);
        if (postsMap.size === lastCount) {
          noProgress++;
          if (noProgress >= 4) break;
        } else {
          noProgress = 0;
          lastCount = postsMap.size;
        }
      }
    }

    const rawPosts = Array.from(postsMap.values());
    if (rawPosts.length === 0) return null;

    const mainPost = rawPosts[0];
    const authorUsername = mainPost.username;
    const pinnedPosts = [];
    const otherReplies = [];
    let stillConsecutive = true;

    rawPosts.forEach((p, i) => {
      if (i === 0) { pinnedPosts.push(p); return; }
      if (p.username === authorUsername && stillConsecutive) {
        pinnedPosts.push(p);
      } else {
        stillConsecutive = false;
        otherReplies.push(p);
      }
    });

    let finalReplies = otherReplies;
    if (!hasSelection && currentMode === "full") {
      finalReplies = otherReplies.filter(p => (p.totalInteractions || 0) > 3);
      finalReplies.sort((a, b) => b.likesCount - a.likesCount);
    }

    return { finalPosts: [...pinnedPosts, ...finalReplies], mainPost };
  }

  async function runNotionFlow() {
    chrome.storage.local.get([
      "notionToken",
      "notionMainDb"
    ], async (res) => {
      const token = res.notionToken;
      const mainDb = res.notionMainDb;

      if (!token) {
        alert("⚠️ 請先點擊齒輪設定按鈕，填寫 Notion Integration Token！");
        return;
      }

      if (!mainDb) {
        alert(`⚠️ 請先點擊設定按鈕，填寫資料庫 ID！`);
        return;
      }

      let statusEl = showStatusToast("⏳ 正在擷取並儲存到 Notion...");

      try {
        const result = await collectPosts();
        if (!result || result.finalPosts.length === 0) {
          removeStatusToast(statusEl);
          alert("⚠️ 未能擷取到貼文內容！");
          return;
        }
        const { finalPosts, mainPost } = result;

        const blocks = convertPostsToNotionBlocks(finalPosts);

        // 從主貼文內文擷取前 45 字作為預覽
        const mainTextRaw = (mainPost.text || "").replace(/\n+/g, " ").trim();
        const preview = mainTextRaw.length > 45
          ? mainTextRaw.slice(0, 45) + "…"
          : mainTextRaw || "(無內文)";
        const pageTitle = `${mainPost.username}｜${preview}`;

        const properties = {
          "Name": {
            "title": [
              { "text": { "content": pageTitle } }
            ]
          },
          "Link": {
            "url": window.location.href
          }
        };


        // 自動填入記錄時間（當下的日期）
        const now = new Date();
        const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
        properties["記錄時間"] = { "date": { "start": dateStr } };

        // 備注欄位（預留空白，使用者可在 Notion 內手動填寫）
        properties["備注"] = { "rich_text": [] };

        const payload = {
          properties,
          children: blocks
        };

        chrome.runtime.sendMessage({
          type: "SAVE_TO_NOTION",
          token,
          databaseId: mainDb,
          payload
        }, async (response) => {
          removeStatusToast(statusEl);

          if (response && response.success) {
            // 如果背景自動幫忙建了資料庫，更新儲存與 UI 輸入框
            if (response.newDbId) {
              chrome.storage.local.set({ notionMainDb: response.newDbId });
              const mainDbInput = document.getElementById("cfg-notion-main-db");
              if (mainDbInput) {
                mainDbInput.value = response.newDbId;
              }
              showNotification("🎉 已自動在頁面下為您新建資料庫！");
            } else {
              showNotification("✅ 成功儲存至 Notion 資料庫！");
            }
          } else {
            alert(`❌ 儲存失敗: ${response ? response.error : "未知原因"}`);
          }
        });

      } catch (err) {
        removeStatusToast(statusEl);
        alert("❌ 執行時發生錯誤: " + err.message);
      }
    });
  }

  // --- AI 網頁端自動填入與送出 ---
  function runAiAutofillLogic() {
    chrome.storage.local.get(["pendingPrompt"], (res) => {
      const prompt = res.pendingPrompt;
      if (!prompt) return;

      let attempts = 0;
      const maxAttempts = 30; // 9 秒最大等待時間

      const interval = setInterval(() => {
        attempts++;
        if (attempts > maxAttempts) {
          clearInterval(interval);
          chrome.storage.local.remove(["pendingPrompt"]);
          return;
        }

        let inputEl = null;
        let submitBtn = null;

        if (window.location.hostname.includes("chatgpt.com")) {
          inputEl = document.querySelector("#prompt-textarea");
          submitBtn = document.querySelector('button[data-testid="send-button"]');
        } else if (window.location.hostname.includes("gemini.google.com")) {
          inputEl = document.querySelector('.ql-editor[contenteditable="true"]') || document.querySelector('textarea');
          submitBtn = document.querySelector('button[aria-label*="Send"], button[aria-label*="傳送"]');
        } else if (window.location.hostname.includes("claude.ai")) {
          inputEl = document.querySelector('div[contenteditable="true"]');
          submitBtn = document.querySelector('button[aria-label*="Send"], button[aria-label*="Message"]');
        }

        if (inputEl) {
          clearInterval(interval);
          inputEl.focus();

          if (inputEl.tagName === "TEXTAREA" || inputEl.tagName === "INPUT") {
            inputEl.value = prompt;
          } else {
            inputEl.textContent = prompt;
          }

          inputEl.dispatchEvent(new Event("input", { bubbles: true }));
          inputEl.dispatchEvent(new Event("change", { bubbles: true }));

          chrome.storage.local.remove(["pendingPrompt"]);

          setTimeout(() => {
            if (submitBtn && !submitBtn.disabled) {
              submitBtn.click();
            } else {
              const enter = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Enter",
                code: "Enter",
                keyCode: 13
              });
              inputEl.dispatchEvent(enter);
            }
          }, 600);
        }
      }, 300);
    });
  }
})();
