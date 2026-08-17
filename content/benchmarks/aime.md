---
id: aime
name: AIME
category: reasoning
organizer: 美国数学协会（MAA）；基准数据集常用 HuggingFaceH4/aime_2024、math-ai/aime25
url: https://maa.org/math-competitions/american-invitational-mathematics-examination-aime
aliases:
  - AIME 2024/2025/2026
  - AIME25（Thinking/Thinking-2507）
  - AIME 2025 · Speciale
  - AIME 2025（无工具/家族基准 R1-0528）
traits:
  - 真实竞赛真题
  - 0–999 整数答案
  - 每年仅 30 题
  - 采样取平均报分
  - 2024 真题有污染
facts:
  - label: 题量
    value: 每年 30 题（AIME I + II 各 15 题）
  - label: 答案形式
    value: 0–999 的整数，精确匹配判分
  - label: 真实赛制
    value: 3 小时、禁用计算器，AMC 高分者才有资格参加
  - label: 常用数据集
    value: HuggingFaceH4/aime_2024、math-ai/aime25
  - label: 通行报法
    value: 每题采样几十次取平均（avg@k），抑制小样本抖动
frontier:
  value: 95.8
  note: >-
    AIME 2024 上 llm-stats 榜（2026-08）榜首 Grok-3 Mini 95.8%，头部模型普遍 90%+；MathArena（2025-08）称 GPT-5 在
    AIME 2025 等 2025 年赛事上约 90%。
openSource:
  status: open
  url: https://huggingface.co/datasets/HuggingFaceH4/aime_2024
  note: >-
    社区整理的数据集在 HuggingFace（HuggingFaceH4/aime_2024、math-ai/aime25）公开；题目本身属 MAA
    竞赛真题，评测脚本见各评测框架（MathArena、llm-stats）
history:
  - date: "1983"
    event: MAA 创办首届 AIME，作为 AMC 与 USAMO 之间的选拔环节
  - date: 2024-02
    event: AIME 2024 举办，随后被整理为最常用的评测数据集之一
  - date: 2024-09
    event: o1 发布后推理模型分数暴涨，AIME 成为衡量「数学推理进步」的默认标尺
  - date: 2025-02
    event: AIME 2025 举办；math-ai/aime25 等数据集跟进，社区转向新年份以规避污染
  - date: 2025-08
    event: MathArena 指出头部模型在 2025 年最终答案型赛事整体约 90%，AIME 开始「不够考」
ladder:
  - model: Grok-3 Mini
    score: 95.8%
    note: AIME 2024，llm-stats 聚合 2026-08 居首
  - model: o4-mini
    score: 93.4%
    note: AIME 2024，llm-stats 聚合，2026-08
  - model: Grok-3
    score: 93.3%
    note: AIME 2024，llm-stats 聚合，2026-08
  - model: LongCat-Flash-Thinking
    score: 93.3%
    note: AIME 2024，llm-stats 聚合，2026-08
  - model: Gemini 2.5 Pro
    score: 92.0%
    note: AIME 2024，llm-stats 聚合，2026-08
  - model: GPT-5
    score: ≈90%
    note: AIME 2025 等 2025 赛事，MathArena 2025-08 评测
  - model: o3
    score: 91.6%
    note: AIME 2024，llm-stats 聚合，2026-08
  - model: DeepSeek-R1-0528
    score: 91.4%
    note: AIME 2024，llm-stats 聚合，2026-08
  - model: GLM-4.5
    score: 91.0%
    note: AIME 2024，llm-stats 聚合，2026-08
  - model: GPT-5.6 Sol
    score: ≈90%
    note: AIME 2025，厂商自报口径（OpenAI 发布稿，2026-07）
relatedIds:
  - amc
  - hmmt
  - matharena-apex
  - usamo
---

## 一句话

美国奥数邀请赛真题，答案都是 0–999 整数

## 测什么

AIME（美国数学邀请赛）是 MAA 主办的赛事，夹在 AMC 和 USAMO 之间——AMC 考得足够好才有资格参加，全国高中生里大约前 5% 能走到这一步。每年两场（AIME I/II）各 15 题共 30 题，覆盖代数、几何、数论、组合与概率，所有答案都是 0 到 999 的整数。这个「整数答案」设计让它天然适合自动判分，社区于是把历年真题整理成数据集测模型，最常用的是 2024、2025 年份。它针对的是竞赛级多步数学推理。

## 怎么测

模型拿到题目原文，自由输出推理过程，最后给出一个整数，与官方答案精确匹配判对错。真实考试给选手 3 小时、不许用计算器。因为一年只有 30 题、随机波动大，通行做法是每题采样几十次（常见 32 或 64 次）再取平均，报 avg@k 而不是单次正确率——看分数时一定要留意采样次数。

## 典型任务

比如 2024 AIME II 第 1 题：Aimeville 镇 900 名居民中，195 人有钻戒、367 人有高尔夫球杆、562 人有园铲，且人人都有一袋心形糖果；已知 437 人恰好拥有其中两样、234 人恰好拥有三样，求四样全有的人数——用容斥原理列方程，答案是 73。中等难度的如 2024 AIME I 第 13 题：找最小的素数 p 使存在整数 n 满足 p² 整除 n⁴+1（p=17），再求最小的正整数 m 使 p² 整除 m⁴+1，答案 110。题目往往一句话就能读懂，但要做对得绕好几个弯。

## 分数怎么看

2024 年初 GPT-4 类模型基本做不动，推理模型时代分数暴涨：头部模型在 AIME 2024 上普遍超过 90%，在更新的 AIME 2025 上最好成绩也在九成上下（MathArena 2025 年 8 月称 GPT-5 在其所有最终答案型赛事上都约 90%）。低于 50% 在今天只能算二线水平。

## 含金量与局限

一年只有 30 题，差一两题分数就抖动 3–7 个百分点，单次跑分参考价值有限；早年份真题在训练语料里泛滥，AIME 2024 的分数普遍被认为有污染，看最新年份才可靠；只判最终整数，推理过程错了但数字蒙对也算对——USAMO/IMO 类证明题正是为补这个洞而生。

## 冷知识

2024 年 AIME II 第 1 题把小镇命名为「Aimeville」——命题人直接把赛事名字埋进了题面。答案限定 0–999 整数源于真实答题卡：选手涂的是三位数字的圆圈，这套几十年前的设计意外成了自动判分的完美接口。
