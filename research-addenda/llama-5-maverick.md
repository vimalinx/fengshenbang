# Llama 5 Maverick 深度调研补遗

调研基准日：2026-08-10 ｜ 调研方式：AgentKey 号池网关（18323）Brave 搜索 25 轮 + X/Twitter 搜索 1 轮 + 正文抓取 12 轮（Manifold / next.io / codersera / The Rundown / Geeky Gadgets / shiporskip / 知乎量子位 / AI Weekly / llama.com 等）+ HN Algolia 免费核验 7 轮 + find_tools/TikHub Reddit 4 次
搜索成本：约 30 credits（< 号池总额 2%）

---

## ⚠️ 头条结论（必须读）

**截至调研基准日 2026-08-10，Llama 5（含 Maverick 变体）尚未发布。** 多路信源交叉证实：

1. **官方口径**：llama.com / developer.meta.com 模型列表只有 Muse Code、Muse Spark 1.1/1.2、Llama 4、Llama 3——**没有 Llama 5 任何条目**（2026-08-10 抓取核验）。
2. **Meta 战略已转向闭源**：2026-04-08 Meta Superintelligence Labs（Alexandr Wang 主理，据报 $14B+ 人才交易）发布闭源 Muse Spark，Meta 首个专有前沿模型；Behemoth（约 2T）2025-05 推迟后悄然冻结。codersera（2026-05-27 更新）：「For anyone choosing an open-weight stack, Llama 4 Scout and Maverick are now Meta's terminal open offering for the foreseeable future, not a stepping stone.」
3. **Llama 5 泄漏代号 Watermelon**（2026-07-06 Business Insider 首发）：Wang 在内部全员会说 Watermelon「still in training」「has caught up with GPT-5.5」、算力约为 Muse Spark（内部代号 Avocado）的 **10 倍**；同日 Wang 在 X 预告「Opus 级编程模型 pretty soon」。**内部自证、未独立验证，Meta 拒绝置评。**
4. **预测市场**：Manifold「2027 年 1 月前发布」仅 **1.9%**（2027-07 前 6%、2028-01 前 8%）；Polymarket 102 个 Llama-5 相关市场共识 2026 出货 **<20%**（codersera 引，2026-05-19）；Goldman Sachs 与 Finterra 预测 **2027**。
5. **HN Algolia 核验**：`query="Llama 5"&tags=story` → **0 条独立发布帖**；`query=llama5` → 0 条；「Llama 5」全部命中为 Llama 405B/llama.cpp/Llama 2/3/4 等误匹配。HN 无 Llama 5 发布楼。
6. **代号混乱史**（关键矛盾）：2025-2026 初泄漏「Avocado」被 next.io（2026-01-27）与 Geeky Gadgets（2026-02）当作 Llama 5（世界模型/眼镜项目）；2026-07 BI/AI Weekly 澄清 **Avocado 实为 Muse Spark 的内部代号**，Watermelon 才是当前在训的「下一个模型」。

### ⚠️ 与 models.ts 的矛盾（录入方必看）

`app/src/data/models.ts` 中 `llama-5-maverick` 条目（releaseDate `2026-03-08`、contextTokens 512K、maxOutputTokens 32K、priceIn/Out null、swe 60.3、arenaElo 1262、title「开源自部署」、verdict「可完全自部署的开源模型，数据不出内网」）**与调研结果全面冲突，无任何信源支撑**：

- 实际发布状态 = **未发布**；`2026-03-08` 当日无任何 Llama 5 官宣（r/LocalLLaMA「will there be a llama 5 in feb 2026?」帖显示社区当时预期 Feb-May 2026，但从未兑现）。
- 实际上下文/输出/价格 = 未公布；swe 60.3 / arenaElo 1262 = 无来源（疑似借用 Llama 4 Maverick 或臆造）。
- 「开源自部署」与 2026-04-08 起 Meta 闭源转向（Muse Spark）直接矛盾——**Llama 5 是否开源是社区最大悬念**，不是既成事实。
- 建议：**llama-5-maverick 详情页不应注册 hasDetail**；models.ts 该条应为「传闻/规划中」占位或等正式发布后再录入。本补遗已把可核实的「规划事实」（泄漏规格/预测市场/社区预期）整理齐全，发布后可快速回填。

---

## 一、调研发现（带 URL）

### A. 官方状态与发布时间线（全部可溯源）

| 时间 | 事件 | 来源 |
|---|---|---|
| 2025-04-05 | Llama 4 发布（前代，SWE-bench 第三方复现 ~24%、Aider 15.6%、LMArena 开源版 #32） | llama-4.md 已有记录 |
| 2025-05 | Behemoth（约 2T / 288B 激活 / 16 专家）推迟后悄然冻结，从未正式发布也从未取消 | codersera.com/blog/llama-4-complete-guide-2026/ |
| 2025-07-23 | The Information 报道：Meta AI 老员工争相加入做 Llama 5 的新实验室，引发内部不满（X @MistralAI 转述帖） | x.com 搜索命中（bit.ly/3IRNiCr 链接） |
| 2025-09-01 | The Information：Meta 考虑临时采用对手模型，同时推进 Llama 5 | x.com 搜索命中（bit.ly/3HOWxn2 链接） |
| 2025-12-11 | HN 出现「From Llamas to Avocados: Meta's shifting AI strategy is causing confusion」（1 pt）——Avocado 代号首现 | news.ycombinator.com（Algolia 核验） |
| 2026-01-27 | next.io 专栏：预期 Llama 5 今年发布；泄漏称代号 Avocado、为第 3 代 Ray-Ban 眼镜做世界模型推理 | next.io/prediction-markets/trending/will-meta-release-llama-5-this-year/ |
| 2026-02 | Geeky Gadgets/TheAIGRID 泄漏视频：LLAMA 5 代号 Avocado，「10x compute efficiency」「未微调即超开源对手」 | geeky-gadgets.com/meta-llama-5-leak/ |
| 2026-04-08 | **Muse Spark 发布（闭源、API-only）**，Meta 首个专有前沿模型；HN 393 pts / 367 评；The New Stack「Meta abandons open-source Llama for proprietary Muse Spark」 | news.ycombinator.com（Algolia 核验）· thenewstack.io/meta-abandons-llama-spark/ |
| 2026-05-19 | Polymarket 已有 102 个 Llama-5 相关市场，2026 出货共识 <20% | codersera 同文 |
| 2026-05-27 | codersera 更新：Llama 5（当时记为 Avocado）从 Q1 2026 泄漏滑到 Goldman/Finterra 2027 预测；EU AI Act 合规、数据稀缺为延迟主因 | codersera 同文 |
| 2026-07-02 | Zuckerberg 全员会（Reuters）：agent 进展「hasn't really accelerated in the way that we expected」 | reuters.com/business/zuckerberg-says-ai-agent-development-going-slower-than-expected-2026-07-02/（经 The Rundown 引述） |
| 2026-07-06 | **Business Insider 首发**：Wang 全员会说 Watermelon 已追上 GPT-5.5、仍在训练、算力约为 Muse Spark（代号 Avocado）10 倍 | businessinsider.com/meta-ai-model-catches-up-openai-gpt-5-says-2026-7 |
| 2026-07-06/07 | X 泄漏推文发酵：TOAINews 两版（07-06、07-07，后者带「unconfirmed leaks and internal self-selected benchmarks, not independently tested」caveat）、kimmonismus 转述 | x.com 搜索命中 |
| 2026-07-09 | Muse Spark 1.1 发布（HN 413 pts / 214 评）——Meta 当前旗舰仍是 Muse 系 | news.ycombinator.com（Algolia 核验） |
| 2026-07-13 | HN「Meta's Watermelon Matches GPT-5.5 Benchmarks」仅 2 pts | news.ycombinator.com（Algolia 核验） |
| 2026-07-17 | X 段子：Zuckerberg 拿 Fable 跑 Meta 基建再克隆成开源 Llama 5；同日 NYT：$META 在谈租算力给 Anthropic | x.com 搜索命中 |
| 2026-08-05 | Muse Code + Muse Spark 1.2 发布（HN 332 pts / 263 评）——Meta 编程旗舰是闭源 Muse Code | news.ycombinator.com（Algolia 核验） |
| 2026-08-10 | 调研基准日：Llama 5 仍未发布；llama.com 模型列表无 Llama 5 | llama.com 抓取 |

### B. 泄漏规格（全部标注「未确认」）

- **代号**：当前在训 = **Watermelon**（BI 07-06）；早期代号 Avocado 已被澄清为 Muse Spark 内部代号（BI/AI Weekly 口径）。
- **算力**：约为 Muse Spark（Avocado）的 **一个数量级（10 倍）**——「the story is not that Meta found a clever architectural trick… it is that Meta poured a lot more compute into a bigger training run」（AI Weekly 原话）。
- **成绩**：内部基准「caught up with OpenAI's GPT-5.5」；**Wang 未点名具体 benchmark**；Meta 拒评、OpenAI 未回应；OpenAI 已于 6 月底限量预览 GPT-5.6（即 GPT-5.5 已被部分超越）。
- **方向**：agentic + coding 增益；Wang 在 X 预告「Opus 级编程模型 pretty soon」（x.com/alexandr_wang/status/2072852111612907838）；Muse Spark 更新将同时上 Meta AI 与新 API（x.com/alexandr_wang/status/2072848108342677597）。
- **上下文/输出/价格/架构/effort**：官方完全未披露（推测部分进 uncertain）。
- **开源与否**：未定。r/LocalLLaMA 多方辩论（见 D 节）；Meta 官方口径仅为「will release an open source model in the future」（r/LocalLLaMA 帖 1v7smm5）。

### C. 榜单成绩（Llama 5 自身：0 项；前代与参照数据）

| 榜 | Llama 4 Maverick（前代实测） | 备注 |
|---|---|---|
| SWE-bench Verified | ~24%（第三方复现；官方宣称 41.8% 被证伪） | DeepSeek V4 Pro 80.6%、Qwen 3.6-27B 77.2%（codersera） |
| Aider Polyglot | 15.6% | 低于 Qwen2.5-Coder-32B 的 16.4%（llama-4.md） |
| LMArena（开源未修改版） | #32（特调版宣称 #2 后被证伪） | — |
| GPQA Diamond（Epoch 复现） | 67%（Maverick，与官方 69.8% 基本吻合） | 前代唯一「可信」成绩 |

Llama 5 自身：**无任何官方/第三方榜单成绩**（未发布）。唯一「成绩」是 Wang 内部自证「匹配 GPT-5.5」（无 benchmark 名单、未独立复现）。

### D. 社区情绪（预期战：泄漏 hype vs Llama 4 创伤 + 闭源恐惧）

**Reddit r/LocalLLaMA（mix，开源之争为主轴）**
- 「Do you believe Llama 5 will be open weights?」（1nyi5el）：高赞「The llama brand is too strong to completely abandon. The only question is what sizes they'll release and what sizes they'll keep in house.」；被删楼「there is 102% chance with a 2% margin of error that the weights will be available for this model soon」；反方「Yes, I think they'll make a new branding for the proprietary model」。
- 「Is Meta done with open-source Llama releases?」（1obgci1）：「Llama started as cool new tech project with no ulterior motives… but then the corporate and business goals/ambitions took over」；「if it becomes politically or commercially advantageous to drop a model then yes, like OpenAI did with gpt-oss I could see Meta releasing something」。
- 「So umm.. will there be a llama 5 in feb 2026?」：「It might come at max by may but **I don't really think it'll be open weights**. …Keep your llama.cpp binaries updated!」
- 「why meta not dropping any new llama version lately」：「Maverick and Scout performed quite poorly so people mocked them and Meta decided to restructure their AI program」。
- 「Meta has confirmed that it will release an open source model in the future」（1v7smm5）：「At this rate when they finally think it is safe to release model weights, it would be an ancient relic」；「The 'we'll open source something in the future' line is better than a full retreat, but it's a lot softer than the old Llama drops」。

**HackerNews（无独立 Llama 5 楼，参照系 = Muse 系）**
- Algolia 实测：Llama 5 = **0 帖**；Muse Spark 发布帖 **393 pts / 367 评**（04-08）、1.1 版 **413 pts / 214 评**（07-09）、Muse Code/1.2 **332 pts / 263 评**（08-05）；「Meta abandons open-source Llama for proprietary Muse Spark」15 pts（04-30）；「Meta's Watermelon Matches GPT-5.5 Benchmarks」2 pts（07-13）。

**知乎（mix，无 Llama 5 专项）**
- 「Llama 5」直搜 0 命中；重磅负面为量子位《Llama惨遭抛弃！Meta内部改用Claude写代码》（zhuanlan.zhihu.com/p/1926932813434848173）——Meta 工程师透露内部开发已换用 Claude Sonnet；Muse Spark 系列问题存在（「如何看待Meta发布的Muse Spark模型？」等），主流叙事「从开源折戟到闭源破局」。

**Linux.do / V2EX / 掘金（Llama 5 专项讨论 = 0）**
- 三平台按模型名直搜均 0 命中；Linux.do 仅有 Muse Spark 新闻帖（「Meta新模型几乎白送，比DeepSeek还便宜29%！」topic 2712838、「Meta推出Muse Code」topic 2711564）；掘金只有 Llama 4 部署攻略与 llama.cpp 教程。

**X（mix：泄漏 hype + 段子 + 战略质疑）**
- BI 报道推文（kimmonismus 转述 07-06）：「Watermelon reportedly uses an order of magnitude more compute than Avocado (Meta's internal codename for Muse Spark)」。
- 战略质疑（05-27）：「Meta's entire venture into the open-weight ecosystem has largely been about denying market share to OpenAI and Google while it catches up itself… they are probably choosing to hold off Llama 5?」
- 段子（07-17）：「imagine zuck runs fable on meta infra, then clones it and releases it as llama 5 opensource」；（07-27）把「Meta open sources llama 5」放进「各家轮流称王」的循环段子。
- 悲观（07-23）：「Meta just hired 3 Google researchers who worked on the IMO gold-winning model. **If LLaMA-5 flops after all this poaching, it might go down as the biggest disaster of the decade.**」

### E. 热度数字（基准日快照 2026-08-10）

| 项 | 数值 | 口径 |
|---|---|---|
| HN Llama 5 发布帖 | **0**（Algolia 核验无独立帖） | 参照：Muse Spark 发布帖 393 pts / 367 评 |
| HN 评论数 | **0** | 同上 |
| Reddit Llama 5 最高赞帖 | 未能取得精确分（Reddit 反爬，Brave 摘要可见讨论热度，1nyi5el 等帖存在） | 见存疑 |
| 知乎 Llama 5 专项 | **0 条**（量子位《Llama惨遭抛弃》为最相关负面，赞同数未取到） | 反爬 |
| X 最大声量 | Watermelon 泄漏推文多版本（TOAINews 07-06/07-07 + BI 报道），精确转推未取到 | x.com 搜索 |
| 预测市场 | Manifold 2027-01 前 **1.9%** / 2027-07 前 6% / 2028-01 前 8%；Polymarket 102 个市场共识 2026 出货 <20% | Manifold 实时抓取 + codersera |

### F. 争议与官方回应（均为「预期战」与战略转向争议）

1. **开源→闭源转向（2026-04-08）**：Muse Spark 闭源首发让「靠 Llama 许可建生意」的开发者恐慌（shiporskip 面板「The Skeptic」直言「Meta is running a goodwill play… Watch the capability gap, not the press release」）。官方回应：2026-07 Wang 透露 Watermelon 仍在训练 + Meta 高管确认「未来会发布开源模型」（r/LocalLLaMA 1v7smm5 转述）。
2. **代号混乱（Avocado vs Watermelon）**：2025-2026 初泄漏把 Avocado 当 Llama 5；2026-07 BI/AI Weekly 澄清 Avocado = Muse Spark 内部代号、Watermelon = 在训新模型。官方未专门澄清（靠 BI 报道纠偏）。
3. **跳票（Q1 2026 → 2027 预测）**：早期泄漏指向 Q1 2026，Goldman/Finterra 预测 2027，Polymarket 共识 <20%。官方无正式公告；Zuckerberg 07-02 全员会「agent 进展慢于预期」被视为侧证。
4. **内部基准自证不被信任（前代创伤延续）**：Llama 4 刷榜事件（特调版 #2 vs 开源版 #32、LeCun 2026-01 承认 "results were fudged"）让社区对「内部匹配 GPT-5.5」普遍持保留。官方回应：无（靠第三方复测纪律）。

### G. Harness 实测（全部为「无数据」——未发布模型不可能有）

- claude-code / cursor / openhands：Brave / HN Algolia / Reddit 多轮检索均 **0 条** Llama 5 驱动实测。`harnessReviews` 三条全部标 placeholder。
- 参考路径（发布后可用）：Llama 4 时代的 Ollama Anthropic 兼容 API（ANTHROPIC_BASE_URL + ANTHROPIC_AUTH_TOKEN）与 OpenAI 兼容 SDK 接入法，见 llama-4.md。

### H. 诨名（预期战阶段社区用语，官方名不算）

- **「西瓜」（Watermelon）**：2026-07 泄漏代号，社区与媒体通用（BI/The Rundown/AI Weekly 标题化）。
- **「牛油果」（Avocado）**：早期泄漏代号，后被澄清为 Muse Spark 内部代号——作为 Llama 5 诨名**存疑**。
- **「被抛弃的羊」/「时代的眼泪」**：中文社区借 Llama 4「翻车羊」梗延伸，Meta 内部改用 Claude + 闭源转向的叙事化称呼（量子位/知乎评论区）。

---

## 二、核验与矛盾

| 数据点 | 宣称 | 实测 | 结论 |
|---|---|---|---|
| 发布状态 | models.ts releaseDate 2026-03-08 | 无任何信源支持；llama.com 无条目、HN/Reddit 无发布帖、当日无官宣 | ❌ **models.ts 条目为前瞻占位，与事实冲突** |
| swe 60.3 / ELO 1262 / 512K / 32K | models.ts | Llama 5 无任何榜单与规格存在；512K 疑似借 Llama 4 Scout 量级（10M/1M）臆造 | ❌ 无来源 |
| 「开源自部署」title/verdict | models.ts | 2026-04-08 起 Meta 闭源转向；Llama 5 是否开源为最大悬念（r/LocalLLaMA 多方辩论） | ❌ 把悬念当既成事实 |
| 代号 | Avocado = Llama 5（next.io 2026-01 / Geeky Gadgets 2026-02） | BI/AI Weekly 2026-07：Avocado = Muse Spark 内部代号；Watermelon = 在训新模型 | ⚠️ 早期媒体混淆，2026-07 已澄清 |
| 「匹配 GPT-5.5」 | Wang 内部全员会 | 未点名 benchmark、未独立复现；OpenAI 已预览 GPT-5.6 | ⚠️ 内部自证，社区普遍存疑 |
| 10× 算力 | Wang + 泄漏推文 | BI/AI Weekly 一致转述 | ✅ 多源一致（仍未官方确认发布） |
| 2026 出货概率 | — | Manifold 1.9%（2027-01 前）、Polymarket <20% | ✅ 客观市场数据 |
| 2027 预测 | Goldman/Finterra | codersera 引述 | ✅ 机构预测（非承诺） |
| Llama 5 开源 | 未定 | Meta 仅承诺「未来会发布开源模型」 | ⚠️ 官方软承诺，非 Llama 5 承诺 |
| HN 热度 | — | Llama 5 = 0 帖；Muse Spark = 393 pts | ✅ 客观数据 |

## 三、未找到（诚实清单）

1. **未找到**：Llama 5 Maverick 任何官方/第三方榜单成绩（SWE-bench / LMArena / ARC-AGI / Aider / Terminal-Bench 全无——未发布）。
2. **未找到**：官方定价、上下文窗口、最大输出、模型架构、effort 档位（官方零披露；「Maverick 变体」更无任何信息——**「Maverick」作为 Llama 5 变体名本身无信源**，可能系站内自定义）。
3. **未找到**：官方演示（发布会/博文演示 0 条；demos 3 条全部 placeholder）。
4. **未找到**：Harness 实测（claude-code/cursor/openhands 均 0 数据，全部 placeholder）。
5. **未找到**：Linux.do / V2EX / 掘金 的 Llama 5 专项讨论（3 平台直搜 0 命中；仅有 Muse Spark 新闻）。
6. **未找到**：知乎 Llama 5 专项问题/浏览量（量子位负面文为最相关信源，赞同数未取到）。
7. **未找到**：Reddit Llama 5 帖精确赞数（Reddit 反爬，Brave 摘要可证讨论存在但无数字）。
8. **未找到**：X 泄漏推文精确转推/点赞（搜索 API 返回内容未含互动计数）。
9. **未找到**：官方对跳票/闭源/自证基准质疑的任何正式回应（仅 Wang 全员会 + Zuckerberg 全员会口径）。
10. **未找到**：effort 分档数据（未发布模型不可能有，effortBench 字段省略并在 uncertain 说明）。

## 四、给录入方的建议

- **暂不注册 hasDetail**：llama-5-maverick 详情页数据全部为泄漏/传闻/站内基线，注册会渲染「成绩组无实测 + 规格组传闻」的页面，与 models.ts 现值冲突。
- **保留 models.ts 条目但建议主代理复核**：该条 swe/ELO/context/verdict 无信源，建议标注「传闻/规划中」或等发布后以实测替换（本补遗 H-G 节已备好发布后快速回填所需信源：BI 报道、Manifold 市场、r/LocalLLaMA 讨论帖）。
- **发布后 2-4 周复查**：按需求文档 §10 时间敏感条款，Llama 5 一旦发布（代号 Watermelon，2027 概率更大），本补遗的泄漏规格 / 预测市场 / 情绪预期可直接替换为实测。
- **命名提醒**：调研中「Maverick」仅对应 Llama 4 变体（400B MoE）；Llama 5 变体命名未知。若主代理决定给站内条目保留「Maverick」名，建议在详情页 uncertainties 明示「变体名无外部信源」。
