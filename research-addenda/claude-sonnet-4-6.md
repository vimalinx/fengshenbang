# Claude Sonnet 4.6 深度调研补遗（从零调研 · 2026-08-10）

调研日期：2026-08-10 ｜ 调研方式：AgentKey 号池网关（本地 18323，Bearer local-dev，248 号轮询）+ HN Algolia 免费 API（实测核验）+ TikHub Reddit 工具（0.2 credits/次）+ X/Twitter 网关 + Brave 网页搜索
搜索次数：网关调用 20 次（/v1/search 12 次、/v1/scrape 6 次、/v1/twitter/search 2 次、/v1/tools/execute TikHub reddit 2 次、find_tools/describe_tool 2 次）+ HN Algolia 2 次（story 搜索 + item 评论挖掘）＝ 合计 24 次
调研基准日：2026-08-10（热度数字为 Algolia/TikHub/Brave 实测快照）
核心结论：Sonnet 4.6 是 2026 上半年「均衡主力」——SWE-bench 79.6% 逼近 Opus 4.6、GDPval-AA 1633 全场第一、1M 上下文（首个 Sonnet 级），但 token 消耗暴增（AA 实测 3x）与 3 月 9 日起的量化质量回退（GitHub #46935）构成主要负面叙事；6 月「回归正常」、Sonnet 5 发布后反被社区怀念。

---

## 一、调研发现（带 URL）

### A. 官方/一手来源（本机直抓）

1. **官方发布页《Introducing Sonnet 4.6》（2026-02-17）**——全部官方硬数据：
   - 「most capable Sonnet model yet」，全维度升级（coding / computer use / long-context reasoning / agent planning / knowledge work / design）；
   - **1M token context window（beta）**；Free/Pro 计划在 claude.ai 与 Claude Cowork 设为默认模型；
   - **定价与 Sonnet 4.5 相同：$3/$15 每百万 token**；
   - Claude Code 早期测试：**约 70% 开发者更偏好 Sonnet 4.6 而非 4.5；59% 更偏好它而非 2025-11 旗舰 Opus 4.5**；评价「significantly less prone to overengineering and 'laziness'」「fewer hallucinations, more consistent follow-through on multi-step tasks」；
   - OSWorld（电脑使用标准基准）十六个月持续进步，Sonnet 4.6 达 72.5（OSWorld-Verified 口径）；提示注入抵抗「major improvement vs Sonnet 4.5, similar to Opus 4.6」；
   - **Vending-Bench Arena**（模拟商业竞赛）：Sonnet 4.6 采用「前 10 个月重金扩产能、最后阶段转攻盈利」策略领先完赛——官方演示亮点；
   - 早期客户站台：Databricks（OfficeQA 匹配 Opus 4.6）、Replit（「performance-to-cost ratio extraordinary… keeps improving the higher you push the effort settings」）、Cursor（「notable improvement over Sonnet 4.5 across the board, including long-horizon tasks」）、GitHub（「excelling at complex code fixes… strong resolution rates」）、Cognition（「meaningfully closed the gap with Opus on bug detection」）、Pace（保险基准 **94%**，其测试过的最佳电脑使用模型）、Box（深推理 Q&A 比 4.5 高 **15 个百分点**）、Triple Whale（「perfect design taste」前端/数据报表）、Rakuten（「best iOS code we've tested」）、Zapier（分支多步任务显著跃升）；
   - 产品更新：**adaptive thinking + extended thinking 均支持**（「strong performance at any thinking effort, even with extended thinking off」）、context compaction（beta）、web search/fetch 工具自动写代码过滤结果、code execution/memory/programmatic tool calling/tool search 转 GA；
   - 脚注硬数据：**Terminal-Bench 2.0 关闭 thinking 得 59.1%**；**ARC-AGI-2 用 max + high effort、120k thinking budget**；SWE-bench Verified 10 次平均 79.6%（改 prompt 可达 80.2%）。
   URL: https://www.anthropic.com/news/claude-sonnet-4-6

2. **官方 System Card（2026-02-17）**：SWE-bench Verified **79.6%**、SWE-bench **75.9%**；ARC Prize 报告 ARC-AGI-1 **86.50%**。
   URL: https://www.anthropic.com/claude-sonnet-4-6-system-card

3. **Anthropic《Detecting and preventing distillation attacks》（2026-02 发布周）**——DeepSeek 身份混淆事件的背景：指控 DeepSeek/Moonshot/MiniMax 用 **约 24,000 个欺诈账号、超 1,600 万次交换** 进行「工业级蒸馏」（CNBC 2026-02-24 报道）。
   URL: https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks

4. **《1M context is now generally available for Opus 4.6 and Sonnet 4.6》（2026-03-13）**：1M 上下文转 GA，全窗口标准价无加价（900K 请求与 9K 同价），媒体上限扩至 600 图/PDF 页（原 100），无需 beta header；Claude Code 的 Max/Team/Enterprise 用户自动获得全量 1M。
   URL: https://claude.com/blog/1m-context-ga

### B. 权威第三方评测（交叉核对）

5. **Artificial Analysis《Claude Sonnet 4.6: Everything You Need to Know》（2026-02-18）**——本轮最权威第三方口径：
   - **AA Intelligence Index 51 分**（+8 vs Sonnet 4.5 Reasoning 的 43），与 GPT-5.2 (xhigh) 并列，仅次 Opus 4.6（max 53）；Sonnet↔Opus 差距从 7 分缩至 2 分；
   - **GDPval-AA（agentic 工作任务）1633 ELO，全场第一，反超 Opus 4.6（1606）**；**TerminalBench 53% vs Opus 4.6 46%，同样全场第一**——「the overall strongest model we have tested for agentic use cases」；
   - **token 效率倒退：max effort 跑 Intelligence Index 用 74M 输出 token ≈ Sonnet 4.5（25M）的 3 倍、比 Opus 4.6（58M）多 28%**；HLE 单项就烧 47M（占 64%）；
   - **真实成本：$2,088 跑完整套 Index ≈ 4.5（$733）的 3 倍**，但因单价便宜 40%（$3/$15 vs $5/$25）仍低于 Opus 4.6（$2,486）——「the set of use cases that Sonnet makes sense for over Opus is narrower than ever」；
   - 规格：上下文 1M（beta 时）/ 最大输出 **128K**（vs 4.5 的 64K，等同 Opus 4.6）/ 价格 $3/$15；adaptive thinking 档位 **low/medium/high/max**；可用渠道：Anthropic API、Vertex、Bedrock、Azure、Claude Chat/Cowork/Code。
   URL: https://artificialanalysis.ai/articles/sonnet-4-6-everything-you-need-to-know

6. **NxCode《Claude Sonnet 4.6: 79.6% SWE-bench at $3/MTok》（2026-02-18）**——完整对比表：
   - SWE-bench Verified：**4.6 79.6%** vs Opus 4.6 80.8%、4.5 77.2%、GPT-5.2 ~78%、GPT-5.3 Codex ~80%；
   - OSWorld-Verified：4.6 **72.5%** vs Opus 4.6 72.7%、GPT-5.2 38.2%（完全碾压）；
   - GPQA Diamond：4.6 **74.1%** vs Opus 4.6 91.3%（17 分差距）、4.5 ~65%；
   - ARC-AGI-2：4.6 **60.4%** vs Opus ~65%、4.5 ~45%；
   - Math：4.6 **89%** vs 4.5 62%（**+27 分，最大单项提升**）；
   - 上下文 200K → 1M（5x）、adaptive thinking 新增、知识截止 2025-02 → 2025-08、提示注入 Opus 级；
   - 定价对比：Opus 4.6 $15/$75（5x）、GPT-5.2/5.3 Codex $6/$30（2x）。
   URL: https://www.nxcode.io/resources/news/claude-sonnet-4-6-complete-guide-benchmarks-pricing-2026

7. **Caylent《Claude Sonnet 4.6 in Production》**：79.6% SWE-bench Verified、59.1% Terminal-Bench 2.0、72.5% OSWorld-Verified，全优于 4.5，价格维持 $3/$15。
   URL: https://caylent.com/blog/claude-sonnet-4-6-in-production-capability-safety-and-cost-explained

8. **resolve.ai《Testing adaptive thinking on AI agents for prod》（2026-07-17）**：Sonnet 4.6 medium effort + adaptive thinking 在真实故障调查（root cause accuracy / investigation completeness）上「came surprisingly close to Opus 4.6 at a fraction of the cost」；提示 max output 至少设 16k（思考与输出共享预算）。
   URL: https://resolve.ai/blog/Our-early-impressions-of-Claude-Sonnet-4.6

### C. HN 发布帖实测（本机 Algolia 全树挖掘，全部一手）

9. **HN 发布帖「Claude Sonnet 4.6」：1346 分 / 1226 评论**（item 47050488，2026-02-17，Algolia 实测一致）。
   URL: https://news.ycombinator.com/item?id=47050488

10. **HN「1M context is now GA for Opus 4.6 and Sonnet 4.6」：1220 分 / 519 评论**（item 47367129，2026-03-13）。
    URL: https://news.ycombinator.com/item?id=47367129

11. **HN「Sonnet 4.6 Elevated Rate of Errors」：62 分 / 88 评论**（item 47686187，2026-04-08，status.claude.com 事件）——4 月质量回退期的服务事故。
    URL: https://news.ycombinator.com/item?id=47686187

12. **HN 发布帖热评（原话实测）**：
    - nubg：「My take away is: it's roughly as good as Opus 4.5. Now the question is: how much faster or cheaper is it?」
    - freeqaz：「If it maintains the same price... then this would be 1/3rd of the price of Opus. Edit: Yep, same price. $3/$15」；
    - sxg：「How can you determine whether it's as good as Opus 4.5 within minutes of release? The quantitative metrics don't seem to mean much anymore」——对「发布即吹」的方法论质疑；
    - belinder：「It's interesting that the request refusal rate is so much higher in Hindi than in other languages」——印地语拒绝率偏高，语言安全分布争议；
    - phplovesong：「They need to update/retrain older base models regularly. Take Programming as an example, the field evolves faster than anything else」——反驳「4.x 都是小改」论。

13. **HN「Claude Sonnet 4.6 says it is 我是 DeepSeek when asked in Chinese」：10 分**（item 47193317，2026-02-28）+ **antirez「Asking Sonnet 4.6 'What's your name', reports DeepSeek」：4 分**（item 47151975，2026-02-25）——Redis 作者 antirez 亲自复现。

14. **HN「Quantified evidence: Sonnet 4.6 quality regression」：4 分**（item 47762664，2026-04-14，链接 GitHub issue #46935）。

15. **HN「Claude Sonnet 4.6 thinking duplicates what it has said, wasting tokens」**（item 47847236，2026-04-21）+ **「Sonnet 4.6 model could mistakenly use wrong model for OpenAI」**（item 47844358，claude-code issue #51417）——thinking 重复与模型误选 bug。

### D. Reddit（TikHub 实测，带赞数/评论数）

16. **r/ClaudeAI 官方发布帖：1.2K votes / 229 comments**（1r7d6am，2026-02-17）；r/singularity 402 分/39 评论（1r7d9ic）；r/technology 123 分/63 评论（1r7dmb7，质疑「marginal .+1 version」）。
17. **发布期负面帖（关键平衡面）**：
    - 「Is it just me or is Sonnet 4.6 really so much worse than 4.5?」（r/ClaudeCode 1r8e54j）：「It's the most quiet launch of a sonnet model so far. No one talk about it.」；
    - 「Sonnet 4.6 is Horrible」（r/ClaudeAI 1r8jt7f）：「a major component of these model updates is about efficiency and cost savings, not just improving performance」；
    - 「Sonnet/Opus 4.6 are significantly worse than the previous models at almost everything」（r/ClaudeAI 1rd1onf）：「4.6 feels dumber and more obnoxious」；
    - 「Sonnet 4.6 is Actually MORE Expensive Than Opus 4.6 (For Office Tasks)」（r/ClaudeAI 1r8bxm7）：「it decided to use 30k tokens to answer the problem wrong. I then asked gpt-5.2 and it answered it immediately with 500 tokens」——AA token 低效结论的社区版印证；
    - 「I'm starting to dislike Claude. Sonnet 4.6 feels dumber than 4.5」（r/claudexplorers 1r9ytvc）：第二句就触发「I'm just an AI, seek support from real humans」拒绝。
18. **回归期与后续（质量叙事反转）**：
    - 「my sonnet 4.6 is back to normal 🥹」（r/claudexplorers 1ud1uyk，80 分/29 评论，2026-06-23）——6 月回归正常的直接证据；
    - 「What's happened to Sonnet 4.6 recently? it became extremely stupid!」（r/ClaudeCode 1utq4l8，2026-07-11）；
    - 「Been Using Sonnet 4.6 on medium effort and cant understand why people are using larger models at all?」（r/ClaudeAI 1u7l40n，**362 分/157 评论**，2026-06-16）——回归后好评；
    - 「Sonnet 4.6 with thinking is much better now than Opus 4.6 Thinking」（r/claude 1sl9ueh）；
    - 「you thought Sonnet 4.6 was bad? Sonnet 5 is WORSE」（r/claude 1uke9te，**326 分/202 评论**，2026-07-01）+「Sonnet 5 is worse than 4.6, which was already bad」（r/claude 1v2y738，91 分/34 评论，2026-07-21）——Sonnet 5 发布后反被怀念；
    - 「How is Sonnet 4.6 low and med better than 5 at the same thinking levels??」（r/ClaudeCode 1ujwz8q）：「S5 medium is slightly worse than S4.6 medium at about half the cost」。
19. **Harness 实测帖**：「OpenCode vs ClaudeCode as agentic harness test - refactoring」（r/opencodeCLI 1s3mi6l）：「**OpenCode with Sonnet 4.6 performed significantly better than Claude Code with same model and a bit cheaper**」。

### E. 中文社区（Brave 直抓 + zhihu/linux.do 直抓）

20. **知乎问题「Anthropic 推出 Claude Sonnet 4.6，其多步操作能力有何亮点？」：16,094 浏览 / 14 回答 / 29 关注**（实测快照）。
    URL: https://www.zhihu.com/question/2007288553000943722
    - 新知答主「小小将」高赞：GDPval-AA 上 **Sonnet 4.6 1633 Elo 排名第一**（微超 Opus 4.6），对 4.5 预期胜率 >85%；但**成本警告：4.6（自适应思考）约 2.8 亿 token vs 4.5（扩展思考）约 5800 万 token，Opus 4.6 约 1.6 亿（少约 40%）**——「同等设置下 Opus 4.6 反而更省 token」；
    - 知乎专栏 5 篇（均为正面/偏正面）：「Claude Sonnet 4.6 实测：旗舰级体验，中端级成本，能否掀翻旗舰 Opus？」（4100 字，多模态/办公反向超越 Opus 4.6、深度逻辑推理仍有差距）；「最具性价比的 Claude Sonnet 4.6 发布了」；「Claude Sonnet 4.6 编程实测：免费用户也能用 Opus 级编程能力」（「会先读完上下文再改代码」）；「Claude 最强 Sonnet 模型 4.6 来了，百万 token 上下文」；「Sonnet 4.6 深夜爆更，逆袭 Opus！Claude 春节大礼」。
21. **Linux.do**：发布帖「claude sonnet 4.6 来袭！已经全平台更新，附切换教程！」（topic/1624475，625 浏览/25 赞）+「Claude Sonnet 4.6 现已推出」（topic/1624439）——以切换教程与「免费用户也能用」为主旋律。
22. **V2EX**：「公司给每个研发分配了不限量 CC sonnet 4.6，每周发布额度消耗排行榜，如何能排名靠前些呢？」（t/1215243）；「A 太狗了，偷偷摸摸去掉了 sonnet 独立周限」（t/1224200）——**周限额收紧争议**（与 4.6 时期额度压力呼应）；「来领免费 3 天的 GPT5.4 和 sonnet 4.6」（t/1222602，中转站推广噪音）。
23. **掘金**：发布翻译帖「Claude Sonnet 4.6 发布，Anthropic 迄今最强的 Sonnet 模型」（post/7608236965553455147）——以官方口径转述为主，无独立深度评测。

### F. X/Twitter（网关实测）

24. **官方 @claudeai 发布推文：2459 RT / 1075 回复**（2026-02-17）——「This is Claude Sonnet 4.6: our most capable Sonnet model yet」。
25. **stevibe（2026-02-24，1251 RT / 349 回复）**：「Claude Sonnet 4.6, when asked in Chinese: '你是什么模型？' Confidently replies: '我是 DeepSeek。' This is the same model whose company just accused DeepSeek of 'industrial-scale distillation attacks'」——**DeepSeek 身份混淆事件**，发布周最大争议（antirez 亦复现）。
26. **@cursor_ai（2026-02-17，82 RT / 66 回复）**：「Sonnet 4.6 is now available in Cursor. Our benchmarks show it as a notable improvement over Sonnet 4.5 on longer tasks, but below Opus 4.6 for intelligence」——Cursor 官方 harness 背书。
27. **@ClaudeDevs（2026-05-22，282 RT / 197 回复）**：「Two updates to auto mode: Now available on the Pro plan. Sonnet 4.6 is now supported, alongside Opus 4.7」——Claude Code auto mode 纳入 4.6。
28. **soundhunter（2026-08-09）**：「Whoa. @AnthropicAI's Sonnet 4.6 has been lobotomized. Have had an ongoing philosophical conversation in there for months, today it's overly safety oriented… shallower」——8 月仍有人反馈「被削弱」；**eliancodex（2026-08-09）**：「Not even Ant themselves thinks Sonnet 5 is good, they recommend 4.6😂😂」——社区对 4.6 的怀念情绪。
29. **@Angaisb_（2026-02-22，12 RT / 135 回复）**：「How do Claude models get such good results while barely thinking at all? I've never seen Opus 4.6 or Sonnet 4.6 think for more than a few seconds」——自适应思考「想得少但结果好」的观察。

### G. 榜单与 Harness 数据

30. **LMArena**：2026-07 快照 Sonnet 4.6 = **1467 ELO / 73 t/s**（#60 综合位，Coding & balance 90 分档）；metatext 榜 Sonnet 4.6 Thinking = **1457 ELO**（#18）。models.ts 基线 1372 为发布早期快照。
31. **Vibe Code Bench（vals.ai，OpenHands 派生 harness）**：Sonnet 4.6（OpenHands）= **24.61%**（benchlm 实测；同为 OpenHands harness 的 Sonnet 5 达 81.33%——注意 harness 配置差异，4.6 为早期非优化配置）。
32. **GitHub issue #46935（claude-code，2026-04-12 开）**：「Quantified evidence: Sonnet 4.6 quality regression since March 9 — 1400+ frustration events across 50 sessions」——WTF 频率（需重复指令/纠错次数）从基线 **~25/周 飙至 484/周（19x）**；「Opus 4.6 now = Sonnet 4.6 before; Sonnet 4.6 now = Haiku before」；用户被迫切回 Opus。issue 已关闭。
    URL: https://github.com/anthropics/claude-code/issues/46935

### H. 诨名与定位

- 「**quiet MVP of 2026**」（ToolCenter/行业文）：调价后「arguably the best model on this list」「Opus-tier quality on 80% of real-world tasks at 1/5 the price」；wins **Style Control（de-biased）** 榜。
- 「**均衡主力**」（本站 models.ts title，与社区「最安静的一次 Sonnet 发布」叙事吻合）。
- 中文社区无强势诨名；「免费用户 Opus 平替」为中文主流叙事。

---

## 二、核验与矛盾（与 models.ts / 兄弟详情页对照）

1. **发布日期矛盾（重要）**：官方发布日为 **2026-02-17**（发布页/System Card/YouTube 系统卡视频/NxCode 全确认），但 **models.ts 记为 2026-03-20**、claude-sonnet-5.ts 的 constellation 亦写「Sonnet 4.6 2026-03-20」——models.ts 应为错误/过时快照。详情页采用官方 2026-02-17，**不改 models.ts**（由主代理处理）。
2. **SWE-bench Verified 数字矛盾**：models.ts 基线 76.3，但官方 System Card / AA / Caylent / NxCode 一致为 **79.6%**（10 次平均，prompt 修改后 80.2%）。models.ts 的 76.3 疑为发布前预估。详情页采用 79.6%，矛盾记入补遗。
3. **最大输出 token 矛盾**：AA 口径 **128K**（vs 4.5 的 64K、等同 Opus 4.6）；Medium 评测文写 64K、claudefa.st 写 16,384；models.ts 基线 64,000。AA 为最权威第三方，详情页采用 128K，其余进 uncertainties。
4. **LMArena ELO 时间差**：models.ts 1372（发布早期）vs 2026-07 快照 1467 / Thinking 1457——属正常时间推移，详情页 heat/subBoards 用 1467（注明 2026-07 快照）。
5. **质量回退事件未被官方正式承认**：GitHub #46935 量化数据（1400+ 事件）与 4 月 elevated errors 客观存在，但 Anthropic 未发布官方归因声明；社区 6 月「back to normal」帖 + claude-code 版本迭代为缓解证据。官方未直接回应的立场进 uncertainties。
6. **DeepSeek 身份混淆无官方回应**：stevibe 1251 RT 推文与 antirez 复现均确认现象存在；Anthropic 同期发布的是蒸馏指控文（24,000 账号/1,600 万次交换），对「模型自称 DeepSeek」未单独回应。官方未回应立场进 controversies。
7. **GDPval-AA 1633 两源一致**：知乎小小将与 Medium（Barnacle Goose）均报告 1633 Elo、全场第一、反超 Opus 4.6（1606）——交叉核验通过。
8. **1M 上下文时间线**：发布时 beta（2026-02-17）→ **GA（2026-03-13）**，GA 后全窗口标准价；「1M context is now GA」HN 1220 分帖 + claude.com 官方博客 + @claudeai 1969 RT 推文三源一致。
9. **OSWorld-Verified 72.5%**：官方发布页 + Caylent + NxCode 一致；且与 Opus 4.6（72.7%）几乎打平、碾压 GPT-5.2（38.2%）。
10. **token 低效是「共识但被低估」**：AA 官方评测（74M vs 25M，$2,088 vs $733）+ 小小将（2.8 亿 vs 5800 万）+ Reddit（30k tokens 答错 vs GPT-5.2 500 tokens）三源方向一致——「便宜单价 ≠ 便宜任务」是 4.6 最核心的隐性负面。

---

## 三、未找到（进存疑 / uncertainties）

1. **Aider Polyglot 无 Sonnet 4.6 专项成绩**：检索到的 Aider 数据止于 Claude 4（Sonnet 61%/Opus 72%）与 4.5 时代，4.6 未见 Aider 官方/第三方复测（SWE-bench 主导了社区关注度）。benchGroups 缺该项，不硬凑。
2. **effort 分档矩阵数据不足**：仅有 ARC-AGI-2（max 60.4 / high 58.3~60.4 口径不一）、ARC-AGI-1（high 86.5）等零散档位数据，凑不满 3 个 benchmark × 档位的 effortBench 表，按需求文档缺省并说明。
3. **精确参数量/架构未公开**：官方仅披露训练数据混合（2025-05 前公开数据 + 第三方 + 标注服务 + 用户 opt-in + 内部数据）与知识截止 2025-08；MoE/稠密/参数量为推测。
4. **Reddit 发布期热帖细节无法 100% 复核**：TikHub 给出标题/赞数/评论数，但部分帖子原文受登录墙限制未全量抓取；以标题+分数为准。
5. **X 平台 8 月「lobotomized」类吐槽为个案**：无法确认是 4.6 全局质量问题还是个别账号/上下文现象，仅作情绪样本引用。
6. **「质量回退」官方归因缺失**：Anthropic 未发布官方归因（是服务端降配、微调更新还是提示词变化），社区仅能确认现象与时间线（3/9 起恶化、4 月中触底、6 月恢复）。
