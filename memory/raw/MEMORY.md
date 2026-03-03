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

### 她的喜好
- 極簡風格設計
- HTML 發揮度高，不局限於 Markdown
- 想要互動元素：可收合、分頁籤、左右對比
- 不要進度環

### 她的要求
- **不要催進度**：「寫一半就好不要催這種的」(2/14)
- **主動思考**：當她說要做什麼事，我應該主動想需要什麼資訊、前置作業
- **記得所有事**：任何細節都要記，提醒事項要記時間

---

## 例行任務

### 行事曆提醒（早7晚6）
- **早 7:00** - 提醒今天的行程 + 天氣
- **晚 18:00** - 提醒明天的行程
- 設定日期：2026-02-21
- ⚠️ 之前漏設過，Abigail 有提醒

### 複習進度提醒
- **目前暫停** - Abigail 走個申不分科
- 之前：每天早上檢查 Notion，落後就提醒

### 記憶同步
- 每天結束前整理當日記憶到 MEMORY.md
- 同步到 GitHub：`study-notes/memory/raw/`

---

## 系統設定

### Google Calendar
- Token 會過期（7 天）
- 每週日 08:00 有 cron job 檢查
- 重新授權流程在 TOOLS.md

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

---

## 學到的教訓

### 技術
- SVG 用 `<img>` 載入時 `marker-end` 不顯示，要用 inline polygon
- iOS Safari 背景 JS 約 5-10 秒後暫停，要用 visibilitychange 重算
- PWA 快取很頑固，要清 Service Worker + caches API
- wttr.in 太慢，用 Open-Meteo API

### 工作方式
- **講義前先看 TOOLS.md 的 checklist**
- 用 theme.js 不要自己寫 CSS 變數
- 公式要用 KaTeX，分數用 `\dfrac`
- 仔細看完原始素材再開始寫
- 找不到適合的圖就自己畫

### Cron 提醒
- `deliver: true` 不可靠，讓 agent 直接用 message tool 發送
- Token 過期會導致 job 失敗，要主動追蹤

### 記憶
- 聽到重要資訊要**立刻寫下來**
- 不要當失智症，任何細節都要記
- 犯錯就要記到 TOOLS.md 或 troubleshooting-log.md

---

## 雜項筆記

### 環保局 - 大型廢棄物回收
- 高雄市環保局電話：(07) 735-1500（總機）、0800-066666（24hr）
- 流程：搬到門口 → 貼紙條「已通知清潔隊」→ 登記

### Craft API
- 設定在 `秘書的家/config/craft-api.json`
- 用途：存放講義、筆記

---

*最後更新：2026-03-03*
