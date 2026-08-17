---
id: math-500
name: MATH-500
category: reasoning
organizer: 原始 MATH 为 Hendrycks et al. 2021；500 题采样由 OpenAI（prm800k math-splits）
url: https://huggingface.co/datasets/HuggingFaceH4/MATH-500
aliases: []
traits:
  - 经典 MATH 精选 500 题
  - LaTeX boxed 判分
  - 符号等价容错
  - Level 1-5 分档
  - 已近饱和
facts:
  - label: 题量
    value: 500 题，采样自 MATH 测试集（原始题库 1.25 万题）
  - label: 主题
    value: 预代数/代数/几何/数论/计数与概率/中级代数/预备微积分 7 类
  - label: 难度
    value: Level 1–5 五档
  - label: 答案形式
    value: LaTeX \boxed{} 最终答案，符号等价判分
  - label: 出处
    value: OpenAI PRM800K 项目的 math-splits；社区版为 HuggingFaceH4/MATH-500
frontier:
  value: 97.3
  note: DeepSeek-R1 达 97.3%（2025-01，DeepSeek 官方技术报告口径）；此后头部模型基本在 95% 以上，该集已接近饱和。
openSource:
  status: open
  url: https://huggingface.co/datasets/HuggingFaceH4/MATH-500
  note: >-
    数据集在 HuggingFace（HuggingFaceH4/MATH-500）公开，源自 OpenAI PRM800K 项目的 math-splits；原始 MATH
    题库（Hendrycks）亦公开，评测脚本见各评测框架
history:
  - date: 2021-03
    event: Hendrycks 等人发布 MATH 数据集（arXiv:2103.03874），1.25 万道高中竞赛题
  - date: 2023-05
    event: OpenAI 发布 PRM800K（arXiv:2305.20050），其中 math-splits 划定 500 题测试子集
  - date: "2024"
    event: HuggingFaceH4/MATH-500 上线，成为社区默认的快速数学评测集
  - date: 2025-01
    event: DeepSeek-R1 达 97.3%，宣告对前沿模型近饱和，退居回归测试用途
ladder:
  - model: LongCat-Flash-Thinking
    score: 99.2%
    note: llm-stats 聚合，2026-08 居首
  - model: Sarvam-105B
    score: 98.6%
    note: llm-stats 聚合，2026-08
  - model: GLM-4.5
    score: 98.2%
    note: llm-stats 聚合，2026-08
  - model: GLM-4.5-Air
    score: 98.1%
    note: llm-stats 聚合，2026-08
  - model: Nemotron Nano 9B v2
    score: 97.8%
    note: llm-stats 聚合，2026-08
  - model: Kimi K2 Instruct
    score: 97.4%
    note: llm-stats 聚合，2026-08
  - model: DeepSeek-R1
    score: 97.3%
    note: DeepSeek 官方技术报告，2025-01（历史参照）
  - model: Llama 3.1 Nemotron Ultra 253B v1
    score: 97.0%
    note: llm-stats 聚合，2026-08
  - model: MiniMax M1 80K
    score: 96.8%
    note: llm-stats 聚合，2026-08
  - model: Kimi-k1.5
    score: 96.2%
    note: llm-stats 聚合，2026-08
relatedIds:
  - aime
  - amc
---

## 一句话

经典 MATH 题库的 500 题精选子集

## 测什么

原始 MATH 是 Hendrycks 等人 2021 年发布的 1.25 万道高中竞赛数学题；MATH-500 是 OpenAI 在 PRM800K 项目中从 MATH 测试集抽出的 500 题子集（math-splits），因为体量适中、判分方便，成了社区默认的快速数学评测集。题目覆盖预代数、代数、几何、数论、计数与概率、中级代数、预备微积分 7 个主题，难度分 1–5 级，每题都要求给出 LaTeX 格式的最终答案。

## 怎么测

模型看到题目后输出完整解答，把最终答案写在 \boxed{} 里；判分用符号等价（比如 1/2 和 0.5、3√13 的等价写法都算对）而非简单字符串匹配。报整体准确率，也常按难度级别拆开看。HuggingFaceH4/MATH-500 是最常用的数据版本。

## 典型任务

简单的如 Level 3 数论题「196 有多少个正整数因子？」——先分解 196=2²·7²，答案 9。难的如 Level 5 中级代数题「求不超过 (√7+√5)⁶ 的最大整数，不许用计算器」——标准技巧是配上共轭项 (√7−√5)⁶ 凑出整数，答案 13535。还有绕两层的「284 的真因子之和的真因子之和是多少」（答案恰好回到 284）。可以看出 5 级题已经需要真正的技巧，不是套公式能解决的。

## 分数怎么看

它曾是衡量数学能力的主力指标，但 2024 年后快速饱和：DeepSeek-R1 已达 97.3%，头部模型基本都在 95% 上下。如今它主要用作中小模型的回归测试和训练过程监控——前沿模型之间的差距在这个集上已经看不出来了。

## 含金量与局限

题目和解答在网上流传多年，污染风险高，高分不能证明模型没见过题；接近饱和导致对前沿模型丧失区分度；500 题全部来自同一个原始题库，覆盖面窄。看前沿模型的数学能力请转去 AIME 新年份、HMMT 或 MathArena Apex。

## 冷知识

集里有道「绕两层」的数论题：求 284 的真因子之和的真因子之和——答案是 284 自己。背后是 220 与 284 这对著名的亲和数，古人拿它们象征友谊；这道题相当于让模型亲手验证一遍两千多年前的数学冷知识。
