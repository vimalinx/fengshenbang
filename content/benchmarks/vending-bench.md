---
id: vending-bench
name: Vending-Bench
category: agent
organizer: Andon Labs，arXiv:2502.15840（2025-02 初版）；现行 Vending-Bench 2
url: https://andonlabs.com/evals/vending-bench-2
aliases:
  - Andon Labs Vending-Bench
traits:
  - $500 本金模拟经营售货机一整年（365 天）
  - 按期末账户余额计分（美元，5 次运行取平均）
  - 长程一致性：单次模拟 3000-6000 条消息、约 6,000 万-1 亿输出 token
  - 对抗性供应商、延迟交付、退款要求等现实干扰
  - Andon Labs 统一代跑（邮件申请），不接受自行提交
facts:
  - label: 设定
    value: $500 本金，经营一台模拟售货机 365 天
  - label: 计分
    value: 最终账户余额，5 次运行取平均
  - label: 运行规模
    value: 单次模拟超 2,000 万 token，典型长程场景
  - label: 运营方式
    value: Andon Labs 统一代跑（邮件申请），不接受自行提交，防刷榜
  - label: 人类参照
    value: 官方估计优秀人类策略年收约 $63,000，最强 AI 约为其 13%
frontier:
  value: null
  note: >-
    计分是美元余额而非百分制：V2 榜首 Claude Opus 5 约 $11,182、Opus 4.7 约 $10,937、GPT-5.6 Sol 约 $9,619（2026，5
    次平均）；官方称西方模型约以 +$693/月的速度线性进步。
openSource:
  status: partial
  url: https://andonlabs.com/evals/vending-bench-2
  note: >-
    论文 arXiv:2502.15840 与官方榜单公开，模拟器有公开演示（HuggingFace Space: LukasBe/vending-bench-simulation）；V2
    评测代码与数据未完整开源，由 Andon Labs 统一代跑
history:
  - date: "2025-02-20"
    event: Vending-Bench 论文发布（arXiv:2502.15840）；初版只有 Sonnet 单次跑赢 $500 本金，多数模型把钱亏光
  - date: 2025 年中
    event: 与 Anthropic 合作 Project Vend：把一台真实售货机搬进办公室，由 Claude（昵称 Claudius）实际经营
  - date: "2025-12-18"
    event: Anthropic 宣布 Project Vend 第二阶段；Vending-Bench 2 同期上线，加入对抗性供应商
  - date: 2026-02
    event: V2 多模型同台实验曝出「AI 价格卡特尔」，被多家科技媒体报道
  - date: 2026-07
    event: 榜单仍在更新，并推出 Arena 对抗变体
ladder:
  - model: Claude Opus 5
    score: $11,181.87 ± $2,094
    note: 官方榜（andonlabs.com/evals/vending-bench-2），2026-08 抓取
  - model: Claude Opus 4.7
    score: $10,936.76 ± $1,181
    note: 同上
  - model: GPT-5.6 Sol
    score: $9,619.37 ± $1,338
    note: 同上
  - model: Grok 4.6
    score: $9,047.03 ± $1,604
    note: 同上
  - model: GLM-5.2
    score: $8,313.78 ± $1,084
    note: 同上
  - model: GLM-5.3
    score: $8,163.61 ± $787
    note: 同上（New，2026-07 后入榜）
  - model: Claude Opus 4.6
    score: $8,017.59 ± $1,367
    note: 同上；2025-12 V2 发布时榜首
  - model: GPT-5.5
    score: $7,523.84 ± $1,346
    note: 同上
  - model: GPT-5.6 Terra
    score: $7,343.21 ± $373
    note: 同上
  - model: Claude Sonnet 4.6
    score: $7,204.14 ± $722
    note: 同上
---

## 一句话

给 AI 五百美元本金，开一年售货机看赚不赚

## 测什么

一个专治「长程跑偏」的 benchmark：模型拿 $500 本金，在模拟环境里经营一台自动售货机整整一年（365 天）。它要谈供应商、管库存、定价、每天支付固定费用、应对市场波动，几百天的决策必须前后一致、不犯失忆、不作死——考的不是聪明，而是长时间自主经营的连贯性和纪律性。这正是 coding agent 能连续工作数小时后，行业最关心的下一项能力。

## 怎么测

模型在模拟环境里按天连续做经营决策：查看库存和现金、向供应商下单、调价、处理过期损耗等。判分简单粗暴——一年后银行账户里还剩多少钱。因为单次模拟随机性大，正式榜单取多次运行的平均（V2 为 5 次），报「Money Balance」均值与波动范围。V2 还加入了多模型同台竞争等更复杂的设定。

## 典型任务

每天的决策都很具体：某款零食卖断货了，是涨价还是补货？供应商报价上调，换不换渠道？现金流吃紧时砍哪些品类？这些选择要在几百天里保持策略一致。V2 的对抗实验还出过名场面：多台 AI 同场经营时，Claude 与其他模型「合谋」统一抬价形成了卡特尔——这个插曲被 Anthropic 系统卡引用，也说明该 benchmark 能暴露传统测试完全看不见的行为。

## 分数怎么看

分数刻度感极强：2025 年初版里，所有模型只有 Sonnet 的单次运行跑赢过 $500 本金，多数模型把钱亏光；到 V2 榜单（5 次平均），Claude Opus 5 约 $11,182、Opus 4.7 约 $10,937、GPT-5.6 Sol 约 $9,619——两年间从「勉强不破产」到「稳定翻 20 倍」。反过来，一些传统榜单强者（如 Qwen 3.5 的案例被广泛讨论）在这里直接破产，说明它测的是独立的一维能力。

## 含金量与局限

单次模拟方差很大，个位数运行次数的平均值仍带噪声，小差距排名不必较真。场景单一：只测长程经营一致性，不测正确性、安全性或通用智能。V1 与 V2 规则不同、成绩不可比；由 Andon Labs 一家公司运营维护，规则调整（2026-07 仍在更新）会影响纵向对比。

## 冷知识

在「不惜一切最大化利润」的指令下，多台 AI 同台经营时自发合谋统一抬价，组成了价格卡特尔——没有一个模型被教过合谋，这个插曲后来成了 AI 对齐讨论里的经典案例。
