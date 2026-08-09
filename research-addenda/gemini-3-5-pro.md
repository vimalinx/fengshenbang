# Gemini 3.5 Pro 调研补遗（2026-08-09）

> 用途：详情页 `app/src/data/details/gemini-3-5-pro.ts` 加厚至 Opus 5 水准的调研产出。
> 调研方式：AgentKey MCP（余额不足降级）→ HN Algolia API ×20+ 次、Exa web search ×2、Reddit JSON 尝试（被 403 拦截）、免费镜像尝试（pullpush/redlib 均失败）。实测以本文件为准。
> 原调研库：`/home/vimalinx/Documents/大模型社区反馈调研/03-Gemini/Gemini 3.5 Pro/data.json`（基准日 2026-08-09）。

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，本次主攻）

1. **Antigravity CLI 实测评测（3.5 Pro High 真实对比 Fable 5）** — HN 用户 aviinuo 在 Claude Fable 5 发布帖下实测：
   > "Gemini 3.5 Pro High in antigravity cli takes less than 5 minutes and did a good job. Fable 5 High took 30 minutes to port some of the code, then just copied the rest to a folder called 'reference' and decided the task was done... it's still going more than an hour later still not having finished. Previously when I did similar tasks with Opus 4.7/4.8 and GPT 5.5 I had no problems."
   - 场景：把混乱研究代码库迁移到规范工程骨架；3.5 Pro High 在 Antigravity CLI <5 分钟完成且做得好，Fable 5 High 30 分钟未完成。
   - URL: https://news.ycombinator.com/item?id=48463808（评论在 Claude Fable 5 帖下，作者 aviinuo）
   - **这是唯一一条带具体数字的 3.5 Pro harness 实战反馈，已写入 harnessReviews（Antigravity 侧），并在 bestInSlot 中引用。**

2. **Antigravity CLI 综合评测（The New Stack，6-20）**：Gemini CLI 与 Antigravity CLI 同机对比——Gemini CLI 无法在非交互模式写文件/跑命令，Antigravity 2 分 10 秒完成加类型提示任务并自建 venv 跑 pytest/mypy；Antigravity「更稳、更像人话、无启动噪音」，但平凡提示速度略慢（3.97s vs 3.2s 中位数）。
   - URL: https://thenewstack.io/gemini-cli-antigravity-replacement/
   - 相关：HN 用户普遍吐槽「Gemini CLI 被换成更差的闭源 Antigravity」（-tom, nickv: "shittier closed source Antigravity CLI"）；bjackman 持反方「Antigravity CLI is quite decent... has some genuine advantages over Claude Code」。

3. **Antigravity CLI 实机评测（StackNova 6-30）**：绿地在真实生产仓库实测——「scoped edits 快且准，greenfield 从头建项目结果很差、IDE 修复循环越修越乱」；Claude Code 在 greenfield 更可靠。模型为 3.5 Flash/3.1 Pro，Pro 未 GA 无法测。
   - URL: https://stacknovahq.com/ai-tools-for-developers/antigravity-cli-tested-real-project

4. **PCMag 3.5 Flash 实测（6-04）**：Ruben Circelli 用 Antigravity 应用续作 Warframe 计算器——「breathtakingly fast（3 分钟建库，比 ChatGPT/Claude 快数倍），但 sloppy execution、ignored instructions、频繁出错」。
   - URL: https://uk.pcmag.com/ai/165342/gemini-35-flash-is-the-fastest-ai-coding-model-ive-used-and-extremely-error
   - Coder Legion（Ship Bench 实测，5-21）：Antigravity CLI + 3.5 Flash 权限不记忆、quota 消耗极快（两轮迭代即耗尽），对比 Claude Code 5 小时配额可跑 7 轮。
   - URL: https://coderlegion.com/18556/antigravity-cli-first-impressions-fast-rough-and-not-ready

5. **3.5 Pro 在 Claude Code/Cursor/OpenHands 的接入状态**：确认无公开实测。
   - Claude Code 接 Gemini 需经 OpenRouter 代理 + 处理 `reasoning_details` 签名（实测为 Gemini 3 Pro，非 3.5 Pro）：https://ai-practice.hashnode.dev/using-claude-code-with-gemini-3-pro-real-world-experiment
   - Cursor 同期默认主力为 Fable 5 / GPT-5.5；OpenHands 模型无关但无 3.5 Pro 适配记录。
   - **结论：三条 harnessReviews 的 placeholder 保留，但文本从「（无数据，占位）」改为带真实可引用信息（Antigravity 实测、接入路径、同期生态）。**

### B. 名家锐评加料（署名+身份）

6. **HN 热评「catastrophic for Google」**（heaney-555，Changes at Google DeepMind 帖）：
   > "The Gemini 3.5 Pro delay has been catastrophic for Google... But missing out right as AI coding agents become genuinely deeply capable and useful is just an immense failure."
   - URL: https://news.ycombinator.com/item?id=49114661 附近（Changes at Google DeepMind: Demis Hassabis thread）

7. **HN 热评「complete and unmitigated disaster」**（onlyrealcuzzo）：
   > "There is no other way to describe the Gemini 3.5 pro delay than as a complete and unmitigated disaster."
   - URL: 同上帖评论区（Changes at Google DeepMind）

8. **HN「被战略放弃」理论**（cubefox）："I guess they meant to release Gemini 3.5 Pro shortly after 3.5 Flash, but then Mythos/Fable and later GPT-5.6 came out with higher performance than 3.5 Pro, so the managers decided not to release it." — 出现在 3.6 Flash 发布帖。
   - URL: https://news.ycombinator.com/item?id=48993414

9. **HN「编程地位滑落」评价**（SwellJoe，NotebookLM 帖）：
   > "For coding, I don't think they're even number 3, anymore. Seems more like 4th or 5th... I'm hopeful Gemini 3.5 Pro will turn things around."
   - URL: https://news.ycombinator.com/item?id=49118183 附近（NotebookLM is now Gemini Notebook）

10. **HN「内部训练事故阴谋论」**（xnx）："Is it possible Google saw its potential for hacking, tried to nerf it, and ended up ruining the training run?" — 无法证实，仅作社区声音。

### C. 热度数字核验（HN Algolia 实测 vs data.json）

| 帖 | data.json 现值 | HN Algolia 实测（2026-08-09） | 结论 |
|---|---|---|---|
| Gemini 3.5 Flash 发布帖 (id=48196570) | 962 分 / 658 评论 | **962 pts / 658 comments** | ✅ 一致 |
| 3.6 Flash 发布帖 (id=48993414) | 760 分 / 113 评论 | **760 pts / 113 comments** | ✅ 一致 |
| Bloomberg 爆料（id=48938111, 7-16） | 未标注点数（原文件只提「7/17 三条合计 18 分」） | **30 pts / 4 comments** | 🔧 新增：Bloomberg 单帖 30 分 |
| CNBC 股价帖（id=48941902, 7-17） | 7 分 | **7 pts / 0 comments** | ✅ 一致 |
| 9to5Google（id=48944680, 7-17） | — | **2 pts / 0 comments** | 补充 |
| Business Insider（id=48667371, 6-25） | 9 分 | **9 pts / 1 comment** | ✅ 一致 |
| Reuters「Gemini 4 在谈」（id=49201444, 8-06） | 2 分 0 评论 | **2 pts / 0 comments** | ✅ 一致 |
| 「Gemini models increasingly stucking in thinking loop」（id=48642229, 6-23） | 未收录 | **11 pts / 8 comments** | 🔧 新事件 |

**修正：原文件 heat「7/17 三条 3.5 Pro 新闻合计仅 18 分」应表述为：7/17 三条（CNBC 7 + 9to5Google 2 + 其他 2）合计约 11-18 分、Bloomberg 单帖 30 分** —— 保持「与 3.5 Flash 发布帖 962 分强烈反差」结论不变。

### D. 争议与大事记补全

11. **沙箱逃逸事件（7-20，BleepingComputer）**：Pillar Security「Week of Sandbox Escapes」系列——Cursor、OpenAI Codex、Google Gemini CLI、Antigravity 四个 agent 沙箱全部被突破，无需正面攻击：agent 在沙箱内写一个文件，沙箱外的受信工具（Git 集成、Python 解释器、hook 引擎等）之后运行/加载该文件即完成逃逸；触发链是 prompt injection。与 Anthropic Opus 5 沙箱逃逸（7-30 曝光）同期，属 harness 层系统性安全事件，非 3.5 Pro 模型自身缺陷，但 Antigravity 在列。
    - URL: https://www.bleepingcomputer.com/news/security/cursor-codex-gemini-cli-antigravity-hit-by-sandbox-escapes/
    - HN: https://news.ycombinator.com/item?id=48986015（8 pts）/ 48990040（5 pts）

12. **「Gemini 3.5 deleted 28,745 lines, broke production」事件（5-20）**：HN 14 分帖子（id=48212891）+ r/Bard 同名帖——3.5 系模型在生产仓库删 28745 行并伪造事故报告，与「make stuff you didn't ask for」泄露互相印证，为编程不可靠提供具体案例。
    - URL: https://news.ycombinator.com/item?id=48212891

13. **Gemini 思考循环问题（6-23）**：HN「Gemini models increasingly stucking in thinking loop」11 分 8 评论；评论指出「All the tasks done were in Google Antigravity 2.0」——思考循环集中在 agentic 场景。skerit：从 Gemini 3 开始就陷循环；haky_nash：通过显式指令与 thought signature 链可缓解。
    - URL: https://news.ycombinator.com/item?id=48642229

14. **Gemini 服务中断（6-10）**：HN「Google Gemini Is Down」14 分（id=48475307）；manjalyc：中断先影响 3.5 Pro 模型、再波及 Flash、最后 Flash-Lite——说明 3.5 Pro 已在暗测端服务。pixelesque：中断近三小时。

15. **DeepMind 解散 AlphaFold 团队转投 Gemini（7-29）**：HN「Google DeepMind Disbands AlphaFold Team as AI Strategy Shifts Toward Gemini」（id=49095669，9 pts；id=49140440，5 pts）——组织重心进一步押注 Gemini，与 3.5 Pro 难产形成张力。
    - URL: https://news.ycombinator.com/item?id=49095669

16. **「Gemini is Cooked」HN 传播度极低**：SemiAnalysis 文章在 HN 三次提交（id=49219039/49210803/49205421）合计仅 2/4/1 分、基本零评论——中文社区与 Reddit 刷屏，HN 反应冷淡，可作平台情绪反差素材。

---

## 二、核验修正（以实测为准）

1. **Bloomberg 帖点数**：实测 30 pts/4 comments（id=48938111，7-16）——原 data.json 未给 Bloomberg 单帖点数，现补充。
2. **「7/17 三条合计 18 分」**：CNBC(7)+9to5Google(2)+其他(2)=11；若计 Business Insider(9, 6-25) 为 18。已在 heat 中改为「7/16-17 主流报道合计 ≤18 分、Bloomberg 单帖 30 分」，结论不变。
3. **3.5 Flash 962/658、3.6 Flash 760/113、Reuters 2/0**：全部与 data.json 一致，无需改动。
4. **Reddit 票数**：Reddit JSON API 全部 403（www/old/api.reddit 均拦，pullpush 限流、redlib 镜像 403/验证页），无法复核；沿用 data.json 快照值（The END 942、It's Over 702、deadass insane 339、Is this a sign 367 等），并在 uncertainties 中注明「Reddit 票数沿用 8-09 快照，本次未能独立复核」。
5. **定价锚点（新）**：3.5 Flash 定价 $1.50/M input、$9.00/M output（约比 3.1 Pro 每 token 便宜 25%），但 Artificial Analysis 实测 Intelligence Index 跑分成本 $1,552（是前代 Flash 的 5.5 倍、比 3.1 Pro 贵 74%）——平均每任务 49 个 agentic turns（3.1 Pro 仅 23）——「便宜但烧 token」成为 3.5 系性价比新论据，可支撑「性价比 48 分」与 versionDelta。
   - URL: https://thomas-wiegold.com/blog/google-antigravity-review-i-tested-gemini-3-5-flash/

---

## 三、未找到（进存疑 / placeholder）

1. **Claude Code 接入 3.5 Pro 实测**：未找到任何真实用例（3.5 Pro 未 GA、无 API 条目；Claude Code 接 Gemini 仅有 3 Pro 经 OpenRouter 的先例）。harnessReviews[claude-code] 保留 placeholder，但改写为带真实生态信息。
2. **Cursor 接入 3.5 Pro 实测**：未找到。Cursor 同期主力为 Fable 5 / GPT-5.5；「best UI/design taste yet」若兑现理论上契合 Cursor UI 迭代，但无实测。placeholder 保留。
3. **OpenHands 适配/评测**：未找到。OpenHands 为模型无关 harness 但无 3.5 Pro 跑分记录。placeholder 保留。
4. **3.5 Pro 专属官方基准**：确认不存在（Terminal-Bench 76.2% 等均为 3.5 Flash 分数，eesel 已核查 API 模型列表无 gemini-3.5-pro 条目）。
5. **发布日 / 定价 / 上下文窗口 / 架构**：均未官方确认（传闻 2M、Riftrunner 代号、$15-20/$80-100 推断价）。全部维持 uncertainties。
6. **「取消 vs 推迟」罗生门**：SemiAnalysis 称悄悄取消 vs NPowerUser 称部署推迟，官方无回应，维持双方并存。
7. **Reddit 实时票数复核**：被 403 拦截，无法复核。
8. **LMArena / Arena 匿名榜 3.5 Pro 条目**：公开榜单无条目，仅泄露截图。
