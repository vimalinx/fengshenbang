# 核验报告 · Agent/工具使用（2026-08-13 联网核验）

## τ²-Bench（Tau2-Bench）— REAL
- 主办方：Sierra Research；τ-bench（arXiv:2406.12045）升级版
- 测什么：AI 客服 agent 多轮对话中调用 API、遵守业务政策完成任务；「双控环境」——用户模拟器与 agent 都能操作环境；retail/airline/telecom 三域
- 计分：任务成功率，主指标 pass^k（k 次全成功的比例，测稳定性）
- 链接：https://github.com/sierra-research/tau2-bench

## OSWorld — REAL
- 主办方：港大、XLANG Lab 等，arXiv:2404.07972（2024）；OSWorld-Verified=2025 人工核验修复版
- 测什么：computer-use agent 在真实 Ubuntu/Windows/macOS 桌面完成开放任务（浏览器/Office/文件/跨应用），369 任务
- 计分：执行结果自动校验，任务成功率
- 链接：https://os-world.github.io
- 备注：2026 有 OSWorld 2.0（长程版，arXiv:2606.29537）；官方榜区分 verified 与 submitter-run。

## BrowseComp — REAL
- 主办方：OpenAI（随 deep research 发布），arXiv:2504.12516
- 测什么：浏览 agent 多跳搜索定位「藏得深但易验证」的信息，1,266 题
- 计分：答案准确率（pass@1）
- 链接：https://github.com/openai/simple-evals
- 备注：衍生多（BrowseComp-ZH/MM-BrowseComp/Plus），原始版即 OpenAI 版。

## MCP Atlas — REAL
- 主办方：Bandi 等，arXiv:2602.00933（2026 初）；同时是 Scale SEAL 旗下榜单
- 测什么：agent 通过 MCP 调 36 个真实 server、220 个工具完成 1,000 个人工校验任务，跨 server 编排
- 计分：claim-level 逐条核验打分
- 链接：https://arxiv.org/abs/2602.00933
- 备注：与 Scale SEAL 条目互注从属关系。

## ACEBench — REAL
- 主办方：学术论文（Chen et al. 2025），arXiv:2501.12851（修订至 v8，被引 60+）
- 测什么：工具使用综合评测：正常/特殊/agent 多轮三类数据，含不完整指令鲁棒性、细粒度原子能力
- 计分：分类目计分；多轮场景模拟用户交互 + 结果校验
- 链接：https://arxiv.org/abs/2501.12851
- 备注：常与 BFCL、τ-bench 并列引用。

## Claw-Eval — REAL（2026 新）
- 主办方：学术论文（Ye et al.），arXiv:2604.06132；续作 Claw-Eval-Live（动态更新版）
- 测什么：自主 agent 端到端可信度：300 个人工核验任务、9 大类（办公/运维/财务工单/多轮咨询），全轨迹审计
- 计分：2,159 条 rubric，Completion/Safety/Robustness 三维
- 链接：https://arxiv.org/abs/2604.06132
- 备注：勿与 ClawsBench/CLAWMARK/ClawArena 混淆。

## Agent Arena — REAL（重名严重，锚定 Berkeley）
- 主办方：UC Berkeley Gorilla 团队，2024-10（agent-arena.com）
- 测什么：LLM agent 两两对战，用户投票式评估排名
- 计分：Elo 式对战评分
- 链接：https://gorilla.cs.berkeley.edu/blogs/14_agent_arena.html
- 备注：勿与 Microsoft Windows Agent Arena、Android Agent Arena 等混淆；近年活跃度一般。站内「Agent Arena（X · Arena.ai 对战榜）」标签待统一时确认是否指此。

## OpenHands Index — REAL（元基准）
- 主办方：OpenHands（Graham Neubig 团队），2026-01-29
- 测什么：软件工程 agent 综合能力，五类任务组合：SWE-bench Verified（修 issue）+ Commit0（全新开发）+ SWE-bench Multimodal（前端）+ SWT-bench（测试生成）+ GAIA（信息收集）
- 计分：五类加权综合分 + 每实例成本与时长
- 链接：https://www.openhands.dev/blog/openhands-index
- 备注：元基准，注明与子基准从属关系。

## KingBench — REAL（个人创作者基准）
- 主办方：YouTube 创作者「AICodeKing」（2.0/3 版本 + Agent Leaderboard）
- 测什么：真实编码与 agentic 任务（完整项目构建、长程任务、3D 建模），约 8 任务，强调代码品味
- 计分：任务打分汇总（如 80 分制）+ 排名
- 链接：无官网，经创作者视频/帖发布
- 备注：无公开数据集/论文；GLM-5/5.2、DeepSeek V4 Flash 等第三方成绩出自它。标注「个人基准」。

## Scale SEAL — REAL
- 主办方：Scale AI（SEAL Leaderboards 专家评估体系）
- 测什么：专家人工评估覆盖编码/指令遵循/推理；伞形品牌，旗下含 RLI、SWE-bench Pro、MCP Atlas 等
- 计分：专家人工评审排名
- 链接：https://scale.com/leaderboard
- 备注：Remote Labor Index（RLI）测 agent 端到端交付真实远程自由职业项目（Scale × CAIS）。

## Vending-Bench — REAL
- 主办方：Andon Labs，arXiv:2502.15840（2025）；现行 Vending-Bench 2
- 测什么：模型以 $500 本金自主经营模拟售货机生意一年：谈供应商/管库存/定价/应对市场，考长程一致性
- 计分：最终账户余额（多次运行取平均）
- 链接：https://andonlabs.com/evals/vending-bench-2
- 备注：被 Anthropic 系统卡引用；2026-07 仍更新。
