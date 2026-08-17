---
id: frontier-bench
name: Frontier-Bench
category: coding
organizer: Anthropic（内部基准，随 2026 Opus 系列发布披露）
url: https://llm-stats.com/benchmarks/frontier-bench-v0.1
aliases: []
traits:
  - 终端长时程工程任务
  - Agent 独立尝试 5 次取均值
  - 含 FreeCAD 建模等非常规工具链
  - 厂商内部运行不可复现
  - 2026-07 随 Opus 5 披露
facts:
  - label: 版本
    value: v0.1（2026-07 随 Opus 5 发布披露）
  - label: 主办方
    value: Anthropic 内部基准
  - label: 计分方式
    value: 每个任务独立尝试 5 次，取平均奖励（0–1 区间）
  - label: 运行环境
    value: mini-SWE-agent harness + Anthropic 自有 GKE 后端
  - label: 任务画风
    value: 长时程终端工程，含 FreeCAD 3D 建模等不常见工具链
  - label: 数据公开性
    value: 不公开，外部只能看到发布材料里的数字
frontier:
  value: 43.5
  note: >-
    Anthropic 自报 Opus 5 约 43.5%（2026-07，内部运行、每任务 5 次取均值），约为 Opus 4.8（约 21.1%）的两倍；第三方聚合站 llm-stats
    收录的榜首同为 0.433。
openSource:
  status: closed
  note: Anthropic 内部基准：任务集不公开、无独立论文，外部只能看到发布材料里的结果；llm-stats 等第三方仅转述厂商自报数字
history:
  - date: 2026-07
    event: 随 Opus 5 发布材料首次对外披露 v0.1：得分约为 Opus 4.8 两倍，且单次任务成本更低
  - date: 2026-07
    event: 存在理由被点明：上一代终端榜 Terminal-Bench 2.1 上头部模型挤在 74–84% 的窄带，失去区分度
  - date: 2026-07/08
    event: llm-stats、codingfleet 等第三方聚合站收录榜单，转述纳入 GPT-5.6、Fable 5、Grok 4.5 等更多模型
ladder:
  - model: Claude Opus 5
    score: 44.4%
    note: 厂商自报（系统卡，xhigh 档；max 档 43.3%），2026-07-24
  - model: GPT-5.6 Sol
    score: 34.4%
    note: 第三方聚合（benchmarklist，Codex harness max 档），2026-07-23
  - model: Claude Fable 5
    score: 33.8%
    note: 第三方聚合（benchmarklist，Claude Code max 档），2026-07-23
  - model: Claude Opus 4.8
    score: 21.1%
    note: 第三方聚合（benchmarklist，Claude Code max 档），2026-07-23
  - model: GPT-5.6 Terra
    score: 20.8%
    note: 第三方聚合（benchmarklist，Codex max 档），2026-07-23
  - model: Grok 4.5
    score: 17.8%
    note: 第三方聚合（benchmarklist，Cursor CLI xhigh 档），2026-07-23
  - model: Claude Sonnet 5
    score: 14.6%
    note: 第三方聚合（benchmarklist，Claude Code max 档），2026-07-23
  - model: GPT-5.6 Luna
    score: 14.3%
    note: 第三方聚合（benchmarklist，Codex max 档），2026-07-23
  - model: GLM-5.2
    score: 5.1%
    note: 第三方聚合（benchmarklist，Claude Code max 档），2026-07-23
relatedIds:
  - terminal-bench
  - frontierswe
---

## 一句话

Anthropic 内部的终端编程 agent 考试

## 测什么

Frontier-Bench 是 Anthropic 的内部 agentic 编程基准，随 2026 年 Opus 新模型发布对外披露，目前是 v0.1。它测的是 agent 在终端里完成长时程工程任务的能力，题目超出普通修 bug 的范畴，包含一些需要不常见工具链的任务，比如把一个零件重建成 FreeCAD 3D 模型。它存在的理由很直接：上一代终端类榜单头部模型已经挤在一团，分不出高下。

## 怎么测

评测统一用 mini-SWE-agent harness，跑在 Anthropic 自己的 GKE 后端上。每个任务让 agent 独立尝试 5 次，取平均奖励（mean reward）作为得分，分数落在 0–1 区间。整个过程由 Anthropic 内部运行，外部只能看到发布材料里的结果。

## 典型任务

官方披露的典型任务画像是「长时程 + 不寻常工具」：agent 不是补个函数，而是要在终端里连续工作，完成诸如用 FreeCAD 把一个实体零件重建为 3D 模型这类跨软件、跨领域的工程活。这类任务没有标准化解法模板，考的是探索工具、反复试错、把一整件事做成的综合能力。

## 分数怎么看

按 Anthropic 自报口径，Opus 5 以约 0.43（43.5%）领跑，大约是 Opus 4.8（约 21%）的两倍，第三方聚合站 llm-stats 收录的榜首也是 0.433。发布材料还给出「分数—单次任务成本」曲线：Opus 5 在约 14–15 美元/次达到约 44% 的天花板。目前它主要用于 Anthropic 自家模型的纵向比较。

## 含金量与局限

v0.1 阶段一切分数都是厂商自报：无独立论文、任务集不公开、外部无法复现，媒体转述的数字都源自同一份发布材料。另外务必别和 Epoch AI 的 FrontierMath（数学基准）混淆，两者除了名字都带 Frontier 毫无关系。

## 冷知识

一个耐人寻味的细节：Anthropic 的脚注写明，Opus 5 跑榜时如果安全分类器拒绝了请求，兜底替跑的竟是 Opus 4.8——同一张榜上新旧两代模型其实在同一场考试里「接力」。另外别被名字骗了：它和 Epoch AI 的数学榜 FrontierMath 没有任何关系。
