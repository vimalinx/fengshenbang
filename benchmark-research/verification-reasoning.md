# 核验报告 · 推理/数学/科学（2026-08-13 联网核验）

## GPQA Diamond — REAL
- 主办方：NYU/Cohere/Anthropic 研究者（David Rein 等），arXiv:2311.12022，COLM 2024
- 测什么：生物/化学/物理博士级多选题，「Google 搜不到答案」，Diamond=专家答对非专家大多答错的 198 题
- 计分：4 选 1 准确率；专家基线 65–81%，非专家 ~34%
- 链接：https://arxiv.org/abs/2311.12022；https://huggingface.co/datasets/Idavidrein/gpqa

## SuperGPQA — REAL
- 主办方：字节豆包团队 × M-A-P（2077.AI），arXiv:2502.14739（2025-02）
- 测什么：285 个研究生学科（含长尾学科）约 2.6 万道选择题，10 选项（A–J）
- 计分：准确率
- 链接：https://arxiv.org/abs/2502.14739
- 备注：GPQA 的广度扩展版，与 Diamond 互补。

## AIME — REAL（真实赛事 + 社区基准化）
- 赛事方：美国数学协会（MAA）；常用数据集 HuggingFaceH4/aime_2024、math-ai/aime25 等
- 测什么：奥赛级数学，每年 30 题（I+II），答案 0–999 整数
- 计分：精确匹配，常报 avg@k（题量小方差大）
- 链接：https://maa.org/math-competitions/american-invitational-mathematics-examination-aime

## HMMT — REAL
- 赛事方：哈佛/MIT 学生组织；基准化由 MathArena（ETH SRI）赛后数天内完成（HMMT Feb 2025，30 题）
- 测什么：竞赛数学（代数/组合/几何/数论），要求最终答案
- 计分：精确匹配（MathArena 协议）
- 链接：https://hmmt.org；https://matharena.ai
- 备注：价值在「赛后即时评测」防污染。

## MATH-500 — REAL
- 主办方：原始 MATH 为 Hendrycks et al. 2021；500 题采样由 OpenAI（prm800k math-splits）
- 测什么：高中竞赛数学，LaTeX boxed 最终答案
- 计分：符号等价判分
- 链接：https://github.com/openai/prm800k
- 备注：污染风险高、近饱和（R1 97.3%），现多用于中小模型回归测试。

## USAMO — REAL
- 赛事方：MAA；标志性基准论文 ETH SRI「Proof or Bluff?」（arXiv:2503.21934）
- 测什么：证明题（USAMO 2025 六题），暴露「答案对但证明是 bluff」
- 计分：人工专家 0–7 分制
- 链接：https://arxiv.org/abs/2503.21934

## IMO 2025 — REAL（一次性评测事件）
- 2025-07 第 66 届 IMO；Google Deep Think 与 OpenAI 实验模型双双 35/42 达金牌线，IMO 主席参与认证
- 测什么：6 道证明题；每题 0–7 总分 42
- 链接：https://deepmind.google/blog/gemini-deep-think-imo-2025/
- 备注：非持续榜单；OpenAI 评分独立性曾有争议。

## AMC — REAL
- 赛事方：MAA；基准数据集常用 AI-MO/aimo-validation-amc（AMC12 2022+2023 共 83 题）
- 测什么：选择题形式高中竞赛数学，难度低于 AIME
- 计分：答案精确匹配（基准版转数值抽取）
- 链接：https://huggingface.co/datasets/AI-MO/aimo-validation-amc

## MathArena Apex — REAL
- 主办方：ETH SRI × INSAIT，2025-08（matharena.ai/apex）
- 测什么：从 2025 年各公开最终答案型竞赛精选 12 道最难题，选时保证未污染
- 计分：最终答案准确率（MathArena 协议，多次采样）
- 链接：https://matharena.ai/apex
- 备注：MathArena 平台子基准；题源与 HMMT/AIME 2025 可能重叠。

## ARC-AGI — REAL（一个条目，页内分三代）
- 主办方：ARC Prize Foundation（Chollet × Mike Knoop）
- ARC-AGI-1（2019）：抽象推理网格谜题，流体智力；任务通过率（每题 2 次尝试），Grand Prize 门槛 85%
- ARC-AGI-2（2025-03）：更难的二代，2026 年初前沿模型接近/突破 85% 线
- ARC-AGI-3（2026-03，arXiv:2603.24621）：交互式环境，agent 无说明探索、推断目标并规划；基于人类行为基线的效率计分；发布时前沿模型 <1%
- 链接：https://arcprize.org

## HLE（Humanity's Last Exam）— REAL
- 主办方：CAIS × Scale AI（2025-01，Phan et al.），约 1000 名专家出题
- 测什么：100+ 学科硕博级难题，搜索找不到答案；公开集 2500 题（含保留集共 3000）
- 计分：多选+精确匹配简答，accuracy
- 链接：https://agi.safe.ai
- 备注：2026-02 最高约 Gemini 3 Pro 38.3%。

## MMLU — REAL
- 主办方：UC Berkeley（Hendrycks et al.），arXiv:2009.03300
- 测什么：57 学科 1.6 万道四选一，初中到专业水平
- 计分：5-shot accuracy
- 链接：https://huggingface.co/datasets/cais/mmlu
- 备注：已饱和（前沿 88–90%+）+ 污染，被 MMLU-Pro 取代。

## MMLU-Pro — REAL
- 主办方：TIGER-Lab（滑铁卢等），NeurIPS 2024，arXiv:2406.01574
- 测什么：MMLU 加固版：12,032 题、14 学科、10 选项、更偏推理
- 计分：5-shot CoT accuracy
- 链接：https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro

## SimpleBench — REAL
- 主办方：SimpleBench 团队，arXiv:2410.07359（2024）
- 测什么：200 道「看着简单模型却翻车」的常识多选题（时空推理/社会智力/语言陷阱），高中生可答
- 计分：准确率；人类基线 83.7%（o1-preview 仅 41.7%）
- 链接：https://simple-bench.com/

## FrontierScience（含 Olympiad 轨道）— REAL
- 主办方：OpenAI，2026-01，arXiv:2601.21165
- 测什么：Olympiad 轨道=物化生奥赛级短答案题（42 名前国际奥赛奖牌得主/教练编写）；Research 轨道=博士级开放研究子问题；共 700+ 题，160 题开源
- 计分：Olympiad 精确匹配（GPT-5.2 首发 77%）；Research 10 分制 rubric ≥7 记成功（GPT-5.2 仅 25%）
- 链接：https://arxiv.org/abs/2601.21165

## Extended NYT Connections — REAL（社区基准）
- 主办方：独立研究者 Lech Mazur（GitHub lechmazur/nyt-connections）
- 测什么：NYT Connections 文字分组谜题；Extended 版每题加最多 4 个干扰词提难度（原版 o1 已 90.7 近饱和）；651→940 题
- 计分：全部分组正确的百分比
- 链接：https://github.com/lechmazur/nyt-connections
- 备注：勿与学术基准 arXiv:2412.01621 混淆。

## HealthBench — REAL
- 主办方：OpenAI × 60 国 262 名医生，arXiv:2505.08775（2025-05）
- 测什么：5000 段真实医疗对话，准确性/完整性/情境意识/沟通/指令遵循；每段配医生 rubric（共 48,562 评分点）
- 计分：rubric 模型判分；有 Hard/Consensus 子集；2026 新增 Professional 变体
- 链接：https://openai.com/index/healthbench/

## AA-Omniscience — REAL
- 主办方：Artificial Analysis，arXiv:2511.13029（2025-11）
- 测什么：跨领域事实知识可靠性——答对率 + 幻觉率 + 「知道自己不知道」的拒答校准
- 计分：Omniscience Index -100~+100（答对加分、答错扣分、拒答不扣）；另报 Accuracy 与 Hallucination Rate
- 链接：https://artificialanalysis.ai/evaluations/omniscience
- 备注：已纳入 AA Intelligence Index v4.1 组成指标。
