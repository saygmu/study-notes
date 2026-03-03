# Troubleshooting Log

每次遇到問題、排除錯誤後記錄在這，避免重蹈覆轍。

---

## 2026-02-27：行事曆提醒沒送到

### 問題
- 早上 7:00 的行事曆提醒沒有送到 Abigail
- 她說「明明就有行程」但我查不到

### 發現的原因

**原因 1：gcal.mjs 查詢起始時間錯誤**
- 原本用 `new Date()` 從「現在」開始查
- 如果是中午查，今天的全天事件（從 00:00 開始）就查不到
- **修復**：改成 `now.setHours(0, 0, 0, 0)` 從今天 00:00 開始

**原因 2：沒查台灣假日日曆**
- 和平紀念日在 `en.taiwan#holiday@group.v.calendar.google.com`
- 原本沒有加到查詢清單
- **修復**：加入台灣假日日曆到 calendarIds

**原因 3：cron job 停止運作（2/12 後就沒跑）**
- 早安行程提醒 (8d3b8221...) 最後一次跑是 2/12
- 晚間明日預告 (b8e2602b...) 也是 2/12 後停了
- **原因不明**：可能是系統重啟、更新、或 scheduler 問題
- **待觀察**：今天 18:00 的晚間提醒有沒有正常跑

### 後續追蹤
- [x] 觀察 2/27 18:00 晚間提醒 → 沒跑
- [x] 2/28 早上 7:00 → 沒跑（Abigail 09:20 抱怨遲到 2 小時）
- [x] 深入查 cron scheduler → 見下方 2/28 紀錄

---

## 2026-02-28：Cron scheduler de-sync

### 問題
- 早安行程提醒應該 07:00 跑，但到 09:20 都沒送
- 從 2/12 之後就完全沒跑過

### 發現的原因
- `cron status` 顯示 `nextWakeAtMs` 跳到 18:00
- 早上 7:00 的 job 被整個跳過
- Job state 的 `nextRunAtMs` 直接跳到 3/1（隔天）
- **Root cause 不明**：可能是 Gateway 重啟後 scheduler 沒正確恢復

### 修復方式
1. Disable 再 enable job 來重設 state
2. 手動發送當天行事曆提醒
3. 明天 3/1 起應該正常

### 學到的教訓
- Cron job 有時會 de-sync，要定期檢查 `cron status` 和 `cron runs`
- 發現問題直接修，不用問（Abigail 說的）

### 後續追蹤
- [x] 觀察 3/1 早上 7:00 是否正常送達 → ❌ 沒跑！

---

## 2026-03-01：早安提醒還是沒跑（第三次！）

### 問題
- 3/1 早上 7:00 行事曆提醒沒送到
- 這是連續第三天同樣的問題 (2/27, 2/28, 3/1)
- Abigail 指出「你每次都在說一樣的事情」

### 發現的原因

**Root cause：nextRunAtMs 被錯誤設定**

對比兩個 job 的狀態（2/28 更新後）：

| Job | 更新時間 | nextRunAtMs | 正確？ |
|-----|---------|-------------|-------|
| 晚間明日預告 (18:00) | 2/28 11:07 | 3/1 18:00 | ✅ |
| 早安行程提醒 (07:00) | 2/28 09:22 | 3/2 07:00 | ❌ 跳過 3/1！ |

早安的 nextRun 跳到 3/2 而不是 3/1，導致 scheduler 在 3/1 早上根本不會醒來。

**為什麼會這樣？**
- 2/28 23:10 重啟 Gateway 後，scheduler 重新計算 nextRunAtMs
- 但不知為何早安的 nextRun 被設成 3/2 而不是 3/1
- 可能是 OpenClaw scheduler 的 bug，或是更新時機問題

### 修復方式
1. 今天 (3/1) 手動發送行事曆
2. 更新 job schedule 強制重算 → 但 nextRun 還是 3/2（因為今天 7AM 已過）
3. 設定測試 job (13:49) 確認 scheduler 有在跑

### 教訓
1. **不要只說「明天應該會正常」** — 要實際確認或設提醒追蹤
2. **更新 job 後檢查 nextRunAtMs** — 確認是預期的時間
3. **考慮加 heartbeat 檢查** — 每天確認當天的 cron 有跑

### 後續追蹤
- [x] 13:49 測試 job 是否送達 → ✅ 成功！
- [x] 今天 18:00 晚間提醒是否正常 → ❌ 也沒跑！scheduler 跳過但沒執行
- [ ] 明天 3/2 07:00 早安提醒是否正常
- [ ] 如果再次失敗，考慮改用 heartbeat 發送而非 cron

---

## 2026-03-01 18:12：發現 scheduler 更嚴重的問題

### 問題
- 18:00 的晚間提醒也沒跑
- 但 nextRunAtMs 已經從 3/1 18:00 更新到 3/2 18:00
- Runs 歷史沒有新紀錄、沒有 isolated session 執行過

### 發現的原因

**Scheduler 在「推進時間」但沒有「執行 job」！**

觀察到的行為：
1. Scheduler 醒來，檢查 job 是否到期
2. 發現 job 時間已過，更新 nextRunAtMs 到下一次
3. 但沒有真正執行 job（沒有 spawn isolated session）

對比：
- 13:49 的測試 job（kind="at"）→ ✅ 成功執行
- 18:00 的晚間提醒（kind="cron"）→ ❌ 只更新時間沒執行

**可能原因：**
1. `wakeMode: "next-heartbeat"` 的問題？
2. Cron 類型 vs At 類型處理邏輯不同？
3. Scheduler 內部 bug？

### 暫時處理
- 手動發送晚間行事曆提醒
- 無法用 gateway restart（被 disable）

### 最終解決方案
**改用 heartbeat 機制發送行事曆提醒！**

1. 更新 HEARTBEAT.md 加入：
   - 早安行事曆提醒 (07:00-10:00)
   - 晚間行事曆提醒 (18:00-21:00)

2. 更新 heartbeat-state.json 追蹤：
   - `lastMorningCalendar`
   - `lastEveningCalendar`

3. Disable 舊的 cron jobs：
   - 早安行程提醒 (8d3b8221...)
   - 晚間明日預告 (b8e2602b...)
   - 晚間行事曆提醒 (1d7bba4d...)

**為什麼 heartbeat 更可靠：**
- Heartbeat 每 30 分鐘觸發一次，一定會執行
- 不依賴有問題的 cron scheduler
- 即使錯過精確時間，也會在時間窗口內補發

### 後續追蹤
- [ ] 觀察 3/2 早上 heartbeat 是否正確發送行事曆

---

## 格式模板

```
## YYYY-MM-DD：問題簡述

### 問題
（描述症狀）

### 發現的原因
（root cause）

### 修復方式
（怎麼解決的）

### 後續追蹤
- [ ] 待確認的事項
```
