# MEMORY.md - 長期記憶

## 關於我

- **名字**：AB御用秘書（Abigail's Royal Secretary）
- **Emoji**：🦊（後來好像變成 🦞？）
- **第一天**：2026-01-31
- **風格**：casual、友善、帶點調皮

---

## 關於 Abigail

- **Telegram**：@Saygmu (id: 744312344)
- **Email**：saygmulovesgreen@gmail.com
- **暱稱**：喻喻
- **時區**：GMT+8（高雄）
- **學校**：高雄市立高雄女子高級中學（雄女）
- **身份**：高中生，目前在走個申
- **作息**：夜貓子傾向，早上約 9:30 起床，晚上會到很晚
- **補習班**：已脫離（2026-03-04），之前的線上課行程都刪了

### 她的喜好
- 極簡風格設計
- HTML 發揮度高，不局限於 Markdown
- 想要互動元素：可收合、分頁籤、左右對比
- 不要進度環

### 她的要求
- **不要催進度**：「寫一半就好不要催這種的」(2/14)
- **主動思考**：當她說要做什麼事，我應該主動想需要什麼資訊、前置作業
- **記得所有事**：任何細節都要記，提醒事項要記時間
- **口氣要自然輕快、有人味**：活潑陽光、可以偶爾嘴她
- **避免 AI 感與制式結構**：不要「前言/正文/結尾」罐頭格式
- **不要一直用句點**：看起來太嚴肅
- **對話風格參考**：像「那就完美了✨」這種語氣

---

## 例行任務

### 行事曆提醒（系統 crontab）
**已改用 Pi 系統 crontab，不再用 OpenClaw cron**（2026-03-05）
- **07:00** - 早安 + 天氣 + 行程 (`morning-greeting.mjs`)
- **18:00** - 明天行程提醒 (`evening-greeting.mjs`)
- **22:30** - 眼藥水提醒 (`eye-drops.mjs`)
- 腳本：`~/.openclaw/scripts/`
- Log：`~/.openclaw/scripts/*.log`

### 複習進度提醒
- **目前暫停** - Abigail 走個申不分科
- 之前：每天早上檢查 Notion，落後就提醒

### 每日專案提案
- **每天 18:00** 傳一個新專案點子給 Abigail
- 她決定要不要做
- cron job: `990b1f12-6087-49e4-8e93-b8cf23f48aa6`

### 記憶同步
- **檔案有更新就要立刻同步**，不是等到晚上！
- 新增每日筆記時要更新 `memory/index.html` 的 `DAILY_FILES`
- 每天結束前整理當日記憶到 MEMORY.md
- 同步到 GitHub：`study-notes/memory/raw/`

---

## 系統設定

### Google Calendar
- Token 會過期（7 天）
- 每週日 08:00 有 cron job 檢查
- 重新授權流程在 TOOLS.md

### Google Drive
- Token **跟 Calendar 是分開的**！要分別追蹤
- 重新授權：`node ~/.openclaw/scripts/gdrive-auth-manual.mjs`
- 上次更新：2026-03-04（約 3/11 過期）

### Notion 資料庫
- 物理：`2fcefd70-a0ce-8164-9efc-c5259c541bba`
- 數學甲：`303efd70-a0ce-8132-8a02-e9f0c7d49c5b`
- 化學：`2fcefd70-a0ce-81bb-92dc-eb8c300c701f`
- 引航化學：`30aefd70-a0ce-8112-9698-fc097f94651b`

### 記憶網頁
- 網址：https://saygmu.github.io/study-notes/memory/
- 密碼：0828

### 講義網站
- 網址：https://saygmu.github.io/study-notes/
- 要用 theme.js、更新版本號、首頁加連結

### 倒數日曆
- 網址：https://saygmu.github.io/study-notes/tools/countdown.html
- 功能：顯示重要日期倒數、可新增/編輯事件
- 預設包含：考試、筆試、申請流程日期
- 資料存在瀏覽器 localStorage

---

## 學到的教訓

### 技術
- SVG 用 `<img>` 載入時 `marker-end` 不顯示，要用 inline polygon
- iOS Safari 背景 JS 約 5-10 秒後暫停，要用 visibilitychange 重算
- PWA 快取很頑固，要清 Service Worker + caches API
- wttr.in 太慢，用 Open-Meteo API
- Node.js `fetch` 在 Pi 上會 timeout，用 `child_process.execSync` + curl
- **SVG 文字**：不要用 Unicode 下標 `₂` 或 `baseline-shift`，純文字最穩

### 工作方式
- **講義前先看 TOOLS.md 的 checklist**
- 用 theme.js 不要自己寫 CSS 變數
- 公式要用 KaTeX，分數用 `\dfrac`
- 仔細看完原始素材再開始寫
- 找不到適合的圖就自己畫
- **講義完成要自己截圖檢查**，確認圖片正確再叫 Abigail
- **記憶後加「（已記）」**
- 早安行程提醒要檢查 **Family 日曆**，避免漏掉游泳這類行程
- 做網頁改版要先看手機版（約 390px 寬）截圖驗收，避免按鈕換行翻車

### Cron 提醒
- `deliver: true` 不可靠，讓 agent 直接用 message tool 發送
- Token 過期會導致 job 失敗，要主動追蹤

### 記憶
- 聽到重要資訊要**立刻寫下來**
- 不要當失智症，任何細節都要記
- 犯錯就要記到 TOOLS.md 或 troubleshooting-log.md

### Notion
- **記錄前先看 TOOLS.md 確認用哪個資料庫！**
- 補習班線上課 → 課程紀錄
- 自己複習進度 → 複習進度（依科目）

---

## 雜項筆記

### 環保局 - 大型廢棄物回收
- 高雄市環保局電話：(07) 735-1500（總機）、0800-066666（24hr）
- 流程：搬到門口 → 貼紙條「已通知清潔隊」→ 登記

### Craft API
- 設定在 `秘書的家/config/craft-api.json`
- 用途：存放講義、筆記

### 115 個申志願（2026-03-06）
需要筆試：
- **清大電機乙** - 5/17，筆試 30%（最高！）
- **交大資工乙** - 5/16，筆試 10%
- **清大資工乙** - 5/16，筆試 10%
- **成大資工** - 5/22，筆試 10%

不用筆試：
- 成大電機乙
- 中山電機

Notion 筆試準備頁面：https://www.notion.so/31befd70a0ce81f58438e28210815332

---

*最後更新：2026-03-08*
