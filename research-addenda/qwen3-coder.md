# Qwen3-Coder（480B-A35B）详情页 — 调研补遗

调研基准日：2026-08-10
调研方式：AgentKey 号池网关（127.0.0.1:18323，Bearer local-dev，248 号轮询）+ HN Algolia 免费 API + 官方博客/arXiv/知乎直连
搜索次数：23 次（网关 /v1/search 14 次、/v1/scrape 4 次、/v1/twitter/search 1 次、HN Algolia 3 次、curl 直连 1 次）
花费：网关约 13 credits（0.6×14 + 1×4 + 1×1），未触发 402/余额错误

---

## 一、调研发现（带 URL）

### 1. 官方硬数据（阶段 A）

**Qwen3-Coder-480B-A35B-Instruct（旗舰，2025-07-22 发布）**
- 官方博客「Qwen3-Coder: Agentic Coding in the World」（2025/07/22）：480B 总参 MoE / 35B 激活；**原生 256K 上下文，YaRN 可扩 1M**；预训练 7.5T tokens（70% 代码占比）；用 Qwen2.5-Coder 清洗合成数据；后训练走「执行驱动 Code RL」+「Long-Horizon Agent RL」（阿里云 20,000 并行环境）；**Agentic Coding / Agentic Browser-Use / Agentic Tool-Use 三项开源 SOTA，「comparable to Claude Sonnet 4」**；开源配套 CLI **Qwen Code**（fork 自 Gemini Code）；官方给出 Claude Code proxy 与 Cline 接入方案（ANTHROPIC_BASE_URL=https://dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy）。https://qwen.ai/blog?id=qwen3-coder
- 官方 API 模型名 **qwen3-coder-plus**（OpenRouter 收录：2025-09-23 上线，$0.65/$3.25 · Mtok，1M 上下文窗口，最大输出 65,536 tokens）。https://openrouter.ai/qwen/qwen3-coder-plus
- 知乎高赞答主「卜寒兮」补全架构细节：**62 层、160 专家、激活 8 专家**；Terminal-Bench 37.5% 超 Claude 4 Sonnet。https://www.zhihu.com/question/1931239650753769546
- 阿里官方 Alibaba Group 新闻稿确认发布与 Qwen Code 定位。https://www.alibabagroup.com/en-US/document-1886524500057522176

**Qwen3-Coder-30B-A3B-Instruct（轻量版，2025-08-01 前后）**
- Unsloth 文档称 30B 版代号 **Qwen3-Coder-Flash**，同为 256K 原生上下文（YaRN 1M）。https://unsloth.ai/docs/models/tutorials/qwen3-coder-how-to-run-locally
- HF 模型卡确认 30B-A3B 定位「repository-scale understanding」。https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct

**Qwen3-Coder-Next（后继，2026-02-03 发布）**
- 官方博客 + 技术报告（arXiv 2603.00729，2026-03-03）：80B 总参 / **3B 激活**，hybrid attention + MoE；训练用 **800K 可验证任务**（真实 GitHub PR 挖掘）；**以 480B 为 teacher 蒸馏**；SWE-bench Verified 70.6（SWE-Agent）/ 71.1（MiniSWE-Agent）/ 71.3（OpenHands）；SWE-bench Multilingual 62.8；SWE-bench Pro 42.7；Terminal-Bench 2.0 36.2；Aider-Polyglot 66.2。https://arxiv.org/html/2603.00729v1
- HN 发布帖 46872706：735 pts / 429 cmts（2026-02-03）。https://news.ycombinator.com/item?id=46872706

### 2. 榜单数字（阶段 B）

**Qwen3-Coder-480B（第三方/复现口径）**
- SWE-bench Verified **66.5%**（serenitiesai AI Value Index；nebius OpenHands 100-turn Pass@1 66.5% 独立复测一致）https://serenitiesai.com/benchmark/models/qwen3-coder · https://nebius.com/blog/posts/openhands-trajectories-with-qwen3-coder-480b
- Aider Polyglot **61.8%**（Unsloth 复测）/ 60.40（arXiv 2603.00729 Table 7 复现）
- Terminal-Bench **37.5%**（官方口径，超 Claude 4 Sonnet，知乎官方译文中转）
- arXiv Table 6/7 复现：EvalPlus 86.66 · MultiPL-E 88.00 · CRUXEval 92.13 · LiveCodeBench v6 44.93 · OJBench 14.98 · Codeforces 1800 · FullStackBench-en 62.54 · FullStackBench-zh 63.07 · Spider 85.98 · BIRD-SQL 64.15
- 上一代 Qwen2.5-Coder-32B-Instruct：Aider polyglot **73.7**（官方博客 + Ollama 页，媲美 GPT-4o）https://qwenlm.github.io/blog/qwen2.5-coder-family/

**子榜单**
- OpenHands 社区 vibe check（2025-08-18）：**GPT-5 > Sonnet 4 > Qwen-3 Coder > Kimi-K2**（开源编码实测排第三）
- SWE-bench 官方榜收录 Qwen2.5-Coder-32B（2025-08-03 提交）与 Llama 4 Scout 等条目 https://www.swebench.com/viewer.html

### 3. 社区情绪（阶段 C）

**Reddit（pos 为主）**
- 发布帖「Qwen3-Coder is here!」**1.9K votes / 258 comments**（r/LocalLLaMA 1m6qdet）
- 「Qwen3-Coder-480B-A35B-Instruct」252 votes / 65 comments（1m6mlbk）
- 「Is Qwen3-coder the best kept secret out there?」（1t7tu20，2026-06 仍在热评）
- 「Devs, what are your experiences with Qwen3-coder-30b?」（1odf4ei）：高赞「Qwen3-30b-a3b 比 Coder-a3b 更好用……模型 likely overfitted on agentic」——本地用户更推通用版
- 480B 本地：Q4_0 6×7900XTX 仅 7 tok/s（1mz42eu，34 votes/46 cmts）、Q6 约 408GB（1n9hh6m）
- 30B-A3B vs 480B 对比图帖（1me4i2h）

**HackerNews（mix）**
- 发布帖 44653072：**765 pts / 366 cmts**（Algolia 实测核验一致）
- 热评：**swyx** 反驳 benchmark hacking 指控「this is disingenuous」；**stuartjohnson12**「Qwen has previously engaged in deceptive benchmark hacking… no software engineer you know was writing code with Qwen 2.5」（引 winbuzzer 2025-01-29 报道）；**sourcecodeplz**「Qwen team is top in open models, esp. for coding」；**danielhanchen**（Unsloth CEO）「the model looks extremely powerful!」；**mohsen1**「really possible to run this locally since it's MoE」；**daemonologist**「Zed's Zeta was a fine-tune of the base model」https://news.ycombinator.com/item?id=44653072
- Cerebras 上线帖 44760023：47 pts / 10 cmts（2025-08-01）；「Qwen3 Coder 480B is Live on Cerebras」

**知乎（pos）**
- 问题「阿里开源编程模型Qwen3-Coder，性能比肩全球顶级编程模型Claude4」：**关注者 558 · 被浏览 412,282 · 152 个回答**（2026-08-10 快照）https://www.zhihu.com/question/1931239650753769546
- 深度评测（zhuanlan 1931411468110234789）：「Qwen3-Coder 的综合能力与 Claude 和 Gemini 处于同一梯队，基本能完成所有测试任务，部分任务甚至更优」
- 负面：雨飞「谈几点 Qwen3-Coder 的使用体验」（zhuanlan 1932964771797378792）：「一旦陷入了循环，需要立马停掉，不然你的成本就要无限上去了……很多评测的结果和实际体验是相差很大的」；「Qwen3 Coder吹爆全网？我真用了一下，尴尬到想删！」（zhuanlan 1932188417892028645）：roo code 上「coder 一直限速」
- 官方译文中转「Qwen3-Coder: 在世界中自主编程」（zhuanlan 1931228503849833767）

**Linux.do（pos）**
- Qwen Code 实操讨论活跃（「Qwen 3.6 主观使用体验评价」t/topic/1907751 等），深度横评较少；主流结论「性能完全不输 Gemini CLI 和 Claude Code，在国内运行也更加稳定且费用相对较低」（掘金/CSDN 同源转述）

**V2EX（mix）**
- 发布帖 1147029：「号称是'可以与 Claude Sonnet4 媲美'。试了一下效果还不错。支持 Qwen Code，Claude Code，Cline 等工具」
- 半个月实测帖 1156439（GLM4.5/ds3.1/qwen3-coder 横评）：「8 月中左右各种截断和报错，基本没法用了」——免费额度（魔搭每日免费）不稳定
- 30B 本地帖 1189206：「之前用的 QWen3-30B-A3B 2507 效果最佳」——本地用户仍推通用版 2507

**掘金（pos）**
- 「国产最牛代码大模型！—最详细Qwen3 Coder性能测评与使用指南」（juejin.cn/post/7530202220802359331）：「实测验证 Qwen3 Code 性能完全不输 Gemini CLI 和 Claude Code，在国内运行也更加稳定且费用相对较低」

**X（pos）**
- @Alibaba_Qwen 官方推文（480B）：**1,434 RT**；Next 推文 783 RT
- @devindesktop：「Qwen3-Coder at ~2000 tokens/sec is now live in Windsurf! Fully hosted on US servers by @cerebras」（103 RT）
- @askOkara：「grok code fast → gpt-oss 120b / qwen 3 coder」（201 RT，开源替代对照表）
- @Saboo_Shubham_：「performs at par with Claude Sonnet 4, Kimi k2, DeepSeek v3 and GPT-4.1」（96 RT）

### 4. 名家锐评（署名）

- **swyx**（HN 发布帖热评）：『this is disingenuous. there are a bunch of hurdles to using open models over closed models and you know them as well as the rest of us.』（驳「benchmark hacking」指控）
- **danielhanchen**（Unsloth CEO）：『Ye the model looks extremely powerful! I think they're also maybe making a small variant as well』
- **storus**（HN 48210456，Qwen3 系 Claude Code 用户）：「Qwen3 coder for Claude Code replaced my full-stack use of Opus 4.6; it's fine for basic web apps, k8s/docker infra setup with only slightly higher error rate」——480B 经 Claude Code 已取代 Opus 4.6 全栈用途（qwen3.md 既有素材）
- **jayvanzyl**（2025-12-16）：Cursor Agent Mode 用 480B 单 prompt 生成 2D 马里奥风游戏，「The experience felt surprisingly close to GPT-4's agent mode」，成本约 $2/1M tokens https://jayvanzyl.me/we-used-qwen3-coder-to-build-a-2d-mario-style-game-in-seconds-demo-setup-guide/
- **Simon Willison**（2025-07-30 月评）：点名 Qwen3-Coder-480B 为当月最佳开源权重模型之一（「Qwen, Moonshot and Z.ai have positively smoked them over the course of July」）
- **苏米客**（xmsumi.com/detail/1288 避坑指南，neg）：「一个小小的括号问题，Qwen3-Coder 竟然检查了 10 多分钟」「国外开发者发现 480B 工具调用全部失败」
- **卜寒兮**（知乎高赞答主）：「Qwen3-Coder 的数据很亮眼，又把开源模型的能力拉高了一截。编程能力比肩 Claude 4，这本身就是最大的亮点，要知道这是一款开源模型。」

### 5. 争议与大事记（阶段 D）

**争议**
1. **480B 初版工具调用 bug**：r/LocalLLaMA「Heads up to those that downloaded Qwen3 Coder 480B before yesterday」（74 votes/23 cmts）——官方在 30B 发布公告中说明 480B 工具调用已修复、**需重新下载权重**；苏米客记录「工具调用全部失败」；r/LocalLLaMA「Why does Qwen3-Coder not work in Qwen-Code aka what's going on with tool calling?」（1mu3tln）——llama.cpp 工具支持未就绪，Roo/Cline/Kilo 忽略内置工具支持、长上下文后记忆断裂。官方以修复权重回应。
2. **工具调用循环烧钱**：知乎雨飞「一旦陷入了循环，需要立马停掉，不然成本无限上去」；GitHub QwenLM/qwen-code issue #3159「qwen3.6 在子代理中出现无限循环调用同一工具」。官方未直接回应（后续 Next 以 800K 可验证任务 + 多工具模板训练缓解）。
3. **「benchmark hacking」历史指控**：stuartjohnson12 引 winbuzzer 2025-01-29 报道（Qwen2.5-Coder 时代 SOTA 自报争议）质疑 SWE 成绩；swyx 当场反驳「disingenuous」；社区分「信」与「疑」两派。官方未回应此轮指控。
4. **限速/免费额度**：知乎 roo code 用户「coder 一直限速」；V2EX 魔搭免费额度「8 月中各种截断报错」。属渠道问题非模型本体，官方无专门回应。

**大事记**
- 2025-07-22：正式发布 480B-A35B + Qwen Code CLI；HN 765 pts/366 cmts、r/LocalLLaMA 1.9K votes
- 2025-07-23：知乎问题上线（后被浏览 41.2 万+）
- 2025-08-01：30B-A3B-Instruct 发布；官方公告 480B 工具调用修复需重下载；Cerebras 托管上线（HN 47 pts）
- 2025-09-23：qwen3-coder-plus 上线 OpenRouter（1M 上下文，$0.65/$3.25）
- 2025-12-16：jayvanzyl 演示 Cursor Agent Mode 单 prompt 生成 2D 游戏
- 2026-02-03：Qwen3-Coder-Next 发布（80B/3B，HN 735 pts/429 cmts）
- 2026-03-03：Next 技术报告上 arXiv（2603.00729）

### 6. Harness 实测（阶段 E）

- **claude-code**：官方 proxy（dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy）+ claude-code-config（ccr 路由器）；storus 实测取代 Opus 4.6 全栈用途
- **cursor**：非原生收录，走百炼 OpenAI 兼容端点（compatible-mode/v1）；jayvanzyl 单 prompt 生成完整 2D 游戏、体验「接近 GPT-4 agent mode」
- **openhands**：nebius 用 OpenHands v0.54.0 复测 SWE-bench Verified 100-turn Pass@1 = **66.5%**（开源第一梯队），67,074 条轨迹开源；OpenHands vibe check #3（GPT-5 > Sonnet 4 > Qwen-3 Coder > Kimi-K2）
- **windsurf**：Cerebras 托管 2000 tok/s（@devindesktop 实测视频，103 RT）
- **cline**：官方 OpenAI 兼容配置方案（Dashscope key + qwen3-coder-plus）

### 7. 诨名

- **Claude 国产平替**（CSDN/知乎/掘金：「Qwen Code 已成为 Claude Code/Gemini CLI 的国产平替」）
- **Best Kept Secret**（r/LocalLLaMA 帖题「Is Qwen3-coder the best kept secret out there?」）
- **Qwen3-Coder-Flash**（Unsloth 对 30B-A3B 版的代号）
- **小身板大码力**（知乎对 Next 的形容，系列通用）

---

## 二、核验与矛盾（以实测为准）

| 项目 | 站点 models.ts 基线 | 实测结果 | 处理 |
|---|---|---|---|
| 发布日期 | 2026-05-06（collectedDate 05-10） | 480B 官方 2025-07-22；Next 迭代 2026-02-03 | **矛盾**：models.ts 日期无任何版本对应，疑录入错误。详情页以官方 2025-07-22 为准，矛盾记录于此并进 uncertainties |
| SWE 基线 | swe: 66.2 | 480B 第三方 SWE-bench Verified 66.5%；Next 70.6-74.2（多口径） | 66.2 与 480B 的 66.5% 同量级，保留为 480B 口径 |
| 价格 | $0.4/$1.6 | OpenRouter qwen3-coder-plus $0.65/$3.25；30B 版更便宜 | 详情页用 $0.65/$3.25（OpenRouter 实价），矛盾进 uncertainties |
| arenaElo | 1288 | LMArena 无 480B 可复核 ELO 公开记录 | 保留基线，进 uncertainties |
| HN 发布帖 44653072 | 765 pts/366 cmts（qwen3.md 已有） | Algolia 复测 765 pts / 366 cmts ✓ | 保留 |
| Reddit 发布帖 | —（新增） | 1.9K votes / 258 cmts（1m6qdet） | 新增进 heat |
| 知乎热度 | —（新增） | 浏览 412,282 / 152 回答 / 558 关注（2026-08-10 直抓） | 新增进 heat |
| Aider 480B | —（新增） | Unsloth 61.8%；arXiv 复现 60.40 | 用 61.8%（Unsloth）/60.4（arXiv）双口径 |
| 上一代 Aider | —（新增） | Qwen2.5-Coder-32B 官方 73.7 | 用于 versionDelta，注明评测集扩大不可严格对比 |

---

## 三、未找到（进存疑/placeholder）

1. **官方 SWE-bench 自报精确数字**：官方博客榜单表为图片无法抓取文本，只有「开源 SOTA（无 test-time scaling）」定性表述；以第三方 66.5% 为准（serenitiesai + nebius 双源一致）。
2. **LMArena 精确 ELO**：480B 无公开可复核 ELO；models.ts 基线 1288 无法验证。
3. **X 情绪比例**：无法量化（仅抓取到 RT 数字），整体情绪比例含推断成分。
4. **480B 本地部署体感**：只有 6×7900XTX 7 tok/s 单点数据，无系统评测。
5. **Qwen3-Coder-Next 中文社区专项反馈**：中文站（知乎/Linux.do）对其深度横评较少，Next 相关数据多来自英文 tech report 与 HN。
6. **effort 分档**：Qwen3-Coder 为 Instruct（非思考系）无 effort 档位，整个 effortBench 字段缺省（与 qwen3.ts 处理一致）。
