import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'gdpval',
  name: 'GDPval',
  aliases: ['GDPval（44 职业）', 'GDPval-AA', 'GDPval-AA v2', 'GDPval-AA v2 Elo'],
  category: 'arena',
  organizer: 'OpenAI，2025-09 发布（arXiv:2510.04374）',
  url: 'https://openai.com/index/gdpval/',
  oneLiner: '让 AI 干 44 种职业的真活，专家盲评比人强还是差',
  what: 'OpenAI 提出的「真实经济价值」评测：学术考试离日常上班太远，干脆按 GDP 挑活——选对美国 GDP 贡献最大的 9 个行业，每个行业挑 5 个左右以知识工作为主、薪酬贡献大的职业，共 44 种（律师、注册护士、机械工程师、软件开发、会计师、药剂师、记者……）。每职业 30 个真实工作任务，共 1320 题，其中 220 题组成开源 gold 子集。任务由平均从业 14 年的资深专家撰写、平均经 5 轮审核；人类专家做一题平均要花约 7 小时。模型要交的不是一段话，而是真正的交付物：文档、PPT、图纸、电子表格甚至多媒体。',
  how: '模型拿到任务说明加参考文件（不只是文字提示），产出交付文件。评分靠同行业专家盲评：评分员不知道哪份是人做的、哪份是 AI 做的，两两对比判「优于 / 相当 / 逊于」，汇总成 win/tie 率。OpenAI 还训练了自动评分器并公开在 evals.openai.com，但官方自承可靠性不及人类专家，只作研究用途。衍生版 GDPval-AA 是 Artificial Analysis 用自己的沙箱流程复跑：模型在 E2B 沙箱里带工具做任务，三家前沿模型评审团盲评，拟合成锚定「人类专家 = 1000」的 Elo，v2 为当前版本。',
  examples: '官方示例题：你是汽车产线上的制造工程师，产品是一台地下采矿用的电缆卷盘车，终检环节要两人配合把电缆收放两遍——一人扶着卷盘转动，一人接线操作，又累又危险。经理要求你设计一个工装夹具，让一个人就能完成测试。附件给了卷盘尺寸等技术资料，你要用 3D 建模设计夹具，最终只交一份 PDF 概念设计汇报（附建模截图）。其他题形如撰写法律文书、画工程蓝图、制定护理计划、分析客户支持对话。',
  reading: '首批官方结果（2025-09，gold 220 题）：Claude Opus 4.1 表现最好，近半数任务的交付物被专家评为与人类相当或更好，尤其在排版、PPT 布局等美学维度；GPT-5 胜在领域知识准确性。官方还称前沿模型做这些任务约比专家快 100 倍、成本约 1%——但只算了模型推理时间和 API 费，没算人工监督与集成。',
  caveat: 'OpenAI 自己做的榜、自己的模型也在榜上，独立性天然打折；且为一次性单轮任务，不含真实工作里与客户来回沟通、按反馈迭代的部分，官方在论文中也承认这是初版的主要局限。任务全部基于美国职业语境。别名中的 GDPval-AA 是第三方复跑版，评分口径（Elo vs win/tie 率）与原版不同，两者分数不可直接换算。',
  facts: [
    { label: '发布', value: 'OpenAI，2025-09；论文 arXiv:2510.04374' },
    { label: '规模', value: '9 大行业 × 44 职业 × 30 题 = 1320 题，gold 开源子集 220 题' },
    { label: '任务作者', value: '平均从业 14 年的资深专家，每题平均经 5 轮审核' },
    { label: '人类基准', value: '行业专家做一题平均约 7 小时' },
    { label: '评分', value: '同行专家盲评 win/tie 率；自动评分器公开但官方自承不如专家' },
    { label: '衍生版', value: 'GDPval-AA：Artificial Analysis 复跑，Elo 锚定人类专家 = 1000' },
  ],
  frontier: {
    value: 84.9,
    note: 'GPT-5.5 的 win/tie 率约 84.9%（2026-05 codingfleet 对比文汇总口径）。发布时（2025-09）的最好成绩是 Claude Opus 4.1 的 47.6%，同期 GPT-5 为 38.8%——一年不到头部数字几乎翻倍，本榜正在快速变挤。',
  },
  // 分数天梯：GDPval-AA v2 Elo（2026-08-15 核验）。OpenAI 官方榜已停更（evals.openai.com 明示「不再活跃」），
  // 现行公开排名为 Artificial Analysis 复跑版 GDPval-AA（Elo 锚定人类专家≈1000，Stirrup 沙箱 + LLM 评审团），此处为 BenchLM 镜像快照。
  ladder: [
    { model: 'Claude Opus 5', score: '1862', note: '第三方复跑（Artificial Analysis GDPval-AA v2 Elo，BenchLM 镜像 2026-08-15；AA 官方快照同口径 1849 居首）' },
    { model: 'GLM-5.3', score: '1769', note: '同上（BenchLM 2026-08-15）' },
    { model: 'Grok 4.6', score: '1753', note: '同上' },
    { model: 'Claude Fable 5', score: '1747', note: '同上；2026-07 快照约 1756（systems-analysis.ru）' },
    { model: 'Qwen3.8 Max Preview', score: '1737', note: '同上' },
    { model: 'GPT-5.6 Sol', score: '1735', note: '同上' },
    { model: 'Kimi K3', score: '1682', note: '同上' },
    { model: 'Muse Spark 1.2', score: '1631', note: '同上' },
    { model: 'Claude Sonnet 5', score: '1603', note: '同上' },
    { model: 'Claude Opus 4.8', score: '1593', note: '同上' },
    { model: 'GPT-5.6 Terra', score: '1583', note: '同上' },
    { model: 'GPT-5.6 Luna', score: '1582', note: '同上' },
  ],
  history: [
    { date: '2025-09-25', event: 'OpenAI 发布 GDPval，同步开源 gold 220 题子集与公开评分服务' },
    { date: '2025-10', event: '论文 arXiv:2510.04374 公开完整方法与职业筛选流程' },
    { date: '2025 年底', event: 'Artificial Analysis 推出复跑版 GDPval-AA v1：自有沙箱 + LLM 评审 + Elo 口径' },
    { date: '2026 年初', event: 'GDPval-AA v2 上线：三模型评审团、Elo 锚定人类专家 1000、回合上限 250，并入 AA Intelligence Index v4.1.1' },
  ],
  funFact: '按官方披露的成长曲线，模型对人类专家的 win/tie 率从 GPT-4o（2024-05）的 12.4% 一路涨到 GPT-5.5 的约 84.9%，不到两年翻了将近 7 倍。OpenAI 还坦白做过一次「开卷实验」：对内部实验版 GPT-5 做增量训练专刷 GDPval，确认分数可以被定向优化。',
  relatedIds: ['aa-intelligence-index'],
  traits: [
    '44 种职业 × 9 大 GDP 行业，1320 个真实工作任务',
    '资深专家编写（平均从业 14 年），交付真实工作产物（文档/PPT/图纸/表格）',
    '同行专家盲评 win/tie 率；AA 版为 Elo 复跑',
    '一次性单轮任务，不含与客户来回沟通迭代',
    'gold 220 题开源子集 + 公开评分服务',
  ],
  openSource: {
    status: 'partial',
    url: 'https://huggingface.co/datasets/openai/gdpval',
    note: 'rubrics 与 gold 交付物开源在 HuggingFace（openai/gdpval），完整 1320 题的 gold 保留集不公开；OpenAI 官方榜已下线，第三方 GDPval-AA（Artificial Analysis）仍在公开复跑',
  },
};
