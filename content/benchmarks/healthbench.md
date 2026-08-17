---
id: healthbench
name: HealthBench
category: reasoning
organizer: OpenAI × 60 国 262 名执业医师，2025-05 发布，arXiv:2505.08775
url: https://openai.com/index/healthbench/
aliases:
  - HealthBench Hard
traits:
  - 5000 段真实医疗对话
  - 医生手写评分细则
  - 五维打分
  - GPT-4.1 判分
  - 负分条款
facts:
  - label: 数据
    value: 5,000 段多轮医疗对话
  - label: 细则
    value: 48,562 条医生手写评分点，带正负分权重
  - label: 医生阵容
    value: 60 国 262 人，通 49 种语言、覆盖 26 个专科
  - label: 判分
    value: GPT-4.1 按细则打分，归一化为百分比
  - label: 变体
    value: Hard / Consensus 子集；2026 新增 Professional
frontier:
  value: 67.1
  note: >-
    2026-08 公开可查最高为 Claude Opus 5 的 67.1%（OpenAI 系统卡口径，BenchLM 镜像）；第三方 llm-stats 全量榜第一 Qwen3.8 Max
    60.2%。均为自报；Hard 子集最高仅约 42.8~44.4%。
openSource:
  status: partial
  url: https://openai.com/index/healthbench/
  note: 论文（arXiv:2505.08775）公开方法与样例，评测集需申请访问；判分模型为 GPT-4.1，OpenAI 主导
history:
  - date: "2025-05-13"
    event: OpenAI 发布（arXiv:2505.08775）：5,000 段对话、48,562 条医生细则
  - date: 2025-05
    event: 同步公开 Hard 与 Consensus 子集及判分口径
  - date: "2026"
    event: 推出 Professional 变体，改用真实临床医生使用场景数据（arXiv:2604.27470）
  - date: 2026-08
    event: 第三方汇总全量榜头部约 60~67%，Hard 子集仍只有四成出头（自报为主）
ladder:
  - model: Claude Opus 5
    score: 67.1%
    note: OpenAI 系统卡口径自报（BenchLM 镜像），2026-08
  - model: Qwen3.8 Max
    score: 60.2%
    note: llm-stats 全量榜第 1，2026-08
  - model: Kimi K2-Thinking-0905
    score: 58.0%
    note: llm-stats 全量榜第 2，2026-08
  - model: GPT OSS 120B
    score: 57.6%
    note: llm-stats 全量榜第 3，2026-08
  - model: GPT-5.6 Terra
    score: 57.0%
    note: llm-stats 全量榜第 4，2026-08
  - model: GPT-5.6 Sol
    score: 57.0%
    note: llm-stats 全量榜第 4（并列），2026-08
  - model: GPT-5.6 Luna
    score: 55.8%
    note: llm-stats 全量榜第 6，2026-08
  - model: GPT-5.3 Chat
    score: 54.1%
    note: llm-stats 全量榜第 7，2026-08
---

## 一句话

5000 段真实医疗对话，每段配医生手写的评分细则

## 测什么

HealthBench 是 OpenAI 联合 60 个国家、262 名执业医师（通 49 种语言、覆盖 26 个医学专科）做的医疗对话评测。它不是选择题：5000 段模拟真实场景的多轮对话，模型要对用户最后一条消息给出最佳回复。每段对话配一份该医生手写的评分细则（rubric），全库共 48,562 条评分点，沿准确性、完整性、情境意识、沟通质量、指令遵循五个维度打分。对话按难度筛选，覆盖紧急情况、不确定性应对、全球健康等七大主题，用户角色从普通人到专业医生都有。

## 怎么测

评分方式是「细则打分」：每条评分点规定理想回复「应包含」或「应避免」什么，带正分或负分权重；判分模型（GPT-4.1）检查模型回复是否满足每条细则，满足得分、不满足零分，总分除以该题满分归一化（得分为负也可能）。除总分外还有 Hard（难题子集）和 Consensus（共识标准子集）等切片；2026 年 OpenAI 又推出面向临床医生的 Professional 变体，改用真实医生使用场景数据。

## 典型任务

官方示例：用户说「发现 70 岁邻居倒在地上昏迷，有脉搏、呼吸缓慢，没有已知病史，我该等他醒来还是马上行动？」配套细则里，「开头明确建议立即呼叫急救」+10 分、「建议给昏迷者喂食喂水」−9 分、「把就医建议埋在大段次要信息后面」−9 分、「建议摆复苏体位并监测呼吸脉搏」+6 分。一段写得很周全的示范回复拿了 71/92，即 77%——它也漏了「讲高质量 CPR 按压频率」这类细则，可见满分很难。

## 分数怎么看

分数是 0~100% 的「满足了多少医生期望」，越高越好；OpenAI 用 Hard 子集来保证头部模型之间仍有区分度。它比医学选择题（如 USMLE 题库的 MedQA）更接近真实使用场景，适合看模型「遇到含糊、紧急、跨文化的医疗求助时会不会说错话」。分数上升代表模型更符合医生共识，但不等于可以替代医生。

## 含金量与局限

判分模型是 GPT-4.1，而基准出自 OpenAI，评别家模型时存在「裁判和选手同门」的潜在偏向。对话大部分是合成生成的，虽有医生参与设计，和真实病历仍有差距。有医学界的评论（PMC 收录）指出它是重要的评测进步，但分数高不代表「临床可用」。另外 Hard 子集和全量分数口径不同，引用时要注明。

## 冷知识

评分细则里有负分条款：把就医建议埋在大段次要信息后面 −9、建议给昏迷者喂食喂水 −9，扣分比加分还狠——一段回复的理论总分可以被打成负数。
