import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'mmmu',
  name: 'MMMU',
  aliases: [
    'MMMU Pro',
    'MMMU Pro 多模态',
  ],
  category: 'multimodal',
  organizer: 'CMU、滑铁卢大学、俄亥俄州立等（Xiang Yue 等），NeurIPS 2024',
  url: 'https://mmmu-benchmark.github.io/',
  oneLiner: '大学 30 个学科的图文混合专家级考试',
  what: '约 1.15 万道来自大学考试、测验和教科书的多模态题目，覆盖艺术、商业、科学、医学、人文社科、工程六大学科、30 个科目、183 个细分方向。它测的不是日常看图说话，而是「看懂专业图表 + 调用学科知识 + 逐步推理」三者合一的专家级能力：图片类型多达 30 种，包括乐谱、化学结构式、医学影像、地图、表格等，很多题必须图文联合理解才有解。题目由 50 多名各专业大学生手工收集，并刻意避开答案直接可搜到的题源。设计上对标「专家级 AGI」——能在大学层面各科都过关，才算摸到专家门槛。',
  how: '以选择题为主、也有开放问答，按微平均准确率计分。评测用规则流水线从模型长回复中抽取答案再比对；选择题抽不出答案时按随机选一个兜底。数据分开发集（每科 5 题）、验证集约 900 题、测试集约 1.05 万题；测试集答案原本托管在 EvalAI 服务器防泄漏，2026-02 官方已公开测试集答案、支持本地评测。',
  examples: '论文错误分析里有真实案例：一道计算机科学题给出自动机状态图，模型能看到图里的双圈节点却不知道它在确定有限自动机里代表「接受状态」，卡在专业知识上；另一道文科题给出一幅把美国描绘成「救世主」的政治漫画，模型却抛开画面、只按文本里「帝国主义」的字面意思作答。这两类错误——看不懂专业图示、重文轻图——正是 MMMU 想暴露的问题。',
  reading: '发布时 GPT-4V 只有 55.7%、最强开源模型约 34%，人类专家约 88.6%；到如今头部模型已冲上 70% 以上，原版 MMMU 的区分度在下降。读分时注意同一模型在不同学科差距很大：乐谱、化学结构、几何图形类图片上模型普遍明显更弱。',
  caveat: '题目源自公开教材和网络资源，存在污染风险，作者也承认人工筛选难免有偏。为此官方 2024-09 推出 MMMU-Pro：剔除纯文本可答的题、选项扩到 10 个、并有把题干嵌进图片的 vision-only 模式，模型分数普遍掉 16.8–26.9 个百分点——引用分数时务必说清是 MMMU 还是 MMMU-Pro，两者不可混比。',
  facts: [
    { label: '题量', value: '11,550 道（测试集约 10.5K + 验证集约 900 + 每科 5 题开发集）' },
    { label: '覆盖面', value: '6 大学科、30 个科目、183 个细分方向' },
    { label: '图片类型', value: '30 种（图表、地图、乐谱、化学结构、医学影像等）' },
    { label: '出题方式', value: '50 多名各专业大学生手工收集，刻意避开答案随题可搜的题源' },
    { label: '计分', value: '微平均准确率，规则流水线抽答案比对' },
    { label: '加强版', value: 'MMMU-Pro（2024-09）：10 选项、剔除纯文本可答题、vision-only 模式' },
  ],
  frontier: {
    value: 86.0,
    note: '第三方聚合口径（BenchLM / CodeSOTA，2026-08）：Qwen3.6 Plus 以 86.0% 居首；pricepertoken 同期收录 Gemini 3.1 Pro Preview 83.8%（2026-08-11），各家收录口径不一。加强版 MMMU-Pro 榜首约 83.6（Gemini 3.5 Flash，llm-stats 2026-08-13，全部为自报成绩）。',
  },
  history: [
    { date: '2023-11-27', event: 'arXiv 论文上线（2311.16502），提出对标「专家级 AGI」的多学科多模态基准' },
    { date: '2023-12-04', event: '测试集评测服务器在 EvalAI 上线，答案保密防泄漏' },
    { date: '2024-01-31', event: '官方榜单加入人类专家表现作参照' },
    { date: '2024-09-05', event: '发布加强版 MMMU-Pro（arXiv:2409.02813），模型分数普降 16.8–26.9 个百分点' },
    { date: '2024-12', event: 'NeurIPS 2024 正式录用' },
    { date: '2026-02-12', event: '官方公开测试集答案，评测转本地进行' },
  ],
  funFact: '论文清洗数据时把约 10%「过于简单」的题直接淘汰；出题还要求避开答案随手可得的来源（答案在单独文档或教科书末尾的才收）。对 GPT-4V 的 150 个错题做尸检：35% 错在看图、29% 错在缺知识、26% 错在推理——「看错了」比「不会算」还多。',
  relatedIds: ['video-mmmu'],
  // 分数天梯：2026-08-14 核验。llm-stats 聚合 63 模型榜（2026-08），微平均准确率；
  // 各家收录口径不一（pricepertoken 同期 Gemini 3.1 Pro Preview 83.8%），头部已过 80%。
  ladder: [
    { model: 'Qwen3.6 Plus', score: '86.0%', note: 'llm-stats 榜第 1，2026-08' },
    { model: 'GPT-5.1', score: '85.4%', note: 'llm-stats 榜第 2（并列），2026-08' },
    { model: 'GPT-5.1 Instant', score: '85.4%', note: 'llm-stats 榜第 2（并列），2026-08' },
    { model: 'GPT-5', score: '84.2%', note: 'llm-stats 榜第 5，2026-08' },
    { model: 'Qwen3.5-122B-A10B', score: '83.9%', note: 'llm-stats 榜第 6，2026-08' },
    { model: 'Gemini 3.1 Pro Preview', score: '83.8%', note: 'pricepertoken 收录，2026-08-11' },
    { model: 'GPT-4V', score: '55.7%', note: '发布时最强（2023-12），历史参照' },
  ],
  traits: ['30 学科图文题', '11,550 道', '30 种图片类型', '微平均准确率', 'MMMU-Pro 加强版'],
  openSource: {
    status: 'open',
    url: 'https://huggingface.co/datasets/MMMU/MMMU',
    note: '数据集公开于 HuggingFace（MMMU/MMMU，2026-02 起测试集答案公开支持本地评测）；官方页 mmmu-benchmark.github.io',
  },
};
