---
id: charxiv
name: CharXiv Reasoning
category: multimodal
organizer: 普林斯顿 PLI 等（Zirui Wang、Danqi Chen 等），NeurIPS 2024 D&B，arXiv:2406.18521
url: https://charxiv.github.io/
aliases:
  - CharXiv Reasoning（3.5 Flash 分数）
traits:
  - arXiv 真实图表
  - 2,323 图 1 万+ 题
  - 推理题子集
  - 25% 无答案题
  - GPT-4o 判分
facts:
  - label: 规模
    value: 2,323 张真实图表、1 万多道题；每图 4 道描述题 + 1 道推理题
  - label: 图源
    value: 2020–2023 年 arXiv 八个学科论文，手工四步筛选
  - label: 题型
    value: 描述题 19 套模板（其中 25% 故意无答案）；推理题答案分图中/图外 × 文字/数字四类
  - label: 判分
    value: GPT-4o 抽取答案并判对错，分带工具/裸模型两口径
  - label: 人类基线
    value: 推理题 80.5%、描述题 92.1%（与模型同卷同判）
frontier:
  value: 93.2
  note: >-
    llm-stats CharXiv-R 榜（2026-08-14，全部为自报成绩）：Claude Mythos Preview 以 93.2 居首，50 个模型均值
    73.5；裸模型（不带工具）口径 BenchLM 快照（2026-08-07）Claude Mythos 5 为 88.9%、Qwen3.8 Max 88.4%。两个口径均已越过 80.5%
    的人类基线。
openSource:
  status: open
  url: https://github.com/zirui-wang/CharXiv
  note: 数据集与评测代码公开（GitHub zirui-wang/CharXiv，1,000 张验证集图公开、测试集需申请）
history:
  - date: "2024-06-26"
    event: arXiv 论文上线（2406.18521），随附「拆台实验」：旧榜换种问法开源模型最多暴跌 34.5%
  - date: "2024-12-09"
    event: NeurIPS 2024 Datasets & Benchmarks 轨道 poster 录用
  - date: 2025 起
    event: 推理子集（CharXiv-R）成为主流模型卡的常用读图指标
  - date: 2026-08
    event: 头部模型推理题分数越过 80.5% 的人类基线，榜单区分度开始成为新话题
ladder:
  - model: Claude Mythos Preview
    score: 93.2%
    note: llm-stats CharXiv-R 榜第 1，2026-08-14
  - model: Kimi K3
    score: 91.3%
    note: llm-stats CharXiv-R 榜第 2，2026-08-14
  - model: Claude Opus 4.7
    score: 91.0%
    note: llm-stats CharXiv-R 榜第 3，2026-08-14
  - model: Qwen3.8-27B
    score: 90.2%
    note: llm-stats CharXiv-R 榜第 4，2026-08-14
  - model: Claude Mythos 5
    score: 88.9%
    note: 裸模型口径，BenchLM 快照，2026-08-07
  - model: GPT-4o
    score: 47.1%
    note: 发布时最强（推理题，2024-06），历史参照
relatedIds:
  - mmmu
---

## 一句话

拿 arXiv 论文真实图表考 AI 读图

## 测什么

从 2020–2023 年 arXiv 八个学科的论文里手工挑出 2323 张真实科学图表，配 1 万多道人工题。动机很直接：当时的图表基准（FigureQA、ChartQA 等）图太简单、题太模板化，作者做了个压力测试——同一批图换种问法，开源模型准确率最多暴跌 34.5%，说明旧榜严重高估了读图能力。CharXiv 分两类题：描述题（读标题、数刻度、认图例这类基本功）和推理题（跨视觉元素做比较、估算、细粒度分析），模型卡和厂商公告里常引用的是推理子集。题目设计刻意不需要专业背景，只考「看图 + 数值推理」本身。

## 怎么测

每张图配 4 道描述题（其中 1 道故意设计成「无法回答」，图中根本没这个信息）加 1 道推理题。回答采用简短格式，判分不用精确匹配，而是用 GPT-4o 抽取答案并给对/错二值评分（因为图表里的希腊字母和数学符号写法多样）。分带工具和裸模型两种口径，1000 张图作验证集公开，其余作测试集答案保密。

## 典型任务

论文里一个扎心的例子：「数 x 轴和 y 轴上各有多少个带标签的刻度」——人类 92.9% 答对，24 个受测模型里 20 个准确率不到 10%，接近随机瞎猜。推理题的例子形态如：一张多子图的折线+柱状混合图，问「第 2 行第 1 列子图中，哪条曲线在 x≈某值处取得最大值，对应数值约是多少」——要先定位子图、再跨图例和坐标轴读出数字，答案分「图中文字/图外短语/图中数字/需计算的图外数字」四种类型。

## 分数怎么看

人类推理题 80.5%、描述题 92.1%；发布时最强的 GPT-4o 推理题只有 47.1%，最强开源 InternVL Chat V1.5 仅 29.2%。如今模型卡上推理题分数已明显上涨，但 80.5% 这条人类线仍是常用参照。分数低不一定是不懂图，描述题和推理题的差距能区分「看不清」和「算不对」。

## 含金量与局限

判分依赖 GPT-4o 当裁判，裁判本身的偏好和换代会影响分数；图表全部来自 arXiv 公开论文，训练语料里出现原图的风险真实存在。另外验证集和测试集分开报分，引用时注意对齐子集；25% 描述题是无答案题，模型「承认答不出」的能力也被算进总分。

## 冷知识

这篇论文一半篇幅在「拆前人的台」：作者先拿旧榜做压力测试，同样的图换个问法，开源模型 SPHINX V2 从 63.2% 暴跌到 28.6%——证明此前的「开源读图超闭源」是题型背熟了的假象。无答案题的设计则师承 SQuAD 2.0，专测模型敢不敢说「图里没有」。
