# Gemini 3.6 Flash 深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP（余额 0.1 credits，单次搜索最低 0.2 credits，立即降级）→ HN Algolia API + Exa Web Search + 官方站/开发者论坛 curl
搜索次数：18 轮（HN Algolia 12 轮、Exa 6 轮）；Reddit 直连 / pullpush 均被 403 / 限流拦截，Reddit 侧数字沿用 data.json 2026-08-01 快照并标注

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口，三条 placeholder 全部消灭）

**claude-code——从占位到「机制 + 技术 bug + 双模型流」三层实据**

1. **workweave/router PR #811（07-21，Gemini 3.6 Flash 接入 Claude Code 的第一手技术证据）**：修复「Gemini 3.x 在 Claude Code 里第二轮必现 400 INVALID_ARGUMENT」——Google 的 `thought_signature` 字节字段在跨 Anthropic 格式往返时非 ASCII 字节被 JSON 层替换为 U+FFFD，base64 解码失败。作者在 onboarding gemini-3.6-flash + gemini-3.5-flash-lite 当日发现，同坑波及 Google GenAI SDK #711、langchain-google #1570、gemini-cli #8003/#8011。
   - https://github.com/workweave/router/pull/811
2. **ernestrc（HN 3.6 发布帖 48993414）**：「Fable or gpt5.6 sol for planning. Gemini 3.6 Flash for executing. Wow, Google is onto something here. I always thought that gemini 3.5-flash was the most underrated model.」——社区通行的双模型 harness 流（Claude 系规划 + Gemini Flash 执行）。
3. **Óscar Gallego 独立实战（Claude Code 规划 + Gemini Flash 执行）**：单功能从 6.5h 压缩到 45 分钟（约 88% 提速）、90% 测试 AI 生成、「Claude Code thinks, Gemini Flash types」；同时警告「Flash sometimes too fast for its own good——会漏边界情况，正是需要 plan 兜底的原因」。
   - https://www.oscargallegoruiz.com/en/blog/gemini-flash-code-review-automation/
4. **官方接入路径**：Claude Code 官方不支持非 Anthropic 模型，但 `ANTHROPIC_BASE_URL` 网关机制成熟——LiteLLM 2025-11 即 day-0 支持 Gemini 3 系跑在 Claude Code CLI 里；Requesty 明言「how teams run GPT-5.5 or Gemini 3.5 Flash inside the Claude CLI」；Bifrost 网关 11µs 开销。
   - https://docs.litellm.ai/blog/gemini_3 ｜ https://www.requesty.ai/blog/claude-code-environment-variables-anthropic-base-url-auth-token
5. **同场氛围参考**：nateb2022（HN 48993130）正面提及「Gemini 3.6 Flash (high) in Antigravity CLI」体验（原文被截断，仅确认存在性）；nomel 反向提醒「Try to use Gemini flash in an agentic coding harness and see what comes out」。

**cursor——从占位到官方榜 + 官方定位 + 生态 PR 三条线**

6. **CursorBench 3.2 官方（cursor.com/cursorbench）**：Gemini 3.6 Flash High **53.5%**（$1.56/任务，30,436 输出 tok，64 任务）、Medium 51.2%（$1.48）、Low 47.4%（$1.13）；Gemini 3.5 Flash 48.8%（$2.20/任务，46,702 tok）；最佳 Claude Fable 5 70.5%。**修正**：现文件「CursorBench 3.1 49.8% / 3.2 48.8%」实为 3.5 Flash 数据。
   - https://cursor.com/cursorbench ｜ BenchLM 台账：https://benchlm.ai/models/gemini-3-6-flash
7. **Learn Cursor（07-27）**：Cursor 官方将 3.6 Flash 定位为「speed-tier，介于 Gemini 3 Flash 与 3.1 Pro 之间，reasoning 优于 3 Flash、价格低于 Pro」；缓存读 $0.15/1M（新鲜输入 $1.50 的 1/10）；model card 标 200K 标准 / 1M 上限；推荐高吞吐 + 多步推理场景；切模型会断缓存。
   - https://www.learncursor.dev/learn/cursor-basics/cursor-gemini-3-6-flash
8. **Pxpipe PR #134（Cursor 论坛 Artemonim，07-21）**：3.6 Flash 成为默认 pxpipe reader（并列 Fable 5）——vs Fable 5 视觉读数实测：vision tokens 少 26%（1,078 vs 1,456）、token cut 84.6% vs 79.3%、字符密度高 ~35%、312×728 下 6 项读数全持平或更优。
   - https://forum.cursor.com/t/integrate-pxpipe-for-economic-use-of-fable-class-models/165882
9. **Takashi Fujino（future-stack-reviews，07-23）独立 5 连 build**：同一 21 点规格的 5 个单文件 build——核心计算与批量乘数全对、但无一人免手动 QA（1 个 malformed table markup、1 个陈旧价格残留、1 个非标准元素、1 个擅自加预设控件）；引用官方迁移指南：「human evaluators preferred earlier models for visual layout and styling」。
   - https://future-stack-reviews.com/gemini-3-6-flash-review/

**openhands——从占位到 ACP 官方机制 + OpenHands Index 官方数据**

10. **OpenHands ACP 支持（06-18 官方博客 + README）**：Agent Canvas / Software Agent SDK 可把 **Gemini CLI 作为 ACP agent** 直接驱动，用 Gemini Advanced 订阅鉴权即可（免 API 账单）；「Run OpenHands, Claude Code, Codex, Gemini, or any ACP-compatible agent across local, remote, and cloud backends」。Gemini 3.6 Flash 是 Google 自家 Antigravity CLI（Gemini CLI 停用后）的底座，故 OpenHands + 3.6 Flash 路径为：ACP 驱动 Antigravity CLI / Gemini CLI。
    - https://www.openhands.dev/blog/use-any-coding-agent-in-openhands-with-acp
11. **OpenHands Index（官方基准，01-29 与 05-11 两期）**：Gemini 3 Flash 在 SWE-bench issue resolution 上与 Opus 差距小、平均准确率反超 3 Pro，但「did not quite rise to the level of those from Anthropic or OpenAI」且**前端开发类别挣扎**（与 Cursor 社区「前端强」口碑相悖）；05-11 期前端类别 Claude 与 Gemini 转强。3.5/3.6 Flash 尚无 Index 量化条目。
    - https://www.openhands.dev/blog/openhands-index ｜ https://www.openhands.dev/blog/openhands-index-3-months-out
12. **Managed Agents 默认切 3.6 Flash（07-28 官方博客）**：`antigravity-preview-05-2026` agent 默认跑 gemini-3.6-flash，新增环境 hooks（pre/post tool call 拦截 lint/审计）、预算控制、定时触发、免费层——Google 自家 agent 编排底座实锤。
    - https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api-3-6-flash-hooks/

### B. 名家锐评加料（带署名身份）

13. **Sundar Pichai（Alphabet 财报电话会，07-22）**：被投行追问「Google 没有 SOTA 模型怎么办」，答「Everyone uses Gemini 3.6 Flash anyway. We do that internally as well.」（HN spwa4 转述，07-23 评论）。结合 07-21 发布即次日财报的节奏，属官方对「无 Pro」质疑的正面回应。
14. **Elena Marchetti（Awesome Agents，07-22）**：7.5/10——「a disciplined, well-targeted update: cheaper, meaningfully faster… It isn't, on the evidence, a smarter model in any general sense」；AA Intelligence Index **50 冻结**（与 3.5 相同、位列第 21/187，落后 GPT-5.6 Luna 与 Muse Spark 1.1 的 51）；**GitHub Copilot 七 IDE 首发同日上线**；GDM-MRCR 1M 54.0%「the exact weakness we flagged in May is largely patched」；AA 每任务成本 $0.59→$0.50（-18%）、完成时长 2.7min→1.3min。
    - https://awesomeagents.ai/reviews/review-gemini-3-6-flash/
15. **eesel AI（07-22）**：「This is a workhorse, not a champion」；DeepSWE 每任务 97K 输出 token vs 3.5 的 276K（约 -65%）；「If your job is running a lot of grounded, tool-using, document-heavy tasks cheaply, 3.6 Flash is one of the best-value picks on the market right now」；硬编码榜单上 3.6 落后 Grok 4.5（SWE-bench Pro 64.7%）与 GPT-5.6 Luna（DeepSWE 67%、Terminal-Bench ~84%）。
    - https://www.eesel.ai/blog/gemini-3-6-flash-review
16. **Goldie Bench（07-25，50 个 one-shot 演示实评）**：均分 7.08/10、1 金 2 银 2 铜；3D 技能游戏 60-120 秒出稿；全场最便宜的 frontier 级入场价 $1.50/M。
    - https://goldiebench.com/models/gemini36
17. **Roboflow（官方视觉评测）**：视频理解「the best model we tested at tracking what happens in a scene over time」（Counting 精确匹配 82.4%）；目标检测 mAP@50 仅 56.0%——「the model did not get worse at seeing objects. It just got lazy about drawing a box around each one」。
    - https://blog.roboflow.com/gemini-3-6-flash-for-vision/
18. **Google AI 开发者论坛「The 3.6 Flash model… it's weak at coding」（07-24 起，6 赞）**：Gabriel_Nilo「Flash 3.6 Is WORSE than 3.5… I use 3.6 Flash only for simple Q&A, not for Agent coding」；DrQwertySilence「You need to hand-hold it, and the best way to do it is via rules（Conductor tracks 有效）」；Phil_Burk 反方「working pretty well for me… Gemini is able to work more without human intervention（对比 Opus 5 老催 gradle/grep）」；MonkeyDrone（08-09）「It will outright ignore errors that are right there and say everything is fine. 3.5 Never did this.」
    - https://discuss.ai.google.dev/t/the-3-6-flash-model-its-weak-at-coding/176020/17
19. **HN 同场锐评**：hmate9「This model is not for builders and engineers」；jgbuddy「less intelligent and more expensive than GLM-5.2, while being closed weight」；m_ke「Google… very well equipped to be the volume discount store of inference」；luciana1u「at this point even the model cards need a model to explain them」（命名混乱）。
20. **中文社区 KOL**：
    - **AI星球评测（07-22）**：综合 6.7/10；Harvey AI 实测文档审查快 12%；中文选词拉胯（「上下文窗口」→「情境视窗」、「推理」→「推论」）；X 用户 Balder 地图炮「三个新模型全比 3.5 Flash 差」、Angel 算账「比 GPT-5.6 Luna 贵但能力差」、Conor Dart「Antigravity 游戏生成木头纹理变差」；AA 智能指数 155 模型中第 15。
      - https://www.aixq.cc/56058.html
    - **B站 程序员阿江-Relakkes（07-21）**：接进两个真实 Agent 项目（图片生成 Agent + Skills Agent），同 prompt 同基线：Kimi K3 / GLM-5.2 / GPT-5.5 / Opus 4.8 均一轮完成主交付，**3.6 Flash 分别补 5 轮和 4 轮仍有关键问题**（图片 Agent 注册异常 + 跨用户任务隔离风险；Skills Agent 97 项测试通过但网页端不显示回答）——「质量没跟上，再快也只是更快地抵达下一轮修改」。综合评分 7.08 与 3.5 同档。
      - https://www.bilibili.com/video/BV1Nng667EVL/

### C. 热度数字核验（以实测为准）

| 数据点 | data.json/现文件 | 实测（HN Algolia 2026-08-09） | 结论 |
|---|---|---|---|
| HN 3.5 Flash 发布帖 48196570 | 962 pts / 658 cmt | **962 / 658** | ✅ 一致 |
| HN 3.6 Flash 发布帖 48993414 | 760 / 577 | **760 / 577** | ✅ 一致 |
| HN 3.6 Flash 次帖 48993130 | 74 / 73 | **74 / 73** | ✅ 一致 |
| HN DeepMind 人事帖 49184755（08-05） | —（未收录） | **855 / 928**（「Changes at Google DeepMind: Demis Hassabis from CEO to Chair, Jeff Dean departs」） | ➕ 新发现，08-05 大事 |
| HN Gemini Robotics 2 49111237（07-30） | — | **620 / 558** | ➕ 新发现（Gemini 生态热度参照） |
| HN Antigravity bait and switch 48222529（05-21） | — | **771 / 345** | ➕ 新发现（harness 争议主战场） |
| HN Antigravity 提示注入泄露 46048996（2025-11-25） | — | **768 / 215** | ➕ 新发现 |
| HN Antigravity 删盘事故 46103532（2025-12-01） | — | **544 / 482** | ➕ 新发现 |
| Reddit r/singularity 定价帖 696/129 | 696 / 129 | 无法实测（403 + pullpush 限流） | ⚠️ 保留 data.json 快照 |
| Reddit r/OpenAI「0% smarter」425/147 | 425 / 147 | 无法实测 | ⚠️ 保留 data.json 快照 |
| X 侧数字 | — | 无法实测（需登录） | ⚠️ 保留 |

### D. 争议与大事记补全

21. **DeepMind 人事地震（08-05，HN 855/928）**：Demis Hassabis 由 CEO 转任 Chair、Jeff Dean 离职；08-06「Google Shifts AI Power Back to Brin」。与 reilly3000 早前评论「The brain drain at deep mind is a clear indicator…」互相印证——3.5 Pro 缺席同期的人事动荡背景。
22. **财报会 SOTA 质疑（07-22）**：投行追问「没有 SOTA 模型」，Sundar 以 3.6 Flash 使用量作答；HN 评论认为 Google 走「efficiency + volume」路线（m_ke），质疑「营销大于实质」（CWuestefeld「badly over-sold, i.e., under-provisioned」）。
23. **Claude Code × Gemini 多轮 400 bug（07-21）**：workweave PR #811 实证 Gemini 3.x（含 3.6 Flash）在 Claude Code 网关方案下多轮对话必现 400，属 harness 集成层真实坑（非模型能力问题）。
24. **Antigravity/AI Ultra 订阅强制退出（HN 48993414）**：reaperducer「They literally forced me and my company out of Antigravity by phasing out AI Ultra subscription without any proper product follow-up」；piyh「Google fucking deleted my IDE and wiped my settings… I migrated off」——Google 自家 harness 的运营事故，5 月已有 bait and switch 帖（771/345）。
25. **aibenchy 方法学争议**：dudeinhawaii / jdthedisciple 质疑其「3.6 Flash Medium 超 GPT-5.6 Sol High 与 Fable 5 Medium」结果「does not match any live… makes me skeptical」。
26. **其他**：AlphaFold 团队解散转向 Gemini（07-29）；「Gemini was on the list of tools Google engineers are banned from using」（07-28，6 pts 低热）；「Google Gemini seems to expose private Google Docs data」（08-06，3 pts）；「Cursor, Codex, Gemini CLI, Antigravity hit by sandbox escapes」（07-20，8 pts）；Google 开始预训练 Gemini 4（07-21，3 pts）。

---

## 二、核验修正（与 data.json / 现 gemini-3-6-flash.ts 对照）

1. **GDPval-AA v2 Elo（重大）**：现文件/benchGroups「1656」错误 → **1421**（DeepMind 模型卡权威：3.6=1421、3.5=1349、3.1 Pro=965；AI星球独立引用 1349→1421 一致；data.json 的 1656/1314 疑为误植或旧版基准）。同时补 MLE-Bench 63.9%、OSWorld-Verified 83.0%、SWE-bench Pro 58.7%、CharXiv 85.2/89.4%。
2. **CursorBench**：现文件「3.1 49.8% / 3.2 48.8%」为 **3.5 Flash** 数据 → 3.6 Flash 官方 CursorBench 3.2：**High 53.5% / Medium 51.2% / Low 47.4%**（vs Fable 5 70.5%）。
3. **BenchLM 总分**：现文件「#38/216 · 64.06」为 3.5 Flash（08-07 快照）→ 3.6 Flash = **75.3 / #9/216**，Coding #14/132（64.0，最强）、Agentic #68/132（46.7，最弱）。
4. **Terminal-Bench 2.1**：现文件 76.2%（3.5 数据）→ 3.6 = **78.0%**（Terminus-2 harness；Vals AI 口径 73.78% #8/43 并存）。MCP Atlas 83.6% 为 3.5 代实测，3.6 无官方值，标注来源年代。
5. **最大输出**：现文件「—」→ **65,536 tok（64K）**（Willison 3.5 Flash 65,536 + 3.6 SKILL 文档「1M in / 64K out」交叉确认）。
6. **AA Intelligence Index**：50（与 3.5 持平）已确认；排名快照 15/155（AI星球）与 21/187（Awesome Agents）版本不一致 → 正文只写「指数 50 持平」，不写具体名次。
7. **知识截止**：3.6 具体未披露（3.5 为 2026-01，AI星球称 3.6 官方标注 2026-03，存疑待证）。
8. **热帖日期修正**：财报电话会 = **07-22**（spwa4 07-23 评论「the earnings call yesterday」），非含糊的「下旬」。
9. **免费层事实（新增）**：Gemini App / gemini.google 免费层默认模型 = **3.6 Flash**（thebigspacefuck，HN 48993414）。
10. **发布日分发面（新增）**：GitHub Copilot 七 IDE 同日上线（Awesome Agents）+ AI Studio / Vertex global / Antigravity / Android Studio / Gemini Enterprise 全渠道。

---

## 三、未找到（进存疑 / uncertainties）

1. **Reddit 实时数字**：直连 403、pullpush 限流，r/singularity 696/129 与 r/OpenAI 425/147 保留 08-01 快照。
2. **3.6 Flash in OpenHands 的量化跑分**：只有 ACP 机制 + Index 上 3 Flash/3.1 Pro 数据，无 3.5/3.6 Flash 的 SWE-bench 级条目。
3. **3.6 Flash 直连 Claude Code 的社区量化实测**：只有 PR #811 技术 bug 报告 + 网关机制 + 「Claude 规划/Gemini 执行」质性反馈，无跑分对照。
4. **X 推文互动实时数字**：需登录；Balder/Angel/Conor Dart 仅经 AI星球转述确认内容与身份，无互动数字。
5. **GDPval-AA v2 第三方复现**：以官方模型卡 1421 为准，无独立机构复测公开数据。
6. **幻觉率官方数据**：Google 拒公布（Mashable 持续追问），3.6 模型卡仅称「可能表现基础模型一般限制如幻觉」。

---

## 四、placeholder 消灭情况

- **claude-code**：❌占位 → ✅ 实据（PR #811 技术 bug + ernestrc/Oscar 双模型流 + LiteLLM/Bifrost/Requesty 网关路径）
- **cursor**：❌占位 → ✅ 实据（CursorBench 3.2 官方分档 + Learn Cursor 官方定位 + Pxpipe PR #134 视觉读数 + Takashi 5 连 build）
- **openhands**：❌占位 → ✅ 实据（ACP 官方机制 + Managed Agents 默认 3.6 Flash + OpenHands Index 家族数据）
