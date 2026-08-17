---
id: mcp-atlas
name: MCP Atlas
category: agent
organizer: Scale AI（Bandi 等，arXiv:2602.00933，2026），同时为 Scale SEAL 旗下榜单
url: https://arxiv.org/abs/2602.00933
aliases:
  - MCP-Atlas 工具使用
  - MCP Atlas（3.5 Flash 分数）
traits:
  - 36 个生产级真实 MCP server
  - 220 个真实工具
  - 干扰项混入逼工具发现
  - 98.6% 任务跨 server 编排
  - 500 公开 + 500 私有防污染
facts:
  - label: 规模
    value: 1,000 任务 / 36 个生产级 MCP server / 220 个真实工具
  - label: 跨 server 比例
    value: 98.6% 的任务需编排 2 个以上 server（平均 2.55 个）
  - label: 干扰设计
    value: 每题 6–37 个候选工具，真正需要的只有 2–8 个，其余是语义相近的干扰项
  - label: 计分方式
    value: claim 逐条打 0/0.5/1（平均每题 4.7 条），覆盖率 ≥0.75 判通过
  - label: 防污染
    value: 500 题公开 + 500 题私有；三个独立 LLM judge 交叉评分（差 2–5 分）
  - label: 失败诊断
    value: 11 类失败归因：工具类 36.7%，认知类 63.3%
frontier:
  value: 82.2
  note: >-
    论文 2026-05 快照：Muse Spark 82.2% 居首，Claude Opus 4.7 79.1%、Gemini 3.1 Pro 78.2% 紧随；开源最强 GLM-5.1
    75.6%。
openSource:
  status: partial
  url: https://github.com/scaleapi/mcp-atlas
  note: >-
    500 题公开子集在 HuggingFace（ScaleAI/MCP-Atlas），容器化评测框架与 claim 评分器在 GitHub（scaleapi/mcp-atlas）开源；另有
    500 题私有保留集防过拟合，外部只能复现公开一半
history:
  - date: 2026-02
    event: arXiv 首发（2602.00933），Scale AI 出品，定位真实 server 的 MCP 工具使用评测
  - date: 2026-05
    event: v3 修订：20 个前沿模型完整评测、三 judge 交叉分析、效率帕累托前沿，榜单定格为 2026-05 快照
  - date: "2026"
    event: 开源 500 题公开 split、容器化评测框架与 claim 评分器；作为子榜纳入 Scale SEAL 体系
ladder:
  - model: Muse Spark 1.1
    score: 88.1%
    note: 官方榜 2026-08 核验（2026-04 更新口径）；BenchLM 2026-08 同录
  - model: Claude Opus 5
    score: 85.8%
    note: 官方榜 2026-08 核验；BenchLM 2026-08 同录
  - model: Kimi K3
    score: 84.2%
    note: BenchLM 2026-08 镜像；官方 2026-04 表为 82.3%
  - model: Gemini 3.5 Flash
    score: 83.6%
    note: 官方榜 2026-08 核验；BenchLM 同录
  - model: Claude Fable 5
    score: 83.3%
    note: 官方榜（2026-04 更新口径表）
  - model: Claude Opus 4.8
    score: 82.2%
    note: 官方榜 2026-08 核验；BenchLM 同录
  - model: Muse Spark
    score: 82.2%
    note: 官方榜（初代，与 Opus 4.8 并列）
  - model: GPT-5.6 Sol
    score: 81.8%
    note: 官方榜 2026-08 核验（新录入）
  - model: Inkling-Small
    score: 79.6%
    note: BenchLM 2026-08 镜像；官方表 79.2%（Thinking Machines）
  - model: Claude Opus 4.7
    score: 79.1%
    note: 官方榜；论文 2026-05 快照同录
  - model: Gemini 3.1 Pro
    score: 78.2%
    note: 官方榜（preview/high 配置）
  - model: GLM-5.2
    score: 77.8%
    note: 官方榜（新录入）；开源权重最强，BenchLM 录 76.8%
relatedIds:
  - scale-seal
  - browsecomp
  - toolathlon
---

## 一句话

给 AI 一屋子真工具，看它会不会自己挑着用

## 测什么

测 agent 通过 MCP（Model Context Protocol）调用真实工具干活的能力。36 个生产级 MCP server、220 个真工具、1,000 道人工撰写并校验的任务，跨搜索、分析、办公、金融、编程五类环境。两个关键设计：prompt 全用自然语言、绝不点名该用哪个工具；每题候选工具里混着大量「看起来相关其实没用」的干扰项，逼 agent 自己发现工具链。98.6% 的任务需要跨两个以上 server 编排，后面工具调用的参数往往依赖前面的返回结果。

## 怎么测

每题给 agent 6–37 个候选工具（平均 15 个，真正需要的只有 2–8 个），单轮拿到需求后自主调用，调用上限 100 次。判分走「claim 制」：每题配一组原子事实 claim（平均 4.7 条），只要最终答案覆盖了这些事实就算对，不管你走哪条工具路径——这避免了对「路线不同但结果正确」的误判。judge 逐条打 0/0.5/1 分，覆盖率 ≥0.75 算通过；三个独立 LLM judge 交叉评分，1,000 题分 500 公开 + 500 私有以防过拟合榜单。

## 典型任务

典型任务是跨 server 的多跳请求，比如「查某公司最近的财务数据、和竞品对比、整理成表格存档」这类需要搜索 + 数据接口 + 文件/表格工具串联的活儿。论文附录完整解剖了一道公开题：给出原始 prompt、启用的工具清单（含干扰项）、必须命中的 claim 列表和一份满分回答，可以看到 agent 要先调搜索拿线索、再把结果当参数喂给下一个工具。失败案例也具体：有的模型工具全调对了，却「提前收工」漏掉一条 claim。

## 分数怎么看

论文实测 20 个前沿模型呈三层分布：头部三家 78.2%–82.2%（最高 82.2%），开源最强的 GLM-5.1 达 75.6% 挤进第一梯队，榜尾到 40.2%。最有意思的发现是失败归因：63.3% 的失败是「认知问题」（理解错需求、提前停止、综合出错）而非工具调用失败；推理强者 o3 Pro 只得 44.5%，因为它 40% 的失败轨迹里压根没调工具。

## 含金量与局限

绝对分数有两个天然误差带：judge 之间差 2–5 个百分点，0.75 的通过阈值是人为设定。真实 server 会漂移（限流、接口改版），官方坦言榜单只是 2026-05 的快照，复现以容器版本钉住为准。它与 Scale SEAL 有从属关系（SEAL 旗下子榜），引用时留意语境；数据集 500 题公开、500 题私有，外部复现只能跑公开一半。

## 冷知识

推理榜常客 o3 Pro 在这里只拿 44.5%——它 40% 的失败轨迹里压根没调用任何工具，全程「空想」。论文结论很扎心：强模型的主要死因不是不会调工具，而是证据没收齐就提前收工。
