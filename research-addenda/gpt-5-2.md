# GPT-5.2（0711 初版）深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，不足以支付 Serper 0.2，立即降级）+ HN Algolia API + Exa Web Search + PullPush 归档
搜索次数：13+ 次（HN Algolia 4 轮、Exa 6 轮、Reddit 3 次被 403 拦截、PullPush 1 次、HN item 直查 2 次）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，已消灭全部 3 个 placeholder）

**cursor（本轮最厚收获）——Cursor 官方自己的极限实验：**

1. **Cursor CEO Michael Truell 官方实验（2026-01-14 推文，HN 10 分）**：「We built a browser with GPT-5.2 in Cursor」——GPT-5.2 在 Cursor 中连续运行整整 7 天（168 小时不间断），从零构建了一个 Web 浏览器：HTML 解析、CSS 布局、文本渲染、自研 JavaScript 虚拟机（Rust），共 300 万+ 行代码、数千个文件，仅依赖 Servo 解析器/QuickJS 等成熟库做胶水集成。Truell 原话：「它基本能跑！简单网页能快速且大致正确地渲染」。Stability AI 前 CEO Emad Mostaque 猜测该实验消耗约 30 亿 tokens。
   - Cursor 团队官方博客结论：**GPT-5.2 是长时自主任务的最佳模型**——「能严格遵循指令、长时间保持焦点、不轻易漂移、精确实现细节」，适合做多 Agent 流水线的规划者（Planner）；**Claude Opus 4.5 倾向提前收工/走捷径**（简化任务逃避难度、频繁交还控制权）；GPT-5.1-codex 虽专为编码训练但规划与长期协调不如 GPT-5.2 可靠。百个并发 Agent 协作近一周几乎无代码冲突。
   - 架构：规划者→工作者→评判者管道式分工；早期扁平化（20 Agent 并行产出仅相当于 2-3 个）与「整合者」单点瓶颈角色均被淘汰。
   - URL: https://news.ycombinator.com/item?id=46624871 ｜ https://www.datalearner.com/blog/cursor-agent-scale-million-line-project ｜ https://kevinma2010.net/posts/scaling-agents-cursor-lessons/ ｜ https://hub.baai.ac.cn/view/51920（新智元）

2. **Chong-U — AI Oriented Dev（YouTube，2025-12-11 发布日）**：在 Cursor（Plan 模式）+ Codex CLI 中实测 GPT-5.2——同一 prompt 一次生成 5 个可运行小游戏（贪吃蛇/Pong/打砖块/太空侵略者/Tetris，含记分与音效）的街机模拟器，Cursor 侧一次到位（One-shot）；Codex CLI 侧视觉风格更佳但缺音效与高分系统。结论「一年前 one-shot 一个游戏都难，现在能 one-shot 整个游戏柜」。
   - URL: https://www.youtube.com/watch?v=j9hZbkqqvG8

3. **DataLearnerAI 对比（2025-12-12）**：GPT-5.2 vs Opus 4.5 vs Gemini 3 Pro 前端重构实测——「GPT-5.2 基本没有啥设计感」「纯代码场景 Opus 4.5 往往更强（更稳、一次到位、少走弯路）；同时在意成本和上下文长度时 GPT-5.2 也完全能打；超长上下文 Gemini 3 Pro 独一档」。
   - URL: https://www.datalearner.com/blog/gpt-5-2-vs-claude-opus-4-5-gemini-3-pro

**claude-code（无官方接入，但找到了真实替代性实测与对比）：**

4. **程序员阿江-Relakkes（B 站，2025-12-12）「别信跑分！GPT-5.2 vs Claude opus4.5 真实代码实测」**：同一 Python 遗留 ERP 项目接入 Prometheus 监控——GPT-5.2「Thread 乱入 Asyncio、中间件写得像脚本，代码工程化能力欠缺」；Claude Opus 4.5「Mixins 设计优雅、最佳实践拿捏到位，真正的工程级代码，本次实测 WINNER」；作者是只做真实落地 Coding Agent 的博主，逐行代码 Review。
   - URL: https://www.bilibili.com/video/BV1adm7BRE9V/

5. **ethanhuang13 brainOS 开发日志（2026-01-13，中文）**：Claude Code 重度用户（2025-06 入坑）切换到 Codex CLI + GPT-5.2-Codex 的实测对比——「GPT-5.2-Codex 模型推出以後，軟體開發能力已經不輸給 Opus」「Codex 很能正確理解我想要做的修改，即使沒有跑測試或編譯 app，也往往能夠一次搞定」；反衬「過去我很仰賴 Claude Code 自動跑 xcodebuild test 從測試與編譯錯誤自我修正，這招有效但很慢、非常消耗 token 與 context」；同时批评 Codex 交互低反馈「像安靜的同事，難以取得信任」。
   - URL: https://ethanhuang13.plus/my-brain-os-dev-journal-codex-5-2/

6. **Zvi Mowshowitz 直接建议（2025-12-15）**：「For hard coding, try Claude Opus 4.5 with Claude Code, GPT-5.2-Thinking with Codex, and also GPT-5.2-Pro straight up, and see what works best for you」——即 5.2 最适配的是 Codex CLI 而非 Claude Code；SWEbench.com 官方榜 Opus 4.5 74.4% > Gemini 3 Pro 74.2% > GPT-5.2 high 71.8%。
   - URL: https://thezvi.substack.com/p/gpt-52-is-frontier-only-for-the-frontier

**openhands（OpenHands 官方自己的 Index 基准，2026-01-29 上线）：**

7. **OpenHands Index（OpenHands 官方，Graham Neubig 首席科学家，2026-01-29）**：首个横跨 5 类软件工程任务（issue 解决/绿地开发/前端/测试/信息收集）的持续更新榜单——**GPT-5.2 平均分 58.84、GPT-5.2-Codex 58.28（v1.8.3，5 类全跑）**；Claude 4.5 Opus 总分第一（#1 占 3 类）；**GPT-5.2-Codex 在绿地开发（commit0）登顶**——「worked twice as long as Claude Opus, but achieved a significantly higher success rate」；后续修正 commit0 浅克隆漏洞后 GPT-5.2-Codex 62.5%→50.0%（-12.5pt），GPT-5.2（非 Codex）Commit0 新值 43.8%。
   - URL: https://www.openhands.dev/blog/introducing-the-openhands-index ｜ https://www.openhands.dev/blog/analyzing-and-improving-openhands-index ｜ https://github.com/OpenHands/openhands-index-results

8. **Devon Mack（Medium，2026-01-21）代码评审基准**：同一真实 PR（3 个真实 bug + 竞态条件）四模型盲评——**gpt-5.2-high 发现 7 个真实问题、3/3 bug 全中**（评审时间 2→6 分钟）；claude-4.5-opus-high-thinking 仅 2 个真实问题、1/3 bug；结论「thoroughness beats speed」「Claude 不够彻底，gpt-5.2-high 是清晰赢家」。
   - URL: https://medium.com/kairi-ai/i-benchmarked-gpt-vs-claude-for-code-reviews-the-results-were-not-what-i-expected-15d8fe260e01

9. **Augment Code（发布日 2025-12-11 博客，HN 12 分）**：「Why GPT-5.2 is our model of choice for Augment Code Review」——代码评审工具厂商主动选择 5.2 作为默认评审模型。
   - URL: https://www.augmentcode.com/blog/why-gpt-5-2-is-our-model-of-choice-for-augment-code-review ｜ https://news.ycombinator.com/item?id=46235148

### B. 名家锐评加料（带署名身份）

10. **Matt Shumer（HyperWrite/OthersideAI CEO，shumer.dev/gpt52review，2025-12-09）**：两周内测深度评测——「Code generation is a lot better than GPT-5.1. It's more capable, more autonomous, more careful, and willing to write a lot more code」；「Codex CLI 是我在命令行中用过的最接近 Pro 级编码能力的模型，一次性做对的频率远超其他工具」「真正的区别在于它收集上下文的方式：Claude Opus 4.5 倾向在完全理解问题前就写代码、做假设碰壁；GPT-5.2 先提问、读文件、探索代码库，先收集上下文再写码」；「Thinking 模式非常慢，我几乎不用 Instant；日常快速问题用 Opus 4.5，深度研究用 5.2 Pro」。**注意：调研库 data.json 原写作「Matt Shucker / HyperWriteAI CEO」系名字拼写错误，正确为 Matt Shumer。**
    - URL: https://shumer.dev/gpt52review

11. **Zvi Mowshowitz（The Zvi，Substack，2025-12-15 长评《GPT-5.2 Is Frontier Only For The Frontier》）**：「ChatGPT-5.2 is a frontier model for those who need a frontier model. It is not the step change implied by its headline benchmarks. It is rather slow」「GPT-5.2 is not 'fun' to interact with. People strongly dislike its personality... It is heavily constrained and censored」；LMArena Expert 榜第 5（落后 Opus 4.5/Sonnet 4.5/Gemini 3 Pro）、Text Arena（high）#5 低于 GPT-5.1、WebDev #2 仅次 Opus；并给出定价异闻「$1.75/$14（入/出）、Pro $21/$168」——与官方 API 价 $0.875/$7.00 不一致，以官方+pricepertoken 为准。
    - URL: https://thezvi.substack.com/p/gpt-52-is-frontier-only-for-the-frontier

12. **Sam Altman（OpenAI CEO，2025-12-11 X）**：「It is the smartest generally-available model in the world」「GPT-5.2 feels like the biggest upgrade we've had in a long time. Curious to hear what you think!」
    - URL: https://x.com/sama/status/1999184337460428962 ｜ https://x.com/sama/status/1999185220680012207

13. **Fidji Simo（OpenAI Chief Product Officer，2025-12-11 X）**：「GPT-5.2 is the best model out there for everyday professional work. On GDPval, the thinking model beats or ties human experts on 70.9% of common professional tasks like spreadsheets, presentations, and document creation」。
    - URL: https://x.com/fidjisimo/status/1999183073123880061（经 Zvi 长文转引）

14. **陶哲轩（Terence Tao，菲尔兹奖得主，UC Berkeley 教授，2026-01-19）**：验证 GPT-5.2 Pro 对 Erdős 问题 #281 的独立证明——「让我更惊讶的是它避免了错误，比如极限交换或量词顺序的失误，这正是这道题最容易踩的坑。前几代大语言模型几乎肯定会在这些微妙之处栽跟头」；评价为「迄今为止最明确的第一类结果（AI 主要贡献）」。随后 KoishiChan 发现该题可由 1966 Rogers 定理（源头 Davenport–Erdős 1936 论文）直接解出——陶哲轩承认「45 年未解实为 45 年无人关注」，并冷静提醒 AI 在 Erdős 问题上真实成功率仅约 1-2%，负面结果几乎不被披露（报告偏差）。
    - URL: https://www.qbitai.com/2026/01/370328.html ｜ https://news.qq.com/rain/a/20260120A03PVL00

15. **Teortaxes（X，经 Zvi 转引）**：「GPT 5.2 is frontier and may be ONLY worth it for work on the frontier.」
    - URL: https://x.com/teortaxesTex/status/1999704493211144574

16. **npc0x（X，经 Zvi 转引）**：「It's helped me debug my vmamba u-net model while other models were not very helpful. In the chat experience it's a bit like talking to a brick though.」
    - URL: https://x.com/npc0xx/status/1999906677319938187

17. **FrontierScience 新基准（OpenAI，2025-12-18 经 Zvi AI#147 报道）**：GPT-5.2 在 FrontierScience-Olympiad 77%、Research 25%，均为当时各模型最高。
    - URL: https://thezvi.substack.com/p/ai-147-flash-forward

### C. 争议与大事记补全（带具体日期和数字）

18. **Grokipedia 引用争议（2026-01-24/25）**：Guardian 测试发现 GPT-5.2 在 12+ 个问题中 9 次引用 xAI 的 AI 生成百科 Grokipedia（伊朗政治结构、Mostazafan 基金会、Basij 薪资、以及曾为 Holocaust 否认者 David Irving 诽谤案作证的历史学家 Richard Evans 传记等）；Guardian 此前已辟谣 Richard Evans 相关说法。OpenAI 回应「aims to draw from a broad range of publicly available sources and viewpoints」「应用 safety filters 降低高严重性危害链接风险」。Anthropic 的 Claude 也被发现引用 Grokipedia。覆盖：Engadget/TechCrunch/Gizmodo/PCMag，HN 49 分。
    - URL: https://www.theguardian.com/technology/2026/jan/24/latest-chatgpt-model-uses-elon-musks-grokipedia-as-source-tests-reveal ｜ https://www.engadget.com/ai/report-reveals-that-openais-gpt-52-model-cites-grokipedia-192532977.html ｜ https://news.ycombinator.com/item?id=46750118

19. **GPT-5.3-Codex 静默路由争议（2026-02）**：HN 77 分/30 评论——用户发现 GPT-5.3-Codex 被静默路由到 GPT-5.2（openai/codex issue #11189、#11561，HN id=46968891/46994910）；另有 Ask HN（5 分）质疑同样问题。
    - URL: https://news.ycombinator.com/item?id=46968891

20. **生命周期收尾（2026-05-27 → 06-12）**：OpenAI 宣布 2026-06-02 起在 Codex 停用 GPT-5.2/GPT-5.3-Codex（官方 X 146 转推）；GitHub Copilot changelog 2026-06-05 弃用 GPT-5.2 与 GPT-5.2-Codex（HN id=48430019）；r/ChatGPTPro「Gpt 5.2 is gone」（19 赞）。5.2 生命周期约 6 个月，被 5.5/5.6 快速取代。
    - URL: https://github.blog/changelog/2026-06-05-gpt-5-2-and-gpt-5-2-codex-deprecated/ ｜ https://news.ycombinator.com/item?id=48430019

21. **Erdős 问题三连（2026-01）**：除 #281 外——Neel Somani 数日前提交 #397 证明（经 Harmonic/Aristotle 形式化转 Lean，陶哲轩确认正确）；2026-01 初剑桥本科生 Kevin Barreto + 业余数学家 Liam Price 用 GPT-5.2 Pro 解决 #728，陶哲轩称「第一个在原问题精神下、以文献未记载方式被 AI 基本自主解决的 Erdős 问题」。
    - URL: https://news.qq.com/rain/a/20260120A03PVL00

---

## 二、核验修正（以实测为准）

| 项目 | 原文件值 | 实测值 | 结论 |
|---|---|---|---|
| HN 发布帖 | 1195 分/1083 评论 | HN Algolia id=46234788：1195 pts / 1083 cmt | ✅ 一致 |
| GPT-5.2-Codex HN | 589 分 | id=46316367：589 pts / **318 评论**（原文件未写评论数） | ✅ 补 318 |
| 理论物理演示 HN | 574 分/401 评论 | id=47006594：574 pts / 401 cmt | ✅ 一致 |
| Simon Willison 移植帖 | 278 分 | id=46295771：278 pts / **145 评论** | ✅ 补 145 |
| 提速 40% HN | 65 分/53 评论 | id=46879372：65 pts / 53 cmt | ✅ 一致 |
| LMArena #6→#13 | 12-17 公布 | HN id=46298597 标题「GPT-5.2-high LMArena scores released, OpenAI falls from #6 to #13」 | ✅ 一致 |
| Cursor 浏览器实验 | （未收录） | HN id=46624871，2026-01-14，10 pts | ✅ 新收录 |
| Augment Code 博客 | （未收录） | HN id=46235148，2025-12-11 发布日，12 pts | ✅ 新收录 |
| Reddit 最高赞 636 / 551 / 95 | 调研库 | Reddit JSON API 返回 403，无法二次核验 | ⚠️ 保留调研库值 |
| X 发布转推 1958 | 调研库 | X API 不可用，无法复核 | ⚠️ 保留调研库值 |
| **Matt Shucker**（HyperWriteAI CEO） | 调研库/原文件 | shumer.dev/gpt52review 署名 **Matt Shumer**（HyperWrite CEO） | 🔴 **名字拼写修正** |
| 官方定价 $0.875/$7.00 | 原文件 | OpenAI 平台+pricepertoken 一致；Zvi 报道 $1.75/$14 与此冲突 | ✅ 保留官方价，Zvi 值存疑 |
| SWE-bench Verified 80.0% | 原文件 | Zvi 引 SWEbench.com 官方榜：Opus 4.5 74.4% / Gemini 3 Pro 74.2% / **5.2 high 71.8%**（high 档不同口径） | ⚠️ 补充口径差异 |
| OpenAI 发布转推 1958 | 原文件 | 不可复核 | ⚠️ 保留 |

## 三、未找到（进存疑/placeholder 说明）

1. **Claude Code 官方接入 GPT-5.2 的专门实测**：未找到「Claude Code harness 内跑 GPT-5.2」的官方或系统性深度评测（2026-07 的 vocus.cc 文章《GPT 接進 Claude Code》用的是 GPT-5.6 家族，非 5.2）。claude-code 条目的 harnessReviews 用三类真实材料替代占位：程序员阿江 B 站真实代码对比（5.2 vs Opus 4.5）、ethanhuang13 从 Claude Code 迁移 Codex+5.2-Codex 的一手对比、Zvi 的 harness 选择建议。**不再保留 placeholder，但标注为「无官方接入、以对比实测替代」。**
2. **Reddit 热门帖点赞数二次核验**：Reddit JSON API 全线 403，636/551/95/19 等点赞数沿用调研库（2026-08-01 抓取），未二次确认。
3. **X 发布转推 1958 与「X 上充斥着恶评」**：无 API 可用，保留调研库值。
4. **GPT-5.2 各 effort 细档（none/low/medium/high）独立榜单成绩**：仍未找到，公开成绩均按 Instant/Thinking/Pro 部署档发布。
5. **幻觉率降低 38% 的独立复现**：仅官方披露，社区独立验证未检索到。
6. **知乎/澎湃/36氪页面直连 403**：浏览数、点赞数无法直接抓取；36氪转载了陶哲轩文章（04-28）可间接佐证。
