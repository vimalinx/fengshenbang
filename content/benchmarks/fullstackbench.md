---
id: fullstackbench
name: FullStackBench
category: coding
organizer: 字节跳动 Seed × M-A-P，2024-11/12（arXiv:2412.00535）
url: https://github.com/bytedance/FullStackBench
aliases:
  - FullStackBench en/zh
traits:
  - 3374 题跨 11 领域 16 语言
  - 中英双语各 1687 题
  - SandboxFusion 沙箱真实执行
  - 难度由 6 模型投票标定
  - 官方榜单已停更
facts:
  - label: 题量
    value: 3374 题（中英双语各 1687）/ 16 种语言 / 11 个应用领域
  - label: 发布
    value: 2024-12，字节跳动 Seed × M-A-P（arXiv:2412.00535）
  - label: 计分方式
    value: pass@1，配套 SandboxFusion 沙箱真实执行多语言代码
  - label: 测试规模
    value: 15168 个单元测试，平均每题 4.5 个
  - label: 难度标定
    value: 6 个模型投票：易 1466 / 中 1184 / 难 724
  - label: 数据公开性
    value: 公开，GitHub 与 HuggingFace 可下载
frontier:
  value: 66.1
  note: >-
    论文发布时实测 OpenAI o1-preview 总分 66.12 居首（2024-12），开源最佳 DeepSeekCoder-v2 为 56.37；此后官方未持续更新榜单，对 2026
    年前沿模型的头部区分度已下降。
openSource:
  status: open
  url: https://github.com/bytedance/FullStackBench
  note: 数据集与配套沙箱 SandboxFusion 在 GitHub（bytedance/FullStackBench）与 HuggingFace 公开
history:
  - date: "2024-11-28"
    event: GitHub 仓库上线
  - date: "2024-12-03"
    event: 论文挂出（arXiv:2412.00535）
  - date: "2024-12-05"
    event: 豆包 Seed 团队正式开源数据集与配套沙箱 SandboxFusion
  - date: 2024-12
    event: 论文实测 27 个模型：多数模型 HumanEval 高分、在 FullStackBench 上明显掉队
ladder:
  - model: OpenAI o1-preview
    score: "66.12"
    note: 论文实测总分（arXiv:2412.00535），2024-12，官方未持续更新榜单
  - model: DeepSeekCoder-V2
    score: "56.37"
    note: 论文实测，开源最佳，2024-12
relatedIds:
  - humaneval
  - multipl-e
---

## 一句话

字节出的全栈代码大考，16 种语言 11 个领域

## 测什么

FullStackBench 想解决「现有代码榜只考几个窄领域」的问题：团队先分析 StackOverflow 上 50 万个真实提问，归纳出覆盖 88.1% 问题的 11 个应用领域（基础/高级编程、软件工程、数据分析、数学、桌面与 Web 开发、机器学习、科学计算、数据库、多媒体、操作系统），再按此分布出题。全量 3374 题、16 种语言（从 Bash、C++ 到 R、Scala、SQL），中英双语各 1687 题，合计 15168 个单元测试。

## 怎么测

模型按题面写代码，配套沙箱 SandboxFusion 负责全流程：抽取模型输出里的代码块、与预置单测拼成可执行程序、在多语言环境里真实运行、按测试结果判对错，指标是 pass@1。题目难度由 6 个模型投票标定：只有 1 个模型能做对算难题（724 题），5 个以上能做对算易题（1466 题），其余为中等（1184 题）。

## 典型任务

题目按领域定制而非翻译凑数，论文举例：字节内部数据工程团队亲手出了一系列数据分析题，包含数据筛选、数据挖掘、数据可视化；数据库领域是真实的 SQL 增删查改，操作系统领域涉及内存管理、进程调度。每道题都带题面、单测、参考解和领域标签，平均题面约 210 个 token，平均每题 4.5 个测试用例。

## 分数怎么看

论文实测中 OpenAI o1-preview 以总分 66.12 领先，开源最好的 DeepSeekCoder-v2 为 56.37；一个关键发现是许多模型 HumanEval 分数很高、到 FullStackBench 明显掉队，说明它确实测到了刷题刷不到的面。看分时可以按领域拆开看，模型在数学、科学计算上的方差最大，最能暴露偏科。

## 含金量与局限

字节跳动自研基准，题面生成借助了 LLM 加人工标注，难度标定也依赖模型投票，与传统人工题库风味不同。发布于 2024 年底，对 2026 年的前沿模型来说头部区分度在下降，引用时注意它更适合看「领域覆盖是否均衡」而不是绝对强弱。

## 冷知识

论文里一个让作者都表示意外的结果：英文社区出品的 StarCoder2-15B、o1-preview、o1-mini 在中文题上表现更好，而中国团队出的 DeepSeek-Coder-1.5B 反而是英文题最强——提示语言对分数的影响大到足以颠覆「母语优势」的直觉。
