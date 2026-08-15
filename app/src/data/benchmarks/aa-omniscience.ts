import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'aa-omniscience',
  name: 'AA-Omniscience',
  aliases: ['AA-omniscience', 'AA-Omniscience 幻觉率/知识', 'AA Omniscience 非幻觉率'],
  category: 'reasoning',
  organizer: 'Artificial Analysis，2025-11 发布，arXiv:2511.13029',
  url: 'https://artificialanalysis.ai/evaluations/omniscience',
  oneLiner: '6000 道事实题：答对加分、答错扣分、拒答不扣，专治不懂装懂',
  what:
    'AA-Omniscience 是第三方评测机构 Artificial Analysis 做的「知识可靠性」基准，核心思想是：光有知识不够，还得知道自己不知道。全库 6,000 道事实性问题，覆盖 6 个经济价值高的领域（商业、人文社科、健康、法律、软件工程、科学与工程数学）下的 42 个主题——这些领域合计占 2024 年美国工资总额的 44%。题目由专门的出题 agent 从权威一手资料（官方文档、公认教材等）生成，再按相似度、难度、歧义度过滤，保证答案有据可查且对前沿模型足够难。',
  how:
    '模型逐题作答，可以选择回答也可以拒答。核心指标 Omniscience Index 范围 −100 到 +100：答对加分、答错扣分、拒答（说「我不知道」）不扣分，0 分意味着答对和答错一样多——乱猜在这套规则下是净亏的。除指数外还公布 Accuracy（答对率）、Hallucination Rate（错误作答的比例）等子指标。这样设计是因为现有考试大多奖励猜测，训练出了「自信地胡说」的模型，而真实业务场景里一个自信的错误答案远比「我不知道」危险。',
  examples:
    '一道典型题目是短而硬的事实问答，比如健康领域会问「成年男性有几条动脉越过骨盆上口进入小骨盆？」这类教科书上有唯一答案、但极易记混的问题。模型面前有三条路：答对（加分）、凭印象硬答一个错的（扣分，拉低 Omniscience Index）、老实拒答（不扣分）。于是这个榜上经常出现戏剧性结果：一个准确率中等但懂得闭嘴的模型，指数可以高过一个准确率更高但满口胡猜的模型。',
  reading:
    '发布时的结果相当难看：最高的 Claude 4.1 Opus 也只有 4.8 分，全场仅 3 个模型在 0 分以上——也就是说绝大多数前沿模型在这套「答错要罚」的规则下，答错比答对还多。指数越接近 +100 越好，负分就是「知识可靠性不合格」。这个指标已被纳入 Artificial Analysis 的 Intelligence Index v4.1 综合指数，是少数专门衡量「拒答校准」的主流分数。',
  caveat:
    '题目由出题 agent 自动生成、人工只做审核，题目质量依赖流水线而非逐题手工打磨。题库有公开版本（AA-Omniscience-Public），存在被纳入训练数据的污染风险。拒答判定的松紧、以及「答错扣多少、答对加多少」的权重设计本身带有主办方的主观选择，换一套奖惩规则排名可能不同。',
  facts: [
    { label: '题量', value: '6,000 题、6 领域 42 主题' },
    { label: '选题依据', value: '覆盖领域合计占 2024 年美国工资总额 44%' },
    { label: '出题', value: '出题 agent 从权威一手来源生成并按难度/歧义过滤' },
    { label: '核心指标', value: 'Omniscience Index（−100 ~ +100），另报 Accuracy 与 Hallucination Rate' },
    { label: '地位', value: 'AA Intelligence Index v4.1 组成指标' },
  ],
  frontier: {
    value: 40,
    note: 'Artificial Analysis 口径 Claude Fable 5 指数 40（2026-08，第三方转述）；发布时（2025-11）最高 Claude 4.1 Opus 仅 4.8，全场仅 3 个模型大于 0。',
  },
  history: [
    { date: '2025-11-17', event: 'arXiv:2511.13029 发布：6,000 题、6 领域 42 主题' },
    { date: '2025-11', event: '发布时最高 Claude 4.1 Opus 仅 4.8 分，全场仅 3 个模型在 0 分以上' },
    { date: '2026', event: '纳入 AA Intelligence Index v4.1 组成指标' },
    { date: '2026-08', event: 'Claude Fable 5 指数升至 40（AA 口径，第三方转述）' },
  ],
  funFact:
    '这个榜的「及格线」是 0 分——代表答对和答错一样多。发布时受测的前沿模型里只有 3 个在 0 分以上，其余全是负分，等于整个行业被盖上「普遍不懂装懂」的戳。',
  // 分数天梯：2026-08-14 核验。AA 官方页（artificialanalysis.ai/evaluations/omniscience），
  // Omniscience Index（-100~+100），独立评测口径。
  ladder: [
    { model: 'Claude Fable 5', score: '43.3', note: 'Omniscience Index，BenchLM 镜像 2026-08-13（AA 口径 40）' },
    { model: 'Claude Opus 5', score: '37.1', note: 'Omniscience Index，BenchLM 镜像 2026-08-13' },
    { model: 'Gemini 3.1 Pro', score: '31.9', note: 'Omniscience Index，BenchLM 镜像 2026-08-13' },
    { model: 'Grok 4.6', score: '30.5', note: 'Omniscience Index，BenchLM 镜像 2026-08-13' },
    { model: 'Claude Opus 4.8', score: '28.8', note: 'Omniscience Index，BenchLM 镜像 2026-08-13' },
    { model: 'Meta Muse Spark 1.1', score: '28.1', note: 'Omniscience Index，BenchLM 镜像 2026-08-13' },
    { model: 'Claude Opus 4.7 (Adaptive)', score: '27.3', note: 'Omniscience Index，BenchLM 镜像 2026-08-13' },
    { model: 'Claude 4.1 Opus', score: '4.8', note: '发布时最高（2025-11），全场仅 3 个模型 >0' },
  ],
  traits: ['6000 题 6 领域', '答错扣分', '拒答不扣分', '专门衡量幻觉', 'AA 独立评测'],
  openSource: {
    status: 'partial',
    url: 'https://artificialanalysis.ai/evaluations/omniscience',
    note: '公开版题库（AA-Omniscience-Public）可访问，完整评测集与判分细节由 Artificial Analysis 运营；论文 arXiv:2511.13029',
  },
  relatedIds: ['aa-intelligence-index'],
};
