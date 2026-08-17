---
id: fiction-livebench
name: Fiction.liveBench
category: other
organizer: 社区评测者「kas」，fiction.live 平台，2025-04 首发
url: https://fiction.live/stories/Fiction-liveBench-April-29-2025/oQdzQvKHw8JyXbN87
aliases:
  - Fiction.liveBench（Scout · 128K）
traits:
  - 12 万+ token 长文本
  - 深度理解非检索
  - 角色心智/时间线
  - 缩水对照版测衰减
  - 社区运营榜
facts:
  - label: 规模
    value: 约 30 篇故事、36 道深度理解题
  - label: 长度
    value: 最长 120k+ token，按上下文长度分档报告
  - label: 对照设计
    value: 每篇母故事配多个保留关键细节的缩短版，精确测衰减
  - label: 考察点
    value: 角色心智、事件时间线、从暗示信息推断——非检索式
  - label: 运营方
    value: 社区评测者 kas，发布在 fiction.live 连载平台
frontier:
  value: null
  note: >-
    无统一公开总榜数字：原始数据页在 fiction.live 上需登录查看，第三方转述（2025-04 社区报告）显示 Gemini 2.5 Pro 在 120k
    档表现最稳、多数模型随长度明显掉分，但无权威单值可锚定。
openSource:
  status: partial
  url: https://fiction.live/stories/Fiction-liveBench-April-29-2025/oQdzQvKHw8JyXbN87
  note: 题库在 fiction.live 平台公开可见但需登录访问；无独立代码仓，第三方（neosignal.io/Epoch AI）有收录转述
history:
  - date: "2025-03-25"
    event: fiction.live 上可追溯的最早版本（Mar 25 2025 帖）
  - date: "2025-04-06"
    event: 数据版被第三方可视化项目（llms-long-context-benchmark）引用传播
  - date: "2025-04-29"
    event: April 29 2025 版发布，即本站主链接版本
  - date: "2025-05-22"
    event: May 22 2025 版更新，持续滚动换题
  - date: 2025-12
    event: 被长上下文学术综述（arXiv:2512.00193）引用，进入学术视野
ladder:
  - model: o3
    score: 100%
    note: BenchmarkList 聚合（neosignal.io 口径），2026-05-06
  - model: GPT-5.2
    score: 96.9%
    note: BenchmarkList 聚合，2026-05-06
  - model: Grok 4
    score: 96.9%
    note: BenchmarkList 聚合，2026-05-06
  - model: Gemini 2.5 Pro (Jun 2025)
    score: 90.6%
    note: BenchmarkList 聚合，2026-05-06
  - model: Qwen3 235B
    score: 68.8%
    note: BenchmarkList 聚合，2026-05-06
  - model: Claude 3.7 Sonnet
    score: 53.1%
    note: BenchmarkList 聚合，2026-05-06
relatedIds:
  - graphwalks
  - mrcr
---

## 一句话

让 AI 读完十几万字小说再考细节

## 测什么

用长篇小说考「真读懂」的社区长文本基准：约 30 篇故事、36 道深度理解题，文本长度拉到 12 万 token 以上。它和「大海捞针」类测试的本质区别在于问题不是找一句话，而是要具备对角色的心理揣摩（心智理论）、事件时间线的梳理、以及从字里行间的暗示做推断的能力。每篇母故事还有多个保留关键细节但更短的版本，用来精确测量同一个模型在文本变长时理解力衰减多少。

## 怎么测

把整篇小说塞进上下文，然后问关于情节和人物的问题，按问答准确率计分，并按上下文长度分档报告。衰减曲线是核心看点：同一批题，4K、32K、128K 各跑一遍，画出准确率随长度下滑的轨迹。

## 典型任务

题目的典型形态：一篇十几万字的多视角小说里，问「某个角色第二次见到另一角色时，他误以为对方是谁」——答案不会出现在任何一句话里，需要跨章节拼出事件顺序、并理解角色当时的认知局限。再比如问某条暗线伏笔最终如何回收，必须把开头埋的暗示和结尾的揭示对上号，检索式阅读答不出来。

## 分数怎么看

首批评测显示多数模型随文本变长明显掉分，Gemini 2.5 Pro 在 120k token 档表现最稳（社区报告口径）。读这个榜要看曲线而不是单点：短文本满分、长文本腰斩是常态，128K 档的分数才是「长文理解」的真实成色。

## 含金量与局限

这是个人运营（kas）的社区榜单，不是学术机构基准：题目少（36 题）、无论文级评审，统计噪声和题目主观性都需注意。故事来自 fiction.live 公开创作平台，较新故事污染风险低但并非零。不过它已被学术综述（arXiv:2512.00193）引用，是社区长文本榜里认可度较高的一个。

## 冷知识

这是典型的「一个人的榜单」：题库是小说连载社区里的真实网文，却靠每篇故事配「缩水对照版」的实验设计，先后被 Epoch AI 收录页和学术综述引用——社区榜里少见带严格对照组的一个。
