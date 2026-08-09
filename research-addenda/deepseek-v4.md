# DeepSeek-V4 详情页深化 · 调研补遗

- 调研基准日：2026-08-09
- 手段：AgentKey MCP（余额 0.1 credits，不足 1 次调用，触发降级）→ HN Algolia / 官方站 / NIST / Simon Willison 博客 免费 API curl
- 搜索次数：AgentKey find/describe/execute 各 1 次 + 免费 API 数据抓取 20+ 次调用（HN 故事/评论/条目、官方 news 与 updates 页、NIST、Willison 两篇、Reddit 多路尝试）
- 结论：本次调研产生大量新事实，消灭 cursor harness placeholder 为实测，发布帖热度等关键数字以实测修正

---

## 一、新发现事实（带 URL）

### 1. HN 发布帖热度（最大缺口，data.json 完全未记录）
- **HN「DeepSeek v4」发布帖实测 2091 points / 1607 comments（2026-04-24）**，为全系列最大热度。
  https://news.ycombinator.com/item?id=47884971
- 发布帖 top 讨论：自托管门槛（800GB VRAM / GB200 NVL72 约 $2-3M / 8x B200 约 $500k）、与 Opus 4.7 对比（"it doesnt need to beat 4.7. it just needs to do somewhat well against it. This is free"）、易经梗 "The dragon awakes yet again!"。

### 2. 8 月初「大幅涨价」事件（data.json 完全未记录，须补 timeline/controversies）
- 2026-08-06：DeepSeek 官方在 platform.deepseek.com/usage 发布公告：**"We plan to raise the overall pricing for DeepSeek API services in the near future, with a significant increase expected. Please plan your usage accordingly."**
  https://news.ycombinator.com/item?id=49197005 （85 pts / 71 评论）
  https://news.ycombinator.com/item?id=49192693 （30 pts / 21 评论，标题 "tremendously"）
- 社区三猜测：① V4-Pro 正式版将发布且更耗资源（"about to release the final version of v4 Pro and it uses more resources than the preview did"）；② 缓存读取价过低难以为继（"incredibly low cache read prices… nothing has a bigger effect on a typical session price"）；③ 新基建投资回本（"they invested in some new infra and want to make that back over the next 10 months"）。
- 用户情绪："Well it was nice while it lasted. Built so much stuff for basically free." / "Bound to happen. I've been using the new flash and it's insane the value I've gotten."

### 3. Harness 实战评测（最大缺口，多个 harness 有实测）
- **claude-code（实测充分）**：
  - 环境变量一行接入：`export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`（DeepClaude 帖，https://news.ycombinator.com/item?id=48002136）
  - 企业级转向实证（HN 评论）："I had a call with our CTO and we are pivoting away from Claude Code to DeepClaude because the cost savings are too substantial to ignore."
  - 成本实测（HN 评论）："I've been using V4 flash consistently with Claude. Pretty great fast and darn cheap. I use it about 3h/day and so far haven't crossed $1 USD/day."（2026-05-23）
  - 负面实测（HN 评论，2026-06-25）："Deepseek v4 running in Claude Code will try to read, list, tail as many files/logs/… as it can for even the most simple task"——上下文/文件读取激进，是实际槽点。
  - 已有 data.json：DeepClaude 项目 HN 678/281、官方发布页点名 Claude Code/OpenClaw/OpenCode 集成、中文开发者「又快又好，白菜价」。
- **cursor（从占位升级为有实测）**：
  - HN 评论（2026-06-08，V4 Pro beats GPT-5.5 on precision 帖）："I run DeepSeek v4 API for most of my Cursor… Much more bang per dollar, yes. Somewhat less bang per hour." https://news.ycombinator.com/item?id=48440448
  - HN 评论（2026-05-22）："The latest deepseek v4 pro model is 2-5x cheaper than Claude Sonnet 4.6."（价格对比语境）
  - 间接路径：V4-Flash 原生支持 Responses API 并专门适配 Codex（官方 updates），可经 OpenAI 兼容端点接入 Cursor。
  - 仍无 CursorBench 官方数字（保持说明，不编造）。
- **openhands（仍无数据，保留 placeholder）**：HN 检索 "openhands deepseek" / "OpenHands V4" 均无专门实测；Reddit 被反爬无法直连。
- **open-code（开源 harness 强相关，可写入 harness 语境）**：HN 评论 "Why wouldn't you use something open source like OpenCode, which already support DSv4 and has more features than CC?"；"I tried deepseek v4 through open code at the weekend. I'm a daily Claude/Claude Code user."；8/08 帖 "Code harness for DeepSeek V4? OpenCode vs. pi vs. jcode vs. reasonix"。

### 4. Flash 0731 正式版（data.json 已有，实测补充）
- HN「DeepSeek V4 Flash 0731」帖实测 **772 pts / 463 comments（2026-08-07）**（data.json 记为 768/460，以实测修正）https://news.ycombinator.com/item?id=49214008
- top 评论实测："I've been using it extensively since the release and the best summary I can give is that it's good enough to use it for (almost) everything"；负面："It's serviceable but, like many Chinese models, it uses a lot of tokens to get work done."；"results comparable to gpt 5.6 luna but cheaper"；"Kimi K3 was an interesting model only a month ago, and now we're looking at the same performance for 1/20th of the price."
- HN「DeepSeek-V4-Flash Update」帖 745 pts / 347 评论（2026-07-31，data.json 未列）https://news.ycombinator.com/item?id=49119559
- HN「DeepSeek V4 Flash 0731 Intelligence, Performance and Price Analysis」594 pts / 312 评论（2026-07-31）https://news.ycombinator.com/item?id=49120299
- 8/09 最新：开源 harness 以公开框架复现 Terminal-Bench 2.1 82.7% —— 强化 Flash 反超数字可信度（HN 4 pts 帖）。
- 官方 updates 页 9 项 Agent 基准逐一核验 ✓（Terminal Bench 2.1: 82.7 / NL2Repo: 54.2 / Cybergym: 76.7 / DeepSWE: 54.4 / Toolathlon verified: 70.3 / Agent Last Exam: 25.2 / Automation Bench: 25.1 / DSBench-FullStack: 68.7 / DSBench-Hard: 59.6；注：Code Agent 任务用 DeepSeek Harness minimal mode、max effort、topp=0.95、temp=1.0）https://api-docs.deepseek.com/updates/
- V4-Pro 官方正式版：官方 updates 页明确 "The official release of DeepSeek-V4-Pro will follow soon"（8/09 仍未发布）。

### 5. 名家锐评（署名+身份）
- Simon Willison（知名开发者/KOL）4/24 文标题即定调："**DeepSeek V4—almost on the frontier, a fraction of the price**"；称 Pro 为 "the new largest open weights model"（>Kimi K2.6 1.1T、GLM-5.1 754B，V3.2 685B 的两倍多，HF 上 865GB）；7/31 Flash 0731 文："AA rank it ahead of MiniMax M3 (428B)"、"may currently be the best value-per-intelligence model out there"、Flash 0731 为 304B 参数 / 167GB。
  https://simonwillison.net/2026/Apr/24/deepseek-v4/ · https://simonwillison.net/2026/Jul/31/deepseek-v4-flash-0731/
- antirez（Redis 作者，本地部署圈名人）：为 V4-Flash 写专用推理引擎 DS4（"revelation… runs decently on M5 Max 128GB"，Mistral AI Now Summit 2026-05-29 被点名）；曾跑量化 V4 Pro 于 Mac Studio M3 Ultra 512GB；发布 0731 GGUF。https://twitter.com/antirez/status/2052405820235678175
- NIST/CAISI（2026-05-01 官方页核验）："DeepSeek V4's capabilities lag behind the frontier by about 8 months"（IRT 拟合，5 域基准套件）https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro
- HN 评论区高赞（Willison 帖）："Deepseek v4 Pro feels like Claude Opus 4.6 in its personality"；"I'm not sure I'd call it 'almost on the frontier,' but I do think that v4 Pro is the most usable coding model I've seen out of China"；"on par with open AIs 5.4 or opus 4.6"。
- 8/06 涨价帖评论：预测与 V4-Pro 正式版联动（"I have to assume… they are about to release the final version of v4 Pro and it uses more resources"）。

### 6. 其他
- HN「DeepSeek V4 Pro beats GPT-5.5 Pro on precision」397 pts / 225 评论（2026-06-08）—— precision 优势是独立叙事线。
- MIT Tech Review（2026-04-24）："DeepSeek V4 is a display of Huawei AI chip's capabilities"（data.json 已有，核验无误）。
- Tom's Hardware：华为团队称在 1000 颗 Ascend 910C 上 post-train 1.6T 模型（data.json 已有）。

---

## 二、核验修正（以实测为准）

| 项目 | data.json 原值 | 实测 | 处置 |
|---|---|---|---|
| HN 发布帖热度 | 未记录 | **2091 pts / 1607 cmt** | 新增进 heat（首位）+ timeline |
| HN「Flash 0731」帖 | 768 pts / 460 cmt（timeline 08-07） | **772 pts / 463 cmt** | heat 修正为 772/463 |
| HN「Flash Update」帖 | 未记录 | 745 pts / 347 cmt | heat 补充（可选） |
| HN「AA 分析」帖 | 未记录 | 594 pts / 312 cmt | 补充 |
| DeepClaude HN | 678/281 | 678/281 | ✓ 一致 |
| Willison「almost on the frontier」HN | 677/398 | 677/398 | ✓ 一致 |
| Pro 定价 | $0.435/$0.87 | 原始价 **$1.74/$3.48**，75% off 至 2026-05-31 15:59 UTC 后为 $0.435/$0.87 | costNote 补「原始价→75% off」说明 |
| Flash 0731 输出价 | $0.28 | Willison 实测记录 **$0.27/M**（0731 起） | 按 0731 记 $0.27，Preview 记 $0.28 |
| Flash 0731 参数量 | 284B（Preview） | Willison 记 304B / 167GB（0731） | 记「0731 版 304B 参数口径」入 uncertainties |
| NIST CAISI | 距前沿约 8 个月（5 月） | 官方页 2026-05-01 "lag behind the frontier by about 8 months" | ✓ 一致 |
| 官方 updates 9 项基准 | Terminal 82.7 / NL2Repo 54.2 / Cybergym 76.7 / DeepSWE 54.4 等 | 逐一核验 ✓ | ✓ 一致 |
| 1M 上下文 FLOPs/KV | Pro 27%/10%、Flash 10%/7% vs V3.2 | Willison 引论文原文一致 | ✓ 一致 |
| 75% off 截止 | — | 2026-05-31 15:59 UTC | 补日期 |
| Reddit 热度 | 多为估算（反爬不可直连） | — | 维持 data.json 口径并标注 |

---

## 三、未找到（进存疑/placeholder）

1. **OpenHands × V4 专门实测**：HN/Reddit 均无；harnessReviews.openhands 保留 placeholder，并注明 OpenCode 是开源 harness 侧最接近的实测。
2. **Cursor 官方适配声明 / CursorBench 数字**：只有用户评论实测（"I run DeepSeek v4 API for most of my Cursor"、"2-5x cheaper than Sonnet 4.6"），无官方背书——不编造 CursorBench 数字。
3. **Reddit 实时热帖数字**：Reddit JSON API（www/old/api.reddit.com）与 r.jina.ai 代理全部被反爬拦截（403/HTML 重定向），pullpush 无数据。Reddit 情绪与最高赞沿用 data.json 已有记录（DeepSWE 8% 之争、8 months 帖、morphllm 引述）。
4. **V4-Pro 官方正式版发布日期**：截至 8/09 官方仅称 "will follow soon"；涨价公告被社区解读为正式版前奏，但无官方确认。
5. **AA Intelligence Index 精确数值**：artificialanalysis.ai 页面 JS 渲染无法直抓，仅得 Willison 转述（"ahead of MiniMax M3"）。
6. **知乎/Linux.do 新数据**：知乎搜索被 CAPTCHA 拦截，中文社区维持 data.json 一轮调研成果。
7. **Flash 0731 参数量口径**：284B（Preview 架构）vs 304B（Willison 口径），未定论。

---

## 四、对详情文件的影响清单

- heat：新增「HN 发布帖 2,091 pts」；「HN Flash 0731 帖」772 pts 修正；补 Flash Update 745、AA 594（选 4 项填满）。
- harnessReviews：cursor 由占位升级为实测（2 条 HN 用户实证 + 间接路径说明）；claude-code 补企业转向 + $1/天成本 + 读文件激进负面；openhands 维持 placeholder（注明 OpenCode 替代实测）。
- expertQuotes：新增 Willison 定价句、antirez（Redis 作者/本地部署）、HN 高赞 "most usable coding model out of China"、"feels like Opus 4.6 in personality"、涨价事件预测、precision 帖、Flash "good enough for (almost) everything" / "uses a lot of tokens"、Kimi K3 1/20 价格对比等。
- timeline：补 06-08 precision 397pts 帖、07-31 Flash Update、08-06 涨价公告、08-07 Flash 0731 正式版帖、08-09 开源 harness 复现 82.7%。
- controversies：新增「8/06 大幅涨价」事件 + 官方公告原话 + 社区三猜测。
- costNote / 定价：补 Pro 原始价 $1.74/$3.48 与 75% off 至 05-31；Flash 0731 输出 $0.27。
- sources：新增 HN 发布帖/DeepClaude/Willison 两篇/NIST/updates/Flash 0731 帖等权威链接（保持 6-10 条）。
- uncertainties：新增 openhands 无数据、Cursor 无官方数字、Reddit 反爬、AA 数值缺失、Flash 0731 参数量口径、Pro 正式版日期、知乎 CAPTCHA。
