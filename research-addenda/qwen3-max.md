# Qwen3-Max 详情页深化 · 调研补遗

- 调研基准日：2026-08-09
- 手段：AgentKey MCP（余额 0.1 credits，不足最便宜工具 0.2 credits，触发降级）→ HN Algolia 免费 API / Reddit JSON（反爬失败）/ Exa MCP 搜索 / 官方站与媒体站 curl
- 搜索次数：AgentKey find_tools + account 各 1 次（均因余额降级）+ 有效搜索 12 次（HN Algolia 3、Exa 6、Reddit 核验 2 失败、OpenRouter 1 失败、媒体抓取若干）
- 结论：本次调研产出大量新事实——claude-code harness 由占位升级为 Qwen3-Max-Thinking 本体实测；Artificial Analysis 独立数字大幅补全推理版画像；多位署名 KOL/媒体锐评入库；HN 热度反差（正式版发布帖极冷 vs Thinking 版 502 分）被证实。

---

## 一、新发现事实（带 URL）

### 1. Harness 实战评测（最大缺口，claude-code 已消灭 placeholder）

- **claude-code（有本体实测）**：
  - 腾讯新闻「阿里 Qwen3-Max-Thinking 更新，实测九大场景」（2026-01-27）明确实测：**「Qwen 系列 API 同时也兼容了 Anthropic API 协议，因此 Qwen3-Max-Thinking 可以与 Claude Code 搭配使用。直接在阿里云百炼平台上拿到 key，改下 CC 配置即可」**；作者把 Claude Code 模型换成 Qwen 后跑自有 Skills，「在 skill 调用的整体链路上，完成效果还不错」，但「前端审美有待加强，效果一般」。 https://news.qq.com/rain/a/20260127A06BTS00
  - Qwen 官方生态：DashScope 提供 Anthropic 兼容代理端点 `https://dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy`（Qwen3-Coder 时代即官方文档支持，Max 走同端点）。 https://qwenlm.github.io/blog/qwen3-coder/
  - data.json 已有：r/ClaudeAI「Qwen 3 + Claude-code-proxy = decent results」（1mey2rz，非 Max 专属，作补充佐证）。
- **cursor（仍无 Max 专属实测，间接路径）**：
  - AI Bytes《Qwen 3.7 Max Review》（2026-07-07，同系列后续版）：**「Cursor requires a bit more setup since custom model support is limited, but community configs exist on the Cursor forum」「you can route Qwen 3.7 Max through OpenRouter and configure it as a custom model in Cursor settings」「function calling is one of its stronger areas」**；Aider/Cline 经 OpenAI 兼容端点「smoothest fits」。 https://aibytes.blog/reviews/qwen-37-max-review-the-best-coding-value-of-2026
  - Dre Dyson《Qwen3 + Minimax-M1 接入 Cursor》（2025-08-22，Qwen3 非 Max）：OpenRouter 自定义模型接入 Cursor，实测 92% accuracy / 28s 响应。 https://dredyson.com/how-to-quickly-integrate-qwen3-and-minimax-m1-models-in-cursor-ide-5-minute-fix/
  - 仍无 Qwen3-Max 专属 CursorBench / 官方适配声明。
- **openhands（仍无直接实测，保留 placeholder）**：
  - 开源 harness 生态最近路径：OpenCode 官方支持 qwen3-max——QwenCloud 官方文档 OpenCode 集成页 + npm 包 `qwen-opencode-provider`（qwen3-max 262K ctx / 32K out）；Qwen Code（官方 CLI）GitHub commit 显示 qwen3-max 是其 agent({model:'qwen3-max'}) 的真实 LLM E2E 验证对象（"13/13 qwen3-max validation"）。 https://docs.qwencloud.com/developer-guides/clients-and-developer-tools/opencode · https://www.npmjs.com/package/qwen-opencode-provider · https://github.com/QwenLM/qwen-code
  - OpenHands 本体无 Qwen3-Max 专门实测；社区讨论集中于开源 Qwen3-Coder/3.6-35B。

### 2. 名家锐评（署名+身份）

- **Simon Willison**（知名开发者/KOL，2025-09-23 Qwen3-VL 帖）：「three new API-only closed-weight models: upgraded Qwen 3 Coder, Qwen3-LiveTranslate-Flash… and **Qwen3-Max, their new trillion parameter flagship model**, which they describe as their 'largest and most capable model to date'」。 https://simonwillison.net/2025/Sep/23/qwen3-vl/
- **Carl Franzen**（VentureBeat 记者，2025-09-05 预览版 Hands-On）：「not only does Qwen3-Max-Preview avoid common LLM pitfalls… but **it's blazing fast in its responses… Faster, yes, than ChatGPT in my initial tests**」。并披露 Qwen 团队研究员 **Binyuan Hui** 在 X 称「Qwen-Max has successfully scaled to 1T parameters」，被问节奏快时自嘲「a crazy man」；X 用户 @SwallieC69635 实测称非推理定位的 Max 在难任务上「appeared to shift into a reasoning-like mode」，解题 GPT-5 Thinking 与 Gemini 2.5 Pro 无工具答不出的问题。 https://venturebeat.com/technology/qwen3-max-arrives-in-preview-with-1-trillion-parameters-blazing-fast
- **Asif Razzaq**（MarkTechPost，2025-09-24）：「SWE-Bench Verified 69.6… places it above some non-thinking baselines (e.g., DeepSeek V3.1 non-thinking) and **slightly below Claude Opus 4 non-thinking in at least one roundup**」；「Treat day-one benchmark wins as directionally strong but continue local evals」。 https://www.marktechpost.com/2025/09/24/alibabas-qwen3-max-production-ready-thinking-mode-1t-parameters-and-day-one-coding-agentic-bench-signals/
- **林俊旸**（通义千问开源负责人，朋友圈，转引自量子位）：「确实是我们搞过的最有趣的模型，（虽然）配方上没有大改，但比之前的 235B 版本明显好了不少」。 https://www.qbitai.com/2025/09/329047.html
- **量子位（一水，2025-09-06）**：「拜拜Claude！阿里最强万亿模型编程秒了Opus4」——前端编程/扫雷/可交互网站实测「一次成功，无需反复沟通和抽卡」；并披露 Qwen3-Max-Thinking 隐藏完整思维链、改提供思维链总结，部分网友不接受。
- **智东西（李水青，2025-09-06）**：「几秒完成程序员半天工作」——力量/速度双种群模拟器连续追问实测，模糊提示词下「几秒钟之内准确理解语义及背后的逻辑」。
- **36氪（2026-07-03）**：「编程能力直接反超Claude！阿里大模型如何做到后来者居上？」；X 上「Scaling works（规模化扩展是有效的）」叙事；HuggingFace ML Growth Lead **Ahsen Khaliq** 的 AnyCoder 将 Qwen3-Max 设为默认模型，AK 实测 voxel 场景一次成型。 https://www.36kr.com/p/3454846835972227
- **腾讯新闻「一手实测Qwen-3 Max Thinking, 我觉得一般」（2025-11-03，Thinking 预览版实测）**：推理「确实还行」；鲁迅文风写作「文字功力还是稍显弱了些」；**「建议如果写代码的话，先别碰这个模型了」**；数学「哪个最小的整数，它的平方在15和30之间」答错（应为 -5）；X 网友回评「不要把它和 GPT-5 Pro 或即将到来的 Gemini 3 化为一谈」。 https://news.qq.com/rain/a/20251103A0231A00
- **IT之家（2026-01-26）**：Qwen3-Max-Thinking「19 项权威基准测试中性能可媲美 GPT-5.2-Thinking、Claude-Opus-4.5 和 Gemini 3 Pro」；披露其 TTS（测试时扩展）为「经验累积式、多轮迭代」策略，同 token 消耗下 GPQA 90.3→92.8、HLE 34.1→36.5、LiveCodeBench v6 88.0→91.4、IMO-AnswerBench 89.5→91.5、HLE(w/tools) 55.8→58.3。 https://www.ithome.com/0/916/638.htm
- **智东西（2026-01-27）**：Qwen3-Max-Thinking 自适应工具调用实测（搜索+代码解释器可结合）；「Qwen3-Max 现在已经隐藏了完整的思维链路径，转而提供思维链总结，有些网友对此表示不接受」；API 定价 2.5 元/M 输入、10 元/M 输出；林俊旸：国内算力是「很大的制约因素」。 https://m.zhidx.com/p/531158.html

### 3. 热度数字实测（HN Algolia，2026-08-09 快照）

- **HN「Qwen3-Max-Thinking」= 502 pts / 424 cmt（2026-01-26，id=46766741）✓ 与 data.json 完全一致**。
- **反差事实（data.json 未记录）**：HN 上 Qwen3-Max 正式版发布帖极冷——「Qwen3-Max: 1T parameter model」仅 **5 pts / 1 cmt**（2025-09-24，id=45359073）；Preview 帖「Qwen3-Max-Preview (Instruct)」仅 **11 pts / 1 cmt**（2025-09-05，id=45139937）。即初代 Max 在 HN 几乎无人讨论，Thinking 版才是 HN 热度主峰。
- 同系列后续版本热度（补 timeline 语境）：Qwen3.8-Max 1120 pts/613 cmt（2026-08-03）、Qwen3.7-Max 721/290（2026-05-20）、Qwen3.6-Max-Preview 705/377（2026-04-20）、「Qwen3.8 Max agentic index」545/348（2026-08-06）。

### 4. Artificial Analysis 独立数字（Qwen3-Max 与 Thinking 版，AA 2026-01-29 文章 + 模型页）

- **Qwen3 Max（Instruct）**：Intelligence Index **24**（同类中位 19，AA 模型榜 #28）；**$1.20 / $6.00 per 1M**（AA 从 Alibaba API 实测，blended $1.68）；输出速度 **64.2 tokens/s（低于同类平均）**。 https://artificialanalysis.ai/models/qwen3-max
- **Qwen3-Max-Thinking**：Intelligence Index **40**（Preview 32 升 8 分），与 MiniMax-M2.1 (40) 持平，落后 DeepSeek V3.2 (42)、GLM-4.7 (42)、Kimi K2.5 (47)；HLE 26%（较 Preview 翻倍，超 DeepSeek V3.2 22%、GLM-4.7 25%、MiniMax-M2.1 22%）；IFBench 54%→71%（领先 Kimi K2.5 70%、GLM-4.7 68%）；GDPval-AA ELO 958→1170（MiniMax-M2.1 1074 / GLM-4.7 1192 / DeepSeek V3.2 1186 / Kimi K2.5 1316）；生成 86M output tokens（79M reasoning，与 Kimi K2.5 89M 相当）；**AA-Omniscience -34（知识+幻觉评估落后 Kimi K2.5 -11、DeepSeek V3.2 -23、MiniMax-M2.1 -30）**；定价 $1.2/$6（≤32K）→ $2.4/$12（32–128K）→ $3/$15（128–256K）。 https://artificialanalysis.ai/articles/qwen3-max-thinking-everything-you-need-to-know
- **VentureBeat（2026-01-26）独立口径**：Qwen3-Max-Thinking HMMT Feb 25 = **98.0**（Gemini 3 Pro 97.5、DeepSeek V3.2 92.5）；HLE with search = **49.8**（赢 Gemini 3 Pro 45.8、GPT-5.2-Thinking 45.5）。 https://venturebeat.com/technology/qwen3-max-thinking-beats-gemini-3-pro-and-gpt-5-2-on-humanitys-last-exam

### 5. 争议与大事记补全

- **HN 502 帖内部讨论（2026-01-26）**：用户 dust42「**Max was always closed.**」；auspiv「Chinese models are somewhere around **7-9 months behind US models**」；frankc 中国模型蒸馏论高赞（「training the models on the outputs of the American frontier models… it pretty much means they are always going to lag」）；QianXuesen 国内价格战与补贴分析（「domestic AI price war in China」）。 https://news.ycombinator.com/item?id=46766741
- **IT之家（2025-09-24 正式版报道）新增训练细节**：PAI-FlashMoE 多级流水并行，MFU 相对 Qwen2.5-Max-Base **提升 30%**；ChunkFlow 长序列吞吐 **3 倍**；SanityCheck/EasyCheckpoint 等使硬件故障时间损失降至 Qwen2.5-Max 的**五分之一**；「预训练 loss 稳定平滑…没有任何 loss 尖刺」。 https://www.ithome.com/0/885/317.htm
- **36氪（2026-07-03）**：开源与闭源双轨战略分析——「开源模型引流、云服务变现」「以开源换生态的商业模式，其盈利能力的持续性仍需市场检验」。

### 6. 其他

- 上下文规格交叉核验：VentureBeat（9-05）称 262,144 context / 32,768 max output；Fello AI 称官方文档 258k input / 65k output cap（VentureBeat 32k 疑为 UI 限制）；CIOL 称「1M-token context window」——**256K 服务级 / 训练 1M 的多口径差异再次确认**。 https://felloai.com/qwen-3-max-ai-all-you-need-to-know-about-alibabas-1-trillion-parameter-llm/ · https://www.ciol.com/generative-ai/alibaba-introduces-qwen-3-max-targets-code-and-reasoning-tasks-10498824
- LMArena 排名语境：CIOL 称文本榜第三「behind Google's Gemini 2.5 Pro and Anthropic's Claude Opus 4.1, but ahead of OpenAI's standard GPT-5」；Fello AI 称预览版盲测整体 #6/239（text arena 语境，早于正式版）。

---

## 二、核验修正（以实测为准）

| 项目 | data.json 原值 | 实测 | 处置 |
|---|---|---|---|
| HN「Qwen3-Max-Thinking」 | 502 pts / 424 cmt | **502 / 424 ✓ 一致** | 维持 |
| HN 正式版发布帖 | 未记录 | **5 pts / 1 cmt**（极冷） | 进 heat 说明反差 + timeline |
| HN Preview 帖 | 未记录 | 11 pts / 1 cmt | 同系列热度对比语境 |
| 国际版定价 | $0.78 / $3.90 · Mtok | 宣传口径 $0.78/$3.90（TokenMix 等）；**AA 独立实测 $1.20 / $6.00（blended $1.68）** | costNote/benchGroups 补 AA 口径并进 uncertainties |
| Thinking 版定价 | ¥24/M | **¥2.5/M 输入、¥10/M 输出（智东西 1-27）**；AA：$1.2/$6（≤32K）→$2.4/$12→$3/$15 | 修正为国内 2.5/10 元 + AA 阶梯价 |
| Thinking 版 HMMT | 100% 满分（官方口径） | 官方 AIME25/HMMT 100%；**VentureBeat 独立引 HMMT Feb 25 = 98.0** | 标注「100% 为官方口径，独立评估 98.0」 |
| AA Intelligence Index | 未记录 | Instruct 24（#28）、Thinking 40（Preview 32→40） | 新增进 subBoards/benchGroups/benchmarkGap |
| AA-Omniscience | 未记录 | Thinking -34（落后 Kimi K2.5 -11 等） | 幻觉未根除的独立佐证，进 notes/benchmarkGap |
| GDPval-AA | 未记录 | Thinking ELO 1170（Preview 958），仍落后 GLM-4.7 1192/DeepSeek V3.2 1186/Kimi K2.5 1316 | 新增（agent 能力非全面领先的量化佐证） |
| Thinking 输出速度 | 未记录 | 64.2 tokens/s（低于同类平均） | 体感「慢」的独立依据 |
| Reddit 热帖数字 | 529/89、564/345、274/61、172/73 | 反爬无法核验 | 维持 data.json 口径并标注快照日期 |
| Qwen3-Max-Thinking 预览版 HN | 3 pts（11-03 帖） | **3 pts / 0 cmt ✓ 一致** | 维持 |

---

## 三、未找到（进存疑 / 保留 placeholder）

1. **OpenHands × Qwen3-Max 专门实测**：HN/Reddit/Exa 均无；harnessReviews.openhands 保留 placeholder，注明开源 harness 最近实测路径是 OpenCode（官方支持 qwen3-max）与 Qwen Code（13/13 E2E）。
2. **Cursor × Qwen3-Max 专属实测 / CursorBench 数字**：只有同系列（3.7 Max）间接路径 + Qwen3（非 Max）接入实测（92%/28s）；不编造 Max 专属数字。
3. **Reddit 实时热帖数字**：Reddit JSON（www/old/api.reddit.com）与 pullpush 全部反爬/限流（403、HTML 重定向、rate limit），情绪与热度沿用 data.json 一轮调研记录。
4. **激活参数量**：官方未披露，总参 1T+ 已确认；AA 等亦无。
5. **定价双口径差异原因**：宣传 $0.78/$3.90 vs AA 实测 $1.20/$6.00，差异可能来自时点/阶梯/区域，未定论。
6. **WebDev 子榜单精确数据**：无独立披露。
7. **知乎新帖**：知乎搜索被 CAPTCHA 拦截，中文社区维持 data.json 一轮调研成果（知乎深度评测 9% 中位提升等）。

---

## 四、对详情文件的影响清单

- **harnessReviews**：claude-code 由占位升级为实测（腾讯新闻 2026-01-27 Thinking 版 + Claude Code 实测，skill 链路可用、前端审美一般 + 官方 Anthropic 兼容端点 + r/ClaudeAI proxy 佐证）；cursor 保持无 Max 专属实测，补同系列 OpenRouter 自定义接入路径；openhands 保留 placeholder（注明 OpenCode/Qwen Code 官方路径）。
- **heat**：新增「HN 正式版发布帖 5 pts（极冷）」与「HN Thinking 帖 502/424 ✓」；补齐发布反差叙事。
- **expertQuotes**：新增 Simon Willison、Carl Franzen（VentureBeat）、Asif Razzaq（MarkTechPost）、林俊旸、量子位、智东西、腾讯新闻「我觉得一般」楼主、AA（Intelligence Index 40 + AA-Omniscience -34）、VentureBeat HMMT 98.0 等；保留原有 Reddit/知乎/CSDN/雷科技。
- **benchmarkGap / consensusNote**：补 AA 独立画像（Index 24/40、GDPval 1170 落后、AA-Omniscience -34、64.2 t/s）——「榜单强、独立评估中游、体感两极」三层落差叙事。
- **platforms**：HN 改「正式版发布帖仅 5 分极冷、Thinking 版 502 分才引爆讨论」；补中文媒体实测细节。
- **uncertainties**：补定价双口径、HMMT 100% vs 98.0、Reddit 快照不可核验等。
- **sources**：新增 Simon Willison、VentureBeat ×2、MarkTechPost、腾讯新闻 ×2、智东西 ×2、量子位、36氪、IT之家 ×2、Artificial Analysis ×2、AA Thinking 文章（挑最权威 6-10 条）。
