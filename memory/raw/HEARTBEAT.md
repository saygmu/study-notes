# HEARTBEAT.md

## ⚠️ 定時提醒已改用系統 crontab

以下任務不再由 heartbeat 處理，改用 Pi 系統 crontab 執行：
- ✅ 早安提醒 (07:00) → `morning-greeting.mjs`
- ✅ 晚間提醒 (18:00) → `evening-greeting.mjs`  
- ✅ 眼藥水提醒 (22:30) → `eye-drops.mjs`

腳本位置：`~/.openclaw/scripts/`
Log 位置：`~/.openclaw/scripts/*.log`

查看 crontab：`crontab -l`

---

## Heartbeat 仍負責的項目

### 記憶檔案同步（隨時）
⚠️ **檔案有新增或更動時就要同步到網站！** 不要等到晚上。
⚠️ **新增每日筆記時，要更新 `memory/index.html` 的 `DAILY_FILES` 陣列！**
```bash
cp ~/.openclaw/workspace/{AGENTS,TOOLS,MEMORY}.md ~/.openclaw/workspace/study-notes/memory/raw/
cp ~/.openclaw/workspace/memory/*.md ~/.openclaw/workspace/study-notes/memory/raw/
cd ~/.openclaw/workspace/study-notes && git add -A && git commit -m "同步記憶" && git push
```

### 每日記憶整理 (23:00-23:59)
- 檢查 `heartbeat-state.json` 的 `lastMemoryConsolidate`
- 如果今天還沒整理：
  1. 讀今天的 `memory/YYYY-MM-DD.md`
  2. 把重要的事情整理進 `MEMORY.md`
  3. 同步到 GitHub（用上面的指令）
  4. 更新 `lastMemoryConsolidate` 為今天日期

### 複習進度 (暫停)
<!-- 暫停中 - Abigail 走個申不分科
- 檢查 `heartbeat-state.json` 的 `lastProgressAlert`
- 如果今天還沒提醒：
  - 執行 `node ~/.openclaw/scripts/notion.mjs progress` 檢查進度
  - 如果有落後，發送提醒
  - 更新 `lastProgressAlert` 為今天日期
-->
