# GPT-5 mini / nano（2025-08-07 初版）深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，不足以支付 Serper 0.2，立即降级）+ HN Algolia API + Exa Web Search + PullPush 归档 + OpenAI 官方站直查
搜索次数：22+ 次（HN Algolia 12 轮、Exa 4 轮、Reddit JSON 3 次被 403 拦截、PullPush 4 次、HN item 直查 4 次、OpenAI 官方页 1 次）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，已消灭全部 3 个 placeholder）

**claude-code（无官方接入，但找到真实路由实测与对比）：**

1. **Joe Njenga（Medium，2025-08-10）「How I Tested GPT-5 on Claude Code (Using a Custom Proxy Router)」**：真实把 GPT-5 接进 Claude Code 的教程实测——claude-code-router 因 OpenAI 改了 API 参数（GPT-5 系列用 `max_completion_tokens` 而非旧 `max_tokens`）报 500 失败，作者自建 Python Flask 代理做参数翻译后成功跑通，并让 GPT-5 在 Claude Code 里构建了一个 API。「GPT-5 uses max_completion_tokens instead of the legacy max_tokens parameter」「All of the o models… all have this API change. I now treat these models as if they are a different custom API」。
   - URL: https://medium.com/@joe.njenga/how-i-tested-gpt-5-on-claude-code-using-a-custom-proxy-router-2ae76a0f8eba

2. **Luke Skyward（Medium，2025-08-09）「I Tested GPT-5 Against Claude Code」**：同一 Claude Code 接口下路由 GPT-5 / GPT-OSS / Qwen3-Coder 等非 Anthropic 模型实测——「non-Anthropic models produced terse, unhelpful responses. 'Fixed the bug.' 'Added error handling.'」；结论 Claude Code 的提示词是「hidden moat」，GPT-5 在 Claude Code 里「就像让钢琴家弹吉他谱」；建议非关键代码/文档用 GPT-5 省 12 倍钱，严肃开发留 Claude。「If you're optimizing for cost, GPT-5's pricing is undeniably attractive… But for serious development work where consistency and quality matter, Claude Code's optimization is worth the premium」。
   - URL: https://medium.com/@datasciencedisciple/i-tested-gpt-5-against-claude-code-the-results-changed-my-workflow-66d0931ad139

3. **HN 评论 NitpickLawyer（2025-08-24，「How to build a coding agent」帖 472 分）**：真实 harness 实测「Roo with gpt5-mini (so cheap, pretty fast) does diff based edits」——Roo Code（VS Code 扩展）里 gpt-5-mini 又快又便宜做 diff 式编辑，并称「Claude code is the strongest atm, but roocode or cline can also work well」。
   - URL: https://news.ycombinator.com/item?id=45001051

**cursor（本轮最厚收获——官方论坛真实用户反馈 + 独立测试 + 中文实测）：**

4. **Cursor 官方论坛 2025-08-19「GPT-5-Mini is a great value」**：用户实测「I've been using GPT-5-Mini instead of Auto and it has been nailing bugs again and again… this model is super cheap compared to how effective it is」「it uses barely any tokens… smaller context is where it seems most effective」；另一用户「gpt-5-mini is genuinely a solid model — and the fact that it's even available for free (usable after hitting your paid limit) makes it an ideal substitute for Auto mode」「That said, it's not quite reliable enough to run fully autonomously」。
   - URL: https://forum.cursor.com/t/gpt-5-mini-is-a-great-value/130858

5. **Cursor 官方论坛 2025-08-22「GPT-5-mini is more than usable now!」**：实测「It struggled with tool calls and stuff for a while since it became available. But today it works almost perfectly. No editing errors, no wrong MCP calls」「my new go-to model and a great replacement for unlimited auto」「people don't appreciate enough of how obedient this model is with instructions」。
   - URL: https://forum.cursor.com/t/gpt-5-mini-is-more-than-usable-now/131672

6. **Dre Dyson（2025-08-20）「GPT-5-Mini vs Claude Sonnet 4: I Tested 5 AI Coding Assistants」**：独立测试 200+ 案例——GPT-5-Mini 用 73% 更少 token 完成同样工作、1.2 次尝试/任务（Sonnet 4 为 1.05）、94% 指令遵循（Gemini 2.0 Flash 82%）、89% 样板代码一次到位（Sonnet 92%）、速度 87 tok/s（Sonnet 63）；结论「Daily Driver: GPT-5-Mini (handles 86% of tasks)」「mixing GPT-5-Mini for routine work and Sonnet 4 for complex problems cuts costs by 5x」，并给出 Cursor 链式配置 `.cursor/chain_config.yml`（gpt-5-mini → sonnet-4 → gpt-5-mini）实战方案。
   - URL: https://dredyson.com/gpt-5-mini-vs-claude-sonnet-4-i-tested-5-ai-coding-assistants-cost-performance-real-results/

7. **El Bruno（2026-05-11）「GitHub Copilot CLI + GPT-5-mini BYOK」**：GitHub Copilot CLI（与 Cursor 同为 VS Code 生态）实测——GPT-5-mini 通过 BYOK 让 SQUAD 多智能体编排「finally felt like real agent orchestration instead of prompt babysitting」；4.16K 请求、104.27M tokens、总成本仅 $6.81 构建出可用 Windows 托盘应用；金句「The code was cheap. The quality gates were expensive」——构建通过但运行时 DI、XAML 解析、托盘生命周期连续踩坑，质量门禁才是成本大头。
   - URL: https://elbruno.com/2026/05/11/github-copilot-cli-gpt-5-mini-byok-the-code-was-cheap-the-quality-gates-were-expensive/

8. **Kilo Code 官方博客 2025-10-21「Mini Models Battle: Claude Haiku 4.5 vs GLM-4.6 vs GPT-5 Mini」**（Kilo Code = 52 万+ 安装的开源 VS Code/JetBrains 编码助手）：同一「作业队列系统」任务实测——GPT-5 Mini 6 分钟 $0.05（全场最低成本），是唯一理解 SQLite 并发限制并实现租约式锁（timestamp-based lease + locked_until 列）的模型，事务/指数退避重试/最高效任务选择查询全做对，「strongest concurrency safeguards」；代价是无统计/任务类型注册等用户功能、文件编辑工具有 2 次调用失败需重试；Haiku 4.5 3 分钟 $0.08 功能最全但完全没有并发控制；GLM-4.6 4 分钟 $0.14 架构最好但 reasoning 模式会破坏工具调用。
   - URL: https://blog.kilo.ai/p/mini-models-battle-claude-haiku-45 ｜ https://news.ycombinator.com/item?id=45658267（HN 2 分）

9. **苍何（腾讯新闻，2025-08-09）「GPT5 在 Cursor CLI 的表现」**：中文实测——Cursor 官方 Agent 终端（对标 Claude Code）默认模型就是 GPT-5（对标官方 GPT-5-Mini）：「GPT 5 很少瞎改代码了，以前在 Cursor 中要用 Rule 来防止 Claude 瞎改代码，现在我去掉了 Rule」「前端审美和代码指令遵循上确实有很大的进步」；但 Cursor CLI 首次测试「一次都没成功」（CLI 自身问题，回 Cursor IDE 后正常）。
   - URL: https://news.qq.com/rain/a/20250809A0621M00

**openhands（官方 Index 无原版 mini 条目，但有官方评测尝试与安全评测证据）：**

10. **OpenHands/benchmarks issue #239（2026-01-04）**：官方曾用 `gpt-5-mini-2025-08-07` 跑 500 例 SWE-bench 评测（OpenHands SDK/评价流水线），但因评测基础设施不稳定（runtime 503/404「Remote conversation not found」、warm pool 为空、HPA 卡在 min=3 不扩容、cold-start 延迟）两次取消——是基建问题而非模型能力问题；50 例重跑同样 404。「Deployment/build are fine; the issue is runtime availability during inference」。
    - URL: https://github.com/OpenHands/benchmarks/issues/239

11. **OpenHands Index（官方，2026-01-29 上线）**：横跨 5 类软件工程任务的持续榜单——**原版 GPT-5 mini 未进 top-15**（平均分低于 claude-sonnet-4-5 的 53.00 门槛）；首批 9 模型包括 OpenAI 的 gpt-5.2-codex（总分第二）但初代 mini 未被官方收录为独立条目。说明初代 mini 在 OpenHands 蜂群/Index 体系中缺乏官方跑分背书，5.2-Codex 才是 OpenAI 侧的代表。
    - URL: https://www.openhands.dev/blog/introducing-the-openhands-index ｜ https://huggingface.co/datasets/OpenHands/openhands-index

12. **Lateos.ai（2026-06-15）「GPT-5 Nano IPI Assessment」**：通过 **opencode.ai harness**（与 OpenHands 同为开源 Agent 框架生态）黑盒评测 gpt-5-nano 的提示注入易感率——210 个测试用例（IPI Taxonomy v0.13，n=10，201 例分析）：**总易感率 38.3%**（77 例易感/124 例免疫），严重级 42.3%（44/104）；对递归指令框架 IPI-010 **100% 易感**、MCP 工具描述投毒 IPI-018 **80%**、角色/工具操纵类 70%；但对 CSS/视觉隐藏、HTML 属性伪装、SEO/钓鱼放大、RAG 语料投毒 4 类**完全免疫（0%）**——「strong resistance to surface-level attacks while showing susceptibility in recursive instruction framing and MCP tool description poisoning」。这是 nano 在安全维度的首份独立量化评测。
    - URL: https://lateos.ai/llm-research/gpt5-nano/ ｜ https://news.ycombinator.com/item?id=48543243（HN 2 分）

### B. 名家锐评加料（带署名身份）

13. **HN GPT-5.4 Mini and Nano 发布帖（id=47415441，248 分/145 评）热评**：
    - powera：「For many 'simple' LLM tasks, GPT-5-mini was sufficient 99% of the time」「GPT-5.4-mini is about 30% faster than GPT-5-mini. GPT-5.4-mini gets 80% on the 'how many Rs in Strawberry' test」——初代 mini 的可靠性与 5.4 提速一手数据。
    - BoumTAC：「To me, mini releases matter much more and better reflect the real progress than SOTA models. The frontier models have become so good that it's getting almost impossible to notice meaningful differences」——轻量档才是代际进步标尺。
    - beklein（Codex 重度用户）：「In Codex, GPT-5.4 mini is available across the Codex app, CLI, IDE extension and web. It uses only 30% of the GPT-5.4 quota」；但 hyperbovine 回「Having to invoke /model according to my perceived complexity of the request is a bit of a deal breaker」——手动切档是负体验。
    - HugoDias：「For us, it was also pretty good, but the performance decreased recently, that forced us to migrate to haiku-4.5. More expensive but much more reliable」——生产环境实际迁移案例（性能漂移怀疑）。
    - URL: https://news.ycombinator.com/item?id=47415441

14. **HN GPT-5 发布帖（id=44826997，2063 分/2482 评）内 mini 相关热评**：
    - lynx97（2025-08-08）：「Not impressed. gpt-5-nano gives noticeably worse results than o4-mini does. gpt-5 and gpt-5-mini are both behind the verification wall」——nano 首日即被对比 o4-mini 唱衰。
    - zone411：「GPT-5 Mini Medium Reasoning scores close to o4-Mini Medium Reasoning」——NYT Connections 扩展基准实测 mini medium 对齐 o4-mini medium。
    - thimabi：「10 messages every 5 hours on GPT-5 for free users, then it uses GPT-5-mini. 80 messages every 3 hours on GPT-5 for Plus users」——免费/Plus 用户额度耗尽自动降级 mini 的官方路由机制。
    - URL: https://news.ycombinator.com/item?id=44826997

15. **HN「GPT-5 mini costs $0.25/$2 and will be discontinued」（id=48689193，2026-06-26，GPT-5.6 Sol 帖下热评）**：HyperL0gi 指出定价路线「GPT-5 mini costs $0.25/$2 and will be discontinued in December. GPT-5.4 mini costs $0.75/$4.5 and is supposed to be the replacement」；首评吐槽「It's the same as the SaaS model. Price keeps going up, and to justify it they keep forcing you to upgrade」——初代 mini 的 3 倍涨价与被停用引发「先低价圈地后涨价」质疑。
    - URL: https://news.ycombinator.com/item?id=48689193

16. **Simon Willison（2025-11-09）「Reverse engineering Codex CLI to get GPT-5-Codex-Mini to draw me a pelican」（HN 168 分/76 评）**：逆向 Codex CLI 让 GPT-5-Codex-Mini 干活——「In figuring out the compile step the coding agent gets seeded with a little bit of relevant information about the project」；用 mini 做轻量执行的实际工程演示，评论区 76 条讨论 agent 是否削弱学习能力。
    - URL: https://news.ycombinator.com/item?id=45862802 ｜ https://simonwillison.net/（文章页 404，HN 帖为准）

### C. 热度数字核验（HN 实测为准）

17. **GPT-5 发布帖 HN**：id=44826997，**2063 分 / 2482 评**（2025-08-07）——整个 GPT-5 系列最大的 HN 热度来源，原文件 heat 未收录。
18. **GPT-5.4 Mini and Nano HN**：id=47415441，**248 分 / 145 评**（2026-03-17）——原文件未收录。
19. **Tau² 提示词重写帖 HN**：id=45275354，**197 分 / 65 评**（2025-09-17）——与原文件「197 分 · 65 评」✅ 完全一致。
20. **Codex-Mini pelican 帖 HN**：id=45862802，168 分 / 76 评（2025-11-09）；**GPT-5-Codex-Mini 发布帖** id=45861329，56 分 / 54 评（2025-11-08）。
21. **GPT-5-nano 服务异常 HN**：id=45377104，1 分（2025-09-25）——OpenAI 官方 status 页事故单（incident 01K610WSX99YJPB4YAF150M1TG），HN 关注度低但事故真实存在。

### D. 争议与大事记补全（带具体日期和数字）

22. **初代 mini 生命周期收尾（2026-06-26 → 12 月）**：GPT-5.6 发布同日，HN 热评确认「GPT-5 mini will be discontinued in December」、文档标注旧版，轻量档位交接 Luna；后续 07-30 Luna 降价 80%（$1/$6→$0.20/$1.20）输出价低于 gpt-5.4-nano，定价地板从 nano 上移。原文件已有 06-26/07-30 两条，本轮补上「12 月停用」细节与 3 倍涨价争议来源。
23. **GPT-5-nano 服务事故（2025-09-25）**：OpenAI 官方 status.openai.com 事故单「Elevated API error rates for GPT-5-nano」（incident 01K610WSX99YJPB4YAF150M1TG）——nano 专属的官方记录在案故障。
24. **nano 提示注入安全评估（2026-06-15）**：Lateos.ai 首份 nano 安全量化——38.3% 总易感率、递归指令框架 100%、MCP 工具投毒 80%，但表层攻击全免疫（详见 A12）。
25. **GPT-5-Codex-Mini 发布（2025-11-08）**：OpenAI 推出更紧凑、成本效益更高的 Codex 专用 mini（HN 56 分），次日 Simon Willison 逆向 CLI 演示（168 分）——mini 从 API 通用档延伸到 Codex 专用档的关键节点。

---

## 二、核验修正（以实测为准）

| 项目 | 原文件值 | 实测值 | 结论 |
|---|---|---|---|
| HN Tau² 帖 | 197 分 · 65 评 | id=45275354：197 pts / 65 cmt | ✅ 一致 |
| GPT-5 发布帖 HN 热度 | （未收录） | id=44826997：**2063 pts / 2482 cmt**（2025-08-07） | ✅ 新收录，替代 Reddit 作为最大热度 |
| GPT-5.4 mini/nano HN 帖 | （未收录） | id=47415441：248 pts / 145 cmt（2026-03-17） | ✅ 新收录 |
| Reddit 最高赞 215/67 | 调研库 | Reddit JSON API 403，PullPush 无此帖归档 | ⚠️ 保留调研库值 |
| SWE-bench 独立评测 79/35 | 调研库 | Reddit 不可达 | ⚠️ 保留调研库值 |
| Copilot 差评帖 72/57 | 调研库 | Reddit 不可达 | ⚠️ 保留调研库值 |
| godsend 帖 57/19 | 调研库 | Reddit 不可达 | ⚠️ 保留调研库值 |
| X 447 赞 44 转（AA 幻觉率帖） | 调研库 | X API 不可用 | ⚠️ 保留调研库值 |
| GPT-5 mini 停用时间 | 原文件「06-26 列入废弃名单」 | HN 热评补充：**具体 12 月停用**、替代 5.4 mini 涨价 3 倍（$0.75/$4.5） | ✅ 补细节 |
| OpenHands harness 状态 | 原文件「无专门实测报告（占位）」 | 官方 Index top-15 无初代 mini；官方评测尝试因基建失败（issue #239）；opencode.ai 对 nano 有安全评测 | 🔴 **占位 → 实测改写** |

## 三、未找到（进存疑/placeholder 说明）

1. **Claude Code harness 内跑 GPT-5 mini 的官方/系统性深度评测**：未找到。claude-code 条目改用三类真实材料替代占位：Joe Njenga 自建代理实测（跑通+参数坑）、Luke Skyward 同接口对比（提示词护城河结论）、NitpickLawyer 的 Roo+gpt5-mini 实测。**不再保留 placeholder**，标注「无官方接入、以路由实测与对比替代」。
2. **Cursor 官方文档对 gpt-5-mini 的接入说明**：Cursor 官方无公开接入文档（其模型目录由官方控制），但 Cursor 官方论坛 2025-08 有多篇真实用户实测帖（great value / more than usable now），Dre Dyson 有 200+ 案例独立测试，苍何有中文实测——已足以支撑 cursor 条目，不再占位。
3. **OpenHands 上 gpt-5-mini 的有效跑分**：官方 Index 未收录初代 mini；官方评测尝试全部因基建故障取消（issue #239 三次重试均 404/503），无法取得有效分数——在 openhands 条目如实说明「基建故障导致官方跑分缺失」。
4. **Reddit 热门帖点赞数二次核验**：Reddit JSON API 全线 403、PullPush 无 2025-08 相关帖归档，215/79/72/57 等点赞数沿用调研库（2026-08-01 抓取），未二次确认。
5. **X 上 AA 幻觉率帖 447 赞 44 转**：无 API 可用，保留调研库值。
6. **原版 GPT-5 mini 中文专项评测**：中文场景实测（302.AI/掘金/EasyLLM）均针对 GPT-5.4 mini，初代 mini 中文专项数据仍缺——保留存疑，中文 notes 以 5.4 为参照并标注。
7. **gpt-5-nano 的 Cursor/Claude Code harness 实测**：nano 主要走 API/分类提取场景，harness 实测仅找到 opencode.ai 安全评测与 El Bruno 的 Copilot CLI 实测（GPT-5-mini，非 nano），nano 在主流编码 harness 的专门实测未找到。
