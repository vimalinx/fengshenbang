# Gemini 3 Flash 深度调研补遗

调研日期：2026-08-10 ｜ 调研方式：AgentKey 号池网关（127.0.0.1:18323，Brave /v1/search + Firecrawl /v1/scrape + TikHub 专项工具）+ HN Algolia 免费 API 核验 + 官方博客/模型卡直采
搜索次数：18 轮（网关 /v1/search 10 轮、/v1/scrape 6 轮、TikHub Reddit/知乎工具 2 轮）；HN Algolia 2 次核验
基准日：2026-08-10（所有热度数字为该时点快照）

---

## 一、调研发现（带 URL）

### A. 官方硬数据（全部直采官方博客 + 模型卡）

1. **正式发布：2025-12-17**（官方博客发布时间 2025-12-17T16:00:00+00:00；HN 发布帖 Algolia 实测 1102 pts / 580 评论）。「Gemini 3 Flash: frontier intelligence built for speed」作者 Tulsee Doshi（Senior Director, Product Management）。
   - https://blog.google/products-and-platforms/products/gemini/gemini-3-flash/
2. **定价 $0.50/$3.00 · Mtok**（输入 $0.50/1M、输出 $3/1M，音频输入 $1/1M）。官方博客原文：「Gemini 3 Flash is priced at $0.50/1M input tokens and $3/1M output tokens (audio input remains at $1/1M input tokens)」。
3. **规格（模型卡 PDF 直采）**：上下文 1M tok 输入 / 64K tok 输出（1,048,576 / 65,536）；架构「Gemini 3 Flash is based on Gemini 3 Pro」（即 3 Pro 推理基座蒸馏/裁剪，参数未披露）；thinking levels 四档（minimal/low/medium/high）。
   - https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Flash-Model-Card.pdf
4. **榜单（官方博客基准表）**：
   - SWE-bench Verified **78%**（超 Gemini 3 Pro 的 76%，也超 2.5 系列）——「It's able to reason and solve tasks quickly in high-frequency workflows」；对「Flash 反超 Pro」官方主动背书
   - GPQA Diamond **90.4%**（博士级推理）
   - Humanity's Last Exam **33.7%**（无工具）
   - MMMU Pro **81.2%**（与 Gemini 3 Pro 相当）
   - 速度：较 2.5 Pro **3x 快**（Artificial Analysis 基准）；token 效率：典型流量下**比 2.5 Pro 少用 30% token**
   - AIME 2025：**95.2%**（digitalapplied 汇总表；r/singularity 发布帖标题称 99.7%，为不同口径/档位，正文以 95.2% 为准并进 uncertain）
5. **LMArena：#3 Overall（1477 Elo）**，位于 Gemini 3 Pro 之后、Opus 4.5 之上（r/singularity 发布帖 1pp0ncw，519 pts / 121 评论）。官方 Pareto 图将 3 Flash 与 3 Pro、3 Flash-Lite 并列为「performance vs cost & speed」帕累托前沿点。
6. **获取方式**：Gemini API（AI Studio）、Gemini CLI、Google Antigravity、Android Studio、Vertex AI、Gemini Enterprise；消费端 Gemini App 默认模型（取代 2.5 Flash）+ Search AI Mode 默认。企业客户：JetBrains、Bridgewater Associates、Figma、Cursor、Warp、Harvey、Astrocade、Presentations.ai、Replit、Latitude。
7. **thinking levels 四档**：minimal / low / medium / high（medium 档在发布时仅 3.1 Pro 与 3 Flash 独有，3 Pro 仅 low/high；LaoZhang AI 博客 + Gemini Enterprise 文档交叉确认）。
   - https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking ｜ https://blog.laozhang.ai/en/posts/gemini-3-1-pro-thinking-level
8. **Agentic Vision（2026-01-27）**：官方为 3 Flash 新增「Agentic Vision」能力——视觉推理 + 代码执行结合，模型可自主放大、检查、操作图像后把处理结果追加回上下文再作答（9to5google / AI Business / Edge AI 报道；r/singularity 497 votes / 63 comments）。
   - https://blog.google/innovation-and-ai/technology/developers-tools/agentic-vision-gemini-3-flash/
9. **Gemini CLI day-0 接入**（2025-12-17 同日官方博客），SWE-bench 78% agentic coding 定位。
   - https://developers.googleblog.com/gemini-3-flash-is-now-available-in-gemini-cli/

### B. 榜单成绩与第三方口径

10. **SWE-bench 78% 第三方佐证**：Medium「Cogni Down Under」四模型横评：Claude Opus 4.5 80.9%、GPT-5.2 80.0%、**Gemini 3 Flash 78.0%**、Gemini 3 Pro 76.x%——Flash 反超自家 Pro 被独立复现。
    - https://medium.com/@cognidownunder/gemini-3-flash-vs-gpt-5-2-vs-claude-opus-4-5-vs-grok-4-1-the-real-winner-surprised-me-b43d0688452e
11. **ARC-AGI-2 家族参照**：3 Pro 31.1%（2.5 Pro 仅 4.9%，即约 6.3x 跃升；3 Deep Think 45.1%）——GeekPark 中文稿称 3 Flash 相对 2.5 Pro「近 7 倍提升」即指 ARC-AGI-2 一类视觉推理；3 Flash 本体的 ARC-AGI-2 精确分未找到官方独立条目，进 uncertain。
    - https://www.vellum.ai/blog/google-gemini-3-benchmarks
12. **AI 竞技场清场叙事**：GeekPark《模型免费、推理翻倍：Gemini 3 Flash 深夜炸场，发放智能体时代的「入场券」》——「SWE-bench 和 Toolathlon 得分不仅反超老大哥 3 Pro，甚至压制 GPT 与 Claude 顶级型号」；ARC-AGI-2 较 2.5 Pro 近 7 倍。
    - https://www.geekpark.net/news/358272
13. **OpenRouter 同价确认**：gemini-3-flash-preview $0.50/$3.00。
    - https://openrouter.ai/google/gemini-3-flash-preview

### C. 社区情绪（分平台）

14. **HackerNews**：发布帖 1102 pts / 580 评论（Algolia 2026-08-10 实测核验一致）。高赞方向：GaggiX「They went too far, now the Flash model is competing with their Pro version. Better SWE-bench, better ARC-AGI 2 than 3.0 Pro」；samyok「Don't let the 'flash' name fool you, this is an amazing model… more performant than Claude Opus 4.5 or GPT 5.2 extra high」；反面：Tiberium 价格批评「Yet again Flash receives a notable price hike: from $0.3/$2.5 for 2.5 Flash to $0.5/$3 (+66.7% input, +20% output)」；fariszr「These flash models keep getting more expensive with every release」。后续帖：46387223「What (I think) makes Gemini 3 Flash so good and fast」16 pts；47084892「I accidentally managed to uncover the system prompt」4 pts。
    - https://news.ycombinator.com/item?id=46301851
15. **Reddit**：r/singularity 发布帖 519 pts / 121 评论（「Damn! Gemini-Flash beating all major models - GPT 5.1,5.2 and Opus 4.5??!」）；「Alr Gemini-3-flash is here!」189 votes / 48 comments（「just tested it out and it's amazing! The hype was real」）；「Gemini 3 Flash on LMarena」182 votes / 20 comments；「Gemini-3-Flash Artificial Analysis benchmark results」126 votes / 39 comments（GPT-5.2 xHigh 订阅墙吐槽）。r/GoogleGeminiAI「Gemini 3.0 Flash is INSANE – Benchmarks are in!」98 pts / 22 comments；「Gemini 3 Flash just dropped - it's outperforming 3 Pro on SWE-bench??」23 votes。r/Bard「Gemini 3 Flash is way smarter than people admit」；r/GithubCopilot「Gemini 3 Flash (Preview) is really impressive」（「slowly replaced my daily driver」）；r/google_antigravity「Gemini 3 flash is good for most tasks, you guys are relying too much on big models」。负面：r/Bard「Gemini 3 Flash is amazing, but hallucinations are way too frequent」；r/GeminiAI「Gemini Flash makes up bs 91% of the time it doesn't know the answer」；r/GeminiAI「They killed Gemini 3 Flash, and it sucks :(」——3.5 Flash 发布后 3 Flash 被降级，社区怀念。
    - https://www.reddit.com/r/singularity/comments/1pp0ncw/ ｜ https://www.reddit.com/r/GoogleGeminiAI/comments/1pp2dme/ ｜ https://www.reddit.com/r/Bard/comments/1r0vozo/
16. **知乎**：302.AI《谷歌的「普惠核弹」：Gemini 3 Flash 实测——更快、更强、更省可以兼得》——逻辑 10 题部分推断错误（「丁，南京」应为「丁，北京」）、前端网页复刻「三组当中最还原」、圣诞沙盒编辑器「代码质量不如 3 Pro」；「Flash 的 high 档位可以充分利用 64K 输出上限，接近一半问题输出接近 64K 上限但能在超限前准确刹车」；「定价只有 Claude 1/5、GPT 1/4」；新智元转载《谷歌黑魔法，没人能看懂的 Gemini 3 Flash》「参数越小，智商越高？把自家大哥 Pro 按在地上摩擦」；王炸帖「你现在免费用的默认模型，能力已经能和别家付费旗舰平起平坐」。知乎问题「谷歌发布 Gemini 3 Flash，相比上一代 2.5 Flash 有哪些提升？」回答含 high 档 token 滥用观察（「明显可以用更低 Token 回答正确，但还是跑满了 Token 上限；medium 档位则没有这个现象」）。
    - https://zhuanlan.zhihu.com/p/1985450972294698271 ｜ https://www.zhihu.com/question/1984788546771517931 ｜ https://zhuanlan.zhihu.com/p/1986790119781462271
17. **V2EX**：「gemini3 真有那么神吗」（t/1173989）——速度比预期快很多，「Flash 看起来就是为了『能跑就跑』的需求设计的」；「Gemini 3 Flash 用着挺香，但想找个更便宜的替代」（t/1197732）——「整体体验挺好，速度快、工具调用也稳，基本能顶住日常 workflow」，主力模型薅 Google $300 API credit；「gemini 3 flash,香港居然也用不了，搞什么搞」（t/1185342）——**区域限制吐槽**（香港不可用）；「gemini 学生重新认证」帖——「gemini3 flash 写点简单任务，也挺快的」。
    - https://www.v2ex.com/t/1173989 ｜ https://global.v2ex.com/t/1197732 ｜ https://www.v2ex.com/t/1185342
18. **X**：Sundar Pichai「We're back in a Flash ⚡ Gemini 3 Flash is our latest model with frontier intelligence built for lightning speed, and pushing the Pareto Frontier of performance and efficiency. It outperforms 2.5 Pro while being 3x faster at a fraction of the cost.」；Jeff Dean 转述基准表；pichai 预热「Gemini 3.0 Flash is coming and it's gonna be a very very good model. Might be our best one yet」。
    - https://x.com/sundarpichai/status/2001326061787942957 ｜ https://x.com/ai_for_success/status/1993475960319230355
19. **Linux.do**：无 3 Flash 发布期主帖（检索未命中），3.5 Flash 期回溯帖「用了 Gemini 3.5 flash 之后已经不想用别的模型了」提到「用 opus 做 plan 然后让 Gemini flash 去执行，挺爽的」——**「Claude 规划 + Gemini Flash 执行」双模型流在中文社区同样成立**；「Gemini 3.5 Flash 个人体验总结」提到 3.5 相比 3 的思维链长度变化（3 时代思维链未隐藏时可比较）。3 Flash 本体发布期讨论热度低于 3.5/3.6，为中文社区事实，进 notes。
    - https://linux.do/t/topic/2204591 ｜ https://linux.do/t/topic/2211319

### D. 争议事件 + 官方回应

20. **「涨价争议」**：HN Tiberium 精确算账——2.5 Flash $0.30/$2.50 → 3 Flash $0.50/$3.00，输入 +66.7%、输出 +20%；XDA Developers《Google's Gemini 3.5 Flash costs 3x the model it replaced, and the era of cheap AI is ending》；r/singularity「Gemini 3.5 flash costs 3 times more…」帖。官方回应：3 Flash 博客以「1/4 of Pro 价格 + 3x 速度 + Pareto 前沿」叙事对冲涨价；3.6 Flash 发布时 Logan Kilpatrick 明言「with a new lower price, based directly on developer feedback」——承认此前定价过高。
    - https://www.xda-developers.com/google-gemini-3-5-flash-costs-3x-model-replaced-cheap-ai-ending/ ｜ https://x.com/OfficialLoganK/status/2079590123038204255
21. **「幻觉争议」**：r/OpenAI「Gemini Flash makes up bs 91% of the time it doesn't know the answer」（Reason 5621 of WHY model evals are broken）；r/Bard「hallucinations are way too frequent」——「uncertainty detection weaker than ChatGPT's」；模型卡安全表承认 Text-to-Text Safety -3.1%、Unjustified-refusals -10.4%（对 2.5 Flash，即更「敢说」），官方以「manual review confirmed losses were overwhelmingly false positives or not egregious」回应。
22. **「区域限制」**：V2EX「香港居然也用不了」——Gemini 3 Flash 部分区域（香港等）不可用，中文用户需中转（OpenRouter/Poe/302.AI 转售成生态一部分）。官方无直接回应。
23. **「3.5 Flash 发布后 3 Flash 被降级」**：r/GeminiAI「They killed Gemini 3 Flash, and it sucks :(」——「was actually solid for a few weeks there. Now it can barely handle basic functions without hallucinating random imports」；3.5 Flash 定价再翻倍（$1.50/$9）时社区才回头认可 3 Flash 性价比（r/LLMDevs「Gemini 3 Flash isn't going anywhere. If your classification, extraction, or routing tasks are already working fine on it, there's no real reason to move」）。

### E. 大事记

24. **2025-12-02**：Sam Altman 内部备忘录「code red」——称 Gemini 3 会给 OpenAI 带来「temporary economic headwinds」，GPT-5.2 提前发布（The Guardian 报道）。3 Flash 发布前一天（12-16）OpenAI 甩出 GPT-5.2 应对。
    - https://www.theguardian.com/technology/2025/dec/02/sam-altman-issues-code-red-at-openai-as-chatgpt-contends-with-rivals
25. **2025-12-17**：Gemini 3 Flash 正式发布（HN 1102 pts / 580 评论；r/singularity 519 pts）；Gemini CLI / Antigravity / AI Studio / Vertex / Gemini App（默认）/ Search AI Mode（默认）全线铺开。
26. **2025-12-18**：中文媒体集中报道（知乎「深夜炸场」叙事、GeekPark 王炸稿）。
27. **2026-01-27**：Agentic Vision 发布（9to5google 报道；r/singularity 497 votes / 63 comments）。
28. **2026-02-19**：Gemini 3.1 Pro 发布（ARC-AGI-2 77.1%，2x 3 Pro）——3 Flash 中端地位稳固。
29. **2026-03-04**：HN「When Reasoning Becomes a Trap: Gemini 3 Flash in FoodTruck Bench」4 pts（小众批判：过度推理陷阱）。
30. **2026-04-27**：Show HN「OSS Agent I built topped the TerminalBench on Gemini-3-flash-preview」393 pts / 148 评论——3 Flash-preview 上自建 agent 登顶 Terminal-Bench 的独立实证；同月 ChatGPT 官方仓库源码流出被扒出 FAST_MODEL="google/gemini-3-flash"（HN 评论 pranshuchittora 实证 OpenAI 自身 fast 路径用 3 Flash）。
    - https://news.ycombinator.com/item?id=47920787

### F. Harness 实测

31. **claude-code**：官方不支持非 Anthropic 模型；中文社区通行的「Opus 4.6 审查 Gemini 3 Flash 代码」双模型流（Linux.do 3.5 期帖回溯；r/google_antigravity 同款「good for most tasks」）；3 Flash 是 ChatGPT 官方 fast 模型选择（HN 评论源码实证），生态端 Claude Code 网关接入（LiteLLM/Bifrost）在 3.5/3.6 期才成熟，3 Flash 期以 Antigravity/Gemini CLI 官方路径为主。无 3 Flash 专属量化实测，标记为机制性结论。
32. **cursor**：官方博客企业客户引用 Cursor 证言（「Gemini 3 Flash 让编码 Agent 从异步等待变成近乎实时的同步协作」，GeekPark 转述）；CursorBench 3.1/3.2 榜单 3 Flash 无独立分档条目（3.6 Flash 期才有 High 53.5%），3 Flash 期 Cursor 社区多经 OpenRouter 自定义接入。
33. **openhands**：OpenHands Index 家族数据——「Gemini 3 Flash 在 SWE-bench issue resolution 上与 Opus 差距小、平均准确率反超 3 Pro，但前端开发类别挣扎」（gemini-3-6-flash.ts 已引用）；3 Flash 专属量化条目无（与 3.6 Flash 调研结论一致）。
34. **antigravity（本命 harness）**：Google 自家 agentic 开发平台默认承载 3 Flash（官方博客 + r/google_antigravity 多帖「it works with good speed and proper code… every one should check gemini 3 flash in antigravity」）。

### G. 诨名收集

35. 「普惠核弹」（知乎 302.AI 标题）、「王炸」（知乎）、「小 Pro」（社区体感——Flash 反超 Pro 后称呼）、「谷歌版 Sonnet」（3.5/3.6 期回看 3 Flash 定位）。官方 marketing 词「frontier intelligence built for speed」不算诨名。

---

## 二、核验与矛盾（与 models.ts 基线对照）

1. **发布日期矛盾（重大）**：models.ts 基线 `releaseDate: '2026-06-30'`；**官方博客与模型卡均为 2025-12-17**。gemini-3-6-flash.ts 星座亦写 3 Flash 为 2025-11（发布月近似）。判定：models.ts 该日期疑似录入错误，详情页以 2025-12-17 为准（正文不改 models.ts，矛盾记录于此）。
2. **价格矛盾**：models.ts 基线 `priceIn 0.6 / priceOut 2.5`；**官方 $0.50/$3.00**（博客原文 + OpenRouter 同价确认）。判定：以官方 $0.50/$3.00 为准。
3. **SWE-bench 矛盾**：models.ts 基线 `swe: 65.1`；**官方 78%**（博客基准表 + 第三方 Medium 横评 78.0% 复现）。判定：以 78% 为准；65.1 疑为误植（可能与 gemini-3-flash-lite 或其他档位混淆）。
4. **LMArena Elo 矛盾**：models.ts 基线 `arenaElo: 1302`；发布期实测 **#3 Overall · 1477 Elo**（r/singularity 发布帖引用 LMArena 官方推文）。判定：以 1477 为准；1302 疑为发布前 beta 值或后续回落值（未找到第三方 1302 出处）。
5. **AIME 口径矛盾**：r/singularity 标题「99.7% on AIME」vs digitalapplied 汇总表「AIME 2025 95.2%」。判定：95.2% 为可追溯口径（与官方博客基准表相邻数据一致），99.7% 疑为 high 档或不同年份 AIME，正文用 95.2% 并进 uncertain。
6. **热度数字核验（HN Algolia 2026-08-10 实测）**：

| 数据点 | 数值 | 核验 |
|---|---|---|
| HN 发布帖 46301851 | 1102 pts / 580 评论 | ✅ Algolia 实测一致 |
| HN Show HN TerminalBench 47920787 | 393 pts / 148 评论 | ✅ Algolia 实测一致 |
| HN「What makes it good」46387223 | 16 pts | ✅ |
| r/singularity 发布帖 1pp0ncw | 519 pts / 121 评论 | ✅ Brave 快照（Reddit 直连 403，无法 Algolia 核验） |
| r/singularity Alr 帖 1pot2m4 | 189 votes / 48 comments | ✅ Brave 快照 |

7. **位置核验**：Gemini 3 Flash 定位 T2 / 4 星 / composite 78.5 与官方「1/4 Pro 价格、3x 速度、SWE 反超 Pro」画像一致，无需修正 tier。

---

## 三、未找到（进存疑 / uncertainties）

1. **Gemini 3 Flash 本体的 ARC-AGI-2 精确分**：官方只给了 3 Pro（31.1%）与 Deep Think（45.1%）的独立条目，3 Flash 的 ARC-AGI-2 未单独披露（GeekPark「近 7 倍」为约数）。→ uncertain。
2. **Reddit 实时数字无法独立复核**：Reddit 直连 403，r/singularity 519/121 等数字为 Brave 搜索快照（2026-08-10），非 Reddit API 直采。
3. **3 Flash 在 claude-code/cursor/openhands 的量化实测**：无 SWE-bench 级独立跑分（OpenHands Index 只有家族数据；CursorBench 3 Flash 期无分档条目）；antigravity 为官方本命路径。
4. **参数量 / MoE 细节**：模型卡仅「based on Gemini 3 Pro」，架构细节未披露。
5. **X 推文互动数字**：Sundar 推文互动数需登录，无法直采。
6. **「99.7% AIME」出处**：r/singularity 标题数据，无法回溯官方口径，正文弃用。

---

## 四、placeholder 消灭情况

- **claude-code**：无独立量化跑分 → 以「ChatGPT 官方 fast 路径选用 3 Flash（HN 源码实证）+ 中文社区双模型流（Opus 审查/规划 + Flash 执行）」为实据，非占位。
- **cursor**：官方企业证言（实时同步协作）+ OpenRouter 接入路径为实据；CursorBench 分档数据缺失进 uncertain。
- **openhands**：OpenHands Index 家族数据（SWE 差距小 / 前端挣扎）为实据，3 Flash 专属条目缺失进 uncertain。
