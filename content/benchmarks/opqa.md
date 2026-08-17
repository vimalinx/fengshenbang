---
id: opqa
name: OPQA
category: coding
organizer: OpenAI（内部基准，见 GPT-5 系列系统卡）
url: https://deploymentsafety.openai.com/gpt-5-4-thinking/opqa
aliases:
  - OPQA 真实调试
traits:
  - 内部真实研发 bug
  - 20 题小样本
  - pass@1 判分
  - 容器环境自由排查
  - 保证不被污染
facts:
  - label: 发布方
    value: OpenAI（内部基准，经 GPT-5 系列系统卡披露）
  - label: 任务规模
    value: 20 个内部真实研发/工程瓶颈
  - label: 入选门槛
    value: 每题曾真实卡住 OpenAI 团队至少一天，部分影响大训练结果与发布
  - label: 任务内容
    value: 诊断性能回退、异常训练指标、隐蔽实现 bug 等
  - label: 评测环境
    value: 带代码仓库与运行产物（日志等）的容器
  - label: 计分
    value: pass@1，数据与判分细节不公开
frontier:
  value: 8.33
  note: >-
    史上最高分为 GPT-5.2-Codex 的 8.33%（GPT-5.4 Thinking 系统卡，2026-03）；GPT-5.2 系统卡中 gpt-5.1-codex-max
    8%；GPT-5.4 Thinking 自己仅 4%。20 题规模下，8% 只相当于答对不到两题。
openSource:
  status: closed
  url: https://deploymentsafety.openai.com/gpt-5-5/opqa
  note: 任务集、评测代码与判分细节均不公开；仅经 OpenAI 各代系统卡零散披露分数，外部无法复核
history:
  - date: 2025-08
    event: GPT-5 系统卡首次披露 OPQA：20 个「卡过自家团队一天以上」的内部调试题
  - date: 2025 下半年
    event: GPT-5.2 系统卡：gpt-5.1-codex-max 以 8% 居榜首
  - date: "2026-03-05"
    event: GPT-5.4 Thinking 系统卡：GPT-5.2-Codex 8.33% 最高，5.4 Thinking 反降至 4%，OpenAI 照实公布
  - date: "2026-04-23"
    event: GPT-5.5 系统卡继续沿用该基准
  - date: "2026"
    event: GPT-5.6 起被 Internal Research Debugging Evaluation 取代，OPQA 退出官方披露
ladder:
  - model: GPT-5.2-Codex
    score: 8.33%
    note: OpenAI 自报（GPT-5.4 Thinking 系统卡，2026-03），历史最高
  - model: gpt-5.1-codex-max
    score: 8%
    note: OpenAI 自报（GPT-5.2 系统卡，2025-12）
  - model: GPT-5.4 Thinking
    score: 4%
    note: OpenAI 自报（GPT-5.4 Thinking 系统卡，2026-03）
  - model: GPT-5.5
    score: 1.7%
    note: OpenAI 自报（GPT-5.5 系统卡，2026-04），不升反降
relatedIds:
  - frontier-bench
  - cursorbench
---

## 一句话

OpenAI 拿出自家真实卡壳的研发 bug，考 AI 能不能破案

## 测什么

全称 OpenAI-Proof Q&A，是 OpenAI 的内部调试基准。「OpenAI-Proof」的意思是：这 20 个任务每一个都真实卡住过 OpenAI 自己的团队至少一天，有些甚至影响过大模型训练的结果和发布节奏。任务要求模型诊断并解释复杂的工程问题——莫名的性能回退、异常的训练指标、隐蔽的实现 bug——都是教科书上找不到的真实研发瓶颈。它测的是「在陌生代码库里破案」的原生工程推理能力。

## 怎么测

模型被放进一个带代码和运行产物（日志、训练记录等）的容器环境里，像接手的工程师一样自由排查，最后给出诊断结论，按 pass@1 判对错——一次作答，对就是对。数据和判分细节完全不公开，分数只在 OpenAI 各代模型的系统卡里零散披露。

## 典型任务

按系统卡描述，任务原型是这类真实事件：某次大训练跑到一半 loss 曲线出现异常尖峰，团队花了一天多才定位到原因；或者一次上线后性能莫名回退，最后发现是某个隐蔽的实现 bug。模型拿到的就是当时工程师面对的全部材料——代码仓库加运行日志——要自己复现排查思路并指出病灶。

## 分数怎么看

分数极低且信息量大：GPT-5.2 系统卡里表现最好的 gpt-5.1-codex-max 只有 8%，GPT-5.4 Thinking 反而降到 4%。这个榜的价值不在比分，而在于它是少数「保证不被污染」的难题集——题目全部来自尚未公开的真实故障，模型不可能背过答案。

## 含金量与局限

纯内部基准：20 个任务不公开、无独立验证，样本量小到一两个题的波动就能让分数翻倍或腰斩（GPT-5.4 Thinking 的 4% 与 codex-max 的 8% 差距其实只是一道题）。OpenAI 自报数据，外部无法复核。据核验，GPT-5.6 起该基准已被 Internal Research Debugging Evaluation 取代，本站此条为历史定位。

## 冷知识

名字直译是「连 OpenAI 都防不住的问答」——每道题都真实卡住过自家研究员至少一天，有的还影响过大训练和发布。这个榜低分到有人开了预测盘，赌「2027 年前有没有模型能到 20%」。GPT-5.4 Thinking 在这里只得 4%、比前代还低，OpenAI 把这条放进了自家报告，算是罕见的「自曝其短」。
