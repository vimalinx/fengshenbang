---
id: toolathlon
name: Toolathlon
category: coding
organizer: HKU/CMU 等（Junlong Li 等，ICLR 2026），arXiv:2510.25726
url: https://arxiv.org/abs/2510.25726
aliases: []
traits:
  - 32 个真实软件
  - 604 个 MCP 工具
  - 长程多轮操作
  - 执行式脚本判分
  - 无 LLM 裁判
facts:
  - label: 全称
    value: The Tool Decathlon（工具十项全能）
  - label: 发布方
    value: HKU、CMU 等 21 位研究者（Junlong Li 领衔，Junxian He 资深作者）
  - label: 任务规模
    value: 108 任务、32 个真实应用、604 个工具（多为 MCP 服务器）
  - label: 任务领域
    value: 研究、校园、金融、技术、商业、日常事务、电商七类
  - label: 交互长度
    value: 平均每任务约 20 轮工具调用
  - label: 判分
    value: 人工编写的执行式检查脚本验证环境最终状态，不用 LLM 裁判
frontier:
  value: 59.9
  note: >-
    Claude Opus 4.8 在 Anthropic 内部 harness 上 59.9%（Pass@1、3 次平均，2026 年系统卡）；上游官方榜单最强约
    56.5%（Gemini-3.5-Flash）。论文发布时（2025-10）最强仅 38.6%。
openSource:
  status: open
  url: https://github.com/hkust-nlp/Toolathlon
  note: 官方站点 toolathlon.xyz 公开榜单与提交指南；论文（arXiv:2510.25726）与评测代码开源
history:
  - date: "2025-10-29"
    event: arXiv 预印本发布（arXiv:2510.25726），108 任务全部人工编写或采集
  - date: 2025-12
    event: 「最强模型 Claude-4.5-Sonnet 仅 38.6%」的结果出圈，成为「工具使用天花板」的代名词
  - date: 2026-01
    event: 被 ICLR 2026 接收为 poster
  - date: 2026 年
    event: Anthropic 在 Opus 4.6/4.7/4.8 系统卡中连续报告内部成绩 56.8%→59.3%→59.9%，该榜成为旗舰模型标配
ladder:
  - model: Kimi K3 (max)
    score: 76.5%
    note: 官方榜 Pass@1，2026-07-16
  - model: Claude Opus 4.8 (max)
    score: 76.2%
    note: 官方榜 Pass@1，2026-06-30
  - model: Meta Muse Spark 1.2 (xhigh)
    score: 75.9%
    note: 官方榜 Pass@1，2026-08-05
  - model: Meta Muse Spark 1.1 (xhigh)
    score: 75.6%
    note: 官方榜 Pass@1，2026-07-09
  - model: GPT-5.5 (xhigh)
    score: 73.5%
    note: 官方榜 Pass@1，2026-06-30
  - model: Claude Sonnet 5 (max)
    score: 71.6%
    note: 官方榜 Pass@1，2026-07-01
  - model: DeepSeek V4 Flash 0731 (max)
    score: 70.7%
    note: 官方榜 Pass@1，2026-07-31
  - model: Gemini 3.5 Flash (high)
    score: 67.3%
    note: 官方榜 Pass@1，2026-06-30
  - model: Gemini 3.1 Pro (high)
    score: 61.1%
    note: 官方榜 Pass@1，2026-07-01
  - model: GLM 5.2 (max)
    score: 59.9%
    note: 官方榜 Pass@1，2026-06-30
relatedIds:
  - mcp-atlas
  - tau2-bench
---

## 一句话

让 AI 同时操作 32 个真实软件，完成十项全能式杂务

## 测什么

全称 The Tool Decathlon（工具十项全能），测的是 agent 在一堆真实软件之间穿梭完成长程杂事的能力。它接入 32 个真实应用——从 Google Calendar、Notion 这类日常工具，到 WooCommerce、Kubernetes、BigQuery 这类专业平台——共暴露 604 个工具（大多基于 MCP 服务器）。任务故意写得像真人随口提的需求，考察模型能否自己选对工具、排对顺序、连续操作几十步不出错。

## 怎么测

共 108 个人工编写的任务，横跨研究、校园、金融、技术、商业、日常事务、电商七个领域，平均每个任务要约 20 轮工具调用。每个任务都先用真实软件状态初始化环境（比如日历里已有会议、数据库里已有数据），agent 操作完后由人工编写的执行式脚本直接检查环境的最终状态和产物，达到约 90% 的检查点才算成功，报任务成功率——不用 LLM 当裁判，没有模糊空间。

## 典型任务

论文摘要里给的典型场景：agent 需要「监控一个生产数据库，发现异常，然后按照操作手册生成报告」——这要求它连数据库、跑查询、读手册文档、再生成报告文件，跨多个应用连续操作。另一类任务是「协调日历和文件系统来管理邮件」：先查日历确认日程，再从文件系统找附件，最后处理邮件。每个任务开始前环境都被布置成真实状态，agent 面对的不是空白沙盒。

## 分数怎么看

论文发布时（2025-10）最强模型 Claude-4.5-Sonnet 只有 38.6% 成功率，连及格线都不到。此后分数上涨很快：Anthropic 系统卡披露 Claude Opus 4.8 在内部 harness 上达 59.9%（Pass@1、3 次取平均），官方榜单上游最强约 56.5%。不同 harness 下分数差异明显，比较时要对齐评测配置。

## 含金量与局限

任务数只有 108 个，统计噪声天然偏大；真实 MCP 环境和应用版本会随时间漂移，复现性不如纯静态基准。Anthropic 等厂商报的是自己内部 harness 的成绩，与上游官方 harness 不完全可比。作为 2025 年底才出现的新榜，头部分数一年内已上涨约 20 个百分点，需留意饱和速度。

## 冷知识

「十项全能」名副其实：同一套题里，agent 前一刻还在 Google Calendar 里排会、在 Notion 里整理笔记，下一刻就得去 Kubernetes 查集群、去 BigQuery 跑 SQL、去 WooCommerce 处理订单。论文发布时全场最高分 38.6%，「连最强模型也不及格」成了它最好的广告。
