---
id: graphwalks
name: GraphWalks
category: other
organizer: "OpenAI，2025 开源（MIT），HF: openai/graphwalks"
url: https://github.com/openai/graphwalks
aliases:
  - GraphWalks BFS
traits:
  - 超长上下文图推理
  - BFS/Parents 变体
  - F1 判分
  - 按长度分桶
  - 合成数据
facts:
  - label: 规模
    value: "1,150 个实例，MIT 协议开源（HF: openai/graphwalks）"
  - label: 两个变体
    value: BFS（广度优先遍历）与 Parents（反查父节点）
  - label: 长度分桶
    value: 常报 128k / 256k / 1M
  - label: prompt 结构
    value: 3 个演示样例 + 目标图边列表 + 查询，输出节点 ID 列表
  - label: 判分
    value: 官方抽取脚本 + F1 评分，允许部分对
frontier:
  value: 99.7
  note: >-
    llm-registry 收录（2026-03 快照）：GPT-5.2 High 在 BFS 128k 档达 99.7%；但 1M 档远未饱和——BenchmarkList 收录
    GPT-5.5 的 BFS 1M F1 约 57.1%。短桶接近满分、长桶腰斩是这个榜的常态。
openSource:
  status: open
  url: https://github.com/openai/graphwalks
  note: 数据集与评测脚本开源（GitHub openai/graphwalks + HuggingFace openai/graphwalks，MIT 协议）
history:
  - date: "2025"
    event: OpenAI 开源（GitHub openai/graphwalks + HuggingFace 数据集，MIT 协议）
  - date: 2025-10
    event: 被数据集编目论文（arXiv:2510.09316）收录，确认 1,150 实例规模
  - date: "2025-12-11"
    event: GPT-5.2 发布引用其 BFS 成绩（128k 档 99.7%，第三方收录口径）
  - date: "2026"
    event: Anthropic 在 Claude 系统卡中采用，并公开披露官方 F1 脚本对空答案集的判分缺陷及自家修正
ladder:
  - model: GPT-5.2
    score: 99.7%
    note: BFS 128k 档，llm-registry 收录，2026-03
  - model: GPT-5.2
    score: 94.0%
    note: BFS <128k 档，llm-stats 榜第 1，2026-08
  - model: Claude Mythos Preview
    score: 80.0%
    note: BFS >128k 档，llm-stats 榜第 1，2026-08
  - model: GPT-5.5
    score: 57.1%
    note: BFS 1M 档，BenchmarkList 收录，2026-08
  - model: Claude Opus 4.6
    score: 38.7%
    note: BFS 256K-1M 档，BenchGecko 收录，2026-08
relatedIds:
  - mrcr
  - fiction-livebench
---

## 一句话

把一张大图塞进超长上下文，让 AI 在脑子里跑 BFS

## 测什么

OpenAI 开源的超长上下文多跳推理基准。它不像「大海捞针」那样只要找到一句话，而是把整个上下文填成一张有向图——节点是十六进制哈希串、边以列表形式平铺——然后要求模型在图上做真正的算法操作：从某个节点出发做广度优先遍历（BFS），或反查某节点的所有父节点（Parents）。答对需要在几十万 token 的边列表里反复跳转、维护遍历状态，考的是长上下文里的主动推理而非被动检索。数据集共 1150 个实例，按上下文长度分桶。

## 怎么测

每条 prompt 含 3 个演示样例、一张目标图（边列表）和一个查询，模型要输出节点 ID 列表。判分用官方配套的答案抽取和 F1 评分脚本（输出集合与标准答案算 F1，允许部分对）。常报 BFS 和 Parents 两个变体，各自按 128k/256k/1M 长度分桶。Anthropic 在自家评测中发现标准答案常为空集而官方脚本会给 0 分，对评分逻辑做过修正——这说明各家跑出来的分数可能因判分细节有差。

## 典型任务

一个具体任务长这样：prompt 里是几百上千行形如「3fa9c1 → 77b2e0」的边，然后问「从节点 3fa9c1 出发做 BFS，按访问顺序列出所有可达节点」。模型得在脑内（或草稿里）维护队列和已访问集合，逐层扩展——漏看一条边、记错一个已访问节点，整趟遍历就错了。Parents 变体则是反向操作：给出某个节点，列出所有指向它的父节点，需要对整个边列表做反向扫描。

## 分数怎么看

按 F1 计分、越高越好，且必须带长度档看：128k 上接近满分不代表 1M 上行得通。第三方收录显示 GPT-5.2 High 在 BFS 128k 档约 99.7%，而 1M 档头部模型分数明显回落（如 GPT-5.5 的 BFS 1M F1 约 57%），长桶依然是分水岭。

## 含金量与局限

图是程序生成的合成数据，污染风险低，但「读哈希串走图」和现实长文本应用有距离，分数高不等于长文档理解好。各厂商上报时的判分细节（如空答案集的处理）未必一致，跨模型对比要留意口径；站内「GraphWalks BFS」标签即本条的 BFS 变体。

## 冷知识

Anthropic 跑榜时抓到一个判分 bug：很多题的标准答案其实是空集（该节点没有父节点），而官方脚本在标准答案为空时直接记 0 分——模型「正确地说出没有」反而不得分，Anthropic 只能在系统卡里注明自己改了评分逻辑。
