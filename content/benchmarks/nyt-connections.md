---
id: nyt-connections
name: NYT Connections（Extended）
category: reasoning
organizer: 独立研究者 Lech Mazur 维护的社区基准（GitHub lechmazur/nyt-connections）
url: https://github.com/lechmazur/nyt-connections
aliases:
  - Extended NYT Connections
traits:
  - 16 词文字分组
  - 混入干扰词
  - 每题一次落子
  - quadratic-v1 计分
  - 最新 100 题防污染
facts:
  - label: 题量
    value: 940 题（2026-02 起，持续扩题）
  - label: 玩法
    value: 每题一次落子，答对 3 组第 4 组自动成立
  - label: 计分
    value: quadratic-v1：逐题 (g/4)² 后取平均
  - label: 防污染
    value: 另设「最新 100 题」子榜
  - label: 性质
    value: 个人社区项目，与 NYT 官方无关
frontier:
  value: 97.4
  note: >-
    Extended 940 题榜榜首 Gemini 3.1 Pro Preview 97.4%（lechmazur 仓库，2026-08）；参照系：NYT 官方数据里平均人类玩家约解出 71%
    的谜题。
openSource:
  status: open
  url: https://github.com/lechmazur/nyt-connections
  note: 题库、评测代码与榜单全部公开于 GitHub（lechmazur/nyt-connections，940 题持续扩充）；社区个人维护，与 NYT 官方无关
history:
  - date: 2024-12
    event: Lech Mazur 发布原版榜（436 题）
  - date: 2025-01
    event: o1 以 90.7 分登顶，原版接近饱和
  - date: "2025-02-04"
    event: Extended 版上线：每题混入最多 4 个干扰词
  - date: "2026-02-02"
    event: 题量扩至 940
  - date: "2026-07-24"
    event: 头条计分改为 quadratic-v1，新旧分数不可直接比
  - date: 2026-08
    event: Gemini 3.1 Pro Preview 97.4% 领跑 940 题榜
ladder:
  - model: Gemini 3.1 Pro Preview
    score: 97.4%
    note: Extended 940 题榜第 1，2026-08
  - model: GPT-5.5 (xhigh reasoning)
    score: 96.2%
    note: Extended 940 题榜第 2，2026-08
  - model: GPT-5.5 (high reasoning)
    score: 95.2%
    note: Extended 940 题榜第 3，2026-08
  - model: Gemini 3 Pro Preview
    score: 94.4%
    note: Extended 940 题榜第 4，2026-08
  - model: Claude Opus 5 (xhigh reasoning)
    score: 94.3%
    note: Extended 940 题榜第 5，2026-08
  - model: GPT-5.6 Sol (xhigh reasoning)
    score: 93.8%
    note: Extended 940 题榜第 6，2026-08
  - model: Kimi K3
    score: 93.6%
    note: Extended 940 题榜第 7，2026-08
  - model: Claude Fable 5 (high reasoning)
    score: 92.7%
    note: Extended 940 题榜第 8，2026-08
  - model: Gemini 3.5 Flash
    score: 92.6%
    note: Extended 940 题榜第 9，2026-08
  - model: Claude Opus 4.6 (high reasoning)
    score: 92.1%
    note: Extended 940 题榜第 12，2026-08
---

## 一句话

把纽约时报「文字分组」谜题加干扰词后拿去考模型

## 测什么

纽约时报 Connections 是每天一题的文字游戏：16 个词，要分成 4 组、每组 4 词共一个隐藏主题（主题可能很损，比如「能跟在 fire 后面的词」）。Lech Mazur 把它做成了模型榜，因为原版 2025 年初就被 o1 刷到 90.7 接近饱和，于是 2025-02 推出 Extended 版：每题混入最多 4 个额外的干扰词，且人工核对过这些干扰词确实不属于任何一组。题量从最初的 436 题滚到 2026-02 的 940 题，是目前更新最勤的社区推理榜之一。

## 怎么测

模型拿到全部词，一次性输出分组结果，每题只允许一次尝试（人类在 NYT 官网玩有 4 次试错机会和「差一个词」提示，模型反而更苛刻）。规则上只需答对 3 组，第 4 组自动成立。2026-07 起头条分数改用 quadratic-v1 计分：一题答对 g 组记 (g/4)²，即 0/1/2/3/4 组分别得 0%、6.25%、25%、56.25%、100%，总分取 940 题平均——平方设计重奖全对，不全对的分被压得很低。仓库还专门设了「最新 100 题」子榜，用来对冲谜题进入训练数据的污染问题。

## 典型任务

一道 Extended 题的画面：模型看到约 18~20 个词，其中藏着 4 组真关联词加几个故意凑数的干扰词。比如一组可能是「行星名」（MARS、VENUS、JUPITER、MERCURY），另一组是「巧克力品牌」（MARS、GALAXY……），同一个词在不同组都沾边，必须先看出整体结构再落子；干扰词则长得好像能塞进某组，其实塞不进去。模型要一次给出完整分组，漏一组就按平方规则大打折扣。

## 分数怎么看

按仓库 2026-08 榜单，榜首 Gemini 3.1 Pro Preview 97.4%，GPT-5.5（xhigh）96.2%，头部推理模型基本都在 90% 以上；非推理模式的模型普遍只有个位数到十几分，差距悬殊，能看出它确实吃推理能力。参照系：NYT 官方数据里平均人类玩家约能解出 71% 的谜题，顶级推理模型已经明显超过普通玩家，接近精英玩家水平。

## 含金量与局限

这是个人维护的社区基准，与纽约时报官方无关，也没有学术评审背书，注意别和另一篇学术版 Connections 基准（arXiv:2412.01621）混淆。谜题和答案是公开的，训练污染风险真实存在，作者用「最新 100 题」子榜缓解但不能根除。2026-07 计分规则改成 quadratic-v1，前后的分数不能直接比；个别模型因内容拦截拒答的题按 0 分计，也会扭曲分数。

## 冷知识

模型其实比人类玩家更「吃亏」：人类在 NYT 官网有 4 次试错机会和「差一个词」提示，模型每题只有一次落子机会。即便如此，o1 在模拟人类规则的对局里胜率 98.9%，逼近精英玩家的 100%。
