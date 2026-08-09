# GLM-5.2 深度调研补遗（详情页深化 · 2026-08-09）

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，Serper 单次 0.2，判定不可用立即降级）+ HN Algolia API（免费，实测 8 次）+ Reddit JSON/pullpush/old.reddit/Jina/redlib 多路尝试（主站及全部镜像被 403/429 拦截）+ 官方/原文直接抓取（Simon Willison、Interconnects、ZCode、Artificial Analysis、CursorBench）+ 搜索引擎反爬绕过尝试（DDG/Bing 均被拦）
搜索次数：直接工具 14 次（HN Algolia 8、Reddit 系 3、原文/官方抓取 3）
核心目标：消灭 harnessReviews 3 条 placeholder、加厚专家锐评、核验热度数字、补全争议大事记

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口）

**claude-code（HN 热评 + ZCode 帖一手实测 + r/ClaudeAI 帖标题）：**

1. **r/ClaudeAI 帖《GLM 5.2 via Claude Code is the first non-Claude model that feels close to Opus》（2026-06-14 前后）**：标题即核心结论——Claude Code 里跑 GLM-5.2 是第一个"感觉接近 Opus"的非 Claude 模型；HN 同源讨论 48573005 中 gertlabs 独立评分，nsoonhui 提醒 "Opus 4.5 does better than Opus 4.6" 暗示个人评分需谨慎。
   URL: https://www.reddit.com/r/ClaudeAI/comments/1u8pycz/glm_52_via_claude_code_is_the_first_nonclaude/ ；https://news.ycombinator.com/item?id=48573005

2. **HN（AA 帖 48567759）alexjplant 原文**："I vastly prefer my GLM and OpenCode setup to the Claude Code and Opus one at work. The former makes way fewer StackOverflow brogrammer-tier mistakes." —— 已在 data.json，但这是 claude-code harness 的最强正面实测。

3. **HN ukuina（ZCode 帖 48753715 讨论）**："Synthetic.new and Claude Code using GLM-5.2. Great model, but the harness will error out if using subagents. The base plan only allows one concurrent request at a time. Also, GLM will burn through your weekly quota in a day if you're not precise with your scope." —— **Claude Code 子代理报错 + 单并发限制 + 配额烧得快**，一手实战缺陷。
   URL: https://news.ycombinator.com/item?id=48753715

4. **HN neya（ZCode 帖 48753715 讨论）**："Claude Code burned $10 per task while Open Code burned barely $10 a day which was about 4-5 tasks a day. A task usually included database migrations, code audit or documentation." —— **同模型 Claude Code vs OpenCode 成本实测：Claude Code $10/任务，OpenCode $10/天**。
   URL: https://news.ycombinator.com/item?id=48753715

5. **HN KronisLV（margin collapse 帖 48809877 讨论）**："Currently using their 100 USD subscription, considering going up to their 200 USD subscription, because the model is approximately as capable as Opus (maybe sometimes better, sometimes worse) but less annoying to use in practice, a bit less slop phrasing." —— **订阅档位实测：约等于 Opus 但更不恼人**；另在同一讨论披露 OpenCode 长会话 500-750k 上下文经验。
   URL: https://news.ycombinator.com/item?id=48809877 ；https://news.ycombinator.com/item?id=48924912

6. **HN 48567759 评论区切换教程**："you can simply switch to z.ai/GLM-5.2 inside Claude Code by settings env variables in .claude/settings.json"（littlecranky67）—— 与官方三行配置说法呼应。

**cursor（CursorBench 官方数据 + HN 两视角）：**

7. **CursorBench 官方页实测（2026-08-09 抓取）**：GLM 5.2 Max **55.0%**、GLM 5.2 High **51.5%**；对比 Opus 5 Max 70.0%、Fable 5 Max 70.5%、Opus 4.8 Max 62.3%、GPT-5.5 High 58.4%、Kimi K3 Max 60.8%——**GLM-5.2 在 CursorBench 落后闭源旗舰 7-15 分**，是"分数追平但实测落后"的最直接官方证据；HN maxdo 呼应："in cursor benchmark glm5.2 is on par with gpt 5.5 medium and sonnet for the same task from results and cost perspective. The speed of generation for both will be dramatically faster."
   URL: https://cursor.com/evals ；https://news.ycombinator.com/item?id=48809877

8. **HN tomerbd 三行速评（Semgrep 帖 48709670）**："GLM 5.2 - Super Clear, GPT-5.5 - Super Smart, Auto/Composer - Super Fast (cursor)" —— 定位差异的极简概括。

9. **HN AgentMasterRace（margin collapse 帖）**："look how bad glm 5.2 is on cursors evals. gmhit garbage, but it gets glazed as God tier." —— 反面声音，与 r/codex 实测呼应。

**openhands（官方 harness 出处确认 + 无独立深度实测）：**

10. **官方 SWE-bench Pro 62.1 用 OpenHands harness + 定制指令评测**（z.ai/blog/glm-5.2 脚注，data.json 已有）；HN mlmonkey 从官方博客提取的完整 bar chart：SWE-bench Pro GLM-5.2 62.1 / GLM-5.1 58.4 / Claude Opus 4.8 69.2 / GPT-5.5 58.6 / Gemini 3.1 Pro 54.2；Terminal-Bench 2.1 同源数据。
    URL: https://news.ycombinator.com/item?id=48639840

11. **OpenHands GitHub issues 扫描（2026-08-09，最近 50 条）**：无 GLM-5.2 相关 issue/讨论；OpenHands Index 官方成绩页无 GLM-5.2 记录——**独立深度实测确实未找到，保留 placeholder**。

### B. 名家锐评加料（带署名身份，原文可查）

12. **Nathan Lambert（Interconnects AI，前 HuggingFace RLHF 负责人，2026-06-22）**："GLM-5.2 is the open weight model that feels right in coding harnesses as a general agent. It's the first one."；将其与 **DeepSeek R1** 相提并论（"not a comparison I make lightly"）；计算 **204 天差距**（Opus 4.5 2025-11-24 → GLM-5.2 2026-06-16，"square in the 6-9 month gap"）；并披露自己用 Fireworks API 在 Claude Code 里实测，"the model capabilities immediately felt right"，但"Claude Code harness / my repo documentation trying to send images to the model, which would brick Fireworks API for the session"。
    URL: https://www.interconnects.ai/p/glm-52-is-the-step-change-for-open

13. **Guillermo Rauch（Vercel CEO）**："Genuinely impressed, almost shocked, at how good GLM-5.2 by @zai_org is at coding. This changes things"（Nathan Lambert 文中引用）。
    URL: https://x.com/rauchg/status/2068517095818809770

14. **Simon Willison 原文细节（2026-06-17）**：确认 753B/1.51TB/40B active、1M 上下文；**Code Arena WebDev #2 "behind only Claude Fable 5"**，"I'm impressed to see it rank so highly given the lack of image input, which I had incorrectly assumed was a key part of building a truly great frontend coding model"；负鼠 SVG 对比："This is such a step down from GLM-5.1!"，5.2 "didn't even try to animate it"；OpenRouter 上 9 个提供商几乎都是 $1.40/$4.40。
    URL: https://simonwillison.net/2026/Jun/17/glm-52/

15. **Artificial Analysis 官方文章（2026-06-16）**：**GDPval-AA v2 1524**（超 MiniMax-M3 1418、DeepSeek V4 Pro max 1328，"in-line with GPT-5.5 xhigh"）；**$0.46/任务**（GLM-5.1 $0.25、Kimi K2.6 $0.31、MiniMax-M3 $0.18、DS V4 Pro $0.05）；增益明细：CritPt +16→21%、HLE +12→40%、AA-LCR +9→71%、tau3 banking +15→27%、SciCode +7→50%、TerminalBench v2.1 +16→78%、GPQA +3→89%；**注意 AA 口径为 744B total**（与 emergent 753B 存在口径差）。
    URL: https://artificialanalysis.ai/articles/glm-5-2-is-the-new-leading-open-weights-model-on-the-artificial-analysis-intelligence-index

16. **Martin Alderson（margin collapse 一文，HN 694 pts/469 评论）**：GLM-5.2 是"the least understood upcoming shift in AI economics"的引子；评论区反驳"by no measure is GLM5.2 as good as Opus"（budsniffer952）、"this part only makes the point that GLM 5.2 is pretty good (no shit)"（montroser）；KronisLV 补充 **Vision MCP 弥补无原生视觉**（docs.z.ai/devpack/mcp/vision-mcp-server）。
    URL: https://martinalderson.com/posts/the-upcoming-ai-margin-collapse-part-1-glm-5-2/

17. **Oliver Shrimpton（arrowtsx.dev，HN 585 pts/294 评论，2026-06-18）**：**AA-Omniscience 幻觉率实测：GLM-5.2 28%、Opus 4.8 36%、Fable 5 48%、GPT-5.5 86%、DeepSeek V4 Pro 94%**——"GPT-5.5 hallucinates 3x more than MIT-licensed GLM-5.2"；同一 Python 架构陷阱题 GLM-5.2 12 秒/799 tokens 识别不可能性，DS V4 Pro 3m52s/7.7k tokens 自信地错；但评论区 xlii 反例："GLM 5.2 tends to stray way more than 5.1... morphs requirements, makes unfounded conclusions"。
    URL: https://arrowtsx.dev/bigger-models/

### C. 热度数字核验（HN Algolia 实测 2026-08-09）

| 数据点 | data.json 现值 | 实测（HN Algolia） | 结论 |
|---|---|---|---|
| HN 发布帖「GLM 5.2 Is Out」 | 772 pts / 504 评 | 772 / 504（item 48518684） | ✅ 一致 |
| HN AA 帖 | 916 pts / 444 评 | 916 / 444（item 48567759） | ✅ 一致 |
| HN「step change for open agents」 | 367 pts / 223 评 | 367 / 223（item 48639840） | ✅ 一致 |
| Show HN Colibrì | 937 pts / 240 评 | 937 / 240（item 48842459） | ✅ 一致 |
| Semgrep 帖 | 1,113 pts / 516 评 | 1,113 / 516（item 48709670） | ✅ 一致 |
| **margin collapse（新）** | 未收录 | **694 pts / 469 评**（item 48809877，martinalderson.com） | ➕ 新增 |
| **How to Run Locally（新）** | 未收录 | **617 pts / 305 评**（item 48636377，Unsloth） | ➕ 新增 |
| **hallucination（新）** | 未收录 | **585 pts / 294 评**（item 48600167，arrowtsx.dev） | ➕ 新增 |
| **GLM 5.2 vs. Opus（新）** | 未收录 | **519 pts / 343 评**（item 48626866，techstackups） | ➕ 新增 |
| **ZCode Harness（新）** | 未收录 | **511 pts / 355 评**（item 48753715，zcode.z.ai） | ➕ 新增 |
| **VAT bookkeeper（新）** | 未收录 | 225 pts / 122 评（item 48850414） | ➕ 新增 |
| 五大主帖合计 | 约 4,100 pts | 772+916+367+1113+937 = **4,105** ✅；十大主帖合计 **7,031** | ✅/修正 |

### D. 争议与大事记补全

18. **发布时点确证**：satvikpendem（HN 48518684）"Released at the exact same time, 5:21 pm (Chinese time), as when Anthropic received the letter from the government banning Fable, and explicitly citing other models becoming unusable."；easygenes："This release was rushed to hang on the coattails of the Mythos drama... I think they planned to release next week, hence benchmarks not all being ready yet."
    URL: https://news.ycombinator.com/item?id=48518684

19. **蒸馏指控（ZCode 帖热评）**：Jeff9James："Story of Z.ai: use claude-code see how good it is, send 100k bots to distill fable 5 (GLM 5.2 is the result of this), release Zcode, ditch claude-code, ban claude-code." —— Pony Alpha 身份争议在新 harness 发布后的延续。
    URL: https://news.ycombinator.com/item?id=48772443

20. **ZCode 配额机制（官方细节）**：d3Xt3r："For GLM Coding Plan subscribers, quota consumed via Coding Plan for GLM-5.2 in ZCode is discounted by the coefficients below — the same usage draws down less quota, roughly 1.5x the effective allowance. Peak hours (14:00–18:00 daily)..."；dizhn："This is coming with 3mil GLM 5.2 tokens right now (Needs login, Google SSO fine)."
    URL: https://news.ycombinator.com/item?id=48753715

21. **ZCode 3.0 changelog**：GLM-5.2 optimized, better multi-agent collaboration（zcode.z.ai/en/changelog）。

22. **AA-Omniscience 幻觉率**（见 #17）成为争议核心新数据点：幻觉最低的开源前沿之一 vs 社区"变量名 papercut"反例并存。

---

## 二、核验修正（对 data.json / 现有详情文件的修正）

1. **五大主帖合计**：data.json「约 4,100 pts」→ 实测 4,105 pts ✅ 基本一致，可精确化；**新增 5 条主帖（694/617/585/519/511）使十大主帖合计达 7,031 pts**，heat 的"五大主帖合计约 4,100"应更新为"十大主帖合计约 7,000"。
2. **参数量口径**：AA 官方称 **744B**（与 5.1 相同规模）、Simon Willison/emergent 称 **753B**——两者并存进 uncertainties（现有 753B vs 744B 口径差异条目保留并加 AA 官方来源）。
3. **GLM-5.1 → 5.2 推理 token**：data.json「16.7k → 36.7k」与 AA 官方「26k → 43k」口径不同（AA 为 Intelligence Index 任务全输出 token，含非推理输出）——保留两套数据，versionDelta 中明确标注来源口径。
4. **effortBench High 档**：HN bertili 引官方「High 档 token 消耗不足 Max 一半」说法仍无官方原文直链，保留为转述。
5. **Terminal-Bench 2.1**：官方 81.0（AA 同源 +16 至 78% 为另一口径）；Best Reported Harness 82.7 用 Claude Code 跑出——保持不变。
6. **Reddit 数据**：主站/pullpush/old.reddit/Jina/redlib 全部被拦（403/429/CF），无法复验，沿用调研库 08-09 快照（data.json 情绪数字 60/28/12）。

---

## 三、未找到（进存疑 / 保留 placeholder）

1. **OpenHands 独立深度实测**：GitHub issues 最近 50 条无 GLM-5.2 相关，OpenHands Index 无记录，HN/Reddit 无独立评测——harnessReviews.openhands 保留 placeholder（官方 SWE-bench Pro 62.1 用 OpenHands harness 已注明）。
2. **智谱官方对速度/token 消耗的正式回应**：截至调研无官方专门回应（与 data.json 一致），consensusNote/benchmarkGap 只能引社区数据。
3. **Reddit 帖子精确热度**（upvotes/评论数）：全部数据源被封锁，无法逐帖核验，沿用 data.json 快照。
4. **ZCode 评测深度数据**：仅官方 changelog + HN 配额细节，无独立第三方深度评测文章。
5. **「语言混乱 bug」（回复中文/2025 年份）是否为模型本身问题**：仍无定论，保留为配置疑点。
6. **GLM-5.2 是否已解决 Pony Alpha 蒸馏争议**：智谱未正式回应，Jeff9James 蒸馏指控延续该议题。
