# Qwen3.7-Max 深化调研补遗

> 调研基准日 2026-08-09 · 执行：OMP deepseek-v4-flash（本会话）
> 检索手段：HN Algolia API（items/search，可访问）、r.jina.ai 代理（知乎/TRAE 论坛可用）、Reddit JSON（403 封禁）、X（无法直连）
> AgentKey MCP：账户余额 0.1 credits < 最低搜索成本 0.2（Serper），判定「余额不足」降级免费 API。

## 一、新发现事实（带 URL）

### 1. 热度数字（HN 实测核验，全部一致）
| 帖 | 实测 | data.json 现值 | 结论 |
|---|---|---|---|
| HN 主帖 48205626「Qwen3.7-Max: The Agent Frontier」 | 721 pts / 290 评论 / 2026-05-20 | 721/290 | ✓ 一致 |
| HN Preview 帖 48181877「Qwen 3.7 Preview」 | 253 pts / 2026-05-18 | 253/97 | ✓ 一致 |
| HN 35h 演示帖 48264663 | 38 pts / 31 评论 / 2026-05-25 | 38/31 | ✓ 一致 |
| HN Plus 帖 48360313 | 42 pts / 12 评论 / 2026-06-01 | 42/12 | ✓ 一致 |
| HN OpenRouter 定价帖 48225712 | 3 pts（data.json 未标注，补充） | — | 新增 |

### 2. 新事件：Rio3.5 城市政府模型反超帖（HN 48527634，142 pts / 45 评论，2026-06-14）
- 里约市政府模型 Rio3.5（huggingface.co/prefeitura-rio/Rio-3.5-Open-397B，基于 Qwen 3.5 397B 后训练 + SwiReasoning 框架，见 oceansky / adrian_b 评论）在基准上超过 Qwen3.7。
- 重磅负面实测：**betimsl**（HN）："From my experiments qwen agent almost always fails with tool calling and porting the correct config is quite tedious."
- 背景：Aurornis「benchmarks are gamed」、arjie「Benchmaxxing is the new 'have a crypto trading strategy'」、mrandish 讽刺城市政府做模型。
- URL: https://news.ycombinator.com/item?id=48527634

### 3. 重磅正面实测：abalashov（HN item 48641848，story 48641160）
> "In all seriousness, between DeepSeek-V4-Pro, Kimi K2.6 and now K2.7-Code, Xiaomi's MiMo-2.5-Pro, and Qwen3.7 Max, I haven't touched Claude for any sort of programming-related task in months… The Chinese models are just that good. If all three of the US majors banned me, I think that'd be just fine."
（数月编程不再用 Claude，仅研究/闲聊仍用 Claude——装备级实战背书。）

### 4. 新基准数字：HLE 41.4（302.AI 知乎评测披露，data.json 无此数）
- HLE 41.4 分，超 Claude Opus-4.6 的 40.0；GPQA Diamond / HMMT 2026 Feb 亦领先。
- 302.AI 另报 Artificial Analysis 榜 Qwen3.7 Max 排名第 6。
- URL: https://zhuanlan.zhihu.com/p/2042657228990174422

### 5. AA codingindex 实测 50.1（HN kristopolous，item 48569244）
- 脚本拉 AA codingindex 排序：**Qwen3.7 Max = 50.1**（发布 29 天后），GLM-5.2(max) 50.7、GPT-5.2(xhigh) 48.7、Kimi K2.6 47.1、DeepSeek V4 Pro 47.5——国产第一梯队、紧咬 GLM-5.2。
- URL: https://news.ycombinator.com/item?id=48569244

### 6. 302.AI 平台价与跨框架泛化
- 302.AI 渠道价：qwen3.7-max 输入 $1.8/1M、输出 $5.3/1M（vs qwen3.6-plus $0.3/$1.8）。
- 跨框架泛化：Claude Code / OpenClaw / Qwen Code / Hermes Agent 下「无缝平替、即插即用、无需复杂 Prompt 微调」。
- URL: https://zhuanlan.zhihu.com/p/2042657228990174422

### 7. TRAE 官方社区实测（Cursor 系 IDE 最近似证据，论坛帖 860 浏览 / 17 赞 / 13 回复）
- JasonShane（社区核心伙伴）2026-05-22 实测：阿里官方千问云平台 API 接入 TRAE IDE。
- 核心参数：上下文 1M（最大输入 991.80K / 最大输出 65.53K）、速率限制 RPM 30K / TPM 5M、内置工具 code_interpreter / web_extractor / web_search。
- 同项目同提示词复现程度「优秀」、项目理解清晰；同场景 vs GLM-5.1「略胜一筹」（单次测试，作者自注存在偏差）。
- URL: https://forum.trae.cn/t/topic/18912

### 8. HN 主帖（48205626）更多实名引语
- **beydogan**（pos）："honestly, initial version of Opus-4.6 was much better than whatever we are being served right now as 4.7. If it performs same level to that, i'm totally willing to switch."
- **goyozi**（mix）："These are very good numbers. I still don't get why they don't compare against latest competitor versions in these posts, it's not like we're all not going to notice."
- **ecshafer**（claude-code 装备）："Qwen3.6 with claude code works great. I get a lot better results with that than opencode and qwen3.6. Claude Code is a great harness, and good harness/tool integration makes a big difference."
- **girvo**（neg/疑问）："The big question for me having used a lot of these SOTA chinese models is: what is its token efficiency like?"
- **wren6991**（mix，审查议题）："Qwen models know about Tiananmen Square but they are post-trained to refuse to talk about it."
- URL: https://news.ycombinator.com/item?id=48205626

### 9. 35h 演示帖（48264663）更多质疑
- **keyle**（neg）："I don't doubt that it did it but I wouldn't want to maintain whatever it ended up spewing after 35 hrs. In my experience, AI fixes problems by mostly adding more code. It's a short term gain for a long term hurt."
- **teravor**（neg）："so basically just brute force the kernel. there are more elegant ways to leverage an LLM, see AlphaEvolve"
- **big-chungus4**（neg）："This article was generated from the original Qwen3.7-Max release blogpost and contains nothing new"；同用户澄清："It optimized the Extend Attention operator in triton. All models were optimizing the same operator"。
- **l23k4**（neg）："LLM written. See the authors twitter, he speaks english at a rather basic level…"
- URL: https://news.ycombinator.com/item?id=48264663

### 10. Preview 帖（48181877）早期反馈
- **storus**："It's 3.7-max; max was never open-weighted before."（闭源预期）
- **tedivm**："I've completely replaced GitHub Copilot using Sonnet 3.6 with OpenCode using Qwen3.6 27b"（装备背景）
- URL: https://news.ycombinator.com/item?id=48181877

### 11. Harness 定向搜索结论（装备缺口核验）
- **Qwen × cursor（HN 评论 78 hits）**：无 Qwen3.7-Max × Cursor 专门实测。背景事实：miroljub「Cursor Composer 1 was Qwen」；infocollector（2026-04）"trying to connect Antigravity or Cursor with GLM/Qwen coding models, but haven't had any luck so far"（配置摩擦）。
- **Qwen × openhands（HN 评论 11 hits）**：无 3.7-Max × OpenHands 专门实测；仅本地代用例（zepearl 用 Qwen3.6 27B + OpenHands 编程；incomingpain 曾遇 Qwen Code 配 OpenHands 工具调用崩溃）。
- **Qwen × opencode（HN 评论 276 hits）**：scottcha（pos）"I switch between Claude Code (Opus/Sonnet) and Qwen (OpenCode, OpenClaw) multiple times throughout the day and Qwen 3.5 is really nice"；inhumantsar（neg）"I've had nothing but trouble with Qwen on opencode. GLM too."（疑为 harness 侧问题）。
- 结论：claude-code 装备有 302.AI + briga + ecshafer 可用；cursor/openhands **保留 placeholder**，cursor 补 TRAE（Cursor 系 IDE）实证。

### 12. 其他背景帖
- **"Local Qwen isn't a worse Opus, it's a different tool"**（alexellis 博客，HN 48580209，493 pts / 253 评论，06-18）——本地开源 Qwen vs Opus 定位之争，支撑「国产模型体感分化」叙事。
- URL: https://news.ycombinator.com/item?id=48580209

## 二、核验修正

| 项 | data.json 值 | 实测 | 处置 |
|---|---|---|---|
| HN 主帖 721/290、Preview 253/97、35h 38/31、Plus 42/12 | 如上 | 完全一致 | 沿用 |
| OpenRouter 定价帖 | 未标注 | 3 pts | 补充（不进 heat，低热度） |
| HLE 41.4 / AA 榜 #6 / 302.AI 价 $1.8/$5.3 | 无 | 302.AI 知乎原文 | **新增入 benchGroups/notes** |
| AA codingindex 50.1 | 无 | kristopolous 脚本输出 | **新增入 subBoards** |
| Reddit r/LocalLLaMA 564 票/345 评论 | 564/345 | 无法核验（403 封禁，含 old.reddit 与 r.jina.ai 代理） | 沿用，进存疑 |
| X 官方帖 4,931 赞/608 转发/115.7 万浏览 | 4,931/608/115.7万 | 无法直连核验 | 沿用，进存疑 |
| qwen.ai 官方博客正文 | 官方数字来源 | 页面为 JS SPA，curl 无正文 | 官方数字沿用 data.json，进存疑 |

## 三、未找到（进存疑 / 占位说明）

1. **Qwen3.7-Max × Cursor 专门实测**：未找到。仅 TRAE（Cursor 系 IDE）官方社区实测（见上）、Cursor 接入摩擦帖、Composer 1 曾基于 Qwen 背景。harnessReviews.cursor 保留 placeholder。
2. **Qwen3.7-Max × OpenHands 专门实测**：未找到。官方 scaffold-agnostic 声明未附 OpenHands 数字背书。harnessReviews.openhands 保留 placeholder。
3. **Reddit / X 热度数字独立核验**：Reddit JSON 全渠道 403（www/old.reddit/api/r.jina.ai），X 无法直连——564 票与 4,931 赞沿用 data.json，未经二次实测。
4. **qwen.ai 官方博客正文**：JS 渲染，curl 无法提取文本，官方基准/定价数字源自 data.json（上一轮调研已采）。
5. **LMArena 总榜 #13 实时位次**：无法直接核验，沿用 data.json。
6. **35h 演示优化代码**：官方未公开（沿用上一轮存疑），本次未获新进展。
