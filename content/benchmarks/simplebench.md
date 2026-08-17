---
id: simplebench
name: SimpleBench
category: reasoning
organizer: SimpleBench 团队，arXiv:2410.07359（2024）
url: https://simple-bench.com/
aliases: []
traits:
  - 200+ 道常识陷阱题
  - 时空/社会/语言三类
  - 人类基线 83.7%
  - 官网持续更新
  - 固定题库可背
facts:
  - label: 题量
    value: 200+ 多选题
  - label: 三大类
    value: 时空推理 / 社会智力 / 语言陷阱
  - label: 人类基线
    value: 83.7%（9 人小样本）
  - label: 发布时最强
    value: o1-preview 41.7%（2024-10）
  - label: 更新
    value: 官网 simple-bench.com 持续更新榜单
frontier:
  value: 81.9
  note: 官网首页口径最强模型 Claude Fable 81.9%（2026-08 抓取），仍未稳过 83.7% 的人类基线。
openSource:
  status: open
  url: https://github.com/simple-bench/SimpleBench
  note: 题库（simple_bench_public.json）与评测代码公开于 GitHub（simple-bench/SimpleBench）；官网 simple-bench.com 托管榜单
history:
  - date: "2024-10-31"
    event: arXiv:2410.07359 发布，200+ 题
  - date: 2024-10
    event: 发布时最强 o1-preview 41.7%，人类基线 83.7%，差距超 40 个点
  - date: 2026-08
    event: 官网最强 Claude Fable 81.9%，仍未稳过人类线
ladder:
  - model: Claude Fable
    score: 81.9%
    note: 官网榜（AVG@5），2026-08
  - model: Claude Opus 5
    score: 80.6%
    note: 官网榜，2026-08
  - model: Gemini 3.1 Pro Preview
    score: 79.6%
    note: 官网榜，2026-08
  - model: GPT-5.5 Pro
    score: 76.9%
    note: 官网榜，2026-08
  - model: Gemini 3.5 Flash
    score: 76.7%
    note: 官网榜，2026-08
  - model: Grok 4.6
    score: 75.9%
    note: 官网榜，2026-08
  - model: GPT-5.6 Sol Pro (xhigh)
    score: 71.7%
    note: 官网榜，2026-08
  - model: 人类基线
    score: 83.7%
    note: 官网基准（9 人小样本），最高人类分 95.4%
---

## 一句话

200 道「看着简单、模型却翻车」的常识陷阱题

## 测什么

SimpleBench 反向出题：不考博士级难题，专考高中生凭常识就能答、但大模型频频栽跟头的题。全库 200 多道多选题，覆盖时空推理、社会智力和「语言对抗鲁棒性」（也就是挖坑的陷阱题）三类。它想揭示的是：模型在 MMLU 上赢过人类，靠的是记忆化知识和模式匹配，而这些日常小问题恰恰戳穿了「近似推理」的短板——连简单题都答不对，凭什么信它能处理复杂任务？

## 怎么测

测法很朴素：标准化提示词（含思维链引导）逐题问模型，答对率就是分数。论文发布时测了 13 个模型，普通人类基线 83.7%，而最强模型 o1-preview 只有 41.7%，差距大到离谱。此后官网持续更新榜单，分数缓慢爬升，但直到最近最强模型仍在人类基线附近徘徊。

## 典型任务

最典型的陷阱题：「摩西带每种动物各几只上方舟？」选项里埋着「每种两只」，正确答案却是「一只都没带——上方舟的是诺亚不是摩西」，考模型会不会被「方舟=两只」的刻板联想带沟里。另一类是时空推理：「现在下午 3:45，火车 2 小时 30 分钟后开，几点发车？」选项 6:15 PM 才对，不少模型会在时间进位上出错。这些题不需要任何专业知识，但需要把题目真正「读进脑子里」。

## 分数怎么看

分数越接近或超过 83.7% 的人类基线，说明模型的基础常识推理越扎实。按官网数据，目前最强模型（Claude Fable）约 81.9%，仍未稳稳越过人类线——这和它在 GPQA、竞赛数学上的超人类表现形成鲜明反差，正是这个榜存在的意义。

## 含金量与局限

题库只有 200 题且固定公开，针对性训练（背题）的性价比高，分数可能随时间虚高。人类基线只基于 9 名参与者的小样本，83.7% 这个数字的统计意义有限。低分也未必全是推理问题，有时是提示词不匹配；它测的是「常识陷阱」这一窄面，不代表整体能力。

## 冷知识

「摩西带几只动物上方舟」这类陷阱题，把 2024 年最强的 o1-preview 考到只有 41.7%，而 9 个普通人类平均 83.7%——这是少数「人赢机器」还能量化说事的榜。
