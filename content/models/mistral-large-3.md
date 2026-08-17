---
id: mistral-large-3
name: Mistral Large 3
system: mistral
releaseDate: "2025-12-02"
collectedDate: 08-09
specs:
  contextTokens: 256000
  contextLabel: 256K
  priceIn: 0.5
  priceOut: 1.5
  priceLabel: $0.5/$1.5
scores:
  swe: 82.8
  arenaElo: 1418
editorial:
  title: 欧洲开源旗舰
  tags:
    - 开源
    - 多语言
    - 多模态
  roles:
    - 开源
    - 多模态
    - 长文
profile:
  apiId: mistral-large-3
  vendor: Mistral AI（法国巴黎）
  releaseDate: "2025-12-02"
  access:
    - API
    - 开源权重 · Apache 2.0
    - 自托管
    - 云平台（Bedrock / Azure Foundry / OpenRouter 等）
  costNote: $0.5/$1.5 · Mtok，较 Large 2（$2/$6）降价 75%；批量处理再享 50% 折扣；Medium 3.5 定价为其 5 倍
  nicknames:
    - 欧洲战神
    - DS V3 换皮
    - new llama4
    - 欧洲的 DeepSeek
  signature: "LMArena 开源非推理 #2（全榜 #28）· 675B MoE · API 较上代降 75%"
benchGroups:
  - label: 榜单成绩
    rows:
      - label: LMArena 开源非推理榜
        value: "Elo ~1418 · #2 开源非推理 / #6 开源总 / 全榜 #28"
      - label: LMArena WebDev 榜
        value: Elo ~1487
      - label: MMLU（8 语言）
        value: 85.5%
      - label: HumanEval pass@1
        value: ~92%
      - label: AMC 2022-23 数学竞赛
        value: 52.0%
      - label: GPQA Diamond
        value: 43.9%（独立口径；官方卡报 67.17）
      - label: BenchLM 综合
        value: "#122/215 · 49.57"
  - label: 规格与接入
    rows:
      - label: 上下文窗口
        value: 256,000 tok
      - label: 最大输出
        value: —（官方未披露）
      - label: 价格（入/出）
        value: $0.5 / $1.5 · Mtok（批量再享 50%）
      - label: effort 档位
        value: —
      - label: 模型架构
        value: 细粒度稀疏 MoE · 675B/41B 激活 + 2.5B 视觉编码器
      - label: 发布日期
        value: "2025-12-02"
      - label: 获取方式
        value: API · 开源权重（Apache 2.0）· 自托管
constellation:
  - version: Mistral 7B
    date: 2023-09
    effect: 初代种子引爆开源圈 · 磁力链发布震动业界
  - version: Mistral Large
    date: 2024-02
    effect: 旗舰首秀 · 欧洲首个前沿级开源模型
  - version: Mistral Large 2
    date: 2024-07
    effect: Dense 123B · 128K 上下文 · 研究许可封顶
  - version: Mistral Large 3
    date: 2025-12
    effect: MoE 675B · 原生多模态 · Apache 2.0 全开放
    current: true
talents:
  - kind: burst
    seal: 御
    name: 企业级落地
    desc: >-
      欧洲大行背书的主权 AI 底座：HSBC 多年期战略合作、BNP Paribas 比利时 on-prem KYC 部署（数据不出银行围墙）、NTT DATA 主权 AI、Abanca
      200 万客户代理编排，2026-07 再添 Airbus 主权 AI 合作。
    metric: KYC 不完整文件率 80% → 10% · Abanca 200 万客户
  - kind: skill
    seal: 文
    name: 创意写作
    desc: >-
      指令遵循优秀，社区称「最听话的写作模型」，角色扮演能呈现鲜活人格，非英语文档幻觉漂移显著更低；r/MistralAI 长测（62 赞）称写作质量可匹敌 Claude 4.5 /
      GPT-5.1 Thinking。
    metric: noviai「最听话」· 写作长测 62 赞 · 对比月余
  - kind: skill
    seal: 阅
    name: 多语多模态
    desc: >-
      2.5B 视觉编码器原生支持 OCR 与文档理解，覆盖 40+ 语言、欧洲语言突出（法语/德语/西语/意语等），256K 长上下文；HN 用户称「The first really big
      open weights model that understands images」。
    metric: 2.5B 视觉编码器 · 40+ 语言 · 256K
  - kind: passive
    seal: 开
    name: Apache 2.0 开放
    desc: 完全开源可商用、可自托管微调；FP8 单节点 B200/H200 或 NVFP4 单节点 H100/A100 即可部署；但中文媒体普遍解读为「被 DeepSeek 逼出来的战略调整」。
    metric: API 较上代降价 75% · 自托管单节点
community:
  strengths:
    - 开源可商用
    - 多语言覆盖
    - 256K 长上下文
    - 多模态 OCR
    - 创意写作
  weaknesses:
    - 深度推理不足
    - 幻觉率偏高
    - 工具调用不稳
    - 部署门槛高
    - 同尺寸性价比低
  upgradeConsensus: wait
  platforms:
    - name: Reddit
      tone: neg
      summary: >-
        负面偏多（35/50/15）：「Unimpressed」帖 135 赞 67 评引爆落差争议（快照），「Mistral 3 Blog post」553 赞 170
        评力挺开源；公司路线帖「What happened to Mistral?」326 赞 175 评（快照）与「Is Mistral chasing the frontier
        anymore?」105 赞。
    - name: HackerNews
      tone: mix
      summary: >-
        混合偏负（30/45/25）：发布帖 826 points/236 评论（实测核验 ✅）；「Mistral has fall really far behind since
        2025Q3」与「price, speed, reliability 无脑推荐」并存；顶评 arnaudsm 给出 4 基准几何均值 41.9，位于 80 分档断层之下。
    - name: 知乎
      tone: pos
      summary: >-
        较正面（中文社区整体 55/25/20）：「曾经的欧洲战神 Mistral 又来了」等多篇架构与开源价值深度解析；腾讯/掘金侧「对标全是中国模型」「被 DeepSeek 逼回
        Apache 2.0」叙事亦有共鸣。
    - name: X
      tone: pos
      summary: >-
        专门讨论较少：Mistral 官方账号活跃（Mensch 与 a16z 互动造势夏日新模型），部分开发者转发开源价值；TechNews 转述 X 用户「Mistral
        正在缓慢死亡」的尖锐批评（更笨/更贵/更慢）成负面代表。
    - name: HuggingFace
      tone: pos
      summary: >-
        「Mistral 3 Large 675B up on huggingface」209 赞/60 评（快照）；模型卡在线 Playground 可切换 BF16/NVFP4
        权重；发布当晚官方 collection 链接一度 404 后修复。
    - name: 掘金
      tone: mix
      summary: >-
        「欧洲的 DeepSeek」发布解读多篇：认可 Apache 2.0 回归与 MoE 架构，但明确点出「全线回归是被 DeepSeek 逼出来的战略调整」，Mini-stral
        三变体带视觉获好评。
  quotes:
    - text: Love it! Right the perfect size for Building.
      source: r/LocalLLaMA · 553 赞帖（快照）
      tone: pos
    - text: pretty good at creative writing.
      source: r/SillyTavernAI
      tone: pos
    - text: If price, speed, and reliability are a concern I cannot recommend Mistral enough.
      source: HackerNews
      tone: pos
    - text: this seems to be the new llama4.
      source: r/LocalLLaMA · Unimpressed 帖（快照）
      tone: neg
    - text: Mistral has fall really far behind since 2025Q3.
      source: HackerNews
      tone: neg
    - text: Basically any Chinese lab is doing much better.
      source: antirez（Redis 作者）· HackerNews
      tone: neg
  controversies:
    - event: >-
        榜单与体感落差：LMArena 开源非推理 #2（Elo ~1418、全榜 #28），但「Unimpressed」帖（135 赞，快照）实测称「impressively
        bad」「around Mistral Large 2 level」；质疑帖发现排名「just below Qwen3 30B」；发布次日 DeepSeek-V3.2
        抢先一天发布（982 pts）夺走风头，官方对标表只放 V3.1 不放 V3.2 遭 HN 质疑「stole all the thunder」。
      response: >-
        官方强调「most capable model to date」「best permissive open-weight models in the
        world」，以企业采用（HSBC/BNP Paribas/NTT DATA/Abanca/Airbus）佐证价值；HN 用户替其辩护「若考虑
        price/speed/reliability，无脑推荐」。
    - event: >-
        推理能力严重落后：GPQA Diamond 43.9%（竞品 70-85%）、AAII 仅 16 分（Medium 3.5 都到 30），HN 用户称「严重落后」；且 HN 用户
        tootyskooty 指出「官方榜单数字是 base model 的，不是 API 里的 instruct model——很可能 instruct 表现更差」；reasoning
        版本（Magistral 大档位）迟迟未出。
      response: >-
        HF 模型卡自认「Not a dedicated reasoning model」「Behind vision-first models in multimodal
        tasks」，官方以 System 1 快速匹配设计定位解释；2026-04 Medium 3.5 上位后，Large 3 甚至被移出官网 Featured Model 列表。
    - event: >-
        对标声明存疑：官方对标 DeepSeek-V3.1/K2，但用户普遍认为同尺寸下不如
        DS-V3.2/GLM-4.6/Qwen3-235B；腾讯新闻直指「对标的，全是中国模型」；2026-05-28 AI Now Summit 无任何新前沿模型，antirez
        公开批评「accumulating too much technological delay」。
    - event: >-
        工具调用不稳 + 幻觉率偏高：TechNews 转述测试者「难正确执行工具调用，常输出格式错误或无效指令」（agentic 场景硬伤）；SimpleQA 仅约
        23.8%，高精度事实问答场景风险大。
  subBoards:
    - name: LMArena 开源非推理榜
      rank: "#2"
      note: "Elo ~1418 · 开源总量 #6 · 全榜 #28（榜首 1491）"
    - name: LMArena WebDev 榜
      rank: Elo ~1487
      note: 编程/网页开发子榜单
    - name: BenchLM 综合
      rank: "#122/215 · 49.57"
      note: 16 项公开分数
    - name: Artificial Analysis 智能指数
      rank: 16 分
      note: 低于同门 Medium 3.5（30）/Devstral 2（19），同类中位数 17
    - name: 4 基准几何均值（HN 顶评）
      rank: "41.9"
      note: MMMLU+GPQA-Diamond+SimpleQA+LiveCodeBench，vs DS-3.2 的 83.6
  heat:
    - label: HN 发布帖
      value: 826 pts（实测核验 ✅）
    - label: HN 评论
      value: 236（实测核验 ✅）
    - label: Devstral 2 + Vibe CLI 帖
      value: 745 pts（12-09）
    - label: Reddit 最高赞
      value: 553（Blog post 帖 · 快照）
  expertQuotes:
    - text: 曾经的欧洲战神 Mistral 又来了。
      name: 知乎专栏
      role: 中文社区深度解析
      tone: pos
    - text: 在核心评测上能与 Qwen、Gemma 底模正面硬刚。
      name: 53AI
      role: 中文科技媒体
      tone: pos
    - text: 论开源，国内绝对是独一档的存在。
      name: 知乎理性分析
      role: 与 DeepSeek/Qwen 差距讨论
      tone: neg
    - text: 在非英语技术文档和遗留代码库上，幻觉漂移显著低于 Mistral 以外的模型。
      name: r/MistralAI 长测帖
      role: 写作专项 · 62 赞 28 评（快照）
      tone: pos
    - text: 在 KYC 流程中部署 Mistral 模型后，不完整文件率从 80% 降至 10%。
      name: BNP Paribas
      role: 峰会视频证言 · 比利时 on-prem 落地
      tone: pos
    - text: Mistral Large is one of the most obedient models for writing.
      name: noviai.ai
      role: 写作专项评测
      tone: pos
    - text: >-
        our most capable model to date... one of the best permissive open-weight models in the
        world.
      name: Mistral AI
      role: 官方发布博客
      tone: pos
    - text: >-
        Not a dedicated reasoning model. Behind vision-first models in multimodal tasks. Complex
        deployment.
      name: Mistral AI
      role: HF 模型卡 · 已知局限
      tone: neg
    - text: Large 3 appears to lose to them all even on the general intelligence index.
      name: Medium 评测（Barnacle Goose）
      role: 深度评测 · AAII 16 分
      tone: neg
    - text: >-
        cannot yet be treated as a substitute for a highly calibrated, abstention-aware research
        assistant without additional scaffolding.
      name: Medium 评测
      role: 深度评测
      tone: neg
    - text: Love it! Right the perfect size for Building.
      name: u/ 热帖楼主
      role: r/LocalLLaMA · 553 赞 170 评（快照）
      tone: pos
    - text: >-
        I really like Large 3, I didn't know there was a negative reaction until I came to this
        sub-reddit.
      name: r/MistralAI 用户
      role: 口碑正名帖
      tone: pos
    - text: From initial testing (coding related), this seems to be the new llama4.
      name: u/ 热帖楼主
      role: r/LocalLLaMA · Unimpressed 帖 135 赞（快照）
      tone: neg
    - text: >-
        Mistral Large 3 though is...impressively bad. Mistral Medium 3.2 is legitimately more
        intelligent, and that's not exactly saying much.
      name: u/ 热帖楼主
      role: r/LocalLLaMA · Unimpressed 帖
      tone: neg
    - text: >-
        from my tests it is around Mistral Large 2 level, maybe creativity wise a bit better, but
        not much.
      name: u/ 回复
      role: r/LocalLLaMA · Unimpressed 帖
      tone: neg
    - text: >-
        Mistral has fall really far behind since 2025Q3. It seems they can't get good reasoning
        models working at even medium context sizes.
      name: HN 用户
      role: HackerNews · 发布帖 / AI Now Summit 顶评
      tone: neg
    - text: >-
        But they are accumulating too much technological delay... Basically any Chinese lab is doing
        much better.
      name: antirez（Salvatore Sanfilippo）
      role: Redis 作者 · AI Now Summit 评论
      tone: neg
    - text: Deepseek 3.2 stole all the thunder yesterday... Just unfortunate timing of release.
      name: mrinterweb
      role: HackerNews · 发布帖
      tone: mix
    - text: >-
        Geometric mean 41.9 for Mistral Large 3 — a tier below Gemini 3.0 Pro (84.8) and DeepSeek
        3.2 (83.6).
      name: arnaudsm
      role: HackerNews 顶评 · 4 基准几何均值
      tone: neg
    - text: >-
        the best ai writing tool in 2026 isn't a single model anymore, it's just whichever one isn't
        currently acting lobotomized.
      name: r/MistralAI 长测帖楼主
      role: 写作长测 · 62 赞（快照）
      tone: mix
    - text: >-
        pretty good at creative writing, but will run into logical errors and fail to follow more
        complex rulesets.
      name: r/SillyTavernAI 用户
      role: 写作社区实测
      tone: mix
    - text: Mistral 3 Large is DeepSeek V3!?
      name: u/ 架构帖楼主
      role: r/LocalLLaMA · 175 赞 31 评
      tone: mix
  timeline:
    - date: 12-01
      event: DeepSeek-V3.2 抢先一天发布（HN 982 pts）夺走风头；HSBC 官宣多年期战略合作，银行内规模化部署 Mistral
    - date: 12-02
      event: >-
        官方发布 Mistral 3 家族（Large 3 675B + Ministral 3B/8B/14B），全部 Apache 2.0；HN 826 pts/236
        评论，r/LocalLLaMA 553 赞
    - date: 12-03
      event: 中文媒体集中报道（腾讯「对标全是中国模型」/IT之家/掘金）；r/LocalLLaMA 出现榜单质疑帖
    - date: 12-05
      event: HuggingFace 权重正式上线（BF16/NVFP4），上线帖 209 赞/60 评（快照）
    - date: 12-07
      event: 「Unimpressed」帖（135 赞/67 评，快照）引爆榜单与体感落差争议，「new llama4」成社区梗
    - date: 12-09
      event: 发布 Devstral 2 + Mistral Vibe CLI（HN 745 pts）：官方编程栈转向 Claude Code 平替路线，SWE-bench 72.2%
    - date: 05-28
      event: Mistral AI Now Summit（HN 466 pts）：无新前沿模型，发布 Vibe 改名 + Airbus/BMW 工业 AI 栈，antirez 批评技术延迟
    - date: 07-16
      event: Airbus 官宣主权 AI 合作；r/MistralAI「What happened to Mistral?」326 赞（快照）反映公司路线争议持续
  sources:
    - title: Mistral 3 family of models released
      platform: Mistral 官方博客
      url: https://mistral.ai/news/mistral-3
    - title: "Introducing: Devstral 2 and Mistral Vibe CLI"
      platform: Mistral 官方博客
      url: https://mistral.ai/news/devstral-2-vibe-cli/
    - title: Mistral Large 3 (2512) Review
      platform: Medium
      url: https://medium.com/@leucopsis/mistral-large-3-2512-review-7788c779a5e4
    - title: "r/LocalLLaMA: Unimpressed with Mistral Large 3 675B"
      platform: Reddit
      url: https://www.reddit.com/r/LocalLLaMA/comments/1pgv2fi/unimpressed_with_mistral_large_3_675b
    - title: "r/LocalLLaMA: Mistral 3 Blog post"
      platform: Reddit
      url: https://www.reddit.com/r/LocalLLaMA/comments/1pcayfs/mistral_3_blog_post
    - title: "Mistral Large 3: An Open-Source MoE LLM Explained"
      platform: IntuitionLabs
      url: https://intuitionlabs.ai/articles/mistral-large-3-moe-llm-explained
    - title: mistralai/Mistral-Large-3-675B-Instruct-2512 · Hugging Face
      platform: HuggingFace
      url: https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512
    - title: Mistral Large 3 on Artificial Analysis
      platform: Artificial Analysis
      url: https://artificialanalysis.ai/models/mistral-large-3
    - title: Mistral 3 发布｜对标的，全是中国模型
      platform: 腾讯新闻
      url: https://news.qq.com/rain/a/20251203A02YY100
    - title: Notes from the Mistral AI Now Summit
      platform: Hacker News
      url: https://news.ycombinator.com/item?id=48325340
  uncertainties:
    - constellation 前代日期（Mistral 7B 2023-09、Mistral Large 2024-02）依据公开发布时间补全，非调研数据原文
    - 各平台情绪比例为代表性帖文估算（整体 35/45/20），非严格量化；Reddit 数字为 2026-08-01 快照（本网络全渠道被拦，未复测）
    - LiveCodeBench 数据分歧：llm-stats 34.4% vs Medium v6 82.8%，版本/指标不同所致
    - GPQA Diamond 口径分歧：官方卡报 67.17 vs 独立测试 ~44%，本文件取独立口径 43.9%
    - 「榜单数字是 base model 而非 API instruct model」为 HN 用户 tootyskooty 推断，官方未回应
    - X 平台社区自发讨论热度有限，情绪评估以官方账号活跃度与 TechNews 转述推断
  versionDelta:
    base: Mistral Large 2
    improves:
      - 架构 Dense 123B → MoE 675B/41B 激活，推理成本接近 40-50B 稠密模型
      - 上下文窗口 128K → 256K
      - 新增原生多模态视觉（OCR/文档理解/图像问答）
      - 许可证 研究许可 → Apache 2.0，完全商业使用 + 自托管
      - "MMLU 85.5% · HumanEval ~92% · LMArena 开源非推理 #2（Elo 1418）"
      - API 定价较 Large 2 降价 75%（$2/$6 → $0.5/$1.5）
    regresses:
      - 深度推理大幅落后：GPQA Diamond 43.9%（竞品 70-85%）
      - 幻觉率偏高：SimpleQA 仅约 23.8%
      - 工具调用不稳：常输出格式错误或无效指令（TechNews 实测）
      - 675B 体积远超 123B，本地部署门槛大增（需 8×H100 或 Mac Studio 128GB+）
      - 实测体感接近 Large 2，创意写作略好但整体提升有限
      - >-
        同尺寸下性价比不如 DS-V3.2/GLM-4.6/Qwen3-235B；2026-04 后 Medium 3.5（定价 5×）上位，Large 3 移出官网 Featured
        Model
  harnessReviews:
    - id: claude-code
      text: >-
        实测 500KB 私有项目半小时内正确理解代码库，但 basic edits 会丢闭合括号、React 差 Python 好；AA 实测 40 tok/s、TTFB
        1.29s，速度与推理是短板，作 CC 后端仅适合写作/文档类轻任务。
    - id: cursor
      text: >-
        OpenRouter 可接入；WebDev Elo ~1487、LiveCodeBench 数据分歧 34.4% / 82.8%；AA 实测 40 tok/s「notably
        slow」，建议仅在多语言/创意写作任务尝试。
      placeholder: true
    - id: openhands
      text: >-
        用户实测「OpenHands 化训练 crippled 了实用性」，Devstral 2 已转向自家 CLI；675B 自托管需 8×H100/A100
        单节点（NVFP4），缺专门量化实测，建议等官方适配。
  demos:
    - title: Introducing Mistral 3（官方发布博客）
      desc: >-
        发布页含 base/instruct 性能对比图（对标 DeepSeek V3.1、Kimi K2 等）、LMArena 开源非推理 #2 排名图，公布 3000×H200
        训练、NVFP4 量化与 NVIDIA/vLLM/Red Hat 联合优化细节。
    - title: HuggingFace 模型卡与在线对话演示
      desc: >-
        mistralai/Mistral-Large-3-675B-Instruct-2512 提供在线 Playground widget，可切换 BF16/NVFP4
        权重，附多语言与视觉（OCR/图像理解）能力说明；Ministral 3B WebGPU 版可直接跑浏览器。
    - title: Mistral AI Studio 控制台
      desc: >-
        mistral-large-latest 端点 $0.5/$1.5 每百万 token 即开即用，支持图像理解、40+ 语言与 256K 长上下文在线体验；同台可切 Devstral
        2 体验官方编程栈。
relations:
  rivals:
    - deepseek-v3-2
    - qwen3
    - llama-4
  teams:
    - budget-vanguard
    - common-warlord
  guides:
    - beginner-budget
    - beginner-first-model
    - mech-context-decay
  bestInSlot:
    - id: claude-code
      note: 无官方集成；平替 Devstral 2 + Vibe CLI（SWE-bench 72.2%）可作 CC 替代，偏慢。
    - id: cursor
      note: 无官方接入，仅 OpenRouter 可用；常规编程可用但复杂工程二线，性价比不如 DS-V3.2/Qwen3。
    - id: openhands
      note: 可经 OpenAI 兼容端点接入；Large 3 无专用适配、自托管门槛高，存疑。
  trialGood:
    - label: 多语言创意写作
      to: /scenarios#docs
    - label: 常规代码开发
      to: /scenarios#fullstack
    - label: 长文文档与 OCR
      to: /scenarios#docs
  trialBad:
    - label: 深度推理与数学
      to: /scenarios#algo
      note: GPQA 43.9% 远落后竞品，建议换 deepseek-r2
    - label: 高精度事实问答
      to: /scenarios#docs
      note: SimpleQA 仅 23.8%，幻觉风险高，建议换 glm-5-2
    - label: 复杂工程重构
      to: /scenarios#refactor
      note: 现代编程套件二线水平，建议换 deepseek-v3-2 或官方 Devstral 2
    - label: Agent 工具调用
      to: /scenarios#agent
      note: 常输出格式错误/无效工具指令，建议换 deepseek-v3-2
---

## 一句话点评

LMArena 开源非推理第二却体感翻车——Apache 2.0 全开放与原生多模态是实打实的资产，推理短板与榜单落差让社区集体观望。

## 社区反馈 · 编程

两极分化：HumanEval ~92% 常规代码「clean and modular」，但 LiveCodeBench 数据分歧（llm-stats 34.4% / Medium v6 82.8%）且 4 基准几何均值仅 41.9（vs DeepSeek 3.2 的 83.6 断层）；IntuitionLabs 称「在更现代有挑战的编程套件上处于二线水平」。用户实测（HN 46205437）其官方编程栈 Devstral 2「Python 出色、React 差、会丢闭合括号」，作 Claude Code 替代「not bad 但慢」；2026-01 实测（HN 46679872）「Kimi K2、GLM 4.7、Mistral Large 3、DeepSeek 都是 Sonnet 4 级，但远不及 Opus 4.5」。

## 社区反馈 · 推理

最大短板：GPQA Diamond 独立口径仅 43.9%（vs GPT-5.1 的 88.1%、DS-V3.2/Kimi K2 的 70-85%；官方卡报 67.17 存口径分歧），AAII 仅 16 分（低于同门 Medium 3.5 的 30、Devstral 2 的 19）；Medium 评测称「深层次科学和研究生级推理任务上表现显著下降」；HF 模型卡自认「Not a dedicated reasoning model」，HN 用户称「fall really far behind since 2025Q3」；reasoning 版 Magistral 系列（2025-06 首发的 941 分帖家族）始终未覆盖 Large 3 档位。

## 社区反馈 · 中文

覆盖含中文但非优化重点：知乎/掘金讨论多聚焦架构与开源价值（「欧洲的 DeepSeek」「对标全是中国模型」成主流叙事），对中文实测评价较少；53AI 称「在核心评测上能与 Qwen、Gemma 底模正面硬刚」但无中文专项数据；腾讯新闻指出官方发布对比只对标 DeepSeek-V3.1/Kimi-K2，多语言胜率 57%/60%，侧面说明中文非强项。

## 升级共识

开源价值与多模态能力获普遍认可：要 Apache 2.0 自托管、欧洲多语言、写作或 OCR 场景值得升级（BNP Paribas 比利时 on-prem 已实证银行级落地）；但推理不达标（AAII 16 分 vs Medium 3.5 的 30）、体感低于榜单预期（几何均值 41.9 处于 80 分档断层），深度推理与复杂工程建议等 Magistral 推理版，或留在 Large 2 / 转用 DS-V3.2、GLM-4.6；想用 Mistral 编程栈的话，官方推荐路线其实是 Devstral 2 + Mistral Vibe CLI（SWE-bench 72.2%）。

## 榜单与实测落差

LMArena 开源非推理 #2（Elo ~1418）却遭实测「impressively bad」——典型「分数高、体感差」。根因是设计偏 System 1 快速匹配，榜单红利集中于传统基准与写作/多模态；HN 顶评 arnaudsm 的 4 基准几何均值（MMMLU+GPQA-Diamond+SimpleQA+LiveCodeBench）把断层量化得很清楚：Gemini 3.0 Pro 84.8 / DeepSeek 3.2 83.6 / GPT-5.1 69.2 / Claude Opus 4.5 67.4 / Kimi-K2 42.0 / Mistral Large 3 41.9 / DS-3.1 39.7——41.9 与 80 分档之间有近一倍的智能差距。推理（GPQA 43.9%）与现代编程短板被榜单遮蔽，写作、OCR、多语言场景可直接用，推理与复杂工程交给 DS-V3.2/Kimi K2 或等 Magistral。
