# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## Google Calendar

### 日曆分類
| 日曆 | 用途 | ID |
|------|------|-----|
| 🔴 考試 | 考試、小考、模擬考 | `4f3892c9e5d6fe7f1445641693b525b60c8141d05c0bf7b6c3bc59c96167c9ae@group.calendar.google.com` |
| 🔵 補習課程 | Yamaha、補習、家教 | `98e85c59469ead7b9e05ec3e3df90d8fd0b590d000301c771e30f7fc93277a2d@group.calendar.google.com` |
| 🟢 學校事項 | 學校活動、開學、放假 | `7d18eada4deb4b20de06e24af1952ac2d1ea4f708132bd06ab22433cb9b6c4b6@group.calendar.google.com` |
| 🎉 玩樂 | 約會、出去玩、聚餐 | `a376b55b360e8c4e645bc59e875a1587ca8165b040ee081b8f9bfee6f7551f36@group.calendar.google.com` |
| 👨‍👩‍👧 Family | 家庭行程、喻喻放學 | `family06799263514476348881@group.calendar.google.com` |
| 📚 Too chiu | 班級日曆 | `classroom109194349849227729648@group.calendar.google.com` |

### 指令

```bash
# List events for the next N days (default 7)
node ~/.openclaw/scripts/gcal.mjs events [days]

# List all calendars
node ~/.openclaw/scripts/gcal.mjs calendars

# Add event (with time)
node ~/.openclaw/scripts/gcal.mjs add "標題" "2026-02-01T14:00:00" "2026-02-01T15:00:00" --location "地點"

# Add all-day event
node ~/.openclaw/scripts/gcal.mjs add "標題" "2026-02-01" "2026-02-01"

# Delete event
node ~/.openclaw/scripts/gcal.mjs delete <eventId>

# Update event
node ~/.openclaw/scripts/gcal.mjs update <eventId> --summary "新標題" --location "新地點"

# Move event to different calendar
node ~/.openclaw/scripts/gcal.mjs move <eventId> <fromCalendarId> <toCalendarId>
```

- Credentials: `~/.openclaw/google/calendar-credentials.json`
- Token: `~/.openclaw/google/calendar-token.json`
- Scope: full access (`calendar`)
- Timezone: Asia/Taipei
- ⚠️ 提醒時跳過「喻喻放學」（那是給媽媽看的）

### ⚠️ Token 過期追蹤

Google 測試模式的 token **7 天會過期**！
- 已設定每週日 08:00 自動檢查（cron job: Google Token 過期檢查）
- 如果過期會主動通知 Abigail

**上次更新：2026-03-03**（下次過期約 3/10）

### ⚠️ Token 過期時的重新授權流程

出現 `invalid_grant` 錯誤時要重新授權：

```bash
# 1. 產生授權連結
node ~/.openclaw/scripts/gcal-auth-manual.mjs url

# 2. 把連結傳給 Abigail，她點開授權
#    授權後會跳到 localhost（打不開是正常的）
#    請她把網址列的 code=XXXX 那段貼回來

# 3. 用 code 換 token
node ~/.openclaw/scripts/gcal-auth-manual.mjs token "4/0XXXX..."
```

**不要用 localhost server 的方式！** 因為 Abigail 不在 Pi 旁邊，要用手動貼 code 的流程。

---

## Cron 提醒設定

⚠️ **重要：設定提醒時要用對的模式！**

### Abigail 偏好
- **不要系統回報訊息** — 設 `delivery: { mode: "none" }`
- 她只想收到實際提醒，不需要「已執行」的確認

| 場景 | sessionTarget | payload | 可靠度 |
|------|---------------|---------|--------|
| 重要提醒、一定要送到 | `isolated` | `agentTurn` + `deliver: true` | ✅ 可靠 |
| 只是注入 context、不急 | `main` | `systemEvent` | ⚠️ 可能漏掉 |

**可靠提醒範本（讓 agent 用 message tool 發送）：**
```json
{
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "用 message tool 發送以下訊息到 Telegram (channel: telegram, to: 744312344)：\n\n[提醒內容]\n\n發送完畢後結束。"
  }
}
```

⚠️ **不要用 `deliver: true`** — 測試發現這種方式不可靠，訊息常常送不到。

---

---

## 記憶網頁

- **網址**：https://saygmu.github.io/study-notes/memory/
- **密碼**：0828
- **用途**：讓 Abigail 用手機查看我的記憶
- **同步指令**：
```bash
cp ~/.openclaw/workspace/{AGENTS,TOOLS,MEMORY}.md ~/.openclaw/workspace/study-notes/memory/raw/
cp ~/.openclaw/workspace/memory/*.md ~/.openclaw/workspace/study-notes/memory/raw/
cd ~/.openclaw/workspace/study-notes && git add -A && git commit -m "同步記憶檔案" && git push
```

---

## 講義網站風格指南

### ⚠️ 重要：每次做講義前先看這裡！

**必做清單：**
1. ✅ 使用 `theme.js` 統一主題（不要自己寫 CSS 變數或主題切換）
2. ✅ 用 **KaTeX** 渲染數學公式（分數才好讀）
3. ✅ 仔細看完原始素材，不要漏掉內容
4. ✅ 參考現有講義的結構（先讀一個現有檔案）

### 主題系統（重要！）

**不要自己定義 CSS 變數！** 用 `theme.js`：

```html
<head>
  <meta charset="UTF-8">
  <script src="../theme.js"></script>  <!-- 這行要放最前面 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ...
</head>
```

theme.js 會自動：
- 設定 CSS 變數 (`--bg`, `--text`, `--muted`, `--accent`, `--border`, `--card`, `--highlight`)
- 加入右下角主題切換按鈕（◐）
- 從 localStorage 讀取用戶偏好

### 數學公式（KaTeX）

**所有數學公式都要用 KaTeX！** 加在 `<head>`：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});"></script>
```

用法：
- 行內公式：`$v = f\lambda$`
- 分數：`$\dfrac{a}{b}$`（用 `\dfrac` 不要用 `\frac`，比較大）
- 下標：`$n_1$`、上標：`$x^2$`

### 整體架構
```
max-width: 720px
padding: 60px 24px (container)
固定導航列：← 返回 | 列印
```

### 字體
- **標題 (h1, h2)**：`'Noto Serif TC', serif` / font-weight: 600
- **內文**：`'Noto Sans TC', sans-serif` / font-weight: 300

### 字級
| 元素 | 大小 | 備註 |
|------|------|------|
| h1 | 2.5rem | letter-spacing: 2px |
| h2 | 1.25rem | 底部 1px border |
| body | 16px | line-height: 2 |
| subtitle | 14px | color: muted |
| 公式備註 | 0.85rem | color: muted |
| footer | 13px | 只放日期 YYYY.MM.DD |

### 元件樣式
| 元件 | 樣式 |
|------|------|
| .formula | border: 1px solid var(--border), border-radius: 8px, padding: 24px, text-align: center, background: var(--card) |
| .note | border-left: 2px solid var(--accent), padding: 16px 20px |
| .summary | border: 1px solid var(--border), border-radius: 12px, padding: 32px, background: var(--card) |
| table | th 用 muted 色、0.85rem、uppercase |

### 必備功能
- ✅ `<script src="../theme.js"></script>` 在 head 最前面
- ✅ KaTeX 載入
- ✅ 列印按鈕
- ✅ 返回首頁連結
- ✅ 響應式 (600px 以下調整)
- ✅ @media print 隱藏 nav 和 theme-toggle-btn

### 禁止事項
- ❌ 自己定義 CSS 變數或主題切換（用 theme.js）
- ❌ 用純文字寫分數（用 KaTeX `\dfrac{}{}`）
- ❌ 漏掉原始素材的內容
- ❌ 不同頁面用不同風格

---

## 講義網站

⚠️ **講義要上傳到 GitHub Pages 網站！**

- **網站**：https://saygmu.github.io/study-notes/
- **Repo**：`~/.openclaw/workspace/study-notes/`

### 上傳流程
1. 在 `study-notes/` 對應科目資料夾建立 HTML 檔
   - `chemistry/` - 化學
   - `physics/` - 物理
   - `math/` - 數學
2. 更新 `index.html`（加連結、更新統計數字）
3. `git add -A && git commit -m "..." && git push`

### 風格要求
- 極簡風格（黑白灰配色、大量留白）
- 圖片要相關、正確
- 全站風格統一

### 本機備份
`秘書的家/` 資料夾可以留一份，但**主要是網站**！

---

## Notion 資料庫使用指南

### ⚠️ 每次記錄前先看這裡！

| 情況 | 用哪個資料庫 |
|------|-------------|
| **補習班線上課**（Harvard、引航等）→ 記錄要看什麼課 | 📹 課程紀錄 |
| **自己複習進度**（寫講義、做題目）→ 追蹤讀到哪 | 📚 複習進度（依科目選） |
| **專注時段紀錄**（MONO 計時器同步） | ⏱️ 專注紀錄 |

### 怎麼分辨？
- 有「觀看期限」「老師」「上課日期」→ **課程紀錄**
- 有「狀態」（未開始/進行中/完成）→ **複習進度**
- 有「專注分鐘數」→ **專注紀錄**

---

## Notion 複習進度資料庫

### 狀態選項（引航化學）
| 狀態 | 意義 |
|------|------|
| 0 未開始 | 還沒動 |
| 1 理論、例題 | 讀理論＋看例題 |
| 2 練習題 | 寫練習題 |
| 3 題目未改 | 寫完還沒對答案 |
| 4 題目訂正 | 訂正中 |
| 5 訂正有問題 | 訂正完還有疑問 |
| 6 完成 | 全部搞定 ✅ |
| _ 先寫一半就好 | 特殊：只做一半 |
| _ 延後 | 特殊：改天再說 |

### 資料庫 ID
**複習進度**
- 物理: `2fcefd70-a0ce-8164-9efc-c5259c541bba`
- 數學甲: `303efd70-a0ce-8132-8a02-e9f0c7d49c5b`
- 化學: `2fcefd70-a0ce-81bb-92dc-eb8c300c701f`
- 引航化學: `30aefd70-a0ce-8112-9698-fc097f94651b`

**補習班課程紀錄** (Harvard 等線上課)
- 課程紀錄: `302efd70-a0ce-81ac-9da6-ff00db263e25`
  - 欄位：課程、單元、老師、科目、上課日期、觀看期限、書/教材、頁碼、備註

---

---

## 工作流程備忘

### 新增講義或頁面
1. 建立 HTML 檔案到對應資料夾
2. **用 `theme.js`** — 在 `<head>` 最前面加 `<script src="../theme.js"></script>`
3. **更新 `index.html`** — 加連結 + 更新版本號
4. `git add -A && git commit && git push`

⚠️ **每次新增頁面都要：**
- 主題相容（用 theme.js）
- 首頁加連結
- 版本號 +1

### 更新 MONO 計時器
1. 修改 `tools/focus.html` 或 `tools/focus-stats.html`
2. 更新版本號（兩個檔案 + `index.html`）
3. 更新快取參數 `?v=XXX`
4. `git commit && push`

### Notion 資料庫
- 用 `node ~/.openclaw/scripts/notion.mjs` 操作
- 專注紀錄 DB: `30cefd70-a0ce-81f8-bb81-c5ec9a497006`

### Cloudflare Worker (mono-sync)
- API: `https://mono-sync.saygmulovesgreen.workers.dev`
- PIN: `mono2026ab`
- 部署: `cd ~/.openclaw/workspace/mono-sync && CLOUDFLARE_API_TOKEN=$(jq -r .api_token ~/.openclaw/workspace/秘書的家/config/cloudflare.json) npx wrangler deploy`

---

---

## Troubleshooting Log

**遇到問題一定要記到 `memory/troubleshooting-log.md`！**

每次排錯後記錄：
1. 問題症狀
2. 發現的原因 (root cause)
3. 修復方式
4. 後續追蹤事項

### 常見問題快速參考

| 問題 | 原因 | 解法 |
|------|------|------|
| 今天的全天事件查不到 | gcal.mjs 從「現在」開始查 | 已修：從 00:00 開始 |
| 台灣假日沒顯示 | 沒查 holiday calendar | 已修：加入 en.taiwan#holiday |
| cron 提醒沒送 | scheduler 可能停了 | 檢查 cron runs 歷史 |

---

Add whatever helps you do your job. This is your cheat sheet.
