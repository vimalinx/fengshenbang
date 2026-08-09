# GLM-5 详情页深化 · 调研补遗

- 调研基准日：2026-08-09
- 手段：AgentKey MCP（余额 0.1 credits，低于最便宜调用 Serper 0.2，触发降级）→ HN Algolia API / Cursor evals 页 / Artificial Analysis / OpenHands 官方文档 / Simon Willison 博客 / 智源社区（新智元原文） 免费抓取
- 搜索次数：AgentKey find/describe/account 各 1 次 + 免费 API 数据抓取 30+ 次（HN Algolia 故事/评论/条目查询 20+ 次、CursorBench 页、AA 页、OpenHands docs、Willison 两篇、智源社区 52533、DDG 中文 2 次、Reddit 多路尝试均被反爬拦截）
- 结论：本次调研产生大量新事实——claude-code/cursor 两条 harness 拿到实测证据（claude-code 有智源社区「Claude Code 外壳实测」全文 + HN 用户多段实操；cursor 有 CursorBench 3.2 官方数字 + HN 用户实测），openhands 保留官方 Index 数字但无社区实测（说明进存疑）；发布帖热度等关键数字以实测核验

---

## 一、新发现事实（带 URL）

### 1. Harness 实战评测（最大缺口，claude-code / cursor 均已补上实测）

**claude-code（从「官方接入说明」升级为「有实测」）**：
- **智源社区（新智元 2026-02-13 全文，原发 mp.weixin.qq.com）**：`我们也使用 Claude Code 作为外壳，直接接入 GLM-5 的 API 进行了多维度的实测`——Next.js 全栈项目、MacOS/iOS 原生应用均实现需求分析→架构设计→代码编写→端到端调试全流程闭环；「无限知识宇宙」（React Flow 动态渲染 + Next.js API Route + 严格 JSON 格式）一次性完成整个项目文件结构；「Soul Mirror」心理分析应用（荣格专家 JSON + SVG 塔罗牌渲染）11 分钟搭建完毕；25 分钟一镜到底完成 X 平台监控系统（自主调用工具 Agent、遇错自己查文档修正）；开发者 1 天复刻「丐版 Cursor」（GLMLIFE：Monorepo Core/CLI/Desktop + Electron + React 18，技术选型堪比十年经验技术总监）。作者结论「某种程度上，GLM-5 或许是一个能改变行业格局的模型」「理解力时常让人怀疑是不是在用 Opus 4.5」。
  https://hub.baai.ac.cn/view/52533 （智源社区转载，原文标注来源 mp.weixin.qq.com）
- **HN 用户多段实操**：
  - 「I'm testing glm5 on Claude code and opencode just to stop consuming American... Soo good so far!」（2026-03-20）
  - 「I set up a new system this morning with OpenClaw and GLM-5, and I like GLM-5 as the backend for Claude Code. Excellent results.」（2026-04-07，GLM-5.1 发布帖下）
  - 「GLM-5.1 via Claude Code create a macOS driver for an unsupported USB gamepad with a proprietary protocol... After two sessions I now have a working controller on macOS.」（2026-06-07）
  - 配置法：`Getting CC to work with other models is quite straightforward -- setting a few env vars, and a thin proxy that rewrites the requests/responses`（2026-02-12）；`switch to z.ai/GLM-5.2 inside Claude Code by settings env variables in .claude/settings.json`（2026-07-21）
  - 负面实测：`GLM will burn through your weekly quota in a day if you're not precise with your scope`（2026-06-25，Synthetic.new 用户）；`GLM 5.1 in Claude Code... works far better in OpenCode`（2026-06-12）

**cursor（从「官方支持说明」升级为「有官方评测数字 + 用户实测」）**：
- **CursorBench 3.2 官方数字（cursor.com/evals 页面直抓）**：GLM 5.2 Max **55.0% / 平均 $1.76 / 35,946 tok / 58s**；GLM 5.2 High **51.5% / $1.19 / 21,829 tok / 49s**。对照：Sonnet 5 High 56.9% / $3.19、GPT-5.6 Luna High 56.8% / $0.16、Opus 4.8 Medium 56.1% / $2.81、GPT-5.5 Medium 53.8% / $1.51、Composer 2.5 56.1% / $0.44。
- HN 用户对 CursorBench 的解读：「in cursor benchmark glm5.2 is on par with gpt 5.5 medium and sonnet for the same task from results and cost perspective. The speed of generation for both gpt 5.5 medium and sonnet 5 will be dramatically faster. source: cursor.com/evals」（2026-07-07）
- 负面视角：「look how bad glm 5.2 is on cursors evals. gmhit garbage, but it gets glazed as God tier」（2026-07-09）

**openhands（保留官方数字，无社区实测，进存疑）**：
- OpenHands 官方文档（docs.all-hands.dev/modules/usage/llms）实测核验：GLM-5（`openrouter/z-ai/glm-5`）OpenHands Index **49.4**；GLM-5.1（`openrouter/z-ai/glm-5.1`）**58.2** 居开源前列；同表 MiniMax-M3 57.2、Kimi-K2.6 57.1、Kimi-K2.5 49.2。
- HN 检索 "openhands glm-5" 无专门实测帖（total 0）——保留官方数字 + 说明，不编造社区结论。

**ZCode / OpenCode 生态（写入 harness 语境）**：
- ZCode – Harness for GLM-5.2（HN 511 pts / 355 cmt，2026-07-01）：官方 Z.ai 自家 harness（基于 opencode 桌面代码剥离的 CLI）。
- OpenCode 用户实测：「I use GLM 5.2 in OpenCode, running in a Docker container... GLM 5.2 has never refused a task」；「It's comparable, but not the same. For some tasks, it's better. Opus refuses tasks for me pretty regularly. GLM 5.2 has never refused a task」（2026-07-03，ZCode 帖下）

### 2. 热度数字核验（HN Algolia 实测）

- **GLM-5 发布帖（官方博客《Targeting complex systems engineering...》，2026-02-11）实测 484 pts / 520 cmt** ✓ 与 data.json 一致
  https://news.ycombinator.com/item?id=46974853
- 「GLM-5: From Vibe Coding to Agentic Engineering」378 pts（评论并入发布帖）https://news.ycombinator.com/item?id=46977210
- **GLM-5.1 发布帖（Towards Long-Horizon Tasks）618 pts / 263 cmt** ✓ 一致 https://news.ycombinator.com/item?id=47677853
- **GLM-5.2 发布帖 772 pts / 504 cmt** ✓ 一致 https://news.ycombinator.com/item?id=48518684
- **AA 头条「GLM-5.2 is the new leading open weights model」916 pts / 444 cmt** ✓ 一致 https://news.ycombinator.com/item?id=48567759
- **新发现：Semgrep「GLM 5.2 beats Claude in our benchmarks」1113 pts / 516 cmt（2026-06-28）**——系列最大热度帖，Semgrep 官方博客（cyber 安全基准，标题「We have Mythos at home: GLM 5.2 beats Claude in our cyber benchmarks」）https://news.ycombinator.com/item?id=48709670 / https://semgrep.dev/blog/2026/we-have-mythos-at-home-glm-52-beats-claude-in-our-cyber-benchmarks/
- 其他 5.2 系列热度：GLM 5.2 and the coming AI margin collapse 694/469（06-06... 实际 07-06）；GLM-5.2 – How to Run Locally 617/305；GPT-5.5 hallucinates 3x more than MIT-licensed GLM-5.2 585/294；GLM 5.2 vs. Opus 519/343；ZCode 511/355；GLM-5.2 is a step change for open agents 367/223；GLM 5.2 is nearly as accurate as a human book keeper 225/122
- Pony Alpha 匿名首曝帖（OpenRouter stealth，2026-02-06）3 pts；「GLM 5 is pony-alpha」2 pts

### 3. 名家锐评（署名+身份）

- **Simon Willison（知名开发者 KOL，2026-06-17）**：「GLM-5.2 is probably the most powerful text-only open weights LLM」；实测 GLM-5.2 为 **753B 参数 / 1.51TB / 40 active（MoE）**、1M 上下文（5.1 为 200K）；AA Intelligence Index **51 分开源第一**（MiniMax-M3 44 / DeepSeek V4 Pro max 44 / Kimi K2.6 43）；**token 消耗大**：每个 II 任务 43k 输出 token（5.1 为 26k、MiniMax 24k、Kimi 35k、DSV4 Pro 37k）；Code Arena WebDev 榜 **#2 仅次于 Fable 5**；OpenRouter 9 家供应商 $1.40/$4.40 per M（对照 GPT-5.5 $5/$30、Opus 4.5-4.8 $5/$25）；SVG 测试「Excellent pelican, disappointing opossum」。https://simonwillison.net/2026/Jun/17/glm-52/
- **智源社区/新智元（2026-02-13 深度实测，编辑：好困/定慧）**：「全球第一个站上这条赛道（系统级工程能力），和硅谷巨头正面硬刚的开源模型」「国产模型的 Opus 时刻」「GLM-5 或许是一个能改变行业格局的模型」；并引 **Andrej Karpathy（OpenAI 联创）** 断言：「Vibe Coding 已经成为过去，新的游戏规则只有一个名字—— Agentic Engineering（智能体工程）」。https://hub.baai.ac.cn/view/52533
- **HN 高赞评论（2026-02-12）**：「According to artificial analysis ranking, GLM-5 is at #4 after Claude Opus 4.5, GPT-5.2-xhigh and Claude Opus 4.6」——AA 全球第四、开源第一。
- **HN 评论（2026-02-18）**：「Chinese labs shipped seven major models in the past three weeks: Moonshot AI → Kimi K2.5... z.ai → GLM-5 (lowest hallucination rate on Artificial Analysis, runs on Huawei chips)」——AA 幻觉率最低 + 华为昇腾训练。
- **HN 评论（2026-02-11，发布帖）**：「I honestly feel like people are brainwashed by anthropic propaganda when it comes to claude... kimi 2.5 (and I think glm 5 now) are perfectly fine for a claude replacement」。
- **HN 评论（2026-02-19）**：「I just cancelled my Pro subscription. Turns out that Ollama Cloud with GLM-5 and qwen-coder-next are very close in quality to Opus」。
- **HN 评论（2026-02-23）**：「thanks to these Chinese labs that I'm able to have something like glm-5 for 7$ quarterly or kimi k2.5 for 2$ month, while getting results close to [Opus]」——年度价对比。
- **Semgrep 官方博客（2026-06-28）**：「GLM 5.2 beats Claude in our cyber benchmarks」——IDOR 等漏洞挖掘场景 GLM-5.2 超 Claude（HN 评论补充「unlike Opus, I've never seen it refuse a command」）。

### 4. 争议与大事记补全

- **发布节奏软启动争议**：2026-02-07 深夜 Pony Alpha（OpenRouter stealth）悄然上线，用户访问量「increased tenfold」；GLM-5 先向 Max/Pro 订阅者开放、Lite 用户稍后（官方邮件「GLM-5 and New Z.ai Chat Coming!」明确 Availability Note）；发布当日无博客无权重，被指「soft launch」，社区靠硬编码 model id `GLM-5` 先行接入（HN 发布帖 520 条评论中的核心话题）。
- **AA 排名口径**：发布初期 AA 全球 #4（Opus 4.5 / GPT-5.2-xhigh / Opus 4.6 之后）开源第一；后 5.2 时代 AA 页面 GLM-5 本体 Intelligence 分已重排（8 月实测页面显示 GLM-5 本体 41 分 / #17）——初版「Intelligence Index 50」为发布时口径，需注意版本口径差异。
- **GLM-5.2 争议**（timeline 关联，非初版）：6/28 Semgrep「beats Claude」被指「It reads like an ad... these are 'just' IDORs」（HN 热评质疑）；7/06 GLM 5.2 and the coming AI margin collapse 讨论开源模型对闭源利润率的冲击；美国出口管制猜测（「GLM export controls incoming? I predict Commerce will force OpenRouter, HuggingFace to take some open models down」）。
- **Coding Plan 价格**：HN 实测语境——Lite 年付约 $7/季（新春促销 $3/月首年）；GLM-4.7 时代 $0.6/$2.2 per M；GLM-5.2 OpenRouter 众供应商 $1.40/$4.40；与 data.json 涨价线（2/12 自 30% 起、7/30 V3 改版 PRO≈430 / MAX≈862 元）一致。

### 5. 其他可入库细节

- **模型架构口径差异**（Willison）：GLM-5.2 记 753B / 1.51TB / 40 active；data.json 记 GLM-5 744-745B / 40-44B active——不同来源差异持续存在。
- **SWE-bench Pro 数字核验**（HN 用户转述官方柱状图，2026-06-25）：GLM-5.1 58.4、GLM-5.2 62.1、Opus 4.8 69.2、GPT-5.5 58.6、Gemini 3.1 Pro 54.2；Terminal-Bench 2.1：GLM-5.1 63.5、GLM-5.2 81.0、Opus 4.8 ——与 data.json 一致。
- **GLM-5.1 发布后体验修复**：「things have been working MUCH MUCH MUCH better for me for a couple days now. Thank you GLM for hearing our cries」（2026-04-14，官方修了初版问题）——初版体验问题在 5.1 得到修正的实证。

---

## 二、核验修正（以实测为准）

| 项目 | data.json 原值 | 实测 | 处置 |
|---|---|---|---|
| GLM-5 发布帖 HN 热度 | 484 pts / 520 cmt | **484 / 520** | ✓ 一致 |
| GLM-5.1 发布帖 HN | 618 / 263 | **618 / 263** | ✓ 一致 |
| GLM-5.2 发布帖 HN | 772 / 504 | **772 / 504** | ✓ 一致 |
| AA 头条帖 HN | 916 / 444 | **916 / 444** | ✓ 一致 |
| Semgrep「GLM 5.2 beats Claude」HN | 未记录 | **1113 / 516** | heat 新增为系列峰值 |
| GLM-5 发布初期 AA 排名 | 全球第四、开源第一（Intelligence 50） | 全球 **#4**（Opus 4.5 / GPT-5.2-xhigh / Opus 4.6 之后）✓；8 月 AA 页 GLM-5 本体 41 分 / #17（口径重排） | 保留「开源第一」，Intelligence 分标注版本口径 |
| OpenHands Index | GLM-5 49.4 / 5.1 58.2 | 官方文档逐一核验 **49.4 / 58.2** ✓ | ✓ 一致（补 MiniMax 57.2 / Kimi 57.1 参照） |
| CursorBench | 无 | GLM 5.2 Max **55.0% / $1.76**、High 51.5% / $1.19 | heat/版本对比新增 |
| SWE-bench Pro | 5.1 58.4 / 5.2 62.1 | HN 转述官方柱状图一致 | ✓ 一致 |
| 十维体感评分 | data.json 10 维 | — | 沿用（长程 90 / 编程 92 / 性价比 86） |
| 智源社区 25 分钟/32% | 「股价暴涨 32%」「25 分钟一镜到底」 | 原文核验 ✓（新智元 2026-02-13） | 补出处（智源社区 52533） |
| Karpathy「Agentic Engineering」 | 未单列 | 新智元引用确证 | expertQuotes 新增署名 |

---

## 三、未找到（进存疑/placeholder）

1. **OpenHands × GLM-5 社区实测**：HN/Reddit 均无专门实测帖（HN 检索 "openhands glm" 与 "openhands glm-5" 均 0 命中）；harnessReviews.openhands 保留官方 Index 数字 + 说明，注明「社区实测数据收集中」。
2. **Reddit 实时热帖数字**：www/old/api.reddit.com 全部反爬拦截（403 HTML），r.jina.ai 代理亦 403；pullpush 拒绝免费抓取。Reddit 情绪与高赞帖沿用 data.json 一轮调研成果（GOAT 帖、FoodTruck 帖、I just realised 帖）。
3. **知乎/V2EX/Linux.do 新数据**：知乎搜索 CAPTCHA 拦截、DDG 中文检索为空，中文社区维持 data.json 一轮调研成果（孟健评测、V2EX 涨价帖、Linux.do 降智帖）。
4. **GLM-5 初版 Token 单价**：官方未公开每 Mtok 单价（data.json 已注明「官方未公开」），仅能确认「比 GPT-4.1 低约 40%」与 5.2 的 OpenRouter $1.40/$4.40。
5. **GLM-5 初版 Intelligence Index 精确口径**：50 分（发布时）vs 8 月 AA 页 41 分 / #17——Index 版本重排所致，无法还原发布当日精确口径。
6. **初版 GLM-5 与 5.1/5.2 的榜单分数交叉**：部分分数在搜索结果中交叉出现（如 SWE-bench Pro 62.1 属 5.2），已尽量区分，个别可能属迭代版本。

---

## 四、对详情文件的影响清单

- **harnessReviews**：claude-code 由「官方接入说明」升级为实测（智源社区 Claude Code 外壳实测全文 + HN 用户 4 段实操 + 负面「weekly quota burn」）；cursor 由「官方支持」升级为实测（CursorBench 3.2 数字 + HN 解读 + 负面「garbage evals」）；openhands 保留官方 Index + 说明（社区实测缺失进存疑）。
- **expertQuotes**：新增 Willison（753B/51 分/43k token 消耗）、Karpathy（Agentic Engineering 断言）、智源社区/新智元（「改变行业格局」「Opus 时刻」）、HN 高赞（AA #4、lowest hallucination、cancel Pro、$7/季度、Claude replacement）等署名引语。
- **heat**：新增 Semgrep 帖 1113 pts 为系列峰值；保留发布帖 484/520、AA 头条 916/444。
- **timeline**：补充 02-07 Pony Alpha 匿名软启动 / 02-06 OpenRouter 首曝、06-28 Semgrep 1113 pts 帖；修正发布节奏描述（Max/Pro 先行、Lite 稍后）。
- **versionDelta**：补 CursorBench 数字（Max 55.0% / $1.76 vs Sonnet 5 56.9% / $3.19）、token 消耗问题（43k/任务 vs 5.1 26k）、初版发布体验问题 5.1 修复实证。
- **sources**：新增 Semgrep 博客、CursorBench（cursor.com/evals）、OpenHands 官方 docs、Willison GLM-5.2 文、智源社区 52533 等权威链接（保持 6-10 条）。
- **uncertainties**：新增 openhands 无社区实测、AA Index 口径重排（50→41）、初版单价未公开、Reddit 反爬维持一轮成果。
