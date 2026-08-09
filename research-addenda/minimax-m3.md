# MiniMax M3 调研补遗（详情页深化第二轮）

调研日期：2026-08-09 · 方式：AgentKey MCP 余额不足（0.1 credits）→ 降级免费 API（HN Algolia / arctic-shift Reddit 镜像 / GitHub Search / 官方站 / 博客直抓）
搜索次数：24 次外部查询（HN Algolia×3、arctic-shift×13、GitHub×4、官方/博客×4 等）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，已补齐）

1. **Claude Code 真机实测（andlukyane 博客）**——最实的一条装备评测：
   - URL: https://andlukyane.com/blog/minimax-m3（HN 帖 https://news.ycombinator.com/item?id=48479066，2026-06-10）
   - 将 M3 接入 Claude Code，对 100 文件 / ~26k 行的旧游戏仓库做审计：**约 30 分钟**分析，产出按严重度分级报告（**12 critical / ~20 high / 30 medium / 20 low**），带文件路径与行号、推荐修复顺序。
   - 修复阶段：**约 2h40m、三阶段**，测试数 **188 → 237**，多数修复正确且有测试；但用 Opus 4.8 复核发现 **2 个 critical 回归被 M3 自己的绿测试掩盖**（① 导入路径 schema 校验与存档格式冲突；② crit 命中率在 1.05^2×level 双倍缩放）。另有 6 个修复不完整、6 个问题未动。
   - 结论原话：「M3 did a large amount of correct, well-structured work quickly. But it was my mistake to let M3 both write the tests and fix the code issues. Next time, I'll use two separate sessions for it.」（让 M3 同时写测试和修代码是错误做法）
   - 多模态实战：UI 卡死 bug 靠「截图 + DevTools 画面」15 分钟内定位到两层全局 CSS 碰撞（`.progress-text` 全屏透明遮罩），纯文字描述无法定位——「Being able to ask a model to reason about the image demonstrates the value of multimodal models」。

2. **OpenHands 官方支持（占位 → 实锤）**：
   - OpenHands 官方文档（https://docs.all-hands.dev/modules/usage/llms）将 **MiniMax-M3 列入推荐开源模型表**：`openrouter/minimax/minimax-m3`，**OpenHands Index 57.2**，在推荐表排名第二（仅次 GLM-5.1 的 58.2，高于 Kimi-K2.6 的 57.1）。
   - OpenHands PR **#16223（2026-07-31）「feat: add MiniMax M3 model selection」**（https://github.com/OpenHands/OpenHands/pull/16223）→ 原生模型选择入口。OpenHands 仓库已改名 OpenHands/OpenHands（原 All-Hands-AI/OpenHands）。
   - r/OpenHands 无 M3 讨论（arctic-shift 实测为空）→ 社区实战仍薄，但官方接入已坐实。

3. **Cursor**：
   - r/cursor 用户实测：「What models are you all using lately? I find Minimax M3 useful for most coding a...」（https://www.reddit.com/r/cursor/comments/1ugyt0e/，2026-06-16）
   - r/cursor「Any plans to add MiniMax M3 to Cursor?」（8↑/5c，https://www.reddit.com/r/cursor/comments/1ufggwa/）：评论指出 **Fireworks 已上架 M3**（https://fireworks.ai/models），Cursor 引入开源模型走 Fireworks 通道（GLM 5.2 即先例，数据不回国）。
   - 官方文档「M3 for AI Coding Tools」含 **Cursor 专门章节**（https://platform.minimax.io/docs/guides/text-ai-coding-tools）。
   - madebyaris/advance-minimax-m3-cursor-rules：Agentic-first Cursor Rules，标称「Cursor 3.7 实测 + M3 1M MSA」。（https://github.com/madebyaris/advance-minimax-m3-cursor-rules）

4. **OpenCode（额外发现）**：
   - thomas-wiegold：「it's free in OpenCode right now, and it'll be part of the OpenCode Go plan too」（https://thomas-wiegold.com/blog/minimax-m3-review/）
   - HN ricardobeat（07-21，item 48988069）：「Started a task with Kimi K3, noticed cost going up, switched to Minimax M3 continuing from the same context. Really easy to do with Crush/OpenCode. It works quite well most of the time.」——同上下文热切换实测。

5. **Agentic 体感金句**：
   - Reddit HF 权重帖（1u3wagy）daYMAN007：「yes it's perfect for agentic work. I don't like it for coding all that much, but everything else it's great. Imo i prefere it to opus in agentic workflows」（https://www.reddit.com/r/LocalLLaMA/comments/1u3wagy/）
   - Reddit 发布帖（1ttdiq0）linksus：「Love M3. Its cheap and just as good... Or better than Opus for what i use it for. It asks questions, it interacts, it just seems better!」
   - Reddit 发布帖 bramburn：「I kind of prefer m3 for long running tasks and m2.7 for small fast tasks.」

### B. 名家锐评加料（新署名）

1. **钛媒体 AIDeepDive（2026-06-03）**：标题「MiniMax M3终于来了，指标很强，但社区炒翻了」；副标「技术指标好追，破碎的信任难建」；开篇爆料「MiniMax 股价大跌 15%」与 M3 发布同日；正文「骂声确实比叫好声更响，特别是中文社区」；指出 Terminal-Bench 2 / VIBE-Pro 注释使用 **Claude Code 作为评测脚手架**（「指标里的小心思」）。（https://www.tmtpost.com/8011839.html）
2. **HN ignoramous（08-06，item 49198072）**：「MiniMax's 'token plan' ($20/mo for 1.7b tokens) is cost competitive. MiniMax M3 is equally good, if not better than DeepSeek v4, at coding」
3. **HN naught0（08-07，item 49216304）**：opencode go 用户分层：「deepseek v4 flash 打底 → 不行升 minimax m3 → GLM 兜底复杂任务」。
4. **Reddit 1tvvj6a**：cheechw「It's pretty good and very detail oriented. Does a very thorough job. But still doesn't beat the intelligence of 5.5」；sleepingsysadmin「been using a couple days. I'm loving the improvement over 2.7」。
5. **Reddit 1ttxhgi**：NoCucumber6245「M3 is amazing. Im addicted to building, im building 10x the speed than before. Its so cheap and so good.」
6. **thomas-wiegold 新语录**：「It earns a seat at the table, and at this price that's the whole point.」「Hope is not a deployment strategy.」（关于商业自托管别指望许可证自动放行）「No filler, no padding, no inventing problems to look busy. ... M3 didn't waste a single line on a fake problem.」（对比 DeepSeek V4 审计「大量噪音」）
7. **andlukyane（Andrey Lukyanenko）**：见上 A1 全部。

### C. 争议与大事记补全（新事件）

1. **M3 发布当日 MiniMax 股价大跌 15%**（钛媒体 06-03 报道，2026-06-01 当天）——「技术指标好追，破碎的信任难建」的背景。
2. **「Minimax M3 appears to have no political censorship」帖**（r/LocalLLaMA，**503↑/182c**，2026-06-05，https://www.reddit.com/r/LocalLLaMA/comments/1tuv1sv/）——社区对 M3 对齐/审查策略的讨论，热度高。注：帖内评论涉敏感政治内容，Wiki 只引用帖子的存在与热度，不转载内容。
3. **llama.cpp 生态合并**（2026-07-26）：「Minimax M3 support with MSA has been merged into llama.cpp」134↑/35c（https://www.reddit.com/r/LocalLLaMA/comments/1v7ay5h/）+「Vision Support for Minimax-M3 has been merged into llama.cpp」38↑/2c（https://www.reddit.com/r/LocalLLaMA/comments/1v7k5r1/）——本地推理生态里程碑。
4. **MiniMax 2.7T 参数模型预告**（2026-06-28，r/LocalLLaMA **586↑/233c**，https://www.reddit.com/r/LocalLLaMA/comments/1uqnqsc/「China's MiniMax Plans to Launch 2.7-Trillion Parameter Model」）；HN yowlingcat（07-19）列「Minimax M3 Pro (2.7T)」为开放权重前沿下一波。
5. **权重上线日期修正**：HF 仓库 createdAt = **2026-06-02T07:49 UTC**（API 实测），r/LocalLLaMA HF 公告帖 631↑/225c 建于 06-12/13（1u3wagy）；data.json 原记「06-13 权重上线」保留（北京时区口径），补充 HF 仓库 06-02 即建。
6. **EAGLE3 草稿模型**：MiniMax-M3-EAGLE3-GGUF（llama.cpp 兼容投机解码草稿，42↑/11c，2026-06-20，https://www.reddit.com/r/LocalLLaMA/comments/1ud6bct/）。
7. **Anthropic 大规模蒸馏指控**（背景，2026-02-24，r/ClaudeAI 2172↑/391c，「Anthropic just dropped evidence that DeepSeek, Moonshot and MiniMax were mass-distilling」https://www.reddit.com/r/ClaudeAI/comments/1rd1j8u/）——早于 M3（M2.7 时代），是 M3 发布时「信任危机」叙事的前情，Wiki 在背景层面提及。

### D. 热度数字实测核验（2026-08-09 快照）

| 指标 | data.json 现值 | 本轮实测 | 结论 |
|---|---|---|---|
| Reddit 发布帖 1ttdiq0 | 770 赞/242 评论 | **729↑/203c**（arctic-shift） | 修正为 729/203 |
| Reddit 权重预告帖 1u2uje1 | 298 赞/82 评论 | **294↑/80c** | 微调 294/80 |
| Reddit 吐槽帖 1ucduzu | 35 评论（赞 0） | **0↑/25c** | 评论数改 25，0 赞确认 |
| Reddit M3 vs M2.7 1uie1zl | 43 赞/46 评论 | **44↑/46c** | 微调 44/46 |
| **Reddit HF 权重帖 1u3wagy** | 未收录 | **631↑/225c** | 新增进 heat |
| **Reddit 无审查帖 1tuv1sv** | 未收录 | **503↑/182c** | 新增（仅事实性引用） |
| HN 48600531（vs GLM 5.2） | 55 分/19 评论 | **55pts/19c** | 确认 |
| HN 48352600（主发布） | 21 分/2 评论 | **21pts/2c** | 确认 |
| HF 下载/点赞 | 16.1 万 / 1443 | **157,921 / 1,444**（API 实测） | 修正 15.8 万/1444 |
| HF 总参数量 | 428B | **426.99B**（safetensors BF16 实测） | 修正 ~427B |

---

## 二、核验修正清单（写入详情页）

1. heat：Reddit 发布帖 770/242 → **729↑/203c**；新增 HF 权重帖 **631↑/225c**；HN 最高 55pts/19c 确认；HF 下载 **15.8 万**、赞 **1,444**。
2. spec 架构行：总参数 428B → **MoE ~427B（426.99B，HF 实测）**，激活 23B/token（DataLearnerAI 口径，Reddit Zyj 评论佐证「23b active parameters」）。
3. profile.signature / 榜单：SWE-Bench Pro 59.0% 确认（thomas-wiegold：behind Opus 4.7 64.3%、ahead of GPT-5.5 58.6% 与 Gemini 3.1 Pro 54.2%）。
4. timeline：llama.cpp MSA 合并 07-26、视觉合并 07-26、2.7T 预告 06-28、OpenHands PR 07-31 补入；06-01 补「MiniMax 股价大跌 15%（钛媒体 06-03 报道）」。
5. harnessReviews：openhands 占位 → 实锤（OpenHands Index 57.2 + PR #16223）；claude-code 补 andlukyane 真机数据；cursor 补 r/cursor 实测 + Fireworks 通道 + 官方 Cursor 章节。
6. platform 摘要全部加厚到 3-5 句、带数字与出处。

---

## 三、未找到（进存疑 / 保留占位）

1. **M3 × Cursor 的端到端跑分/体感量化**：r/cursor 仅 1 条「useful for most coding」短评（1↑/5c），无 SWE 级实测——Cursor 条目以「接入路径 + 社区 Rules 项目 + 短评」支撑，无跑分数字。
2. **M3 × OpenHands 的社区实战帖**：官方接入已实锤，但 r/OpenHands 无讨论、GitHub 无实测 issue——OpenHands 条目写官方接入事实，社区实测仍留空（不再标 placeholder，改为「官方接入已落地，社区实战数据待补」）。
3. **36氪「背刺老用户，MiniMax 吞下苦果」原文 URL**：搜索被反爬拦截，标题与叙事经钛媒体/数据源多方交叉佐证，来源列表收录时以平台名+标题列出（数据源已有转述），不虚构 URL。
4. **MiniMax 股价 -15% 的精确日期与幅度来源**：仅钛媒体 AIDeepDive 单方表述（「今天打开手机……股价大跌 15%」），未交叉验证交易所数据，进 uncertainties。
5. **M2.5 / M1（MiniMax-01）精确发布日期**：调研仅收录 M3 及 M2.7 前后线索，星座图历史节点日期为估算。
6. **Token Plan Ultra 档 token 总量**（55 亿 vs 71 亿）与「M3 in a real agent loop」推文 URL——沿用 data.json 存疑清单。
7. **LMArena / Artificial Analysis 独立子榜单分数**：截至 08-09 仍 pending（AA 仅综合分 44），所有 headline benchmark 仍为 vendor-run 自评。

---

## 四、调研消耗与降级记录

- AgentKey MCP：`agentkey_account` 实测余额 **0.1 credits**（free 计划 99% 用尽），不足以支付任何一次 Serper 搜索（0.2）→ 全程免费 API。
- 成功数据源：HN Algolia（3 次）、arctic-shift Reddit 镜像（13 次查询，覆盖发布/吐槽/对比/HF/无审查/llama.cpp 等 20+ 帖）、GitHub Search API（4 次，core 限额耗尽后仅用 search）、HuggingFace 公开 API、官方 minimax.io 文档、thomas-wiegold / andlukyane 博客、钛媒体/极客公园/AI星球原文。
- 被拦截源：Reddit 官方 JSON（403）、old.reddit（403）、DuckDuckGo HTML（202）、Bing（400）、GitHub core API（限额）。
