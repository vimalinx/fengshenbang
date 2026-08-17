---
id: cc-bench
name: CC-Bench
category: coding
organizer: 智谱 Z.ai，随 GLM-4.5（2025-07）公开，GLM-4.6 扩展为 CC-Bench-V2
url: https://z.ai/blog/glm-4.6
aliases:
  - CC-Bench 实测
traits:
  - 真实 Claude Code 框架
  - 两两对决胜率
  - 真人评估员判分
  - 隔离 Docker 容器
  - 厂商自建自评
facts:
  - label: 发布方
    value: 智谱 Z.ai
  - label: 首发
    value: 2025-07 随 GLM-4.5 公开
  - label: 任务规模
    value: V1 52 个任务、六大方向；V2 扩充并拆前端/后端子榜
  - label: 评测平台
    value: Claude Code 框架 + 隔离 Docker 容器
  - label: 计分
    value: 真人评估两两对决胜率 + token 消耗
  - label: 数据公开
    value: 完整 agent 轨迹在 HuggingFace（zai-org/CC-Bench-trajectories）
frontier:
  value: 48.6
  note: >-
    注意单位是「对战胜率」而非通过率：GLM-4.6（2025-09）对 Claude Sonnet 4 的胜率为 48.6%，基本打平，同时 token 消耗比 GLM-4.5 少约
    15%；GLM-4.5 对 Kimi K2 胜率 53.9%。
openSource:
  status: open
  url: https://huggingface.co/datasets/zai-org/CC-Bench-trajectories
  note: >-
    完整 agent 交互轨迹公开于 HuggingFace（zai-org/CC-Bench-trajectories，52 任务、5 模型、260 条轨迹）；任务集与评估协议见
    z.ai/blog/glm-4.6
history:
  - date: "2025-07-28"
    event: 随 GLM-4.5 发布首次公开：52 任务、六大方向，GLM-4.5 / Claude-4-Sonnet / Kimi-K2 / Qwen3-Coder 四模型对决
  - date: 2025-07
    event: 全部 52 任务的完整交互轨迹数据集公开至 HuggingFace，供社区复盘
  - date: 2025-09
    event: 随 GLM-4.6 扩充为更难的任务集（CC-Bench-V2），拆出前端/后端子榜，报出对 Claude Sonnet 4 的 48.6% 胜率
ladder:
  - model: GLM-4.5
    score: 53.9% 胜率
    note: 对 Kimi K2 胜率，智谱自报，2025-07
  - model: GLM-4.6
    score: 48.6% 胜率
    note: 对 Claude Sonnet 4 胜率（基本打平），智谱自报，2025-09（CC-Bench-V2）
relatedIds:
  - cursorbench
  - swe-bench-verified
---

## 一句话

把模型装进 Claude Code，真人评判谁干活更好

## 测什么

智谱为衡量「模型在真实 agent 编程框架里干活」的能力自建的测试集。它不跑自动化测试判对错，而是把候选模型接入 Claude Code 这个真实的 agent 编程平台，在独立 Docker 容器里完成多轮真实编程任务，重点考察工具调用的稳定性和任务完成质量。GLM-4.5 时期为 52 个任务、六大开发方向；GLM-4.6 时扩充为 CC-Bench-V2，并拆出前端/后端子榜。

## 怎么测

评测采用两两对决：同一批任务分别让两个模型在 Claude Code 里跑，由真人评估员对比两者的产出，报胜率（win rate），同时统计 token 消耗作为效率指标。所有实验在隔离容器中进行，评估细节和四个模型（GLM-4.5、Claude-4-Sonnet、Kimi-K2、Qwen3-Coder）在全部任务上的完整 agent 交互轨迹都公开在 HuggingFace 上（zai-org/CC-Bench-trajectories）。

## 典型任务

任务覆盖前端开发、工具开发、数据分析、测试、算法实现等六大类。比如前端类任务要求模型用 HTML5/CSS3/JavaScript 从零搭出一个可交互页面；工具开发类则要求写出一个能实际运行的命令行或小工具。模型不是一次性输出代码，而是在 Claude Code 里像真人程序员一样多轮操作：读需求、建文件、跑命令、看报错、改代码，评估员最后对比两个模型谁交付的东西更能用。

## 分数怎么看

看胜率而不是绝对分：50% 意味着和对手打平。GLM-4.5 对 Kimi K2 的胜率为 53.9%；GLM-4.6 对 Claude Sonnet 4 的胜率 48.6%（基本打平），同时 token 消耗比 GLM-4.5 少约 15%。这个榜的价值在于它测的是「装进真实工具链后的综合表现」，而非孤立代码题。

## 含金量与局限

这是厂商自建自评的基准，对决评判由智谱组织，存在主场倾向，胜率为自报数据。名字容易撞车：ccbench.org 是另一个独立的小代码库编码 agent 评测，本站此条指智谱版。此外 V1（52 任务）与 V2（扩充版、分前后端子榜）的结果不可直接对比。

## 冷知识

这个榜的「考场」是对手家的产品：智谱把各家模型统统装进 Anthropic 的 Claude Code 里，再和 Claude 本家模型同台对决——用别人的擂台打自己的比赛。更难得的是四个模型在全部任务上的每一步操作轨迹都公开了，任何人都能复盘它们是怎么干活（和翻车）的。
