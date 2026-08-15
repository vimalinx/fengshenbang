import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'claw-eval',
  name: 'Claw-Eval',
  aliases: ['Claw-Eval 自主 Agent'],
  category: 'agent',
  organizer: '北京大学 × 香港大学（Ye et al.，arXiv:2604.06132，2026-04）',
  url: 'https://arxiv.org/abs/2604.06132',
  oneLiner: '不只看 AI 办没办成，还全程审计它怎么办的',
  what: '测自主 agent 的端到端可信度：300 个人工核验任务、9 大类分三组——General 服务编排（161 题，易/中/难三档）、多模态感知与生成（101 题：视频、文档图片、代码生成视觉产物）、多轮专业对话（38 题：STEM、社科、商业咨询）。核心理念是「轨迹可审计」：不只检查最终产物，还全程记录 agent 实际做了什么；同时把安全约束嵌进普通任务里，并用可控故障注入测鲁棒性。',
  how: '每次评测分 Setup/Execution/Judge 三个阶段严格隔离，通过三条独立证据通道取证：执行轨迹、服务端审计日志、环境快照。300 题拆解出 2,159 条细粒度 rubric（平均每题 7.2 条），客观条件用确定性规则查、开放标准用 LLM judge。总分 = 安全分（乘法门控，违规一票否决）×（完成度与鲁棒性加权）。每题跑 3 次，报 Average Score、Pass@3（至少过一次，能力上限）和 Pass^3（三次全过，可靠性下限）。',
  examples: 'General 难档是跨系统编排、财务合规、运维工单这类多服务协作；多模态组有视频内容定位、跨页图表推理、网页生成、SVG 动画、视频剪辑。最有特色的是多轮对话：模拟用户扮演「藏着意图」的咨询者（如法律、投资咨询），关键信息分最多 8 轮逐步透露，agent 必须主动追问才能答对——论文分析显示提问质量解释了 76% 的成绩差异，而对话轮数几乎无关（r=0.07），「会问问题」比「聊得久」重要得多。',
  reading: '论文实测 14 个前沿模型：Claude Opus 4.6 以总分 80.4、Pass^3 70.4% 居首，Sonnet 4.6 平均分最高（81.4）。多模态明显最难，Pass^3 最高的 GPT-5.4 也只有 25.7%。故障注入实验很有说服力：把工具失败率加到 0.6，各模型 Pass@3 几乎不降、Pass^3 最多跌 24 个百分点——「偶尔办成一次」和「稳定办成」是两回事，单看前者会高估 agent。',
  caveat: '开放标准的 rubric 依赖 LLM judge（论文报告与人工评分 95% 一致）；外部服务多为 mock，鲁棒性只覆盖基础设施层故障（HTTP 429/500、延迟尖峰），不含语义级对抗。名字容易撞车：勿与 ClawsBench、CLAWMARK、ClawArena 等相近名称混淆；另有动态更新的续作 Claw-Eval-Live，引用时注意是哪一版。',
  facts: [
    { label: '规模', value: '300 个人工核验任务，9 大类分 General / 多模态 / 多轮对话三组' },
    { label: '评分项', value: '2,159 条细粒度 rubric，平均每题 7.2 条' },
    { label: '三维评分', value: 'Completion + Robustness 加权，Safety 做乘法门控（违规一票否决）' },
    { label: '指标', value: 'Average Score / Pass@3（能力上限）/ Pass^3（可靠性下限），每题跑 3 次' },
    { label: '特色机制', value: '全轨迹三通道审计（执行轨迹、审计日志、环境快照）+ 可控故障注入' },
  ],
  frontier: {
    value: 70.4,
    note: 'Claude Opus 4.6 Overall Pass^3 70.4%（论文实测 14 模型，2026-04/05）；Sonnet 4.6 平均分最高 81.4；多模态组 Pass^3 最高仅 25.7%（GPT-5.4）。',
  },
  // 分数天梯：2026-08-15 核验。官方榜（claw-eval.github.io，25 模型）按 Pass^3 排序、平局比 Pass@3；
  // llm-stats 2026-08 按 Pass@3 折算的 0-1 分口径不同（Kimi K2.6 0.809 居首）。
  ladder: [
    { model: 'Claude Opus 4.6', score: '70.4%', note: '官方榜 2026-08（Pass^3；Pass@3 82.4%，Avg 80.4）' },
    { model: 'Claude Sonnet 4.6', score: '67.8%', note: '官方榜 2026-08（Pass^3；平均分 81.4 全场最高）' },
    { model: 'MiMo V2.5 Pro', score: '63.8%', note: '官方榜 2026-08（Pass^3；Pass@3 80.9% 胜 Muse Spark）' },
    { model: 'Muse Spark', score: '63.8%', note: '官方榜 2026-08（Pass^3；Pass@3 76.9%）' },
    { model: 'MiMo V2.5', score: '62.3%', note: '官方榜 2026-08（Pass^3）' },
    { model: 'Kimi K2.6', score: '62.3%', note: '官方榜 2026-08；llm-stats 按 Pass@3 口径（0.809）列居首' },
    { model: 'GLM 5.1', score: '62.3%', note: '官方榜 2026-08（Pass^3；Pass@3 80.4%）' },
    { model: 'GPT 5.4', score: '60.3%', note: '官方榜 2026-08（Pass^3；Avg 78.4）' },
    { model: 'DeepSeek V4 Pro', score: '59.8%', note: '官方榜 2026-08（Pass^3；Pass@3 82.9%）' },
    { model: 'SenseNova 6.7 Flash-Lite', score: '58.8%', note: '官方榜 2026-08（Pass^3）' },
    { model: 'Qwen 3.6 Plus', score: '58.8%', note: '官方榜 2026-08（Pass^3）' },
    { model: 'Gemini 3.1 Pro', score: '57.8%', note: '官方榜 2026-08（Pass^3；Pass@3 82.9%）' },
  ],
  history: [
    { date: '2026-04-07', event: 'arXiv v1 发布（2604.06132），北大 × 港大，benchmark 与评测框架全开源（claw-eval.github.io）' },
    { date: '2026-05-07', event: 'v3 修订：14 模型完整结果、混合裁判对照实验、故障注入分析' },
    { date: '2026', event: '推出动态更新的续作 Claw-Eval-Live，缓解固定题集的过拟合问题' },
  ],
  funFact: '论文做了个「打脸」实验：把完整对话记录和判分源码都给一个普通 LLM 裁判，它仍漏掉 44% 的安全违规和 13% 的鲁棒性问题——因为违规藏在服务端审计日志里，只看对话根本发现不了。',
  relatedIds: ['clawbench'],
  traits: ['轨迹三通道审计', '安全分乘法门控', '可控故障注入', '多轮藏意图对话', '300 题人工核验'],
  openSource: {
    status: 'open',
    url: 'https://github.com/claw-eval/claw-eval',
    note: '300 题、2,159 条 rubric 与评测框架全开源（claw-eval.github.io / GitHub claw-eval/claw-eval），社区可自跑复现；开放标准 rubric 用 LLM judge（与人工评分 95% 一致）',
  },
};
