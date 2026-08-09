# Llama 4 调研补遗（2026-08-09）

> 任务：详情页深化 — 把 `app/src/data/details/llama-4.ts` 从批量初版加厚到 OPUS_5 水准。
> 调研基准日：2026-08-09。方法：AgentKey MCP（余额不足降级）→ HN Algolia / Reddit Arctic Shift / Wayback Machine / Exa Web Search，共 **16 次搜索/核验调用**。
> 所有热度数字以本文件「核验修正」节为准。

---

## 一、新发现事实（带 URL）

### 1. Llama 4 Reasoning 17B（重大遗漏事件，data.json 完全没有）
- 2025-04-29 发布推理版 `Llama-4-Reasoning-17B-128E-Instruct`（Maas API，非开源权重）。这是「Llama 4 不是推理模型」论断的重大例外，需修正详情页推理段。
- Reddit r/LocalLLaMA 发布帖「Llama 4 reasoning 17b model releasing today」**547↑/151c**（2025-04-29）。
  - https://www.reddit.com/r/LocalLLaMA/comments/1kaqhxy/
- Google Vertex AI 同日 GA：`llama-4-maverick-17b-128e-instruct-maas`（发布日 2025-04-29，GA 状态）。
  - https://developers.googleblog.com/llama-4-ga-maas-vertex-ai/
  - https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/llama/llama4-maverick

### 2. Llama 4 官方 API（LlamaCon 2025-04-29 发布，2026 年可用）
- LlamaCon 大会推出 Llama API（llama.developer.meta.com），OpenAI SDK 兼容，含 playground；Cerebras / Groq 高速推理合作。
  - https://ai.meta.com/blog/llamacon-llama-news/
- 官方定价（2026-03 抓取）：Scout 输入 $0.10/M tokens、Maverick 输入 $0.19/M tokens（3:1 blended 官方估算；单机部署 $0.30–0.49/Mtok）。**这推翻了 data.json「无统一价格表」的存疑**——官方 API 有明确定价。
  - https://developer.meta.com/ai/models/llama-4/（Maverick $0.19/Mtok 官方估算）
  - https://tokencost.app/blog/llama-4-scout-vs-maverick-api-pricing（第三方比价：DeepInfra Scout $0.08/$0.30、Maverick $0.15/$0.60；Groq Scout $0.11/$0.34 @594 tok/s）
  - https://comparedge.com/tools/llama/pricing（Groq Maverick $0.5/$0.77）
- **注意**：2026-03 时 Llama API 仍 waitlist（tokencost 报道），且 llama.developer.meta.com 现以 Muse Spark 为主，Llama 4 权重仍在 developer.meta.com 提供。存疑保留。

### 3. 本地部署实测补充（harness/部署段可用）
- **Maverick 400B 单卡 RTX 4090 实测 45+ tok/s**（r/LocalLLaMA，2025-04-23，198↑/92c）：Intel ES CPU（56C/112T，AMX）+ 单 RTX 4090 + 512GB DDR5，K-Transformers support-llama4 分支。
  - https://www.reddit.com/r/LocalLLaMA/comments/1k5qqst/
  - https://youtu.be/YZqUfGQzOtk（演示视频）
- Scout 官方宣称 Int4 单卡 H100 可跑 10M 上下文（官方 blog）；未量化 Scout 超 1.4M token 需 8× H100（codersera 复盘，data.json 已有）。
- LM Studio 用户实测 Scout 在 6800XT/7900XT（Vulkan/ROCm）约 10 tok/s（InfoQ 引 dionysio211）。

### 4. 争议补充（新增两起）
- **员工匿名爆料**：r/LocalLLaMA「Serious issues in Llama 4 training. I Have Submitted My Resignation to GenAI」**984↑/230c**（2025-04-07）——热度高于失望帖，是刷榜争议最重要的社区证据帖。一亩三分地原帖 @dliudliu 称领导层要求把基准测试集混入 post-training、辞职并要求技术报告不署名；InfoQ/IT之家/澎湃均报道。Licheng Yu（Meta GenAI 后训练成员）实名回应「为了刷点而 overfit 测试集我们从来没有做过」。
  - https://old.reddit.com/r/LocalLLaMA/comments/1jt8yug/serious_issues_in_llama_4_training_i_have/
  - https://www.infoq.cn/article/tIjeIpjtNBRZhxvSOc69
  - https://www.ithome.com/0/843/472.htm
- **Joelle Pineau 离职**：发布前几天（2025-04）Meta FAIR 研究主管 Joelle Pineau 宣布离职（量子位报道），非 GenAI 负责人、与 Llama 4 无直接关联，但被舆论归入「内忧」。

### 5. 独立复现/评测补充（Benchmark vs 实测）
- **Epoch AI 独立评测**（2025-04-08 前后）：GPQA Diamond Maverick 67% / Scout 52%（官方宣称 69.8% / 57.2%，基本吻合）；MATH Level 5 Maverick 73% / Scout 62%。结论：Maverick 与领先开源模型有竞争力。**这修正了 data.json「第三方复现均低于官方」的绝对化表述——Epoch 复现与官方基本一致。**
- **Artificial Analysis 复现**（2025-04-08）：接受「The best answer is A」格式后，MMLU Pro / GPQA Diamond 与官方接近；Scout ≈ Mistral Small 3.1 24B / Gemma 3 27B，Maverick ≈ GPT-4o、略落后 DeepSeek-V3（37A671B）但激活参数仅一半。
- **randomfoo2（vLLM 维护者）**：vLLM 验证推理精度后自测，结论与 Artificial Analysis 一致（Scout ≈ Mistral Small 3.1 / Gemma 3；Maverick ≈ GPT-4o）。
- **NVIDIA 反击**：2025-04-08 英伟达发布 Llama3.1 Nemotron Ultra 253B（基于 Llama-3.1-405B NAS 优化），自称超越 Llama 4 全系，HN/InfoQ 广泛报道（被称「暴击 Meta」）。
- **EQBench 长文写作榜垫底**（_sqrkl 维护者说明）：Llama 4 系列在长文章写作评测中直接垫底——写到后面大段内容重复、写作公式化（IT之家/量子位报道）。

### 6. 其他社区热度（新数字）
- HN「Llama 4 Is Banned in the EU: Open AI, Region-Locked」10pts/6c（2025-04，Substack dionwiggins）。
  - https://news.ycombinator.com/item?id=43678771
- HN「Llama 4 performs worse than Llama 3 at translation」5pts/3c（nuenki.app 数据：翻译能力退化）。
  - https://news.ycombinator.com/item?id=43600344
- HN「Llama 4 underperforms: a benchmark against coding-centric models」5pts/0c（rootly.com）。
  - https://news.ycombinator.com/item?id=43683030
- Reddit r/LocalLLaMA「Qwen 3 MoE making Llama 4 Maverick obsolete」408↑/76c（2025-04-28）。
  - https://www.reddit.com/r/LocalLLaMA/comments/1ka6b9p/
- Reddit r/LocalLLaMA「Llama 4 is actually goat」154↑/114c（2025-04-19）——少有的正面实测帖。
  - https://www.reddit.com/r/LocalLLaMA/comments/1k2uztr/

---

## 二、核验修正（以实测为准，同步改详情页 heat/platforms）

### HN Algolia 核验（2026-08-09 实时抓取）
| 帖子 | data.json 现值 | Algolia 实测 | 结论 |
|---|---|---|---|
| The Llama 4 herd（主帖） | 1235 分/658 评 | 1235 pts / 658 c | ✅ 一致 |
| Meta got caught gaming AI benchmarks（The Verge） | 347 分/161 评 | 347 pts / 161 c | ✅ 一致 |
| Llama 4 Now Live on Groq | 109 分 | 109 pts / 48 c | ✅ 一致 |
| Cerebras 2,500T/s on Maverick | 93 分/93 评 | 93 pts / 93 c | ✅ 一致 |
| Meta AI App built with Llama 4 | 98 分/109 评 | 98 pts / 109 c | ✅ 一致 |
| Ask HN: 10 months since Llama-4 | 55 分 | 55 pts / 12 c | ✅ 一致 |
| Llama 4 Smells Bad | 未量化 | 41 pts / 26 c | ➕ 新增 |
| LeCun fudged 承认（HN） | 未量化 | 30 pts / 2 c | ➕ 新增 |
| Yann LeCun confirms fudged（Slashdot HN） | — | 30 pts / 2 c | ➕ 新增 |

### Reddit Arctic Shift 核验（存档级数据，权威）
| 帖子 | data.json 现值 | Arctic Shift 实测 | 结论 |
|---|---|---|---|
| "I'm incredibly disappointed with Llama-4" | 536 赞/246 评 | **476↑/222c**（1jsl37d） | ⚠️ 修正为 476↑/222c |
| LeCun fudged 承认帖（r/LocalLLaMA） | 366 赞 | **358↑/89c**（1q25070） | ⚠️ 修正为 358↑/89c |
| Serious issues... Resignation（员工辞职帖） | 未收录 | **984↑/230c**（1jt8yug） | ➕ 新增，热度最高 |
| Users are not happy with Llama 4 models | 未收录 | 637↑/219c（1jspmq9） | ➕ 新增 |
| Llama 4 is here（发布帖） | 未收录 | 448↑/139c（1jsahy4） | ➕ 新增 |
| Release version added to LMArena #32 | 未收录 | 448↑/51c（1jwrmnt） | ➕ 新增 |
| Meta (Llama) failure? | 未收录 | 269↑/39c（1k7kutp） | ➕ 新增 |
| Notes on Llama 4: hits/misses/disasters | 未收录 | 129↑/42c（1jvw91v） | ➕ 新增 |

**汇总修正**：
- 失望帖 536→**476**、246 评→**222 评**（heat 第 3 项、platforms/Reddit、quotes/expertQuotes 出处同步改）。
- LeCun fudged 帖 366→**358** 赞（heat 第 4 项、timeline 同步改）。
- heat 可新增「员工辞职帖 984↑/230c」替代或并列（最热 Reddit 帖）。
- Llama 4 Reasoning 17B（2025-04-29）补进 timeline 与推理 notes。

---

## 三、未找到（进存疑 uncertainties）

1. **claude-code / cursor / openhands 直连 Llama 4 的系统级实测**：Claude Code 官方不支持（Anthropic 闭源链）；Cursor 无官方直连；OpenHands 支持本地端点但无公开 Llama 4 长任务成功率。社区通用做法是 Ollama（2026-01 起原生 Anthropic API 兼容）+ ANTHROPIC_BASE_URL 代理（ollama.com/blog/claude、runlocalai.co 等多篇教程），但**均以 Qwen/其他本地模型示范，无 Llama 4 专项实测数字**。harnessReviews 三处仍只能写「适配路径 + 通用代理教程」+ placeholder 标注。
2. **Llama 4 Reasoning 17B 的开源权重与详细分数**：只有 Maas API 版，无开源权重、无第三方 SWE-bench 复现，社区实测数字缺失。
3. **Llama API 定价的稳定性**：2026-03 时仍 waitlist；官方 API 定价文档 2026-08 已转向 Muse Spark，Llama 4 的 $0.10/$0.19 定价为 2026-03 抓取值，时点效力需标注。
4. **10M 上下文第三方正向验证**：除官方演示外，未找到第三方对 Scout 10M 上下文的正向大规模验证；负向证据充分（Fiction.liveBench 128K 15.6%、5M 后困惑度 +15-20%）。
5. **Behemoth 冻结的官方确认**：仍未找到 Meta 官方关于 Behemoth 冻结/取消的正式声明（codersera 复盘为二手来源）。
6. **多模态/视觉子榜第三方评测**：仍只有官方宣称（grounding 同类最佳、8 图输入），第三方数据缺口依旧。

---

## 四、Harness 检索记录（供详情页 harnessReviews 引用）

- Claude Code + 本地模型：Ollama v0.14 起原生 Anthropic Messages API（`ANTHROPIC_BASE_URL=http://localhost:11434` + `ANTHROPIC_AUTH_TOKEN=ollama`），官方博客 https://ollama.com/blog/claude（2026）；Mark Shust 教程（markshust.com/2026/05/19）；RunLocalAI 指南（runlocalai.co/guides/claude-code-with-local-models）。**均未以 Llama 4 实测，示范模型为 Qwen/gpt-oss。**
- OpenHands：支持 Ollama 端点接入本地模型（openhands.dev 文档）；SWE-bench 评测体系成熟（openhands-index-results），但**无 Llama 4 条目**——2026-01 OpenHands Index 评测 9 款模型均不含 Llama 4（https://www.openhands.dev/blog/introducing-the-openhands-index）。
- 直接结论：三条 harness 均无 Llama 4 实测数字 → 保持 placeholder + 适配路径说明，符合「搜不到不编造」纪律。
