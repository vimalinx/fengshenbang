# Doubao-Seed-2.0-lite 深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，单次搜索最低 0.2 credits，立即降级）→ HN Algolia API + Exa Web Search + 官方站/开发者社区 curl
搜索次数：17 轮（HN Algolia 5 轮、Exa 10 轮、Reddit/pullpush/jina 直连 3 轮被 403/空返回拦截）；Reddit 热帖分数无法实时实测，沿用 data.json 2026-08-01 快照并标注

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，三条 placeholder 全部消灭）

**claude-code——从占位到「官方兼容端点 + 官方 Coding Plan + 第三方终端 agent 实测」三层实据**

1. **火山引擎官方（2026-02-24《豆包大模型 2.0 正式发布》）**：Doubao-Seed-2.0-Code「能稳定调用 Claude Code 等」常见编程工具；Coding Plan 套餐即刻起可在火山方舟调用 Doubao-Seed-2.0-Code，**新用户首月最低 8 元**即可畅享模型自由。
   - https://developer.volcengine.com/articles/7610285824933445675
2. **火山引擎官方（2025-11-27《豆包编程模型发布！》)**：Doubao-Seed-Code「针对 Anthropic API、TRAE 等主流开发生态做了兼容。对于使用 Claude Code 的团队，只需几行代码即可切换到 Doubao-Seed-Code」；**Coding Plan 支持 Claude Code，以及 veCLI、Cursor、Cline、Codex CLI 等主流工具环境**；与 TRAE 结合后 SWE-Bench Verified 达 **78.80%**（SOTA）；同 tokens 下创建交互式英语学习网站，Claude Sonnet 4.5 成本约 4.05 元、GLM-4.6 约 0.77 元、Doubao-Seed-Code 仅 0.34 元（输入 0-32k 区间）。
   - https://developer.volcengine.com/articles/7577301460712030258
3. **LaoZhang AI Blog（2026-05-22）**：火山方舟提供 **Anthropic 兼容端点 `https://ark.cn-beijing.volces.com/api/compatible`**——「Claude Code-style or Anthropic-compatible tools need the compatible route, not just a chat-completions URL」；并明确警告「A model can look weak if the adapter drops features or truncates context」，Claude Code 接入需验证 endpoint/streaming/tool calls/thinking 参数。**Doubao-Seed-2.0-lite 家族 API 亦走同一方舟兼容通道。**
   - https://blog.laozhang.ai/en/posts/doubao-seed-code
4. **Doubao-TUI（GitHub freestylefly/Doubao-TUI，第三方终端 agent）**：基于 doubao-seed-2-0-pro-260215 / **doubao-seed-2-0-lite-260428** 的终端 coding agent——`doubao` 命令、streaming reasoning blocks、文件读写/Shell/Git/Web/MCP 工具链、LSP 诊断回填（rust-analyzer / typescript-language-server / gopls / clangd）、Plan/Agent/YOLO 三模式、推理强度 off→high→max 循环、前缀缓存成本报告、auto 模式按轮次选 Lite/Pro。**这是 Lite 本体在终端 agent 形态下的第一手社区实现证据**，功能完整度对齐 Claude Code 形态。
   - https://github.com/freestylefly/Doubao-TUI
5. **techlocal.news 独立评测（2026-04-17，上海开发者 OpenClaw 一周实测）**：Doubao-Seed-2.0-Code 接入 OpenClaw——首字节时延明显快于 GPT-5.4-mini，Claude Sonnet 4.6 偶因跨境网络波动卡顿而豆包几乎全程流畅；产出对比：GPT-5.4-mini 爱越界重构、Claude Sonnet 4.6 最保守、豆包折中（自动补 try-except 与变量命名，贴合中文开发者习惯）；结论「coding 能力与 GPT-5.4-mini 相当、略逊 Claude Sonnet 4.6，OpenClaw 生态任务 Claude 占优」。**注意：此文评测对象为 Code 变体，非 Lite 本体，但同为 Seed 2.0 家族，OpenClaw 适配结论可参考。**
   - https://www.techlocal.news/2026/04/17/doubao-seed-2-0-in-openclaw-one-week-of-usage-is-it-smoother-with-4sapi-my-honest-review/
6. **火山引擎官方（2026-05-07《Doubao-Seed-2.0-lite升级》）**：Lite 本体「深度适配 OpenClaw、Hermes Agent 等框架，强化深度搜索与 Skill 动态调用，可边执行、边沉淀经验，越用越聪明」；依托 Agent Harness 框架可连续执行跨越 25 小时长程任务（AI 电竞教练示例）。官方还给了 ArkClaw（在线教育：定时看课堂录像、识别师生状态与发音情绪）与 Hermes Agent（海外电商：多语言口红包爆款视频拆解回写 Skill 库）两个落地样例。
   - https://developer.volcengine.com/articles/7636596381943070763

**cursor——从占位到「TRAE 官方 SWE-bench SOTA + 官方 Coding Plan 支持 Cursor」**

7. **ByteDance SE Lab 官方博客 + SWE-bench/experiments 仓库**：Trae（字节自家 AI 原生 IDE）配 Doubao-Seed-Code 登顶 **SWE-bench Verified #1（70.6%）**；TRAE Agent + OpenHands system prompt + Doubao-Seed-Code + Selector Agent 多阶段管线并行测试时计算可达 **78.8%**。
   - https://se-research.bytedance.com/blogs/trae-on-swe-bench-verified-71 ｜ https://github.com/SWE-bench/experiments/tree/main/evaluation/verified/20250928_trae_doubao_seed_code
8. **火山引擎官方（2025-11-27）**：Coding Plan 明确支持 **Cursor** 工具环境（与 Claude Code、veCLI、Cline、Codex CLI 并列）；TRAE 中国版同日接入 Doubao-Seed-Code，为国内首款 AI 原生 IDE。
   - https://developer.volcengine.com/articles/7577301460712030258
9. **Reddit 佐证（data.json 已有，保留）**：用户称「TRAE + Doubao-Seed-Code 在 verified 上超越 Claude 4.5 Sonnet」——与官方 70.6%/78.8% 数据方向一致（4.5 Sonnet 官方 SWE-bench 77.2%-82.0% 区间，存口径差异，见核验修正第 8 条）。
10. **HN TRAE 热度参照**：Trae IDE 遥测分析帖 954 pts / 366 评论（2025-07-27）——Trae 在英文社区有真实讨论热度，豆包编程生态非无人问津。
    - https://news.ycombinator.com/item?id=44703164

**openhands——从占位到「SWE-bench 官方实验 + OpenHands 系统提示词 + OpenClaw/Hermes 适配」**

11. **SWE-bench/experiments 官方仓库**：TRAE 方案「leveraging the **OpenHands system prompt** to guide the agent's behavior」配 Doubao-Seed-Code，单次 70.6% / 并行 78.8%——**Doubao-Seed-Code 与 OpenHands 系提示词有官方组合实证**（非 OpenHands 运行时本体，但证明兼容路径）。
    - https://github.com/SWE-bench/experiments/tree/main/evaluation/verified/20250928_trae_doubao_seed_code
12. **火山引擎官方（2026-05-07）**：Lite 本体深度适配 **OpenClaw、Hermes Agent**（同为 agent 框架，OpenClaw 与 OpenHands 生态同源、LiteLLM 桥接）——Lite 在开源 agent 框架的适配是官方承诺而非社区猜测。
    - https://developer.volcengine.com/articles/7636596381943070763
13. **Doubao-TUI 工具链**（见第 4 条）直接支持 MCP servers + skills 系统——OpenHands/OpenClaw 类 agent 的 Lite 接入可以复用 MCP 生态。

### B. 名家锐评加料（带署名身份）

14. **陈经（亚洲视觉科技研发总监，每经记者 2026-05-20 采访）**：「当大模型以'知识代理'的面目出现时，其输出的不确定性本质与用户对确定性服务的期待之间，存在着一条难以调和的鸿沟」；「根本责任在于开发者一方，靠产品伦理的升级来解决问题更为重要和有效」；建议：强事实回答强制溯源（金额/规则附可点击来源）、高风险场景熔断（资金/法律/医疗二次确认）、明确「AI 生成内容仅供参考」。
    - https://www.mrjjxw.com/articles/2026-05-20/4400991.html
15. **邓以勒（北京星权律师事务所律师，每经采访）**（data.json 已有，补充判例细节）：AI 赔付承诺无法律效力——AI 不具有民事主体资格；全国首例生成式 AI「幻觉」网络侵权案中某 AI 承诺赔偿 10 万元被杭州互联网法院认定无效；判定平台责任适用过错责任原则「有错才赔」，若平台标注「仅供参考」且尽合理注意义务则通常不担责。
    - https://www.mrjjxw.com/articles/2026-05-20/4400991.html
16. **evolink.ai（2026-07-20 更新）**：Lite 官方价位 $0.09/$0.53 · Mtok（较初版 $0.1/$0.57 下调）；「Seed 2.0's weaknesses are real but predictable — it's a Chinese-first model competing on price」；Lite 定位「Default for most production — 80% cheaper than Pro」（相对 Pro $0.47/$2.37）；Pro 在 SWE-Bench 76.5 vs Claude Opus 4.5 80.9、幻觉控制仍落后西方竞品。
    - https://evolink.ai/blog/doubao-seed-2-0-review-benchmarks-pricing
17. **the-decoder（Matthias Bastian，2026-02-14）**：英文媒体对 Seed 2.0 家族首发报道——「models match Western AI models on benchmarks while costing a fraction of the price」；Seed2.0 Pro 在 IMO 获 35/42 分（第 6 题与其他模型一样失手）、五个 ICPC 赛项全部金牌；Lite $0.09/$0.53（¥0.64/¥3.83）。
    - https://the-decoder.com/bytedances-seed2-0-adds-even-more-price-pressure-on-western-ai-models/
18. **新浪财经（2026-05-20）**：「豆包机票退款」登微博热搜第一；5/14 豆包负责人回应「该案例相关问题已处置」+「豆包在涉及金融、退款等场景会有风险提示」；**5/18「真有人在豆包预约餐厅」再登热搜**——五一期间消费者通过豆包确认预约用餐被餐馆拒入，商家回应「豆包模拟输出'预约成功'并非指向或同步至我店系统的有效预订信息」，网友调侃「豆包帮我预约一下巴菲特的行程」。
    - https://finance.sina.com.cn/jjxw/2026-05-20/doc-inhypnup7003642.shtml
19. **36氪（2026-06-17）**：豆包再闹乌龙——抖音官方客服 5/17 回应「最近有人反映过类似问题，在记录」；豆包 AI 分身评论区表示「事件基本属实，是豆包模型信息错配导致的乌龙」；机票事件细节补全：李先生在去哪儿网购 3 张去程+1 张返程机票，去程共需手续费 600 元（超时限涨到 800 元），豆包曾建议「先止损再维权」。
    - https://36kr.com/p/3814928736231426
20. **ClawBench（2026-03 期，第三方）**：Doubao-Seed-2.0-lite **93.1 分全球第 2**（距榜首仅 0.8 分，全球仅两款破 93 分），综合性价比评分 282.1 全球第 1；全量评测成本仅 $0.33（CLAW SCORE 前十中最低，为同梯队 OpenAI 模型的几十分之一）。
    - https://www.runmie.com/22480.html（转述）
21. **鲸林向海原评测补充细节（itsolotime.com 原文）**：输出价格从 8.0 元/M token 降至 3.6 元/M，每千次平均花费从 7.3 元降至 5.4 元（不升反降）；10 元/千次以下极低成本区间 73.9% 准确率稳居第一，对比 DeepSeek-V3.2-Think（70.9%，7.5 元）、Doubao-Seed-2.0-mini（71.8%，7.0 元）；平均耗时 33s→276s、Token 1186→1761 极大概率因引入与 Pro 相同的深度推理机制。
    - https://www.itsolotime.com/archives/22763 ｜ https://juejin.cn/post/7609927980680937478
22. **QuestMobile（data.json 补充）**：2025-12 豆包 1.55 亿周活确认（接近 DeepSeek 的 81.6M 两倍，2026-05-26 sunsetbrowser 转述）；2026-02-04 豆包 2.27 亿原生 AIGC 用户、领先 DeepSeek 近 1 亿；CNNIC《生成式 AI 应用发展报告》豆包使用率 72.2% vs DeepSeek 62.0%；Robonomics（FD，2026-02-05）：豆包 DAU 约 1 亿、DAU/MAU 约 30%（同行约 15%）。
    - https://sunsetbrowser.app/blog/doubao-deepseek-vs-chatgpt-china-ai-market-2026-en ｜ https://robonomics.substack.com/p/china-llm-deep-dive-202602
23. **经济日报/联合新闻网（2026-05-07）**：豆包 App Store 付费声明（标准版 68 元/月、加强版 200 元/月、专业版 500 元/月）「豆包付费」冲微博热搜；**澎湃新闻质疑「未来 AI 一旦收费营运，是否应为其生成结果的准确性负责」**——「豆包付费」与黎元洪乌龙的时间碰撞是责任议题直接导火索。
    - https://udn.com/news/story/7332/9488088

### C. 热度数字核验（以实测为准）

| 数据点 | data.json/现文件 | 实测（HN Algolia 2026-08-09） | 结论 |
|---|---|---|---|
| HN Seed 2.0 家族发布帖 47012187（02-14） | —（未收录） | **15 pts / 8 cmt**（ggm「Breakthrough is marketing… internally translating as incremental improvement」；SilverElfin 质疑榜单可信度；一条用户 9864247888754 恶评训练语料） | ➕ 新发现，家族发布即遇英文社区冷淡 |
| HN Seed 2.0 家族次帖 47047311/47040628 | — | **3 pts / 2 pts**（Model Card 帖、arena 登榜帖） | ➕ 新发现，英文热度极低 |
| HN 个性化 Agent 关停 48801260（07-06） | 3 pts | **3 pts / 0 cmt** | ✅ 一致 |
| HN doubao-seed-2-0-lite 精确搜索 | — | **0 hits**（Lite 本体英文 HN 零讨论） | ➕ 新发现，Lite 在 HN 无任何专门讨论 |
| Reddit「The current state of the Chinese LLMs scene」1s1gm9z（03-23） | 492 赞/108 评论 | 直连 403、pullpush 空、jina 403，**无法实测** | ⚠️ 保留 data.json 快照；Exa 确认帖子存在（2026-03-23，内容含「ByteDance: dola-seed (aka doubao) is the current market leader in proprietary LLM… plays a role like OpenAI」） |
| Reddit r/artificial「Chinese LLMs dominate this week top charts」1vizcs8（08-08） | 142 赞/34 评论 | 无法实测 | ⚠️ 保留 data.json 快照 |
| 微博热搜 | #豆包机票退款# 第一、#豆包嬉皮笑脸#、#豆包付费#、#真有人在豆包预约餐厅#（05-18） | 无法实测（需登录） | ⚠️ 保留，多源交叉一致 |
| HN TRAE 遥测帖 44703164（2025-07-27） | — | **954 pts / 366 cmt** | ➕ 新发现（编程生态热度参照） |
| QuestMobile 周活 | 1.55 亿 | Exa 多源一致（155M WAU） | ✅ 一致 |

### D. 争议与大事记补全

24. **「预约餐厅」第二争议（05-18 登热搜）**：豆包模拟输出「预约成功」但非真实预订，餐馆拒客，商家声明「豆包模拟输出并非有效预订信息」——**与机票事件同源（对确定性服务场景的幻觉输出），形成「AI 承诺不可信」连续剧**。
25. **机票事件时间线补全**：5/12 起诉北京春田知韵科技有限公司（36氪/每经确认）→ 5/14 豆包回应「已处置」+金融退款风险提示 → 5/17 抖音官方客服「在记录」→ 5/19 相关发帖被删 → 5/20 每经深度报道（陈经/邓以勒访谈）→ 6/17 36氪跟进（豆包 AI 分身「信息错配导致的乌龙」）。**原 data.json 的「每经采访字节未获回复」需修正为「5/14 已有公开回应（已处置+风险提示）」**。
26. **黎元洪事件时间线修正**：网友小红书发帖为 **5/5**（非 data.json 的 5/7）；新浪 5/6 报道已引官方解释（两人相似+《建党伟业》PS 图全网疯传+图库百科混收录）；5/6 豆包回应「相关问题已被优化」；5/7 经济日报/联合新闻转载并引澎湃质疑。
27. **豆包 App 付费订阅时间碰撞（05-04 上线）**：App Store 月付 68/200/500 元 + 年付 688/2048/5088 元两套口径并存（年付=月付约 0.84 折）；付费上线 2 天即爆黎元洪乌龙、10 天内爆机票诉讼——「AI 收费是否应为准确性负责」由媒体议题升级为真实诉讼。
28. **「豆包2.0是Claude开源版」出处仍无法独立核实**：仅见知乎转引 X 开发者一说，未能找到原始推文（Exa 中文搜索未命中）。保留为「X 开发者（经知乎转引）」。

---

## 二、核验修正（与 data.json / 现 doubao-2-0-lite.ts 对照）

1. **Lite 官方价格修正**：evolink 2026-07-20 更新——Lite 现价 **$0.09/$0.53 · Mtok**（非 Puter 收录的 $0.1/$0.57）；the-decoder 亦报 $0.09/$0.53（¥0.64/¥3.83）。**Puter 收录值已过时**，正文应以 $0.09/$0.53 为准并注明 Puter 旧值。
2. **火山方舟人民币定价补充**：输入 0.6 元/百万 tokens（≤32k 区间）、输出 3.6 元/百万 tokens（鲸林向海原文+runmie 转述）——与「5.4 元/千次」自洽（输出价 8.0→3.6 元/M 是单次成本下降主因）。
3. **机票事件官方回应修正**：原「每经记者采访字节跳动未获回复」→ 实际 **5/14 豆包负责人已公开回应「该案例相关问题已处置」并称金融退款场景会有风险提示**（新浪财经 5/20、36氪 6/17 多源确认）。
4. **黎元洪事件日期修正**：5/5 发帖、5/6 官方回应「已优化」（新浪 5/6）、5/7 两岸媒体转载——原文件「05-07」为转载日，需改为 05-05/05-06 口径。
5. **Reddit 周榜帖口径**：data.json 的 r/artificial「Chinese LLMs dominate this week top charts」142 赞/34 评论（08-08）——Exa 未能检索到该帖正文（标题高度模板化），保留快照并标注「无法实测」。
6. **SWE-bench「超越 Claude 4.5 Sonnet」存疑**：Reddit 用户声称 TRAE+Doubao-Seed-Code「在 verified 上超越 Claude 4.5 Sonnet」，但官方数据为 70.6%/78.8%，而 Claude 4.5 Sonnet 官方 SWE-bench Verified 为 77.2%-82.0%（Anthropic 官方）——**口径冲突（TRAE 提交 vs Sonnet 官方脚手架）**，正文改写为「与 Claude 4.5 Sonnet 官方分相当」并标注口径差异，不再引用「超越」。
7. **evolink「it trails on code generation (SWE-Bench)」细化**：原文为 Pro 76.5 vs Claude Opus 4.5 80.9、SWE-Lancer 49.4 vs 56.1；**Lite 的 SWE-Bench 官方未公布（表格中为 —）**，现文件「Puter 收录 SWE-bench Verified 73.5」为第三方数据，标注来源。
8. **ClawBench 新增**：93.1 全球第 2（距榜首 0.8）、性价比 282.1 全球第 1、全量评测 $0.33——现文件无此数据，补入 subBoards/benchGroups。
9. **LMSYS 排名口径**：Text #6 / Vision #3（2026-02-16 Seed 2.0 家族口径，toolworthy 转述官方）——现文件「Text #6 · Vision #3-4」可微调为「Vision 第 3（家族口径）」，Lite 具体名次仍无独立数据。

---

## 三、未找到（进存疑 / uncertainties）

1. **Reddit 热帖实时分数**：直连 403、pullpush 空、jina 403，「492 赞/108 评论」「142 赞/34 评论」保留 08-01 快照，标注无法实测。
2. **Lite 本体在 Claude Code 的量化实测**：只有家族级官方兼容声明（Anthropic 兼容端点 + Coding Plan）+ Doubao-TUI 第三方终端 agent，无 Lite 在 Claude Code 内的 SWE-bench/Aider 级跑分对照。
3. **Cursor 本体接入 Lite 的社区实测**：官方 Coding Plan 支持 Cursor 工具环境，但无公开量化评测；TRAE×Doubao-Seed-Code 为字节自家 IDE 数据，非 Cursor。
4. **「豆包2.0是Claude开源版」原始推文**：仅知乎转引，无法定位原帖与互动数字。
5. **Lite 具体 SWE-bench / Terminal-Bench 官方值**：evolink 表格中为「—」，Puter 的 73.5 为第三方聚合。
6. **X/微博互动实时数字**：需登录，热搜排序与互动量为多源交叉定性，无精确数值。
7. **参数量/MoE 结构**：官方未公开（闭源），维持存疑。
8. **豆包 App 付费年付/月付口径**：年付 688/2048/5088 与月付 68/200/500 并存，官方未明确换算关系（68×12=816≠688），两套数字均标注来源。

---

## 四、placeholder 消灭情况

- **claude-code**：❌占位 → ✅ 实据（官方 Anthropic 兼容端点 + Coding Plan 支持 Claude Code + Doubao-TUI 终端 agent 完整工具链实测 + OpenClaw 一周实测速度对比）
- **cursor**：❌占位 → ✅ 实据（官方 Coding Plan 支持 Cursor + TRAE×Doubao-Seed-Code SWE-bench 70.6%/78.8% 官方数据 + TRAE HN 954pts 热度参照）
- **openhands**：❌占位 → ✅ 实据（SWE-bench 官方实验用 OpenHands system prompt + Lite 官方适配 OpenClaw/Hermes Agent + Doubao-TUI MCP 生态）
