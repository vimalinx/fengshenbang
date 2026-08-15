import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'frontier-science',
  name: 'FrontierScience',
  aliases: ['FrontierScience-Olympiad'],
  category: 'reasoning',
  organizer: 'OpenAI，2026-01 发布，arXiv:2601.21165',
  url: 'https://arxiv.org/abs/2601.21165',
  oneLiner: 'OpenAI 出的物化生奥赛题 + 博士级科研子任务双轨榜',
  what:
    'FrontierScience 是 OpenAI 为填补「科学推理天花板」做的基准：GPQA 这类选择题和已发表知识快被刷穿，它就改用原创难题。全库 700 多题（其中 160 题开源为 gold set），横跨物理、化学、生物的子领域，从量子电动力学到合成有机化学。分两条轨道：Olympiad 轨道是国际奥赛（IPhO/IChO/IBO）级别的短答案题，由 42 名前国际奥赛奖牌得主和国家队教练原创编写；Research 轨道是博士级的开放性研究子问题，由在读博士、博士后和教授撰写并验证，模拟真实科研里的具体环节。',
  how:
    'Olympiad 轨道判分干脆：答案是数值或短表达式，精确匹配对错分明。Research 轨道判不了唯一答案，OpenAI 引入细粒度 rubric：把解一道研究子问题的过程拆成多个评分点，按 10 分制给过程打分，拿到 7 分以上记为「解决」。这样的好处是能看到模型「做到了哪一步」，而不是只盯最终答案。两条轨道都刻意保证题目原创、未公开发表，以对抗训练数据污染。',
  examples:
    'Olympiad 轨道的题长得像国际物理/化学/生物奥赛大题：给出具体装置或反应体系，要求推出一个确定的数值或表达式答案，难度对齐 IPhO/IChO/IBO 决赛水平。Research 轨道更像从真实课题里切出来的一个子任务，比如为某个研究目标设计实验方案、推导一个中间结论，评分 rubric 会逐项检查「是否建立了正确的模型、是否考虑了关键约束、结论是否成立」，而不只看最后那句话。',
  reading:
    '按 OpenAI 首发数据，GPT-5.2 在 Olympiad 轨道拿到 77%，说明奥赛级「有标准答案」的难题已被大幅攻克；但 Research 轨道只有 25%，开放性科研推理仍是明显短板——这个落差本身就是榜单想传递的信息。读分时务必分清是哪条轨道，两者难度和判分方式完全不同。',
  caveat:
    '这是 OpenAI 的自家基准，首发分数均为自报，缺乏独立复现。开源的只有 160 题 gold set，其余题目外部研究者无法直接验证。Research 轨道依赖 rubric 判分，判分模型的松紧会直接影响分数。作为 2026 年初的新榜，跨实验室的对比数据还在积累中。',
  facts: [
    { label: '主办方', value: 'OpenAI（2026-01 发布）' },
    { label: '题量', value: '700+ 题，160 题开源 gold set' },
    { label: '双轨', value: 'Olympiad（奥赛短答案）+ Research（科研子问题）' },
    { label: '命题阵容', value: '42 名国际奥赛奖牌得主/教练 + 博士级科研人员' },
    { label: '计分', value: 'Olympiad 精确匹配；Research 10 分制 rubric，≥7 记解决' },
  ],
  frontier: {
    value: 77,
    note: 'OpenAI 首发自报（2026-01）：GPT-5.2 Olympiad 轨道 77%、Research 轨道仅 25%；尚无独立复现。',
  },
  history: [
    { date: '2026-01', event: 'OpenAI 发布 FrontierScience：双轨 700+ 题，160 题 gold set 开源' },
    { date: '2026-01-29', event: '论文 v1 挂 arXiv（2601.21165）' },
    { date: '2026-01', event: '首发自报：GPT-5.2 Olympiad 77%、Research 25%，「会考试 ≠ 会做研究」的落差被量化' },
  ],
  funFact:
    'Olympiad 轨道的命题阵容是支「奥赛梦之队」：42 名命题人全部是前国际奥赛奖牌得主或国家队教练。而 GPT-5.2 在他们出的奥赛题上拿 77%，在博士级科研子任务上只有 25%。',
  // 分数天梯：2026-08-14 核验。OpenAI 自家基准、仅首发自报，无独立复现与持续榜单；
  // 双轨道口径不同（Olympiad 精确匹配 / Research rubric≥7），不可直接比较。
  ladder: [
    { model: 'GPT-5.2（Olympiad 轨道）', score: '77%', note: 'OpenAI 首发自报，2026-01' },
    { model: 'GPT-5.2（Research 轨道）', score: '25%', note: 'OpenAI 首发自报，2026-01（rubric≥7 记解决）' },
  ],
  traits: ['奥赛级短答案题', '博士级科研子问题', '42 名奥赛奖牌得主命题', 'rubric 分步判分', '原创题防污染'],
  openSource: {
    status: 'partial',
    url: 'https://huggingface.co/datasets/openai/frontierscience',
    note: '开源 160 题 gold set（HuggingFace openai/frontierscience）；其余 500+ 题未公开，判分 rubric 细节有限公开',
  },
  relatedIds: ['gpqa-diamond', 'hle'],
};
