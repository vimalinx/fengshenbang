# Kimi K2.6 深度调研补遗（详情页深化）

- 调研基准日：2026-08-09
- 调研方式：AgentKey MCP 余额不足（0.1 credits，99% 已用）→ 降级免费 API：HN Algolia（curl 实测）、Reddit JSON（403 被墙，改用 data.json 内 2026-08-09 网关快照）、Exa Web Search（MCP 内置）、SCMP/CNBC/QZ/国会官网直取
- 搜索次数：13 次（HN Algolia 8 次检索 + Exa 4 次语义搜索 + Reddit 直连 2 次尝试失败）

---

## 一、新发现事实（带 URL）

### 1. Harness 实战评测（最大缺口，已基本补齐）

**Claude Code（消灭 placeholder，实测内容充足）**
- Medium Joe Njenga《I Tried Kimi k2.6 on Claude Code (And Forgot Opus 4.6 Exists)》（2026-04-22）：用 `ollama launch claude --model kimi-k2.6:cloud`（Ollama Cloud Pro $20/月）一条命令接 Claude Code；实测一条提示词生成 React+Tailwind 项目管理 App「组件结构干净、Tailwind 一致、CRUD 一次跑通」。
  https://medium.com/@joe.njenga/i-tried-kimi-k2-6-on-claude-code-and-forgot-opus-4-6-exists-5d9ba4c01911
- LinkedIn Ayaz Ullah Sharif《I Used Both Kimi Code and Claude Code on Real Production Code》（2026-05-05）：3 周 A/B 实测 50,000 行 Go 微服务。「30 个文件以内 Kimi 印象深刻，跨服务追踪 gRPC 依赖时开始跟丢（漏掉 Python protobuf 定义）」；「约 80% 正确，20% 差距 = merge/deploy 与周二上午调试的区别」；Kimi 便宜但评审耗时更多；结论「Kimi 用于脚手架/UI 原型/长时优化，Claude 用于生产重构/架构/调试危机」。
  https://www.linkedin.com/pulse/i-used-both-kimi-code-claude-real-production-heres-ayaz-ullah-sharif-l66bf
- Medium Manu Nayyar R《I used Kimi K2.6 for 30 days as my only coding assistant》（2026-05-01）：第 4 天取消 Claude、第 12 天弃用 Copilot；6 小时 Next.js 15 迁移不中断；「Claude 第 2 小时开始自相矛盾，Codex 生成快但构建失败时乱建议，Kimi 会读文件查证再修」；SWE-Bench Verified 80.2 vs Opus 4.6 80.8，「0.6 分差距不值 8 倍差价」；成本约为 Claude 1/8。
  https://medium.com/write-a-catalyst/i-used-kimi-k2-6-for-30-days-as-my-only-coding-assistant-here-is-what-actually-happened-91c55b4c1cd8
- HN DeathArrow（380 分帖评论）：「Getting a coding plan from Kimi.com will make coding 20x cheaper than using Anthropic. BTW, I am using it with Claude Code.」——直接用 Claude Code 接 K2.6。
- HN justech（380 分帖评论）：「I've been maining Kimi k2.6 through opencode go and openrouter for a week... same experience as Sonnet 3.5/4 late last year. Not as good or as fast as Claude Code on Opus now but definitely enough for casual/hobby use.」
- HN cmrdporcupine（710 分帖评论）：「It's probably bad harness. I had a similar bad experience with qwen max yesterday also through opencode. In the past I tried Kimi thru Claude code I might try that again」——同一模型 harness 不同体验分化。

**Cursor / Composer（消灭 placeholder）**
- 硬事实：Cursor Composer 2 底层就是 Kimi K2.5（非 K2.6），HN 276 分/168 评论热帖《Cursor Composer 2 is just Kimi K2.5 with RL》；mzl 评论称 Cursor 在 K2.5 上做了约 3 倍算力的 RL 微调。
  https://news.ycombinator.com/item?id=47452404
- HN DeathArrow（Composer 2.5 帖评论）：「Why pay for Cursor when I can use GLM 5.1, Kimi K2.6... and use whatever harness I want, including Claude Code」——不推荐为 K2 系付 Cursor 溢价，用 Claude Code 直连更划算。
- antirez（Composer 2.5 帖评论）：「How much the RL they are doing really improves Kimi K2.5 is to be seen... they combined what they had with a strong open weights model」——对 Cursor RL 包装持观望。
- @tentenco Medium：K2.6 据称 power Cursor 的 composer-2 后端（待进一步确认）。
- HN Patt_：Windsurf $20/月可访问几乎所有模型（含 Kimi）。

**OpenHands（消灭 placeholder，实测数据已找到）**
- OpenHands Index 官方评测（All Hands AI 官方指标库）：Kimi-K2.6 在 OpenHands v1.11.5 上 SWE-bench 57.14、SWE-bench-Multimodal 41.2、commit0 25.0、SWT-Bench、GAIA（部分指标 2026-05-19 补齐）。对照：claude-opus-4-7 69.66、GPT-5.4 64.28、GLM-5.1 58.24——K2.6 在 OpenHands 框架下落后第一梯队约 7-12 分。
  https://github.com/OpenHands/openhands-index-results/pull/1006
  https://huggingface.co/datasets/OpenHands/openhands-index
- Pickuma《OpenHands Review 2026》：OpenHands 模型无关（LiteLLM），"If a better model ships next quarter, you swap one config line"——K2.6 作为模型接入 OpenHands 的可行性背书（无 K2.6 专属实测，属通用机制）。

**opencode（补充）**
- HN kmike84（K2.7-Code 帖，2026-06-12）：「I've used Claude Code (with Opus mostly), and then switched to opencode (mostly with Kimi 2.6)... Claude Code is better. But Opencode + kimi 2.6 is workable, which is big. Kimi is in between - it brings back 'lazy prompting' workflow, and I can trust its plans more」——opencode+K2.6 可用但不如 CC。
  https://news.ycombinator.com/item?id=48502347
- HN vidarh（MiMo Code 帖，2026-06-12）：「Kimi quickly collapses into tool calling loops without measures in their CLI but not in Claude Code and is largely useless for any long running tasks in harnesses not taking this into account. With those measures it can at times perform at Sonnet level.」
  https://news.ycombinator.com/item?id=48490826
- Reddit r/LocalLLaMA《Kimi K2.6 opencode go 体验》https://www.reddit.com/r/LocalLLaMA/comments/1k9g1h1/kimi_k26_opencode_go/

**Kimi Code 官方 CLI（新增维度）**
- @tentenco Medium：Kimi Code（2026-01 推出）GitHub 6400+ stars，K2.6 为其默认后端；`/yolo` 自动批准模式、Agent Swarm 模式、MCP 集成、图像/视频 ReadFile 工具。
  https://medium.com/@tentenco/kimi-k2-6-kimi-code-review-saving-88-coding-costs-b7e8c5eaf5f1

### 2. 争议与大事记补全

**DoorDash 使用 K2.6 遭美国国会调查（重大新增）**
- 2026-07-31：House Select Committee on China 主席 John Moolenaar + House Homeland Security Committee 主席 Andrew Garbarino 联名致函 DoorDash CEO Tony Xu，要求 8 月 14 日前披露所用中国模型清单与安全测试，8 月 21 日当面简报。起因：DoorDash 联合创始人 Andy Fang 在 X 透露将低层级 AI 工作路由给 Moonshot 的 Kimi K2.6，把 Anthropic Fable 5 留给最难任务。
- DoorDash AI 研究实验室 X 帖：「Kimi K2.6 和 Fable 5 大幅优于其用过的其他 Anthropic 模型（包括更便宜的 Sonnet 4.6 / Opus 4.8 harness）」。
- 其自研 DashBench 数据：K2.6 scout + Claude Fable 5 reviewer 组合在 105 例有效子集上 weighted recall 65.2%、weighted F1 75.3%，单 PR 成本 $3.81。
- 背景：国会 4 月已就 PRC 开源模型发函 Anysphere(Cursor 母公司)/Airbnb；7 月 22 日白宫 OSTP 主任称 Moonshot 可能运营隐蔽平台对美国模型做大规模蒸馏。
  https://www.scmp.com/news/china/diplomacy/article/3362616/us-lawmakers-investigate-doordashs-use-moonshot-ais-kimi-k26-model
  https://www.cnbc.com/2026/07/31/us-lawmakers-doordash-chinese-ai-models.html
  https://homeland.house.gov/2026/07/31/chairmen-garbarino-moolenaar-continue-joint-investigation-into-security-risks-posed-by-prc-open-weight-ai-models/
- HN 同步有 DoorDash 帖：11 pts / 4 comments。https://news.ycombinator.com/item?id=49130703

**NVIDIA NIM 下架（已确认）**
- r/kimi 帖《Kimi K2.6 model removed from Nvidia Nim》54 赞，佐证 K2.6 deprecated 状态。
  https://www.reddit.com/r/kimi/comments/1uri23j/kimi_k26_model_removed_from_nvidia_nim/

**Modified MIT 许可证商用门槛（新细节）**
- 月活超 1 亿或月收入超 $2000 万需在 UI 显著位置署名 "Kimi K2.6"（towardsai 报道）。

### 3. 名家/机构锐评加料

- Simon Willison（K3 发布博客，2026-07-19）：「Moonshot 自报私有长程知识评测 K3 Elo 1547，较 K2.6 +732，仅次 Claude Fable 5」；「K3 token 用量较 K2.6 少 21%」——反衬 K2.6 的 token 冗余问题是真实短板。
  https://simonw.substack.com/p/kimi-k3-and-what-we-can-still-learn
- Ethan Mollick（Lem Test）：74 页思维链仅得「okay-ish」答案（data.json 已有，复核一致）。
- nikcub（HN 评论）：K2.6「below sonnet and opus 4.0 on capability」「does only slightly better than Kimi K2.5」。
- regularfry（HN 评论）：「Dirt cheap on OpenRouter for how good it is.」
- @teortaxesTex（X）：K2.6 约 30 分钟思考解出 AIME 2026 第 15 题，K2.5 做不到。
- HN 结构性评论：「Funny that Chinese companies are pioneering possibly the world's most important tech via open source while the US goes closed.」
- 企业背书（LinkedIn 文章转载）：Vercel「Next.js benchmark 提升 50%+」、Factory.ai「自家 benchmark +15%」、Kilo.ai「SOTA 级性能、零头价格」、Augment Code「大代码库手术级精准」。
- Yuchen Jin（@Yuchenj_UW）「An S-tier open-source model team.」（data.json 已有）。

### 4. 热度数字实测（HN Algolia 实测核对）

| 帖 | data.json 现值 | Algolia 实测 | 结论 |
|---|---|---|---|
| 发布帖 47835735 | 710 pts / 372 评论 | **710 pts / 372 评论** | ✅ 完全一致 |
| 盲测帖 47993235 | 380 pts / 219 评论 | **380 pts / 219 评论** | ✅ 完全一致 |
| code-preview 47757774 | 14 pts / 5 评论 | **14 pts / 5 评论** | ✅ 完全一致 |
| K2.6 帖 47835858 | — | 40 pts / 1 评论 | 新增（重复帖） |
| 5.6x throughput 47846891 | — | 11 pts / 2 评论 | 新增 |
| Kimiflare 48108407 | — | 5 pts / 0 评论 | 新增 |
| DoorDash 49130703 | — | 11 pts / 4 评论 | 新增 |

**710 分发布帖新增热评**：Balinares「open weights Opus ballpark is seismic」；corlinp「11X less than Opus for similar smarts」；pt9567「$0.95/$4... if anywhere near opus 4.6 that's incredible」；lbreakjai「on par, if not better, than opus」；Aeolun「not quite Claude level. API has constant capacity issues. Price/quality is absolutely bonkers」；NitpickLawyer「run close-to-SotA models locally on ~100k worth of hardware」。

**380 分盲测帖新增热评**：magicalhippo「definitely a frontier-sized model」；echelon「open weights on H200s = far more opportunity to build products」；mpeg/SeriousM「K2.6 只参加最后 5 场挑战（claude 此前称霸），只算参加场次则第一」；slashdave「排名受赛制影响，对日常编程参考有限」；zorked「Kimi CLI inside Zed, $20 订阅，favorite model by far」；DeathArrow「coding 20x cheaper，正用 Claude Code 接」。

### 5. 定价来源差异（新增解释）

- Medium/@tentenco：$0.60/$2.50（官方 API 报价）；towardsai：$0.60/$3.00；DataLearner/AA：$0.95/$4.00；benchr：$0.95/$4.00。推测为发布早期价格调整或端点差异，取主流 $0.95/$4.00，存疑进 uncertainties。

---

## 二、核验修正（以实测为准）

1. **HN 发布帖 710/372、盲测 380/219、code-preview 14/5**：三项数字全部与 data.json 一致，无需修正。
2. **expertQuotes 中「HN 380 分/219 评论」归属**：现文件写在「编程」note 中，正确（帖子 47993235 实测 380/219）。
3. **AI 智能指数总花费**：data.json 记录 $840.64（评测 Intelligence Index 花销），现文件未用——补入 benchmarkGap/notes 作为具体数字。
4. **Reddit 赞数**（2026-08-09 网关快照，与 data.json 一致）：slowburn 253、NOT worth hype 131、mighty turtle 92、Unsloth GGUF 105、isn't really worth it 51、NOT an Opus replacement 6/48、vs Opus 4.7 autonomous 61、windsurf 11、or DeepSeek V4 27、huggingface 208k 45、Nvidia Nim 54——全部维持现值，heat 中「Reddit 最高赞 253」正确。
5. **OpenHands placeholder → 实测**：现文件 harnessReviews.openhands 为 placeholder，现补 OpenHands Index 官方评测数据（SWE-bench 57.14 等）。

---

## 三、未找到（进存疑 / 保留 placeholder）

1. **Cursor × K2.6 的专门实测**：搜到的是 Cursor Composer 2 基于 K2.5 的报道与 K2.6 可经 CCProxy/QuickSilver Pro 等接入 Cursor 的机制信息，未找到「Cursor IDE 内直接跑 K2.6」的第一手实测帖——cursor harnessReview 用 Composer 2=K2.5 事实 + DeathArrow/antirez 评论替代（非 placeholder，但注明非 K2.6 原生实测）。
2. **OpenHands × K2.6 的社区口碑帖**：有官方 Index 数据但缺社区体感帖（r/LocalLLaMA 无 OpenHands×K2.6 专门讨论），openhands harnessReview 以官方评测数据为主。
3. **X 上负面声音**：X 平台负面罕见（data.json 已存疑），维持「X 上负面较少可见」表述。
4. **Reddit 旧帖 'Your experiences in the wild'（1stfiwe）**：已删除（DeletedSubredditPost），内容与赞数无法复核——现文件不引用该帖赞数。
5. **DoorDash DashBench 具体页面 URL**：报道引用了数字（65.2% recall / $3.81 per PR）但未给出可直连的 DashBench 原文链接，sources 仅收录 SCMP/CNBC 报道。
6. **AIME 2026 分数双版本（官方 93.3% vs DataLearner 96.4%）**：仍未解决，维持双版本存疑。

---

## 四、对详情文件的落地清单

- harnessReviews.claude-code：用 Joe Njenga 实测 + Ayaz 3 周 A/B + Manu 30 天 + DeathArrow/justech HN 评论，写足实测。
- harnessReviews.cursor：Composer 2=K2.5 RL（276 分帖）+ DeathArrow「用 CC 直连更划算」+ antirez 观望，注明非 K2.6 原生实测。
- harnessReviews.openhands：OpenHands Index 官方数据（SWE-bench 57.14、multimodal 41.2、commit0 25.0）+ Pickuma 机制背书。
- controversies：新增「DoorDash 国会调查」事件（含 8/14、8/21 截止日与 DashBench 数字）。
- timeline：补 05-15（OpenHands multimodal 评测提交）、07-31（DoorDash 国会调查）、08-01（HN DoorDash 帖）。
- expertQuotes：补 Simon Willison（+732 Elo 反衬）、nikcub、regularfry、@teortaxesTex、corlinp、Balinares、DoorDash AI 实验室、Vercel 企业背书。
- heat：维持 710/372/253/20.8 万，全部核验一致。
- sources：新增 SCMP、CNBC、homeland.house.gov、OpenHands Index、Joe Njenga Medium、Ayaz LinkedIn、Manu Medium、@tentenco Medium、Simon Willison、towardsai。
