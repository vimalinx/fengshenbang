---
id: mmlu-pro
name: MMLU-Pro
category: reasoning
organizer: TIGER-Lab（滑铁卢大学、卡内基梅隆大学等），NeurIPS 2024，arXiv:2406.01574
url: https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro
aliases: []
traits:
  - 10 选项降蒙对率
  - 14 学科 12,032 题
  - 5-shot CoT
  - 专家审核干扰项
  - 提示词稳健
facts:
  - label: 题量
    value: 12,032 题、14 学科
  - label: 选项
    value: 10 个（83% 的题满 10 项，平均每题 9.47 项）
  - label: 题源
    value: MMLU 清洗 + STEM 题库网站 + TheoremQA + SciBench
  - label: 计分
    value: 5-shot CoT 准确率
  - label: 稳健性
    value: 24 种提示词下波动约 2%（MMLU 为 4~5%）
frontier:
  value: 89.8
  note: >-
    Artificial Analysis 独立复测口径 Gemini 3 Pro 89.8%（2026-08）；BenchLM 43 模型榜 Qwen3.7 Max
    89.6%（2026-08）。发布时（2024-06）榜首 GPT-4o 仅 72.6%。
openSource:
  status: open
  url: https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro
  note: 数据集公开于 HuggingFace（TIGER-Lab/MMLU-Pro），评测代码开源（GitHub TIGER-AI-Lab/MMLU-Pro）
history:
  - date: 2024-05
    event: GitHub 开源
  - date: 2024-06
    event: arXiv:2406.01574 发布，GPT-4o 72.6% 居首，比 MMLU 低约 15 个点
  - date: 2024-12
    event: NeurIPS 2024 收录
  - date: 2026-08
    event: 头部逼近 90%（Qwen3.7 Max 89.6%、AA 口径 Gemini 3 Pro 89.8%），区分度开始收窄
ladder:
  - model: Claude Opus 5
    score: 91.59%
    note: vals.ai 独立复测，2026-08
  - model: Claude Fable 5
    score: 91.50%
    note: vals.ai 独立复测，2026-08
  - model: Gemini 3.1 Pro Preview
    score: 90.99%
    note: vals.ai 独立复测，2026-08
  - model: Gemini 3 Pro
    score: 90.10%
    note: vals.ai 独立复测，2026-08
  - model: Claude Opus 4.7
    score: 89.87%
    note: vals.ai 独立复测，2026-08
  - model: Claude Opus 4.8
    score: 89.58%
    note: vals.ai 独立复测，2026-08
  - model: Gemini 3.5 Flash
    score: 89.52%
    note: vals.ai 独立复测，2026-08
  - model: Grok 4.6
    score: 89.40%
    note: vals.ai 独立复测，2026-08
  - model: Qwen3.7 Max
    score: 89.31%
    note: vals.ai 独立复测，2026-08
relatedIds:
  - mmlu
  - supergpqa
---

## 一句话

MMLU 的加固版：选项加到十个，专考真推理

## 测什么

MMLU-Pro 是为了修 MMLU 的三大毛病而生：饱和、对提示词敏感、知识题多推理题少。它把 57 个学科合并成 14 个大类（数学、物理、化学、法律、工程、心理学、健康等），共 12,032 题，选项从 4 个扩到 10 个，蒙对概率从 25% 降到 10%。题目来源除了清洗后的 MMLU 原题，还补了 STEM 题库网站、TheoremQA（需要用定理求解）和 SciBench（大学理科考试题）里更硬的部分，并经过两轮专家审核纠错。

## 怎么测

构造过程颇有讲究：先用 8 个 7B 级别小模型跑 MMLU，凡是被 4 个以上小模型答对的「太简单」题一律删掉（共删 5,886 题）；再用 GPT-4-Turbo 给每题补出 6 个貌似合理的干扰项，专家复核确保干扰项确实是错的；最终 83% 的题有满 10 个选项，平均每题 9.47 个。标准测法是 5-shot CoT（带思维链示例），模型输出推理过程和最终选项，用正则抽取 A~J 答案算准确率。实测它比 MMLU 稳得多：换 24 种提示词风格，分数波动从 4~5% 缩到 2%。

## 典型任务

和 MMLU 最大的差别在题目「含算量」。MMLU 的物理题多是概念辨析（比如抛球瞬间加速度是多少），MMLU-Pro 里工程、物理类的题则要求列公式、做多步推导和数值计算，再在十个数值选项里挑出正确结果——论文发现工程学科分数低，主要就栽在这类复杂公式推导题上。论文对 GPT-4o 的 120 道错题做了人工归因：39% 是推理过程出错，35% 是缺领域知识，12% 是算错数，能看出这榜确实在考「会想」而不是「会背」。

## 分数怎么看

2024 年发布时最强的 GPT-4o 只有 72.6%，同期它在 MMLU 上是 87.4%——分数直接掉了一截，模型间差距也从 1% 拉开到 9%，区分度明显更好。论文还证实 CoT 思维链在这个榜上能显著提分（GPT-4o 提了 19%），而在 MMLU 上反而帮倒忙，说明这里的题真需要一步步想。如今它是各家模型报告里的常客，70%~85% 区间仍有区分度。

## 含金量与局限

它本质上还是选择题，考不了开放性证明和长链条产出。干扰项由 GPT-4-Turbo 批量生成，虽经两轮专家审核，题目质量终究不如纯手工题库。另外它的题源（MMLU、STEM 网站、TheoremQA、SciBench）都是公开材料，污染风险随时间上升，高分同样可能含水分。

## 冷知识

筛掉「太简单」题的方式是让 8 个 7B 小模型投票：超过一半答对就删，一口气删了 5,886 题。同一条 CoT 思维链在老 MMLU 上帮倒忙、在这里给 GPT-4o 提了 19%，成了两代榜的分水岭。
