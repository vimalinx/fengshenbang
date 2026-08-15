import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'supergpqa',
  name: 'SuperGPQA',
  aliases: [],
  category: 'reasoning',
  organizer: '字节豆包团队 × M-A-P（2077.AI），arXiv:2502.14739（2025-02）',
  url: 'https://supergpqa.github.io/',
  oneLiner: '285 个研究生学科、2.6 万题的广度大考',
  what: 'SuperGPQA 把 GPQA「博士级难题」的思路从理化生三科扩展到 285 个研究生二级学科：13 大学科门类、72 个一级学科、26,529 道题，每个学科至少 50 题。它专门覆盖农学、军事学、教育学这类传统 benchmark 几乎不碰的长尾学科（约 77% 仍是 STEM，其中工程学 7892 题、理学 9838 题），约 42% 的题需要计算。出题采用「人机协作过滤」：80 多位专家标注员结合多轮 LLM 答题反馈，反复剔除太简单或有歧义的题，只留下能卡住模型的。',
  how: '每题是最多 10 个选项（A–J，平均 9.67 个）的单选题，模型选出唯一正确项，按准确率计分。官方评测支持 zero-shot 和 five-shot 两种模式，并提供按学科门类、按难度（易/中/难）拆分的细分准确率，方便看模型的短板到底在哪个领域。报分时最常见的是 overall 准确率。',
  examples: '题目形式很统一：题干平均约 58 个 token、选项平均约 13 个 token，比如一道军事学或农学题给出一段专业情境，随后列出 A 到 J 十个候选，模型必须从中挑出唯一正确项；理工类则有相当比例要先推导计算、再从十个数值选项里挑答案。题目主体是新写的，但官方 README 注明有一小部分由既有数据集改造而来（包括 MMLU-Pro、MedQA、LawBench、AIME-AOPS 等），使用时需遵守原数据集协议。',
  reading: '发布时（2025 年 2 月）最强推理模型 DeepSeek-R1 也只有 61.82%，o1 为 60.24%，普通对话模型普遍在 40–55%——60% 上下曾是前沿水平线。官方榜单持续更新，新一代模型已到 70% 以上（如 Gemini 3 Pro 约 73.8%）。分数低不代表模型差，而是长尾学科知识本来就难。',
  caveat: '体量大但摊到单学科题量小，细分学科层面的分数噪声大；部分题目源自公开数据集改造，存在污染可能；十个选项把蒙对率压到约 10%，但选择题终究测不了完整推导；作为 GPQA 的「广度互补版」，它测知识覆盖多于测深度推理。',
  facts: [
    { label: '题量', value: '26,529 题，覆盖 13 门类 / 72 领域 / 285 个研究生二级学科' },
    { label: '题型', value: '最多 10 个选项（A–J，平均 9.67 个）的单选题' },
    { label: '构造方式', value: '80+ 专家标注员结合多轮 LLM 答题反馈的人机协作过滤' },
    { label: '难度结构', value: '约 42% 题目需要计算；约 77% 属 STEM（工程学 7892 题、理学 9838 题）' },
    { label: '覆盖保证', value: '每个二级学科至少 50 题' },
  ],
  frontier: {
    value: 73.8,
    note: '官方榜单（supergpqa.github.io，2026 年快照）：Gemini 3 Pro Preview 73.75% 居首，GPT-5.2-Pro 67.13%、GPT-5.1-Thinking 66.35%；发布时（2025-02）榜首 DeepSeek-R1 仅 61.82%。',
  },
  history: [
    { date: '2025-02', event: 'arXiv:2502.14739 发布，官方榜单 DeepSeek-R1 61.82% 居首，普通对话模型普遍 40–55%' },
    { date: '2025-09', event: '被 NeurIPS 2025 接收（Datasets & Benchmarks 方向 poster）' },
    { date: '2025-11', event: 'Gemini 3 Pro Preview 上线官方榜单，以 73.75% 把榜首大幅推高' },
  ],
  funFact: '榜单的学科细分里能看到不少「偏科现场」：有模型在农学、军事学等长尾学科直接 0 分出局。另外，十个选项的设计把瞎蒙命中率压到约 10%——比四选一的 25% 难混得多。',
  relatedIds: ['gpqa-diamond', 'mmlu-pro', 'mmlu'],
  // 分数天梯：2026-08-14 核验。官方榜（supergpqa.github.io，2026 快照）与 llm-stats（2026-08）、
  // BenchLM（2026-08-15）交叉对照；口径不一（官方 zero-shot 与第三方聚合有出入）的行在 note 注明。
  ladder: [
    { model: 'Gemini 3 Pro Preview', score: '73.75%', note: '官方榜 2026 快照，zero-shot' },
    { model: 'Qwen3.7 Max', score: '73.6%', note: 'llm-stats 聚合 2026-08 居首；BenchLM 同录 73.6%' },
    { model: 'Qwen3.6 Max (preview)', score: '73.9%', note: 'BenchLM，2026-08-15（与官方榜口径有出入）' },
    { model: 'Claude Opus 4.6', score: '95%', note: 'BenchLM，2026-08-15；与官方榜 73.75% 口径差异大，疑为带检索/不同子集，谨慎引用' },
    { model: 'GPT-5.2-Pro', score: '67.13%', note: '官方榜 2026 快照，zero-shot' },
    { model: 'GPT-5.1-Thinking', score: '66.35%', note: '官方榜 2026 快照，zero-shot' },
    { model: 'Qwen3.6 Plus', score: '71.6%', note: 'llm-stats 聚合 2026-08；BenchLM 同录 71.6%' },
    { model: 'Seed 2.1 Pro', score: '70.8%', note: 'llm-stats 聚合，2026-08' },
    { model: 'DeepSeek-R1', score: '61.82%', note: '官方榜，2025-02 发布时居首（历史参照）' },
  ],
  traits: ['285 研究生学科', '2.6 万题单选题', '最多 10 选项', '人机协作过滤', '学科细分报告'],
  openSource: {
    status: 'open',
    url: 'https://huggingface.co/datasets/m-a-p/SuperGPQA',
    note: '数据集在 HuggingFace（m-a-p/SuperGPQA）公开，评测代码在 GitHub（SuperGPQA/SuperGPQA）公开；部分题目源自 MMLU-Pro、MedQA 等既有数据集，需遵守原协议',
  },
};
