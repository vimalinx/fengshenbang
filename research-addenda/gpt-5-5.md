# GPT-5.5 深度调研补遗（详情页深化 · 2026-08-09）

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits 全部工具 ≥0.2 credits，判定不可用立即降级）+ HN Algolia API（免费）+ Exa Web Search + GitHub API + 直抓 36kr/钛媒体/掘金/Medium/开源库
搜索次数：直接工具 16 次 + 2 个并行 librarian 代理（各 8-10 次 web 搜索）＝ 合计 30+ 次
核心目标：消灭 harnessReviews 3 条 placeholder、加厚专家锐评、核验热度数字、补全争议大事记

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，3 条 placeholder 全部消灭）

**claude-code（GPT-5.5 无法原生接入，全部经代理转译层）——本轮最厚收获：**

1. **J.D. Hodges 博客（2026-04-24，发布次日）**：首个公开实测——用 Simon Willison 的 `llm-openai-via-codex` 插件复用 Codex OAuth 在 Claude Code 里跑 GPT-5.5。同一 review prompt，relay 路径平均 **4.5s** vs `codex exec` 的 **10.7s**；原话 "Claude Code combined with CODEX is an awesome pair"；Plus 额度 50+ 次快速调用后触发限流，部分请求挂起 300s。
   URL: https://www.jdhodges.com/blog/how-to-use-gpt-5-5-today-at-the-cli-via-your-existing-codex-subscription/

2. **掘金「关嘉伟谈AI」（VP @趋境科技，2026-05-08）**：原 Claude Code 重度用户两周后「把 Claude Code 卸得差不多」转投 Codex 5.5。关键实测对比：Claude Code「快但不准，验收时明显的问题没找出来」；compact 压缩「Claude Code 一压基本上半张脸都没了，Codex 把整段对话重写成带元数据/工具状态的交接摘要，信息掉得更少」；8 小时长会话连续点「继续」；两个天花板=大系统架构格局受限 + 创新创造力平庸需人喂思路。
   URL: https://juejin.cn/post/7637099542423519274

3. **gh777111/claude-code-gpt（开源代理 repo）**：Anthropic Messages → OpenAI Responses 翻译层，实测细节——全局配置隔离把 system prompt 开销从 ~20k 降到 ~6.6k tokens；工具轮自动降 `low` reasoning「keep agentic latency reasonable」；同任务 Azure GPT-5.5 约 **$4** vs GPT-5.4-mini 约 **$0.43**（10 倍价差）。
   URL: https://github.com/gh777111/claude-code-gpt

4. **pilc80/claudex（开源代理 repo，2026-05-02 首提交）**：完整保留 `/compact`、auto-compaction、context-limit 恢复；把 `gpt-5.5-pro` 以 `[1m]` 后缀呈现给 Claude Code，让 harness 感知 1M 窗口。
   URL: https://github.com/pilc80/claudex

5. **konan-1947/claude-code-proxy（开源 fork）**：Codex backend 实测确认 Plus 可用 `gpt-5.5`；`DISABLE_AUTO_COMPACT=1` 规避上下文问题；原话 "I feel Claude Code is still the best harness around"。另有 raine/claude-code-proxy 同族支持 GPT-5.5。
   URL: https://github.com/konan-1947/claude-code-proxy

6. **516 bug 波及 Claude Code 代理路径**：issue #29353 用户 yogesh1239 确认 Claude Code Enterprise/Sub 中 GPT-5.5 同样出现 516 截断。
   URL: https://github.com/openai/codex/issues/29353

7. **HN 真实迁移声音（Ask HN: Is Codex with GPT 5.5 Extra High being dumbed down?）**：pranshuchittora「六月第一周感觉被降智，已转 claude code 做规划、codex 做执行（更快但蠢）」；ashmil「用 codex 一个月感到同样变化，回 claude max 了」；0x_rs「多半是推理被截断，见 issue #30364」。
   URL: https://news.ycombinator.com/item?id=48734115

8. **宏观背景事件**：GPT-5.5 发布当天（04-24）Anthropic 发 postmortem 承认 Claude Code「降智」属实（推理默认档位被暗中从 high 调成 medium、缓存 bug 每轮清思考记录、4/16 加的 25 词/100 词提示词限制致 Opus 4.6/4.7 性能 -3%），并重置所有订阅额度——被社区质疑「在 GPT-5.5 发布日转移注意力」；此事件客观上把一批 Claude Code 用户推向 Codex/GPT-5.5。
   URL: https://www.36kr.com/p/3780358673863687 / https://www.infoq.cn/article/6iDjLwYiOXIVwjl4taOP

**cursor：**

9. **CursorBench 3.1 官方 GPT-5.5 成绩**（Cursor 官方）：High 58.4%/$2.05/task、Extra High 58.4%/$2.85、Medium 53.8%/$1.51、Low 46.6%/$0.98（含 token/step 明细）；Cursor 4-24 公告宣称 72.8% 用的是内部预 3.1 版基准，第三方 BenchLM 镜像按 3.1 默认口径为 59.2%。
   URL: https://cursor.com/cursorbench

10. **Endor Labs 跨 harness 实测（2026-04-27）**：同一模型同一周，**Cursor SDK + GPT-5.5 功能正确率 87.2% vs 原生 Codex + GPT-5.5 仅 61.5%（26 个点差距）**——集成层显著影响性能；安全项 Cursor 23.5% vs Codex 20.1%；对比 Opus 4.7 在 Cursor 91.1% 功能/22.9% 安全。原话 "same model, same week, two harnesses, two different functional results"。
    URL: https://www.endorlabs.com/learn/gpt-5-5-sets-a-new-code-security-record-with-cursor-not-codex-in-agent-security-league

11. **Cursor 论坛真实用户反馈**：Artemonim「GPT-5.5 cache lifetime 破损或过短，272k 后仅总结一次」；Roderick Mabry「被按 on-demand 正常价额外扣费，29M tokens？不对劲」；Cursor 员工 Colin 确认 50% 折扣到 5-02 截止，折扣价 $2.50/$0.25/$15。
    URL: https://forum.cursor.com/t/gpt-5-5-out-now/158953

12. **Michael Truell（Cursor 联合创始人兼 CEO，2026-04-24）**：「GPT-5.5 比上一代更聪明、更有韧性，调用工具更可靠，面对复杂长期任务时能坚持更久」。
    URL: https://www.tmtpost.com/7966667.html

13. **Windsurf（现 Devin Desktop）同天接入**：04-24 API 发布当天模型选择器上线 GPT-5.5；vibecodingresources.com 评测「long-horizon agentic coding 明显更好、快速编辑与上一代相当」。Apidog 三方对比：Terminal-Bench 2.0 GPT-5.5 **82.7%** vs Cursor Composer 2.5 的 69.3%（差 13 点）。

**openhands：**

14. **OpenHands 官方推荐 + 量化成绩**：官方文档列 GPT-5.5 为 GPT 家族首选模型（`openai/gpt-5.5`），**OpenHands Index 均分 65.9**（对比 claude-opus-4-8 71.9、Gemini-3.5-Flash 62.6、GLM-5.1 58.2、Kimi-K2.6 57.1）。详细成绩（2026-04-27~05-08，OpenHands v1.18.1/v1.21.1）：swt-bench **83.4**（$0.92/例）、gaia **86.1**（$0.74/例）、swe-bench **78.2**（$1.52/例，294s）、commit0 **43.8**（$5.56/例，1029s）、swe-bench-multimodal **38.2**（$2.81/例）。
    URL: https://docs.openhands.dev/openhands/usage/llms/llms.md / https://github.com/OpenHands/openhands-index-results/tree/main/results/GPT-5.5

15. **software-agent-sdk PR #2975（2026-04-27 合并）**：正式加入 GPT-5.5 配置（`reasoning_effort: "high"`，讨论后决定不用 xhigh 以与 gpt-5.4 一致）；集成测试 **18/18 通过，总成本 $6.36**（4,621,031 prompt + 64,006 completion + 17,770 reasoning tokens）；跳过 thinking_block_condenser 测试（GPT-5.5 产 reasoning items 而非 thinking blocks）。
    URL: https://github.com/OpenHands/software-agent-sdk/pull/2975

16. **agent-canvas PR #1103（2026-06-04 合并）**：默认 onboarding LLM 从 `claude-opus-4-8` 改为 `openai/gpt-5.5`（13 语言 i18n）。
    URL: https://github.com/OpenHands/agent-canvas/pull/1103

17. **集成测试矩阵**：integration-runner.yml 中 gpt-5.5 进入 DEFAULT_MODEL_IDS（与 deepseek-v4-flash、minimax-m2.7、gemini-3.1-pro、claude-sonnet-4-6 并列）。OpenHands 经 acp-codex（Agent Client Protocol）跑 GPT-5.5：SWE-bench 64.2%、Terminal-Bench 29.6。

### B. 名家锐评加料（带署名身份，英文原话可查）

18. **Dan Shipper（Every 创始人/CEO，OpenAI 发布页引述）**："the first coding model I've used that has serious conceptual clarity"——回放一次发布后 bug 的重构，GPT-5.4 做不到、GPT-5.5 做到了。
    URL: https://medium.com/@polyglot_factotum/gpt-5-5-system-card-review-133161a1f2e7

19. **英伟达内测工程师（OpenAI 发布页引述，身份未具名）**："Losing access to GPT‑5.5 feels like I've had a limb amputated."——「失去它像被截肢」英文原版出处。
    URL: https://openai.com/index/introducing-gpt-5-5/

20. **Justin Boitano（NVIDIA VP of Enterprise AI，官方博客）**：Codex 生产实测「调试从几天缩到几小时、数周实验一夜出结果」；GB200 NVL72 单位 token 成本降 35x、每兆瓦输出吞吐高 50x。
    URL: https://blogs.nvidia.com/blog/openai-codex-gpt-5-5-ai-agents/

21. **黄仁勋（NVIDIA CEO，全员邮件）**："Let's jump to lightspeed. Welcome to the age of AI."——10000+ 员工先行、随后全员开放 Codex；OpenAI 总裁 Greg Brockman 确认企业级整司部署。
    URL: https://economictimes.indiatimes.com/tech/artificial-intelligence/nvidia-rolls-out-openais-codex-ai-agent-to-all-employees/articleshow/130502339.cms

22. **Gregory Terzian（Medium 技术作者，2026-04-25）**：《The Benchmark They Buried》——OPQA（OpenAI 内部 20 个真实工程瓶颈，需诊断性能回退/异常训练指标/隐蔽实现 bug）GPT-5.5 通过率仅 **1.7%**，而 5.3 Codex 5.8%、5.2 Codex 8.33%（5.4 系统卡数据）；「模型在真实调试类任务上逐代退步，却在写大段 bash 脚本上变强」；并披露 Hard negative protein binding 0% vs 5.4 的 3.46%、Monorepo-Bench 60 vs 59.3。
    URL: https://medium.com/@polyglot_factotum/gpt-5-5-system-card-review-133161a1f2e7

23. **neteroster（V2EX 用户）**：「5.5 是执行的神，opus 是规划的神」。**w568w（V2EX 知名用户）**：「Opus 4.8 ≈ Opus 4.6 >> Opus 4.7 > GPT 5.5 ≈ MiMo 2.5 Pro >> GPT 5.2~5.4 >> Gemini 3.1 Pro」。
    URL: https://www.v2ex.com/t/1218023

24. **HN 用户 XCSme（OpenRouter 价格分析帖热评）**：实测同 benchmark「5.5 比 5.4 medium 贵约 **3.5x**」；但「5.5 low 打平 5.4 medium、成本仅 82%」，n8n agentic 真实使用后结论「用 5.5 low 是当下最优解」。HN 用户 darqis：「5.5 把简单的事复杂化，改个 oidc auth url 也要绕一大圈，学不会 K.I.S.S」。
    URL: https://news.ycombinator.com/item?id=48057209

25. **钛媒体实测（字母AI，2026-04-24）**：GDPval 84.9%（vs 5.4 83.0%、Opus 4.7 80.3%）、OSWorld 78.7%、Tau2 Telecom 98.0%、FinanceAgent 60.0%、OfficeQA Pro 54.1%；**ARC-AGI-2 经 ARC Prize 官方验证 85.0% 为新 SOTA**（现详情页未收录）；「前端能力据反馈仍差点意思，这块 Claude 做得更好」。
    URL: https://www.tmtpost.com/7965226.html

26. **CSDN 后端开发者（2026-06-27）**：「它在任何一个单项上都不是第一，但综合能力覆盖的广度，目前没有竞品能做到」；「开始像一个有经验的 Senior Dev 在写代码——可观测性、优雅降级、并发安全」。
    URL: https://blog.csdn.net/Xiaofeng3693/article/details/162370531

### C. 热度数字核验（HN 实测为准）

| 数据点 | data.json 现值 | 实测（HN Algolia 递归统计） | 结论 |
|---|---|---|---|
| HN 发布帖 points | 1,580 | **1,580**（item 47879092，2026-04-23） | ✅ 一致 |
| HN 发布帖评论 | 1,056 | **1,056**（search API num_comments） | ✅ 一致 |
| HN 516 bug 帖 | 372 点/152 评 | **372/152**（item 48789428，07-04） | ✅ 一致 |
| HN 幻觉 3x GLM-5.2 帖 | 585 点/294 评 | **585/294**（item 48600167，06-19） | ✅ 一致 |
| Codex 先行发布帖 | story 47858903 | **17 点/3 评**（04-22，标题「GPT 5.5 Released in Codex」） | ✅ 存在 |
| Reddit 发布帖 369 票 | 369 | **无法实测**（Reddit www/old/api/r.jina.ai/redlib 全 403） | ⚠️ 保留 08-01 快照 |

**新发现未收录 HN 帖**：DeepSeek V4 Pro beats GPT-5.5 Pro（397/225，48440448）、Kimi K2.6 击败 GPT-5.5 编码挑战（380/219，47993235）、SWE-1.7 接近 GPT-5.5（272/140，48833866）、API 发布帖（256/159，47894000）、DayBreak GPT-5.5-Cyber（221/174，48639063）、GPT-5.5 Price Increase（214/73，48057209）、Grok 4.5/GPT-5.5/Claude 同 app 实测（173/93，48838772）、Bio Bug Bounty（160/103，47901734）、GPT-5.5 Instant（87/20，48025274）、Codex goblin 提示词帖（47935132）、Save GPT-5.5（48966665）。

### D. 争议与大事记补全

27. **goblin 输出倾向官方解释（2026-04-29）**：OpenAI 官方博客《Where the Goblins Came From》——承认源于 Nerdy 人格训练奖励信号，已移除该人格、过滤含 creature 词训练数据、在 Codex 系统提示中明确禁止提及 goblins（HN 04-28 已有用户发帖讨论 47935132）。
    URL: https://openai.com/index/where-the-goblins-came-from/

28. **GPT-5.5 Instant（2026-05-05）**：低成本快速档，取代 GPT-5.3 Instant 成为 ChatGPT 默认模型；幻觉率较主线降低。
    URL: https://openai.com/index/gpt-5-5-instant/

29. **GPT-5.5-Cyber 时间线修正**：05-07 先以 Trusted Access for Cyber 限量预览；06-23 DayBreak 完整发布，CyberGym **85.6%** 超越 Mythos 5（83.8%）；AISI 官方评测为第二个完成多步网络攻击模拟的模型（与 Arm Metis 合作固件漏洞 98%）。
    URL: https://www.36kr.com/p/3865210294277122 / https://www.aisi.gov.uk/blog/our-evaluation-of-openais-gpt-5-5-cyber-capabilities

30. **516 bug 补充细节**：issue #29353（06-21）为首个任务级复现，23 分钟后被标 not_planned 关闭；社区已出 **bentoner/codex-516-hook** 检测插件；516 问题同时影响订阅与 API key 两种鉴权路径；「Ask HN：Codex + GPT-5.5 Extra High 是不是被降智了」（07-30，48734115）进一步坐实 5-6 月体感波动。
    URL: https://github.com/bentoner/codex-516-hook

31. **静默降级官方代码级实锤补充**：Codex issue #28211 用户报告「明确配置 GPT-5.5 High 却被自主降级到 mini，未经请求/确认/授权」；HAR 日志显示 resolved_model_slug 从 gpt-5-6-pro 降为 gpt-5-5-mini；chatgptdisaster.com 1,087 条经验证投诉。

32. **Codex 实际上下文修正**：OpenAI 官方明确「In Codex, GPT-5.5 ... with a **400K context window**」；Linux.do 实测 Codex 内仅约 258K——与 API 的 1,050,000 tok 差异显著，是「1M 上下文」营销 vs 实际体验落差的关键细节。
    URL: https://openai.com/index/introducing-gpt-5-5/ / https://linux.do/t/topic/2073271

33. **Save GPT-5.5 挽留站（2026-07-19）**：GPT-5.6 发布后用户担心 5.5 被下线，发起 save-gpt-5-5.fyi 挽留运动（「5.6 already out, so with urgency」），HN 帖 7 点/13 评引发「别对非开源模型产生情感依赖」的讨论——侧面反映 5.5 的极端用户黏性与 5.6 交替期的社区情绪。
    URL: https://save-gpt-5-5.fyi/ / https://news.ycombinator.com/item?id=48966665

34. **NVIDIA 全司部署（官方背书的生产实测）**：Codex+GPT-5.5 在 GB200 NVL72 上跑（35x 低成本/50x 高吞吐）；10000+ 员工先行（工程/法务/财务/HR/运营全覆盖），随后黄仁勋全员邮件开放；OpenAI 称公司内部 **85%+ 员工每周使用 Codex**；Shaunak Joshi（NVIDIA AI 研究员）：「GPT-5.5 seems to be much more creative compared to competitors」。
    URL: https://openai.com/index/nvidia/

35. **配额削减量化**：Linux.do/V2EX 实测 Codex 中 5.5 credit 消耗相比 5.4 翻倍（input 125 vs 62.5、output 750 vs 375）——「静默配额削减」的量化证据。
    URL: https://linux.do/t/topic/2041971

---

## 二、核验修正（与 data.json / 现 gpt-5-5.ts 对照）

1. **harnessReviews 三条 placeholder 全部可消灭**：claude-code（#1-8）、cursor（#9-13）、openhands（#14-17），bestInSlot 同步去掉「（占位）」标记。
2. **「1M 上下文」需加限定**：API 1,050,000 tok 属实，但 Codex 内官方口径 400K、社区实测约 258K——上下文利用相关表述与 spec 组需注明。
3. **ARC-AGI-2 85.0% SOTA 未收录**：钛媒体/ARC Prize 官方验证，现详情页无此条，应补入榜单与 talents。
4. **OPQA 1.7% 是新披露的系统卡隐藏数据**：现文有「系统卡隐藏基准退步」但缺 OPQA 这个最尖锐数字（5.3 Codex 5.8%、5.2 Codex 8.33%），benchmarkGap/编程 notes 应补。
5. **截肢金句英文原版出处确认**：OpenAI 发布页「Losing access to GPT‑5.5 feels like I've had a limb amputated」，署名「英伟达内测工程师」准确，但无具体姓名职位，进 uncertainties。
6. **HN 516 帖 372/152、幻觉帖 585/294、发布帖 1580/1056 全部实测一致**，无需修改。
7. **Reddit 数字无法复核**：与 kimi-k2 调研同因（403 全封），发布帖 369 票保留 08-01 快照并标注。
8. **GPT-5.5-Cyber 时间线**：现文只记 06-23 DayBreak，补 05-07 限量预览。
9. **xhigh 档 516 发生率**：现文「44% 的 ≥516 响应被截断」→ 精确表述为「exact-516/≥516 比率 44.0%（其他模型约 1.3%）」，与 issue #30364 一致。
10. **goblin 事件**：现文「已移除」无日期——补官方博客 04-29 与 HN 讨论。

---

## 三、未找到（进存疑 / uncertainties）

1. **Reddit 实时数字**：www/old/api/r.jina.ai/redlib 全 403（与 2026-08-01 调研一致），发布帖 369 票、r/codex 配额帖票数无法复核，保留快照。
2. **英伟达内测工程师具体身份**：仅「engineer at NVIDIA」无姓名职位（OpenAI 发布页引述），「截肢」原话保留署名但标注身份未具名。
3. **OpenAI 对 516 bug 的正式声明**：issue #30364 标注 bug/model-behavior/rate-limits 三 label 仍开放，无官方回复。
4. **静默降级触发阈值**：仅确认 Plus 160 条/3h、Pro Heavy 限流条件不明；官方未公开承认降级为 bug。
5. **各平台情绪比例**：58/22/20 为代表帖文估算，非严格量化。
6. **十维体感评分**：综合社区反馈的主观推断值（数据.json 口径），非实测。
7. **CursorBench 3.1 官方 72.8% 与三方 59.2% 的口径差异**：官方公告用内部预发布基准，精确口径未公开。
8. **Linux.do 实测 Codex 258K 上下文的具体复现条件**：单帖报告，与官方 400K 口径并存，取「约 258K~400K」区间表述。
9. **Roo Code / Continue 等 harness 无 GPT-5.5 专项实测**：仅 BYOK 通用支持，无数据（不在三条必填 harness 内，仅记录）。
10. **X 推文互动数字**：需登录，保留 data.json 快照（官方 X 数据 04-23 官宣帖）。
