# DeepSeek-V4-Flash-0731 详情页深化 · 调研补遗

- 调研基准日：2026-08-09
- 手段：AgentKey MCP（余额 0.1 credits，不足 1 次付费调用，触发降级）→ HN Algolia / Reddit JSON / ARC Prize / ctgt.ai / V2EX API 免费 curl + webfetch
- 搜索次数：AgentKey find×3 / describe×1 / execute×1（account 确认 0.1 credits）+ 免费 API 数据抓取 25+ 次（HN 故事/评论/条目 18 次、Reddit 6 途径尝试、ARC Prize 官方页、ctgt.ai 研究页、V2EX API、PullPush×2、jina×2）
- 结论：消灭 1 条 harness placeholder（claude-code 升级为实测）；新增 ARC-AGI 独立验证、官方涨价警告、审查漂移三大新事实；HN 热度数字全部以实测修正

---

## 一、新发现事实（带 URL）

### 1. ARC Prize 官方独立验证 ARC-AGI（data.json 完全未收录，最大新增）
- **ARC Prize 官方结果页**（2026-07-31 收录）：At max effort, **ARC-AGI-1 Semi-Private 89.0%（$0.02/task）**、**ARC-AGI-2 Semi-Private 61.4%（$0.04/task）**；High 档 87.0%/56.0%、Low 档 84.0%/46.0%，共 3 reasoning variants。
  https://arcprize.org/results/deepseek-v4-flash-0731
- 技术报告：https://arxiv.org/abs/2606.19348
- **HN 主帖 49214008（772 pts/463 cmts，data.json 记为 768/460）实为 ARC Prize 结果页**，并非纯热度帖——首页截图即 ARC-AGI 成绩。以实测修正为 772/463。

### 2. DeepSeek 官方「大幅涨价」警告（data.json 完全未收录，须补 timeline/controversies）
- 官方邮件（2026-08 初）：**"We plan to raise the overall pricing for DeepSeek API services in the near future, with a significant increase expected. Please plan your usage accordingly."**
  - HN「Tell HN: Upcoming DeepSeek API Billing Adjustment」https://news.ycombinator.com/item?id=49197176
  - Reddit r/DeepSeek「deepseek says api pricing is going up」https://www.reddit.com/r/DeepSeek/comments/1vgpysh/
  - HN 49207239（自建 vs API 帖）评论区 shellwizard/jaggs 确认："Upcoming price hike in the following days (no ETA yet)" / "they just announced that the pricing will be going up significantly"
- 社区第一猜测（vitaflo）："they are about to release the final version of v4 Pro and it uses more resources than the preview did"——与 V4-Pro 正式版联动。
- 反方观点（NorwegianDude）："Deepseek is not cheapest provider as is, and it's MIT... they can only change their own pricing"——MIT 权重可转投第三方，涨价影响有限。

### 3. 审查漂移争议（data.json 未收录，新增 controversies 候选）
- ctgt.ai LineageEval 重测（2026-08-05）：**官方 0731 构建比 Preview 选择性更审查**——mean matched gap +32.0 → +44.0、median +33.3 → +56.1、敏感侧更审查的配对比例 79% → 88%；对照组 GPT-OSS-120B 仅 +3.9。
  https://www.ctgt.ai/research/v4-flash-0731-drift （HN https://news.ycombinator.com/item?id=49187544）

### 4. Harness 实战评测（最大缺口，claude-code 已消灭 placeholder）
- **claude-code（实测充分，多条）**：
  - 配置一行接入：`ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic` + `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_MODEL=deepseek-v4-flash`（CJefferson/aftbit/jubilanti/rapind 多帖，可用 .bashrc alias 或环境变量）https://news.ycombinator.com/item?id=49120299 评论区
  - 成本实测（BiraIgnacio）："I've been using V4 flash consistently with Claude. Pretty great fast and darn cheap. I use it about 3h/day and so far haven't crossed $1 USD/week."——每天 3 小时、一周不到 $1
  - 替换动机（dw_arthur）："Deepseek v4 Flash has replaced Claude Code because I was also sick of hitting 5 hour limits with Claude. Right now, the only thing I miss from Claude is multi-modal image support... I can use v4 Flash all day and spend around $1."
  - 体感评价（arjie）："I am surprised by how good DeepSeek V4 Flash is... when I use DS V4 Flash I don't feel like it's really that bad. And with oh-my-pi and just plain pi it's pretty good. The frontier models are much better at tool calling so in an assistant flow they're better."
  - 混用策略（mark_l_watson）："I have switched to using DeepSeek v4 Pro with the Claude Code harness and DeepSeek v4 Flash with the OpenCode harness"
  - 负面/短板（raihansaputra）：无订阅套餐、纯 API 计费；seanmcdirmid："The only issue really is finding the right harness."
  - thatxliner：自建项目即用 DS V4 Flash + Claude Code harness 实现
- **open-code（harness 语境强相关，实测极多）**：
  - 体感（christophilus）："Deepseek V4 Flash (with opencode as the harness). It's been almost indistinguishable from Codex / Claude Code for me."
  - 成本（ragebol）："spent not even $25 over 3 weeks"；59nadir："added $20 quite some time ago and somehow still have $18.77"
  - 反向（jnovek）："coming from Claude Code it did feel like going back in time by ~6 months in model capabilities"
  - 翻车（taffydavid）："pages and pages of 'actually no', 'hang on', 'wait that makes no sense'... did not fill me with confidence"
  - OpenCode Go 双倍额度（LaurensBER）："OpenCode currently offers 60 USD API credits at 10 USD per month (OpenCode Go) and have even doubled it temporarily as a promotion. Effectively you can get Deepseek for 1/12th the already ridiculous cheap API price."
- **cursor（仍无专项评测，保留 placeholder 说明）**：仅 OpenRouter 通用配置路径（m_ke："you can use these in hermes, cursor, openclaw, opencode, etc with 2 lines of config"；muzani："Cursor... includes... deepseek"）——无 CursorBench/官方联动数字，不编造。
- **openhands（仍无数据，保留 placeholder）**：HN 检索 "deepseek openhands" 仅 1 条不相关结果；OpenCode 才是实际主流入口（r/opencodeCLI public beta、官方适配 Codex）。

### 5. 与 GPT-5.6 Terra 对比（dnhkng 于 HN Update 帖整理，data.json 未收录）
- Terminal Bench 2.1：**Flash 82.7 vs Terra 78.4**（villish 纠正称 Terra 为 87.4，以 OpenAI 官方页为准存疑）
- Toolathlon：**Flash 70.3 vs Terra 53.1**
- DeepSWE：**Flash 54.4 vs Terra 69.6**（唯一明显落后项）
- Agents' Last Exam：Flash 领先（具体值截断）
- 评论区定性（NitpickLawyer）："This is more exciting than k3, IMO. Dsv4 models are extremely cheap to serve... good enough for more and more tasks."
  https://news.ycombinator.com/item?id=49119559

### 6. 关键性能/体感实测（data.json 未收录）
- **nwienert（HN 主帖热评）**："the v4 flash final is about 2.5x slower than preview making it no longer a fast model, in fact slower than Luna and bigger models in many cases."；"Reading the DS reasoning is wild, it's constantly going in circles. The most minor lack of clarity in your prompt and it will spend ages going back and forth on what you meant. It reasons 5x longer than the preview which makes it really slow now as well."——**发布后变慢是独立新叙事**（与 Preview 对比而非旧版）。
- debazel（Rust+OpenGL 实测）："DeepSeek just spend almost 2 hours trying to figure out why terrain textures were not working... I finally gave up and gave it to GPT-5.6 Luna instead, and figure out in a [minute]"——特定图形栈翻车。
- jmathai（HN 热评）："I've been using v4 flash for an app I'm building and it's amazing how cost effective and good it is... It's so cost effective I can offer a generous free tier"——生产环境应用实证。
- WithinReason："Already beat Luna on price/task, by about 2x."；minimaxir："it's 1/4th the cost of Luna"（AA 图表，log 轴读图修正）。
- VulgarExigency："Deepseek Flash just got... improved a lot at following instructions, and has become more proactive"——指令遵循改善的正面实测。
- 542458："Kimi K3 was an interesting model only a month ago, and now we're looking at the same performance for 1/20th of the price. Wild how fast this is advancing."

### 7. 本地部署新进展（data.json _sources 已有部分，补实测数字）
- taf2（4× RTX Pro 6000）："~250 tok/s for single request, ~48 concurrent requests, ~2400 agg tok/s peaking at 24-31 concurrent users. Model performance feels like gpt 5.4 - mostly using it with pi agent."（HN 热评）
- wolttam：2× DGX Spark 60 t/s 流畅（HN 评论）；spwa4：284B-A13B "should just barely run on a single B300, and it's small enough that it'll barely run on an M5 Max too"（HN 评论）
- antirez DS4 引擎（M3 Max 全速生成峰值功耗仅 50W）：https://news.ycombinator.com/item?id=48050751 （499 pts/159 评论）
- MI300X 单卡帖（382 pts/108 评论，data.json timeline 已录）：https://news.ycombinator.com/item?id=49166386

### 8. 其他社区引语（署名+身份，可入 expertQuotes）
- speu："I've been trying deepseek-v4-flash in OpenCode (via OpenRouter) and I'm blown away. It's no Opus, obviously, but it had zero issues with any regular coding task I threw at it."
- amunozo："I love DeepSeek V4 Flash and I use it extensively, it's so cheap I can use it all day and still not use all my 10$ OpenCode Go subscription."
- swiftcoder："DeepSeek v4 Flash is sufficient for basically all day-to-day coding tasks. You might want something beefier for a complicated reverse-engineering project, but it will competently one-shot a decently complex [task]."
- ggcr（HN Update 帖）："Woah, a 200B model competing with GLM-5.2 and getting close to Opus 4.8. Quite impressive. If those numbers translate well to its general capabilities, with the great caching DeepSeek has, I feel like this model will get tons of usage."
- LaurensBER（HN 主帖热评）："good enough to use it for (almost) everything and cheap enough that the cost are irrelevant. I'm running it in Oh My Pi with a second instance running as 'advisor' and even with 5-6 active sessions (effectively 12 streams) I'm struggling to spend more than 5 bucks per day."

## 二、核验修正

| 项目 | data.json 现值 | 实测修正 | 依据 |
|---|---|---|---|
| HN 主帖 49214008 热度 | 768 分/460 评论 | **772 pts / 463 cmts** | HN Algolia 实测 2026-08-09 |
| HN 主帖 49214008 性质 | 纯热度帖 | **实为 ARC Prize 结果页**（内容=ARC-AGI 成绩） | webfetch arcprize.org/results/deepseek-v4-flash-0731 |
| HN 49120299 热度 | 594/312 | 594/312 ✓ 一致 | HN Algolia |
| HN 49119559 热度 | 745/347 | 745/347 ✓ 一致 | HN Algolia |
| HN 49166386（MI300X）| 382/108（timeline） | 382/108 ✓ 一致 | HN Algolia |
| V2EX t/1210082 | 未标回复数 | **16 replies** | V2EX API https://www.v2ex.com/api/topics/show.json?id=1210082 |
| Terminal Bench 2.1 官方口径 | 82.7 | 82.7 ✓（AA 独立 79%） | api-docs.deepseek.com/updates/ |
| AA 智能指数 | v4.1.1 52 分 | ✓ 保持 | data.json 快照 |

## 三、未找到（进存疑）

1. **Reddit 全站数字无法独立复核**：Reddit search.json / old.reddit / comments.json / PullPush / jina 代理共 6 种途径均 403/空响应。r/LocalLLaMA 更新帖 1065/298、market crash 帖 609/232、r/opencode 477/72、r/DeepSeek 517/231 保留 data.json 快照值，标注为不可复核。
2. **cursor 专项评测**：无 CursorBench 数字、无官方联动声明，仅有 OpenRouter 通用配置路径——保持 placeholder 并注明配置方式。
3. **openhands 专项**：完全无数据，OpenCode 为实际主流入口——保持 placeholder。
4. **GPT-5.6 Terra 的 Terminal Bench 2.1 精确值**：dnhkng 称 78.4、villish 称 87.4（引 OpenAI 官方页），两说并存，只引用 Flash 侧 82.7。
5. **知乎浏览量/回答数**：data.json 未给知乎具体数字，本次未核验到新来源，保持"知乎问答偏正面"定性。
6. **DeepSeek 官方涨价具体幅度/日期**：官方仅称"significant increase expected"、无 ETA，社区猜测与 V4-Pro 联动未证实。
7. **0731 本地推理帧率细节**（llama.cpp PR #24162 是否已合并上游）：未核验到合并状态，antirez fork 与官方 PR 并存。
