---
id: clawbench
name: ClawBench
category: coding
organizer: TIGER-AI-Lab，arXiv:2604.08523（2026-04）
url: https://github.com/TIGER-AI-Lab/ClawBench
aliases:
  - ClawBench（2026-03 第三方）
traits:
  - 144 个真实网站
  - 写操作任务
  - 拦截最终提交请求
  - LLM judge 判分
  - 五层轨迹记录
facts:
  - label: 发布方
    value: TIGER-AI-Lab（2026-04，arXiv:2604.08523）
  - label: 任务规模
    value: V1：153 任务、144 个真实线上网站、15 个生活品类；V2 另 130 任务
  - label: 任务性质
    value: 写操作、改变真实状态的流程（下单、预订、投递、邮件处理）
  - label: 安全机制
    value: Chrome 扩展拦截最终提交请求，避免真实后果
  - label: 判分
    value: 五层轨迹记录 + Agent-as-Judge 对比人类参考轨迹 + DOM 匹配，二元成败
frontier:
  value: 33.3
  note: Claude Sonnet 4.6 以 33.3% 成功率居首（2026-04 论文，8 个前沿模型）；同一批模型在传统网页 agent 榜上能拿 65%–75%，迁移到这里直接腰斩。
openSource:
  status: open
  url: https://github.com/TIGER-AI-Lab/ClawBench
  note: 任务集、评测工具包与 agent 轨迹全部开源（GitHub TIGER-AI-Lab/ClawBench，PyPI 包 clawbench-eval）；官方榜见 claw-bench.com
history:
  - date: "2026-04-09"
    event: arXiv v1 发布，GitHub 同步开源任务集、评测工具包与 agent 轨迹
  - date: 2026-04
    event: 「最强 AI 只能完成 1/3 日常网事」的结果引发热议，steel.dev 等第三方开始追踪榜单
  - date: "2026-07-20"
    event: arXiv v2：扩充 trace 级失败分析（反爬拦截、非人类操作、安全拒答等），并加入 V2 任务集 130 题
ladder:
  - model: Claude Opus 4.7
    score: 44.6%
    note: 官方榜 V2 (Hermes) Reward，2026-05-20 快照
  - model: GPT-5.5
    score: 35.4%
    note: 官方榜 V2 (Hermes)，2026-05-20 快照
  - model: GLM-5.1
    score: 34.6%
    note: 官方榜 V2 (Hermes)，2026-05-20 快照
  - model: DeepSeek V4 Pro
    score: 33.9%
    note: 官方榜 V2 (Hermes)，2026-05-20 快照
  - model: Claude Opus 4.6
    score: 61.4%
    note: 官方榜 V1（153 任务，拦截率口径，无 Stage-2 judge），2026-05-20 快照
  - model: Claude Sonnet 4.6
    score: 56.9%
    note: 官方榜 V1（同口径），2026-05-20 快照
relatedIds:
  - osworld
  - claw-eval
  - browsecomp
---

## 一句话

让浏览器 agent 在真实网站上订机票、点外卖、投简历

## 测什么

测浏览器 agent 在真实互联网上替人办日常杂事的能力。与在沙盒仿站里测试的旧榜单不同，它直接让 agent 操作 144 个真实线上网站，完成 153 个「会改变真实状态」的任务——下单、预订、投递这类写操作，正是以往基准刻意回避的。任务覆盖 15 个生活品类（出行、外卖、求职、邮件等）。V2 版本另有 130 个任务。

## 怎么测

关键设计是「最终请求拦截」：agent 可以在真实网站上自由浏览、填表、走到提交前的最后一步，但一个 Chrome 扩展会拦下真正产生现实后果的那个 HTTP 请求（比如真正的支付提交），从而安全地在生产网站上评测。评测全程做五层轨迹记录，再由 Agent-as-Judge 协议把 agent 的操作轨迹与人类参考轨迹对比，结合 DOM 匹配给出可追溯的二元成败判定，报任务成功率。

## 典型任务

典型任务就是你我每天会做的事：在航司或旅行网站上订一段指定条件的行程、在外卖平台按要求下一单、在招聘网站投递一份简历、处理邮箱里的某类邮件。这些任务对人类稀松平常，对 agent 却暗藏杀机：论文的失败分析显示，反爬虫拦截、不自然的点击行为被网站识别、安全拒答等是反复出现的翻车原因。

## 分数怎么看

目前的天花板很低：最强模型 Claude Sonnet 4.6 成功率仅 33.3%，而它在传统网页 agent 榜上能拿 65%–75%——论文最核心的发现就是「沙盒榜高分不代表真实网络能干活」，旧榜成绩几乎无法迁移到 ClawBench。

## 含金量与局限

真实网站会改版、会上新的反爬策略，任务可复现性天然随时间衰减，分数带时间戳属性。评测依赖 LLM 当裁判（与人类参考轨迹比对），裁判本身有判断误差。名字注意区分：GitHub 上另有 devswha/claw-bench 等同名项目，本条指 TIGER-AI-Lab 版。按任务属性它偏浏览器 agent 评测，并非纯编程榜。

## 冷知识

为了不在真实世界闯祸，评测只拦「最后一击」：agent 可以一路把外卖选到支付页、把机票订到确认页，但真正产生后果的那个提交请求会被扩展拦下评分。论文最扎心的发现之一：很多失败不是能力不够，而是操作「太不像人」——点击节奏太机械，被网站反爬系统当场识破。
