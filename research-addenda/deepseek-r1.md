# DeepSeek-R1 深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，99% 已用，立即降级）→ HN Algolia API + Exa Web Search + GitHub API + jina reader + 官方/媒体站 curl
搜索次数：26 轮（HN Algolia 12 轮、Exa 6 轮、GitHub API 4 轮、jina 正文抓取 3 轮、Reddit 直连 403 被拦）；Reddit 实时数字无法实测，沿用 data.json 2026-08-01 快照并标注

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，三条 placeholder 全部消灭）

**claude-code——无官方支持，但社区有两条成熟路线 + 一个硬伤**

1. **DeepClaude 组合流（本命路线）**：ErlichLiu/DeepClaude（GitHub 2937★）——把 DeepSeek R1 的推理与 Claude 3.7 Sonnet/Claude Code 的 agentic 循环合一：编程推荐「DeepSeek r1 + Claude Sonnet」组合，内容创作推荐「r1 + Gemini 2.5 Pro」；2025-03-10 起支持 max_tokens=5 精简推理输出、reasoning_content 字段返回。
   - https://github.com/ErlichLiu/DeepClaude
2. **claude-code-router（CCR，36,521★）**：本地代理把 Claude Code 的 Anthropic 协议翻译给 DeepSeek，官方配置文档即以 deepseek-reasoner 作为 `think` 路由（规划/推理任务走 R1，default/background 走便宜的 deepseek-chat/V3）——「背景任务路由到便宜模型通常砍掉一半以上 token 账单」。HN 同日证言：ccr 本地执行、transformer 可剥离缓存字段。
   - https://github.com/musistudio/claude-code-router ｜ https://www.morphllm.com/claude-code-router ｜ https://www.datacamp.com/tutorial/claude-code-router
3. **硬伤：deepseek-reasoner 不支持 tool_choice**（DeepSeek-R1 GitHub issue #836）：R1 系在 Anthropic/OpenAI 双端都会对带 `tool_choice` 的请求返回 400——Claude Code 的 WebSearch 工具正是强制 tool_choice，故 R1 挂进 Claude Code 后 WebSearch 必炸；社区解法是本地微代理剥掉 tool_choice 字段（代价：模型偶尔不主动调工具）。CLI 常规工具（Bash/Read/Edit/Agent）不受影响。
   - https://github.com/deepseek-ai/DeepSeek-R1/issues/836

**cursor——官方 2025-01-30 上线（走 Fireworks 托管），论坛/博客有大量实测**

4. **官方接入事实**：Cursor 2025-01-30 公告「DeepSeek models are available now in Cursor」（HN 42883155，9 pts）；实测确认 R1 由 Fireworks 中间商托管（非中国服务器），Chat 免 Pro 可用、Composer 需 Pro。
   - https://generativeai.pub/deepseek-r-1-is-now-supported-in-cursor-ai-5b44720aa481 ｜ https://dredyson.com/my-6-month-deepseek-r1-experiment-in-cursor-ide-speed-accuracy-and-api-lessons-learned/
5. **Cursor 论坛「R1 model is amazing」帖（2025-01-23）**：业余作者「Reading the thinking output, it understood exactly what I requested, and then made a small concise addition of code that worked on the first try! I'm completely floored」；另一用户「R1 is the first model that I can say I prefer to use over sonnet 3.5… in actual usage, R1 feel much stronger」；反向意见「Sonnet is still king of code… R1 seems good at reasoning out deeper compile-time errors. Using them together based on their strengths feels pretty good」；Aider 官方结果：**R1 作 Architect + Claude 3.5 Sonnet 作 editor，性能超越 OpenAI o1**。
   - https://forum.cursor.com/t/r1-model-is-amazing/44056
6. **Cursor 论坛「DeepSeek R1 (Cancelled)」帖（2025-01-24）**：长文件 Composer 场景必炸——「300 lines 文件，R1 先思考吃满上下文，写到一半报错失败」；Cursor 官方回应「very long or slow DeepSeek requests are timing out right now, hoping to increase the thresholds」。另有「Deepseek-R1 in Cursor seems degraded compared to chat.deepseek.com」帖（Chat 4/4 过、Cursor 4/4 失败）。
   - https://forum.cursor.com/t/deepseek-r1-cancelled/44578 ｜ https://forum.cursor.com/t/deepseek-r1-in-cursor-seems-degraded-compared-to-chat-deepseek-com/46051/1
7. **Jim Clyde Monge 评测（2025-02-02）**：单文件任务出色（bug 修复、算法设计），多文件跨上下文弱、提示敏感需零样本；「R1 在理解代码与找 bug 上非常出色，但多文件修改不及 Claude 3.5 Sonnet」。
   - https://generativeai.pub/deepseek-r-1-is-now-supported-in-cursor-ai-5b44720aa481
8. **Dre Dyson 6 个月实测（2025-08-13）**：每月 AI 成本降 ~30%、「极少幻觉包（fewer AI moments）」、记得项目结构；设置期 11 天才通（Fireworks 中转导致直连 API 失败）。反面 grapeot.me（2025-02-09）：R1 无 Agentic 模式，拷给 Claude Agent 修改时「分析常错、不推动开发」。
   - https://dredyson.com/my-6-month-deepseek-r1-experiment-in-cursor-ide-speed-accuracy-and-api-lessons-learned/ ｜ https://grapeot.me/deepseek-r1-en.html

**openhands——官方实测数字：SWE-bench Verified 34%**

9. **OpenHands 官方测试（issue #6466，2025-01-26）**：OpenHands 团队回复「We did and it got **34% on SWE-Bench Verified**」，并讨论 OpenRouter 下的温度/Top-P 参数敏感性（R1 官方建议 temp 0.6/top-p 0.95）。
   - https://github.com/All-Hands-AI/OpenHands/issues/6466
10. **REXBENCH（ACL 2026）**：OpenHands + DeepSeek-R1 在 12 个 AI 科研扩展任务上「执行成功率 0%」（全部 agent 中唯一归零；OpenHands + Claude 4 Sonnet 最佳 33%，Claude 4 Sonnet 执行率 68%）——R1 无原生 function calling，靠 code-fenced 块输出命令，工具链路天然吃亏。
    - https://rexbench.com/ ｜ https://aclanthology.org/2026.acl-long.745.pdf
11. **WebGen-Bench（NeurIPS 2025）**：OpenHands + DeepSeek-R1 整站生成准确率 10.2%；但换 Bolt.diy 框架后 R1 以 **27.8% 反超全部闭源模型**（Claude 3.5 Sonnet 26.4%、GPT-4o 更低）——「框架适配比模型本身更决定成败」的直接证据。
    - https://proceedings.neurips.cc/paper_files/paper/2025/file/6841eed8bb6a2ec49e49235c8115efee-Paper-Datasets_and_Benchmarks_Track.pdf
12. **METR 官方评测（2025-03-05）**：R1「performed slightly better than o1-preview, roughly at the level of frontier models in September of 2024」；RE-Bench 16 小时任务预算达人类专家 28 百分位；「often had verbose chains of thought which exacerbated its high inference latency. It occasionally struggled with calling functions correctly, hallucinating function calls results, and instruction following」——推理期算力对 agentic 能力提升「surprisingly」有限。
    - https://metr.org/evaluations/deepseek-r1-report/

### B. 名家锐评加料（带署名身份）

13. **Simon Willison（2025-01-20 首发评测 + 01-27 HN 热帖 979 pts/746 评论）**：「DeepSeek are the Chinese AI lab who dropped the best currently available open weights LLM」；HN 跟帖自述本地实测：「running it against a few hundred lines of code mainly to read its chain of thought — it's good for things like refactoring… Even if the code it writes has mistakes, the thinking helps spot bits of the code I may have otherwise forgotten to look at」；并称「it is definitely a big deal… they proved that you can both train and run inference against powerful models for way less compute」。
    - https://simonwillison.net/2025/Jan/20/deepseek-r1/ ｜ https://news.ycombinator.com/item?id=42852866
14. **梁文锋（DeepSeek 创始人，thechinaacademy 访谈，经 HN 转引）**：「In disruptive tech, closed-source moats are fleeting. Even OpenAI's closed-source model can't prevent others from catching up… our real moat lies in our team's growth… Open-source is cultural, not just commercial. Giving back is an honor, and it attracts talent.」
    - https://thechinaacademy.org/interview-with-deepseek-founder-liang-wenfeng/
15. **Ben Thompson（stratechery）《DeepSeek FAQ》**（2025-01-27）：被 Simon Willison 称为「very good」的权威解读，回答「是否接近 AGI」「为什么开源」等。
    - https://stratechery.com/2025/deepseek-faq/
16. **HN 发布帖热评**：pizza「even just the Llama 8B model trained on R1 outputs… is stronger than Claude 3.5 Sonnet (except on GPQA)… like an insane transfer of capabilities to a relatively tiny model」；dimgl「Completely overhyped trash. Does well in benchmarks and fails in real-world scenarios.」；qqqult「Kind of insane how a severely limited company founded 1 year ago competes with the infinite budget of Open AI」（母公司幻方仅 160 人、$7B AUM）。
    - https://news.ycombinator.com/item?id=42768072
17. **Cerebras（2025-01-29/30）**：DeepSeek-R1-Distill-Llama-70B 达 1,500+ tok/s，「57x faster than GPU solutions」（Artificial Analysis 第三方数据）；典型编码 prompt 22 秒 → 1.5 秒（15x）。
    - https://www.cerebras.ai/blog/cerebras-launches-worlds-fastest-deepseek-r1-llama-70b-inference

### C. 热度数字核验（以实测为准）

| 数据点 | data.json/现文件 | 实测（HN Algolia 2026-08-09） | 结论 |
|---|---|---|---|
| HN 发布帖 42768072 | 1843 pts / 663 cmt | **1843 / 663** | ✅ 一致 |
| HN 技术报告帖 42823568 | 1351 / 1056 | **1351 / 1056** | ✅ 一致 |
| HN 0528 更新帖 44118818 | 451 / 250 | **451 / 250** | ✅ 一致 |
| HN TNG 变体 44470746 | 77 / 24 | **77 / 24** | ✅ 一致（现文件 07-05 已收录） |
| HN Open-R1 复现帖 48489917 | —（未收录进 heat） | **246 / 18**（2026-06-11 更新帖） | ➕ 补充 |
| HN Simon Willison 代码评测 42852866 | 收录进 sources 未进 heat | **979 / 746**（2025-01-28，llamacpp-pr：llama.cpp PR 99% 代码由 R1 写成） | ➕ 补进 heat |
| HN Unsloth 1.58-bit 42850222 | — | **767 / 332** | ➕ 新发现 |
| HN ARC Prize R1-Zero 分析 42868390 | — | **732 / 272** | ➕ 新发现 |
| HN $2000 EPYC 本地跑 42897205 | — | **463 / 283** | ➕ 新发现 |
| HN Open-R1 首发 42849536 | — | **394 / 234** | ➕ 新发现 |
| HN 4x Raspberry Pi 5 蒸馏 43059579 | — | **306 / 156** | ➕ 新发现 |
| Reddit 各帖 | 多帖千赞 | 无法实测（直连 403） | ⚠️ 保留 data.json 快照 |
| X 推文互动 | — | 无法实测（需登录） | ⚠️ 保留 |

发布当周 HN 出现 6 条 300+ 分热帖（发布帖、技术报告、代码评测、Unsloth、ARC、EPYC），为 2025 年 AI 圈罕见密度——「破圈热度」有据可查。

### D. 争议与大事记补全

18. **美国禁令链**：01-24 美海军 OpNav 全海军邮件禁 R1「in any capacity」（CNBC）；01-28/29 五角大楼 DISA 封网（员工已用 2 天，Bloomberg）；01-30 众议院 CAO 通知「unauthorized for official House use」（Axios）；01-31 得州 Abbott 州长签禁令（首个州，连坐 RedNote/Lemon8，AP）；01-31 NASA 备忘录禁全员（CNBC）。全链条 8 天内完成。
    - https://www.cnbc.com/2025/01/28/us-navy-restricts-use-of-deepseek-ai-imperative-to-avoid-using.html ｜ https://www.cnbc.com/2025/01/31/nasa-becomes-latest-federal-agency-to-block-chinas-deepseek.html ｜ https://www.axios.com/2025/01/30/house-congress-bans-deepseek-ai ｜ https://apnews.com/article/texas-deepseek-apps-ban-3828a4743e9919398dfac0ba9d4a5c25
19. **欧洲隐私风暴**：01-28 意大利 Garante 要求 20 天内说明数据用途/存储地；01-29 应用被从意大利 Apple/Google 商店下架（此前 01-27 刚登顶美区 App Store 免费榜、挤掉 ChatGPT）；01-30 Garante 正式下令封禁；爱尔兰 DPC 同日发函、Euroconsumers 向意大利 DPA 投诉。
    - https://www.reuters.com/technology/artificial-intelligence/italys-privacy-watchdog-blocks-chinese-ai-app-deepseek-2025-01-30/ ｜ https://techcrunch.com/2025/01/29/italy-sends-first-data-watchdog-request-to-deepseek-the-data-of-millions-of-italians-is-at-risk/
20. **Wiz ClickHouse 泄露（01-29）**：oauth2callback.deepseek.com:9000 / dev.deepseek.com:9000 两个无鉴权 ClickHouse 库，log_stream 表 100 万+ 条含聊天记录明文、API Key、后端信息（日志自 01-06 起）；Wiz 通告后 <1 小时内被修复。
    - https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak ｜ https://www.reuters.com/technology/artificial-intelligence/sensitive-deepseek-data-exposed-web-israeli-cyber-firm-says-2025-01-29/
21. **OpenAI/Microsoft 蒸馏指控（01-29）**：NYT 报道 OpenAI「reviewing evidence」指 DeepSeek 违规用其输出蒸馏（违反 ToS「Output 不得用于训练竞品」）；Microsoft 安全团队称 2024 秋发现通过 OpenAI API 大规模外泄数据迹象，已通报 OpenAI。David Sacks 率先发难。
    - https://www.nytimes.com/2025/01/29/technology/openai-deepseek-data-harvest.html ｜ https://techcrunch.com/2025/01/29/microsoft-probing-whether-deepseek-improperly-used-openais-api/
22. **市值冲击量化（补充）**：The Guardian 记「wiping $1trn from the market value of AI-linked US tech stocks」（01-27 周一，App Store 登顶当日）——比现文件「英伟达单日 $600B」更宏观；CNBC/Reuters 的 $600B 是英伟达个股口径，两者并存不矛盾。
    - https://www.theguardian.com/technology/2025/jan/29/openai-chatgpt-deepseek-china-us-ai-models

---

## 二、核验修正（与 data.json / 现 deepseek-r1.ts 对照）

1. **HN 三项热度**（发布 1843/663、技术报告 1351/1056、0528 451/250）与现文件、data.json 完全一致，无需改。
2. **SWE-bench Verified ~50% 精确化**：官方报告表 R1 = **49.2**（Claude 3.5 Sonnet 50.8、o1 48.9）——现文件「~50%」可写为「49.2%（官方）」。0528 版官方未披露 SWE 更新值（维持 uncertainties）。
3. **Aider-Polyglot 口径**：官方初版表 R1=53.3、o1=61.7；0528 版 56.9→71.6%（+14.5pts）为官方 news250528 口径（Paul Gauthier 推特佐证「scored 71%… (3rd)」）。现文件表述正确，保留。
4. **Codeforces 96.3%**：官方表 Codeforces Percentile 96.3、Rating 2029（o1 2061）。与现文件一致。
5. **Cerebras 数字**：现文件未收录 → 补：1,500+ tok/s、57x、22s→1.5s（15x），AI 站为美国本土、零数据留存——回应「中国服务器」担忧的直接论据。
6. **OpenHands SWE-bench 34%**：现文件占位 → 实据（issue #6466，官方团队口径），正式消灭 placeholder。
7. **Cursor 3 条 placeholder**：全部可消灭（#4-8 实据）。核心结论：R1 in Cursor 由 Fireworks 托管、Chat 可用/Composer 需 Pro、单文件强多文件弱、长文件超上下文。
8. **Claude Code placeholder**：可消灭（#1-3 实据）——无官方支持但有 DeepClaude/CCR 两条成熟路线 + tool_choice 硬伤；「官方不支持」本身仍是事实，保留为前提。
9. **新增 4 起争议**：美国禁令链、欧洲隐私风暴、Wiz 泄露、蒸馏指控——现文件仅 3 起（安全/审查/复现），补足为 4 起后覆盖度更全。
10. **「论文登《自然》封面」**：Nature 论文（s41586-025-09422-z）存在性确认（data.json sources），但「封面」说法未核实 → 进 uncertainties，表述弱化为「登《自然》」。

---

## 三、未找到（进存疑 / uncertainties）

1. **Reddit 实时数字**：直连 403、pullpush 429 拒绝 agent、old.reddit 超时，r/LocalLLaMA「多帖千赞」等保留 08-01 快照。
2. **Greptile《DeepSeek R1 is far better than OpenAI o1 at finding bugs in pull requests》**：博客 410 已删除，原数字无法核实（data.json sources 仍收录 URL）。
3. **「登《自然》封面」**：Nature 论文存在但封面说法无第二来源。
4. **OpenHands 34% 时效**：为 2025-01-26 初版口径，0528 更新后官方未披露新值。
5. **X 推文互动数字**：需登录，Marc Andreessen 帖转赞数未取到（仅确认内容）。
6. **Open-R1 复现进度细节**：仅确认 2026-06-11 更新帖 246 pts/18 cmt，具体复现到第几步未深挖（HN 早期「只停在 Step 1」批评仍有效）。
7. **REXBENCH/WebGen-Bench 中 R1 参数设置**：论文未披露 R1 的 OpenRouter 具体配置（温度/采样），仅知 OpenAI 系模型用 temp 0.7。
