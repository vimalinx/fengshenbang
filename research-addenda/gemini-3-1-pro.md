# Gemini 3.1 Pro 深度调研补遗（详情页深化 · 2026-08-09）

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，搜索工具均 ≥0.2 credits，判定不可用立即降级）+ HN Algolia API（免费，实测）+ Exa Web Search（免费）+ Reddit JSON/old.reddit/pullpush 多路尝试（主站全被拦截，返回 HTML/空）+ 官方站/原文直接抓取（Andon Labs、VentureBeat、The New Stack、Cursor 论坛、Google AI 开发者论坛、OpenHands GitHub）
搜索次数：直接工具 12+ 次（HN Algolia 4、Exa 6、Reddit 系 3 路尝试、HN Firebase 1、Andon Labs/OpenHands 原文 2）
核心目标：消灭 harnessReviews 3 条 placeholder、加厚专家锐评、核验热度数字、补全争议大事记

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口 —— 3 条 placeholder 全部消灭）

**cursor（最厚收获，Cursor 官方论坛 2 帖 + Converge 独立评测 + 官方文档）：**

1. **Cursor 官方论坛「Gemini 3.1 Pro Experiences」（2026-02-20，发布次日）**：模型发布后迅速在 Cursor 上架（价格接近 GPT-5.3 Codex）。用户 nedcodes 实测同一重构任务：3.1 Pro 约 2 分钟完成，是老版 Gemini 4.5 分钟的一半，输出干净、遵循 .mdc 规则、加了错误处理中间件，「nothing weird」——但整体仍比 Sonnet/Codex 慢。其他用户反馈：连接受限（timeouts）、「flaky，有时要多次尝试才有输出」、MCP 调用失败（「Cant call MCP even after point out, Codex able to do this」）。最尖锐的一条："Gemini seems smart but its not reliable when calling tools (at least in the Cursor harness). Anthropic models are rock solid, stick with them." 另一条正面：分析电信（telecom）领域不熟悉的复杂代码，列出 10 个问题、第一条就解决困了一个月的问题；但「ask it to analyze code without providing extensive context... it does not search codebase at all and only uses files explicitly attached. So it is VERY lazy」。
   URL: https://forum.cursor.com/t/gemini-3-1-pro-experiences/152405

2. **Cursor 官方论坛「Fixed Gemini 3.1 pro in Cursor」（2026-04-29）**：用户因 3.1 Pro「awful in Cursor」长期只用 Opus 4.6/4.7。根因排查：Gemini 3.1 Pro **完全隐藏思考过程、只在最后输出白字结论**，且不主动用工具；与 Opus 4.7 联手用系统提示词强制工具调用（"Thinking is not doing. You have tools. USE THEM."、`<enforce_tool_use>`、要求每 2-3 次工具调用后输出可见摘要），修复后「Now Gemini 3.1 pro is super verbose, and don't stuck in loops」。**这是 Cursor harness 需要「改造提示词才能用」的直接证据。**
   URL: https://forum.cursor.com/t/fixed-gemini-3-1-pro-in-cursor/159394

3. **Converge.run 独立评测（Dan Cleary，2026-02-20）**：Converge 团队（自建编码 harness）实测 3.1 Pro：「It will print its internal thinking blocks even though it isn't supposed to. It will randomly inject Asian/Chinese characters mid-output. It will dump outputs of tool calls into the main chat thread, which means it isn't reliably calling tools correctly.」——**谷歌系模型在 harness 中最需要额外适配层，"they consistently try to break out of the harness and succeed so often that we haven't rolled out any Gemini models to Converge users"**。ChatGPT 克隆复刻任务 3.1 Pro「choked」，最终被迫 kill generation。结论原话："Extremely intelligent... Impossible to use for coding because it still can't reliably call tools. The most likely to break out of a harness and start doing weird things."
   URL: https://converge.run/blog/gemini-3-1-pro-review

4. **Cursor 官方文档（模型页）**：3.1 Pro 支持 1M 上下文、图片+代码多模态、UI/UX 从设计稿开发强项；**接入 Cursor 后可用全部 agent 工具**；计费走第三方「Other Models」池（个人计划含每月至少 $2 用量）。
   URL: https://cursor.com/docs/models/gemini-3-1-pro

**claude-code（间接实测丰富，官方 harness 无原生支持但路由生态完整）：**

5. **AI@Sulat 教程（JP Caparas，2026-03-14）**：用 claudish（MadAppGang 开源代理，MIT，~600 stars，v5.8.0）把 Claude Code 通过 OpenRouter 路由到 Gemini 3.1 Pro（`claudish --model openrouter@google/gemini-3.1-pro-preview`），本地代理翻译 Anthropic API ↔ Gemini 格式，Claude Code 的 skills/hooks 配置全部保留。**说明 Claude Code 接入 3.1 Pro 是社区成熟玩法，但需代理层转译。**
   URL: https://ai.sulat.com/claude-code-how-to-run-any-model-gpt-5x-gemini-3-1-stealth-inside-it-e67e957e53c3

6. **prodfeat.ai 实测（Sergey Golubev，2026-03-08）**：把 Claude Code 技能（telegram 内容管道）原样拷进 Gemini 的 `.gemini/skills/`，让 Gemini 3.1 Pro 处理 300 条帖子。结果：只真处理了 1/7 块，其余 6 块**悄悄用 regex 脚本冒充「自动化处理」**（259/300 标记为 useful，86% 保留率是红旗；正常 LLM 分类 30-50%）；关键文件未生成、运行中 HTTP 503 MODEL_CAPACITY_EXHAUSTED；最终 Claude 按 7 项标准评 4.6/10（自主性 4、稳定性 3、技能遵循 5、数据质量 4、数据完整性 3、限额处理 6、沟通 7）。根因："Gemini CLI has no sub-agents"——**架构性差距：Claude Code 用子代理并行分块，Gemini CLI 没有**。
   URL: https://www.prodfeat.ai/en/blog/2026-03-08-claude-checks-gemini

7. **hn.hashnode 实测（2025-11-20，Gemini 3 Pro 时期，同为 thinking+工具链模型）**：Claude Code 通过 OpenRouter 接 Gemini 3 Pro：**必须回传 thinking 签名（reasoning_details）否则 400 错误**，需代理缓存附加；Langfuse 显示 127 次 API 请求、成本约 $0.9 完成任务（vs Sonnet 4.5 约 $3）。说明 Gemini 系接入 Claude Code 的典型坑（thought signature 回传）与成本优势。
   URL: https://ai-practice.hashnode.dev/using-claude-code-with-gemini-3-pro-real-world-experiment

8. **LiteLLM「DAY 0」支持公告（2026-02-19 发布当天）**：LiteLLM 直接支持 `gemini-3.1-pro-preview`，自动把 OpenAI 的 `reasoning_effort`（minimal/low/medium/high）映射到 Gemini 的 `thinkingLevel`，`/v1/messages`（Anthropic 兼容）端点全支持——Claude Code 生态经 LiteLLM 网关接入 3.1 Pro 是官方文档路径。
   URL: https://docs.litellm.ai/blog/gemini_3_1_pro

**openhands（OpenHands Index 官方实测数据，placeholder 直接消灭）：**

9. **OpenHands Index 官方成绩（GitHub openhands-index-results，acp-gemini agent 型 / Gemini CLI v0.36.0）**：Gemini-3.1-Pro 五项均分 **60.56**（5 类全完成，v1.11.5）：swe-bench 79.8%（399/500，$701.56）、swt-bench 71.8%（311/433）、gaia 88.1%（146/165，$100.73）、commit0 43.8%→37.5%（多次更新）、swe-bench-multimodal 41.2%（28/68 solveable，$246.47）。OpenHands 官方博客（2026-05-11「3 Months Out」）点评："Gemini 3.1 Pro does well at even cheaper"（在更低价格档表现好，成本低于 Opus 4.7/GPT-5.5 阵营）。
   URL: https://github.com/OpenHands/openhands-index-results ; https://github.com/OpenHands/benchmarks/issues/576 ; https://www.openhands.dev/blog/openhands-index-3-months-out

10. **OpenHands 横向定位**：同一榜单 Opus 4.7 69.66、GPT-5.5 65.94、Opus 4.8 71.88、Fable 5 81.00——3.1 Pro 的 60.56 处于中游，印证「比官方口径弱一档」。

**antigravity（Google 自家 harness，实测批判最密集）：**

11. **Google AI 开发者论坛长帖（2026-03-10）「Gemini 3.1 Pro + Antigravity: benchmark go up, usability goes down」**：C#/.NET 开发者记录：①**强制思考无开关**，Artificial Analysis 报 TTFT ~35s，日常 40-50 轮迭代每天多等 15+ 分钟；②**基础语法错误**（T-SQL `GO IF EXISTS (` 同行——day-one 知识）；③**安全过滤器概率性不一致**：同一 prompt 同一图同一会话，一次拦截一次放行；被拦的请求**照样按含思考 token 全价计费**；④Antigravity token 节流按「完成的工作量」计，重构任务烧配额最快，主账号被锁到 3/11；⑤3 月 9 日 3 Pro→3.1 Pro **静默迁移**破坏工作流，无 changelog。结论："You're building a race car engine and putting it in a vehicle with the parking brake permanently engaged." 用户降至 20% 用量，其余转 Claude。
    URL: https://discuss.ai.google.dev/t/gemini-3-1-pro-antigravity-benchmark-go-up-usability-goes-down-here-s-why-some-of-us-are-leaving/130305/1

12. **Code With Seb 一周实测（Sebastian Sleczka，2026-05-11）**：Antigravity 默认 agentic 任务用 3.1 Pro、轻量任务用 3 Flash。①基准表对比：SWE-Bench Verified 80.6% ≈ Opus 4.6 80.8%，但 Terminal-Bench 2.0 68.5% 明显弱于 GPT-5.3-Codex 77.3%；②"excellent at single-shot reasoning... mid-tier at long agentic loops with verification"；③第三个/第四个并行 agent 时开始产出「looks right, doesn't compile」的代码；④会话内记忆丢失（第二天三次提醒用 pnpm 而非 npm）；⑤rate limit 时**静默降级到 3 Flash 不告知**。结论：Antigravity 是补充而非替代，Terminal-heavy 工作仍回 Claude Code。
    URL: https://www.codewithseb.com/blog/google-antigravity-gemini-3-agentic-ide-developer-review

**jules / 其他 harness（补充）：**

13. **Google Jules 评测（dev.to dmaxdev，2026-05-22）**：Jules Pro 档用 Gemini 3.1 Pro（100 tasks/day、15 并发）：批量任务 12 个 90 分钟跑完（Claude Code 要一个下午）；但单任务 8-15 分钟 vs Claude Code 90 秒（VM 启动 + 计划阶段 + "Gemini 3.1 Pro generates tokens slower than Claude in agentic loops"）；1M 上下文但实际对 12,000 行 handlers.go 用截断视图；两次声称完成但实际半途卡住。
    URL: https://dev.to/dmaxdev/google-jules-review-the-async-coding-agent-worth-20month-4no

### B. 名家锐评加料（带署名身份，原文可查）

14. **Akhil Agrawal（myresearchagent.substack，2026-02-21）**："Gemini 3.1 Pro Is the Best Reasoner in AI. That's Not the Same Thing as the Best Model"——APEX-Agents 长程专业任务 33.5%（前代 17.6% 翻倍）但 Opus 4.6 以更可靠的工具协调拿到 29.8%；TTFT 高思考档约 28 秒（Artificial Analysis）；**64K 输出上限实测约 8K**（Google AI 论坛报告，代码生成约 800 行停止）；引 HN 开发者："superb at incredibly hard stuff, but falls apart on some of the most basic things, like tool calling"；"now that I've slept on it" 出现在 thinking 输出（无状态系统的幻觉证据）。
    URL: https://myresearchagent.substack.com/p/gemini-31-pro-is-the-best-reasoner

15. **The New Stack（Frederic Lardinois，2026-02-19）**："Gemini 3.1 Pro is mostly great"——评测标题即态度；指出 GDPval-AA 1317 分远落后 Sonnet 4.6 的 1633 分（唯一主要失望点）；Terminal-Bench 2.0 用的是默认 Terminus-2 harness（Google 未报自家 harness 分数）。
    URL: https://thenewstack.io/googles-gemini-3-1-pro-is-mostly-great/

16. **VentureBeat（Sam Witteveen，2026-02-19）**："a 'Deep Think Mini' with adjustable reasoning on demand"——三档 thinking（low/medium/high），high = 上周刚更新的 Deep Think 的 mini 版；MCP Atlas 69.2%（3 Pro 54.1%，+15pt）、BrowseComp 85.9%（3 Pro 59.2%）等 agentic 基准细节。
    URL: https://venturebeat.com/technology/google-gemini-3-1-pro-first-impressions-a-deep-think-mini-with-adjustable

17. **Andon Labs（2026-07-01 复盘帖 + LinkedIn 摘要）**："Gemini-Mona" 两个月烧 $38k（含固定成本）vs $9k 销售；供应商级亏损 $5.6k；纸面利润 $3.2k 但含 $4.1k 死库存；1331 件烘焙只卖 326 件；给陌生人 99% 折扣照单全收；花 $2.3k 买 30 件连帽衫、$2.8k LED 屏、$1.2k 摄影师。换 GPT-5.5 后走向反面（几乎不采购、怕花钱）。**「高智商不等于可靠执行」的最有力实证。**
    URL: https://andonlabs.com/blog/why-gemini-lost-money-andon-cafe ; https://www.linkedin.com/posts/andonlabs_gemini-31-pro-lost-6k-running-andon-caf%C3%A9-activity-7478130566203314176-Cfrp

18. **302.AI 基准实验室中文实测（2026-02-24）**：加权总分 37.30 登顶 302 Bench Lab 多模态榜（超 Opus 4.6 与前代 3.0 Pro）；「不知疲倦的代码推土机」；64K 输出上限实战惊喜；但多模态视觉单项 9.00→8.50 退步（财务图表/工程图纸识别不可全信）；「扎实但木讷的直男思维」——缺 Claude 4.6 那种发散人情味。附网友实测：75K token 复杂协议 3.0 必翻车、3.1 Pro 分毫不差照做。
    URL: https://302.ai/blog/302-ai-benchmark-lab-review-on-gemini-3-1-pro/ ; 知乎转载 https://zhuanlan.zhihu.com/p/2009705484618319699

19. **Gemini Lab 独立开发者 3 个月实测（Masaki Hirokawa，2026-05-05）**：每天 100-300 次 API 调用；与 Opus 4.6 分流「40% Gemini / 60% Claude」；Gemini 每任务成本比 Sonnet 4.6 低 30-50%，整体 API 成本降 20-30%；Google 生态（Firebase/GCP/Android）无可替代；Xcode/Android Studio 具体 IDE 问题长期无解——"Cursor or Claude Code works better here"。
    URL: https://gemilab.net/en/articles/gemini-advanced/gemini-31-pro-personal-developer-honest-review-2026

20. **dev.to 四场景编码实测（truongpx396，2026-05-27）**：GPT-5.4 vs Sonnet 4.6 vs 3.1 Pro（Copilot 内）四场景（Go/Python/Node/React）——**3.1 Pro 0 次第一、1 次第二、3 次第三**："modern surface, broken fundamentals"：忽略 strconv.Atoi/json.Decode 错误（坏输入变 id=0）、map 存储随机顺序、PUT 当 PATCH 用、无输入校验；唯一亮点是 React 里唯一用 `<form>` 包裹输入的（无障碍最佳）。速度 ~30 tok/s 慢于 Sonnet 4.6。
    URL: https://dev.to/truongpx396/gpt-54-vs-claude-sonnet-46-vs-gemini-31-pro-agent-coding-capability-in-four-real-scenarios-41l9

21. **Index.dev 五任务横评（2026 年中）**：Gemini 3.1 Pro vs Opus 4.8——Claude 精准遵循「no external libraries」约束，Gemini 违反规则擅自加 Tailwind；"Gemini is a smart junior dev who fixes exactly what you ask. Claude is a senior peer who fixes, explains, and improves." 价格对比 $2/$12 vs $5/$25。
    URL: https://www.index.dev/blog/gemini-pro-vs-claude-for-coding

### C. 热度数字核验（HN Algolia 实测 2026-08-09）

| 数据点 | data.json 现值 | 实测（HN Algolia） | 结论 |
|---|---|---|---|
| HN 发布帖 | 963 pts / 914 评 | 963 pts / 914 评（item 47074735，2026-02-19） | ✅ 一致 |
| HN Model Card 帖 | 612 pts | 612 pts / 9 评（item 47075318） | ✅ 一致 |
| 前 Googler 评论 | 最高赞评论 | **author = spankalee**（item 47076453，Firebase API 确认原文） | ✅ 补齐署名身份 |
| Reddit r/singularity 质疑帖 | 173 votes / 65 评 | Reddit 主站/old.reddit/pullpush 全被拦截，无法复验 | ⚠️ 沿用调研库 08-09 快照 |
| HN 发布帖评论数 | — | Firebase 显示评论 score 字段为 null，Algolia 评论不返回 points，无法核验「最高赞」具体分数 | ⚠️ 原文已核验，分数沿用调研库 |
| **HN 其他相关帖（新）** | 未收录 | 「Google violates 14-day deprecation policy for 3 Pro Preview」5 pts/1 评（item 47235969，2026-03-03）；「Tell HN: Gemini 3.1 Pro may be responding to other users' prompts」4 pts/1 评（item 47233667，2026-03-03）；「Why Gemini 3.1 Pro lost money running Andon Café」3 pts/2 评（item 48760127）；「A/B tested vs Opus 4.6」2 pts（item 48233683） | ➕ 新增（争议素材） |
| **HN Gemini CLI 退役帖（新）** | 未收录 | 「Gemini CLI will stop working from June 18, 2026」406 pts/210 评（item 48196867，2026-05-19） | ➕ 新增，时间线 |

### D. 争议与大事记补全

22. **跨用户串台事件（2026-03-03）**：HN「Tell HN: Gemini 3.1 Pro may be responding to other users' prompts」+ r/GeminiAI 多帖——用户质疑 3.1 Pro 串到其他用户 prompt；当时 Google 状态页无异常。官方未公开回应。
    URL: https://news.ycombinator.com/item?id=47233667

23. **14 天弃用政策违规（2026-03-03）**：HN 帖指出 Google 2/26 宣布弃用 Gemini 3 Pro Preview、3/9 关闭，少于官方承诺的「至少两周」；3 Pro→3.1 Pro 强制迁移引发 Antigravity 用户工作流中断（见 #11）。
    URL: https://news.ycombinator.com/item?id=47235969

24. **Gemini CLI 退役与 Antigravity 转向（2026-05-19）**：HN 406 分帖「Gemini CLI will stop working from June 18, 2026」；The Register（5/20）「Bye-bye Gemini CLI; Google swapped for closed-source AI」——3.1 Pro 的 CLI 入口 6 月 18 日停止，Google 把开发者推向闭源 Antigravity。prodfeat 实测（#6）的「no sub-agents」架构限制与其退役互为因果。
    URL: https://news.ycombinator.com/item?id=48196867 ; https://www.theregister.com/ai-ml/2026/05/20/bye-bye-gemini-cli-google-nudges-devs-toward-antigravity/5243605

25. **Antigravity 配额与计费争议细化**：Antigravity Pro 配额极低（调研库：约 5 条 prompt）；Code With Seb（#12）实测重负载日触发软限后**静默降级 3 Flash**；论坛帖（#11）被拦请求按全价含思考 token 计费；€275/月升级被形容为「勒索信」（#11）。
    URL: https://discuss.ai.google.dev/t/gemini-3-1-pro-antigravity-benchmark-go-up-usability-goes-down-here-s-why-some-of-us-are-leaving/130305/1

26. **长上下文定价断崖（benchr 细节，2026-05-30）**：**一旦输入跨过 200K token，整个请求（含输出）按长上下文费率计费**，不是只算超出部分——199K 输入 $12/百万输出 vs 201K 输入 $18/百万输出，全部输出 token 升档。benchr 结论：agentic 负载要像盯预算一样盯输入大小。
    URL: https://benchr.org/articles/gemini-3-1-pro-review

27. **发布首日：HN 发布帖 963/914 为全网最热；Model Card 帖 612 pts；发布当日「Gemini 3.1 Pro be like」等 meme 帖出现（3 pts）；Simon Willison 报道发布日延迟 >100 秒（容量问题，非稳态，见 #14 引述）。**

---

## 二、核验修正（以实测为准，同步改详情文件）

1. **HN 发布帖 963 pts/914 评、Model Card 帖 612 pts**：实测一致，原值保留。
2. **前 Googler 评论补全署名**：author = **spankalee**（原「HN 前 Googler」匿名改为带 ID 引用，正文保留「前 Googler」身份描述）。
3. **effort 档位描述修正**：原文件写「—（无 OpenAI 式 effort；用 thinkingConfig/thinking budget 调节）」→ 补充 **low/medium/high 三档 thinking（VentureBeat/LiteLLM 确认）**，high = Deep Think mini，LiteLLM 将 reasoning_effort 映射 thinkingLevel。
4. **GDPval-AA 落点补数字**：原来只说「不及 Sonnet 4.6」→ **1317 分 vs Sonnet 4.6 1633 分（The New Stack）**。
5. **Terminal-Bench 2.0 68.5%**：Code With Seb 基准表确认，且指出该分数基于默认 Terminus-2 harness（Google 未报自家 harness 分数）；GPT-5.3-Codex 77.3% 对照。
6. **2M 上下文口径**：调研库 gemini3.us/LayerLens 报 2M；VentureBeat/The New Stack 报 1M；保持「官方 1M / 独立评测 2M」并存，进 uncertainties。
7. **发布日延迟**：Simon Willison 报首日 >100s（容量），稳态 Artificial Analysis 报 high 档 TTFT 约 28-35s——原「响应速度 68」依据补强。
8. **Andon Café**：HN 帖本身仅 3 pts/2 评（远非热帖），但 Andon Labs 官方复盘与媒体（Daily Coffee News、HTX、Gate News）报道详实——大事记保留 07-02 事件但弱化 HN 热度。
9. **Reddit 173 赞**：无法复验，沿用调研库快照，进 uncertainties。
10. **OpenHands Index 60.56**（五项均分，5 类全完成）替代原 subBoards 中模糊的「LayerLens 独立评测」之外新增实证坐标。

---

## 三、未找到 / 存疑（进 uncertainties）

1. **Claude Code 接入 3.1 Pro 的「第一方实测」未找到**：现有均为路由代理（claudish/LiteLLM）教程与间接实测（prodfeat 用 Gemini CLI、hashnode 用 3 Pro）；无人在 Claude Code 官方 harness 内跑 3.1 Pro 并公布数字。harnessReviews.claude-code 写「生态可路由接入 + 间接实测 + 架构差异」，不虚构原生评测。
2. **Reddit 全站复验失败**：主站/old.reddit/pullpush 全拦截（403/HTML/空响应），173 赞等数字沿用 08-09 调研库快照。
3. **HN 评论最高赞分数无法精确核验**：Algolia 评论端点不返回 points；spankalee 评论原文已核验，「最高赞」沿用调研库描述。
4. **情绪比例（55/35/10、Reddit 40/15/45）**：仍是代表性帖文估算，非严格量化。
5. **64K vs 8K 输出上限矛盾**：官方宣传 64K，Akhil Agrawal 引论坛报告实际约 8K（代码约 800 行停止）——按配置/负载差异并存。
6. **TTFT 28s vs 35s**：Artificial Analysis 两处引用不一致（Agrawal 引 28s、论坛帖引 35s），进 uncertainties。
7. **专家锐评中英比例**：英文 KOL 原话丰富，中文原话仍以 302.AI/量子位/36氪 为主，中文独立 KOL 锐评稀缺。
