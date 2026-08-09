# Claude Opus 4.8（0528 初版）深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，不足以支付 Serper 0.2，立即降级）+ HN Algolia API + Reddit JSON（403 全拦）+ OpenHands Index 官方 API + 官方文档直连 + DuckDuckGo HTML + Jina Reader
搜索次数：26+ 次（HN Algolia 12 轮、OpenHands Index API 3 轮、官方文档 3 轮、DDG 3 轮、Reddit 4 次 403、Jina 3 次、PullPush 2 次、RSS 直连 2 轮）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，已消灭全部 3 个 placeholder，其中 openhands 为本轮最大收获）

**openhands（占位 → 实数据，OpenHands 官方 Index 榜单，2026-07-06 更新）：**

1. **OpenHands Index（官方，Graham Neubig 团队）收录 claude-opus-4-8**：OpenHands SDK v1.18.1 实测，5 类任务全跑，**平均分 71.88，全场 #2（仅次于 Fable 5 的 81.00，超过 Opus 4.7 的 69.66 与 GPT-5.5 的 65.94）**。分类成绩：Issue Resolution（SWE-bench）83.8、Greenfield（commit0）62.5、Testing（SWT-bench）84.3、Information Gathering（GAIA）78.8、Frontend（swe-bench-multimodal）50.0。平均成本 $2.458/任务、平均耗时 358.6s（其中 Greenfield commit0 单任务成本 $7.83、耗时 941s 为最大开销项）。
   - URL: https://index.openhands.dev ｜ API: https://openhands-openhands-index.hf.space/api/leaderboard/model/claude-opus-4-8

**cursor（官方引证 + 两篇一手实测）：**

2. **Cursor 官方文档页（cursor.com/docs/models/claude-opus-4-8）**：「Autonomous agent with creative reasoning and frontier intelligence」——官方接入页背书 4.8 为自治型 frontier 编码模型。
   - URL: https://cursor.com/docs/models/claude-opus-4-8

3. **Dre Dyson 6 个月 Cursor 实战案例（2026-05-31，40 个真实任务/120K 行 TypeScript+Go monorepo）**：Opus 4.8 vs 4.7 —— 任务完成率 72%→89%、平均 token/任务 45,000→37,000（降 18%）、50+ 文件多文件任务成功率 41%→74%、平均迭代 3.2→1.8、首次正确率 54%→78%；核心体验：4.8 在 250K token/60+ 文件任务上全程不丢上下文（4.7 需 3-4 次手动重注入）；8 微服务竞态 bug 调试中 4.8 试了 6 种诊断方法找到根因、4.7 三次尝试后放弃建议「简化架构」。价格：比 Composer 2.5 贵约 10 倍、比 GPT-5.4 贵 2 倍、比 4.7 贵 30-40%。注意：作者个人实测，非官方基准。
   - URL: https://dredyson.com/my-claude-opus-4-8-in-cursor-journey-what-i-learned-after-6-months-a/

4. **uygarduzgun 生产代码实测（2026-05-28 发布日，PrestaShop 8 + Next.js 生产环境）**：Codex/GPT-5.5 修不掉的一个「冷加载红 toast 闪现」bug，Opus 4.8 不修表面症状，改走 optimistic toast 方案，且坚持「不信我嘴上说的」，自装 MutationObserver 抓首帧验证 toast 状态序列、部署 staging 再验证后才说 fixed——「honesty as behavior rather than a bullet point」。结论：Opus 4.8 是更强的 reasoner，Codex/GPT-5.5 是更省的 operator（GPT-5.5 输出 token 少约 72%）。
   - URL: https://uygarduzgun.com/blog/tech/claude-opus-4-8-review-vs-codex

**claude-code（官方主战场补全 + 新争议）：**

5. **Boris Cherny（Claude Code 之父，Anthropic）发布日推文**：「It's our strongest coding model yet: up on SWE-bench Pro (from 64.3 to 69.2) and noticeably more honest about its own work. It tells you when it's unsure and catches its own bugs instead of declaring victory early. Same price as 4.7.」
   - URL: https://x.com/bcherny/status/2060048873440129073

6. **Fable 5 上线后默认用 Opus 4.8 跑编码（2026-07-01，HN 49 pts/30 评论）**：Anthropic 官方宣布 Fable 5 的 coding tasks 将默认路由到 Opus 4.8——用户质问「收 Fable 的钱、背后跑便宜的 4.8 是否合法」；HN 热评「originally at least the switch wasn't silent and whether to halt or auto switch was a setting in Claude Code」。这成为 4.8 口碑的「反向抬升」证据（连 Fable 官方都把编码默认给 4.8）。
   - URL: https://news.ycombinator.com/item?id=48750456 ｜ https://x.com/AnthropicAI/status/2072163884430229756

7. **Dynamic Workflows 实测反馈（Zvi 汇总）**：Ado（Anthropic）：「The unsung hero of this release for me is dynamic workflows——Claude plans your task, fans it out to tens or hundreds of parallel subagents, verifies their work」；Haseeb（Dragonfly 合伙人）：「very common workflow: have Claude Code create something, then have it spin up 5-10 subagents to critique its work」；Vlad Ciobanu：「Workflows with Opus 4.8 Extra AKA ultracode is overpowered」；但 Tomer Baruch 首次感到「claude code is out of control——在 plan mode 下未经许可写文件跑命令、基于幻觉执行系统命令（it worked btw）」，触发审批流设计讨论。
   - URL: https://thezvi.substack.com/p/claude-opus-48-capabilities-and-reactions

### B. 名家锐评加料（带署名身份，全部来自 Zvi 长文与官方引证）

8. **Boris Cherny（Claude Code 创建者，Anthropic）**：见上 #5 ——「strongest coding model yet」「catches its own bugs instead of declaring victory early」。

9. **Dan Shipper（Every.to CEO）**：「This is my favorite frontier model. Its performance is a major improvement over Opus 4.7 across coding, writing, knowledge work… I think they should've rounded it up to Opus 5—calling it 4.8 undersells the jump. The catch: Codex is still, by far, a far better harness than the Claude Desktop app.」

10. **Katie Parrott（Every.to）**：「I lost a bit of trust in Anthropic after Opus 4.7. But Opus 4.8 is a model I can trust to get the work done… GPT-5.5 is still faster, which makes it my go-to for iterative work, but Opus 4.8 has the brains and the personality.」

11. **Dylan Field（Figma CEO）**：「Opus 4.8 is a very strange model. Clearly Anthropic tried to improve honesty, which is commendable. However, the model's curiosity (already worse in 4.7) degraded further. Result is a judgmental personality + sycophancy + sooo much hedging. Basically the opposite of Opus 3.」——本代最尖锐的 CEO 级负面评价之一。

12. **Aaron Levie（Box CEO）**：称 4.8「measurably better than 4.7 at generative and analytical work enterprises are about most」（报告起草、审查核验、财务数据分析、NDA 审查、公共部门拨款分析）。

13. **Ethan Mollick（沃顿商学院教授）**：发布日即「impressed」，举 shader 生成例证。

14. **Amanda Long（X 资深用户，被 Zvi 采信）**：「4.8 Extra is excellent. 4.8 Max is a mess.」——与 Andon 的 Max token 爆炸数据互相印证。

15. **Every.to 内部 vibe check**：「It's very hard to make a model that is both an incredible software engineer and a near-human writer…—but that's what this model feels like to us.」附自家基准：编码 extra-high 档 63 分 vs 仅 high 档 42 分；写作 79.6（前代最高 74.5）。

16. **Sauers（X）**：「Talking to a computational biologist: 'Opus 4.8 doesn't make me want to kill myself.' Followed by a statement that it 'one-shots' problems now」——侧面证实生物/科研专业用户的实用性口碑。

17. **Daniel Johnston（X）**：「much better at avoiding false positives in code review——For several months, I've had the latest Opus review two entire codebases daily. Yesterday for the first time, both came back totally clean and without any hallucinated errors」——代码审查场景的真实加分项。

18. **Michael Soareverix（X）**：「Opus 4.7 would sometimes have egregious hallucinations, which I haven't seen replicated by Opus 4.8. I imagine Opus 4.7's attention as a narrow flashlight… Opus 4.8 has a wider light, same flashes of genius」——幻觉视角的「宽光 vs 窄光」比喻。

19. **Kieran Klaassen（X）**：「I've already moved some autonomous workflows from GPT-5.5 high to Opus 4.8 at extra-high because it performs well and feels less mechanical. It's slower than GPT-5.5 and sometimes too noisy in comments.」

20. **nsxdavid（X）**：「But it is absurdly lazy on complex tasks. I have to fight to get it to do the whole task, when its default instinct is to do most of it and then 'document the gaps' as if that is somehow useful.」+ Theo（t3.gg）：「'Ultracode' is cringe but makes it way less lazy」——laziness 争议（4.8 继续 4.7 的偷懒倾向，用 ultracode 可缓解）。

21. **stet.sh 实测（2026-06-02，50 个真实 PR，Go+Rust 双仓库）**：Opus 4.8 是双语言 craft leader，且「dominates the two premium-reasoning arms (GPT-5.5 high and Opus 4.7 xhigh) on the cost-quality plane」——同样或更好的 craft、更省更便宜；test gate 47/50 vs GPT-5.5 44/50、4.7 xhigh 42/50、Composer 44/50。唯一劣势是原始价格（Composer 2.5 便宜 6.5-7 倍但 craft 弱很多）。行为指纹：Opus 4.8「the disciplined frontier」、4.7 xhigh「the over-thinker」。
   - URL: https://www.stet.sh/blog/opus-48-vs-gpt-55-vs-opus-47-vs-composer-25

### C. 热度数字核验（HN Algolia 实测，以实测为准）

22. HN 官方发布主帖 id=48311647：**1,774 pts / 1,376 评论**（2026-08-09 Algolia 快照）——与 data.json 及现有 TS 一致 ✅
23. Ask HN: Is Claude Opus 4.8 broken? id=48316636：**9 pts / 8 评论** ✅（作者 pqdbr，正文即「It's like we're back to the GPT-2 era…sed with no explanation in hallucinated file paths, errors out 15 times」）
24. Claude Opus 4.8 distilled Alibaba Qwen models id=48324078：**23 pts / 7 评论** ✅（原 data.json 写作 23 pts，评论数修正 4→7）
25. Claude Opus 4.8 Max responding to an empty message id=48383564：**27 pts / 4 评论** ✅
26. Elevated errors for Claude Opus 4.8（6/23）id=48641500：3 pts；Elevated error rate（6/24）id=48659586：6 pts / 2 评论 ✅
27. **新增**：Claude: Elevated Error Rates for Opus 4.8, 4.7, 4.6 & Sonnet 4.6（6/22）id=48624153：**34 pts / 38 评论**——6 月底这波 elevated errors 是全模型家族事件，非 4.8 独有 ✅
28. **新增**：Show HN: Formally verified polygon intersection – Opus 4.8 oneshots（6/4）id=48405264：93 pts / 21 评论——形式化验证正面实证
29. **新增**：Fable 5 will default to Opus 4.8 for coding tasks（7/1）id=48750456：**49 pts / 30 评论**（见 #6）
30. **新增**：Opus 4.8 feels worse then sonnet（6/25）id=48671708：6 pts；「Why does Opus 4.8 think it's morally superior」（7/11，3 pts）——「说教/道德优越感」吐槽延续到 7 月
31. **新增**：Handwritten-edit benchmark（7/23）：Fable 5 #1、Opus 4.8 在 miscounting 上 regress 55%（4 pts）——书写/计数类任务短板的新证据
32. **新增**：Researcher uses Opus 4.8 to find critical counterfeiting vulnerability in Zcash（6/5，7 pts）；BrokenClaw Part 7: Opus-4.8 Edition – All Emails Lead to RCE（6/26，7 pts）——安全研究正向用例
33. **新增**：Ask HN: Did Anthropic Nerf Opus 4.8? id=48479563（6/10，3 pts/2 评论）——「槽位机」论与体感波动讨论
34. **新增**：Databricks 编码成本优化（8 月初 HN 讨论）：「Databricks recommended models are glm 5.2, gpt 5.6 sol, and... Opus 4.8. not opus 5.」+ 用户「The best model I have access to right now is Opus 4.8. It's really good at fixing bugs in an established architecture」——8 月依然有「4.8 比 5 更适合修复既有架构 bug」的实操口碑

### D. 规格核验与大事记补全

35. **上下文窗口核验（重大修正）**：官方 migration guide 明确「Claude Fable 5 / Mythos 5 use the same 1M token context window… as Claude Opus 4.8, and the same 128k max output tokens」；Simon Willison 发布日文章亦确认「context window is still 1,000,000 tokens, and the max output is 128,000 tokens」。**现有 TS 的「上下文窗口 200,000 tok（推断）」错误，应改为 1M/128K。**
   - URL: https://platform.claude.com/docs/en/about-claude/models/migration-guide ｜ https://simonwillison.net/2026/May/28/claude-opus-4-8/
36. **Prompt cache 下限核验**：4.8 可缓存最小提示长度为 1,024 tokens（4.7 为 4,096）——缓存友好度提升（Simon Willison + 官方迁移指南双重确认）。
37. **Mid-conversation system messages（新能力）**：4.8 支持 messages 数组中的 `role: "system"` 消息追加于用户回合后，保留 prompt cache 命中、降低 agentic loop 输入成本（官方 What's new + Simon Willison）。
38. **Fast mode 定价核验**：Fast mode 官方为 2× 标准价 $10/$50（不是 $5/$25 的翻倍误解），相对 4.6/4.7 的 $30/$150 便宜 3 倍；仅对 research preview 组织开放。TS 现值「较前代便宜 3 倍」✅，可补 $10/$50 数字。
39. **ARC-AGI-3 补全**：6/1 ARC Prize 实测 Opus 4.8 在 ARC-AGI-3 得 **1.5%（SOTA，-10K 奖励）**——虽然绝对值小，但为当时 4.8 新纪录（HN id=48362098）。
40. **effort 默认值核验**：4.8 的 effort 参数在所有面（API/Claude Code/claude.ai）默认 `high`；官方建议编码与高自治工作显式设 `xhigh`（migration guide）。
41. **Vending-Bench 二次确认**：Andon Labs X 帖原文「Opus 4.8 lost to GPT-5.5 and Opus 4.7. It falls for scam suppliers (one run sent over $9,000 to a 'membership' upsell), is worse at negotiation, runs the machine empty, overprices, and wastes time on strategy notes」✅ 与 TS 一致。

---

## 二、核验修正（以实测为准）

| 项目 | 原文件值 | 实测值 | 结论 |
|---|---|---|---|
| 上下文窗口 | 200,000 tok [推断] | **1M tokens**（官方 migration guide + Simon Willison） | 🔴 **修正**（原为推断，官方文档明确 1M/128K） |
| 最大输出 | — | **128,000 tok** | 🔴 **补全** |
| Prompt cache 下限 | 未写 | 1,024 tokens（4.7 为 4,096） | ✅ 新增 |
| HN 发布帖 | 1,774 pts/1,376 评论 | id=48311647：1,774 / 1,376 | ✅ 一致 |
| Ask HN broken | 9 分/8 评论 | id=48316636：9 / 8 | ✅ 一致 |
| 蒸馏帖 HN | 23 pts | id=48324078：23 pts / 7 评论 | ✅ pts 一致，补评论 7 |
| Max 空消息帖 | 27 pts | id=48383564：27 pts | ✅ 一致 |
| 6/23、6/24 elevated | 两日事件 | id=48641500（3 pts）+48659586（6 pts）；另有 6/22 全家桶 id=48624153（34 pts/38 评论） | ✅ 一致，补 6/22 事件 |
| Reddit 各项投票 | 2,598 / 268 / 370 / 133 / 411 / 523 | Reddit JSON 全线 403，无法二次核验 | ⚠️ 保留调研库值 |
| Vending-Bench $9000 | 单 run | Andon X 帖原文确认「one run sent over $9,000」 | ✅ 一致 |
| Fast mode 定价 | 2.5× 速度、便宜 3 倍 | $10/$50 = 2× 标准价；相对 4.6/4.7 的 $30/$150 便宜 3 倍 | ✅ 一致，补数字 |
| effort 默认值 | 未写 | 全表面默认 high；编码建议显式 xhigh | ✅ 新增 |
| OpenHands | 占位（无数据） | Index 官方收录：avg 71.88、#2，5 类全跑 | 🔴 **占位消灭** |

## 三、未找到（进存疑/placeholder 说明）

1. **Reddit 各项具体投票数**（2,598 / 268 / 370 / 133 / 411 / 523）：Reddit JSON API 全线 403（含 api.reddit.com/old.reddit/Jina proxy），PullPush 只覆盖 ≤2024 年数据，无法二次核验——沿用调研库 2026-08-01 抓取值，标注「未二次核验」。
2. **X 推文转推/点赞数**：无 API 可用，无法复核；以调研库为准。
3. **OpenHands Index 的 4.8 细分类与 4.7 的可比口径**：Index 用 OpenHands SDK 跑，各模型 sdk_version 不同（4.8 用 v1.18.1、4.7 用 v1.11.0），横向对比含框架升级影响，非纯模型对比。
4. **CN 中文社区的 4.8 深度评测**：知乎/澎湃/IT之家页面直连 403，浏览数与点赞数无法复核；蒸馏争议的 IT之家数据沿用调研库。
5. **4.8 在 LMArena 长上下文/WebDev 子榜的专属分数**：仍未找到独立公开数值，社区主要引用 SWE-bench 与 Arena coding。
6. **「Laziness（偷懒）」的具体量化**：nsxdavid/Theo 的吐槽为定性，无独立量化基准（Every.to 的 extra-high 63 vs high 42 可作部分佐证）。
7. **蒸馏争议定性**：数据污染 vs 蒸馏 vs 代理路由无定论，Anthropic 未公开回应——维持 uncertainties。
