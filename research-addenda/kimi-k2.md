# Kimi K2（0711 初版）深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，立即降级）+ HN Algolia API + Exa Web Search + Linux.do/V2EX 原文抓取
搜索次数：15+ 次（HN Algolia 8 轮、Exa 6 轮、Reddit 尝试 4 次被 403 拦截）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，已消灭 3 个 placeholder）

**claude-code（K2 经 Anthropic 兼容 API 接入）——本轮最厚收获：**

1. **Linux.do 真实 golang 项目实测（100M+ tokens）**：纯后端 1.5 万行 go 项目，1/3 重构+新增功能，`kimi-k2 + claude code` 全流程 900+ 请求、100M+ tokens、总花费不到 50 元人民币、近乎零手写代码完成。关键细节：
   - 「最大的感受就是慢，真 TMD 的慢……单文件修改 200~300s，多文件重构有时候 800s+」
   - 「虽然慢，但是和 claude code 搭配是真流畅，调用各种工具(Read/Write/Update/Bash/Grep…)没出过一点问题，好评+++」
   - 「生成的代码过关，很遵循提示词；单测生成不行，很少能一遍过，需反复改 1~2 次」
   - 并发限制：免费额度并发 1，需累计充值 ¥50 解锁并发 50 才能丝滑使用 Claude Code
   - URL: https://linux.do/t/topic/809833 （2025-07-23）

2. **V2EX「对 claude code 中的 kimi-k2 表现有些失望」**（2025-07-22）：中等强度 PHP 需求实测，第一版代码架构惊喜但 review 时幻觉严重——导入不存在的类、调用方法参数错误、调用不存在的方法；让模型修复后问题依旧；换新 session 单独修导入问题有效，但签名错误修不动；花费 ¥15 仍无法进入逻辑验证。作者归因：PHP 支持弱 + Claude Code 为自家模型优化 + 上下文过短频繁压缩。
   URL: https://www.v2ex.com/t/1146800

3. **V2EX「用 Kimi K2 替换 Claude Code 默认模型」**（2025-07-12）：「感谢 Kimi K2，让穷人也用上了 Claude Code」；痛点=国内官方封号严重+其他 API 贵；体验尚可，页面画得还行；自由账户并发 1、累计充 ¥50 解锁并发 50。
   URL: https://www.v2ex.com/t/1144831

4. **Thoughtworks 专访 Zhenjia Zhou**（2025-07-18，Thoughtworks 软件工程师）：K2 发布当天即接入 Claude Code 做后端 python。「Claude Sonnet 4 一个任务 $10-20，K2 十个类似任务只要 50 元人民币（$7）」「可以开十个 Claude Code 实例并行跑十个任务」「K2 很慢，上下文比 Sonnet 4 小」「Claude Code 不是 K2 最好的载体——就像 Claude Code 的身体里装了一个不同的灵魂」。
   URL: https://www.thoughtworks.com/en-us/insights/blog/generative-ai/kimi-k2-whats-fuss-whats-like-use

5. **dev.to 实测（composiodev，2025-07-23）**：Claude Code 同时驱动 Sonnet 4 与 K2，前端+agentic 两组对比——K2 输出 34.1 tok/s vs Sonnet 4 91.3 tok/s；同 token 量 K2 花 $0.53 vs Sonnet 4 花 $5（近 10 倍价差）；K2 前端/agentic 代码质量「稍微更好一点」；「等 K2 生成像等一个世纪」。
   URL: https://dev.to/composiodev/is-kimi-k2-actually-better-than-claude-sonnet-4-for-coding-i7a

6. **Long Wang 集成实录**（2025-09-15，个人博客）：配置 `kimi-k2-0905-preview` 进 Claude Code（api.moonshot.cn/anthropic）。免费额度 RPM 3/TPM 32k 对 Claude Code 完全不可用，充 ¥50 后流畅；体感比 DeepSeek/GLM-4.5 慢；代码质量「可用但不惊艳，常需人工修正」；结论：保留作 backup。
   URL: https://wanglong.cv/articles/claude-code-with-kimi-k2/

7. **Superlinear Academy 深度评测**（中文）：Claude Code 环境下「文件路径处理有自己的偏好，读写文件反复失败；日志里找不到要替换字符串的错误是贯穿始终的模式」「像讲着带不同口音的同一语言」；归因 Claude Code 为 Claude 定制 + K2 128K 上下文在 agentic 场景被塞满导致推理中断；但赞其「任务执行韧性（bias for action）」——多轮搜索不偷懒，适合做调研前端+Gemini 2.5 Pro 后端分析的两段式流水线。
   URL: https://www.superlinear.academy/c/ai-resources/kimi-k2-chinese

**cursor：**

8. **Cursor Composer 2 = Kimi K2.5 + RL 微调（重磅，2026-03-20）**：HN 276 pts/168 评论，Cursor 自家「in-house 模型」Composer 2 被社区扒出基座是 Kimi K2.5；Cursor 官方随后确认（HN 47459408）；TechCrunch 报道「Cursor admits its new coding model was built on top of Kimi」（2026-03-22）。HN 高赞：付费用户「不舒服，想把别人的模型当自己的卖」；社区质疑 Moonshot ToS 违规；「Cursor 的护城河很薄——VS Code fork + 开源 LLM fork」。
   URL: https://news.ycombinator.com/item?id=47452404 ｜ https://techcrunch.com/2026/03/22/cursor-admits-its-new-coding-model-was-built-on-top-of-moonshot-ais-kimi/

9. **K2 初版在 Cursor 的接入方式**：无原生支持，需经 OpenRouter/Novita 自定义模型接入；官方论坛明确「agent mode 无法正常使用，因为不是原生集成」；Cursor 会提示「模型 agentic 支持有限」（可忽略）。K2.5 在 Cursor 的 Composer 2 走原生渠道后体验大幅改善。
   URL: https://forum.cursor.com/t/kimi-k2-in-cursor/116890/18 ｜ https://openrouter.ai/blog/tutorials/use-openrouter-models-in-cursor-try-it-with-moonshot-ais-kimi-k2/

**openhands：**

10. **OpenHands 官方支持 K2**：Graham Neubig（OpenHands 创始人）本人在 2025-07-15 提交 PR #9706 将 Kimi-K2 加入 OpenHands 推荐模型列表（官方模型名 `moonshot/kimi-k2-0711-preview`），已合并。
    URL: https://github.com/OpenHands/OpenHands/pull/9706

11. **Neubig 的 OpenHands Slack vibe check 排名**（2025-08-18 LinkedIn）：「GPT-5 > claude sonnet 4 > Qwen-3 Coder > Kimi-K2」——K2 在 OpenHands 社区实测排在 Qwen-3 Coder 之后。
    URL: https://www.linkedin.com/posts/graham-neubig-10b41616b_the-vibe-check-reports-on-the-openhands-slack-activity-7363207031165497345

12. **OpenHands issue #12058（2025-12-16）**：kimi-k2 thinking 返回空 content 导致系统自动注入 user prompt（thinking 模式未按 reasoning 模型处理，与 Claude 有显式处理不同）；官方确认要修复，并称 kimi2 在文档中列为支持模型。
    URL: https://github.com/OpenHands/OpenHands/issues/12058

**其他 harness（补充佐证）：**

13. **Cline 官方博客实测**（2025-07-14）：数千用户一周生产数据——K2 真实 diff 编辑任务失败率低至 3.3%，匹配（偶尔超过）Claude 4 Sonnet；「K2 强在 Act Mode 执行，让规划型模型（如 Gemini 2.5 Pro）做策略、K2 执行」。
    URL: https://cline.bot/blog/moonshots-kimi-k2-for-coding-our-first-impressions-in-cline

14. **OpenRouter/Cursor 生态**：K2 上线即接入，官方教程「Kimi K2 delivers 65.8% SWE-Bench…… fully accessible in Cursor」。

### B. 名家锐评加料（带署名身份）

15. **Nathan Lambert**（Interconnects AI 创始人，前 AI2 高级研究科学家）：发布当天推文「Kimi K2 will have a major impact on enterprises rather than consumer, so it'll take longer to happen」；7-14 长文《Kimi K2 and when "DeepSeek Moments" become normal》：「China is continuing to approach (or reached) the absolute frontier of modeling performance」「It is the new best-available open model by a clear margin」；披露 OpenAI 次日宣布推迟自家开源模型（外界普遍解读为 K2 引发的连锁反应）；K2 发布数天即超过 Grok 4 成为 OpenRouter 使用量第一。
    URL: https://www.interconnects.ai/p/kimi-k2-and-when-deepseek-moments

16. **Simon Willison**（知名开发者博客作者）：发布当天博客——「I think this may be the largest ever open weights model?」；实测「Generate an SVG of a pelican riding a bicycle」效果不错；批评 K2 用「非 OSI 合规的 modified MIT」许可（>1 亿 MAU 或 >$20M 月收入需显示 "Kimi K2" 标识）；7-30 文「The best available open weight LLMs now come from China」：Qwen、Moonshot、Z.ai「positively smoked」欧美开源。
    URL: https://simonwillison.net/2025/Jul/11/kimi-k2/ ｜ https://simonwillison.net/2025/Jul/30/chinese-models/

17. **Nature**（顶刊，经 China Daily 报道）：「Chinese AI model Kimi K2 marks 'another DeepSeek moment'」；并指出 K2 在 Creative Writing v3 榜单第一、领跑 EQ-Bench 3（情感智能）。
    URL: https://global.chinadaily.com.cn/a/202507/21/WS687dcf34a310ad07b5d9103a.html

18. **EQ-Bench 实证**：K2 登顶 Creative Writing v3（迭代 1 均分 82.3），超越 o3 与 Claude Opus（Serge BULAEV LinkedIn 佐证）；Drew Breunig（《How Kimi K2 RL'ed Qualitative Data to Write Better》，2025-07-31）分析其用人工标注 rubric 做 RL 提升创作质量。
    URL: https://eqbench.com/creative_writing.html ｜ https://www.dbreunig.com/2025/07/31/how-kimi-rl-ed-qualitative-data-to-write-better.html

19. **Zvi Mowshowitz**（《Don't Worry About the Vase》作者）：7-16 长文收录多位评测者——Hrishi 视频：「Kimi is the real deal……这是 I've tested 最好的开源 agentic 模型——BY A MILE」；Teortaxes 预言「几天后会有对 K2 各种 stubborn shortfalls 的报告和 disenchantment」。
    URL: https://thezvi.substack.com/p/kimi-k2

20. **Graham Neubig**（CMU 教授、OpenHands 创始人）：见上 #11。

### C. 热度数字核验（以实测为准）

| 数据点 | data.json 现值 | 实测 | 结论 |
|---|---|---|---|
| HN 发布帖 points | 348 | **348**（Algolia item 44533403） | ✅ 一致 |
| HN 发布帖评论 | 179 | **179** | ✅ 一致 |
| HN K2 Thinking 936 pts/427 评 | 936/427 | **936/427**（item 45836070） | ✅ 一致 |
| HN K2.5 502 pts/239 评 | 502/239 | **502/239**（item 46775961） | ✅ 一致 |
| HN K2.6 710 pts/372 评 | 710/372 | **710/372**（item 47835735） | ✅ 一致 |
| HN K2.7-Code 发布 | —（未收录） | 463 pts/240 评（48502347） | ➕ 新发现 |
| HN K2.7-Code 上 GitHub Copilot | — | 417 pts/185 评（48756602） | ➕ 新发现 |
| HN Cursor Composer 2=K2.5 | —（未收录） | 276 pts/168 评（47452404） | ➕ 新发现 |
| Reddit 发布帖 354 赞/113 评 98.3% | 354/113 | **无法实测**（Reddit API 403 全封） | ⚠️ 保留 data.json 值 |
| X 官方推文 1133 转推 | 1133 | 无法实测（X 需登录） | ⚠️ 保留 |

Reddit 从本机四个端点（www/old/api/jina/redlib）全部 403 拦截，无法实测 Reddit 数字；data.json 中的 Reddit 数字为调研流水线 2026-08-01 抓取，可信度较高，保留并标注。

### D. 争议与大事记补全

21. **Cursor「白标 Kimi」争议（2026-03）**：见 #8。Composer 2 基座 = Kimi K2.5 + RL，Cursor 未主动披露，社区扒出后官方确认；HN 讨论质疑违反 Moonshot ToS、Anthropic 可能因此禁止 Cursor 使用自家模型；是 K2 系列影响力的反向证明。
22. **K2 速度吐槽**：官方推文「Kimi K2 is SLOOOOOOOOOOW」（188 转推/145 回复）；实测 10-15 tok/s（Linux.do/V2EX/Thoughtworks 多方印证）；08-01 官方推 kimi-k2-turbo-preview 4× 提速（10→40 tok/s）限时 5 折（Simon Willison 记录：$0.30 cache hit / $1.20 miss / $5.00 output per M）。
23. **Sam Altman 延期 OpenAI 开源模型**：K2 发布次日 OpenAI 宣布推迟开源模型（「we are delaying it; we need time to run additional safety tests」），Lambert 披露内部人士称二者无直接因果，但「这是处于下风时的样子」。
24. **OpenAI API 生态火速接入**：K2 发布 3 天内 Groq 上线（250 tok/s、128K 上下文，r/ChatGPTCoding 帖）、OpenRouter/Novita/Cline 教程井喷——开源平替生态一夜成型。

---

## 二、核验修正（与 data.json / 现 kimi-k2.ts 对照）

1. **harnessReviews 三条 placeholder 全部可消灭**：claude-code（#1-7 实据）、cursor（#8-9）、openhands（#10-12）。
2. **速度数字更精确**：现文「约 10 tok/s」→ 实测 10~15 tok/s（官方承认 10 tok/s、V2EX 测 15 t/s、dev.to 测 34.1 tok/s 为 OpenRouter 端差异）。
3. **HN 发布帖 348 分/179 评**：与现文一致，无需修改。
4. **K2 初版前端审美**：现文「审美偏弱」需细化——EQ-Bench Creative Writing v3 登顶（创作/文风强），弱的是**前端 UI 生成**（K2.5 才重点卷、K2.6「摸到第一梯队」）；两者要分开表述。
5. **「代码能力落位 Claude 3.7~4.0」**：与 Linux.do/V2EX/Thoughtworks 实测吻合（Sonnet 4 为参照系）。
6. **Cline 3.3% 失败率**：现文未收录，新事实。
7. **Neubig 排名**：现文 openhands 占位「无 K2 实测记录」→ 实为「有实测且排 Qwen-3 Coder 之后」，需如实改写。

---

## 三、未找到（进存疑 / uncertainties）

1. **K2 初版在 OpenHands 的量化成绩**：只有推荐 PR、vibe 排名、thinking 版 bug，无 SWE-bench 量化实测。
2. **Reddit 实时数字**：403 全拦截，无法复核（保留 2026-08-01 快照值）。
3. **X 推文互动实时数字**：需登录，保留 data.json 快照。
4. **初版 K2 前端 UI 专项评测**：仍无直接专项，前端审美弱点是 K2.5/K2.6 评测反推（沿用现文处理）。
5. **知乎浏览量/万赞文章的具体数字**：未找到精确值，维持定性表述。
6. **K2 初版具体 ELO（LMArena）**：只有「#1 开源模型」定性确认，无精确 ELO 数字。
7. **Cursor 中 K2（非 K2.5）agent 模式的系统性评测**：无——只有「agent mode 无法正常使用」的官方论坛说明。
