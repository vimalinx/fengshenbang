# DeepSeek V3.2（初版加厚）深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，不足以支付 Serper 0.2/次，立即降级免费通道）+ HN Algolia API + Reddit JSON（403 全拦，改用 old.reddit HTML 抓取）+ Exa WebSearch（前 3 次命中、第 4 次触发免费额度限流后恢复）+ 官方 DeepSeek API Docs 直连 + OpenRouter 页直连 + Cursor 官方论坛直连 + DuckDuckGo HTML（被拦）
搜索次数：17+ 次（HN Algolia 6 轮核验、old.reddit 4 帖直接抓取、Exa 4 次、官方文档 3 轮、OpenRouter 1 轮、Cursor 论坛 1 轮、DDG 2 次被拦）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，3 个 placeholder 全部消灭）

**claude-code（占位 → 官方集成指南 + 一手实测 + 已知坑）：**

1. **DeepSeek 官方提供 Anthropic 兼容端点并出官方 Claude Code 集成指南**：`ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`，模型名自动映射（claude-opus 系→旗舰、claude-haiku/sonnet 系→快模型）；官方称 API 原生支持 Claude Code 的 Web Search 工具。
   - URL: https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/
2. **Krzysztof Karczewski 一手实测（2026-01-24，Medium「An Android Developer's Journey Through Chinese LLM-Based Coding Agents」）**：VS Code/Cline 直连 DeepSeek OpenAI 端点反复报错、自动重试烧 token（非 OpenAI 兼容 drop-in）；改走 Claude Code + Anthropic 兼容端点（deepseek-chat + deepseek-reasoner 双模型）后「quality of work approached that of premium Western models at a fraction of the cost」；主要短板是 128K（131,072 tok）上下文易触顶、模型比 Anthropic 更激进地膨胀上下文。
   - URL: https://medium.com/@kr.karczewski/an-android-developers-journey-through-chinese-llm-based-coding-agents-b7e82802cd0d
3. **社区 proxy（Randozart/deepseek-claude-proxy）**：同 Claude Code 体验约 50x 成本差（DeepSeek ~$0.30/M vs Anthropic ~$15/M），子代理路由（reasoner 规划 + chat 执行），12k 字符截断防上下文爆炸。
   - URL: https://github.com/Randozart/deepseek-claude-proxy
4. **已知坑：/compact 命令不受支持**（DeepSeek-V3.2-Exp issue #50，官方正式版同样存在），Claude Code 长会话自动压缩失效。
   - URL: https://github.com/deepseek-ai/DeepSeek-V3.2-Exp/issues/50
5. **坑：Speciale 端点为 OpenAI 格式、不可用于 Claude Code**（HF 讨论帖确认，`v3.2_speciale_expires_on_20251215` 404），Claude Code 只能接正式版。
   - URL: https://huggingface.co/deepseek-ai/DeepSeek-V3.2/discussions/5

**cursor（占位 → 官方论坛确认「未上架」+ 3 篇第三方实测）：**

6. **Cursor 官方论坛：V3.2 未原生上架**（2026-01-05 官方人员确认 Cursor 内只有 `deepseek-v3.1` 与 `deepseek-r1-0528`，「deepseek v3.2 isn't available in Cursor」）；Feature Request「Pls Add DeepSeek V3.2」（2025-10-01 发起）长期未决，社区吐槽 Cursor 上标注的「V3.1」实为 V3-0324 改名。可 BYOK 自定义模型（OpenRouter base URL）接入。
   - URL: https://forum.cursor.com/t/pls-add-deepseek-v3-2/135617/1 ｜ https://forum.cursor.com/t/only-three-models-left-at-the-beginning-of-this-new-year/147979/11
7. **myaiverdict 实测（2025-12-17）**：3 个全栈项目（React/TS + Express）7 天，把重构与样板活切给 V3.2 后 **API 支出降 50-70%**，标准 React/Node 任务代码质量「~90-95% 接近 Claude」；10M tokens/月场景省 ~$2,500/月。
   - URL: https://myaiverdict.com/deepseek-v3-cursor-vs-code-guide/
8. **TokenMix 实测（2026-04-24）**：20 条 vibe coding prompt（React 组件/修 bug/美化），**V3.2 成功 14/20（70%）**，与 GLM-5.1 并列，低于 Claude Opus 4.7（85%）与 Cursor Composer 2（75%），成本约为其 1/30-1/60；多文件上下文与创意 UI 偏弱。
   - URL: https://tokenmix.ai/blog/deepseek-vibe-coding-guide-2026
9. **sonusahani 实测（2026-03-14）**：Cursor 双屏 DeepSeek V3.2 vs GPT-5.1 Codex Max vs Opus 4.5 建空间站仪表盘——V3.2 约 40 分钟完成但中途卡住需手动「继续」、有 CSS 排版问题；建议把大 PRD 拆模块逐步构建。
   - URL: https://sonusahani.com/blogs/deepseek-v3-2-gpt-5-1-codex-max-opus-4-5
10. **ngeneai 实测（2026-01-21）**：SQL 调试类逻辑问题 DeepSeek V3.2 胜 Claude Sonnet 4.5（「thought harder」、给出数学上自洽的修复）；vibe 类任务 Sonnet 胜（更少幻觉 import）；推荐「Architect Workflow」：DeepSeek 探索/生成 + Sonnet 打磨。
    - URL: https://www.ngeneai.com/2026/01/deepseek-v32-vs-claude-sonnet-45.html

**openhands（占位 → 官方 Index 实数据，本轮最大收获）：**

11. **OpenHands Index（官方 openhands-index-results 仓库）收录 deepseek-v3.2-reasoner**：OpenHands v1.8.3 实测 **SWE-bench resolve rate 45.1%**（benchlm.ai 标注 45.7%），并含 swe-bench-multimodal 结果——真实公开 harness 数字。
    - URL: https://github.com/OpenHands/openhands-index-results/commit/c24bd078485acd95be1246aa0c2b1d491013384c ｜ https://benchlm.ai/benchmarks/openhandsindex
12. **swebench.com viewer 收录「DeepSeek V3.2 Reasoner (2025-12-01)」条目**，可在该页按 harness 查分。
    - URL: https://www.swebench.com/viewer.html
13. **关键落差数据点**：官方自带 harness SWE-bench Verified 73.1% vs OpenHands 公开 harness 45.1%——「榜单 vs 实测」落差有硬数字佐证。

### B. 名家锐评（新增 7 条署名 KOL）

14. **Simon Willison（2025-12-01，发布日当天）**：「Two new open weight (MIT licensed) models from DeepSeek today: DeepSeek-V3.2 and DeepSeek-V3.2-Speciale, both 690GB, 685B parameters.」——同时确认发布日为 12-01。
    - URL: https://simonwillison.net/2025/Dec/1/deepseek-v32/
15. **Zvi Mowshowitz（2025-12-05，「DeepSeek v3.2 Is Okay And Cheap But Slow」）**——最重量级负面锐评：「It is definitely not having a moment. In practice all signs are that it underperforms its benchmarks」「while it is cheap it is reported to be remarkably slow, and for most practical purposes it is not frontier」「the first noteworthy DeepSeek offering since r1… What it is not, regardless of their claims, is a frontier model」。楼内 Chase Brower：「vibecoding (V3.2 is still a bit behind in performance + really slow inference)」。
    - URL: https://thezvi.substack.com/p/deepseek-v32-is-okay-and-cheap-but
16. **Sebastian Raschka（2025-12-03 技术综述）**：「Given DeepSeek V3.2's really good performance (on GPT-5 and Gemini 3.0 Pro) level, and the fact that it's also available as an open-weight model, it's definitely worth a closer look.」架构细节：DSA + MLA、自验证沿用 DeepSeekMath-V2、RL 预算 >10% 预训练算力。
    - URL: https://magazine.sebastianraschka.com/p/technical-deepseek
17. **Baseten 技术深潜（2025-12-05）**：Speciale 推理常匹配/超过 Gemini-3.0-Pro 但 **token 消耗 1.5-2x**（Codeforces 2701 分、平均 ~77k 输出 tokens vs GPT-5/Gemini 的 22-29k）；V3.2 把「思考轨迹跨工具调用保留」（仅新用户消息才丢弃推理轨迹）解决 R1 时代 agent 重复推理烧 token 问题；BrowseComp 上下文管理策略可把 pass rate 从 ~53% 提到 ~68%；按美元计价约 20x+ 优势（$10 GPT5 输出 vs $0.45 V3.2）。
    - URL: https://www.baseten.co/blog/deepseek-v3-2/
18. **The Neuron 汇总多位署名研究者（2025-12-06）**：DeepSeek 研究员 **Zhibin Gou**「If Gemini-3 proved continual scaling pretraining, DeepSeek-V3.2-Speciale proves scaling RL with large context」；分析师 **Chubby**「They are the first, even ahead of OpenAI and Google, to release a Gold IMO 2025, CMO 2025, IOI 2025, and ICPC World Finals model!…The claim that open source is eight months behind closed source seems to be refuted」；**Vaibhav Srivastav**「The unique value with DeepSeek…is not just in the weights but the process that got them to the frontier」；**Casper Hansen**「2000 steps on V3.2 vs INTELLECT-3 with 600 steps」。
    - URL: https://www.theneuroai.ai/explainer-articles/everything-to-know-about-deepseek-v32-two-new-models-that-make-long-context-cheap/
19. **Abhijit More 技术深潜（2026-01-07）**：「DeepSeek-V3.2 is legitimately impressive work. The sparse attention mechanism is clever, the RL scaling is straightforward but effective, and the synthetic task generation is genuinely novel.」
    - URL: https://abhijitmore.github.io/posts/DeepSeek-V3.2-A-Technical-Deep-Dive/

### C. 争议与大事记（新增）

20. **2026-08 DeepSeek API 全面涨价公告**：官方横幅+邮件「plan to raise the overall pricing…with a significant increase expected」「不接受可取消并退款」；r/DeepSeek 炸锅——「We will be left without an affordable LLM option」722 分/357 评、「Deepseek's only major advantage was its API pricing」277 分/171 评、「The truth behind Deepseek's price increase」102 分/23 评（分析：流量超硬件容量；梁文锋 4 小时投资者会议透露 DeepSeek 仅获 16,000 张华为卡 vs 字节 10 万+）。peak/off-peak 政策被整体涨价取代。
    - URL: https://www.reddit.com/r/DeepSeek/search/?q=price+increase（帖子列表）
21. **Speciale 官方细节**：API-only、不支持工具调用、「designed exclusively for deep reasoning tasks」，临时端点 `v3.2_speciale_expires_on_20251215`，2025-12-15 15:59 UTC 到期（Reddit 帖 144 赞楼内确认 + 官方 news251201）。
    - URL: https://api-docs.deepseek.com/news/news251201/
22. **官方发布核心数据**：V3.2 首个「把思考融入工具调用」的模型，agent 训练合成 1,800+ 环境 & 85k+ 复杂指令；思考/非思考双模式均支持工具调用；「V3.2: your daily driver at GPT-5 level performance」「V3.2-Speciale: Rivals Gemini-3.0-Pro」。
    - URL: https://api-docs.deepseek.com/news/news251201/
23. **Reddit "soo good" 帖楼内**（r/DeepSeek，266 赞）：drwebb「It's ability to keep thinking across tool calls feels unmatched (I know they trained for this)」（28 分）；Solid-Ad7527「The instruction following in non-reasoning mode is rock solid. Reduced costs in areas of my product by like 10x」；Classic-Arrival6807 负面「V3.1 and 3.2 are.. overated…they're much more stupid」；楼主引用官方说明「Model won't know its version (or even what model it is), unless it's stated in the system message」（回应身份误认）。
    - URL: https://www.reddit.com/r/DeepSeek/comments/1phn9af/deepseek_v32_is_soo_good/
24. **Speciale Reddit 帖楼内一手实测**（r/LocalLLaMA，144 赞，楼主 power97992）：「speciale medium reasoning seems to be just as good as Opus 4.5 and about as good as gemini 3 high thinking and better than k2 thinking and gpt 5.1 medium and gpt 5.1 codex high for some tasks like single prompt coding」；ortegaalfredo「First Open Model that does that, not even GLM 4.6 could」（21 分）；TheRealGentlefox 质疑「On par with Gemini 3? No way」；LeTanLoc98「Models that can't use tools are basically useless」。
    - URL: https://www.reddit.com/r/LocalLLaMA/comments/1pbaf8x/deepseek_v32_speciale_it_has_good_benchmarks/

---

## 二、核验修正（以实测为准）

| 字段 | 原值（初版） | 实测值 | 依据 |
|---|---|---|---|
| Reddit "soo good" 帖热度 | 236 赞 | **266 分（96% 赞）35 评**，2025-12-08 发布 | old.reddit 直抓 |
| Speciale Reddit 帖 | 144 赞 52 评 | **144 分（93% 赞）52 评 ✓ 确认**，2025-12-01 | old.reddit 直抓 |
| HN V3.2 论文帖 | 982 分 465 评 | **982/465 ✓ 确认**（2025-12-01 提交） | HN Algolia items+search |
| HN V3.1 帖 | 778/263 ✓ | **778/263 ✓ 确认**（2025-08-21） | HN Algolia |
| HN V3 发布帖 | 125/40 ✓ | **125/40 ✓ 确认**（2024-12-26） | HN Algolia |
| HN V3.2-Exp 帖 | 未收录 | **309 分/50 评**（2025-09-29）→ 新增进 heat/可选 | HN Algolia |
| 发布日 | 2025-11-27 | **2025-12-01**（官方 news 页 slug=news251201、OpenRouter「Released Dec 1, 2025」、Simon Willison 2025-12-01 发文称「today」） | 官方文档/OpenRouter/Willison |
| 价格 | $0.22/$0.33 | **官方 $0.28/$0.42（缓存命中 $0.028）**；OpenRouter 现挂 26% off → $0.2072/$0.3108（初版混用了打折价） | OpenRouter 页直抓 |
| V3.2-Exp SWE-bench | 未收录 | **67.8%**（社区泄漏汇总表，非官方） | r/DeepSeek 泄漏帖 |
| MMLU-Pro / GPQA / AIME | 未收录 | 85.0 / 82.4 / 93.1（泄漏汇总，谨慎使用，仅 AIME 93.1 与官方一致） | r/DeepSeek 泄漏帖 |
| 上下文 | 128K-163,840 tok | OpenRouter 标 **164K** ✓ 一致 | OpenRouter |

## 三、未找到（进存疑）

1. **Cursor 内 V3.2 官方/第三方系统级基准**：Cursor 未原生上架 V3.2，不存在官方 CursorBench 类评测；社区实测（myaiverdict/TokenMix/sonusahani/ngeneai）均为私人博客、口径不一、非审计基准。
2. **X/知乎精确热度**：「2419 转推」「知乎数千赞级」为二手数据，X/知乎均无公开 JSON 可抓，未直接核验。
3. **中文 KOL 一手原话**：量子位/晓观点等中文媒体评语无公开一手原文 URL 核验，沿用 data.json 记录。
4. **V3.2-Exp 泄漏分数（67.8% SWE 等）**：来自社区泄漏汇总帖（r/DeepSeek「Deepseek V4 - All Leaks」），非官方发布，仅作参考、未写入正式 benchGroups。
5. **OpenHands 45.1%（v1.8.3）为特定版本结果**：OpenHands 后续版本跑分可能变化；swebench.com 条目存在但需交互查询才能取精确值。
6. **发布日 11-27 vs 12-01 的具体时间线**（网页/App 是否先于新闻页上线）未完全厘清，本页以官方 news251201=12-01 为准。
