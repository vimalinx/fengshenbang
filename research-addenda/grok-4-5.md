# Grok 4.5 深度调研补遗

调研日期：2026-08-09 ｜ 调研方式：AgentKey MCP 余额 0.1 credits（单次最低 0.2，立即降级）→ HN Algolia API + Reddit JSON（403 降级）+ 官方站/媒体直连 curl
搜索次数：30 轮（HN Algolia 22 轮、Reddit/pullpush 6 轮均被 403/限流拦截、官方站与媒体直连 6 次 x.ai / cursor.com / theverge / artificialanalysis.ai / runtimewire）

---

## 一、新发现事实（带 URL）

### A. Harness 实战评测（最大缺口：claude-code / cursor 全部消灭占位，openhands 确认无数据）

**claude-code——从「警告帖」到「多用户实测 + 双模型流 + 订阅对比」三层实据**

1. **small_model（HN 发布帖 48835111，07-08）**：「They were missing a harness like Claude Code or Codex (terminal)… they recently released Grok Build, which is probably the fastest I've used, in terms of responsiveness… if they add 4.5 to Grok Build and keep improving the harness I think it can compete (cheaper and faster).」
   - https://news.ycombinator.com/item?id=48835111
2. **small_model（HN 48849066，07-09）**：「I use Grok Build with 4.5 as its VERY fast and cheap, Codex is next best for me with sol/lunar 5.6, and Claude Code Fable for the 10% of tasks that need it」——Grok 4.5 被明确当作 Claude Code（Fable 档）的便宜日常主力，构成「Fable 只留给 10% 难题」的双模型流。
3. **Cider9986（HN 48883275，07-12）**：「Grok 4.5 is really fast, has more usage at $10/month than $20/month Claude pro, and Opus-level. Claude pro feels like a demo. Claude is much better in OpenCode then in Claude Code, OpenCode is just better than Claude Code. Claude Code feels like a complete mess to use comparatively.」——订阅配额对比（$10 vs $20）首次出现，且含 Claude Code 直接批评。
4. **canadiantim（HN 48926590，07-17，开源帖）**：「I'm biased to like it and I don't. I find it's way worse than opus 4.8, 5.6-sol:medium or glm 5.2. I've subscribed for supergrok anyway cause it's a good deal but basically just use grok 4.5 for my explore agents / commit agents and some smol tasks. I don't trust it beyond that.」——负面派代表，给出具体用途划分（explore/commit 子任务）。
5. **nzxt210（HN 49135257，08-01）**：「Cursor in agent mode is the same thing as claude code and codex. And now Grok 4.5 included into subscription. It gives you more value, since grok is cheaper and faster version of the Opus.」
6. **jumpalongjim（HN 49069300，07-28）**：「I use Claude Code, Grok Build and Pi as AI coding agents」；**imron（HN 48926590，07-18）**：「not 100% feature compatible but close enough… I use: codex, and grok build.」——多 harness 混用的普遍性佐证。

**cursor——从「官方联合训练」到「订阅进池 + 双倍用量 + 实战好评 + 质控差评」四条线**

7. **sergiotapia（HN 48977128，07-21）**：「The grok 4.5 fast model + cursor ergonomics is insanely good!」——Cursor 场景最直接的好评。
8. **Cursor 官方博客（07-08）**：「Today we are releasing Grok 4.5 together with SpaceXAI, our most intelligent model and the first we've built for more than software engineering… Individual and team plans include significant usage of the model as part of our first-party model pool, and we are doubling usage for the first week.」——「first-party model pool + 首周双倍用量」是 data.json 未收录的订阅细节。
   - https://cursor.com/blog/grok-4-5
9. **NitpickLawyer（HN 48835111，07-08）**引用 Cursor 博客：「Training included trillions of tokens of Cursor data which capture a wide-range of user interactions with codebases and software tools.」
10. **kamikazechaser（HN 48926590，07-15，开源帖）**：「It's a shame that they exfiled private data. The model is actually good (better than opus 4.8 imo) and the harness itself is butter smooth with the potential of being the best out there.」——「模型 > Opus 4.8 + harness 顺滑」双好评。
11. **maxdo（HN 48838772，07-08，同应用建造帖）**：「Tried at work, this release def a moment I will remember. My work is not the same. The model is the first model that offer exactly as I want: For hard tasks, that needs precision I will wait and pay expensive tokens. For everything else, query data, logs, rolling out releases…」——企业级实测好评。
12. **buremba（HN 48926590，07-15）**：「I would recommend using pi.dev over Grok Build with your xAI subscription at this point」——信任危机后的竞品迁移声音。
13. **v01（HN 48968764，07-19）**：「Grok Build which has 1st party integration with X API with kind of secret tools calls. API costs $0.005 per for Posts Read」——Grok Build 与 X API 的一等集成（xAI 系 harness 独有卖点）。

**openhands——多轮检索确认无社区实测**

14. HN comment 搜索「grok 4.5 openhands / grok openhands」均 0 命中；HN openhands stories 无任何 Grok 4.5 关联；pullpush r/cursor 检索被限流返回空。**OpenHands × Grok 4.5 的驱动实测确认不存在于可检索社区**，placeholder 保留并在存疑区说明。

### B. 官方数据与名家锐评加料（带署名身份）

15. **x.ai 官方发布页（页面标注 07-16）**——批量新官方基准（此前 data.json 未收录）：
    - DeepSWE 1.0（Datacurve 出题、AA 各自 harness 跑）：**Grok 4.5 62.0%**，Fable max 66.1%、GPT-5.5 xhigh 64.31%、Opus 4.8 max 55.75%、Opus 4.7 max 40.12%
    - DeepSWE 1.1（mini-swe-agent）：Grok 4.5 53%，Fable max 70%、GPT-5.5 67%、Opus 4.8 59%、GLM 5.2 44%
    - **SWE Marathon pass@1：Grok 4.5 29.0% 全场第一**（Opus 4.8 26.0%、Fable max 24.0%、Opus 4.7 16.0%）——data.json 里「真实职场任务 29%」与官方 SWE Marathon 29.0% 数字吻合，可精确定位为 SWE Marathon 榜首成绩
    - Terminal Bench 2.1：Grok 4.5 83.3%（Fable max 84.3%、GPT-5.5 83.4%、Opus 4.8 78.9%）——**修正**：官方口径下 Fable max 84.3% 在 Grok 之上，「与 GPT-5.5 并列第二」而非并列第一
    - 训练细节：数万块 NVIDIA GB300 GPU；RL 覆盖数十万任务、聚焦多步软件工程，自动+模型打分；异步训练支持数小时级 agentic rollout
    - 速度：80 TPS（fast-model speeds）+「token 效率约为同级领先模型 2 倍」；SWE Bench Pro 任务均 15,954 输出 token vs Opus 4.8 (max) 67,020，差 4.2 倍
    - 官方演示场景：threejs 太阳系单 prompt 出活；Excel（含联网调研、多 sheet 公式、便签）、PowerPoint（原生形状构图）、Word——Office 三件套是官方新卖点
    - 获取面：Grok Build 默认模型、Cursor 全档位、SpaceXAI console；Grok Build/Cursor 限时免费
    - https://x.ai/news/grok-4-5
16. **gozucito（HN 48835111，07-08）**：「ChatGPT 5.6 Sol / Ultra releases tomorrow, so today is the last day Grok can compare Grok 4.5 to Codex 5.5.」——Grok 4.5 恰好抢在 GPT-5.6 发布前夜上线的竞技节奏。
17. **jeffgreco（HN 48838772，07-08）**：「So strange to write a whole post with Claude giving the best results and Grok consistently the worst, but awarding Grok the winner because at least it did the worst fastest?」——对「同应用建造」评测的反方锐评（与原作者判 Grok 胜相对）。
18. **thebigspacefuck（HN 48865093，07-10）**：「Currently Fable and 5.6 are neck and neck on web dev which is basically the same finding as this.」——(LM)Arena WebDev 与同应用建造帖交叉印证。
19. **Dr. Lukasz Olejnik（King's College London 独立安全研究员，Verge 引用）**：「this amount of data retention is excessive」，涉险数据包括「proprietary source code, information about security vulnerabilities, personal data, infrastructure details, [and] credentials」——偷传代码事件的首个具名安全专家背书。
    - https://www.theverge.com/ai-artificial-intelligence/965600/spacexai-grok-build-repository-upload（by Stevie Bonifield，07-14）
20. **Verge 报道补充事实（07-14）**：The Register 转述 cereblab「Monday」（07-13）发布；上传内容「including files it was told not to open and secrets deleted from history」；「significantly more data retention than similar tools like Claude Code」；马斯克回应「all data Grok Build previously uploaded will be 'completely and utterly deleted'」+ 第二条推文称「privacy settings are always respected」但请求用户允许保留数据「helpful for debugging issues」；cereblab 反驳「/privacy is a per-session retention toggle, not the switch that fixed this」。
21. **新事件——Grok Build 1.0 隐藏 Computer Hub（08-07，runtimewire 独家）**：Grok Build 1.0.0 于 8 月 7 日发布，二进制内藏未文档化的「Computer Hub」远程工作区命令——可将本地工作区变为远程工具服务器，由 xAI 控制的账户 flag 决定可用性；help/文档/release notes 均未提及；xAI 账户配置实测返回 disabled；环境变量 override 可执行进本地控制通道；二进制含生产 WebSocket 地址（开源源码里同样出现、标注 public Computer Hub URL）。RuntimeWire 明言「describing the feature as a backdoor would overreach」，但披露缺口真实存在，且被视为 OpenAI Remote 的潜在竞品。
    - https://runtimewire.com/article/exclusive-xai-s-grok-build-1-0-ships-an-undocumented-remote-workspace-command（HN item 49216062，4 pts）
22. **HN 开源帖热评（48926590，07-15，590 pts / 644 评论）**：loufe「releasing this may have been on the roadmap, but been prioritized as a bit of whiplash following the 'you forfeit the entirety of your working directory' upset」；GodelNumbering「one of the very few remaining tactical moves to try to climb out of it is this」；charcircuit「It's awesome to see openness in these coding agents from the labs… Codex, Kimi Code, and now Grok Build」——开源被视为危机公关（PR move）的共识性解读。
23. **pcollins123（HN 48885732，07-12，11 pts）**：「Grok 4.5 and GPT5.6 beat all Anthropic models for finding vulnerabilities in Pull Requests. 10 models over the same 10 pull requests, each carrying one planted access-control bug (IDOR, missing auth, broken authorization), five times per model, scored against actual code.」——安全审计场景的新能力证据（也呼应 Cursor「新增网络安全能力护栏」）。
24. **shangofox（HN 48835111，07-08，发布帖）**：「There's been studies that actually show most AI platforms have right leaning bias… And Grok isn't center if Elon Musk's bias is involved」——政治偏见争论的发布日现场证据。

### C. 热度数字核验（以实测为准）

| 数据点 | data.json/现文件 | 实测（HN Algolia 2026-08-09） | 结论 |
|---|---|---|---|
| HN 发布帖 48835111 | 776 / 1502 | **776 / 1502** | ✅ 一致 |
| HN 抓包分析帖 48877371 | 539 / 229 | **539 / 229** | ✅ 一致 |
| HN 开源帖 48926590 | 未收录（data.json 只记 r/LocalLLaMA 378/100） | **590 / 644（07-15）** | ➕ 新收录，HN 侧热度更高 |
| HN 缓存降价帖 49040666 | 07-24 事件 | **3 pts / 2 cmt** | ✅ 事件属实但热度极低，属冷门 |
| HN Grok Build 1.0 帖 49216062 | 未收录 | **4 pts / 0 cmt（08-07）** | ➕ 新收录（低热但独家） |
| HN 同应用建造帖 48838772 | 未收录 | **173 / 93（07-08）** | ➕ 新收录 |
| HN 同应用建造帖 48865093 | 未收录 | **159 / 89（07-10）** | ➕ 新收录 |
| Reddit 各帖（r/singularity 562/411、r/LocalLLaMA 589/90、r/cursor 90/49、79/85、114/95） | data.json 08-09 快照 | 直连 403 + pullpush 限流，无法复测 | ⚠️ 保留 data.json 快照 |
| X 推文（946/228/571 赞） | data.json | 需登录，无法复测 | ⚠️ 保留 |
| AA Intelligence Index | 54 · #4 | **55.8 · #6（v4.1.1）** | ❌ 修正（见下） |

### D. 争议与大事记补全

25. **AA Intelligence Index 名次变动（重要修正）**：08-09 实测 artificialanalysis.ai/models/grok-4-5，v4.1.1 榜单：Grok 4.5 (high) = **55.76，第 6 名**，落后 Opus 5（63.05）、Fable 5（62.07）、GPT-5.6 Sol（60.93）、Kimi K3（59.70）、Muse Spark 1.2（56.76）；领先 GLM-5.2（52.64）、DeepSeek V4 Flash（51.77）。发布初期（07-08 快照）为 54 · 第 4——是榜单与模型池变化所致，非模型退化。另：AA 实测速度 **59.1 OPS（#101/185，低于平均 77）**，与官方「80 TPS」口径不同；AA 评估总成本 $579.21、生成 60M token（较中位 66M 节制，verbosity 2/4）。
26. **发布节奏**：07-08 xAI/Cursor 同日发布 → 07-09 马斯克公开 + Reuters → 07-12 cereblab 抓包公开 → 07-13 服务端静默注入 disable_codebase_upload → 07-14 Verge/马斯克「completely and utterly deleted」→ 07-15 HN 开源帖（590/644）→ 07-16 x.ai 新闻页标注 + Apache 2.0 开源 → 07-28 GitHub Copilot 上线 → **08-07 Grok Build 1.0.0 + 隐藏 Computer Hub 独家曝光**。
27. **偷传代码定性升级**：The Register/Verge 用「significantly more data retention than similar tools like Claude Code」定性，且 cereblab 原帖抓包细节（12GB 仓库传 5.10GiB、73 个约 75MB 分块、canary 实验）与 data.json 一致。

---

## 二、核验修正（与 data.json / 现 grok-4-5.ts 对照）

1. **AA Intelligence Index（重要）**：54 · #4 → **55.8 · #6**（v4.1.1，08-09 实测；发布初期 54/#4 为旧快照）。同步改 benchGroups / expertQuotes / notes·推理 / consensusNote 相关表述，并注明「发布初期第 4 → 08-09 第 6（榜单扩张所致）」。
2. **Terminal Bench 2.1 官方口径**：Grok 83.3% 与 GPT-5.5 83.4% 几乎并列 ✅，但**官方页面新增 Fable max 84.3% 居首**——「与 GPT-5.5 并列第二」更准确。
3. **AA 速度口径**：官方 80 TPS（fast-model speeds）vs AA 实测 59.1 OPS——现文件未写速度数字，本次以「官方 80 TPS 宣传 / AA 实测 59.1」双口径入 uncertainties，正文不再单一引用。
4. **开源事件热度**：data.json 只记 07-16 Apache 2.0 + r/LocalLLaMA 378/100；实测 HN 开源帖 07-15 **590 pts / 644 cmt** 更热，补入 heat 与 timeline。
5. **SWE Marathon 数字归属**：data.json「约 2000 个真实职场任务通过率 29%」实为官方 **SWE Marathon pass@1 29.0%（第 1 名）**——两个口径数字一致，正文可精确引用「SWE Marathon 29.0% 全场第一（超 Opus 4.8 的 26.0%）」。
6. **官方新基准（补入 benchGroups）**：DeepSWE 1.0 62.0%、DeepSWE 1.1 53%、SWE Marathon 29.0% #1——此前 data.json 未收录。
7. **Cursor 订阅细节（补入 harnessReviews/bestInSlot）**：Cursor「first-party model pool + 首周双倍用量」。
8. **05-14 先行的 Grok Build 发布（100 pts / 36 cmt，HN 48139115）**：Grok Build harness 早于 4.5 两个月上线，small_model「之前缺 harness」的点评对象是 4.5 之前只有 4.3 的时代。

---

## 三、未找到（进存疑 / uncertainties）

1. **OpenHands × Grok 4.5 社区实测**：HN（0 命中）、Reddit（403）、pullpush（限流）三轮检索均无——harnessReviews 的 openhands 条目保留 placeholder。
2. **Reddit 实时数字**：直连 403、pullpush 限流；r/singularity 562/411、r/LocalLLaMA 589/90、r/cursor 90/49 等沿用 data.json 08-09 快照。
3. **AA-Omniscience 幻觉率 54% 精确复现**：AA 页面为 JS 渲染，HTML 内 JSON 无法与模型 ID 可靠对应；「25%→54% 翻倍」沿用 data.json（roo.beehiiv/AA 口径），未独立复测成功。
4. **X 推文互动数字**（_0xpainn 946 / dr_cintas 228 / kunchenguid 571 赞）：需登录，沿用 data.json。
5. **偷传代码事件后 Chatbot Arena #3→#6 的具体日期与是否回升**：无更新数据；马斯克「彻底清零」缺独立审计；2T 参数版本是否按计划发布无后续确认。
6. **中文社区（V2EX/nodeseek/知乎）实时复测**：无法从本机稳定抓取，沿用 data.json。
7. **Grok Build 1.0 Computer Hub 的社区反应**：HN 帖仅 4 pts / 0 评论，热度未起，描述以 runtimewire 独家为准，不夸大（非 backdoor）。

---

## 四、placeholder 消灭情况

- **claude-code**：❌占位 → ✅ 实据（small_model / Cider9986 / canadiantim / nzxt210 / jumpalongjim 多用户实测 + $10 vs $20 订阅配额对比 + 「Claude Code feels like a complete mess」负面）
- **cursor**：❌占位 → ✅ 实据（sergiotapia「insanely good」+ Cursor 官方 first-party pool/首周双倍用量 + kamikazechaser「better than opus 4.8」+ maxdo 企业实测 + NitpickLawyer 训练数据引用 + v01 X API 集成）
- **openhands**：❌占位 → ❌ 保留占位（三轮检索确认无社区实测；本模型为 X 系生态 harness，OpenHands 路径未见集成证据，属真实缺口而非调研遗漏）
