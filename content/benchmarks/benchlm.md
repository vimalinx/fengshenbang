---
id: benchlm
name: BenchLM
category: arena
organizer: benchlm.ai 独立站点（运营主体未披露），数据刷新至 2026-08
url: https://benchlm.ai/
aliases:
  - BenchLM 综合
  - BenchLM.ai 综合
  - BenchLM 公共榜
  - BenchLM 数学/编程/知识/Agent/Agentic
  - Coding 分榜
  - 4 基准几何均值（HN 顶评）
traits:
  - 聚合榜：自身无考题，索引约 400 个外部基准
  - 私有 BenchAlign 方法论：27 个计权基准、8 大类加权合成
  - Supported / Estimated 证据强度标签
  - 附价格、速度与上下文窗口数据
  - 方法论私有，外部无法复算验证
facts:
  - label: 属性
    value: 聚合榜：自身无考题，索引外部基准加价格/速度数据
  - label: 覆盖
    value: 2026-08 首页口径：436 个基准、391 个模型（218 个入榜）
  - label: 计分
    value: 私有 BenchAlign v5.2：27 个计权基准、8 大类加权合成
  - label: 类权重
    value: Agentic 22% / Coding 20% / Reasoning 17% 等
  - label: 证据标签
    value: Supported（有直接第三方证据）/ Estimated（估计值，仍入榜）
  - label: 主体
    value: 运营方未披露
frontier:
  value: 82.9
  note: >-
    Claude Mythos 5 总分 82.9 居首，Claude Opus 5（82.8）、Claude Fable 5（82.6）紧随（2026-08-13 benchlm.ai
    官方快照）。注意这是「相对当前证据宇宙的校准分」，不是任何单一测试的原始正确率。
openSource:
  status: partial
  url: https://benchlm.ai/
  note: 榜单数据公开可查并附 embed/工具页；但 BenchAlign 聚合方法论私有、无公开数据集或复算代码
history:
  - date: 2026-04
    event: 评测博客已在稳定更新（可考的较早公开内容），开始输出基准解读长文
  - date: "2026-07-13"
    event: 发布 LMArena Elo 方法论拆解文，确立「评榜单的榜单」内容路线
  - date: "2026-08-05"
    event: 八月榜刷新：104 个 Supported + 111 个 Estimated 模型在榜（第三方转述）
  - date: "2026-08-12"
    event: 方法论页更新至 BenchAlign v5.2：27 个计权基准、8 类加权
ladder:
  - model: Claude Mythos 5
    score: "83.2"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Claude Opus 5
    score: "83.1"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Claude Fable 5
    score: "83.0"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: GPT-5.6 Sol
    score: "82.0"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Kimi K3
    score: "80.5"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Qwen3.8 Max
    score: "79.9"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Muse Spark 1.1
    score: "76.9"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Claude Opus 4.8
    score: "76.6"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Gemini 3.6 Flash
    score: "75.5"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: Grok 4.5
    score: "75.4"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
  - model: GPT-5.5
    score: "73.4"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Estimated=证据不足估计值）
  - model: GPT-5.4
    score: "73.4"
    note: 官方榜 2026-08（BenchAlign 加权综合校准分，Supported）
relatedIds:
  - aa-intelligence-index
  - lmarena
---

## 一句话

自己不出题，把几百个外部基准加权揉成总分

## 测什么

一个聚合型榜单：它自己没有任何一道题，而是索引约 400 个外部基准（编程、推理、数学、知识、Agent 等各类）外加价格、速度数据，用私有方法把别人的分数揉成综合排名和分榜。定位类似「基准的基准」——给你一个一眼看全局的入口。按核验结论，它属二手聚合榜，权威性不及 LMArena、Artificial Analysis 这类一手数据方。

## 怎么测

私有方法论叫 BenchAlign，当前版本 v5.2：约 400 个被索引的基准中只有 27 个计入加权总分（其余仅作展示），先归一化再按 8 大类加权合成——Agentic 22%、Coding 20%、Reasoning 17% 等。每个模型带证据强度标签：Supported 表示有直接第三方证据，Estimated 表示证据不足时的估计值——Estimated 也保留在榜上，官方理由是免得新模型只因没被测够就被当成弱模型。

## 典型任务

它不是一道题而是一摞别人的题：编程分榜里 SWE-bench Verified 一项占该类约 16% 权重，旁边拼着 LiveCodeBench 等信号；数学分榜引用 FrontierMath、AIME 之类。点开任一模型，能看到它的总分由哪些外部基准、各占多少权重拼出来，比如某模型的编程分项会标注主要差距来自哪个基准。

## 分数怎么看

官方自己强调：分数是「相对当前证据宇宙的校准分」，不是任何单一测试的原始百分数，所以 80 分不代表做对了 80% 的题。2026-08 快照里头部模型总分在 80 上下、编程分榜头部约 80 分。Estimated 行的不确定性明显更大，看榜时要区分。

## 含金量与局限

聚合榜的天花板是被引用的基准：源数据错了它会跟着错，且方法论私有、外部无法复算验证。适合快速扫一眼行业格局，不适合在严肃对比中当定论引用；要深究某项能力，应该回到它引用的一手基准去查原始分数。

## 冷知识

它自己从不动手测任何一个模型，却写了大量长文拆解别家榜单的缺陷（比如 LMArena 的啰嗦偏置和 Elo 误读），形成了一个有趣的套娃生态：评测榜单的榜单，顺便给别的榜单写「体检报告」。
