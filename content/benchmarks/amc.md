---
id: amc
name: AMC
category: reasoning
organizer: MAA；基准数据集常用 AI-MO/aimo-validation-amc（AMC12 2022+2023 共 83 题）
url: https://huggingface.co/datasets/AI-MO/aimo-validation-amc
aliases:
  - AMC 2022-23 数学竞赛
traits:
  - AMC12 真题改造
  - 83 题入门档
  - 选择题改数值答案
  - 精确匹配判分
  - 已近饱和
facts:
  - label: 题源
    value: AMC12 2022 + 2023 的 A/B 卷，精选 83 题（来自 AoPS 维基）
  - label: 数据集
    value: AI-MO/aimo-validation-amc，为 AIMO 系列赛制作的验证集
  - label: 改造手法
    value: 五选一选择题改写为数值答案题，精确匹配判分
  - label: 真实赛制
    value: AMC12：25 道选择题、75 分钟，是晋级 AIME 的门槛赛
  - label: 难度定位
    value: 入门档，整体明显低于 AIME
frontier:
  value: null
  note: 无权威公开榜单给出精确头部分数：该集定位入门档，头部推理模型已接近满分，前沿模型的对比已不在这里进行。
openSource:
  status: open
  url: https://huggingface.co/datasets/AI-MO/aimo-validation-amc
  note: >-
    数据集在 HuggingFace（AI-MO/aimo-validation-amc）公开，83 题全部来自 AMC12 2022/2023 并标注题源页；题目本身在 AoPS
    维基公开，评测管线与 AIMO 系列赛同源
history:
  - date: "1950"
    event: 赛事前身 AHSME 创办，后演变为今天的 AMC 系列竞赛
  - date: 2022–2023
    event: AMC12 2022、2023 的 A/B 卷举办，成为该基准数据集的题源
  - date: "2024"
    event: AI-MO 团队为 AIMO 系列赛整理发布 aimo-validation-amc 等验证集
  - date: 2025 起
    event: 随推理模型接近满分，退居冒烟测试与小模型对比用途
relatedIds:
  - aime
  - math-500
---

## 一句话

美国数学竞赛 AMC12 真题改造的入门档

## 测什么

AMC 是美国数学协会（MAA）主办的系列数学竞赛，其中 AMC12 面向 12 年级及以下学生，25 道选择题、75 分钟，是通往 AIME 的门槛赛——它也是普通美国高中生接触竞赛数学的第一站。作为 AI 基准，最常用的是 AI-MO 团队为 AIMO 系列赛整理的 aimo-validation-amc：从 2022、2023 年 AMC12 的 A/B 卷中精选 83 题，题目和答案来自 AoPS 维基。整体难度明显低于 AIME，定位是「入门档」。

## 怎么测

原题本是五选一选择题，基准版做了关键改造：把题目改写成数值答案形式——比如答案本是分数 m/n 的，改问 m+n 是多少——然后从模型输出中抽取最终数值，与标准答案精确匹配判分。这样可以直接复用 AIME 那套自动化评测管线，无需处理选项。

## 典型任务

比如 2022 AMC 12A 第 1 题：把连分数 3+1/(3+1/(3+1/3)) 化成最简分数 m/n，求 m+n（答案 142）。再如 2023 AMC 12A 第 1 题：Alicia 和 Beth 分别从相距 45 英里的 A、B 两城同时骑车相向而行，时速 18 和 12 英里，求相遇点距 A 城多少英里（答案 27）。卷面后段的题会难一些，比如 2022 AMC 12A 第 10 题要求把 1 到 14 分成 7 对、每对大数至少是小数的两倍，问有多少种分法（答案 144）。

## 分数怎么看

头部推理模型在这个集上基本接近满分，对前沿模型已没有区分度。它现在的价值是快速冒烟测试、小模型对比，以及在 AIMO 系列验证集里充当校准「入门档」难度的一环——模型连 AMC 都做不好，就谈不上 AIME。

## 含金量与局限

题目和解答在 AoPS 维基上公开多年，污染几乎必然；原题的选项信息在改写时被丢弃（真人可以代入排除），基准分数与真人考 AMC 的表现不可直接比较；83 题的体量也让单个分数的统计意义有限。

## 冷知识

为了让选择题能自动判分，数据集用了一招「化选择为计算」：原题答案是分数 m/n 的，就改问 m+n 等于几——选项没了，真人擅长的代入排除法也用不上了。所以模型分数和真人考 AMC 的表现并不严格可比。
