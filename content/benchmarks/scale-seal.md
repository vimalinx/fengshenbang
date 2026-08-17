---
id: scale-seal
name: Scale SEAL
category: agent
organizer: Scale AI（SEAL Leaderboards 专家评估体系）
url: https://scale.com/leaderboard
aliases:
  - Scale SEAL Remote Labor
traits:
  - 真实付费远程自由职业项目（240 个 Upwork 项目，超 6,000 小时）
  - 人类专家盲评「客户会不会验收付款」
  - 端到端交付：3D/CAD、建筑设计、软件开发、视频动画等
  - 伞形品牌：各子榜（RLI/SWE-bench Pro/MCP Atlas）口径难度各异
  - 部分子榜数据私有，外部无法独立复核
facts:
  - label: 运营方
    value: Scale AI
  - label: 性质
    value: 伞形专家评估品牌，非单一 benchmark
  - label: 旗下子榜
    value: Remote Labor Index（RLI）、SWE-bench Pro、MCP Atlas 等
  - label: 机制
    value: 专家设计任务与判分标准，LLM 辅助规模化评审；私有数据防过拟合 + 开源数据保可比
  - label: RLI 规模
    value: 240 个真实付费自由职业项目，对应超 6,000 小时、超 14 万美元真实报酬
frontier:
  value: 15.8
  note: RLI 自动化率：Fable 5 15.8%（CAIS 2026-07 报告），Opus 4.8 8.3%、GPT-5.5 6.3%；2025-10 发布时头部仅 2.5%，八个月翻两番以上。
openSource:
  status: partial
  url: https://labs.scale.com/leaderboard/rli
  note: RLI 题面数据私有（真实发包项目不公开），论文 arXiv:2510.26787 与 CAIS 报告公开；伞形品牌下 SWE-bench Pro 等子榜开源
history:
  - date: "2025-10-29"
    event: RLI 发布（Scale × CAIS，arXiv:2510.26787）：头部 agent 只能端到端交付约 2.5% 的真实项目
  - date: 2026-02
    event: MCP Atlas 论文发布，作为子榜纳入 SEAL 体系
  - date: "2026-07-01"
    event: CAIS 跟踪报告：配合更强 agent 脚手架，自动化率升至 15.8%（Fable 5）
ladder:
  - model: Claude Fable 5
    score: 15.8%
    note: 官方报告（CAIS 2026-07-01），Claude Code 脚手架 + 原生计算机使用
  - model: Claude Opus 4.8
    score: 8.3%
    note: 同上
  - model: GPT-5.5
    score: 6.3%
    note: 同上（Codex CLI 脚手架）
  - model: Claude Opus 4.6
    score: 4.17%
    note: 同上（Claude Cowork 脚手架）；此前公开榜最高
  - model: Manus 1.6 Max
    score: 2.92%
    note: 同上（2025-10 发布时头部仅 2.5%）
  - model: GPT-5.2
    score: 2.50%
    note: 同上
  - model: Grok 4
    score: 2.08%
    note: 同上
  - model: Gemini 3 Pro
    score: 1.25%
    note: 同上
relatedIds:
  - mcp-atlas
  - swe-bench-pro
---

## 一句话

Scale AI 的专家人工评测伞形榜单

## 测什么

Scale AI 运营的前沿模型评估品牌，不是单一 benchmark 而是一把「伞」：由领域专家设计高复杂度评估、定义精细判分标准，覆盖编码、指令遵循、推理等方向，用私有数据集防过拟合、开源数据集保可比性。旗下子榜包括 Remote Labor Index（RLI）、SWE-bench Pro、MCP Atlas 等。其中 RLI 最有辨识度：把真实付费的远程自由职业项目（3D/CAD、建筑设计、软件开发等 240 个 Upwork 项目，对应超 6,000 小时、超 14 万美元的真实报酬）交给 AI agent 端到端交付。

## 怎么测

总机制是「人类专家 + LLM 规模化」：专家设计任务与评分标准，LLM 辅助扩大评审规模并对齐人类判断。各子榜独立计分；以 RLI 为例，agent 拿到真实项目需求（含附件、交付要求）后自主完成全部工作，交付物由专家按「客户会不会验收付款」的标准判定，报自动化率——即有多大比例的真实项目能被 AI 完整交付。

## 典型任务

RLI 里的题目就是真实发包过的活儿，不是玩具题：按客户需求做一个 3D 产品模型、写一份建筑设计方案、开发一个小型软件工具、制作教学课件——这些都是自由职业者实际收了钱完成的项目。agent 要自己理解需求文档、规划工序、产出全套交付文件，专家再对照原始验收标准判断「这活儿客户认不认」。

## 分数怎么看

RLI 在 2025-10 发布时的标志性数字是：头部 agent 只能端到端完成约 2.5% 的真实自由职业项目——把「AI 取代远程工作」的宏大叙事拉回了地面；2026 年 CAIS 的跟踪报告显示这一比例显著上升，最新数字以 remotelabor.ai 官方榜为准。看 SEAL 成绩务必先确认是哪个子榜，各子榜难度和含义完全不同。

## 含金量与局限

伞形品牌属性：「SEAL 排名」不指明子榜就没有意义，MCP Atlas、SWE-bench Pro 等有自己的条目。专家人工评审成本高、规模小、更新慢；Scale AI 本身是数据服务公司、与被评实验室存在商业关系（如 Meta 对其投资），立场问题社区有讨论；部分子榜数据私有，外部无法独立复核。

## 冷知识

RLI 的题是真金白银发包过的活儿：客户简报、输入文件、专业人士交付物一应俱全，裁判标准朴素到残酷——把 AI 的交付物和收钱干活的人类专家的放在一起盲评，客户愿意付钱才算过。
