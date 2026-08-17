---
id: kingbench
name: KingBench
category: agent
organizer: YouTube 创作者「AICodeKing」个人基准（2.0/3 版本 + Agent Leaderboard）
aliases:
  - KingBench Agent 榜
  - KingBench 编程榜
traits:
  - 完整项目实跑
  - 长程连续任务
  - 人工逐题打分
  - 强调代码品味
  - 个人运营无开源
facts:
  - label: 性质
    value: 个人创作者基准（YouTube UP 主 AICodeKing），无官网、无论文
  - label: 任务量
    value: 约 8 个实跑任务
  - label: 题型
    value: 完整项目构建、长程 agentic 任务、3D 建模/网页类任务
  - label: 计分
    value: 逐题人工打分汇总，早期 80 分制，KingBench 3 为百分制量级
  - label: 发布渠道
    value: 创作者的视频与帖子，成绩依赖二手转述
frontier:
  value: 88.57
  note: KingBench 3（2026-06，经第三方转述）：Fable 5 88.57、Opus 4.8 87.14、GLM-5.2 81.43；个人评分体系，只有同一期榜单内部可比。
openSource:
  status: closed
  url: https://www.youtube.com/@AICodeKing
  note: 无公开数据集与评测管线，成绩仅经创作者视频/帖子发布，二手转述
history:
  - date: "2025"
    event: 以「Agentic Evaluations」形式在社区流传，MiniMax M2 等模型的实跑成绩引发讨论
  - date: 2026-04
    event: KingBench 2.0 题目用于 GPT-5.5 / DeepSeek V4 Pro / Opus 4.7 横评（创作者视频）
  - date: "2026-06-13"
    event: KingBench 3 评测 GLM-5.2 等新模型，榜单被社区广泛转述
  - date: 2026-07
    event: Agent 方向做长程实验：让 Kimi K3 连续运行 48 小时测自主性
ladder:
  - model: GLM-5.3
    score: 91.25%
    note: 第三方转述（daily.dev 实测 73/80），2026 年中，历史最高
  - model: Fable 5
    score: "88.57"
    note: KingBench 3，第三方转述，2026-06
  - model: Opus 4.8
    score: "87.14"
    note: KingBench 3，第三方转述，2026-06
  - model: GLM-5.2
    score: "81.43"
    note: KingBench 3，第三方转述，2026-06
  - model: Opus 4.7
    score: "55.71"
    note: KingBench 3，第三方转述，2026-06
  - model: GPT-5.5
    score: "38.57"
    note: KingBench 3，第三方转述，2026-06
---

## 一句话

UP 主自办实跑评测：让模型真做完整项目再打分

## 测什么

一个由个人创作者运营的小型实跑评测，约 8 个任务，主打真实编码与 agentic 场景：从零构建完整项目、长程连续任务、3D 建模/网页类任务等，评分时强调「代码品味」——不只看能不能跑，还看 UX、逻辑结构和工程完成度。另有针对长程自主任务的 Agent Leaderboard，观察模型搭配 Claude Code 等 agent 工具连续干活的表现。已迭代到 2.0/3 版本。

## 怎么测

没有公开数据集和自动化评分管线：创作者在自己的流程里让各模型完成同一批任务，逐题打分后汇总（早期为 80 分制，KingBench 3 为百分制量级），排成榜单，通过视频和帖子发布。成绩本质上是「同一人、同一流程下的实跑横评」。

## 典型任务

从创作者发布内容看，任务形态是让模型一次性交付完整作品：比如从零搭一个可运行的完整应用、做 3D 建模类任务、或连续运行数小时到数十小时的长程 agentic 任务（他做过让模型连跑 48 小时的实验）。第三方转述的 KingBench 3 榜单（2026-06）中：Fable 5 88.57、Opus 4.8 87.14、GLM-5.2 81.43、Opus 4.7 55.71、GPT-5.5 38.57——评分差距拉得很开，反映其偏好「完成度与品味」而非「差不多能跑」。

## 分数怎么看

在社区（尤其模型发布讨论）里颇有存在感，GLM-5/5.2、DeepSeek V4 Flash 等模型的第三方实测成绩常出自它。适合当作「真实项目手感」的旁证：一个模型在学术榜上平平但在这里分高，往往说明实跑体验不错。分数绝对值无横向意义，只看同一期榜单内的相对排名。

## 含金量与局限

个人基准，本站明确标注：无公开数据集、无论文、无可复现流程，评分含主观成分，任务只有约 8 个，统计意义有限；成绩只能通过创作者的视频/帖子获取，二手转述可能走样。作为参考信号可以，作为选型依据不够。

## 冷知识

为测长程自主性，创作者曾让模型连续实跑 48 小时不人工干预，看它是自己推进任务、原地打转还是干脆「摆烂」——这种土法炼钢的长跑测试，反而是很多学术基准给不了的手感。
