import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'mmlu',
  name: 'MMLU',
  aliases: ['MMLU（8 语言）', 'MMLU（llm-stats.com）'],
  category: 'reasoning',
  organizer: 'UC Berkeley（Dan Hendrycks 等），arXiv:2009.03300，ICLR 2021',
  url: 'https://huggingface.co/datasets/cais/mmlu',
  oneLiner: '57 门学科四选一综合大考，曾经的「大模型第一榜」',
  what:
    'MMLU（Massive Multitask Language Understanding）是 2020 年提出的综合知识考试，共 15,908 道四选一题，覆盖 57 个学科，从初等数学、美国历史到职业法律、职业医学，难度跨度从初中一直到专业资格水平。它的设计理念是「像考人一样考模型」：只在 zero-shot / few-shot 设置下测，不允许针对题库微调，借此衡量模型在预训练里到底吸收了多少世界知识和解题能力。2021~2023 年间它是事实上的大模型综合第一榜，GPT-4 的 86.4% 就出自这个榜。',
  how:
    '标准玩法是 5-shot：提示词里先给同一学科的 5 道带答案样题，再问目标题，模型输出 A/B/C/D，取概率最大的选项，按全题库算加权准确率。数据集本身切成每学科 5 题的 few-shot 开发集、1,540 题验证集和 14,079 题测试集。发布时最强的 GPT-3（175B）只拿到 43.9%，小模型基本在 25% 的随机水平线上趴着——这个起点和今天 90% 的水平对比，正好标出这几年大模型进步的幅度。',
  examples:
    '论文里的一道「职业法律」题讲了个刁钻案例：推销员无视「谢绝推销，擅入必究」的告示牌开车进院，结果被屋主埋在车道下的炸药炸伤，问推销员能否索赔，四个选项分别给出不同的法律理由——这考的是把侵权法规则套进复杂情境。另一道「概念物理」题很经典：静止释放的球加速度是 9.8 m/s²，那用力向下抛出去的球脱手瞬间加速度是多少？答 9.8 m/s² 才对，很多人会直觉选「更大」。职业医学题则直接取自美国医师执照考试风格的病例分析。',
  reading:
    '今天的前沿模型普遍在 88%~90% 以上，榜首挤成一团，分差已经失去区分度——这正是它「饱和」的含义。论文当年估算人类专家水平约 89.8%，可以说模型在这条线上已经和专家齐平。它现在更适合作为「基础及格线」看：新模型连 MMLU 都上不去才是真问题，刷到 90% 则说明不了太多。',
  caveat:
    '三大硬伤：一是饱和，前沿分数挤在 88~90%+ 拉不开差距；二是题库流传多年、污染风险高（测试题已出现在 Common Crawl 里）；三是数据本身有噪声，后续研究（MMLU-Pro 团队）发现原题库里有相当比例的错标和不可答题。业界已基本用 MMLU-Pro、GPQA、HLE 等接棒，看到模型宣传只报 MMLU 时要有数：这更像是历史惯例，而不是能力证明。',
  facts: [
    { label: '题量', value: '15,908 题（测试集 14,079）' },
    { label: '学科', value: '57 个，初中到专业资格水平' },
    { label: '题型/计分', value: '四选一，5-shot 准确率' },
    { label: '历史地位', value: '2021~2023 年事实上的综合第一榜' },
    { label: '人类参照', value: '论文估算专家水平约 89.8%' },
  ],
  frontier: {
    value: 93,
    note: '2026 年前沿模型普遍 92~94%（benchmarkingagents.com 方法页汇总），已饱和，主流评测方建议仅作历史参考。',
  },
  history: [
    { date: '2020-09', event: 'arXiv:2009.03300 挂出' },
    { date: '2021-01', event: 'ICLR 2021 正式发表；当时最强 GPT-3（175B）仅 43.9%' },
    { date: '2023-03', event: 'GPT-4 达 86.4%，此后分数进入平台期' },
    { date: '2024-06', event: 'MMLU-Pro 发布，定位即为接棒 MMLU' },
    { date: '2026', event: '前沿普遍 92~94%，被标记为「饱和 + 污染，仅作历史参考」' },
  ],
  funFact:
    '57 个学科不是随手定的——论文里明说这是在致敬 Atari 的 57 款游戏。发布当年 130 亿参数以下的模型全部趴在 25% 随机线上，只有 175B 的 GPT-3 冒出头来；五年后同一张卷子人人 90 分。',
  relatedIds: ['mmlu-pro', 'hle', 'gpqa-diamond'],
  // 分数天梯：2026-08-14 核验。MMLU 已饱和，权威聚合站收录稀疏且陈旧
  // （BenchLM 仅 8 模型、榜首仍为 2024 年的 o1 91.8%）；以下为厂商/聚合站自报口径，仅作历史参考。
  ladder: [
    { model: 'Claude Opus 5', score: '92.5%', note: '厂商自报（benchmarklist 收录，2026-07）' },
    { model: 'Claude Opus 5', score: '92.1%', note: '厂商自报 MILU 口径（benchmarklist 收录，2026-07）' },
    { model: 'o1', score: '91.8%', note: 'BenchLM 公开快照榜首（2024 年模型，2026-08 快照）' },
    { model: 'GPT-4.1', score: '90.2%', note: 'BenchLM 公开快照，2026-08' },
    { model: 'DeepSeek V4 Pro Base', score: '90.1%', note: 'BenchLM 公开快照，2026-08' },
    { model: 'GPT-4', score: '86.4%', note: '历史里程碑（2023-03），此后进入平台期' },
  ],
  traits: ['57 学科四选一', '15,908 题', '5-shot 准确率', '已饱和', '污染风险高'],
  openSource: {
    status: 'open',
    url: 'https://huggingface.co/datasets/cais/mmlu',
    note: '数据集公开于 HuggingFace（cais/mmlu），评测代码公开（GitHub hendrycks/test）',
  },
};
