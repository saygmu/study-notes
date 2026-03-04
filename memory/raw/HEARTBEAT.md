# HEARTBEAT.md

## 定期檢查項目

### 早安提醒 (07:00-10:00)
- 檢查 `heartbeat-state.json` 的 `lastMorningCalendar`
- 如果今天還沒發，且現在是 07:00-10:00 之間：
  1. 查天氣：`curl -s "https://api.open-meteo.com/v1/forecast?latitude=22.6273&longitude=120.3014&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia/Taipei"`
  2. 查行事曆：`node ~/.openclaw/scripts/gcal.mjs events 2`
  3. 發送早安訊息，包含：
     - 🌤️ 高雄今日天氣（氣溫、降雨機率）
     - 📅 今天的行程
     - 📆 明天的重要行程（如果有）
  4. 更新 `lastMorningCalendar` 為今天日期

**天氣代碼對照：**
- 0: 晴 ☀️
- 1-3: 多雲 ⛅
- 45-48: 霧 🌫️
- 51-55: 毛毛雨 🌦️
- 61-65: 雨 🌧️
- 80-82: 陣雨 🌦️
- 95-99: 雷雨 ⛈️

### 晚間行事曆提醒 (18:00-21:00)
- 檢查 `heartbeat-state.json` 的 `lastEveningCalendar`
- 如果今天還沒發，且現在是 18:00-21:00 之間：
  - 執行 `node ~/.openclaw/scripts/gcal.mjs events 2`
  - 發送明天的行事曆提醒
  - 更新 `lastEveningCalendar` 為今天日期

### 眼藥水提醒 (22:30-23:30)
- 檢查 `heartbeat-state.json` 的 `lastEyeDrops`
- 如果今天還沒提醒，且現在是 22:30-23:30 之間：
  - 發送「💧 眼藥水時間！記得點喔～」
  - 更新 `lastEyeDrops` 為今天日期

### 記憶檔案同步（隨時）
⚠️ **檔案有新增或更動時就要同步到網站！** 不要等到晚上。
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
