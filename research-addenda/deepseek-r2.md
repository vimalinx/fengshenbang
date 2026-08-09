# DeepSeek-R2 详情页 · 调研补遗

- 调研基准日：2026-08-10
- 手段：AgentKey 号池网关（127.0.0.1:18323，Bearer local-dev，248 号轮询）→ Brave 网页搜索 / X 搜索 / 网页抓取 + HN Algolia 免费 API 核验
- 搜索次数：Brave `/v1/search` 15 次 + `/v1/twitter/search` 1 次 + `/v1/scrape` 4 次 + HN Algolia（免费）4 次 = **16 次付费搜索 + 4 次抓取 + 4 次免费核验**
- 结论：R2 是「期待值拉满、发布低调」的模型——2025-2026 年跳票传闻期素材极厚，发布后（站点基线 07-08）社区热度被 V4-Flash 抢占，HN 无 R2 专项发布帖；发布日/架构存在多处口径冲突，已如实入 uncertain

---

## 一、调研发现（带 URL）

### 1. 官方硬数据（发布/价格/规格）

- **发布日冲突**：站点基线 `models.ts` 为 2026-07-08；Spheron 部署指南称「DeepSeek R2 launched in March 2026」但全文标注 provisional（https://www.spheron.network/blog/deploy-deepseek-r2-gpu-cloud/）；decodethefuture（2026-06 口径）称「as of June 2026, R2 remains unreleased」（https://decodethefuture.org/en/deepseek-r2-explained/）；layer3labs（2026-07-21 口径）称「DeepSeek has not released R2, has not published a model card」（https://www.layer3labs.io/guides/deepseek-r2-explained）；felloai（2026-07 口径）称「R2 still has not launched」（https://felloai.com/deepseek-r2/）。官方从未确认过发布日期，技术报告未发布。
- **架构（Spheron 部署指南，provisional）**：MoE + 改进版 MLA；~685B 总参 / ~37B 激活；256 专家、每 token top-8 路由（61 层）；早期泄漏称 ~1.2T / ~78B 激活（未证实）。MLA 使 30,000 token 思考链 KV 状态仅 ~2.1GB（非 MLA 同级模型 15GB+）。
- **推理链深度**：数学竞赛题生成 **20,000–40,000 thinking tokens** 后才作答（常规模型 ~400），KV 压力、TTFT、批处理逻辑全变；预算提示可砍 40–60% 思考量，classifier 路由可砍 70–80%。
- **部署**：FP8 权重约 600–700GB；8×H100（FP8, TP=8）~1,600 tok/s、p50 TTFT（8K 思考）~6s、p50 延迟（16K 输出）~22s；蒸馏变体 `DeepSeek-R2-Distill-Llama-70B` 单卡 H100 可跑；HF 仓库 `deepseek-ai/DeepSeek-R2`（指南标注为 provisional ID，需以官方为准）。
- **定价**：站点基线 $1.5/$6 · Mtok；Spheron 成本对比表明确「DeepSeek R2 API pricing is not yet published」并以 R1（$0.55/$2.19）作投影——即自托管语境下 R2 无官方价。2026-08-06 官方公告将「significantly」涨价（HN 85 pts，https://news.ycombinator.com/item?id=49197005），价格即将过时。
- **获取方式**：API + 开源权重（HF 可下）+ 本地部署；许可「opaque licensing」（Spheron 引 Arcee 对比称其「trades DeepSeek's opaque licensing for full commercial freedom」），非 R1 的 MIT 全开放。
- **官方集成指南**：api-docs.deepseek.com 提供 Claude Code / OpenCode / OpenClaw 集成指南（https://api-docs.deepseek.com/guides/coding_agents/）。

### 2. 榜单成绩

- **SWE-bench Verified**：站点基线 68.9%。2026-08 榜（vals.ai）Opus 5 97.00%、GPT-5.6 Sol 96.20%、Fable 5 95.00%（https://www.vals.ai/benchmarks/swebench）——R2 不在闭源第一梯队，也低于 DeepSeek 自家 V4-Pro（localaimaster 2026-06 口径 76.4%，https://localaimaster.com/tools/ai-model-leaderboard）；V3.2 曾以 73.1% 居开源最高（deepseek-v4.ts constellation 记录）。推理系定位 ≠ 编码最强，社区共识「编码主 V4、难题主 R2」。
- **LMArena Elo**：站点基线 1352（2026 榜口径；R1 时代 1398，跨时代不可直接对比）。
- **AIME 系**：R2 专项数值未找到；R1-0528 官方 AIME 2025 87.5%（https://huggingface.co/deepseek-ai/DeepSeek-R1-0528）为可引用的家族基准。
- **推理链长度榜（社区实测口径）**：数学竞赛题 20–40K tokens，为社区实测之最（Spheron）。

### 3. 社区情绪与热度（按平台）

- **HackerNews（Algolia 实测核验）**：2026-07-01 后共 127 条 DeepSeek story，**0 条 R2 专项发布帖**——热度全被 V4-Flash-0731 抢占（779 pts/466 评，08-07；745 pts/347 评，07-31）。R2 相关最大帖是传闻期的 Reuters 转帖「DeepSeek R2 launch stalled as CEO balks at progress」140 pts/181 评（2025-06-27，https://news.ycombinator.com/item?id=44394916）。
- **Reddit**：发布后专项实测少。r/ollama「Deepseek r2 model?」用户称「I've used the Deepseek r2 model in their official website and its ten times better than the r1 model provided in ollama」（https://www.reddit.com/r/ollama/comments/1k8azpu/deepseek_r2_model/）；传闻期「华为派工程师驻场帮 R2」257 赞/26 评（https://www.reddit.com/r/DeepSeek/comments/1mpts3q/huawei_sent_a_team_of_engineers_to_deepseeks/）；r/ClaudeCode「Running Claude Code with Deepseek?」实测「日常可用，多文件重构/安全相关 Opus 仍有优势」（https://www.reddit.com/r/ClaudeCode/comments/1swjql5/running_claude_code_with_deepseek/）。
- **知乎**：期待值拉满（「大家现在对 V4/R2 的期待值拉满」https://www.zhihu.com/question/1900955534003254030）；剧透文「DeepSeek R2剧透」称 Hybrid MoE 3.0 / 1.2T 总参 / 78B 激活 / 推理成本较 GPT-4 降 97.3% / 入 $0.07 出 $0.27（https://zhuanlan.zhihu.com/p/1909006179973173696，**未证实，疑似标题党**）；「DeepSeek-R2 什么时候可以上线？」等问题帖浏览可观。
- **Linux.do**：「DeepSeek 新思维链出现了」5.9k 浏览 / 487 赞 / 189 帖（Jul 24，https://linux.do/t/topic/2645630，「新思维链以 I am 开头，符合之前 GA 版本的思维链」，回帖「难道说？/直接瘫坐/原子弹爆炸」）；「老外与 Deepseek 实验室内部人士通了 4 个小时的电话的结论」（https://linux.do/t/topic/647305，译文称「R2 不仅仅是一种渐进式改进，它是一种完全不同的智[能]」）；「DeepSeek Harness 内测」帖（08-01，https://linux.do/t/topic/2690369）。
- **V2EX / 掘金**：R2 专项帖稀少，讨论以 V4 系为主（V2EX「Deepseek 网页端初次体验？不太满意」针对 V4）；掘金侧以 CSDN/聚合转述为主（https://deepseek404.com/deepseek-r2/ 导航站、CSDN 多篇「提前发布」旧闻）。
- **X**：传闻期大量「R2 将至」推文——@imjustnewatai（Mar 04）「DeepSeek R2 is set to launch soon, on par with either o3 full or o3 high while being a lot cheaper」67 RT/64 回复；@haider1（Jul 09）「gemini 3, deepseek v4, r2, and claude 4.5 all very soon」73 RT；@ns123abc「R2 tipped to launch this month running on Huawei Ascend 910」50 RT。发布后注意力转向 V4-Flash（@Oluwaphilemon1 Aug 09「DeepSeek are back with insane benchmarks, scoring higher than GLM 5.2, GPT-5.6, Kimi K3, and Opus 5」——模型指向 V4-Flash 系，非 R2 专项）。

### 4. 争议与大事记

- **华为芯片试训失败 + 多次跳票**（最大争议）：Reuters 2025-06-26「CEO 对进展不满，R2 发布搁浅」（HN 140 pts）；SiliconANGLE / The Register / TechSpot 2025-08-14「华为 Ascend 芯片训练失败，回退 Nvidia，Huawei 芯片转用于推理」（https://siliconangle.com/2025/08/14/deepseek-r2-model-release-reportedly-held-back-faulty-huawei-chips/）；r/DeepSeek 257 赞帖「华为派工程师团队驻场」（https://www.reddit.com/r/DeepSeek/comments/1mpts3q/）；winbuzzer 2026-01-19「放弃华为芯片」（https://winbuzzer.com/2026/01/19/deepseeks-failed-gambit-with-huawei-chips-exposes-chinas-ai-hardware-reality-xcxwbn/）；The Information 2026-01-09「将发布强编码新旗舰」（https://www.reddit.com/r/LocalLLaMA/comments/1q88hdc/the_information_deepseek_to_release_next_flagship/）。官方对跳票从未正面回应。
- **山寨站 / 虚假发布信息**：deepseekr2.today 自称「Official Launch」但只有营销套话（「10x+ Reasoning Power」「3x faster response」）无任何真实规格（https://www.deepseekr2.today/）；r/ArtificialInteligence「R2 just went open-source and it's matching GPT-4o on 9 of 12 benchmarks」假帖被高赞扒皮「First R2 doesn't exist... it even says May 2025 when we're in 2026」（https://www.reddit.com/r/ArtificialInteligence/comments/1te9jv1/）——信息真空期山寨内容泛滥是 R2 独特现象。
- **发布口径混乱**：Spheron「3 月发布」vs 站点基线 07-08 vs 7 月底文章仍称未发布——官方无技术报告、无模型卡，信息真空。
- **价格信号**：08-06 官方预告 API「significant」涨价（https://news.ycombinator.com/item?id=49197005）；「deepseek-reasoner」旧 API 名 07-24 退役路由至 V4-Flash（deepseek-v4.ts timeline 记录），R2 需新 API 名（推测 `deepseek-r2`）。

### 5. 装备实测

- **FreeBuff（DeepSeek 系免费 harness）**：AI Profit Boardroom 四项目横评（2026）——落地页 11 分钟（免费）、Node bug 修复 8 分钟且 code-reviewer 子代理多抓出一个未报告 bug、多文件编辑扫描 200+ 文件精准取 4 个、CLI 从零 6 分钟；结论「唯一免费且真正对标 Claude Code / Cursor 的 agent」，「Claude Code 只在最难推理上占优」（https://aiprofitboardroom.com/blog/deepseek-harness/）。注：测试用 V4 系模型，非 R2 专项。
- **DeepSeek-Reasonix**：DeepSeek-native 终端编码 agent，29,239★，「designed to never stop，prefix-cache 稳定」（X @Marco_Ramilli，https://github.com/esengine/DeepSeek-Reasonix）。
- **Aider**：站点 `harnesses.ts` 将 deepseek-r2 列为 topFit 最高 88%。
- **claude-code**：官方集成指南 + r/ClaudeCode 实测「日常任务可用；多文件重构/安全相关 Opus 仍有优势」。

---

## 二、核验与矛盾

| 项目 | 冲突方 | 处置 |
|---|---|---|
| 发布日期 | 站点基线 07-08 vs Spheron「3 月」vs 多家 6-7 月文「未发布」 | 详情页用 07-08（站点基线），矛盾入 uncertain + 补遗记录 |
| 上下文窗口 | 站点基线 256K vs Spheron「128K（provisional）」 | 规格组用 256K，注「Spheron 初稿 128K，以官方为准」 |
| 参数量 | ~685B/37B（Spheron provisional）vs 知乎剧透 1.2T/78B vs 泄漏 1.2T/78B | 规格组写「~685B 总参/37B 激活（推测；泄漏 1.2T/78B 未证实）」 |
| 价格 | 站点基线 $1.5/$6 vs Spheron「API 价未发布」vs 知乎剧透 $0.07/$0.27 | 用 $1.5/$6，注 08-06 官方预告涨价 |
| API 标识 | deepseek-reasoner 已退役（07-24 路由 V4-Flash） | 推测 `deepseek-r2`，入 uncertain |
| 情绪比例 | 无量化来源 | 55/25/20 为代表性帖文估算，入 uncertain |

## 三、未找到（进存疑/placeholder）

1. **R2 专项 AIME / ARC-AGI / 数学榜单成绩**：官方未披露，第三方复测未检索到——benchGroups 用站点基线 SWE/ELO + 家族基准（R1-0528 AIME 87.5%）+ Spheron 实测推理链数字。
2. **HN R2 专项发布帖**：Algolia 2026-07 后 127 条 DeepSeek story 中 0 条 R2；heat 的 HN 项如实写「无专项帖」并补最大相关帖。
3. **知乎浏览量精确值**：剧透文/期待帖无公开浏览数；heat 知乎项以 Linux.do 5.9k 浏览替代并注明。
4. **effort 档位数据**：R2 无档位调节（R 系列以思考 token 预算控制），省略 effortBench 字段。
5. **OpenHands × R2 专项实测**：无；参照 R1 在 OpenHands 的 SWE 34%（issue #6466）历史谨慎标注。
6. **Coder / Claude Code 双模型槽位下 R2 的专门评测**：仅 r/ClaudeCode 日常可用级反馈，无系统横评。
7. **R2 许可协议**：Spheron 引 Arcee 称「opaque licensing」，但 R2 具体许可条款未找到官方页面。
