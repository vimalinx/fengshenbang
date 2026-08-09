# GLM-4.6 详情页深化 · 调研补遗

- 调研日期：2026-08-09
- 调研方式：AgentKey MCP（余额 0.1 credits 不足 → 降级免费 API）→ HN Algolia + Reddit JSON/old.reddit（被 403 拦截）+ Exa Web Search（免费通道）
- 搜索次数：12 次尝试（HN Algolia×2、Reddit JSON/old.reddit×3 失败降级、Exa×7 成功），10+ 次成功
- 关联文件：`app/src/data/details/glm-4-6.ts`（重写）、`app/src/data/modelDetails.ts` OPUS_5 标杆

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（原最大缺口，全部消灭 placeholder）

**claude-code（5 条实测，覆盖正反两面）**
1. 阮一峰（ruanyifeng.com，2025-10-01）用 Simon Willison 的测试复测 GLM-4.6：`simonw/llm` 仓库 278 个测试用例通过、耗时 18.31s（Claude Sonnet 跑了 466 个，多出 100+ 个不知原因）；鹈鹕骑自行车 SVG 对比「两者结果相当接近」；结论「GLM-4.6 是一个非常强的国产模型，编码能力确实很优秀，可以当作目前公认的最强模型 Claude Sonnet 的替代品」。https://www.ruanyifeng.com/blog/2025/10/glm-4.6.html
2. Joe Njenga（Medium，2025-11-05）：Claude Code 接 GLM-4.6 实测配置 `ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic` + 模型路由映射（HAIKU→glm-4.5-air、SONNET/OPUS→glm-4.6）；同一任务 Claude 成本约 $0.50–1.20、GLM 约 $0.10–0.25，降本 5–6 倍；「for 85–95% of your coding work…delivers solid results at a fraction of the cost」。https://medium.com/@joe.njenga/i-tried-claude-code-glm-4-6-and-cut-costs-by-50-dont-burn-cash-0f3b5ef62c36
3. mrlaude（mrlaude.com）：Claude Code 换 GLM-4.6 + Codex 组合跑了数周，「90% or higher of the performance of Sonnet 4.5」；refactor/代码风格审查/执行计划等 grunt work 场景「barely notice a difference」；「Claude Code being both faster and cheaper with this workflow」。https://mrlaude.com/articles/glm-with-claude/
4. Konstantinos Botonakis 实战报告（konstantinos.top/blog/33/，2025-11-25）：GLM Coding Plan Max 档 + z.ai MCP（webSearchPrime/webReader）+ Claude Code CLI 搭建 landing page；检索准确率约 85–90%，抓出 Tailwind 指令结构错误/缺失 config/未用组件 import 等非幻觉问题，全部修复无返工；「Retrieval beats recall」「Tools stabilise the model」。https://konstantinos.top/blog/33/
5. r/ClaudeCode「For whoever want to try GLM 4.6」（1o3wga9，2025-10-11）负面实测：GLM-4.6 在 Claude Code 里「Oh, I see there is a serious issue with your Boomerang Canvas Video is not showing correctly, let's me also fix your CSS and Canvas design…」——越界修改用户代码，楼主被迫 `git reset` 回退；「As today 10/11/2025, trust me, nothing can beat Sonnet 4.5 on coding yet」。另有「Sonnet 4.5 vs. Glm 4.6 [3 days use review]」帖（1o0psw9，2025-10-09）确认存在。

**cursor（3 条实测）**
1. r/cursor「Anyone tried GLM 4.6 yet?」（1ofn4lf，2025-11-09）：用户「currently using it through zai coding plan through cline…it just gets everything right…no complaints」；「Not for vibe coding for sure. If you can give spec it can work very well」；「Its really bad comparing to [Sonnet]」等分化意见。
2. Dre Dyson（dredyson.com，2025-10-12）6 个月 Cursor 集成实战，200+ 真实测试：代码翻译 92% vs Claude 88%、复杂调试 65% vs 79%、API 生成 84% vs 91%——「GLM shines on straightforward tasks but stumbles on complex problem-solving」；「Two Sessions」两会期间中国 AI API 强制安全审查导致断供（37 小时搭验证层、22% 生产力损耗）；最终混合方案「GLM 处理中文文档，Claude 处理复杂调试」。https://dredyson.com/my-6-month-odyssey-integrating-glm-4-6-with-cursor-hard-won-lessons-for-ai-developers/
3. Nur Arifin Akbar（LinkedIn，2025-12-03）：Cursor Agent + GLM-4.6 做代码评审「works really well…reviews feel more like a conversation」；GLM 在复杂任务上比 GPT-5 便宜 25 倍。https://www.linkedin.com/posts/nur-arifin-akbar_codereview-opensource-cursor-activity-7401946309827395584-maax

**openhands（2 条实测）**
1. OpenHands/OpenHands Issue #11234（作者 neubig = CMU 教授、OpenHands 创始人，2025-10-04 创建、2025-11-15 关闭）：「Conversations with GLM-4.6 suddenly end」——OpenRouter `z-ai/glm-4.6` 对话中途无故终止、无结束消息；评论者 Kreijstal：「glm 4.6 is buggy, it does this with opencode, and codex…it aint that good on non js tasks according to aider benchmarks」「glm-4.6 sometimes 'ends' its turn for no reason」。https://github.com/OpenHands/OpenHands/issues/11234
2. ThunderAgent（GitHub HaoKang-Timmy/ThunderAgent）：提供 `reproduce_glm4.6.sh`——GLM-4.6-FP8 + vLLM + ThunderAgent + OpenHands CodeActAgent 跑 SWE-bench_Lite（8×H100、128 workers、max 50 迭代），证明 OpenHands 可接入 GLM-4.6 跑基准，但未公布 GLM-4.6 具体 resolve rate。https://github.com/HaoKang-Timmy/ThunderAgent/blob/a7eef77a/examples/inference/OpenHands/README.md

**通用 harness 遥测（重磅）**
- Cline 官方遥测（cline.ghost.io，2025-10-02）：Cline 用户数百万次 diff-edit 统计，GLM-4.6 成功率 94.9% vs Claude 4 Sonnet 95.8% vs Claude 4.5 Sonnet 96.2%——「performance gap narrowed to basis points, not percentage points」；Coding Plan $6/月（120 prompts/5h 档）。https://cline.ghost.io/open-source-progress-continues-with-the-release-of-glm-4-6-in-cline/
- Cline 创始人 Nick 推特（经 aicodingdaily 转载）：「we analyzed millions of diff edits from cline users and apparently GLM-4.6 hits 94.9% success rate vs claude 4.5's 96.2%」。

### B. 名家锐评（新增署名+身份）
1. 阮一峰（知名技术博主）：见 A1，正面替代结论 + 具体数字。
2. 少数派（sspai.com/post/102863，2025-09-30）：数据大屏 To B 场景横测「第一梯队：GLM-4.6 ≈ Claude Sonnet 4.5」；长文一图流「GLM-4.6 ＞ Gemini 2.5 Pro ≈ Claude Sonnet 4 ＞ GLM-4.5 ≈ Qwen3-Max」；「GLM-4.6 没全守住，但又做得效果非常好」；Coding Plan Lite/Pro/Max 每 5 小时 120/600/2400 prompts、约等量 API 价格 0.1 折；GLM-4.5 起 Coding Plan 带动智谱 MaaS API 商业化 10 倍增长。
3. 量子位·十三（qbitai.com/2025/09/338660.html，2025-09-30）：「真够卷的！DeepSeek更完智谱更：GLM-4.6，代码国内最强」；实测游戏不到一分钟设计出来、数学截图题正解 70；寒武纪 FP8+Int4 国产芯片首套落地、摩尔线程原生 FP8。
4. 302.AI 基准实验室（302.ai/blog/302-ai-benchmark-lab-review-on-claude-sonnet-4-5-vs-glm-4-6/，2025-10-13）：GLM-4.6「务实全能工程师」vs Claude 4.5「代码美学大师」；粒子模拟/画笔晕染等 5 项实测多轮 GLM 功能完整性与细节逻辑胜出；「复杂推理准确性与稳定性表现更为突出」；GLM-4.6 在 HF 与 LMArena 问鼎开源模型榜第一。
5. Lynn Cole（LinkedIn，2025-11-02，负面）：「Crazy what a version number does. GLM 4.6 is head and shoulders better at coding than GLM 4.5…But complexity thresholds are still a problem. When you hit them in 4.6, the model starts looping, and then it starts responding in Chinese」；另一帖「Outstanding agent for simple apps and GUI. Comparable to Claude Sonnet 4.5, on simple single 3 layer crud apps. The model can't handle anything with even the slightest amount of complexity before bombing in extravagant ways」。
6. Gian Antariksa（LinkedIn，2025-10-05）：「this AI just violated me in broad daylight…an open source model just casually outperformed my last 3 pull requests」；AIME 93.9、LCB 82.8、BrowseComp 45.1、Terminal-Bench 40.5；27 reactions。
7. Joe Njenga（Medium，2025-11-12，负面补充）：全栈 Task Management API 实测 GLM 1–2 分钟完成 vs Claude 8–9 分钟；GLM 无测试套件/无部署指南 vs Claude 2500 行文档——「GLM for Generation, Claude for Polish」；GLM $0.60/$1.90 vs Claude $3/$15 per Mtok。
8. Asma Arshad（allaboutai.com，2025-10-24）：$3 首月/$6 后续订阅实测；「use GLM as daily driver, keep Claude for complex debugging — 90% of the benefits at 20% of the cost」；「My $200 Claude bill would become $6-12 with GLM-4.6…94-97% cost reduction」。

### C. 热度数字核验（实测为准）
- HN 发布帖 item 45422832：**43 分 / 10 评**（2025-09-30）✅ 与现值一致
- HN 最高热度 Cerebras Code 帖 item 45852751：**194 分 / 129 评**（2025-11-08）✅ 与现值一致
- HN GLM-4.6V 帖 item 46193517：8 分 / 0 评（2025-12-08，新）
- Reddit JSON（reddit.com/search.json 与 old.reddit .json）2026-08-09 实测均返回 403/HTML 拦截 → **赞数仍无法核验**，与 data.json uncertain 记录一致，以帖级存在性为准
- HN 评论金句（来自发布帖，经 Exa 抓取）：「If Sonnet 4.5 was delayed by a day, GLM 4.6 would have been the obvious best choice for agentic coding…up there with gpt-codex」「The z.ai monthly plan looks like a steal if you're working on personal hobby projects instead of paying the $200/mo price for Claude Code」「Qwen 3 Coder is completely missing from all the comparisons」——官方基准对比缺 Qwen3 Coder 被 HN 用户点名批评

### D. 争议与大事记补全
1. **对话中途终止 bug**：OpenHands Issue #11234（neubig 发起，2025-10-04→11-15 关闭）；同病在 opencode/codex 复现（Kreijstal）——「glm-4.6 sometimes 'ends' its turn for no reason」。
2. **复杂任务越界/loop/切中文**：r/ClaudeCode 越界改 CSS+Canvas 案（2025-10-11）；Lynn Cole loop 后切中文案（2025-11-02）。
3. **隐私条款争议**：aicodingdaily（2025-10-08）「New GLM-4.6 is Good! (but be careful...)」指出 Z.ai（新加坡实体）条款可能对用户 prompt/code 有广泛使用授权，「by using GLM model, you're basically giving them the rights to 'potentially' do whatever they want with any part of your prompt」——未见官方回应。
4. **两会期间 API 断供**：Dre Dyson 报告中国 AI API 在敏感政治时期（Two Sessions）经历强制安全审查导致服务中断，社区指南未提及。
5. **GLM-4.6V 实测落差（2025-12-08 发布）**：106B-A12B + Flash 9B、128K 上下文、原生工具调用、API 降价 50%、Flash 免费；302.AI 实测「偏科生」——OCR/图表识别稳定，但漫画逻辑排序误读、饼图数据错误、Suno 复刻错字（Mojano→Mojava）；智东西实测图文混排图片无法显示、图标 X→Z 误生成箭头。
6. **官方数据确认**：bigmodel.cn 官方文档明确「总参数量 355B，激活参数 32B」（此前为推断，已升级为官方口径）；「在 Claude Code 环境下 74 个真实场景编程任务测试，GLM-4.6 实测超过 Claude Sonnet 4」。

---

## 二、核验修正

| 项 | 原值 | 修正 | 依据 |
|---|---|---|---|
| 模型架构参数量 | 355B/32B（推断） | **355B/32B（官方文档确认）** | https://docs.bigmodel.cn/cn/guide/models/text/glm-4.6 |
| token 节省 | 「节省 30%+」单一口径 | **双口径**：Z.ai 英文博客官方口径「约 15% fewer tokens」；国内官方/量子位/少数派口径「30% 以上」 | https://z.ai/blog/glm-4.6 |
| AIME 2025 | 98.60 单一 | **双口径**：官方 98.60（pass@1）；cirra/第三方 93.9% vs Claude 74.3% | https://cirra.ai/articles/glm-4-6-vs-claude-sonnet-comparison |
| Coding Plan 价格 | 20 元/月 | **渠道分化**：国内 20 元/月（量子位/少数派）；海外 $3 首月/$6 后续（allaboutai）、Cline 报告 $6/月、季度促销 $9 | https://www.allaboutai.com/ai-agents/can-glm-replace-claude-for-ai-coding-agents/ |
| API 单价 | ¥0.8/¥2（GLM-4.5 口径） | 保持标注口径；补充第三方：Novita $0.6/$2.2、Z.ai $0.6/$1.9、302.AI $0.572/$2.29 | https://blogs.novita.ai/access-glm4-6-in-claude-code/ |
| HN 热度 | 43/10、194/129 | ✅ 实测一致 | https://hn.algolia.com/api/v1/ |
| SWE-bench | 68.0（69/112） | ✅ 一致（allaboutai 表：Sonnet 4.5 77.2 对照） | |
| LCB v6 | 82.8 官方口径 | ✅ 一致（第三方 84.50 为不同 split，DataLearner） | |
| 发布日期 | 2025-09-30 | ✅ 确认（HN item created_at、allaboutai「launched quietly by Z.ai on September 30」、阮一峰记录 9/30 下午） | |

---

## 三、未找到（进存疑 / uncertainties）

1. **Reddit 精确赞数/评论数**：2026-08-09 实测 reddit.com JSON 与 old.reddit .json 均被 403/安全页拦截；赞数以帖级存在性为准，不进 heat。
2. **OpenHands 上 GLM-4.6 的公开 SWE-bench resolve rate**：仅找到 ThunderAgent 复现脚本（GLM-4.6-FP8 + CodeActAgent），未找到官方/社区公布的具体分数。
3. **Cursor 上 GLM-4.6 的系统性官方评测**：只有个人实测（r/cursor、Dre Dyson、LinkedIn）与接入教程，无 Cursor 官方背书（对比 OPUS_5 有 Cursor 联创背书）。
4. **X/Twitter 精确引用帖的赞数**：Exa 可抓内容但赞数不稳定，未采用具体数字。
5. **Z.ai 隐私条款的具体条文引用**：仅 aicodingdaily 转述，未找到条款原文逐条核对。
6. **GLM-4.6 独立参数量在 Z.ai 英文渠道的公示**：bigmodel.cn 中文文档确认 355B/32B，Z.ai 英文博客未列参数量。
