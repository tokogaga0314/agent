# 行程頁（Schedule）設計理念

目的
- 清晰、可預測的行程切換行為：左右滑（carousel）切換天數，垂直滾動只在當前日卡內滾動，不會傳到外層導致橫向切換或整頁滾動。
- 保持輕量與跨瀏覽器相容性，改動採保守可回退策略。

設計原則
- 最小侵入：優先以 CSS 解決（layout, overflow, overscroll-behavior），必要時加入小段 JS（方向判斷/鎖定）。
- 可驗證：每次修改需有明確的驗證步驟（Day1/Day2 測試、左右滑測試、不同進入路徑測試）。
- 可回退：在新 branch 完成改動、測試並開 PR；不直接推 main。
- 不破壞手勢體驗：避免使用會全面關閉手勢（如全域 touch-action: pan-y）的寫法。

範圍（這次 branch 的建議動作）
1. 清理：移除 schedule page 明確不會使用的資源或程式碼片段（候選）
   - 已停用的 demo data、註解掉的舊版時間軸 template、或與其他 view（如 home）獨立的腳本/樣式。
   - 未被任何 JS 參考的 helper function（先用搜尋確認）。
2. 保留/保守改動：所有影響互動（手勢/焦點/scroll）相關 code，先只做觀察性改動，必要時用 feature flag 或註解標記以便回退。

安全檢查（執行前）
- 執行 repo-wide reference search：`grep -R "functionName" index.html` 或 `rg "className"` 以確定沒有跨頁面依賴。
- 建立備份分支（已在此 branch 前會自動建立 backup 分支建議步驟）。

驗證清單（開發者手動測試）
- Day 1：慢速/快速向下滾動（卡片內），確認不會橫向切換到 Day 2。重複 3 次。
- 任一天：左右滑動，確認 carousel 行為與現有左右切換一致。
- 不同進入方式：從首頁按鈕、底部 tab、直接 reload（三種均測試）。
- 不同 viewport：手機（390×844、360×780）、平板、桌面。

後續（可選）
- 若保守 CSS（overscroll-behavior）不足，可加入小型 JS 方向鎖：
  - touchstart 記錄座標；touchmove 決定主要方向後，短期內（例如 200ms 或直到 touchend）只允許該方向上的交互；橫向時允許 carousel 控制。
  - 僅在必要時開啟，並提供 data-attr 或 class 作為開關。

開發與 PR 建議
- 在此 branch 完成改動後：
  1) 建立 PR：`cleanup/schedule-unused` -> `main`，PR 描述包含修改清單、測試步驟與回退方法。
  2) 請至少在一台真機或模擬器上驗證手勢互動。

聯絡與權責
- 若你想我直接在此 branch 上進行「自動掃描未使用的 CSS/JS 並列出候選清單」，請回覆 “掃描並列候選”。
- 若你已經有明確要刪除的檔案或程式片段，請貼出 hash 或程式片段，我會在此 branch 上執行刪除、commit 並 push。

---
（檔案由 Hermes Agent 生成；此 branch：cleanup/schedule-unused）
