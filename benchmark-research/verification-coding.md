# 核验报告 · 编程工程（2026-08-13 联网核验）

## SWE-bench Verified — REAL
- 主办方：SWE-bench 团队（Princeton NLP）× OpenAI，2024-08 发布
- 测什么：从原版 SWE-bench 2294 个真实 GitHub issue 中人工筛出的 500 个高质量任务，测 agent 端到端修 bug 能力
- 计分：patch 应用到仓库后跑单元测试，% Resolved（pass@1）
- 链接：https://www.swebench.com/
- 备注：**OpenAI 2026-02 宣布弃用**（审计发现 138 个任务中 59.4% 存在测试缺陷/数据污染），行业重心转向 SWE-bench Pro。档案须注明「官方已弃用」。

## SWE-bench Pro — REAL
- 主办方：Scale AI，2025-09，arXiv:2509.16941
- 测什么：1865 个来自 41 个活跃仓库的企业级长周期任务，刻意比 Verified 更难、抗污染；分 public/held-out/commercial 三集
- 计分：% Resolved；公开集有官方榜单
- 链接：https://scale.com/research/swe_bench_pro
- 备注：前沿模型仅 ~23%–69%（vs Verified 80%+），区分度高。

## SWE-bench Multilingual — REAL
- 主办方：SWE-bench 官方团队（Princeton/Stanford 系），2025
- 测什么：300 个真实 GitHub issue，覆盖 9 种语言（C/C++/Go/Java/JS/TS/PHP/Ruby/Rust）、42 仓库
- 计分：% Resolved
- 链接：https://www.swebench.com/（Multilingual 分榜）
- 备注：⚠️ 勿与字节跳动 Multi-SWE-bench（arXiv:2504.02605，7 语言 1632 实例）混淆；部分第三方站数据混写，以「300 题/9 语言/官方团队」为准。

## SWE-Marathon — REAL（官方写法带连字符）
- 主办方：Abundant 主导，Stanford/UCSB/Harvard/Waterloo 等，2026-06，arXiv:2606.07682
- 测什么：20 个超长周期项目级任务（agent 时限 2–10h，人类专家估 40–400h）：库复现、全栈克隆、ML 系统工程；单次 rollout 平均 2720 万 token
- 计分：pass@1 resolved rate，每任务 5 次；隐藏测试 + 行为对齐 + 性能门槛多层验证，内置 reward-hacking 审计
- 链接：https://swe-marathon.org
- 备注：与 SWE-bench 无官方血缘；最强 agent <30%。

## Terminal-Bench — REAL
- 主办方：Stanford × Laude Institute（2.0 与 Snorkel AI 合作），arXiv:2601.11868
- 测什么：agent 在真实终端完成硬核任务（编译内核、配系统、安全/密码、数据处理）
- 计分：任务通过率，统一 Harbor harness + Docker 容器按最终状态判分
- 链接：https://www.tbench.ai/
- 备注：v1.0（80 任务）→ 2.0（89 任务，2025-10）→ 2.1（当前版）；2.0/2.1 分数不可混比。2026-04 曝提交者作弊（AGENTS.md 塞答案），官方已审查。

## LiveCodeBench — REAL
- 主办方：UC Berkeley（Naman Jain 等），ICLR 2025
- 测什么：滚动收录 LeetCode/AtCoder/Codeforces 新题，按发布日期过滤出模型训练截止后的未见题，防污染竞赛编程；4 场景（生成/自修复/执行/输出预测）
- 计分：pass@1（部分 avg@8），按时间窗切片
- 链接：https://livecodebench.github.io/
- 备注：「v6」= release_v6（约 1055 题，至 2025 年中），比较分数须对齐版本与日期窗。

## Aider Polyglot — REAL
- 主办方：Aider（Paul Gauthier）
- 测什么：Exercism 精选 225 道高难度练习，C++/Go/Java/JS/Python/Rust 六语言，测代码编辑能力与编辑格式遵从
- 计分：pass@2（失败一次可见测试反馈重试）+ 编辑格式正确率
- 链接：https://aider.chat/docs/leaderboards/
- 备注：难度校准到顶级模型 5%–50%（现头部 ~88%）；勿与旧版单语言榜混用。

## HumanEval — REAL
- 主办方：OpenAI，Codex 论文 2021（arXiv:2107.03374）
- 测什么：164 道手写 Python 函数级题，签名+docstring→补全函数体
- 计分：pass@k
- 链接：https://github.com/openai/human-eval
- 备注：严重饱和+污染（预训练 8–18% 逐字重叠），2026 年无区分度；价值在「鼻祖基准」历史定位。EvalPlus/MultiPL-E 的母本。

## EvalPlus — REAL（与 MultiPL-E 拆为两条）
- 主办方：UIUC 等（Jiawei Liu 等），NeurIPS 2023 D&B
- 测什么：给 HumanEval/MBPP 扩充 80×/35× 测试用例，抓「侥幸通过弱测试」的假正确解（HumanEval+/MBPP+）
- 计分：pass@k，同时报 base 与 plus 两档
- 链接：https://evalplus.github.io/

## MultiPL-E — REAL
- 主办方：Northeastern 等（Cassano et al.），arXiv:2208.03133
- 测什么：把 HumanEval/MBPP 机器翻译扩展到 18+ 种语言，测多语言代码生成
- 计分：pass@k
- 链接：https://github.com/nuprl/MultiPL-E

## CRUXEval — REAL
- 主办方：Meta FAIR，arXiv:2401.03065（2024-01）
- 测什么：800 个短 Python 函数，预测输入或输出，测「模拟程序执行」的代码推理
- 计分：input/output 两任务 pass@1
- 链接：https://arxiv.org/abs/2401.03065
- 备注：多语言扩展 CRUXEval-X（19 语言）。

## Frontier-Bench — REAL（2026 新）
- 主办方：Anthropic（内部基准，随 2026 Opus 系列发布披露）
- 测什么：agentic terminal 编程任务，mini-SWE-agent harness + GKE 后端
- 计分：每任务 5 次取平均奖励
- 链接：https://llm-stats.com/benchmarks/frontier-bench-v0.1
- 备注：v0.1，自报分数、无独立论文；勿与 Epoch AI FrontierMath 混淆。

## FrontierSWE — REAL（2026 新）
- 主办方：Proximal Labs，2026
- 测什么：超长时程（单任务 3–4h agent 运行）开放软件工程，分实现/性能调优/研究三类，首版 17 任务
- 计分：mean@5、best@5、平均名次、dominance 等
- 链接：https://benchlm.ai/benchmarks/frontierswe；https://llm-stats.com/benchmarks/frontier-swe-impl
- 备注：GLM-5.2、Qwen3.8-Max、Kimi K3 等 2026 发布均引用。

## FrontierCode（含 Diamond 子集）— REAL（2026 新）
- 主办方：Cognition（Devin 公司），2026-06，150 任务
- 测什么：AI 补丁是否达到「真人 maintainer 愿意合并」标准（mergeability），任务源自 36 个旗舰开源仓库真实 PR，与 20+ maintainer 共建
- 计分：阻断性功能标准（隐藏单测）+ 加权 rubric；patch correctness rate，mean@5
- 链接：https://cognition.com/blog/frontier-code
- 备注：Diamond=最难 50 题子集（最强模型 ~13.4%）；数据私有、有第三方审计批评透明度。

## DeepSWE — REAL（一名两义）
- (a) DeepSWE-Preview：Together AI × Agentica 2025-07 发布的 RL 编码 agent **模型**（非基准）
- (b) DeepSWE 基准：Data Curve 2026 发布，113 个原创长时程任务、91 仓库 5 语言、不回传上游防泄漏，arXiv:2607.07946
- 计分：手写功能 verifier 判解决率
- 链接：https://arxiv.org/abs/2607.07946
- 备注：图鉴收 (b)，备注区分 (a)。

## Codeforces Rating — REAL
- 平台：Codeforces；评测代表作 arXiv:2501.01257（人类可比 Elo）
- 测什么：竞赛题（rating 800–2400+），提交跑隐藏测试，按难度折算 rating
- 计分：Elo/rating（0–4000 量级）
- 链接：https://codeforces.com
- 备注：「CFEval」只是厂商自报 Codeforces 分数的非正式标签，不作主名。

## FullStackBench — REAL
- 主办方：字节跳动，2024-11/12
- 测什么：11+ 应用领域、16 种语言、约 3374 样本的全栈代码生成（配 SandboxFusion 沙箱）
- 计分：pass@1
- 链接：https://github.com/bytedance/FullStackBench

## KernelBench — REAL
- 主办方：METR（Ouyang et al. 2025，arXiv:2502.10517）
- 测什么：PyTorch 参考实现改写高效 CUDA kernel，250 任务三级难度
- 计分：先验证正确性（逐元素比对），再测性能；指标 fast_p（正确且快于基线 p 倍的比例）
- 链接：https://github.com/ScalingIntelligence/KernelBench

## CursorBench — REAL（内部基准）
- 主办方：Cursor / Anysphere（3.0 于 2026-03、3.1 于 2026-07 披露）
- 测什么：真实 Cursor 会话抽取的模糊多文件 monorepo 任务（编辑/重构/修 bug/理解/规划/评审）
- 计分：正确性/质量/效率/交互多维打分 + 成本/token/步数；与线上 Keep Rate 混合评估
- 链接：https://cursor.com
- 备注：任务集不公开，厂商自报。

## ProgramBench — REAL（2026 新）
- 主办方：Meta（含 SWE-bench 作者 John Yang 等），arXiv:2605.03546，2026-05
- 测什么：洁净室重建——给编译好的可执行文件+文档，不给源码禁联网，从零重建行为等价程序（200 任务）
- 计分：隐藏行为测试套件比对；fully-resolved 率（首期全模型 0%）+ almost-resolved
- 链接：https://arxiv.org/abs/2605.03546
- 备注：与 MirrorCode 形态相似结论相反。Kimi K3 发布材料中 "Program Bench" 即指此。

## CC-Bench — REAL
- 主办方：智谱 Z.ai，随 GLM-4.5（2025-07）公开，GLM-4.6 扩展为 CC-Bench-V2（Frontend/Backend 子榜）
- 测什么：Claude Code 框架下多轮真实编程任务（52 任务、六大方向），考工具调用稳定性与完成率
- 计分：两两对决胜率 + token 消耗；轨迹数据集公开
- 链接：https://z.ai/blog/glm-4.6；https://huggingface.co/datasets/zai-org/CC-Bench-trajectories
- 备注：撞名 ccbench.org（独立小库编码 agent 评测），图鉴指智谱版。

## Toolathlon — REAL
- 主办方：HKU/CMU 等（Junlong Li 等），arXiv:2510.25726（2025-10）
- 测什么：agent 跨 32 个真实 MCP 应用、604 个工具执行长程多步工作流，108 任务
- 计分：执行结果自动评分（人工编写规则，≥90% 阈值计成功），报成功率
- 链接：https://arxiv.org/abs/2510.25726

## SVG-Bench — REAL
- 主办方：StarVector 团队（ServiceNow Research、Mila），arXiv:2312.11556
- 测什么：SVG 代码生成（Image-to-SVG、Text-to-SVG），视觉保真度与原语质量
- 计分：SVG 专门指标（保真度/结构/线条质量）
- 链接：https://arxiv.org/abs/2312.11556
- 备注：易混淆项多（SGP-Bench/VGBench/SVGenius）；站内 "SVG Arena" 标签亦归入此条。

## Vibe Code Bench — REAL（2026 新）
- 主办方：H. Tran 等，arXiv:2603.04601；榜单 Vals AI 运营（v1.1）
- 测什么：自然语言 Web 应用需求→完整可部署应用，100 规格、964 项浏览器检查
- 计分：自动化浏览器测试功能点通过率
- 链接：https://arxiv.org/abs/2603.04601；https://www.vals.ai

## DSBench — REAL
- 主办方：UT Dallas 等（Liqiang Jing 等），ICLR 2025，arXiv:2409.07703
- 测什么：数据科学 agent，ModelOff/Kaggle 真实竞赛任务：466 数据分析 + 74 数据建模
- 计分：分析题准确率（容差）+ 建模题任务指标
- 链接：https://github.com/LiqiangJing/DSBench

## ClawBench — REAL（2026 新）
- 主办方：TIGER-AI-Lab，arXiv:2604.08523
- 测什么：浏览器 agent 在 144 个真实网站完成 153 个日常任务（订行程/点外卖/投简历），V2 另 130 任务
- 计分：请求拦截 + DOM 匹配 + LLM judge 综合判成功；最高分仅 33.3%
- 链接：https://github.com/TIGER-AI-Lab/ClawBench
- 备注：偏浏览器 agent；勿与 devswha/claw-bench 混淆。

## OPQA（OpenAI-Proof Q&A）— REAL（内部）
- 主办方：OpenAI，见 GPT-5/5.4/5.6 系统卡
- 测什么：OpenAI 内部真实研发瓶颈 bug 的定位修复，20 个任务（每个曾耗研究员数小时到数天）
- 计分：通过率，数据不公开
- 链接：https://deploymentsafety.openai.com/gpt-5-4-thinking/opqa
- 备注：GPT-5.6 起被 Internal Research Debugging Evaluation 取代。

## QwenWebDev — REAL（内部）
- 主办方：阿里 Qwen 团队，随 Qwen3.7-Plus（2026-05/06）披露
- 测什么：中英双语网页生成，自动渲染 + 多模态 judge
- 计分：类 Elo 分（Qwen3.7-Plus 报 1617）
- 链接：无独立页面（benchmarklist.com 有第三方记录）
- 备注：内部基准仅自报；勿与 Qwen Chat 的「Qwen Web Dev」功能混淆。姐妹基准 QwenSVG。

## 编程盲测挑战赛 — 剔除（并入 LMArena）
- 中文媒体对 LMArena Code/WebDev Arena 盲测机制的描述性叫法，无独立实体。统一标签时映射到 webdev-arena/lmarena。

## Roboflow 视频理解评测 — 剔除
- 查无此正式基准（Roboflow 博客评测系列与 RF100-VL 检测基准是另一回事）。
