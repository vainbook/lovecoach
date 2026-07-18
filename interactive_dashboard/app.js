// UC Training 雲端情感教練系統 - ⛵ 情感航海探索地圖引擎

// 1. 生成 66 個作業題目占位與示範數據 (必修 26 題 + 準備 40 題)
function generateFullOKRData() {
  const okrs = [];
  
  // 模組一：必修 (Row 1 ~ 27) — 27 題
  // A. 設定目標 (5題)
  const goalTitles = [
    "理想感情目標",
    "健康/生活習慣",
    "事業/工作/成就",
    "夢想/興趣/愛好",
    "人際關係/家庭"
  ];

  goalTitles.forEach((title, idx) => {
    okrs.push({
      rowNum: okrs.length + 1,
      object: "必修課",
      keyResult: title,
      progress: "❌",
      completedDate: "",
      tool: "＃五維度目標設定",
      actionGuide: `自信來源於知道自己要什麼，並在追求中散發專屬魅力。`,
      designDesc: `(填寫 ${title} 理想圖像)`
    });
  });

  // B. 必修一《戀愛三步驟》 (12題：3大主題與12個細項故事)
  const storyTopics = [
    "故事：興趣", "故事：生活", "故事：專業", "故事：學涯",
    "故事：人際", "故事：家庭", "故事：脆弱", "故事：童年",
    "故事：初戀", "故事：浪漫", "故事：情傷", "故事：情趣"
  ];

  storyTopics.forEach((storyTitle, idx) => {
    okrs.push({
      rowNum: okrs.length + 1,
      object: "必修課",
      keyResult: storyTitle,
      progress: "❌",
      completedDate: "",
      tool: "＃人生12故事庫",
      actionGuide: `寫下此主題印象最深的具體事件 (非單字名詞)`,
      designDesc: `(填寫 ${storyTitle} 具體印象事件)`
    });
  });

  // C. 必修二《信念行為結果》 (3題)
  const beliefTitles = ["限制性信念 01", "限制性信念 02", "限制性信念 03"];
  beliefTitles.forEach((bTitle) => {
    okrs.push({
      rowNum: okrs.length + 1,
      object: "必修課",
      keyResult: bTitle,
      progress: "❌",
      tool: "＃限制性信念診斷",
      actionGuide: `條列拆解：信念、形成原因、正負面影響`,
      designDesc: `(填寫 ${bTitle} 4 大維度)`
    });
  });

  // D. 必修三《負責任心態》 (3題)
  const victimTitles = ["受害者故事 01", "受害者故事 02", "受害者故事 03"];
  victimTitles.forEach((vTitle) => {
    okrs.push({
      rowNum: okrs.length + 1,
      object: "必修課",
      keyResult: vTitle,
      progress: "❌",
      tool: "＃薩提爾受害者翻轉",
      actionGuide: `雙層重構：受害者經歷 ➔ 負責任覺察發現`,
      designDesc: `(填寫 ${vTitle} 雙層維度)`
    });
  });

  // E. 必修四《感情價值觀》 (4題：父母感情 + 感情三門)
  okrs.push({
    rowNum: okrs.length + 1,
    object: "必修課",
    keyResult: "父母感情故事 01",
    progress: "❌",
    tool: "＃感情價值觀",
    actionGuide: "採訪父母感情故事，整理發現學習與對自身的深層影響",
    designDesc: "(填寫 採訪故事、發現學習與自身影響)"
  });

  const threeGates = [
    { name: "感情第一門", desc: "什麼類型的人會吸引你？(吸引門)" },
    { name: "感情第二門", desc: "你理想的感情狀態是什麼樣？(相處門)" },
    { name: "感情第三門", desc: "交往後什麼情況你會覺得對方就是對的人？(承諾結婚門)" }
  ];

  threeGates.forEach(gate => {
    okrs.push({
      rowNum: okrs.length + 1,
      object: "必修課",
      keyResult: gate.name,
      progress: "❌",
      tool: "＃感情價值觀標竿",
      actionGuide: gate.desc,
      designDesc: `(填寫 ${gate.name} 核心標準)`
    });
  });

  // 模組二：準備 (Row 28 ~ 67) — 40 題
  // A. 說故事課（社交故事庫盤點） (20題)
  for (let i = 1; i <= 20; i++) {
    const pad = String(i).padStart(2, '0');
    okrs.push({
      rowNum: okrs.length + 1,
      object: "個人準備",
      keyResult: `社交故事庫 ${pad}`,
      progress: "❌",
      tool: "＃故事庫盤點",
      actionGuide: `寫下值得分享的故事 ${pad} (標題＋內容)`,
      designDesc: `(填寫 故事標題與內容 ${pad}，之後補充細節)`
    });
  }

  // B. 想嘗試的興趣活動 (10題 - 一句話原因＋可附網址/照片)
  for (let i = 1; i <= 10; i++) {
    const pad = String(i).padStart(2, '0');
    okrs.push({
      rowNum: okrs.length + 1,
      object: "個人準備",
      keyResult: `興趣活動 ${pad}`,
      progress: "❌",
      tool: "＃生活挑戰清單",
      actionGuide: `寫下想嘗試的興趣活動 ${pad} (一句話原因，可附網址/照片)`,
      designDesc: `(填寫 一句話想嘗試原因＋網址照片 ${pad})`,
      needsUrl: true
    });
  }

  // C. 想去的地方 (10題 - 一句話原因＋可附網址/照片)
  for (let i = 1; i <= 10; i++) {
    const pad = String(i).padStart(2, '0');
    okrs.push({
      rowNum: okrs.length + 1,
      object: "個人準備",
      keyResult: `地點踩點 ${pad}`,
      progress: "❌",
      tool: "＃約會踩點清單",
      actionGuide: `寫下私房地點踩點 ${pad} (一句話原因，可附網址/照片)`,
      designDesc: `(填寫 一句話想去原因＋網址照片 ${pad})`,
      needsUrl: true
    });
  }

  return okrs;
}

const FULL_OKR_LIST = generateFullOKRData();

const MOCK_DATA = {
  profile: {
    bio: "熱愛探險、科技開發與高質感咖啡。希望能遇到聊得來、彼此吸引且能一同探索生活的夥伴！",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
      "", "", "", "", "", ""
    ]
  },
  okr: FULL_OKR_LIST,
  tables: {
    goals: "1. 豐富生活圈... 2. 找到彼此吸引且可長期發展的對象...",
    blueprints: [],
    stories: []
  }
};

// ⚔️ BOSS 考驗三連答題庫 (High EQ Situation Quiz Questions)
const BOSS_QUIZ_QUESTIONS = [
  {
    scenario: "1/3：對方在交友軟體說「你感覺對每個女生都這樣講喔？你是不是很花心？」此時該如何高情商化解對立？",
    options: [
      { text: "A. 急忙解釋：「沒有啦！我真的只有對你這樣說，你可以去問我朋友！」", isCorrect: false, feedback: "解釋會降低框架強度，顯得心虛。" },
      { text: "B. 幽默翻轉：「這被你發現了？但我今天只對你特別加了這句甜言蜜語 😉」", isCorrect: true, feedback: "答對了！展現自信框架與幽默感，化拉扯為曖昧！" },
      { text: "C. 嚴肅反問：「你為什麼要這樣想我？我們才剛認識捏。」", isCorrect: false, feedback: "情緒化回覆容易造成對決感。" }
    ]
  },
  {
    scenario: "2/3：第一次約會聊天時突然出現 5 秒鐘的尷尬冷場，最合適的應對態度是？",
    options: [
      { text: "A. 保持眼神平靜微笑，眼神溫和看著對方，喝口水自然開啟下個話題或調侃冷場。", isCorrect: true, feedback: "答對了！冷靜不慌張展現強大情緒穩定度！" },
      { text: "B. 趕緊慌張低頭滑手機發出乾笑：「哈哈今天天氣真好耶。」", isCorrect: false, feedback: "焦慮肢體語言會把冷場放大。" },
      { text: "C. 不停瘋狂連續問問題：「你平時喜歡看電影嗎？喜歡吃拉麵嗎？」", isCorrect: false, feedback: "身陷身查戶口式連續質問。" }
    ]
  },
  {
    scenario: "3/3：約會結束後送女方回家，傳訊息「今天跟你聊天很開心」後對方 3 小時未回覆，該怎麼做？",
    options: [
      { text: "A. 繼續連發 3 條追問：「你安全到了嗎？我是不是講錯什麼話了？」", isCorrect: false, feedback: "展現嚴重需求感與患得患失。" },
      { text: "B. 放下手機去忙自己的事，給予空間，等對方回覆或隔天再自然發分享型動態。", isCorrect: true, feedback: "恭喜！成功通過高情商考驗，展現高價值吸引框架！" },
      { text: "C. 直接封鎖對方賭氣發限時動態暗示今天真糟。", isCorrect: false, feedback: "情緒化心態破壞長遠吸引力。" }
    ]
  }
];

// 💡 19 個獎勵小知識庫
const REWARD_KNOWLEDGE_POOL = Array.from({ length: 19 }, (_, i) => {
  const pad = String(i + 1).padStart(2, '0');
  return {
    title: `💡 獎勵小知識 ${pad}`,
    desc: `(待填寫金句 / 覺察卡片 / 短語音 ${pad})`
  };
});

// 🎯 15 個實戰輕挑戰庫
const CHALLENGE_BOSS_POOL = Array.from({ length: 15 }, (_, i) => {
  const pad = String(i + 1).padStart(2, '0');
  return {
    title: `🎯 實戰輕挑戰 ${pad}`,
    desc: `(待填寫免寫字行動指令 ${pad})`
  };
});

// ⛵ 動態生成 100 格地圖 (起點 + 66 作業 + 19 小知識 + 15 輕挑戰 = 100 格)
function generate100NodesRoadmap() {
  const nodes = [
    { id: 1, type: "start", title: "起點：啟程港口 🏝️", completedDate: "07/12" }
  ];

  let taskIdx = 0;
  let rewardIdx = 0;
  let challengeIdx = 0;

  // 交替插入 66 個作業格 + 19 個小知識 + 15 個輕挑戰
  while (nodes.length < 99 && taskIdx < FULL_OKR_LIST.length) {
    // 放 1-2 個作業格
    nodes.push({
      id: nodes.length + 1,
      type: "step",
      title: FULL_OKR_LIST[taskIdx].keyResult,
      rowNum: FULL_OKR_LIST[taskIdx].rowNum,
      desc: FULL_OKR_LIST[taskIdx].designDesc
    });
    taskIdx++;

    if (taskIdx < FULL_OKR_LIST.length && nodes.length < 99) {
      nodes.push({
        id: nodes.length + 1,
        type: "step",
        title: FULL_OKR_LIST[taskIdx].keyResult,
        rowNum: FULL_OKR_LIST[taskIdx].rowNum,
        desc: FULL_OKR_LIST[taskIdx].designDesc
      });
      taskIdx++;
    }

    // 穿插體驗格 (交替放小知識與輕挑戰)
    if (nodes.length < 99) {
      if ((rewardIdx + challengeIdx) % 2 === 0 && rewardIdx < REWARD_KNOWLEDGE_POOL.length) {
        nodes.push({
          id: nodes.length + 1,
          type: "reward",
          title: REWARD_KNOWLEDGE_POOL[rewardIdx].title,
          desc: REWARD_KNOWLEDGE_POOL[rewardIdx].desc
        });
        rewardIdx++;
      } else if (challengeIdx < CHALLENGE_BOSS_POOL.length) {
        nodes.push({
          id: nodes.length + 1,
          type: "challenge",
          title: CHALLENGE_BOSS_POOL[challengeIdx].title,
          desc: CHALLENGE_BOSS_POOL[challengeIdx].desc
        });
        challengeIdx++;
      } else if (rewardIdx < REWARD_KNOWLEDGE_POOL.length) {
        nodes.push({
          id: nodes.length + 1,
          type: "reward",
          title: REWARD_KNOWLEDGE_POOL[rewardIdx].title,
          desc: REWARD_KNOWLEDGE_POOL[rewardIdx].desc
        });
        rewardIdx++;
      }
    }
  }

  // 補齊剩餘未排入的體驗格或作業
  while (nodes.length < 99) {
    if (rewardIdx < REWARD_KNOWLEDGE_POOL.length) {
      nodes.push({
        id: nodes.length + 1,
        type: "reward",
        title: REWARD_KNOWLEDGE_POOL[rewardIdx].title,
        desc: REWARD_KNOWLEDGE_POOL[rewardIdx].desc
      });
      rewardIdx++;
    } else if (challengeIdx < CHALLENGE_BOSS_POOL.length) {
      nodes.push({
        id: nodes.length + 1,
        type: "challenge",
        title: CHALLENGE_BOSS_POOL[challengeIdx].title,
        desc: CHALLENGE_BOSS_POOL[challengeIdx].desc
      });
      challengeIdx++;
    } else {
      break;
    }
  }

  // 第 100 格：終點燈塔
  nodes.push({
    id: 100,
    type: "destination",
    title: "終極目標：幸福親密關係 🏰",
    desc: "完成 100 步圓滿修練，達成全面情感蛻變！"
  });

  return nodes;
}

let customRoadmapNodes = generate100NodesRoadmap();

// ====== Google Sheets GAS 串接設定 ======
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxX_RlKz1e3k4U-u4q4rx8ipXDHSbPn_35KyXGh1NSYz1rr2OPdX92Y6r-nuNa04r3NQg/exec"; // 請在此填入中央 Router API 網址

function getOrInitializeSheetId() {
  return localStorage.getItem("helpMe_sheetId") || "";
}

let currentSheetId = ""; // 稍後於 onload 初始化
// ========================================

// 全域狀態控制
let currentApiUrl = "";
let currentData = { ...MOCK_DATA };
let activeSkillTreeCategory = 1;
let activeTaskRow = null; 
let currentCharacterTileId = 1;

let currentBossQuestionIndex = 0;
let activeBossNodeId = null;
let draggedStartIndex = null;

// 關卡分配對應 (僅保留 1 必修 27 題, 2 準備 40 題)
const STAGE_MAPPING = {
  1: Array.from({ length: 27 }, (_, i) => i + 1),   // Row 1 ~ 27 (必修 27 題)
  2: Array.from({ length: 40 }, (_, i) => i + 28)   // Row 28 ~ 67 (準備 40 題)
};


// ⛵ 豐富海洋主題 SVG 向量插圖產生器
function getNodeIconSVG(node, isDone, isStanding) {
  // 1. 終點航海燈塔 (Destination Lighthouse)
  if (node.type === "destination") {
    return `
      <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
        <polygon points="18,10 2,2 34,2" fill="url(#lightRayGrad)" opacity="0.6"/>
        <ellipse cx="18" cy="32" rx="14" ry="4" fill="#334155"/>
        <path d="M12 30 L14 12 L22 12 L24 30 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="1"/>
        <path d="M13 24 L14 18 L22 18 L23 24 Z" fill="#ef4444"/>
        <rect x="14" y="8" width="8" height="4" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
        <path d="M13 8 L18 3 L23 8 Z" fill="#ef4444"/>
        <circle cx="18" cy="10" r="3" fill="#fff" filter="drop-shadow(0 0 6px #fbbf24)"/>
        <defs>
          <linearGradient id="lightRayGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="rgba(251,191,36,0.8)"/>
            <stop offset="100%" stop-color="rgba(251,191,36,0)"/>
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  // 2. 漂流瓶 / 寶箱獎勵 (Reward Floating Bottle / Compass)
  if (node.type === "reward") {
    return `
      <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="28" rx="12" ry="4" fill="rgba(103,232,249,0.3)"/>
        <path d="M15 10 L21 10 L21 14 Q25 16 24 24 Q23 30 18 30 Q13 30 12 24 Q11 16 15 14 Z" fill="rgba(167,243,208,0.85)" stroke="#059669" stroke-width="1.2"/>
        <rect x="16" y="7" width="4" height="3" rx="1" fill="#b45309"/>
        <rect x="15" y="18" width="6" height="8" rx="1" fill="#fef08a" transform="rotate(-15 18 22)"/>
        <line x1="16" y1="20" x2="19" y2="20" stroke="#b45309" stroke-width="0.8" transform="rotate(-15 18 22)"/>
        <circle cx="26" cy="10" r="1.8" fill="#fef08a"/>
        <circle cx="9" cy="16" r="1.4" fill="#fff"/>
      </svg>
    `;
  }

  // 3. 深海巨獸海怪 🐙 (Kraken Boss Challenge)
  if (node.type === "challenge" || node.type === "achievement") {
    return `
      <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="27" rx="14" ry="5" fill="rgba(67,56,202,0.4)" stroke="#818cf8" stroke-width="1"/>
        <path d="M7 26 C4 18, 10 12, 8 7 C12 11, 10 18, 12 25 Z" fill="#9333ea" stroke="#581c87" stroke-width="0.8"/>
        <path d="M29 26 C32 18, 26 12, 28 7 C24 11, 26 18, 24 25 Z" fill="#9333ea" stroke="#581c87" stroke-width="0.8"/>
        <path d="M11 25 C10 16, 26 16, 25 25 C22 28, 14 28, 11 25 Z" fill="#7e22ce" stroke="#3b0764" stroke-width="1.2"/>
        <path d="M18 20 C14 12, 22 8, 20 4 C24 8, 20 14, 20 20 Z" fill="#c084fc" stroke="#581c87" stroke-width="1"/>
        <circle cx="15" cy="20" r="2" fill="#fde68a" stroke="#000" stroke-width="0.5"/>
        <circle cx="21" cy="20" r="2" fill="#fde68a" stroke="#000" stroke-width="0.5"/>
        <circle cx="15.2" cy="20" r="0.9" fill="#ef4444"/>
        <circle cx="21.2" cy="20" r="0.9" fill="#ef4444"/>
        <circle cx="6" cy="24" r="1" fill="#a5f3fc"/>
        <circle cx="30" cy="24" r="1" fill="#a5f3fc"/>
      </svg>
    `;
  }

  // 4. 起點港口島嶼 (Start Port Island)
  if (node.type === "start") {
    return `
      <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="24" rx="14" ry="7" fill="#fef08a" stroke="#d97706" stroke-width="1"/>
        <path d="M12 24 Q15 16, 18 10" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 Q10 8, 8 13 M18 10 Q26 8, 28 13 M18 10 Q14 2, 11 4 M18 10 Q22 2, 25 4" stroke="#15803d" stroke-width="2" stroke-linecap="round"/>
        <line x1="26" y1="24" x2="26" y2="12" stroke="#475569" stroke-width="1.5"/>
        <path d="M26 12 L33 15 L26 18 Z" fill="#ef4444"/>
      </svg>
    `;
  }



  // 0. 測試模式 / 失敗跳過 ➔ 顯示發光紅色叉叉 ❌ 圖案
  if (node.isCrossMarked || node.status === "failed") {
    return `
      <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="2"/>
        <path d="M11 11 L25 25 M25 11 L11 25" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  // 6. 完成關卡專屬向量圖案 (必修課 ➔ 島嶼 🏝️, 準備課 ➔ 小魚 🐟)
  if (isDone) {
    const isRequiredStage = (node.rowNum && node.rowNum <= 27);

    // A. 完成必修課 ➔ 陽光金黃熱帶島嶼 🏝️
    if (isRequiredStage) {
      return `
        <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
          <ellipse cx="18" cy="24" rx="14" ry="7" fill="#fde68a" stroke="#fbbf24" stroke-width="1.2"/>
          <ellipse cx="18" cy="22" rx="11" ry="5" fill="#38bdf8" opacity="0.3"/>
          <path d="M12 22 Q15 15, 17 9" stroke="#92400e" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M17 9 Q10 6, 8 11 M17 9 Q23 6, 26 11 M17 9 Q13 2, 9 5 M17 9 Q21 2, 24 5 M17 9 Q17 16, 17 16" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
          <circle cx="26" cy="22" r="6" fill="#10b981" stroke="#fff" stroke-width="1.5"/>
          <path d="M23 22 L25 24 L29 20" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }

    // B. 完成準備課 ➔ 湛藍活力熱帶小魚 🐟 (高辨識度魚身與雙鰭)
    return `
      <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
        <circle cx="6" cy="10" r="1.5" fill="rgba(125,211,252,0.6)"/>
        <circle cx="9" cy="6" r="1" fill="rgba(125,211,252,0.8)"/>
        <path d="M12 18 C14 10, 26 12, 28 18 C26 24, 14 26, 12 18 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
        <path d="M26 18 L34 11 L32 18 L34 25 Z" fill="#0284c7" stroke="#0369a1" stroke-width="1"/>
        <path d="M18 12 Q22 7, 24 13" fill="#f59e0b"/>
        <path d="M18 24 Q22 29, 24 23" fill="#f59e0b"/>
        <circle cx="16" cy="16" r="2.5" fill="#ffffff"/>
        <circle cx="15.5" cy="16" r="1.3" fill="#0f172a"/>
        <circle cx="26" cy="7" r="5" fill="#10b981" stroke="#fff" stroke-width="1.2"/>
        <path d="M23.5 7 L25.2 8.5 L28.5 5.8" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  // 7. 未解鎖神秘海岩 (Locked Island)
  return `
    <svg class="node-svg-icon" viewBox="0 0 36 36" fill="none">
      <polygon points="6,26 14,12 24,14 30,26 22,28" fill="#475569" stroke="#334155" stroke-width="1"/>
      <polygon points="14,12 20,8 24,14 18,18" fill="#64748b"/>
      <rect x="14" y="18" width="8" height="7" rx="1.5" fill="#fbbf24" stroke="#78350f" stroke-width="1"/>
      <path d="M15.5 18 V15 A2.5 2.5 0 0 1 20.5 18 V18" stroke="#fbbf24" stroke-width="1.5" fill="none"/>
    </svg>
  `;
}

// ⛵ 精緻雙帆船角色 SVG 產生器
function getCharacterSVG() {
  return `
    <div class="character-token">
      <div class="character-body">
        <svg viewBox="0 0 54 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="27" cy="48" rx="22" ry="6" fill="rgba(103,232,249,0.35)" filter="blur(1px)"/>
          <ellipse cx="27" cy="48" rx="14" ry="3.5" fill="rgba(255,255,255,0.7)"/>

          <path d="M8 38 C 12 48, 42 48, 46 38 L 42 34 L 12 34 Z" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
          <path d="M10 37 Q 27 45, 44 37" fill="none" stroke="#fbbf24" stroke-width="1.8"/>

          <line x1="27" y1="6" x2="27" y2="38" stroke="#451a03" stroke-width="2.5" stroke-linecap="round"/>

          <path d="M27 8 L27 34 L7 31 Z" fill="url(#mainSailGrad)" stroke="rgba(255,255,255,0.9)" stroke-width="1"/>
          <path d="M27 12 L27 32 L44 30 Z" fill="url(#jibSailGrad)" stroke="rgba(232,168,152,0.9)" stroke-width="1"/>

          <path d="M27 6 L36 9.5 L27 13 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="0.8"/>

          <defs>
            <linearGradient id="mainSailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#fef08a"/>
            </linearGradient>
            <linearGradient id="jibSailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f472b6"/>
              <stop offset="100%" stop-color="#e8a898"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="character-shadow"></div>
    </div>
  `;
}

// 🌊 豐富海洋生態裝飾 SVG 素材庫
const DECO_SVGS = {
  seagull: `<svg width="42" height="22" viewBox="0 0 42 22" fill="none"><path d="M2 14 Q10 2, 21 10 Q32 2, 40 14" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/><path d="M12 11 Q16 6, 21 10 Q26 6, 30 11" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" fill="none"/></svg>`,
  dolphin: `<svg width="46" height="30" viewBox="0 0 46 30" fill="none"><path d="M4 22 C10 10, 24 4, 38 12 C44 16, 42 22, 34 22 C26 22, 22 28, 16 28 C10 28, 6 26, 4 22 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/><path d="M22 6 L26 12 L18 11 Z" fill="#0284c7"/><path d="M38 12 Q44 6, 46 10 Q42 16, 38 12 Z" fill="#38bdf8"/><circle cx="34" cy="14" r="1.5" fill="#0f172a"/><path d="M2 24 Q8 18, 14 24" stroke="rgba(103,232,249,0.8)" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`,
  turtle: `<svg width="52" height="36" viewBox="0 0 52 36" fill="none"><ellipse cx="26" cy="18" rx="16" ry="12" fill="#15803d" stroke="#166534" stroke-width="1.5"/><path d="M26 6 L30 18 L26 30 M26 6 L22 18 L26 30 M12 18 L40 18" stroke="#22c55e" stroke-width="1.2"/><circle cx="44" cy="18" r="4.5" fill="#16a34a"/><circle cx="46" cy="16.5" r="1" fill="#fff"/><path d="M30 10 C36 2, 42 2, 38 12 Z" fill="#15803d"/><path d="M30 26 C36 34, 42 34, 38 24 Z" fill="#15803d"/><path d="M14 10 C10 6, 6 6, 10 12 Z" fill="#166534"/><path d="M14 26 C10 30, 6 30, 10 24 Z" fill="#166534"/></svg>`,
  whaleShark: `<svg width="78" height="42" viewBox="0 0 78 42" fill="none"><path d="M6 21 C12 6, 42 4, 68 15 C76 18, 76 24, 68 27 C42 38, 12 36, 6 21 Z" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="1.5"/><circle cx="28" cy="16" r="1.5" fill="#e0f2fe"/><circle cx="36" cy="14" r="1.5" fill="#e0f2fe"/><circle cx="44" cy="16" r="1.5" fill="#e0f2fe"/><circle cx="52" cy="18" r="1.5" fill="#e0f2fe"/><circle cx="32" cy="22" r="1.5" fill="#e0f2fe"/><circle cx="40" cy="24" r="1.5" fill="#e0f2fe"/><circle cx="48" cy="24" r="1.5" fill="#e0f2fe"/><circle cx="24" cy="26" r="1.5" fill="#e0f2fe"/><path d="M34 8 L44 14 L30 14 Z" fill="#1d4ed8"/><path d="M42 26 L48 38 L36 30 Z" fill="#1e3a8a"/><path d="M6 21 L0 8 L4 21 L0 34 Z" fill="#1d4ed8"/><circle cx="64" cy="17" r="1.8" fill="#fff"/><circle cx="64.5" cy="17" r="0.9" fill="#020617"/></svg>`,
  coral: `<svg width="34" height="38" viewBox="0 0 34 38" fill="none"><path d="M17 38 L17 20 Q10 14, 6 6 M17 24 Q24 16, 28 8 M17 28 Q12 20, 8 16" stroke="#f472b6" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="6" cy="6" r="3" fill="#fb7185"/><circle cx="28" cy="8" r="3" fill="#fb7185"/><circle cx="8" cy="16" r="2.5" fill="#f43f5e"/><circle cx="22" cy="24" r="2" fill="#38bdf8"/></svg>`,
  fish: `<svg width="36" height="24" viewBox="0 0 36 24" fill="none"><ellipse cx="16" cy="12" rx="12" ry="7" fill="#fbbf24" stroke="#d97706" stroke-width="1.2"/><polygon points="26,12 34,4 34,20" fill="#f59e0b" stroke="#d97706" stroke-width="1.2"/><circle cx="10" cy="10" r="2" fill="#0f172a"/><circle cx="10.5" cy="9.5" r="0.7" fill="#fff"/><path d="M14 15 Q18 17, 22 15" stroke="#d97706" stroke-width="1" fill="none"/></svg>`,
  buoy: `<svg width="24" height="38" viewBox="0 0 24 38" fill="none"><line x1="12" y1="38" x2="12" y2="12" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><ellipse cx="12" cy="24" rx="10" ry="5" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/><rect x="4" y="22" width="16" height="4" fill="#fff"/><circle cx="12" cy="8" r="4" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)"/></svg>`
};

// 🌟 初始化背景星星 + 飄動雲朵
function initSceneStars() {
  const starContainer = document.getElementById("sceneStars");
  if (starContainer && starContainer.children.length === 0) {
    for (let i = 0; i < 45; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 35 + "%";
      star.style.animationDelay = (Math.random() * 4).toFixed(1) + "s";
      star.style.animationDuration = (2 + Math.random() * 3).toFixed(1) + "s";
      const size = (1 + Math.random() * 2).toFixed(1);
      star.style.width = size + "px";
      star.style.height = size + "px";
      starContainer.appendChild(star);
    }
  }

  // Drifting clouds
  const cloudContainer = document.getElementById("sceneClouds");
  if (cloudContainer && cloudContainer.children.length === 0) {
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.style.top = (6 + Math.random() * 55) + "%";
      cloud.style.animationDuration = (28 + Math.random() * 35) + "s";
      cloud.style.animationDelay = (-Math.random() * 35) + "s";
      cloud.innerHTML = `<svg width="140" height="45" viewBox="0 0 140 45" fill="none">
        <ellipse cx="70" cy="28" rx="65" ry="16" fill="rgba(255,255,255,0.45)"/>
        <ellipse cx="50" cy="22" rx="35" ry="14" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="90" cy="20" rx="32" ry="12" fill="rgba(255,255,255,0.35)"/>
      </svg>`;
      cloudContainer.appendChild(cloud);
    }
  }
}

// 🌊 在每一行左右兩側交替呈現豐富海洋生態
function placeRoadsideDecorations(container, rowElement, idx) {
  const decoTypes = Object.keys(DECO_SVGS);
  const type = decoTypes[idx % decoTypes.length];
  
  let animClass = "deco-wave";
  if (type === "seagull") animClass = "deco-seagull";
  if (type === "dolphin") animClass = "deco-seagull";
  if (type === "coral") animClass = "deco-coral";
  if (type === "fish") animClass = "deco-fish";
  if (type === "turtle") animClass = "deco-turtle";
  if (type === "whaleShark") animClass = "deco-whaleshark";

  const deco = document.createElement("div");
  deco.className = `deco-element ${animClass}`;
  deco.innerHTML = DECO_SVGS[type];

  const side = (idx % 2 === 0) ? -110 : 110;
  deco.style.left = `calc(50% + ${side}px)`;
  deco.style.top = "50%";
  deco.style.transform = "translate(-50%, -50%)";
  deco.style.animationDelay = (idx * 0.25) + "s";

  rowElement.style.position = "relative";
  rowElement.appendChild(deco);
}

// 🎉 慶祝粒子效果
function spawnCelebrationParticles(nodeElement) {
  const colors = ["#34d399", "#fbbf24", "#f472b6", "#60a5fa", "#c084fc"];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.className = "confetti-particle";
    p.style.background = colors[i % colors.length];
    p.style.setProperty("--cx", (Math.random() * 60 - 30) + "px");
    p.style.setProperty("--cy", (-20 - Math.random() * 40) + "px");
    p.style.left = "50%";
    p.style.top = "50%";
    p.style.animationDelay = (i * 0.05) + "s";
    nodeElement.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

// ponytail: 根據完成的 OKR 數量，精確計算小船在地圖 100 格中對應的實際節點索引
function getStandingIndexFromData() {
  const okrs = currentData.okr || [];
  let completedCount = 0;
  okrs.forEach(item => {
    if (isCompleted(item.progress)) completedCount++;
  });

  if (completedCount === 0) return 0;

  let stepCount = 0;
  for (let i = 0; i < customRoadmapNodes.length; i++) {
    const node = customRoadmapNodes[i];
    if (node.type === "step") {
      stepCount++;
      if (stepCount === completedCount) {
        // 檢查下一格是否為獎勵或挑戰格，若是則停留於獎勵/挑戰格 (i + 1)，絕不跨越
        if (i + 1 < customRoadmapNodes.length) {
          const nextNode = customRoadmapNodes[i + 1];
          if (nextNode.type === "reward" || nextNode.type === "challenge") {
            return i + 1;
          }
        }
        // 否則停留在當前完成的作業格 (i)
        return i;
      }
    }
  }
  return 0;
}

// 🔥 動態計算與更新連續學習天數
function updateStreakCount() {
  const badgeEl = document.getElementById("headerStreakCount");
  if (!badgeEl) return;

  const okrs = currentData.okr || [];
  const uniqueDates = new Set();
  okrs.forEach(item => {
    if (isCompleted(item.progress) && item.completedDate) {
      uniqueDates.add(item.completedDate);
    }
  });

  let streakDays = uniqueDates.size;
  if (streakDays === 0) {
    const completedCount = okrs.filter(i => isCompleted(i.progress)).length;
    streakDays = completedCount > 0 ? Math.min(30, completedCount + 1) : 1;
  }

  badgeEl.innerText = streakDays;
}

// 🏰 Adventure Map Render Engine
function render2DIsometricMap() {
  const container = document.getElementById("isoWorldContainer");
  if (!container) return;
  container.innerHTML = "";

  initSceneStars();
  updateStreakCount();

  const okrs = currentData.okr || [];
  let completedCount = 0;
  okrs.forEach(item => {
    if (isCompleted(item.progress)) completedCount++;
  });

  let currentStandingIndex = getStandingIndexFromData();
  currentCharacterTileId = customRoadmapNodes[currentStandingIndex].id;

  const totalNodes = customRoadmapNodes.length;
  const visibleIndices = new Set();

  for (let i = 0; i < totalNodes; i++) {
    const isDone = i < currentStandingIndex;
    const isCurrentOrUpcoming = (i >= currentStandingIndex && i <= currentStandingIndex + 4);
    const isFinal3 = (i >= totalNodes - 3);
    if (isDone || isCurrentOrUpcoming || isFinal3) {
      visibleIndices.add(i);
    }
  }

  let fogCloudRendered = false;

  customRoadmapNodes.forEach((node, idx) => {
    const isVisible = visibleIndices.has(idx);

    if (!isVisible) {
      if (!fogCloudRendered) {
        const fogWrap = document.createElement("div");
        fogWrap.className = "pure-visual-fog-zone";
        fogWrap.innerHTML = `
          <div class="q-cloud-wrapper">
            <!-- 🔒 迷霧鎖頭圖示 -->
            <div class="fog-badge-tag">
              <span class="pulse-lock-icon">🔒</span>
            </div>

            <!-- ✨ 雲霧幾何流光晶芒 -->
            <svg class="sparkle-star star-1" viewBox="0 0 24 24" fill="none" stroke="#E8A898" stroke-width="2">
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" fill="rgba(232,168,152,0.5)"/>
            </svg>
            <svg class="sparkle-star star-2" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2">
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" fill="rgba(251,191,36,0.5)"/>
            </svg>

            <!-- ☁️ 多重有機形變霧團 (Morphing Organic Cloud Blobs) -->
            <div class="organic-fog-container">
              <div class="fog-blob fog-blob-1"></div>
              <div class="fog-blob fog-blob-2"></div>
              <div class="fog-blob fog-blob-3"></div>
            </div>

            <!-- 🌀 帶有流紋波浪動態的霧氣外緣 -->
            <svg class="q-cloud-svg" viewBox="0 0 460 180" fill="none">
              <!-- 後層深色模糊影霧 -->
              <ellipse cx="230" cy="110" rx="200" ry="50" fill="rgba(15, 23, 42, 0.9)" filter="blur(16px)" />
              
              <!-- 核心有機流動迷霧形狀 -->
              <path class="fog-swirl-path-1" d="M40 130 C 20 130, 10 95, 35 70 C 35 45, 75 35, 100 55 C 130 20, 200 15, 230 50 C 265 25, 330 35, 350 70 C 390 40, 435 65, 435 105 C 455 125, 430 155, 390 155 L 60 155 Z"
                fill="url(#qCloudGrad1)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
              
              <!-- 前層淡粉玫瑰流光霧 -->
              <path class="fog-swirl-path-2" d="M70 140 C 50 140, 40 110, 65 90 C 70 65, 120 55, 145 75 C 175 40, 240 35, 270 70 C 300 50, 360 60, 375 90 C 400 80, 425 100, 415 130 Z"
                fill="url(#qCloudGrad2)" opacity="0.65" />

              <defs>
                <linearGradient id="qCloudGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="rgba(255, 255, 255, 0.38)" />
                  <stop offset="45%" stop-color="rgba(30, 41, 59, 0.92)" />
                  <stop offset="100%" stop-color="rgba(15, 23, 42, 0.98)" />
                </linearGradient>
                <linearGradient id="qCloudGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="rgba(232, 168, 152, 0.45)" />
                  <stop offset="100%" stop-color="rgba(15, 43, 61, 0.8)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        `;
        container.appendChild(fogWrap);
        fogCloudRendered = true;
      }
      return;
    }

    const rowWrap = createSingleNodeRowElement(container, node, idx, currentStandingIndex);
    container.appendChild(rowWrap);
  });

  setTimeout(() => {
    drawGlobalContinuousTrail();
    if (hasSailedToProgress && currentCharacterTileId) {
      repositionBoatToNode(currentCharacterTileId);
    } else {
      repositionBoatToNode(currentCharacterTileId);
    }
  }, 100);
}

// 🧱 獨立封裝單一節點 HTML Row 產生器
function createSingleNodeRowElement(container, node, idx, currentStandingIndex) {
  const rowWrap = document.createElement("div");
  rowWrap.className = "iso-row";
  rowWrap.dataset.nodeIdx = idx;

  // 🌊 大波浪 S 彎固定幾何演算：每 8 格全自動算入極致 ±120px S 彎 (永遠不被 DOM 結構干擾)
  const S_WAVE_CYCLE = [0, 70, 120, 70, 0, -70, -120, -70];
  const offsetX = S_WAVE_CYCLE[idx % S_WAVE_CYCLE.length];
  rowWrap.style.setProperty("--s-offset-x", `${offsetX}px`);
  rowWrap.style.transform = `translateX(${offsetX}px)`;

  const isStanding = (idx === currentStandingIndex);
  const isDone = (idx < currentStandingIndex);

  let statusClass = isStanding ? "status-current" : (isDone ? "status-done" : "status-locked");
  let typeClass = "";
  if (node.type === "start") typeClass = "type-start";
  if (node.type === "reward") typeClass = "type-reward";
  if (node.type === "challenge" || node.type === "achievement") typeClass = "type-challenge";
  if (node.type === "destination") typeClass = "type-destination";
  if (node.type === "achievement") typeClass = "type-achievement";

  const adventureNode = document.createElement("div");
  adventureNode.id = `iso-cube-${node.id}`;
  adventureNode.className = `adventure-node ${statusClass} ${typeClass}`;

  if (node.type === "start") node.completedDate = node.completedDate || "07/17";
  const dateText = node.completedDate || (isDone ? "07/17" : "");
  const iconSVG = getNodeIconSVG(node, isDone, isStanding);
  const dateBadgeHtml = dateText ? `<span class="node-date-badge">${dateText}</span>` : "";

  adventureNode.innerHTML = `
    <div class="node-circle">
      ${iconSVG}
    </div>
    <span class="node-num-badge">#${idx + 1}</span>
    ${dateBadgeHtml}
  `;

  const tag = document.createElement("div");
  tag.id = `iso-tag-${node.id}`;
  tag.className = "iso-tag";
  tag.innerHTML = `
    <div class="tag-title">
      <span>${isStanding ? `探險步數 #${idx + 1}` : (isDone || node.type === 'reward' || node.type === 'challenge' ? node.title : `成就步數 #${idx + 1}`)}</span>
    </div>
    <div class="tag-status">${isStanding ? '👉 當前停佇位置' : (isDone ? `已完成 (${dateText || '已解鎖'}) ✓` : '待解鎖 🔒')}</div>
    ${node.desc ? `<div class="text-[10px] text-brand-beige/60 mt-1">${node.desc}</div>` : ''}
  `;

  adventureNode.onclick = (e) => {
    e.stopPropagation();

    if (node.type === "challenge" || node.type === "achievement") {
      openBossQuizModal(node.id);
      return;
    }

    if (node.type === "reward") {
      triggerAutoExperienceModal(node);
      return;
    }

    if (node.rowNum) {
      openHomeworkModal(node.rowNum);
      return;
    }

    const allTags = container.querySelectorAll(".iso-tag");
    allTags.forEach(t => {
      if (t !== tag) t.classList.remove("active-pin");
    });
    tag.classList.toggle("active-pin");
  };

  tag.onclick = adventureNode.onclick;

  adventureNode.appendChild(tag);
  rowWrap.appendChild(adventureNode);

  placeRoadsideDecorations(container, rowWrap, idx);

  return rowWrap;
}

// ☁️ 方案 A 核心：動態揭露迷霧（當小船前進時，永遠保持前面 4 格視野，迷霧向上消散推開）
function updateMapFogVisibility(currentStandingIndex) {
  const container = document.getElementById("isoWorldContainer");
  if (!container) return;

  const totalNodes = customRoadmapNodes.length;
  const visibleIndices = new Set();

  for (let i = 0; i < totalNodes; i++) {
    const isDone = i < currentStandingIndex;
    const isCurrentOrUpcoming = (i >= currentStandingIndex && i <= currentStandingIndex + 4);
    const isFinal3 = (i >= totalNodes - 3);
    if (isDone || isCurrentOrUpcoming || isFinal3) {
      visibleIndices.add(i);
    }
  }

  const fogZone = container.querySelector(".pure-visual-fog-zone");

  customRoadmapNodes.forEach((node, idx) => {
    if (visibleIndices.has(idx)) {
      const existingRow = container.querySelector(`.iso-row[data-node-idx="${idx}"]`);
      if (!existingRow) {
        const newRow = createSingleNodeRowElement(container, node, idx, currentStandingIndex);
        newRow.classList.add("fog-revealed-row");

        if (fogZone) {
          container.insertBefore(newRow, fogZone);
        } else {
          container.appendChild(newRow);
        }
      }
    }
  });

  // 移動迷霧至最新未揭露格子前
  const normalVisibleArray = Array.from(visibleIndices).filter(i => i < totalNodes - 3);
  const lastNormalVisibleIndex = Math.max(...normalVisibleArray);
  const lastNormalRow = container.querySelector(`.iso-row[data-node-idx="${lastNormalVisibleIndex}"]`);
  if (fogZone && lastNormalRow) {
    lastNormalRow.after(fogZone);
  }

  // 完全同步重繪軌跡，與 DOM 更新在同一個 Frame 處理，避免中斷動畫導致卡頓與位移
  drawGlobalContinuousTrail();
}



let hasSailedToProgress = false;

// ⛵ 初始化全域帆船小船 Token (預設錨定在最底部的港口沙灘處)
function initGlobalSailingBoat() {
  const container = document.getElementById("isoWorldContainer");
  if (!container) return null;

  let boat = document.getElementById("globalSailingBoat");
  if (!boat) {
    boat = document.createElement("div");
    boat.id = "globalSailingBoat";
    boat.className = "anchored-at-harbor";
    boat.innerHTML = getCharacterSVG();
    container.appendChild(boat);

    // 初始座標：定格在地圖最底部的港口沙灘處 (Center Bottom)
    const containerWidth = container.offsetWidth || 400;
    const containerHeight = container.offsetHeight || 1200;
    boat.style.left = `${containerWidth / 2}px`;
    boat.style.top = `${containerHeight - 80}px`;
  }
  return boat;
}

// ⛵ 重繪地圖時鎖定小船位置（靜態靠岸，不觸發重新起航或跑回沙灘）
function repositionBoatToNode(nodeId) {
  const container = document.getElementById("isoWorldContainer");
  const targetCube = document.getElementById(`iso-cube-${nodeId}`);
  let boat = document.getElementById("globalSailingBoat");

  if (!container || !targetCube) return;
  if (!boat) boat = initGlobalSailingBoat();

  const rowWrap = targetCube.parentElement;
  const sOffset = parseFloat(rowWrap.style.getPropertyValue('--s-offset-x')) || 0;

  const targetX = rowWrap.offsetLeft + targetCube.offsetLeft + (targetCube.offsetWidth / 2) + sOffset;
  const targetY = rowWrap.offsetTop + targetCube.offsetTop;

  boat.style.transition = "none";
  boat.classList.remove("anchored-at-harbor");
  boat.classList.add("docked-at-node");
  boat.style.left = `${targetX}px`;
  boat.style.top = `${targetY}px`;
}

// ⛵ 小船動態起航：依距離動態計算滑行時間（越遠跑越久），展現極致濕滑推進
function sailBoatToProgressNode(nodeId, onArrivalCallback) {
  const container = document.getElementById("isoWorldContainer");
  const targetCube = document.getElementById(`iso-cube-${nodeId}`);
  let boat = document.getElementById("globalSailingBoat");

  if (!container || !targetCube) {
    if (typeof onArrivalCallback === "function") onArrivalCallback();
    return;
  }
  if (!boat) boat = initGlobalSailingBoat();

  hasSailedToProgress = true;

  const rowWrap = targetCube.parentElement;
  const sOffset = parseFloat(rowWrap.style.getPropertyValue('--s-offset-x')) || 0;

  const targetX = rowWrap.offsetLeft + targetCube.offsetLeft + (targetCube.offsetWidth / 2) + sOffset;
  const targetY = rowWrap.offsetTop + targetCube.offsetTop;

  const currentX = parseFloat(boat.style.left) || (container.offsetWidth / 2);
  const currentY = parseFloat(boat.style.top) || (container.offsetHeight - 80);

  // 動態距離物理運算
  const dist = Math.hypot(targetX - currentX, targetY - currentY);
  // 動態滑行時間：短距離 1.8 秒，超長距離最高 4.5 秒
  const durationSec = Math.max(1.8, Math.min(4.5, dist * 0.0035)).toFixed(2);

  boat.style.transition = `top ${durationSec}s cubic-bezier(0.25, 1, 0.35, 1), left ${durationSec}s cubic-bezier(0.25, 1, 0.35, 1)`;

  requestAnimationFrame(() => {
    boat.classList.remove("anchored-at-harbor");
    boat.classList.add("docked-at-node");
    boat.style.left = `${targetX}px`;
    boat.style.top = `${targetY}px`;
  });

  // 當小船平安靠岸目的地後執行 Callback
  if (typeof onArrivalCallback === "function") {
    setTimeout(onArrivalCallback, durationSec * 1000);
  }
}



// 🗺️ Draw thick warm adventure trail path
function drawGlobalContinuousTrail() {
  const container = document.getElementById("isoWorldContainer");
  if (!container) return;

  const oldSvg = container.querySelector(".global-trail-svg-overlay");
  if (oldSvg) oldSvg.remove();

  const rows = Array.from(container.querySelectorAll(".iso-row"));
  if (rows.length === 0) return;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.scrollHeight;
  const points = [];

  rows.forEach(row => {
    const node = row.querySelector(".adventure-node");
    if (node) {
      const sOffset = parseFloat(row.style.getPropertyValue('--s-offset-x')) || 0;
      const x = row.offsetLeft + node.offsetLeft + (node.offsetWidth / 2) + sOffset;
      const y = row.offsetTop + node.offsetTop + (node.offsetHeight / 2);
      points.push({ x, y, idx: parseInt(row.dataset.nodeIdx || 0) });
    }
  });

  if (points.length < 2) return;

  const okrs = currentData.okr || [];
  let completedCount = 0;
  okrs.forEach(item => { if (isCompleted(item.progress)) completedCount++; });

  let donePathStr = "";
  let undonePathStr = "";

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const cy = (p1.y + p2.y) / 2;
    const segmentCmd = `M ${p1.x},${p1.y} C ${p1.x},${cy} ${p2.x},${cy} ${p2.x},${p2.y} `;

    if (p1.idx < completedCount && p2.idx <= completedCount) {
      donePathStr += segmentCmd;
    } else {
      undonePathStr += segmentCmd;
    }
  }

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("class", "global-trail-svg-overlay");
  svgEl.setAttribute("viewBox", `0 0 ${containerWidth} ${containerHeight}`);
  svgEl.style.width = `${containerWidth}px`;
  svgEl.style.height = `${containerHeight}px`;

  if (donePathStr) {
    const doneBorder = document.createElementNS("http://www.w3.org/2000/svg", "path");
    doneBorder.setAttribute("class", "trail-done-border");
    doneBorder.setAttribute("d", donePathStr);
    svgEl.appendChild(doneBorder);

    const donePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    donePath.setAttribute("class", "trail-done");
    donePath.setAttribute("d", donePathStr);
    svgEl.appendChild(donePath);
  }

  if (undonePathStr) {
    const undonePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    undonePath.setAttribute("class", "trail-undone");
    undonePath.setAttribute("d", undonePathStr);
    svgEl.appendChild(undonePath);
  }

  container.prepend(svgEl);
}

// 初始化頁面
window.onload = function() {
  currentSheetId = getOrInitializeSheetId();

  // 1. 先從 LocalStorage 載入快取，讓畫面瞬間繪製
  const savedData = localStorage.getItem("helpMeDashboardData");
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      currentData = parsed;
    } catch (e) {
      console.error("Local data parse error", e);
      currentData = { ...MOCK_DATA };
    }
  } else {
    currentData = { ...MOCK_DATA };
  }

  // 2. 將已綁定的 Sheet ID 顯示在 UI 輸入框
  if (currentSheetId) {
    document.getElementById("apiUrlInput").value = "https://docs.google.com/spreadsheets/d/" + currentSheetId;
    const badge = document.getElementById("connectionBadge");
    if(badge) {
      badge.innerHTML = `<span class="w-1.5 h-1.5 mr-1.5 bg-emerald-400 rounded-full"></span>已連線專屬作業本`;
      badge.className = "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    }
  }

  renderUI();
  window.addEventListener('resize', drawGlobalContinuousTrail);

  // 3. 背景非同步向 Google Sheet 請求最新進度，若有差異則覆蓋並重新渲染
  fetchDataFromGoogleSheet();
};

// 從 Google Sheets 中央 API 讀取進度還原
async function fetchDataFromGoogleSheet() {
  if (!GAS_WEB_APP_URL || !currentSheetId) return;

  try {
    const url = `${GAS_WEB_APP_URL}?action=getTasks&sheetId=${currentSheetId}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json.status === "success" && json.data) {
      const okrs = currentData.okr || [];
      let hasChanges = false;

      // 遍歷雲端回傳的最新狀態，覆蓋本地狀態
      json.data.forEach(cloudTask => {
        const localTask = okrs.find(item => item.keyResult === cloudTask.taskName);
        if (localTask) {
          if (localTask.progress !== cloudTask.progressStatus || localTask.userContent !== cloudTask.content) {
             localTask.progress = cloudTask.progressStatus;
             localTask.userContent = cloudTask.content;
             hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        saveDataToStorage();
        console.log("已從 Google Sheets 成功還原進度！");
        // 如果有變化，強制小船重置動畫起點，並重新渲染整個畫面
        hasSailedToProgress = false;
        renderUI();
      }
    }
  } catch (err) {
    console.error("Fetch from GAS error", err);
  }
}

// 本地與遠端同步函式
function saveDataToStorage() {
  localStorage.setItem("helpMeDashboardData", JSON.stringify(currentData));
}

async function syncDataToGoogleSheet(taskName, progressStatus, content) {
  if (!GAS_WEB_APP_URL || !currentSheetId) {
    console.log("未設定 API URL 或 Sheet ID，略過雲端同步。");
    return;
  }

  try {
    const payload = {
      action: "saveTask",
      sheetId: currentSheetId,
      taskName: taskName,
      progressStatus: progressStatus,
      content: content
    };

    // 使用 text/plain 避免 CORS preflight options
    fetch(GAS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).then(r => r.json()).then(res => {
      console.log("作業已成功背景同步至 Google Sheets:", res);
    }).catch(err => console.error("背景上傳失敗:", err));
  } catch (err) {
    console.error("GAS Sync error", err);
  }
}

// 連線試算表 API
function connectApi() {
  const url = document.getElementById("apiUrlInput").value.trim();
  if (!url) {
    alert("請貼上教練發給你的『專屬作業本 (Google Sheet) 網址』");
    return;
  }
  
  // 萃取 Sheet ID
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const sheetId = match ? match[1] : url;
  
  localStorage.setItem("helpMe_sheetId", sheetId);
  currentSheetId = sheetId;
  
  const badge = document.getElementById("connectionBadge");
  if(badge) {
    badge.innerHTML = `<span class="w-1.5 h-1.5 mr-1.5 bg-emerald-400 rounded-full animate-ping"></span>連線中...`;
    badge.className = "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  }

  fetchDataFromGoogleSheet();
}

// 從 API 拉取資料
async function fetchDataFromApi() {
  const badge = document.getElementById("connectionBadge");
  badge.innerHTML = `<span class="w-1.5 h-1.5 mr-1.5 bg-brand-accent rounded-full animate-ping"></span>載入中...`;
  badge.className = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-accent/10 text-brand-accent border border-brand-accent/20";

  try {
    const response = await fetch(currentApiUrl);
    const json = await response.json();
    if (json.success && json.data) {
      currentData = json.data;
      badge.innerHTML = `<span class="w-1.5 h-1.5 mr-1.5 bg-emerald-400 rounded-full"></span>已連線試算表`;
      badge.className = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      renderUI();
    } else {
      throw new Error(json.error || "API 資料解析錯誤");
    }
  } catch (err) {
    console.error(err);
    alert("API 連線失敗，將切回『演示模式』測試。\n錯誤詳情: " + err.message);
    currentData = { ...MOCK_DATA };
    badge.innerHTML = `<span class="w-1.5 h-1.5 mr-1.5 bg-amber-400 rounded-full animate-pulse"></span>演示模式`;
    badge.className = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20";
    renderUI();
  }
}

// 重新渲染 UI 畫面
function renderUI() {
  calculateOverallProgress();
  render2DIsometricMap();
}

// 計算總進度
function calculateOverallProgress() {
  const okrs = currentData.okr || [];
  const total = okrs.length;
  let completed = 0;
  
  okrs.forEach(item => {
    if (isCompleted(item.progress)) completed++;
  });

  const countEl = document.getElementById("completedTaskCount");
  if (countEl) countEl.innerText = completed;
  const totalEl = document.getElementById("totalTaskCount");
  if (totalEl) totalEl.innerText = total;
  
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const barEl = document.getElementById("overallProgressBar");
  if (barEl) barEl.style.width = percentage + "%";
}

// 判斷 OKR 進度是否算已完成
function isCompleted(progress) {
  if (!progress) return false;
  const p = progress.toString().trim();
  return p === "✔️" || p === "checked" || p === "4/4" || p === "12/12" || p === "9/9" || p === "3/3" || p === "5/5" || p === "30/30" || p === "9/9";
}

// ⚔️ 打開 BOSS 情境三連答 Modal
function openBossQuizModal(nodeId) {
  activeBossNodeId = nodeId;
  currentBossQuestionIndex = 0;
  
  const modal = document.getElementById("bossQuizModal");
  renderBossQuizQuestion();

  modal.classList.remove("opacity-0", "pointer-events-none");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-95");
  modalBox.classList.add("scale-100");
}

function closeBossQuizModal() {
  const modal = document.getElementById("bossQuizModal");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-100");
  modalBox.classList.add("scale-95");
  modal.classList.add("opacity-0", "pointer-events-none");
  setModalState(false);
}

// 渲染當前 BOSS 考驗題目 (100% 互動卡片卡內顯示，不呼叫原生網頁 alert)
function renderBossQuizQuestion() {
  const container = document.getElementById("bossQuizOptionsContainer");
  if (!container) return;
  container.innerHTML = "";

  const footer = document.getElementById("bossQuizFooter");

  if (currentBossQuestionIndex >= BOSS_QUIZ_QUESTIONS.length) {
    document.getElementById("bossQuizStepProgress").innerText = "🏆 挑戰通關！BOSS 考驗完美擊退！";
    document.getElementById("bossQuestionScenario").innerText = "🎉 恭喜！你展現了極高情商的溝通與情緒掌控力，成功通過連答考驗！";

    container.innerHTML = `
      <div class="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
        <div class="text-3xl">⚔️ ➔ 🏆</div>
        <h4 class="font-bold text-sm text-emerald-300">連勝解鎖！成就已歸檔至典藏冊</h4>
        <p class="text-xs text-brand-beige/70">小船將佇立於當前關卡，等待你完成下一個作業！</p>
      </div>
    `;

    if (footer) {
      footer.innerHTML = `
        <button onclick="closeBossQuizModal()" class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-brand-navy font-bold text-xs py-2.5 rounded-xl transition-all shadow-md hover:scale-[1.02]">
          完成挑戰 🏆
        </button>
      `;
    }
    return;
  }

  if (footer) {
    footer.innerHTML = `
      <span class="text-xs text-brand-beige/40">連續答對 3 題即可成功擊退 BOSS 考驗！</span>
      <button onclick="closeBossQuizModal()" class="text-brand-beige/60 hover:text-brand-beige text-xs font-semibold px-4 py-2">
        暫時關閉
      </button>
    `;
  }

  const qData = BOSS_QUIZ_QUESTIONS[currentBossQuestionIndex];
  document.getElementById("bossQuizStepProgress").innerText = `題目 ${currentBossQuestionIndex + 1} / ${BOSS_QUIZ_QUESTIONS.length}：考驗高情商應答反應`;
  document.getElementById("bossQuestionScenario").innerText = qData.scenario;

  qData.options.forEach((opt) => {
    const optEl = document.createElement("div");
    optEl.className = "p-3.5 bg-brand-navy/60 border border-cardBorder rounded-xl cursor-pointer hover:border-brand-accent/50 transition-all space-y-1.5";
    optEl.innerHTML = `
      <div class="text-xs text-brand-beige font-medium">${opt.text}</div>
      <div class="quiz-feedback-box hidden text-[11px] font-semibold p-2 rounded-lg"></div>
    `;

    optEl.onclick = () => {
      const fbBox = optEl.querySelector(".quiz-feedback-box");
      if (opt.isCorrect) {
        optEl.className = "p-3.5 bg-emerald-500/15 border-2 border-emerald-500 rounded-xl transition-all space-y-1.5";
        fbBox.className = "quiz-feedback-box block text-[11px] font-semibold p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
        fbBox.innerText = `✓ ${opt.feedback}`;

        setTimeout(() => {
          currentBossQuestionIndex++;
          renderBossQuizQuestion();
        }, 1100);
      } else {
        optEl.className = "p-3.5 bg-red-500/15 border-2 border-red-500 rounded-xl transition-all space-y-1.5";
        fbBox.className = "quiz-feedback-box block text-[11px] font-semibold p-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30";
        fbBox.innerText = `❌ 回覆心態提示：${opt.feedback}`;
      }
    };

    container.appendChild(optEl);
  });
}

// 統一管理 Modal 開啟與關閉狀態
function setModalState(isOpen) {
  if (isOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
}

// 📋 開啟「已完成任務檢視與拖曳排序」Modal
function openOverviewModal() {
  const modal = document.getElementById("overviewModal");
  renderDraggableOverviewList();

  setModalState(true);
  modal.classList.remove("opacity-0", "pointer-events-none");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-95");
  modalBox.classList.add("scale-100");
}

function closeOverviewModal() {
  const modal = document.getElementById("overviewModal");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-100");
  modalBox.classList.add("scale-95");
  modal.classList.add("opacity-0", "pointer-events-none");
  setModalState(false);
}

// 渲染可拖曳排序的已完成成就列表
function renderDraggableOverviewList() {
  const container = document.getElementById("draggableCompletedListContainer");
  container.innerHTML = "";

  const okrs = currentData.okr || [];
  let completedCount = 0;
  okrs.forEach(item => { if (isCompleted(item.progress)) completedCount++; });

  const completedNodes = customRoadmapNodes.slice(0, completedCount + 1);

  if (completedNodes.length === 0) {
    container.innerHTML = `<p class="text-xs text-brand-beige/50 text-center py-6">目前尚未解鎖成就任務，挑戰技能樹開始你的第一個通關吧！</p>`;
    return;
  }

  completedNodes.forEach((node, idx) => {
    const itemEl = document.createElement("div");
    itemEl.className = "drag-item-row";
    itemEl.draggable = true;
    itemEl.dataset.idx = idx;

    itemEl.innerHTML = `
      <div class="flex items-center space-x-3">
        <span class="drag-handle text-base">☰</span>
        <div class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
          #${idx + 1}
        </div>
        <div>
          <h5 class="font-bold text-xs text-brand-beige">${node.title}</h5>
          <p class="text-[10px] text-brand-beige/40">解鎖日期：${node.completedDate || '07/16'}</p>
        </div>
      </div>
      <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
        已通關 ✓
      </span>
    `;

    itemEl.ondragstart = (e) => {
      draggedStartIndex = idx;
      itemEl.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    };

    itemEl.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    itemEl.ondragend = () => {
      itemEl.classList.remove("dragging");
    };

    itemEl.ondrop = (e) => {
      e.preventDefault();
      const targetIndex = idx;
      if (draggedStartIndex !== null && draggedStartIndex !== targetIndex) {
        const movedNode = customRoadmapNodes.splice(draggedStartIndex, 1)[0];
        customRoadmapNodes.splice(targetIndex, 0, movedNode);

        renderDraggableOverviewList();
        render2DIsometricMap();
      }
    };

    container.appendChild(itemEl);
  });
}

// 👤 個人資料設定 Modal 控制
function openProfileModal() {
  const modal = document.getElementById("profileModal");
  if (!currentData.profile) {
    currentData.profile = { bio: "", photos: Array(9).fill("") };
  }

  document.getElementById("profileBioInput").value = currentData.profile.bio || "";
  renderProfileGrid();

  setModalState(true);
  modal.classList.remove("opacity-0", "pointer-events-none");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-95");
  modalBox.classList.add("scale-100");
}

function closeProfileModal() {
  const modal = document.getElementById("profileModal");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-100");
  modalBox.classList.add("scale-95");
  modal.classList.add("opacity-0", "pointer-events-none");
  setModalState(false);
}

// 渲染 9 宮格槽位
function renderProfileGrid() {
  const container = document.getElementById("profile9GridContainer");
  container.innerHTML = "";

  const photos = currentData.profile.photos || Array(9).fill("");

  for (let i = 0; i < 9; i++) {
    const photoUrl = photos[i];
    const slot = document.createElement("div");
    slot.className = "photo-slot";
    slot.onclick = () => uploadProfileGridPhoto(i);

    if (photoUrl) {
      slot.innerHTML = `
        <span class="slot-number">#${i + 1}</span>
        <img src="${photoUrl}" alt="Photo ${i + 1}" />
      `;
    } else {
      slot.innerHTML = `
        <span class="slot-number">#${i + 1}</span>
        <div class="text-center p-2 text-brand-beige/40">
          <svg class="w-6 h-6 mx-auto mb-1 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"/>
          </svg>
          <span class="text-[10px]">新增照片</span>
        </div>
      `;
    }

    container.appendChild(slot);
  }
}

// 上傳 9 宮格照片
function uploadProfileGridPhoto(index) {
  const newUrl = prompt(`請輸入第 #${index + 1} 張交友軟體照片的圖片網址 (URL)：`, currentData.profile.photos[index] || "");
  if (newUrl !== null) {
    currentData.profile.photos[index] = newUrl.trim();
    renderProfileGrid();
  }
}

// 儲存個人資料 Modal 內容
function saveProfileModal() {
  const bio = document.getElementById("profileBioInput").value.trim();
  currentData.profile.bio = bio;

  alert("個人簡介與交友軟體 9 宮格排版已成功儲存並同步！");
  closeProfileModal();

  if (currentApiUrl) {
    postToApi({
      action: "updateProfile",
      profile: currentData.profile
    });
  }
}

// 🎮 打開必修/準備課程 Modal（可摺疊分組版）
function openSkillTreeCategory(categoryStageId) {
  activeSkillTreeCategory = categoryStageId;
  const modal = document.getElementById("skillTreeModal");
  const modalTitle = document.getElementById("skillTreeCategoryTitle");
  const container = document.getElementById("skillTreeNodesContainer");

  const titles = {
    1: "🎓 必修課程",
    2: "🎒 準備課程"
  };

  modalTitle.innerText = titles[categoryStageId] || "課程任務";
  container.innerHTML = "";

  const okrs = currentData.okr || [];
  const targetRowNums = STAGE_MAPPING[categoryStageId] || [];
  const stageTasks = okrs.filter(t => targetRowNums.includes(t.rowNum));

  // 定義分組 (必修: 目標/戀愛三步驟/信念覺察/受害者翻轉/感情價值觀, 準備: 故事庫/興趣活動/想去的地方)
  const GROUPS = categoryStageId === 1
    ? [
        { label: "🎯 設定目標", match: t => t.rowNum >= 1 && t.rowNum <= 5 },
        { label: "💕 戀愛三步驟 — 邂逅吸引", match: t => t.rowNum >= 6 && t.rowNum <= 9 },
        { label: "💕 戀愛三步驟 — 走入心房", match: t => t.rowNum >= 10 && t.rowNum <= 13 },
        { label: "💕 戀愛三步驟 — 親密關係", match: t => t.rowNum >= 14 && t.rowNum <= 17 },
        { label: "🔍 限制性信念覺察", match: t => t.rowNum >= 18 && t.rowNum <= 20 },
        { label: "🔄 受害者故事翻轉", match: t => t.rowNum >= 21 && t.rowNum <= 23 },
        { label: "❤️ 感情價值觀", match: t => t.rowNum >= 24 && t.rowNum <= 27 },
      ]
    : [
        { label: "📖 社交故事庫", match: t => t.keyResult && t.keyResult.startsWith("社交故事") },
        { label: "🎨 想嘗試的興趣活動", match: t => t.keyResult && t.keyResult.startsWith("興趣活動") },
        { label: "📍 想去的地方", match: t => t.keyResult && t.keyResult.startsWith("地點踩點") },
      ];

  GROUPS.forEach((group, gIdx) => {
    const groupTasks = stageTasks.filter(group.match);
    if (groupTasks.length === 0) return;

    const completedInGroup = groupTasks.filter(t => isCompleted(t.progress)).length;
    const allDone = completedInGroup === groupTasks.length;

    const section = document.createElement("div");
    section.className = "mb-3";
    section.innerHTML = `
      <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('.chevron-icon').classList.toggle('rotate-90')"
        class="w-full flex items-center justify-between p-3 rounded-xl border ${allDone ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-cardBorder bg-brand-navy/40'} hover:bg-brand-navy/60 transition-all cursor-pointer">
        <div class="flex items-center space-x-2">
          <span class="text-sm font-bold ${allDone ? 'text-emerald-400' : 'text-brand-beige'}">${group.label}</span>
          <span class="text-[10px] ${allDone ? 'text-emerald-400/70' : 'text-brand-beige/40'}">${completedInGroup}/${groupTasks.length}</span>
        </div>
        <svg class="chevron-icon w-4 h-4 ${allDone ? 'text-emerald-400' : 'text-brand-beige/50'} transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/>
        </svg>
      </button>
      <div class="space-y-2 mt-2 hidden">
      </div>
    `;

    const itemsWrap = section.querySelector("div.space-y-2");
    groupTasks.forEach(task => {
      const completed = isCompleted(task.progress);
      const nodeEl = document.createElement("div");
      nodeEl.className = `skill-tree-node ${completed ? 'completed' : ''}`;
      nodeEl.onclick = () => {
        closeSkillTreeModal();
        openHomeworkModal(task.rowNum);
      };
      nodeEl.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg ${completed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-brand-accent/10 text-brand-accent border-brand-accent/30'} border flex items-center justify-center font-bold text-xs shrink-0">
            ${completed ? '✓' : '⚡'}
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-xs text-brand-beige font-serif truncate">${task.keyResult}</h4>
          </div>
        </div>
        <span class="text-[11px] ${completed ? 'text-emerald-400 bg-emerald-500/10' : 'text-brand-accent bg-brand-accent/10'} font-semibold px-2.5 py-1 rounded-lg border border-current whitespace-nowrap shrink-0">
          ${completed ? '已完成 ✓' : '寫作 ➔'}
        </span>
      `;
      itemsWrap.appendChild(nodeEl);
    });

    container.appendChild(section);
  });

  setModalState(true);
  modal.classList.remove("opacity-0", "pointer-events-none");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-95");
  modalBox.classList.add("scale-100");
}

function closeSkillTreeModal() {
  const modal = document.getElementById("skillTreeModal");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-100");
  modalBox.classList.add("scale-95");
  modal.classList.add("opacity-0", "pointer-events-none");
  setModalState(false);
}

// 彈出式「作業填寫引導 Modal」
function openHomeworkModal(rowNum) {
  activeTaskRow = rowNum;
  const okrs = currentData.okr || [];
  const task = okrs.find(item => item.rowNum === rowNum);
  if (!task) return;

  const key = task.keyResult;
  const scaffold = (typeof HOMEWORK_SCAFFOLDING !== "undefined") ? HOMEWORK_SCAFFOLDING[key] : null;
  
  document.getElementById("modalTitle").innerText = scaffold ? scaffold.title : `✍️ 填寫關卡作業：${key}`;
  
  const tipsContainer = document.getElementById("modalTips");
  if (scaffold && scaffold.tips) {
    const tipsList = Array.isArray(scaffold.tips) 
      ? scaffold.tips.map(t => `<p class="text-xs text-brand-beige leading-relaxed mb-1">${t}</p>`).join("")
      : `<p class="text-xs text-brand-beige leading-relaxed">${scaffold.tips}</p>`;
    tipsContainer.innerHTML = `
      <div class="p-3 bg-brand-accent/10 rounded-xl border border-brand-accent/20 mb-3 space-y-1">
        ${tipsList}
      </div>
    `;
  } else {
    tipsContainer.innerHTML = `
      <div class="p-3 bg-brand-accent/10 rounded-xl border border-brand-accent/20 mb-3">
        <p class="text-xs text-brand-beige leading-relaxed">
          <strong>提示：</strong> ${task.actionGuide || '請在此填寫作業內容'}
        </p>
        <p class="text-[11px] text-brand-beige/60 mt-1">${task.designDesc || '(待填寫具體題目內容，先留白供討論與預覽)'}</p>
      </div>
    `;
  }

  const inputsContainer = document.getElementById("modalInputsContainer");
  if (scaffold && scaffold.type === "url_text") {
    inputsContainer.innerHTML = `
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-brand-beige/70 mb-1">📝 一句話原因 / 說明：</label>
          <textarea id="homeworkTextInput" rows="2" placeholder="${scaffold.placeholderReason || '請寫下理由...'}" 
            class="w-full bg-brand-navy border border-cardBorder text-brand-beige rounded-xl p-3 text-xs focus:border-brand-accent outline-none"></textarea>
        </div>
        <div>
          <label class="block text-xs text-emerald-400 font-bold mb-1">🔗 參考連結 / 照片網址 (URL)：</label>
          <input type="url" id="homeworkUrlInput" placeholder="${scaffold.placeholderUrl || 'https://...'}" 
            class="w-full bg-brand-navy border border-emerald-500/40 text-brand-beige rounded-xl p-2.5 text-xs focus:border-emerald-400 outline-none" />
        </div>
      </div>
    `;
  } else if (scaffold && scaffold.type === "textarea") {
    inputsContainer.innerHTML = `
      <textarea id="homeworkTextInput" rows="4" placeholder="${scaffold.placeholder || '寫下你的心得與答案...'}" 
        class="w-full bg-brand-navy border border-cardBorder text-brand-beige rounded-xl p-3 text-xs focus:border-brand-accent outline-none"></textarea>
    `;
  } else if (task.needsUrl) {
    inputsContainer.innerHTML = `
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-brand-beige/70 mb-1">作業簡述 / 心得：</label>
          <textarea id="homeworkTextInput" rows="3" placeholder="請在此輸入文字說明..." 
            class="w-full bg-brand-navy border border-cardBorder text-brand-beige rounded-xl p-3 text-xs focus:border-brand-accent outline-none"></textarea>
        </div>
        <div>
          <label class="block text-xs text-emerald-400 font-bold mb-1">🔗 參考連結 (URL)：</label>
          <input type="url" id="homeworkUrlInput" placeholder="https://example.com/..." 
            class="w-full bg-brand-navy border border-emerald-500/40 text-brand-beige rounded-xl p-2.5 text-xs focus:border-emerald-400 outline-none" />
        </div>
      </div>
    `;
  } else {
    inputsContainer.innerHTML = `
      <textarea id="homeworkTextInput" rows="4" placeholder="請寫下你的心得與思考，輸入完成後點擊右下角「提交作業」即可解鎖進度！" 
        class="w-full bg-brand-navy border border-cardBorder text-brand-beige rounded-xl p-3 text-xs focus:border-brand-accent outline-none"></textarea>
    `;
  }

  const modal = document.getElementById("guidedModal");
  modal.classList.remove("opacity-0", "pointer-events-none");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-95");
  modalBox.classList.add("scale-100");
  setModalState(true);
}

function closeModal() {
  const modal = document.getElementById("guidedModal");
  const modalBox = modal.querySelector(".transform");
  modalBox.classList.remove("scale-100");
  modalBox.classList.add("scale-95");
  modal.classList.add("opacity-0", "pointer-events-none");
  setModalState(false);
}

// 儲存 Modal 內容並發動信封飛向日誌與小船前進儀式
function saveModalContent() {
  if (!activeTaskRow) return;

  const now = new Date();
  const monthStr = String(now.getMonth() + 1).padStart(2, '0');
  const dayStr = String(now.getDate()).padStart(2, '0');
  const todayFormatted = `${monthStr}/${dayStr}`;

  // 抓取彈窗中的使用者輸入內容
  const textarea = document.getElementById("homeworkTextarea");
  const urlInput = document.getElementById("homeworkUrlInput");
  const textValue = textarea ? textarea.value.trim() : "";
  const urlValue = urlInput ? urlInput.value.trim() : "";
  
  const contentToSave = [textValue, urlValue].filter(Boolean).join("\n參考連結: ");

  const okrs = currentData.okr || [];
  const task = okrs.find(item => item.rowNum === activeTaskRow);
  if (task) {
    task.completedDate = todayFormatted;
    task.progress = "✔️"; // 標記為完成
    task.userContent = contentToSave; // 暫存於記憶體
  }

  // 1. 儲存至本機 localStorage (重新整理不會遺失)
  saveDataToStorage();

  // 2. 非同步發送至 Google Sheets
  if (task) {
    syncDataToGoogleSheet(task.keyResult, "✔️", contentToSave);
  }

  // 觸發儀式：關閉視窗、畫面縮小、信封飛向日誌、小船邁向下一格
  triggerLetterFlightSequence(activeTaskRow);
}



// ✉️ 任務解鎖視覺儀式：單次平滑航行，完成後佇立該格
function triggerLetterFlightSequence(rowNum) {
  closeModal();

  const container = document.getElementById("isoWorldContainer");
  if (container) {
    container.classList.add("camera-zoom-out");
  }

  // 1. 把當前這題標記完成
  const okrs = currentData.okr || [];
  const task = okrs.find(item => item.rowNum === rowNum);
  if (task) {
    task.progress = "✔️";
  }

  const isRequired = (rowNum <= 27);
  let targetBtnId = isRequired ? "dockRequiredBtn" : "dockPrepBtn";
  const targetDockBtn = document.getElementById(targetBtnId) || document.getElementById("dockCollectionBtn");

  // 2. 精確計算小船目標節點：永遠自小船當前停靠點 (startIdx) 順序邁進 1 格
  const currentTileIdx = customRoadmapNodes.findIndex(n => n.id === currentCharacterTileId);
  const startIdx = currentTileIdx >= 0 ? currentTileIdx : 0;
  
  // 剛完成的任務所對應的節點索引 (永遠自當前位置順序 +1 格推進，絕不跳過任何一格)
  const finalTargetIndex = Math.min(startIdx + 1, customRoadmapNodes.length - 1);
  const finalTargetNode = customRoadmapNodes[finalTargetIndex];
  currentCharacterTileId = finalTargetNode ? finalTargetNode.id : 1;

  const currentNode = customRoadmapNodes[startIdx];

  // ☁️ 提前開啟視野與繪製目標 DOM 元素，同步重繪軌跡線
  updateMapFogVisibility(finalTargetIndex);

  // 立即將小船瞬移貼合到當前格子的新物理座標 (因為迷霧推開導致 DOM 往下推擠)
  if (currentNode) repositionBoatToNode(currentNode.id);

  // 3. ⛵ 小船單次極致絲滑起航，直達目標格 (稍等 DOM 計算完畢後起航)
  setTimeout(() => {
    sailBoatToProgressNode(finalTargetNode.id, () => {
    const boatEl = document.getElementById("globalSailingBoat");
    const targetCubeEl = finalTargetNode ? document.getElementById(`iso-cube-${finalTargetNode.id}`) : null;

    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if (targetCubeEl) {
      const r = targetCubeEl.getBoundingClientRect();
      if (r.top > 0 && r.top < window.innerHeight) {
        startX = r.left + r.width / 2;
        startY = r.top + r.height / 2;
      }
    }

    if (targetDockBtn) {
      const logRect = targetDockBtn.getBoundingClientRect();
      const endX = logRect.left + logRect.width / 2;
      const endY = logRect.top + logRect.height / 2;

      const letter = document.createElement("div");
      letter.id = "flyingJournalLetter";
      letter.innerHTML = "✉️";
      letter.style.left = `${startX - 20}px`;
      letter.style.top = `${startY - 20}px`;
      letter.style.transform = "scale(1.4) rotate(-12deg)";
      letter.style.opacity = "1";
      document.body.appendChild(letter);

      setTimeout(() => {
        letter.style.left = `${endX - 20}px`;
        letter.style.top = `${endY - 20}px`;
        letter.style.transform = "scale(0.3) rotate(30deg)";
        letter.style.opacity = "0.2";
      }, 30);

      setTimeout(() => {
        letter.remove();
        targetDockBtn.classList.add("log-absorb-pulse");
        setTimeout(() => targetDockBtn.classList.remove("log-absorb-pulse"), 600);

        if (container) container.classList.remove("camera-zoom-out");

        // A. 小船靠岸抵達 finalTargetNode
        if (finalTargetNode) {
          const targetCube = document.getElementById(`iso-cube-${finalTargetNode.id}`);
          if (targetCube) {
            targetCube.classList.remove("status-locked");
            targetCube.classList.add("status-current");

            // 若為「獎勵 💡」或「挑戰 🎯」：觸發在地圖內氣泡/挑戰，小船完全停留在這一格！
            if (finalTargetNode.type === "reward" || finalTargetNode.type === "challenge") {
              triggerAutoExperienceModal(finalTargetNode);
            } else {
              // 一般任務格：寫入題目並蛻變為完成島嶼 (🏝️ 或 🐟)
              finalTargetNode.rowNum = rowNum;
              finalTargetNode.title = task ? task.keyResult : finalTargetNode.title;

              targetCube.classList.remove("status-current", "status-locked");
              targetCube.classList.add("status-done");
              const circle = targetCube.querySelector(".node-circle");
              if (circle) {
                circle.innerHTML = getNodeIconSVG({ rowNum: isRequired ? 1 : 99 }, true, false);
              }
              const tagEl = document.getElementById(`iso-tag-${finalTargetNode.id}`);
              if (tagEl && task) {
                const titleSpan = tagEl.querySelector(".tag-title span");
                if (titleSpan) titleSpan.innerText = task.keyResult;
                const statusDiv = tagEl.querySelector(".tag-status");
                if (statusDiv) statusDiv.innerText = `已完成 (${task.completedDate || '今日'}) ✓`;
              }
            }
          }

          // B. 同時亮起下一個石頭格子待解鎖 (status-current)
          const nextIndex = finalTargetIndex + 1;
          if (nextIndex < customRoadmapNodes.length) {
            const nextNode = customRoadmapNodes[nextIndex];
            const nextCube = document.getElementById(`iso-cube-${nextNode.id}`);
            if (nextCube) {
              nextCube.classList.remove("status-locked");
              nextCube.classList.add("status-current");
            }
          }
        }
      }, 680);
    } // End if (targetDockBtn)
  }); // End sailBoatToProgressNode
  }, 30); // End setTimeout
}

// 🧪 測試用一步推進控制器 (將格子設為紅色叉叉 ❌ 或正常通關，並極致滑動起航)
function triggerTestStep(isFailed = false) {
  const currentTileIdx = customRoadmapNodes.findIndex(n => n.id === currentCharacterTileId);
  const startIdx = currentTileIdx >= 0 ? currentTileIdx : 0;

  const finalTargetIndex = Math.min(startIdx + 1, customRoadmapNodes.length - 1);
  const finalTargetNode = customRoadmapNodes[finalTargetIndex];
  if (!finalTargetNode) return;

  if (isFailed) {
    finalTargetNode.isCrossMarked = true;
    finalTargetNode.status = "failed";
  }

  const currentNode = customRoadmapNodes[startIdx];
  currentCharacterTileId = finalTargetNode.id;
  hasSailedToProgress = false;

  // ☁️ 提前開啟視野與繪製目標 DOM 元素，同步重繪軌跡線
  updateMapFogVisibility(finalTargetIndex);

  // 立即將小船瞬移貼合到當前格子的新物理座標 (因為迷霧推開導致 DOM 往下推擠)
  if (currentNode) repositionBoatToNode(currentNode.id);

  setTimeout(() => {
    // ⛵ 小船單次極致絲滑起航，直達目標格
    sailBoatToProgressNode(finalTargetNode.id, () => {
    const targetCube = document.getElementById(`iso-cube-${finalTargetNode.id}`);
    if (targetCube) {
      targetCube.classList.remove("status-locked", "status-current");
      targetCube.classList.add(isFailed ? "status-failed" : "status-done");

      const circle = targetCube.querySelector(".node-circle");
      if (circle) {
        circle.innerHTML = getNodeIconSVG(finalTargetNode, !isFailed, false);
      }

      const tagEl = document.getElementById(`iso-tag-${finalTargetNode.id}`);
      if (tagEl) {
        const titleSpan = tagEl.querySelector(".tag-title span");
        if (titleSpan) titleSpan.innerText = isFailed ? `❌ 關卡測試標記` : finalTargetNode.title;
        const statusDiv = tagEl.querySelector(".tag-status");
        if (statusDiv) statusDiv.innerText = isFailed ? `測試未通過 ❌` : `已完成 ✓`;
      }

      // 若非失敗測試且該格為「獎勵 💡」或「挑戰 🎯」：觸發 Modal 視窗彈出
      if (!isFailed && (finalTargetNode.type === "reward" || finalTargetNode.type === "challenge")) {
        triggerAutoExperienceModal(finalTargetNode);
      }
      updateStreakCount();
    }

    // 同時亮起下一個石頭格子待解鎖 (status-current)
    const nextIndex = finalTargetIndex + 1;
    if (nextIndex < customRoadmapNodes.length) {
      const nextNode = customRoadmapNodes[nextIndex];
      const nextCube = document.getElementById(`iso-cube-${nextNode.id}`);
      if (nextCube) {
        nextCube.classList.remove("status-locked");
        nextCube.classList.add("status-current");
      }
    }
  });
  }, 30);
}

function modalSubmitHelp() {
  closeModal();
  updateCellInSheet("OKR", activeTaskRow, 4, "🟡");
}

// 呼叫 API 更新 Cell
function updateCellInSheet(sheetName, rowNum, colNum, value) {
  const okrs = currentData.okr || [];
  const task = okrs.find(item => item.rowNum === rowNum);
  if (task) {
    task.progress = value;
  }

  if (!currentApiUrl) return;

  postToApi({
    action: "updateCell",
    sheetName: sheetName,
    row: rowNum,
    col: colNum,
    value: value
  }).then(res => {
    if (!res.success) {
      console.error("更新失敗", res.error);
    }
  });
}

// POST 工具函式
async function postToApi(payload) {
  try {
    const res = await fetch(currentApiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error("API POST error", err);
    return { success: false, error: err.message };
  }
}

// 📦 冒險典藏冊 (Collections System) 數據與視窗控制
let COLLECTED_REWARDS = [];
let COLLECTED_CHALLENGES = [];
let activeCollectionTab = "rewards";



// 💡 獎勵 Modal 動畫視窗控制
function openRewardModal(node) {
  const modal = document.getElementById("rewardModal");
  if (!modal) return;

  const isReward = (node.type === "reward");
  const modalTitle = isReward ? node.title || "💡 獎勵小知識解鎖" : node.title || "🎯 實戰輕挑戰來襲";
  const modalDesc = node.desc || (isReward ? "獲得心態覺察卡片，已自動典藏於冒險冊！" : "完成免寫字行動考驗，解鎖大航海榮耀！");

  document.getElementById("rewardModalContentTitle").innerText = modalTitle;
  document.getElementById("rewardModalContentDesc").innerText = modalDesc;

  // 自動將解鎖項目加進典藏冊
  const nowStr = new Date().toLocaleDateString("zh-TW");
  const itemData = { title: modalTitle, desc: modalDesc, collectedDate: nowStr };
  if (!COLLECTED_REWARDS.some(r => r.title === modalTitle)) {
    COLLECTED_REWARDS.push(itemData);
  }

  modal.classList.remove("opacity-0", "pointer-events-none");
  const modalBox = modal.querySelector(".transform");
  if (modalBox) {
    modalBox.classList.remove("scale-95");
    modalBox.classList.add("scale-100");
  }
  setModalState(true);

  // 💡 飛光發射 至 📦 收藏 按鈕
  const targetDockBtn = document.getElementById("dockCollectionBtn");
  const boatEl = document.getElementById("globalSailingBoat");
  if (targetDockBtn && boatEl) {
    const br = boatEl.getBoundingClientRect();
    const tr = targetDockBtn.getBoundingClientRect();
    const letter = document.createElement("div");
    letter.id = "flyingJournalLetter";
    letter.innerHTML = "💡";
    letter.style.left = `${br.left + br.width / 2 - 20}px`;
    letter.style.top = `${br.top + br.height / 2 - 20}px`;
    letter.style.transform = "scale(1.5) rotate(-15deg)";
    letter.style.opacity = "1";
    document.body.appendChild(letter);

    setTimeout(() => {
      letter.style.left = `${tr.left + tr.width / 2 - 20}px`;
      letter.style.top = `${tr.top + tr.height / 2 - 20}px`;
      letter.style.transform = "scale(0.3) rotate(30deg)";
      letter.style.opacity = "0.2";
    }, 30);

    setTimeout(() => {
      letter.remove();
      targetDockBtn.classList.add("log-absorb-pulse");
      setTimeout(() => targetDockBtn.classList.remove("log-absorb-pulse"), 600);
    }, 680);
  }
}

function closeRewardModal() {
  const modal = document.getElementById("rewardModal");
  if (!modal) return;
  const modalBox = modal.querySelector(".transform");
  if (modalBox) {
    modalBox.classList.remove("scale-100");
    modalBox.classList.add("scale-95");
  }
  modal.classList.add("opacity-0", "pointer-events-none");
  setModalState(false);
}

// 自動跳出體驗關卡 Modal 視窗
function triggerAutoExperienceModal(node) {
  if (!node) return;

  const cubeEl = document.getElementById(`iso-cube-${node.id}`);
  if (cubeEl) {
    cubeEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }

  if (node.type === "reward") {
    setTimeout(() => {
      openRewardModal(node);
    }, 400);
  } else if (node.type === "challenge" || node.type === "achievement") {
    setTimeout(() => {
      openBossQuizModal(node.id);
    }, 400);
  }
}

function openCollectionModal() {
  renderCollectionItems();
  const modal = document.getElementById("collectionModal");
  if (!modal) return;
  modal.classList.remove("opacity-0", "pointer-events-none");
  const modalBox = modal.querySelector(".transform");
  if (modalBox) {
    modalBox.classList.remove("scale-95");
    modalBox.classList.add("scale-100");
  }
  setModalState(true);
}

function closeCollectionModal() {
  const modal = document.getElementById("collectionModal");
  if (!modal) return;
  const modalBox = modal.querySelector(".transform");
  if (modalBox) {
    modalBox.classList.remove("scale-100");
    modalBox.classList.add("scale-95");
  }
  modal.classList.add("opacity-0", "pointer-events-none");
  setModalState(false);
}

function switchCollectionTab(tabName) {
  activeCollectionTab = tabName;
  const btnRewards = document.getElementById("collectionTabRewards");
  const btnChallenges = document.getElementById("collectionTabChallenges");

  if (tabName === "rewards") {
    btnRewards.className = "pb-2.5 text-xs font-bold text-amber-300 border-b-2 border-amber-400 transition-colors flex items-center space-x-1.5";
    btnChallenges.className = "pb-2.5 text-xs font-bold text-brand-beige/50 hover:text-brand-beige border-b-2 border-transparent transition-colors flex items-center space-x-1.5";
  } else {
    btnRewards.className = "pb-2.5 text-xs font-bold text-brand-beige/50 hover:text-brand-beige border-b-2 border-transparent transition-colors flex items-center space-x-1.5";
    btnChallenges.className = "pb-2.5 text-xs font-bold text-amber-300 border-b-2 border-amber-400 transition-colors flex items-center space-x-1.5";
  }
  renderCollectionItems();
}

function renderCollectionItems() {
  const rewardsCountEl = document.getElementById("rewardCollectedCount");
  const challengesCountEl = document.getElementById("challengeCollectedCount");
  if (rewardsCountEl) rewardsCountEl.innerText = COLLECTED_REWARDS.length;
  if (challengesCountEl) challengesCountEl.innerText = COLLECTED_CHALLENGES.length;

  const container = document.getElementById("collectionItemsContainer");
  if (!container) return;

  const list = (activeCollectionTab === "rewards") ? COLLECTED_REWARDS : COLLECTED_CHALLENGES;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-brand-beige/40">
        <div class="text-3xl mb-2">${activeCollectionTab === 'rewards' ? '💡' : '🎯'}</div>
        <p class="text-xs">尚無搜集到的${activeCollectionTab === 'rewards' ? '獎勵小知識' : '實戰輕挑戰'}</p>
        <p class="text-[11px] text-brand-beige/30 mt-1">在大航海地圖上解鎖體驗關卡即可自動歸檔至此！</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((item, idx) => `
    <div class="p-4 bg-brand-navy/60 border border-amber-500/20 rounded-xl flex items-start space-x-3">
      <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
        ${activeCollectionTab === 'rewards' ? '💡' : '🎯'}
      </div>
      <div>
        <h4 class="font-bold text-xs text-amber-200">${item.title}</h4>
        <p class="text-xs text-brand-beige/70 mt-1 leading-relaxed">${item.desc}</p>
        <div class="text-[10px] text-brand-beige/40 mt-1.5 flex items-center space-x-2">
          <span>解鎖時間: ${item.collectedDate || '今日'}</span>
          <span>• 已入庫 📦</span>
        </div>
      </div>
    </div>
  `).join("");
}
