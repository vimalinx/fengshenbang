# Qwen3（开源旗舰 235B-A22B）详情页深化 — 调研补遗

调研基准日：2026-08-09（与 data.json 一致）
调研方式：AgentKey MCP（0.1 credits 余额不足，降级免费 API）+ HN Algolia + Exa web search + 官方博客/GitHub 直连
搜索次数：25 次（HN Algolia item/search 12 次、Exa 8 次、curl 直连 5 次）

---

## 一、新发现事实（带 URL）

### 1. Harness 实战评测（最大缺口，已全部补齐）

**Claude Code（原来 3 条全是 placeholder）**
- 官方支持：Qwen3-Coder 官方博客给出 Claude Code 接入方案——`ANTHROPIC_BASE_URL=https://dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy`，用 DashScope key 即可在 Claude Code 里驱动 Qwen3-Coder（480B-A35B）。来源：https://qwenlm.github.io/blog/qwen3-coder/
- 真实用户（HN 47656182, storus）：「Qwen3 coder for Claude Code ... replaced my full-stack use of Opus 4.6 already; it's fine for basic web apps, k8s/docker infra setup, optimizing AI models etc. with only slightly higher error rate than Opus」——Qwen3-Coder 经 Claude Code 驱动已取代其 Opus 4.6 的全栈用途，错误率仅略高。
- 真实用户（HN 48210456, ecshafer）：「Qwen3.6 with claude code works great. I get a lot better results with that than opencode and qwen3.6. Claude Code is a great harness」——强调 harness 工具集成带来的差距。
- 真实用户（HN 45127509, incomingpain，2025-09-04「Ollama and Bifrost –> Qwen3 in Claude Code」帖）：用 Ollama 本地 Qwen3 接 Claude Code，核心动机是「What I've been trying to dodge is the 5 hour limits on Claude Code. This lets me do that」（绕开 Anthropic 5 小时额度限制）。
- 真实用户（HN 45088424, jasonjmcghee）：自研 Rust agent 大量借鉴 Claude Code 思路（str_replace/text editor 工具、bash 工具、todo list），用 Qwen3 Coder 30B「does really well with it」。
- 反向警告（HN 44763281, ktsakas）：用 claude-code-router 走 OpenRouter 接 Cerebras 上 Qwen3 时遇到 API errors——网关链路配置有坑。

**Cursor（原 placeholder）**
- 配置路径：Cursor Settings → Models → OpenAI API Key → Override OpenAI Base URL，填入 OpenAI 兼容端点即可（Novita 教程，$0.29/1M 输入、$1.2/1M 输出；模型名 qwen/qwen3-coder-480b-a35b-instruct）。来源：https://blogs.novita.ai/how-to-use-qwen-3-coder-in-cursor-a-complete-guide/
- 实测：jayvanzyl.me（2025-12-16）在 Cursor Agent Mode 用 Qwen3-Coder-480B（NetMind API）单 prompt 生成 2D 马里奥风游戏，含 pygame 项目结构、player/coins/enemies/collisions——「The experience felt surprisingly close to GPT-4's agent mode」，成本约 $2/1M tokens。来源：https://jayvanzyl.me/we-used-qwen3-coder-to-build-a-2d-mario-style-game-in-seconds-demo-setup-guide/
- 本地方案（ITNEXT, 2026-06-06）：Ollama qwen3-coder:30b + Cursor 自定义 base URL（http://192.168.2.200:11434/v1），零云端、数据不出网。来源：https://itnext.io/run-coding-agents-on-local-ai-zero-cloud-full-control-c7640e9edd6c
- 免费网关：opengate（youssefvdel）把 chat.qwen.ai 账号转成 OpenAI 兼容 API，Cursor/Claude Code 等直接指向本地网关免费用 Qwen 模型。来源：https://github.com/youssefvdel/opengate

**OpenHands（原 placeholder，现拿到硬核 benchmark 数据）**
- nebius 2025-12-23 发布 SWE-rebench-openhands 轨迹集与 RFT 检查点：67,074 条 OpenHands 轨迹、1,823 个 Python 仓库、OpenHands v0.54.0 脚手架；Qwen3-235B-A22B-Instruct-2507 基线在 SWE-bench Verified 上 OpenHands 100-turn Pass@1 = 45.2%（500-turn 46.2%），RFT 微调后 100-turn 59.9%（+14.7）、500-turn 61.7%（+15.5）、Pass@5 74.3%（+6.8）——「outperforming the 30B coding specialist model while using half the parameters of Qwen3-Coder-480B」（480B 66.5% Pass@1）。来源：https://nebius.com/blog/posts/openhands-trajectories-with-qwen3-coder-480b 和 https://huggingface.co/nebius/SWE-rebench-openhands-Qwen3-235B-A22B
- 真实用户（HN 44749139, incomingpain，评 Qwen3-Coder-30B）：「Qwen Code just straight up fails to use it. Fails to use tools and crashes it... Openhands is working really well but occasional [Parameter 'command=st...' errors]」——OpenHands 里 Qwen3 系可用性好于 Qwen Code CLI，但有偶发工具调用参数错误。

### 2. 名家锐评（带署名）

- **Simon Willison**（2025-04-29 发布当天）：「Qwen 3 offers a case study in how to effectively release a model」——盛赞发布生态协调度（Qwen 提前与几乎所有 serving 框架联调，day-one 全量支持，他称从未见过其他模型厂商做到这种程度）。https://simonwillison.net/2025/Apr/29/qwen-3/
- **Simon Willison**（2025-07-30 月评）：「The best available open weight models now come from China... Qwen, Moonshot and Z.ai have positively smoked them over the course of July」——点名 Qwen 2507 系（235B-Instruct/Thinking-2507、Coder-480B、30B-2507 共 5 个版本在列）。https://simonwillison.net/2025/Jul/30/chinese-models/
- **Simon Willison** 评 Thinking-2507（2025-07-25）：实测 pelican SVG 任务「it thought for 166 seconds - nearly three minutes! I have never seen a model think for that long」——为 overthinking 提供了第一手名人证据。https://simonwillison.net/2025/Jul/25/qwen3-235b-a22b-thinking-2507/
- **Simon Willison** 评 Qwen3-4B-Thinking-2507（2025-08-10）：「This is art—pelicans don't ride bikes!」4B 小模型主动吐槽题设荒谬；另记本地 50+ tok/s、<4.5GB RAM。https://simonwillison.net/2025/Aug/10/qwen3-4b/
- **陆首群**（中国开源泰斗、前国务院信息化联席会议办公室常务副主任，InfoQ 引述）：「赞 Qwen3！封闭不能挺举开源人才，创新才能另辟竞争赛道！」https://www.infoq.cn/article/NG4f6BfVqgUPud8t06k8
- **量子位**（明敏，2025-04）：「阿里Qwen3问鼎开源王座！8款模型全面开放，最大杯全方位超越R1」——含 36T token 预训练（Qwen2.5 的 2 倍）、119 语言、4 阶段后训练细节。https://www.qbitai.com/2025/04/278261.html
- **界面新闻**：「阿里发布最强开源模型Qwen3，成本仅为DeepSeek-R1三分之一」——235B 参数量仅为 R1 的 1/3。https://m.jiemian.com/article/12709852.html
- **雷科技**（偏负）：Qwen3-235B 实测「遇到困难问题还是容易陷入『冗长而无用』的推理中」，o3 能答的题它反复绕圈。https://www.leikeji.com/article/69499
- **掘金**（偏负）：「Qwen3 从模型能力上而言，并非跨级别的产品」「小尺寸 MOE 利好小玩家」——30B-A3B 推理性能为 32B 的 2-3 倍。https://juejin.cn/post/7498708421173821490
- **InfoQ AI前线**（付秋伟）：实测 Qwen3 vs DeepSeek R1，代码复杂逻辑题 Qwen3 44s vs R1 80s、「DeepSeek 认为 Qwen3 的代码结果细节上更优」，坐实「思深，行速」。https://www.infoq.cn/article/NG4f6BfVqgUPud8t06k8

### 3. 争议与大事记补全

- **审查机制深挖**：China Media Project（Alex Colville, 2026-02-09）用「thought token forcing」技术展示 Qwen3 对涉华问题的英文回答被系统性地导向正面叙事（自我指令列表被注入），比较国家换成 US/Kenya/Belgium 时指令是「中立客观」——英文受众是「信息引导」重点目标。https://chinamediaproject.org/2026/02/09/tokens-of-ai-bias/
- **ChinaBench 量化**（Adam Holter/Cuberis, 2026-03-09）：qwen3-next-80b 33% 合规 / 58% 拒答 / 9% 搪塞；分类看 Uyghur 0% 合规、Cultural Revolution 67%、Hong Kong/territorial 50%——拒答是「topic-specific 补丁」而非统一策略。https://adam.holter.com/chinabench-open-source-llm-censorship-benchmark-results-across-qwen-glm-kimi-minimax-deepseek-and-gpt-oss/
- **开源去审查实践**：Multiverse Computing 发布 Qwen3-Next-80B-Thinking 去审查版（steering vectors，无 SFT 不注新知识），印证社区「base 模型无审查、instruct 注入审查」的共识。https://www.reddit.com/r/LocalLLaMA/comments/1pu5bob/
- **Aider 争议补细节**（GitHub PR #3908）：最初 AlongWY 提交的「超 Claude 3.7」成绩 Paul Gauthier 无法复现；Qwen 团队在 PR 里给出推荐参数（Temperature=0.7, TopP=0.8, TopK=20, MinP=0）+ 改 chat template 强制 no_think，复测官方阿里 API whole 62.7% / diff 59.1%，与初版 65.3% 同区间——争议本质是「provider 默认 thinking 模式 + 参数不匹配」，非恶意造假，但来源不明的截图确实引发信任危机。https://github.com/Aider-AI/aider/pull/3908
- **overthinking 的 agentic 代价**（Steve Scargall 博客, 2026-05）：Qwen3 系 reasoning 模型隐藏思考块会吃光 max_tokens 预算，导致 `content: null, finish_reason: "length"` 的「HTTP 200 空响应」，让 LangGraph/AutoGen/CrewAI 等 agent 框架静默失败；建议 thinking 模式预算给到 4-6×，日常工具调用关 thinking。https://stevescargall.com/blog/2026/05/is-thinking-mode-affecting-your-agentic-workflows/
- **ollama think 标签回归 bug**（ollama/ollama#12593, 2025-10-13）：0.12.5 起 thinking 默认开启、<think> 块被剥离到 thinking 字段，破坏依赖 content 的既有应用——harness 层真实翻车案例。

### 4. 其他新事实

- HN 43825900 发布帖再核验：869 pts / 388 评（Algolia 显示 56 直接子评论但搜索接口计 388 总评论，与 data.json 一致）。
- HN 44653072（Qwen3-Coder 发布帖）：765 pts / 366 评 ✓ 与 data.json 一致。
- HN 44681565（Thinking-2507 模型卡帖）：155 pts / 64 评 ✓ 与 data.json 一致。
- GitHub QwenLM/Qwen3：27,482 星 / 2,030 fork（Exa 抓取快照，data.json 记 27,486——同一量级，以 27,486 保留并注明）。https://github.com/qwenlm/qwen3
- Aider 官方页面确认全表：235B whole+VLLM bf16+/no_think 65.3%（pass_rate_1 28.0%）、官方阿里 API 61.8%、diff 61.3%、llama.cpp Q5_K_M 59.1%、OpenRouter TogetherAI diff 54.7%（$0.64）、OpenRouter 默认 thinking diff 49.8%（$1.80）；32B whole 45.8%/diff 41.3%；30B-A3B whole+thinking 44-45%（discord 社区数据）、diff 31-32%。https://aider.chat/2025/05/08/qwen3.html
- r/LocalLLaMA 发布帖 1kbzafi「Qwen3 looks like the best open source model rn」确认存在；高赞评论含「Forget benchmarks. Deepseek V3 is still the best.」与「Qwen3 is still largely no match for Claude 3.7 Sonnet or DeepSeek-R1」——为负面情绪提供了实名可引评论。https://www.reddit.com/r/LocalLLaMA/comments/1kbzafi/
- r/LocalLLaMA「Qwen 30B is our preferred model over Claude for bursty and simple workload」（1r7bfco）：B2B 批量场景实测 30B 工具调用一致、无 broken output、无拒答，价格/速度对标 Gemini 2.5 Flash Lite。https://www.reddit.com/r/LocalLLaMA/comments/1r7bfco/
- r/LocalLLaMA「Qwen 3 8B, 14B, 32B, 30B-A3B & 235B-A22B Tested」（1kaqi3k）：横测 235B 总分 95/100，评语「Coding is top notch」「非英语语言略弱 5-10 分」。https://www.reddit.com/r/LocalLLaMA/comments/1kaqi3k/
- Qwen3-4B-Thinking-2507 HF discussion/2：2507 thinking 版思考量可达 10,000 token（hybrid 版 1,000 上限），Ollama 默认 num_ctx=4096 下连 system prompt 都看不到，调 12288 后恢复正常——「更聪明但更烧 token」的实证。

---

## 二、核验修正（以实测为准）

| 项目 | data.json 现值 | 实测结果 | 处理 |
|---|---|---|---|
| HN 发布帖 43825900 | 869 pts / 388 评 | 869 pts / 388 评 ✓ | 保留 |
| HN Qwen3-Coder 44653072 | 765 pts / 366 评 | 765 pts / 366 评 ✓ | 保留 |
| HN Thinking-2507 44681565 | 155 pts / 64 评 | 155 pts / 64 评 ✓ | 保留 |
| GitHub 星标 | 27,486 | 27,482（Exa 快照） | 保留 27,486（注明抓取时点差异） |
| Reddit 2507 发布帖 1m5owi8 | 867 赞 | Reddit API 403 无法复核 | 保留（多源一致） |
| r/LocalLLaMA 1kbzafi | —（新增） | 确认存在「best open source model rn」帖 | 新增进 heat/quotes |
| Aider 65.3% | 65.3% | 官方页确认 65.3% + pass_rate_1 28.0% | 保留并补全 pass_rate_1 |
| Cerebras 1400 tok/s | 1400 | HN 44660127 标题称 1.5k tokens/s | 用 1400-1500 tok/s 区间 |

---

## 三、未找到（进存疑/placeholder）

1. **Claude Code 官方原生收录 Qwen3**：仍无（Anthropic 官方不支持第三方模型，需 DashScope proxy / 网关）。已在 harnessReviews 中如实说明「官方 proxy 路径」而非虚构原生支持。
2. **Cursor 官方模型列表收录 Qwen3**：未收录，全部为「自定义 OpenAI 兼容 base URL」路径——这是事实，不算缺口，但无 Cursor 官方基准背书。
3. **知乎具体帖子浏览/赞数**：知乎 403 无法直抓，浏览量数字无法复核（沿用 data.json 的「多篇万赞评测」定性表述，不给假数字）。
4. **Qwen3-235B 在 OpenHands 上的「体感」中文评测**：只有 nebius benchmark（英文）+ incomingpain 片段，无中文长文实测——保留为占位说明。
5. **X/Twitter 具体转发赞数**：无法核验，维持定性。
