---
id: cruxeval
name: CRUXEval
category: coding
organizer: Meta FAIR × MIT CSAIL（Alex Gu 等），2024-01（arXiv:2401.03065）
url: https://arxiv.org/abs/2401.03065
aliases:
  - CRUXEval（代码推理）
traits:
  - 800 个短 Python 函数
  - 输入/输出预测双任务
  - 脑内执行不写码
  - 答案真实执行断言
  - Code Llama 生成+人工筛选
facts:
  - label: 题量
    value: 800 个 Python 函数（3–13 行），各配一对输入输出
  - label: 发布
    value: 2024-01，Meta FAIR × MIT CSAIL（arXiv:2401.03065）
  - label: 计分方式
    value: 输入预测与输出预测两个任务各自 pass@1，答案真实执行断言判定
  - label: 数据公开性
    value: 公开，GitHub 与 HuggingFace 可下载，MIT 协议
  - label: 出题方式
    value: Code Llama 34B 生成候选，按「优秀程序员约一分钟可心算」筛选
  - label: 衍生版本
    value: CRUXEval-X：第三方扩展到 19 种编程语言
frontier:
  value: 81
  note: >-
    原版论文最佳配置为 GPT-4 加思维链：输出预测 81%、输入预测 75%（2024-01）；官方此后未维护新榜单，第三方聚合站收录的 GPT-4 Turbo 平均 pass@1 约
    78.9%。
openSource:
  status: open
  url: https://github.com/facebookresearch/cruxeval
  note: 数据集与评测代码在 GitHub（facebookresearch/cruxeval）与 HuggingFace（cruxeval-org/cruxeval）公开，MIT 协议
history:
  - date: 2024-01
    event: 论文与数据集发布（Alex Gu 等），提出「生成加筛选」的可复制出题配方
  - date: 2024-01
    event: 首批实测 20 个代码模型：GPT-4 直接提问仅 67%/63%，加思维链提升到 75%/81%
  - date: 2024 年起
    event: 出现多语言扩展 CRUXEval-X（19 种语言）等后续工作，「脑内执行」的考法被广泛沿用
ladder:
  - model: gpt-4-turbo-2024-04-09 + CoT
    score: 75.7%
    note: 官方榜 CRUXEval-I，2024-05（榜末态）
  - model: gpt-4o + CoT
    score: 75.6%
    note: 官方榜 CRUXEval-I，2024-05
  - model: gpt-4-0613 + CoT
    score: 75.5%
    note: 官方榜 CRUXEval-I，2024-05
  - model: claude-3-opus + CoT
    score: 73.4%
    note: 官方榜 CRUXEval-I，2024-05
relatedIds:
  - humaneval
  - livecodebench
---

## 一句话

给段代码，让 AI 在脑子里跑一遍说出结果

## 测什么

CRUXEval（Code Reasoning, Understanding and eXecution Evaluation）由 800 个 3–13 行的短 Python 函数组成，每个函数配一对输入输出，派生出两个任务：给函数和输入预测输出（CRUXEval-O），或给函数和输出反推一个能产生它的输入（CRUXEval-I）。它刻意不考写代码，而是考「在脑内模拟程序执行」的推理能力——一个模型 HumanEval 分数再高，也未必算得清一段简单代码跑出来是什么。设计动机正是发现许多模型在生成榜上刷分，却并没有同步提升对代码执行的理解。

## 怎么测

两个任务都按 pass@1 计分：模型给出答案后，评测脚本把答案放进 assert 里真实执行，断言成立才算对，不存在模糊判分。数据是「生成加筛选」造出来的：先用 Code Llama 34B 批量生成候选函数和输入、真实运行得到输出，再筛到「优秀人类程序员不借助纸笔约一分钟能做出来」的难度，最后随机取 800 题。

## 典型任务

一道典型的输入预测题长这样：函数是 `f = lambda nums: nums + [nums[i % 2] for i in range(len(nums))]`，已知输出是 `[-1, 0, 0, 1, 1, -1, 0, -1, 0, -1]`，模型要反推出输入 `[-1, 0, 0, 1, 1]`。输出预测则反过来：给出 `f(某个具体输入)`，要求一步步心算列表拼接、下标取模后说出返回值。题目都不长，但绕一个弯就出错，非常像面试里的「读代码说结果」。

## 分数怎么看

发布时最强的 GPT-4 也只有 67%（输入预测）和 63%（输出预测），而吃了一大顿代码语料的 Code Llama 34B 仅 47% 和 44%——一半以上的简单执行题做错，这正是论文想暴露的问题。输入反推通常比正向预测更难，两个数都高才说明模型真在「跑」代码而不是背模式。

## 含金量与局限

题目由 Code Llama 34B 生成而非人工编写，风格偏「机器学习感」，且只覆盖 Python 单函数、无第三方库的场景，不能外推到工程能力。另有第三方做的 19 语言扩展版 CRUXEval-X，引用分数时注意区分原版与扩展版。

## 冷知识

这个榜的题目本身就是 AI 出的：Meta 团队用 Code Llama 34B 批量生成函数再筛选，人类只负责定筛选标准。发布时的结果颇为尴尬——吃了 1T token 代码数据的 Code Llama 34B，在「一分钟心算题」上错了一大半（47%/44%），GPT-4 也会栽在一些惊人简单的 Python 程序上。
