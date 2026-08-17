---
id: usamo
name: USAMO
category: reasoning
organizer: MAA；标志性基准论文为 ETH SRI × INSAIT《Proof or Bluff?》（arXiv:2503.21934）
url: https://arxiv.org/abs/2503.21934
aliases:
  - USAMO 2026
traits:
  - 美国奥数证明题
  - 专家人工评分
  - 0-7 分制
  - 打击猜答案
  - 一次性评测无持续榜
facts:
  - label: 题量
    value: 6 道证明题（USAMO 2025），每模型独立作答 4 次
  - label: 计分
    value: 专家人工评分，官方 0–7 分制，满分 42
  - label: 评委
    value: 4 位有竞赛经验的专家，先培训并试评校准
  - label: 评测时效
    value: 赛题公布后数小时内完成模型作答
  - label: 论文
    value: 《Proof or Bluff?》arXiv:2503.21934（ETH SRI × INSAIT）
frontier:
  value: 25
  note: >-
    《Proof or Bluff?》（2025-03）：Gemini-2.5-Pro 约 25%（42 分制），o1-pro、o3-mini、R1、QwQ 等其余模型全部低于
    5%；此后无同口径公开复测，新一代系统水平应已明显提高。
openSource:
  status: partial
  url: https://github.com/matharena-eth/usamo-2025-proof-or-bluff
  note: 评测论文《Proof or Bluff?》（arXiv:2503.21934）与评分协议公开，但赛题本身为 MAA 版权、人工评分无法完全复现；模型答案与评注以论文附录形式公开
history:
  - date: "1972"
    event: 首届 USAMO 举办，此后成为美国 IMO 国家队选拔的关键环节
  - date: 2025-03
    event: USAMO 2025 举办；赛题公布数小时内 ETH SRI/INSAIT 完成六个模型评测
  - date: "2025-03-27"
    event: 《Proof or Bluff?》上线 arXiv，揭示「答案榜高分 ≠ 会写证明」
  - date: 2025-07
    event: 论文被 ICML 2025 接收；同月的 IMO 2025 金牌事件部分回应了它提出的质疑
ladder:
  - model: Gemini-2.5-Pro
    score: 25%
    note: 《Proof or Bluff?》42 分制，2025-03（六模型中唯一非平凡分）
  - model: o1-pro / o3-mini / R1 / QwQ / Claude 3.7
    score: <5%
    note: 《Proof or Bluff?》，2025-03，全部低于 5%
  - model: Gemini Deep Think（参照）
    score: 35/42
    note: IMO 2025 官方认证金牌线，2025-07（不同题集，仅作证明能力参照）
relatedIds:
  - imo-2025
  - aime
  - matharena-apex
---

## 一句话

美国数学奥林匹克证明题，专治「蒙对答案」

## 测什么

USAMO（美国数学奥林匹克）是 MAA 主办的顶级中学生赛事，两天六题，全是要求完整书写证明的大题，也是美国 IMO 国家队选拔的关键一环。作为 AI 基准，标志性工作是 ETH SRI 与 INSAIT 的论文《Proof or Bluff?》：研究者在 2025 年 USAMO 赛题公布后数小时内，让当时最强的六个推理模型（o1-pro、o3-mini、R1、QwQ、Claude 3.7、Gemini Flash-Thinking、Gemini-2.5-Pro）作答，检验它们写证明——而不是猜最终答案——的真实水平。

## 怎么测

模型对每道题生成完整证明，每题独立跑 4 次；由 4 位有竞赛经验的专家评委按官方 0–7 分制人工打分（7 分代表完整正确的证明，部分步骤给部分分），满分 42 分。评委还逐份评注，归纳模型的典型失败模式。这套流程昂贵但换来的信息量是最终答案型评测给不了的。

## 典型任务

结果触目惊心：只有 Gemini-2.5-Pro 拿到约 25% 的分数，其余模型全部低于 5%——而同一批模型在 AIME 上已能比肩顶尖人类选手。论文把典型失败称为「bluff」：模型写出看似流畅实则空洞的证明，比如宣称「由某著名定理即得」但该定理并不存在或不适用、举几个具体例子就断言一般结论成立、在关键逻辑跳跃处用「显然」一笔带过，全程语气自信，非专家很难分辨真假。

## 分数怎么看

这个评测第一次系统证明：「答对」和「证对」之间隔着巨大的能力鸿沟。它是 2025 年衡量模型数学严谨性的标志性参照，也直接催生了后续对证明型评测（IMO、MathArena 证明轨道）的重视。

## 含金量与局限

人工专家评分昂贵且难以规模化复现，每模型只有 6 题×4 次共 24 份样本，统计上很薄；这是 2025 年 3 月某一代模型的快照，此后 IMO 2025 金牌级系统已明显进步，旧结论不能直接外推到新模型。

## 冷知识

论文标题本身就是一句质问：Proof or Bluff？评委发现模型不仅证明写得「虚」，还会煞有介事地引用并不存在的「著名定理」、举两个例子就宣布一般结论成立——语气自信到非专家几乎分辨不出真假。
