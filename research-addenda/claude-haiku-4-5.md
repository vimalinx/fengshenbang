# Claude Haiku 4.5 深度调研补遗（详情页从零调研 · 2026-08-10）

调研基准日：2026-08-10 ｜ 调研方式：AgentKey 号池网关（http://127.0.0.1:18323，Bearer local-dev，245+ 号存活）+ HN Algolia 免费 API 核验
搜索次数：网关调用 18 次（Brave /v1/search 8、/v1/scrape 6、TikHub 知乎 1、Serper 3）+ HN Algolia 4 次独立核验，合计 22 次
核心目标：产出对齐 Opus 5 标杆的 Claude Haiku 4.5 详情数据（models.ts 基线：2026-06-20 发布、200K、$1/$5、swe 63.4、ELO 1294、toolCall 92.4）

---

## 一、调研发现（带 URL）

### A. 官方硬数据（anthropic.com 官方发布页 + 模型页 + 模型总览页）

1. **官方发布页「Introducing Claude Haiku 4.5」（Oct 15, 2025）**：
   - 核心话术：「Five months ago, Claude Sonnet 4 was a state-of-the-art model. Today, Claude Haiku 4.5 gives you similar levels of coding performance but at one-third the cost and more than twice the speed.」
   - SWE-bench Verified **73.3%**，方法论：50 trials 平均、无 test-time compute、128K thinking budget、默认采样参数、完整 500 题 SWE-bench Verified、双工具（bash + 字符串替换文件编辑）简单 scaffold
   - 「Haiku 4.5 even surpasses Claude Sonnet 4 at certain tasks, like using computers」
   - 客户证言：Augment「achieves 90% of Sonnet 4.5's performance」；Warp「leap forward for agentic coding, particularly for sub-agent orchestration and computer use」；Replit「runs up to 4-5 times faster than Sonnet 4.5」；Gamma「65% accuracy versus 44% from our premium tier model on instruction-following」；GitHub Copilot「comparable quality to Sonnet 4 but at faster speed」
   - URL: https://www.anthropic.com/news/claude-haiku-4-5

2. **官方模型页（claude/haiku）**：定位「Our fastest model, a lightweight version of our most powerful AI, at a more affordable price」；「matching Sonnet 4's performance on coding, computer use, and agent tasks」；定价 $1/$5 Mtok，prompt caching 最高省 90%、batch 省 50%；「Claude Haiku 4.5 is also available in Claude Code」
   - URL: https://www.anthropic.com/claude/haiku

3. **官方模型总览页（最新版，2026-08 时点）** —— 规格组直接数据源：
   - Claude API ID: `claude-haiku-4-5-20251001`，alias `claude-haiku-4-5`
   - 定价 **$1 / input MTok · $5 / output MTok**
   - Extended thinking（thinking.type: enabled）**Yes** ｜ Adaptive thinking **No**
   - 延迟档位 **Fastest**（与 Fable 5 Slow、Opus 5 Moderate、Sonnet 5 Fast 对比）
   - 上下文窗口 **200k tokens** ｜ **Max output 64k tokens**
   - Knowledge cutoff **Feb 2025**
   - URL: https://platform.claude.com/docs/en/about-claude/models/overview

4. **系统卡（HN 51 分帖挂载）**：安全性「substantially more aligned than its predecessor, Claude Haiku 3.5」；自动化对齐评估中 misaligned 行为率**显著低于 Sonnet 4.5 与 Opus 4.1**——官方口径「our safest model yet」
   - URL: https://news.ycombinator.com/item?id=45596168

### B. 榜单成绩（官方 + 第三方）

5. **SWE-bench Verified 73.3%**（官方）：新智元知乎回答交叉验证——「略高于 Sonnet 4 的 72.7%，GPT-5(high) 的 72.8%，接近 GPT-5 Codex 的 74.5%」（以 1.2% 差距落后 GPT-5）
6. **Terminal-Bench 41.0%**（新智元引官方口径）：Claude 系内仅次于 Sonnet 4.5 的 50.0%；「基于 Haiku 4.5 的 AI 智能体比基于 Sonnet 4 的更容易用命令行完成复杂软件任务」
7. **OSWorld 50.7%**（新智元）：远超 Sonnet 4 的 42.2%——computer use 反超的直接证据
8. **AIME 2025**（新智元）：不使用工具准确率比 Sonnet 4 高 10% 以上
9. **GPQA Diamond / MMMLU / MMMU**（新智元）：推理类稍逊 Sonnet 4
10. **LMArena（Chatbot Arena+，openlm.ai 口径）**：ELO **1378**（openlm.ai 榜单：https://openlm.ai/chatbot-arena/）
11. **Arena.ai 官方 X（2026-08 榜单）**：「Claude Haiku 4.5 ranks #22! It has quickly become one of the best value models on the most competitive leaderboard. Tie ranks 4th in Coding」—— URL: https://x.com/arena/status/1978966289248063885
12. **IDP Leaderboard（2026-03 复测，文档 AI）**：Haiku 4.5 69.6 overall（Sonnet 4.6 80.8、Opus 4.6 80.3），「Sonnet is equally good as Opus for document work」；注意到 Claude 系内容审核更严，历史文献扫描触发过滤器—— URL: https://www.reddit.com/r/ClaudeAI/comments/1rqxs94/
13. **302.AI 掘金实测（2025-10-26，783 阅读）**：逻辑推理与数学解题稳定、擅长多步推导、结构严密，但「整体输出内容相对冗长」—— URL: https://juejin.cn/post/7565088676322426922

### C. 热度数字（HN Algolia 实测核验 2026-08-10）

| 数据点 | 数值 | 来源 |
|---|---|---|
| HN 发布帖 | **730 pts / 287 评论**（item 45595403） | Algolia 实测 ✅ |
| HN 系统卡帖 | 51 pts（item 45596168） | Algolia 实测 ✅ |
| Reddit 发布帖（r/ClaudeAI Introducing） | **1,098 赞 / 280 评论** | Brave 快照 |
| Reddit 最高赞讨论帖（r/ClaudeAI） | 273 赞 / 131 评论（「Haiku 4.5 is really, really good」） | Brave+Serper 交叉 |
| 知乎问题 | 被浏览 **10,725** / 9 回答 / 19 关注 / 1 评论 | 知乎页面抓取 ✅ |
| Linux.do 发布帖 | 1.6k views / 47 likes / 22 users / 38 帖 | 页面抓取 ✅ |
| X 官方发布反应 | Arena.ai 官方帖（#22 Coding Tie 4th） | X 搜索 |

### D. 社区情绪（逐平台）

- **Reddit（pos · 但两派）**：r/singularity「Haiku 4.5 beats Sonnet 4 on SWE Bench」195 赞/40 评；r/ClaudeCode「Haiku 4.5 hits 73.3% SWE-bench」61 赞/41 评、r/ClaudeAI 同题 68 赞/22 评；「Introducing」帖 1,098 赞顶评实测 20 分钟「It writes really well, it doesn't feel like a stupid model…Feels like a fast sonnet 4」；「What are your thoughts on Haiku 4.5?」27 赞/37 评（2026-01，发布 3 个月后）多数人已默认日常用 Haiku。「Cost Breakdown」帖（2026-05）质疑输入 token 计费偏低——负面向。
- **HackerNews（pos · 务实）**：730 pts 发布帖，高赞质疑「$1/M input and $5/M output is good compared to Sonnet 4.5 but nowadays…you can get comparable models priced for much lower」（开源竞品冲击）；Simon Willison 本人在楼里放了 pelican SVG 演示；「What is the use case for these tiny models?」疑问帖；长期质疑「Haiku is not competitive, Deepseek v4 flash outperforms my uses」（2026-07）。
- **知乎（pos）**：唯一高权重问题是新智元执笔的「Anthropic 发布小模型 Claude Haiku 4.5，哪些信息值得关注？」，核心叙事「高智能不再昂贵，速度与效率才是下一个王座」「AI 经济学的新方向」。
- **Linux.do（pos）**：前沿快讯帖「Haiku 4.5 在 agentic coding 上超过 gpt-5」1.6k views/47 likes；强调「更快的响应带来更流畅的体验，Claude Code 可以让多个任务并行执行」；顺带吐槽「昨天看到封号的数量就两只手数不过来」（封号风波噪音）。
- **V2EX（pos · 薄）**：发布帖 1 回复（pangee「用了下还不错」），楼主实测 claude code 用 `claude --model haiku` 切换「可以稍稍缓解下配额超出的焦虑」—— Haiku 在中文社区的典型用法就是 Pro 配额省流。
- **掘金（pos）**：302.AI 基准实验室专栏实测「Sonnet 4 平替？性能不输，价格砍半」，多模态 20 题维度展示，结论稳定但输出冗长。
- **X（pos · 后期转负）**：发布初期官方/第三方盛赞（Arena.ai #22 帖）；2026-08 转向「Anthropic is ignoring its small models」——@kimmonismus「Haiku 4.5 is almost 12 months old without an update. While OpenAI has found outstanding solutions for its small models like Luna, Anthropic is ignoring its small models」；@_justmba「now i see why claude doesnt release new haiku models」；@diegocabezas01 趣味实测「GPT 5.2 vs Opus 4.5 在井字棋 13 局 13 平；换 Haiku 4.5 终于赢了 1/3」。

### E. 名家锐评素材（署名原话）

- **Augment（官方客户）**：「Claude Haiku 4.5 hit a sweet spot we didn't think was possible: near-frontier coding quality with blazing speed and cost efficiency. In Augment's agentic coding evaluation, it achieves 90% of Sonnet 4.5's performance, matching much larger models.」
- **Warp（官方客户）**：「Claude Haiku 4.5 is a leap forward for agentic coding, particularly for sub-agent orchestration and computer use tasks. The responsiveness makes AI-assisted development in Warp feel instantaneous.」
- **Replit（官方客户）**：「just six months ago, this level of performance would have been state-of-the-art on our internal benchmarks. Now it runs up to 4-5 times faster than Sonnet 4.5.」
- **GitHub Copilot（官方客户）**：「comparable quality to Sonnet 4 but at faster speed…excellent choice for Copilot users who value speed.」
- **Gamma（官方客户）**：「outperformed our current models on instruction-following for slide text generation, achieving 65% accuracy versus 44% from our premium tier model.」
- **新智元（知乎优秀答主）**：「Haiku 4.5 不是 Claude 系列最强的模型，但它代表了 AI 经济学的新方向——高智能不再昂贵，速度与效率才是下一个王座。」
- **Linux.do 发布帖（safphere）**：「一句话概括：它更快、更便宜、也更聪明。…Claude Haiku 4.5，是那种用起来又快又省、但还能干大事的小模型。」
- **Reddit · r/ClaudeAI 顶评**：「Tested it for about 20 minutes: It writes really well, it doesn't feel like a stupid model…Feels like a fast sonnet 4.」
- **Medium（Barnacle Goose 评测）**：「Haiku 4.5 collapses the speed–quality trade-off for a wide slice of work…positioned to be the fast worker in a manager/worker setup where Sonnet 4.5 orchestrates.」
- **Medium（Should we use Claude Haiku 4.5?）**：「Just don't expect Haiku to be a drop-in replacement for Sonnet. It's a different tool for different jobs.」
- **HN 热评**：「Haiku 4.5 may be less expensive than the raw cost breakdown may appear initially, though the increase is significant. Branding is the true issue that Anthropic…」
- **LinkedIn（Ercin Dedeoglu 压测）**：「Speed: 3.4× faster than Sonnet 4.5. Cost: $5.10/day. Coding quality: 73.3% pass@1 on a 20-task SWE-bench slice」—— URL: https://www.linkedin.com/posts/ercindedeoglu_claude-haiku-45-speed-savings-over-engineering-activity-7384625764140429312-eYRK

### F. 争议与大事记

- **「More Code ≠ Better Code」HN 帖（2025-10-16，item 45603947）**：第三方评测「Claude Haiku 4.5 Wrote 62% More but Scored 16% Lower」——与官方叙事形成反差，但仅 3 pts 传播度低，官方未回应。
- **输入 token 计费质疑（2026-05，r/ClaudeAI「Cost Breakdown」帖）**：用户对比 Sonnet 4.6 与 Haiku 4.5 计费，质疑 Haiku 输入 token 数「suspiciously low」——指向缓存命中口径问题。
- **「小模型被忽视」争议（2026-08）**：@kimmonismus 公开批评 Haiku 4.5 近 12 个月无更新，「OpenAI 为 Luna 找到了方案，Anthropic 在无视自家小模型」，官方未回应。
- **价格上调 25%**（Caylent 对比）：Haiku 3.5 的 $0.80/$4 → Haiku 4.5 的 $1/$5，涨价但仍是「史上最强性价比」叙事核心。
- **封号风波噪音**（Linux.do 发布帖顺带）：发布当天「封号的数量两只手数不过来」，与 API 配额/风控有关，非模型本身争议。

### G. 与上一代（Haiku 3.5）对比

- 官方口径：「substantially more aligned than its predecessor, Claude Haiku 3.5」；「drop-in replacement for both Haiku 3.5 and Sonnet 4」
- Caylent 对比：价格 $0.80/$4 → $1/$5（+25%）；llm-stats.com 对比：3.5 Haiku 比 4.5 便宜约 1.3x/oken，但 4.5「significantly outperforms across most benchmarks」
- 新增能力：首款支持 extended thinking 的 Haiku（thinking.type: enabled）、computer use（Claude for Chrome 加速）、64K 最大输出（3.5 为 8K）、OSWorld 50.7% 反超 Sonnet 4
- 退步面：价格上调、thinking 关闭时能力折损（models.ts swe 63.4 为无思考口径，官方 73.3% 为 128K thinking 口径）、输出相对冗长

### H. Harness 实测

- **claude-code（本命）**：官方内置支持；V2EX 实测 `claude --model haiku` 切换缓解 Pro 配额焦虑；r/ClaudeAI「Haiku 4.5 is insane in Claude Code!」；官方主推多 Agent 编排「Sonnet 4.5 break down complex problem into multi-step plans, then orchestrate a team of multiple Haiku 4.5s to complete subtasks in parallel」；「Haiku 4.5 is surprisingly good at writing code (If there is a plan)」（r/ClaudeCode）「It's so fast in fact that I feel that it drains my usage just as fast as Sonnet, except it writes the output significantly faster」
- **cursor**：无官方专项评测；社区用法为经 OpenRouter 接入/作为子模型；第三方「GPT-5.4 Mini vs Claude Haiku 4.5: Which Is the Better Sub-agent?」（mindstudio.ai）对比子代理定位
- **openhands**：未找到专项实测（OpenHands Index 未收录 Haiku 4.5 条目），占位

---

## 二、核验与矛盾

1. **发布日期矛盾（关键）**：真实世界 Haiku 4.5 发布于 **2025-10-15**（官方页 + 所有媒体一致）；models.ts 基线写 **2026-06-20**。X 用户 2026-08-09 称「almost 12 months old」亦佐证真实发布为 2025 年中。详情文件遵循站点模型卡基线日期 2026-06-20，真实日期 2025-10-15 记录于此。
2. **SWE-bench 口径矛盾**：models.ts 基线 swe 63.4 ≠ 官方 73.3%。官方 73.3% 为「128K thinking budget + 50 trials」口径；63.4 接近无思考（thinking 关闭）得分。详情文件以官方 73.3% 为准，models.ts 63.4 视为无思考口径，两值均保留并注明。
3. **最大输出矛盾**：models.ts 基线 maxOutputTokens 32_000 ≠ 官方模型总览 64k。官方总览 2026-08 时点明确 64k；Caylent/掘金/官方发布页均未提 32K。详情文件以官方 64k 为准并记入补遗。
4. **ELO 口径并存**：models.ts 基线 arenaElo 1294；openlm.ai Chatbot Arena+ 口径 1378；Arena.ai 官方 2026-08 榜 #22（Coding Tie 4th）。三者口径不同，详情文件保留 Arena.ai 官方 #22 叙事 + 1378 口径，models.ts 1294 作为基线。
5. **Terminal-Bench 41.0% 仅新智元单源**：官方发布页 benchmark 图为图片未抓取到数值；41.0% 来自新智元转述，未在其他源复核，进 uncertainties。
6. **「Haiku 4.5 beats Sonnet 4 on SWE Bench」标题党**：官方口径 SWE 73.3% vs Sonnet 4 72.7%（+0.6pt），部分媒体（r/singularity 标题）渲染为「beats」，实际为微弱领先 + computer use/OSWorld 大幅领先。

---

## 三、未找到 / 存疑（进 uncertainties）

1. **ARC-AGI 系列**：未找到 Haiku 4.5 的 ARC-AGI 官方/第三方成绩（小模型定位，Anthropic 未发布该项）。
2. **Aider Polyglot**：官方发布页 benchmark 图为图片格式无法 OCR，Aider Polyglot 精确分数未抓到；仅第三方转述「接近 GPT-5」。
3. **effort 分档矩阵**：Haiku 4.5 仅支持 manual extended thinking（fixed budget_tokens，官方总览 extended thinking Yes / adaptive No），无 adaptive effort 四档——不渲染 effortBench 表格，在 uncertainties 说明。
4. **Chinese 专项评测**：中文创作/理解专项评测少，知乎问题仅 1 个高权重（新智元），无中文创作横评——notes 中文段照实写「反馈较少，无明显负面」。
5. **openhands 实测**：OpenHands Index 未收录 Haiku 4.5，无专项 harness 数据（placeholder）。
6. **Reddit 实时点赞复核**：Brave/Serper 快照（1,098/273/195 等）为 2026-08-10 时点值，Reddit 主站直接访问受限，未能逐帖点开复核，保留快照并在不确定中说明。
7. **架构细节**：官方未公开参数量/架构（「lightweight version of our most powerful AI」），MoE/稠密细节为推测。
