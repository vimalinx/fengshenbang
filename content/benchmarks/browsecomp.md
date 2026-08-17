---
id: browsecomp
name: BrowseComp
category: agent
organizer: OpenAI，2025-04 随 Deep Research 发布（arXiv:2504.12516）
url: https://github.com/openai/simple-evals
aliases:
  - BrowseComp 浏览理解
  - MCP Atlas / BrowseComp
traits:
  - 1,266 道倒装出题冷门事实题
  - 自主联网搜索多轮检索
  - AI grader 语义比对判分
  - 三道难度门槛（前沿模型做不出 + 五搜无果 + 人类十分钟做不出）
  - canary 标记防训练污染
facts:
  - label: 题量
    value: 1,266 道（初版 1,287 道，复核后删 21 道）
  - label: 出题方法
    value: 倒装出题：先锁定冷门答案，再用其属性编谜面
  - label: 话题分布
    value: 影视 16.2%、科技 13.7%，艺术/历史/体育/音乐等各约 10%
  - label: 判分方式
    value: AI grader 语义比对短答案（与 HLE 同一判分 prompt）
  - label: 难度门槛
    value: 当时 GPT-4o/o1/早期 Deep Research 均做不出 + 五次谷歌首页无果 + 人类十分钟做不出
  - label: 人类参照
    value: 出题的训练师自己做（禁 AI、两小时上限）仅解出 29.2%
frontier:
  value: 51.5
  note: OpenAI Deep Research 51.5%（2025-04 论文数字）；此后成为各家 deep research 产品的必争榜，头部已明显更高，但口径不一，未取可核验的最新统一值。
openSource:
  status: open
  url: https://github.com/openai/simple-evals
  note: 数据集与判分 prompt 随 simple-evals 仓库与论文（arXiv:2504.12516）公开
history:
  - date: "2025-04-10"
    event: 随 OpenAI Deep Research 一同发布；GPT-4o 带浏览仅 1.9%，Deep Research 约 51.5%
  - date: "2025"
    event: 数据修订：复核 Deep Research 零通过率的 118 题，删除答案有误或歧义的 21 题，定格为 1,266 题
  - date: 2025 起
    event: 衍生版陆续出现：BrowseComp-ZH（中文信息生态）、MM-BrowseComp（多模态）、BrowseComp-Plus 等
ladder:
  - model: Kimi K3
    score: 91.2%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）2026-08；Moonshot 开源权重
  - model: Claude Opus 5
    score: 90.8%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: GPT-5.6 Sol
    score: 90.4%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: GPT-5.5 Pro
    score: 90.1%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: GPT-5.6 Terra
    score: 87.5%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: Claude Mythos Preview
    score: 86.9%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: Kimi K2.6
    score: 86.3%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）；Moonshot 开源权重
  - model: Seed 2.1 Pro
    score: 86.2%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: Gemini 3.1 Pro
    score: 85.9%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: Seed 2.1 Turbo
    score: 84.9%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: Claude Sonnet 5
    score: 84.7%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
  - model: GPT-5.5
    score: 84.4%
    note: 第三方聚合（llm-stats 2026-08，厂商自报）
relatedIds:
  - hle
  - mcp-atlas
---

## 一句话

考 AI 大海捞针：翻遍全网找一条冷门事实

## 测什么

测浏览 agent「找藏得深但好验证的信息」的能力，1,266 道题。出题方式是「倒装」：出题人先锁定一个冷门事实（一个人、一场比赛、一篇论文），再挑出它的一组属性反过来说成谜面，让答案在理论上唯一、但几乎搜不到。这样的设计故意避开了日常搜索——答案是那种「Google 第一页绝对没有、但找到了一眼能确认」的东西，专测检索的毅力和策略，而不是知识储备。

## 怎么测

agent 带着问题自主上网，可以反复搜索、翻页、换关键词，最后交一个简短答案。参考答案都是短字符串，判分用一个 AI grader（与 Humanity's Last Exam 同一套判分 prompt）判断模型答案与参考答案是否语义等价，报准确率。出题时有三道难关把关：当时的 GPT-4o、o1 和早期 Deep Research 都答不出；简单搜五次首页没有；另一个人十分钟内也做不出。

## 典型任务

论文给的例子很有画面感：「1990 到 1994 年间，哪两支球队的足球比赛由巴西裁判执法、全场四张黄牌双方各两张、其中三张不出现在上半场、四次换人且一次是前 25 分钟因伤换人？」（答案：Ireland v Romania）。另一题：「找出这位虚构角色——偶尔打破第四面墙、背景故事里有无私的苦行僧相助、以幽默著称、主演的电视剧在 60 到 80 年代播出且不到 50 集」（答案：Plastic Man）。解题得把条件拆开、设计搜索路径、交叉验证， brute force 要翻成千上万个候选。

## 分数怎么看

发布时的数字很有冲击力：GPT-4o 不开浏览只有 0.6%，开了浏览也才 1.9%，OpenAI Deep Research 约 51.5%——是当时唯一能做这个榜的系统，也成了各家 deep research 产品的必争之地。连出题的人类训练师自己做（不许用 AI、两小时上限）也只解出 29.2%。

## 含金量与局限

它只测「找到一条难找的信息」，不测写长报告、处理模糊需求等真实搜索场景。倒装出题有固有缺陷：能保证参考答案对，但不能百分百保证没有第二个答案。题目和参考答案公开后污染风险上升（官方加了 canary 字符串过滤训练语料），且网页内容随时间变化会影响可解性；衍生版（BrowseComp-ZH、MM-BrowseComp 等）成绩与原始版不可混用。

## 冷知识

数据集里埋了一串 canary 标记「browsecomp:26b5c67b-…」，方便各家从训练语料里把它过滤掉；论文还公开请求读者不要在网上明文贴题目，防的就是被训练数据吸收或被评测 agent 直接搜到答案。
