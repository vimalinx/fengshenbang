---
id: acebench
name: ACEBench
category: agent
organizer: 中国科学技术大学 × 华为诺亚方舟实验室（Chen et al.，arXiv:2501.12851，2025-01，已修订至 v8）
url: https://arxiv.org/abs/2501.12851
aliases:
  - ACEBench En（初版）
traits:
  - 2000 条标注数据
  - 中英文各半
  - Normal/Special/Agent 三类
  - LLM-Free 判分
  - 合成 API 池
facts:
  - label: 数据量
    value: 2,000 条标注数据，中英文各半
  - label: API 池
    value: 4,538 个参照真实世界合成的 API，覆盖 8 大域 68 子域
  - label: 三大类
    value: Normal（常规）/ Special（不完美指令）/ Agent（多轮沙盒）
  - label: 判分方式
    value: LLM-Free：自动比对函数调用与沙盒环境状态，不靠大模型当裁判
  - label: 数据构建
    value: Normal/Special 由 LLM 流水线生成并经多轮校验，Agent 类由专家手工构建
frontier:
  value: null
  note: 分类目分别报分，无统一总分；第三方收录很少——llm-stats 仅收 2 个自报成绩，最高为 Kimi K2 Instruct 0.765（2026-08），代表性有限。
openSource:
  status: open
  url: https://github.com/ACEBench/ACEBench
  note: 2,000 条标注数据（中英各半）与评测代码公开于 GitHub（ACEBench/ACEBench）；论文 arXiv:2501.12851（v8）
history:
  - date: "2025-01-22"
    event: arXiv v1 发布（2501.12851），中科大 × 华为诺亚方舟实验室
  - date: "2025"
    event: 被 EMNLP 2025 Findings 接收
  - date: 2025-07
    event: Kimi K2 技术报告采用其评测，此后常被与 BFCL、τ-bench 并列引用
  - date: "2025-11-20"
    event: 修订至 v8，持续打磨数据与评测细节
ladder:
  - model: Kimi K2 Instruct
    score: "76.5"
    note: 厂商自报（Kimi K2 技术报告 2025-07，ACEBench En）；llm-stats 收录 2026-08
  - model: Kimi K2-Instruct-0905
    score: "76.5"
    note: 同上（Moonshot 自报，llm-stats 收录 2026-08）
relatedIds:
  - tau2-bench
---

## 一句话

全方位体检 AI 用工具：从常规调用到「刁难指令」

## 测什么

一个工具使用综合评测，2,000 条标注数据（中英文各半），背后是 4,538 个参照真实世界合成的 API，覆盖科技、金融、娱乐、社会、健康等 8 大域 68 个子域。它把评测分成三类：Normal 测常规场景（单轮、多轮、个性化、原子级能力）；Special 专门测「不完美指令」的鲁棒性——参数缺失、格式错误、需求超出工具能力；Agent 测多轮多步的真实交互，由专家把外卖、电信运营等场景抽象成带状态的沙盒环境。

## 怎么测

Normal 和 Special 是固定问答对，比对模型输出的函数调用与标准答案，按类目计分。Agent 类在沙盒里跑：环境定义了核心状态变量（如订单状态、账户余额），模型与模拟用户多轮对话、连续调用多个工具，评测系统实时监控调用过程并校验最终状态。整套判分不依赖 LLM 当裁判（LLM-Free），降低成本也提高可复现性。

## 典型任务

Special 类的题最「损」：用户说「帮我订明天去北京的机票」却不说出发地，或者给的日期格式是错的，甚至问一个候选 API 根本办不到的事——正确答案不是硬着头皮调工具，而是追问澄清或如实拒绝，很多模型在这里栽跟头。Agent 类则是完整业务流：比如外卖场景里用户先下单、再追加商品、又改配送地址，模型要连续调用查询、下单、改单接口，并让订单状态全程一致，中间一步调错参数后面全错。

## 分数怎么看

论文的价值在于细分诊断：同一模型在 Normal 上光鲜，到 Special（不完美指令）和 Agent（多轮状态管理）上普遍明显掉分，能精确看出短板是「选错工具」「填错参数」还是「理解错需求」。它常与 BFCL、τ-bench 并列引用，被 Kimi K2 等模型的技术报告采用。中英文分开报分，站内常见的是英文版 ACEBench En。

## 含金量与局限

Normal 和 Special 数据由 LLM 自动生成（经多轮自动+人工校验），且 API 是合成的而非真实接口——测的是函数调用的正确性与鲁棒性，不完全等于真实 API 环境的发挥。论文版本迭代多（已到 v8），引用分数需核对版本；「ACEBench En」只是其英文一半，别当作全量成绩。

## 冷知识

名字是个乒乓球双关：副标题叫「Who Wins the Match Point in Tool Usage?」，ACE 球（发球直接得分）对应它想回答的问题——工具使用的赛点上，谁直接得分。
