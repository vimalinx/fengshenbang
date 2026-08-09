# Mistral Large 3 深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits / 99% 已用，单次 Serper 需 0.2 credits，判定「余额不足」立即降级）→ HN Algolia API（story/comment/item 检索）+ Exa web search + 官方/媒体站 curl
搜索次数：32 轮（HN Algolia 22 轮、Exa 4 轮、Reddit 直连/pullpush/jina/redlib 六路全部被 403/HTML-challenge 拦截、DuckDuckGo 2 轮、OpenRouter/AA API 直查 2 轮）
Reddit 侧说明：本网络环境下 reddit.com / old.reddit / search.json / pullpush / jina-r / redlib 全部被拦截或超时，Reddit 数字沿用 data.json 2026-08-01 快照并标注「(快照)」

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口——三条 placeholder 全部找到可替代证据，claude-code 一条消灭）

**关键背景：Mistral 的官方「Claude Code 平替」是 Mistral Vibe CLI + Devstral 2，而非 Large 3**

1. **Mistral Vibe CLI + Devstral 2（2025-12-09，HN 745 pts/45 顶评）**：官方博客确认 Devstral 2（123B dense、256K 上下文、SWE-bench Verified 72.2%）配 Mistral Vibe CLI（Apache 2.0、Python+Textual 构建、ACP 协议、Zed 扩展），定价 $0.40/$2.00 per Mtok（Devstral 2）、$0.10/$0.30（Devstral Small 2），发布期 API 免费。Devstral Small 2（24B、68.0%）Apache 2.0 可本地跑。**注意：Devstral 2 是 modified MIT 许可（月收入 >$20M 需商业授权），非 Apache 2.0**。
   - https://mistral.ai/news/devstral-2-vibe-cli/
   - https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512 （SWE-bench 对比表：Devstral 2 72.2%、DS v3.2 73.1%、GPT-5.1 Codex High 73.7%、Claude Sonnet 4.5 77.2%）
   - https://arstechnica.com/ai/2025/12/mistral-bets-big-on-vibe-coding-with-new-autonomous-software-engineering-agent/
   - https://the-decoder.com/mistrals-open-coding-model-devstral-2-claims-sevenfold-cost-advantage-over-claude-sonnet/（称比 Claude Sonnet 成本低至 7 倍、需 4×H100）

2. **Devstral 2 实测反馈（HN 46205437 帖内一手报告）**：
   - 「gave Devstral 2 a shot… 500 KB 私有项目… spent about half an hour, correctly identified what the program did」→ 代码库理解 OK；
   - 反例「completely failed doing rather basic edits, like it lost closing brackets or used wrong syntax and couldn't recover」；
   - 「writes bad React code and misses linting prompts half the time. But the Python coding was great!」→ 弱 React / 强 Python（SWE-bench 全 Python 之嫌）；
   - Clojure 测试「couldn't get its parentheses balanced. After 10 attempts」；
   - 「Finally, we can use a european model to replace claude code」→ 社区将其定位为 Claude Code 替代。
   - https://news.ycombinator.com/item?id=46205437

3. **claude-code——真实证据出现（一条 placeholder 消灭）**：HN 46205437 讨论中用户实测 Devstral 2 + Mistral Vibe CLI 作为 Claude Code 替代：简单 regex 修改「took a while over 5 minutes, claude failed on the same prompt (which surprised me), codex did a similar job but faster. So all in all not bad!」→ 结论：作为 CC 替代「not bad」，速度是短板。
   - https://news.ycombinator.com/item?id=46205437

4. **cursor——仍无官方接入，但生态证据出现**：无 Cursor 官方集成声明；社区经 OpenAI 兼容端点/OpenRouter 接入（OpenRouter 直查确认 mistral-large-3 在列，https://openrouter.ai/mistralai/mistral-large-3）。技术评测（AA）显示 Large 3 输出速度 ~40 tok/s、TTFB 1.29s、较同类「notably slow」→ 作 Cursor 后端速度是短板。

5. **openhands——架构血缘证据（最大亮点）**：**Devstral 初代是 Mistral 与 All Hands AI（OpenHands 背后的公司）的合作产物**（HN 46212790：「The original Devstral was a collaboration between All Hands AI (OpenHands) and Mistral」）；但用户实测「Devstral 初代训练时 OpenHands 化 crippled the usefulness」→ Devstral 2 改配自家 CLI（HN 46205437「training it for open hands crippled the usefulness」）。Large 3 本身在 OpenHands 无专门适配，蜂群流需 OpenAI 兼容端点自接。

6. **opencode + Large 3 实测（HN 47407672，2026-03-17）**：用户用 opencode + Devstral + **Mistral Large 3** 写第一个 Python 项目——「I know it's not as capable as other, more expensive models, but working with it this way is teaching me python」→ 教育/学习场景低成本实测，成本敏感型新手路径。
   - https://news.ycombinator.com/item?id=47407672

7. **Mistral AI Now Summit（2026-05-28，Carrousel du Louvre，HN 48325340 = 466 pts/200 评）**：无新前沿模型、无 benchmark 图，发布 Vibe（Le Chat 改名统一 agent 平台）、Airbus/BMW 工业 AI 栈、巴黎郊区 10MW 数据中心。HN 顶评「Mistral has fallen really far behind since 2025Q3」（该帖 466 pts）；pembrok（330 赞）结构性问题分析；**antirez（Redis 作者 Salvatore Sanfilippo）原话：「But they are accumulating too much technological delay… Basically any Chinese lab is doing much better」**→ 顶级大牛锐评，可入 expertQuotes。
   - https://news.ycombinator.com/item?id=48325340 ｜ 原笔记 https://hn.nuxt.dev/item/48325340

### B. 名家锐评加料（带署名身份）

8. **antirez（Redis 作者，HN 48325340）**：「I really want Europe to be part of the AI development… But they are accumulating too much technological delay… Basically any Chinese lab is doing much better. It's not Mistral that created… MiMo 2.5, Minimax 2.7…」→ 欧洲 AI 掉队论，硬核署名。

9. **TechNews 愛範兒（2025-12-09）**：「Mistral 正在緩慢死亡（slow death）」——X 用户对 Mistral 3 的三大缺点：更笨（不如 DeepSeek）、更贵（DeepSeek 三倍）、更慢（推理速度比 GPT-5 还慢）；Artificial Analysis 综合 AI 指数 Large 3 仅 38 分（vs Gemini 3 Pro 73、Claude Opus 4.5 70、GPT-5.1 70）——⚠️ 注意此 38 分与 data.json/AA 官网现值 16 分不一致，核验见下节，expertQuotes 引用时用 AA 官网现值 16。
   - https://technews.tw/2025/12/09/mistral-ai-vs-cn-deepseek/
   - 同源实测：工具调用「常会输出格式错误或无效的工具调用指令」、图像基准「表现平平」→ 可入 weaknesses/notes。

10. **腾讯新闻（2025-12-03）**：「Mistral 3 发布｜对标的，全是中国模型」——官方对比只对标 DeepSeek-V3.1 和 Kimi-K2（不再对标 GPT/Claude/Gemini），Base 对 DeepSeek 胜率 53%、对 Kimi 55%，多语言 57%/60%；「或许也可以理解为…中国的开源模型，或已是全球的标杆」；公司估值约 140 亿美元。
    - https://news.qq.com/rain/a/20251203A02YY100

11. **掘金（2025-12-03）**：「全线回归 Apache 2.0 协议，某种程度上是被 DeepSeek『逼』出来的战略调整」→ Apache 2.0 回归的动机解读。
    - https://juejin.cn/post/7579164768062685211

12. **IT之家 / iThome（2025-12-03）**：3000 块 H200 从零训练、LMArena OSS 非推理 #2 / 总榜 #6、Ministral 3 全系三变体（base/instruct/reasoning）带视觉、14B reasoning AIME'25 85%→ 规格佐证。
    - https://www.ithome.com/0/902/033.htm ｜ https://www.ithome.com.tw/news/172597

13. **ComputeLeap（2026-05-30）**：「Mistral is simultaneously the most ambitious AI company in Europe and the one most visibly losing the frontier race」；Mistral 估值 ~$14B vs Anthropic ~$965B（69x 差距）；SWE-bench Verified 上 DS V4 Pro 80.6%、Qwen 3.6-27B 77.2%、Mistral 不具竞争力；Mensch「Europe has roughly two years to establish independent compute」；Futurum Group 分析师：「Mistral's play isn't to win the race for AGI, but to become the European full-stack AI partner that delivers real return on investment now」→ 美国分析师锐评可入。
    - https://www.computeleap.com/blog/is-mistral-falling-behind-europe-frontier-gap-2026/

14. **TechCrunch（2026-07-04）**：Arthur Mensch 原话「Today, we do not yet own the best language models, but we've constantly reduced that gap. We have a very exciting model to come this summer — it will be open-weight」；Koyeb 收购、€4B 法国/瑞典数据中心计划。
    - https://techcrunch.com/2026/07/04/what-is-mistral-ai-everything-to-know-about-the-openai-competitor/

### C. 热度数字核验（HN Algolia 实测 2026-08-09）

| 数据点 | data.json/现文件 | 实测 | 结论 |
|---|---|---|---|
| HN 发布帖 46121889 | 826 pts / 236 cmt | **826 / 236** | ✅ 一致 |
| r/LocalLLaMA Unimpressed 135/67 | 135 / 67 | Reddit 全渠道被拦 | ⚠️ 沿用快照 |
| r/LocalLLaMA Blog post 553/170 | 553 / 170 | 同上 | ⚠️ 沿用快照 |
| r/LocalLLaMA HF 上线帖 209/60 | 209 / 60 | 同上 | ⚠️ 沿用快照 |
| r/MistralAI 写作长测帖 62/28 | 62 / 28 | 同上 | ⚠️ 沿用快照 |
| r/MistralAI What happened to Mistral 326/175 | 326 / 175 | 同上 | ⚠️ 沿用快照 |
| Devstral 2 + Vibe CLI（12-09） | — | **745 / 45+** | ➕ 新发现（harness 相关热帖） |
| DeepSeek-V3.2 发布帖 46108780（12-01） | — | **982 / 465** | ➕ 新发现（抢先一天，夺走风头） |
| Magistral 发布帖 44236997 | — | **941 / 424**（2025-06-10） | ➕ 新发现（reasoning 版本参考） |
| Mistral OCR 3 帖 46313390 | — | **694 / 130**（12-18） | ➕ 新发现 |
| Mistral AI Now Summit 48325340 | — | **466 / 200**（05-28） | ➕ 新发现（公司路线争议主战场） |
| Mistral Medium 3.5 发布 47949642 | — | **500 / 229**（04-29） | ➕ 新发现（Medium 3.5 定价 5× Large 3，Large 3 不再列 Featured Model） |

### D. 争议与大事记补全

15. **AI Now Summit 无新模型（2026-05-28）**：Mistral 发布会转向工业/主权 AI 叙事（Airbus/BMW/Emmi AI 物理仿真并购 €300M+），未发前沿模型；antirez 等公开批评技术延迟。

16. **Airbus 主权 AI 合作（2026-07-16，HN 48938071）**：空客与 Mistral 达成主权 AI 合作，「This trend is being seen across an increasing number of large European corporations」→ 企业侧利好事件。

17. **HF 权重 12-02 当晚链接一度损坏**：HN 发布帖热评发现官方 HF collection 链接 404（hnuser123456），随后修复（janpio）→ 发布运营小事故，可作 timeline 细节。

18. **BNP Paribas 比利时 on-prem KYC 实证（AI Now Summit 笔记，simonw 转述）**：「BNP Paribas runs Mistral models on-prem for KYC in Belgium, with sensitive data staying within the bank's walls. Abanca is using agent orchestration to handle sensitive customer information at a huge scale (2 million customers)」→ 企业采用新增 Abanca（200 万客户）案例，KYC 80%→10% 有比利时 on-prem 佐证。

19. **榜单质疑「just below Qwen3 30B」的另一种声音**：HN 发布帖另有「Mistral Large 3 is ranked 28, behind all the other major SOTA models. The delta between Mistral and the leader is only 1418 vs. 1491 though」→ Elo 与榜首差 73 分、整体排 28 位（LMArena 全榜），印证「排名不低但非第一梯队」。

20. **工具调用失败实证（TechNews 转述测试者）**：「難正確執行工具調用，常會輸出格式錯誤或無效的工具調用指令」→ 与 agentic 场景短板直接相关，入 weaknesses。

---

## 二、核验修正（以实测为准）

1. **AA Intelligence Index：data.json 16 分 ✅ 正确；TechNews 报 38 分为过时/不同口径版本**。AA 官网 2026-08-09 直查确认：Large 3 = 16 分（v4.1，9 项 eval），「below average among comparable models (median: 17)」；同供应商 Medium 3.5 = 30、Devstral 2 = 19、Small 4 = 20 → 现文件 16 分保持，expertQuotes 不再引用 38 分。
   - https://artificialanalysis.ai/models/mistral-large-3
2. **Devstral 2 许可修正**：现文件/调研库未涉及；Devstral 2 是 modified MIT（月收入 >$20M 需商业授权），**非** Apache 2.0；Devstral Small 2 才是 Apache 2.0 → 写作/notes 引用时区分清楚。
3. **发布前一日 DeepSeek-V3.2 抢先（12-01，982 pts）**：HN 用户 mrinterweb「Deepseek 3.2 stole all the thunder yesterday… Just unfortunate timing of release」→ 官方对标表只放 V3.1/Kimi-K2 而不放 V3.2 的动机解释（V3.2 已更强）。
4. **LMArena 全榜位次**：现文件只写「开源非推理 #2 / 开源总 #6」；实测全榜 rank 28、Elo 1418 vs 榜首 1491（差 73）→ heat/subBoards 可补充「全榜 #28」。
5. **HN 发布帖评论质量**：顶评 arnaudsm 给出 4 基准几何均值（MMMLU+GPQA-Diamond+SimpleQA+LiveCodeBench）：Gemini 3.0 Pro 84.8 / DeepSeek 3.2 83.6 / GPT-5.1 69.2 / Claude Opus 4.5 67.4 / Kimi-K2 42.0 / **Mistral Large 3 41.9** / DS-3.1 39.7 → benchmarkGap 用此表更立体（40 分档 vs 80 分档断层）。
6. **「benchmarks are for base model」质疑（HN tootyskooty）**：「the benchmarks for large are for the base model, not for the instruct model available in the API. Most likely reason is that the instruct model underperforms」→ 榜单数字适用性的存疑点，入 uncertainties。
7. **Medium 3.5 定价 5× Large 3（HN 48541014）**：Medium 3.5 价格是 Large 3 的 5 倍，且 Large 3 已不在官网「Featured Model」列表 → 反映 Mistral 产品重心转移（推理版/Medium 上位）。
8. **GPQA Diamond 数字口径**：The AI Rankings 披露 vendor（HF 卡）报 67.17、独立测试 ~44%，现文件取 43.9%（独立口径）→ 注明 vendor 报 67.17 分歧。

---

## 三、未找到（进存疑）

1. **cursor 官方接入与 CursorBench 分数**：Mistral Large 3 在 Cursor 生态无官方声明、无 CursorBench 独立跑分；「Cursor 后端」harnessReviews 保留占位说明（有生态接入证据、无量化实测）。
2. **OpenHands 上 Large 3 的专门量化实测**：OpenHands 与 Large 3 的直接测试报告 0 命中；只有 Devstral 初代（OpenHands 合作产物）的间接血缘与用户负面实测。
3. **X/Twitter 平台可靠数字**：X 官方账号活跃但社区自发讨论热度无可靠量化来源（沿用推断）。
4. **中文社区专项能力量化**：知乎/掘金讨论多为架构与开源价值，缺中文专项 benchmark 数字；expertQuotes 中文占比受限于素材。
5. **BNP Paribas KYC「80%→10%」原始出处**：具体数字来自峰会视频证言/二手转述，未找到官方书面文件；已用 AI Now Summit 笔记的比利时 on-prem 表述交叉佐证。
6. **Large 3 最大输出 token 上限**：官方未披露（保持 —）。
7. **HF 模型卡 GPQA 67.17 vs 独立 ~44% 的确切原因**：官方未回应口径差异。
