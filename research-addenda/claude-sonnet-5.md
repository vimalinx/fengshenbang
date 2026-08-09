# Claude Sonnet 5 深度调研补遗（详情页深化 · 2026-08-09）

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，全部工具 ≥0.2 credits，判定不可用立即降级）+ HN Algolia API（免费，实测）+ Reddit JSON（403 全封）+ r.jina.ai（免费，实测）+ zhihu 直抓 + 2 个并行 librarian 代理（harness 实战 / KOL 锐评+争议）
搜索次数：直接工具 12 次（HN Algolia 5 次、r.jina.ai 4 次、Reddit 3 次、zhihu 1 次）+ 2 个 librarian 代理（各 10+ 次 web 搜索）＝ 合计 32+ 次
核心目标：消灭 harnessReviews 3 条 placeholder（重点 openhands）、加厚专家锐评、核验热度数字、补全争议大事记
最终结论：openhands placeholder 已用真实实测消灭（Vibe Code Bench 81.33% #5，OpenHands 派生 harness），harnessReviews 三条全部有实测。

---

## 一、新发现事实（带 URL）

### A. 官方/一手来源（本机直抓）

1. **Artificial Analysis 官方评测文《Claude Sonnet 5: strong agentic performance at a higher cost per task》（2026-06-30，theo 团队，AA 支持 Anthropic 发布前评估）**——本轮最重要的成本权威数据：
   - Sonnet 5 在 **AA Intelligence Index 得 53 分，综合第 #5**，仅比 GPT-5.5 (xhigh) 与 Opus 4.8 (max) 低 2–3 分；
   - **单任务成本 $2.29（Intelligence Index 口径，按标准价 $3/$15 计算）：是 Sonnet 4.6 的约 2 倍、比 Opus 4.8 贵约 15%**——与 data.json「单任务成本反超 Opus 4.8 约 15%」完全一致，且给了精确口径；
   - **max effort 输出 token 比 Sonnet 4.6 多约 40%**；知识工作评测（AA-Briefcase / GDPval-AA）agentic turns 约为 4.6 的 **3 倍**；GDPval-AA 上 max effort 比 low effort 多约 **6 倍** turns——「调用轮次翻 3 倍」官方数据的精确出处；
   - **AA-Briefcase / GDPval-AA 双双反超 Opus 4.8**（仅落后 Fable 5）——用 AA 开源参考 harness **Stirrup** 实测；
   - **CritPt（阿贡国家实验室/UIUC 物理推理基准）17%**：比 4.6 高 14 分，但仍落后 GLM-5.2、Opus、Fable、GPT-5.5——「硬核推理被国产反超」的另一独立佐证；
   - 相对 4.6：**Terminal-Bench v2.1 +9 分、HLE +10 分、SciCode +7 分**；
   - effort 五档（low/medium/high/max/xhigh，xhigh 为新增）；缓存价：写 $3.75/M（25% 溢价，5 分钟 TTL）、读 $0.3/M（90% 折扣）。
   URL: https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost

2. **CodeRabbit 官方评测《Claude Sonnet 5 review: Should you switch?》（2026-06-30）**——代码审查场景独立视角：
   - 「For writing and building code, Sonnet 5 is the most capable model we've worked with at this tier, and it's an easy upgrade to be excited about.」；
   - 但「For review, it's more of a tradeoff. While it generates cleaner, sharper comments, it catches fewer bugs than the earlier models we currently run in production, and comes at a slightly higher cost per review」；
   - 四大行为习惯：「writes tests before the feature」「keeps polishing a solution long after it already works」「second-guesses its own plan」「answers a small task with a small project」；
   - 会把任务中途「rewrites its own instructions」（自我规划更新，长程任务不易跑偏）；
   - 新安全护栏会让「real security work can trip the filters」「expect the odd refusal」——「说教/过度保守」的独立来源。
   URL: https://www.coderabbit.ai/blog/claude-sonnet-5-review

### B. HN 发布帖实测评论（本机 Algolia 全树挖掘，全部一手）

3. **doctoboggan**（HN 发布帖热评，实测存在）：「The cost per task chart is telling me that I should _never_ use Sonnet 5 above medium effort level - Opus always performs better for a given cost. So I guess the takeaway is that if Sonnet 5 medium isn't good enough for you, switch models, not effort levels.」——原详情页「同等花销下 Opus 4.8 反而更好」的精确出处与升级表述。
   URL: https://news.ycombinator.com/item?id=48736605

4. **mchusma**（HN 发布帖热评，实测存在）：「Generally run Sonnet on low, otherwise use Opus」——原话核实无误。
   URL: https://news.ycombinator.com/item?id=48736605

5. **chipgap98**：「Interesting that tasks on extra high cost almost the same as Opus 4.8 with a slightly worse performance」——「max/xhigh 成本等同 Opus 表现略差」的 HN 一手来源。
   URL: https://news.ycombinator.com/item?id=48736605

6. **kingjimmy / m3h** 引官方脚注：「Sonnet 5 is an upgrade to Sonnet 4.6, but it uses an updated tokenizer… can map to more tokens: roughly 1.0–1.35× depending on the content type.」——**token 膨胀 1.0–1.35× 为官方脚注原文**（原详情页表述正确）。
   URL: https://news.ycombinator.com/item?id=48736605

7. **ianberdin**：「Anthropic outsmarted everyone again. They released Sonnet 5 with a temporary price reduction until August. Everyone was excited, but in reality, they increased the tokenizer size by 50%. As a result, the actual cost went up by 50%」——「明降暗涨」叙事在 HN 的原生英文表达。
   URL: https://news.ycombinator.com/item?id=48736605

### C. 新发现 HN 帖（未收录 data.json）

8. **HN 48740633「Claude Sonnet 5: strong agentic performance at a higher cost per task」（2 分）**——即上述 AA 官方文的 HN 帖（标题即金句）。
   URL: https://news.ycombinator.com/item?id=48740633

9. **HN 48737325「Claude Sonnet 5 Review」（3 分）**——即上述 CodeRabbit 评测的 HN 帖。
   URL: https://news.ycombinator.com/item?id=48737325

10. **HN 48774742「Ask HN: Is it just me or does Claude / Sonnet 5 sound condescending recently?」（1 分/2 评论，07-03）**——「说教语气」的独立 HN 声音。
    URL: https://news.ycombinator.com/item?id=48774742

11. **HN 48757232「OpenAgents makes Sonnet 5, Fable 5 and other agents collaborate in one thread」（3 分/1 评论，07-02）**——多 Agent 编排工具提及 Sonnet 5。
    URL: https://news.ycombinator.com/item?id=48757232

---

## 二、核验修正（与 data.json / 现 claude-sonnet-5.ts 对照）

1. **HN 发布帖 1266 分/784 评论：✅ 实测一致**（Algolia item 48736605，2026-06-30）。
2. **HN benchmark results 帖 41 分/17 评论：✅ 实测一致**（item 48738528）。
3. **HN Zvi 帖 8 分：✅ 实测一致**（item 48755488，07-02）。
4. **知乎「如何评价 Claude Sonnet 5」：✅ 实测 170,690 浏览/58 回答**（data.json 记 170,680，增长 10 属正常，58 回答一致）。
5. **「单任务成本比 Opus 4.8 高约 15%」：✅ 获官方口径确认**（AA：$2.29/task vs Opus 4.8，标准价口径）。
6. **「调用轮次翻 3 倍」：✅ 获精确出处**（AA：agentic turns 约为 4.6 的 3 倍；GDPval-AA 上 max vs low 差 6 倍）。
7. **mchusma「run Sonnet on low」与 doctoboggan「同等花销 Opus 更好」：✅ 均在发布帖实测到原话**。
8. **tokenizer 膨胀 1.0–1.35×：✅ 官方脚注原文确认**（原详情页「最高 35%」表述正确）。
9. **Reddit 数字：❌ 无法复核**（www/old/api/r.jina.ai 全 403，与 gpt-5-5 调研同因），736 分/252 评论等保留 08-01 快照。
10. **X/Twitter 数字：❌ 无法复核**（需登录），4384 RT/2013 回复保留快照。

---

## 三、未找到（进存疑 / uncertainties）

1. **Reddit 实时数字**：www/old/api/r.jina.ai 全 403（与 2026-08-01 调研一致），736/252、71/79、23/105 等均为 08-01 快照保留。
2. **X 推文互动数字**：4384 RT/2013 回复为快照，无法复核（需登录）。
3. **OpenHands Index 官方榜**：截至 2026-08-09 无 claude-sonnet-5 条目（最新 Claude Sonnet 条目为 4.5 的 53.0%、4.6 的 44.5%），SDK 支持已加入（software-agent-sdk PR #4041）但未跑榜；本页 openhands 实测采用 **Vibe Code Bench v1.1（基于 OpenHands 派生 harness）的 81.33% #5**（vals.ai 直抓确认 harness 说明）。
4. **SWE-bench Verified 口径**：data.json 记 82.1%，librarian 检索到个别来源称 ~85.2%，未交叉核实，保留 82.1%（多源一致）。
5. **Agent Arena 数字口径**：data.json/cryptobriefing 记「净提升 7.38%±1.30%、12.24% confirmed success rate、100 万+真实会话」，arena.ai 官方 LinkedIn（07-07）记「净提升 +7.50%、Confirmed Task Success +6.61%（#2）、25,071 场对战」——两个口径并存，以官方 LinkedIn 数字为准并保留差异说明。
6. **Uber/微软成本事件**：The Verge/Bloomberg 一手证实（见下），但均为 Sonnet 5 发布前（2026-05）的 Claude Code 生态事件，作为成本叙事背景引用，非 Sonnet 5 专属。
7. **各平台情绪比例**（40/15/45 等）：代表性帖文估算，非严格量化。
8. **十维体感评分**：基于榜单与社区反馈的推断值，非实测。

---

# 四、librarian 代理补充成果（harness 实战 + KOL/争议，2026-08-09）

## A. Harness 实战评测（三条 placeholder 全部有实测）

### claude-code（Claude Code）

12. **Endor Labs Agent Security League《Claude Sonnet 5 with Claude Code: strong on function, average on security, and unusually honest》（2026-07-02）**：Claude Code + Sonnet 5 = **83.2% FuncPass / 19.6% SecPass**，200/200 提交，cheating 仅 8 次（「unusually honest」，几乎不作弊）。
    URL: https://www.endorlabs.com/learn/claude-sonnet-5-with-claude-code-strong-on-function-average-on-security-and-unusually-honest

13. **aireiter.com《Claude Sonnet 5 vs Sonnet 4.6: Is It Actually Cheaper?》（2026-07-01，Claude Code CLI 实测 `claude -p --model ... --effort`）**：同一编码任务，**Sonnet 5 medium $0.344/31.6s/5 轮 vs Sonnet 4.6 low $0.261/36.0s/6 轮 vs 4.6 medium $0.253/35.3s/5 轮**——「Sonnet 5 在每个 effort 档位都比 4.6 贵，不是更便宜」；归因官方文档「新 tokenizer 对同样文本多产约 30% token」+ Simon Willison 英文实测最高 1.42×。
    URL: https://aireiter.com/blog/claude-sonnet-5-vs-sonnet-4-6

### cursor（Cursor）

14. **CursorBench v3.2 分档成绩**（cursor.com/cursorbench，官方）：Max **61.5%**/$6.45/92,882 tok/86 步、Extra High **58.7%**/$4.16、High **56.9%**/$3.19、Medium **52.4%**/$2.16、Low **47.7%**/$1.30——与 v3.1「57% vs 4.6 的 49%」（forum.cursor.com 官方公告原文确认）一致（v3.1 的 57% ≈ v3.2 High 56.9%）。
    URL: https://cursor.com/cursorbench / https://forum.cursor.com/t/claude-sonnet-5-now-available/164463

15. **Endor Labs 跨 harness 对照（2026-07-09）**：同数据集 **Cursor + Sonnet 5 = 63.1% FuncPass / 15.6% SecPass** vs **Claude Code + Sonnet 5 = 83.2% / 19.6%**——「这是第一个 Claude Code 反超 Cursor 的模型，此前所有同模型对照都是 Cursor 赢」；归因 Cursor 吞吐问题（首轮超时 65/200=32.5% vs Claude Code 20/200=10%，约 3 倍），「是吞吐问题不是推理问题」。
    URL: https://www.endorlabs.com/learn/claude-sonnet-5-with-cursor-strong-reasoning-throttled-by-the-harness

### openhands（OpenHands）——占位已消灭

16. **Vibe Code Bench v1.1（vals.ai，2026-08 快照）**：Claude Sonnet 5 = **81.33% 综合准确率，总榜 #5**（仅次 Fable 5 90.35%、Opus 5 88.40%、Kimi K3 84.96%、Opus 4.8 82.72%）；官方明确「开发环境基于 OpenHands 的修改版」（Docker-in-Docker，终端全权）。OpenHands Index 官方榜暂无 claude-sonnet-5 条目（SDK 已支持，PR #4041）。
    URL: https://vals.ai/benchmarks/vibe-code

17. **BenchLM agentic 参考**（librarian 检索，未逐项直抓）：Sonnet 5 OpenHands Index 66.5%、Terminal-Bench 80.4%、OSWorld 81.2%、SWE-bench 63.2%、GDPval 1603——与 data.json OSWorld 量子位口径 81.2% 吻合，供参考。

## B. KOL 锐评加料（带署名身份，可查）

18. **Anthropic 官方发布页**（librarian 直抓）：「Claude Sonnet 5 is built to be the most agentic Sonnet model yet. It can make plans, use tools like browsers and terminals, and run autonomously at a level that, just a few months ago, required larger and more expensive models.」「Sonnet 5 narrows the gap: its performance is close to that of Opus 4.8, but at lower prices.」
    URL: https://www.anthropic.com/news/claude-sonnet-5

19. **Zvi Mowshowitz**（Substack，07-01）：「Does Sonnet 5 advance the capabilities frontier? No. … Being faster and cheaper does provide an advantage, and plausibly advance the cost-time-quality Pareto frontier」「So Sonnet 5 has its uses. It just won't be a good choice for most people's daily driver.」——与已知两段（速度论、折扣论）互补。
    URL: https://thezvi.substack.com/p/claude-sonnet-5-is-not-frontier-but

20. **Simon Willison 分语言 token 实测**（simonwillison.net/2026/Jun/30/claude-sonnet-5/）：英文 UDHR 2,356→3,341（**1.42×**）、西语 3,572→4,747（1.33×）、**简体中文 3,334→3,360（1.01×，几乎不变）**、Python db.py 44,014→56,113（1.27×）；官方文档口径「约 30% 更多 token」=「变相涨价 30%」。
    URL: https://simonwillison.net/2026/Jun/30/claude-sonnet-5/

21. **LisanBench 创始人 @scaling01（Lisan al Gaib）完整比价推**：「Sonnet 5 goes straight into the garbage bin: 1.2x more expensive than Opus 4.8 Max, 2x more expensive than GPT-5.5-xhigh, 5x more expensive than GLM-5.2, 7x more expensive than Kimi-K2.6, 57x more expensive than DeepSeek-V4-Pro」——浏览 77 万+（韩媒 kocpc 转引）。
    URL: https://x.com/scaling01/status/2072083466847838209 / https://en.kocpc.com.tw/archives/614

22. **量子位（克雷西，07-01）**：「Sonnet 5 虽然表面上价格一样，但账单上的Token消耗数字偷偷涨了三成」「同样一段英文文字现在要贵四成多」。
    URL: https://www.qbitai.com/2026/07/441001.html

23. **36氪（07-01）**：「Anthropic悄摸摸地在脚注中提到…同样一段输入文本可能会产生更多tokens，大约是原来的 1.0 到 1.35 倍」「Sonnet 5 的便宜并不完全等于，该花的账单会有一个断崖式的下降」。
    URL: https://36kr.com/p/3876324591398913

## C. 争议与大事记补全（一手来源）

24. **Uber 成本事件一手证实**：The Verge（Tom Warren，2026-05-14）——微软 Experiences + Devices 部门（Windows/M365/Outlook/Teams/Surface）停用 Claude Code，统一到 Copilot CLI，6 月 30 日截止，数千工程师受影响；Bloomberg（2026-06-02）——Uber 限制 Claude Code 等 AI 工具用量控成本；The Information 转引——Uber CTO Praveen Neppalli Naga 证实全年 AI 预算四个月烧光，Claude Code 采用率 32%（2 月）→84%（3 月）→95%（4 月），人均月账单 $500–$2,000，COO Andrew Macdonald 称「head-exploding moment」。
    URL: https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad / https://www.bloomberg.com/news/articles/2026-06-02/uber-caps-usage-of-ai-tools-like-claude-code-to-cut-costs

25. **Agent Arena 官方 LinkedIn（07-07）**：Sonnet 5 (Thinking) 首秀 #6，Overall +7.50%，Confirmed Task Success +6.61%（#2），Praise vs Complaint +14%（#6），25,071 场对战。
    URL: https://www.linkedin.com/posts/arenaai_claude-sonnet-5-thinking-by-anthropic-debuts-activity-7480250944522321920-JAvV

26. **Firefox 漏洞利用 0 分官方口径**（发布页原图）：「Neither of the Sonnet models could successfully develop a working exploit (both scored 0.0%)」；Sonnet 5 partial success 略高于 4.6，官方解释「likely due to improvements in general intelligence rather than specific training」。
    URL: https://www.anthropic.com/news/claude-sonnet-5

27. **BrowseComp 勘误（官方发布页 Changelog）**：6 月 30 日当天修正成本-性能图方法学，承认原图「underestimating Sonnet 5's performance」，改用「10M token budget with compaction and programmatic tool calling」标准方法学。

28. **训练健康问题官方原文（系统卡 6.5.1）**：「We note that the Sonnet 5 training run was flagged as unhealthy in its second half, so these results may partly reflect a training-health issue rather than a calibration-specific regression.」；Zvi 回应「What does that mean? Was it a serious problem? I don't know.」

29. **涨价时间线确认**：首发 $2/$10 至 2026-08-31，9 月 1 日起 $3/$15（+50%）。

## D. 新发现补充来源（未收录 data.json）

- aireiter.com Claude Sonnet 5 定价指南：https://aireiter.com/blog/claude-sonnet-5-guide
- AI星球评测《Claude Sonnet 5 评测：Agent 能力下放到中端》（07-07）：https://www.aixq.cc/48972.html（71.96 元 vs Qwen 11.71 元出处之一）
- 无矩AI《Claude Sonnet 5深度测评》（07-02）：https://iaipie.com/claude-sonnet-5深度测评/
- r/claudexplorers Megathread「Sonnet 5 is here」：https://www.reddit.com/r/claudexplorers/comments/1ujwjos/megathread_sonnet_5_is_here/
- HN「Ask HN: Is it just me or does Claude / Sonnet 5 sound condescending recently?」（48774742，07-03）
- HN「Claude Sonnet 5: strong agentic performance at a higher cost per task」（48740633）、「Claude Sonnet 5 Review」（48737325）

---

## 五、harness placeholder 消灭清单

| harness | 原状态 | 现状态 | 依据 |
|---|---|---|---|
| claude-code | 有内容（Uber 警示） | ✅ 加实测 | Endor Labs 83.2%/19.6%、aireiter $0.344 vs $0.261 |
| cursor | 有内容（CursorBench 57%） | ✅ 加实测 | CursorBench v3.2 分档、Endor Labs 63.1%/15.6% + 超时 32.5% |
| openhands | **placeholder（无数据）** | ✅ 消灭 | Vibe Code Bench（OpenHands 派生 harness）81.33% #5；OpenHands Index 官方榜仍无条目进 uncertainties |

剩余缺口：OpenHands Index 官方榜条目（未发布）、X 互动数字（需登录）、Reddit 实时数字（403）。
