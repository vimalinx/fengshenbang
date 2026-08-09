# GPT-5（2025-08-07 初版）深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，立即降级）+ HN Algolia API + arctic-shift Reddit 归档 API + r.jina.ai 网页抓取 + DuckDuckGo HTML 搜索
搜索次数：30+ 次（HN Algolia 15 轮、arctic-shift 5 轮、r.jina.ai 抓取 6 次、DDG 3 轮、GitHub API 2 轮）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，已消灭 3 个 placeholder）

**claude-code（GPT-5 经 LiteLLM/OpenRouter 接入 Claude Code）：**

1. **HN 发布帖评论（blurbleblurble，2025-08-07）**：用 Claude Code router + OpenRouter 默认端点跑 GPT-5 的实测吐槽——「opaque, slow, ridiculously terse, botches basic tool calls and edits, pauses constantly even when I ask it not to. It does seem 'sharp' at analytical tasks but it's just clunky to work with.」——慢/啰嗦/工具调用不稳是 Claude Code 载体下的核心体感。
   URL: https://news.ycombinator.com/item?id=44854141

2. **HN 评论（c44839338，2025-08-07）**：GPT-5 用于 OpenTelemetry Collector 配置生成，「both Claude and OpenAI models struggled with before... It got the replies right on the first try. Previously, both had been tripped up by outdated or missing docs (OTel changes so quickly)」——知识截止新（2024-09-30）带来配置类任务优势；并称「For home projects, I wish I could have GPT-5 plugged into Claude's code CLI interface. iteration just works!」。
   URL: https://news.ycombinator.com/item?id=44838303（评论树）

3. **HN 评论（c44831472）**：确认 Claude Code 可用 LiteLLM 接 GPT-5（官方文档 Anthropic llm-gateway#litellm-configuration + LiteLLM claude_responses_api 教程），并引出「Claude Code but can use GPT-5 built in. Not a bad selling point」（c44830782）——社区真实搭建路径。
   URL: https://docs.anthropic.com/en/docs/claude-code/llm-gateway#litellm-configuration

4. **HN 评论（c44829145）**：「How do you hack a proxy together so you can run Claude Code on gpt-5?!」——发布日即有大量用户想给 Claude Code 换 GPT-5 内核。
   URL: https://news.ycombinator.com/item?id=44827794

5. **V2EX「把 GPT 模型接入到 Claude Code 里，使用体验怎么样？」**（t/1230496）：中文社区讨论帖，仅 2 回复，低信息量——GPT-5 经中转接入 Claude Code 属小众折腾玩法。
   URL: https://www.v2ex.com/t/1230496

**cursor（GPT-5 在 Cursor/Cursor Agent/CLI）：**

6. **latent.space 深度评测（swyx + benhylak，OpenAI 早期接入伙伴，2025-08-07）**——本轮最厚 cursor 实测：
   - 三场景 one-shot 实证：① gnarly 嵌套依赖冲突（Vercel AI SDK v5 + Zod 4），「o3 + Cursor couldn't figure it out, Claude Code + Opus 4 couldn't figure it out. **GPT-5 one-shotted it**」；② 复杂 Clickhouse 查询导出，「while o3 struggled, GPT-5 one shotted it」；③ 用 Cursor 建网站 + SQLite DB 一次成型，同 prompt 下「o3 in Cursor just gave me a plan... I've spent 10x more time than with GPT-5 (5 is fast!), and there's no app」。
   - 结论「I think GPT-5 is the closest to AGI we've ever been」，同时承认「It's actually worse at writing than GPT-4.5, and I think even 4o」。
   - URL: https://www.latent.space/p/gpt-5-review

7. **dev.to 三 IDE 对比（Bap，实测窗口 2025-08-22~24）**：同一 spec（MERN 脚手架 + 老代码库改造）跑 Cursor / Windsurf / Copilot(GPT-5)：三者都完成任务；「Cursor felt the most professional in flow/explanations, but once refused to auto-build the project from spec」；「inline speed: Cursor ≈ Copilot > Windsurf」；Cursor 显示约 400k 上下文消耗百分比（272k input + 128k output）直观；Windsurf 全自动建目录树、Copilot 测试最强但需更多批准（7 次 terminal 提示 vs Windsurf 3 vs Cursor 1）。结论「Windsurf > Cursor > Copilot for terminal/chat integration」。
   URL: https://dev.to/fernandezbaptiste/exploring-cursor-windsurf-and-copilot-with-gpt-5-22bl

8. **HN 发布帖评论（c44839465 / c44839149 / c44832785，2025-08-07）**：多个 Cursor+GPT-5 首日实测——「started reading and thinking and thinking, and it was quite repetitive」「GPT5 (in Cursor) feels smarter in isolation, but CC with Opus is faster and better at real tasks involving a large codebase」「doesn't feel all that much better compared to Claude Sonnet 4... 10% better max. It's free which is good」——免费额度是初版吸引力，体感与 Sonnet 4 差距不大。
   URL: https://news.ycombinator.com/item?id=44838303

9. **HN 评论（8thcross，44854141）**：「I tried it with cursor-agent, their cli - and it generated better code than expected... It was more thoughtful and strategic than the other frontier models.」
   URL: https://news.ycombinator.com/item?id=44854141

**openhands（OpenHands + GPT-5）：**

10. **OpenHands 官方 GPT-5 Preset（ApplyPatchTool）**：官方文档专设 GPT-5 preset 页，说明 OpenHands 对 GPT-5 有官方推荐适配（ApplyPatchTool 工作流）。
    URL: https://docs.openhands.dev/sdk/guides/llm-gpt5-preset

11. **SWT-Bench 排行榜实测**：OpenHands + GPT-5 = **79.8%（SWT-Bench Verified）/ 66.3%**，🥉 第三名；OpenHands + GPT-5-mini = 62.4% / 60.6%。OpenHands 官方 X 帖「How OpenHands+GPT-5 topped the SWT-Bench leaderboard」（status/1959964207715074421，X 需登录未能直读，WIRED 侧亦有 Cursor/Windsurf/Notion 官方背书佐证生态）。
    URL: https://swtbench.com/ ｜ https://github.com/logic-star-ai/swt-bench

12. **OpenHands Index（2026-07-31 快照）**：2026 年指数已由 Claude Fable 5（81.0%）领跑，GPT-5 初版已被后续版本（5.2-Codex 62.5% 等）取代——佐证「GPT-5 初版在 agentic 生态被迭代」。
    URL: https://benchlm.ai/benchmarks/openhandsindex

### B. 名家锐评加料（带署名身份）

13. **Simon Willison**（知名开发者、OpenAI 两周预览权，发布当天长文）：「I've been using GPT-5 as my daily-driver. It's my new favorite model... it rarely screws up and generally feels competent or occasionally impressive」「My verdict: it's just **good at stuff**. It doesn't feel like a dramatic leap ahead from other LLMs but it exudes competence」。并确认 API 三模型（regular/mini/nano）× 四档推理级别（minimal/low/medium/high），知识截止 GPT-5=2024-09-30、mini/nano=2024-05-30。
    URL: https://simonwillison.net/2025/Aug/7/gpt-5/

14. **Sayash Kapoor**（普林斯顿 CS 博士、《AI Snake Oil》合著者，WIRED 采访）：「GPT-5 is mostly outperformed by other AI models in our tests, but it's really cheap」——45 篇论文复现测试：GPT-5 medium 27% 准确率 vs Opus 4.1 51%；成本 **$30 vs $400**（约 13 倍价差）；团队已为此花约 $20,000。
    URL: https://www.wired.com/story/gpt-5-coding-review-software-engineering/

15. **Notion 官方**（OpenAI 开发者发布页背书 + X 帖）：「fast, thorough, and handles complex work **15 percent better** than other models we've tested.」
    URL: https://x.com/NotionHQ/status/1953506907924443645

16. **Kieran Klaassen**（开发者，WIRED 采访）：「OpenAI's GPT-5 is very good, but it seems like something that would have been released a year ago... Its coding capabilities remind me of **Sonnet 3.5**.」
    URL: https://www.wired.com/story/gpt-5-coding-review-software-engineering/

17. **Jenny Wang**（工程师/投资者/Alta 创始人，WIRED 采访）：GPT-5 一次完成复杂 press page 生成（此前需多轮改 prompt），但「It hallucinated the URLs.」
    URL: https://www.wired.com/story/gpt-5-coding-review-software-engineering/

18. **WIRED 报道框架**：「OpenAI appeared to be taking direct aim at Anthropic's Claude Code」——GPT-5 for developers 定位即狙击 Claude Code；并引 PC Gamer 称发布会性能图表为「a 'chart crime'」（图表数据错乱争议升级版）。
    URL: https://www.wired.com/story/gpt-5-coding-review-software-engineering/

### C. 热度数字核验（以实测为准）

| 数据点 | data.json 现值 | 实测 | 结论 |
|---|---|---|---|
| HN 发布帖 44826997 points | 2063 | **2063**（Algolia 实测） | ✅ 一致 |
| HN 发布帖 44826997 评论 | 2482 | **268 children**（Algolia items API 返回直接子评论 268，含深层嵌套，评论总数以 Algolia 搜索面 2482 计） | ⚠️ Algolia items 与 search 口径不同，沿用 data.json 2482 |
| HN Gary Marcus 44851557 | 304 pts/257 comments | **304 pts**（Algolia 实测） | ✅ points 一致 |
| HN GPT-5 关键特性帖 44827794 | 643 pts/295 c | **643 pts/295 c**（来源列表 2026-08-09 实测） | ✅ 一致 |
| HN GPT-5 for Developers 44827101 | 470 pts/268 c | **470 pts/268 c** | ✅ 一致 |
| HN GPT-5-Codex 45252301 | 396 pts（data.json 大事记 09-15） | **396 pts/31 c，2025-09-15** | ✅ 一致 |
| HN 5.1（45904551） | 11-12 发布 | **555 pts，2025-11-12** | ✅ 日期一致，新增热度 |
| HN 5.2（46234788） | 12-11 发布 | **1195 pts，2025-12-11** | ✅ 一致 |
| HN 5.3-Codex（46902638） | 02-05 发布 | **1530 pts，2026-02-05** | ✅ 一致 |
| HN 5.4（47265045） | 03-05 发布 | **1019 pts，2026-03-05** | ✅ 一致 |
| HN 5.5（47879092） | 04-23 发布 | **1580 pts，2026-04-23** | ✅ 一致 |
| Reddit 'GPT5 is horrible'（1mkd4l3） | 5110 up/1880 c | **5110 up/1880 c**（arctic-shift 归档实测） | ✅ 一致 |
| Reddit 'GPT-5 is pretty good'（1mp4oow） | 243/109 | **243 up/109 c**（arctic-shift） | ✅ 一致 |
| HN jailbreak 帖 44840973 | —（未收录） | **33 pts/9 c**（securityweek） | ➕ 新发现 |

### D. 争议与大事记补全

19. **「chart crime」图表风波（2025-08）**：WIRED 报道研究机构称 OpenAI 发布会性能对比图为「a 'chart crime'」；PC Gamer 长文吐槽「you have to think GPT-5 itself probably made them」，官方修复图反而引发更多质疑——live demo 翻车事件的主流媒体版。
    URL: https://www.pcgamer.com/software/ai/openais-performance-charts-in-the-gpt-5-launch-video-are-such-a-mess-you-have-to-think-gpt-5-itself-probably-made-them-and-the-companys-attempted-fixes-raise-even-more-questions/

20. **Red team 轻松 jailbreak（2025-08-13 前后）**：SecurityWeek 报道红队「jailbreak GPT-5 with ease」，并警告其对 enterprise「nearly unusable」——安全争议由「幻觉」升级到「护栏可绕过」。
    URL: https://www.securityweek.com/red-teams-breach-gpt-5-with-ease-warn-its-nearly-unusable-for-enterprise/

21. **GPT-5 狙击 Claude Code（2025-08-07）**：WIRED 解读「OpenAI appeared to be taking direct aim at Anthropic's Claude Code」——开发者版发布页定位「true coding collaborator」，被普遍视为对 Claude Code 主导地位的正面回应。

---

## 二、核验修正（与 data.json / 现 gpt-5.ts 对照）

1. **【事实错误修正】effort 档位**：现文件 spec 组写「effort 档位: —（系统路由自动选择）」且 uncertainties 称「GPT-5 不支持用户手动调节推理 effort 分档」——**错误**。Simon Willison 亲证 API 端三个模型均可运行在 minimal/low/medium/high 四档推理级别；WIRED 亦提到开发者可选 low/medium/high verbosity；Kapoor 测试即用「GPT-5 set to medium」。→ spec 组改为「minimal / low / medium / high（API 四档推理级别）」，从 uncertainties 删除该条。

2. **上下文窗口确认**：272K input + 128K output（Simon Willison 与 encord 技术分析双重印证），现文「400,000 tok（272K 入 + 128K 出）」正确，无需改。

3. **知识截止新事实**：GPT-5=2024-09-30、mini/nano=2024-05-30（Simon Willison）→ 可作为编程 note 里「配置类任务一次过」的归因（OTel 配置实测 c44839338）。

4. **harnessReviews 三条 placeholder 全部可消灭**：claude-code（#1-5）、cursor（#6-9）、openhands（#10-12）均有实测依据。

5. **「GPT-5 狙击 Claude Code」定位**：现文 harness 均以「无官方适配」描述——实际上 OpenAI 开发者版发布页明确定位「true coding collaborator」狙击 Claude Code（WIRED 证实），且 LiteLLM 官方文档支持 Claude Code 接入 GPT-5。表述需从「无官方适配」改为「官方定位竞品 + 社区逆向接入」。

6. **Reddit 数字**：arctic-shift 归档实测与 data.json 快照完全一致（5110/1880、243/109），可信度高，保留。

7. **SWT-Bench 数据为新增**：OpenHands+GPT-5 79.8%/66.3% 🥉 是 openhands 装备最硬的量化证据，现文完全缺失。

---

## 三、未找到（进存疑 / uncertainties）

1. **GPT-5 初版在 OpenHands Index 的精确综合得分**：Index 2026-07-31 快照已不含 GPT-5 初版（被 5.2-Codex 等取代），只有 SWT-Bench 单项 79.8%。
2. **X 互动数字实时复核**：x.com 被 r.jina.ai 403 拦截（Notion 15% 帖、Altman 600 万浏览、Gary Marcus 1034 likes 均无法直接复核），保留 data.json 快照值并以 WIRED/媒体转引佐证。
3. **V2EX/知乎上 GPT-5 经 Claude Code 的长篇中文实测**：仅找到 2 回复的低信息量帖（t/1230496），无长文实测。
4. **GPT-5 初版 Cursor 的官方 CursorBench 量化跑分**：只有 swyx/dev.to 等主观实测，无初版官方榜单分（CursorBench 是后续模型才普及）。
5. **Reddit 上 r/Cursor 与 r/OpenHands 的 GPT-5 专题长文**：Reddit search.json 全端点 403，arctic-shift 的 subreddit 搜索超时/为空，无法直接采集，仅能靠 HN/媒体转引。
6. **「GPT5 is horrible」之外的 Reddit 高赞帖实时数**：arctic-shift 单帖查询可用但批量搜索超时，其余高赞帖（4768/1416 等）沿用 data.json 快照。
