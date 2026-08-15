import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'video-mmmu',
  name: 'Video-MMMU',
  aliases: [],
  category: 'multimodal',
  organizer: '南洋理工 S-Lab × CMU（Kairui Hu 等，MMMU 团队同源），arXiv:2501.13826（2025-01）',
  url: 'https://videommmu.github.io/',
  oneLiner: '让 AI 看专业课视频，考完知识还能不能会用',
  what: '把视频当「教材」而不是「素材」：300 段专家级课程/讲座视频（平均约 506 秒）、900 道人工标注题，覆盖艺术、商业、科学、医学、人文、工程 6 学科 30 个科目。它按人类学习的三个认知阶段出题：感知（能否从视频里认出关键信息）、理解（能否解释背后的概念）、迁移（能否把视频教的知识用到没见过的新问题上）。独有的 Δknowledge 指标直接量化「看完视频后做题正确率涨了多少」，即知识获取能力。',
  how: '每段视频配 3 道与认知阶段对齐的问答题，按准确率计分。Δknowledge 的玩法是先不让模型看视频直接做题，再看视频后做题，两次准确率之差就是知识增益。迁移阶段的题刻意用视频里没出现过的新场景，防止靠记忆蒙对。',
  examples: '工程学科的迁移题：视频讲解带时间戳的深度优先搜索（DFS）示例，题目却把图换成带环的更复杂结构，要求判断哪些是合法的 DFS 森林——必须真学会算法而不是背住例子。医学学科的迁移题：看完一段骨盆病理讲座后，给一张视频中没出现过的全新骨盆 X 光片让模型诊断异常，正确答案是「耻骨联合切除」，考的是把病理概念用到新影像上。',
  reading: '论文公布的人类基线很有冲击力：人看完视频后 Δknowledge 提升 33.1 个百分点，而当时最好的模型提升幅度明显更小，且认知阶段越高（感知→理解→迁移）分数掉得越陡。这个榜的意义不在总分高低，而在揭示「AI 从视频里学知识」这条链路还很弱。',
  caveat: '规模较小（300 视频/900 题），统计噪声比大榜大；视频同样来自公开渠道，存在污染可能。注意与 Video-MME 是两套完全不同的基准：Video-MME 考通用视频内容理解，Video-MMMU 考专业知识获取与迁移，名字相近但分数毫无可比性。',
  facts: [
    { label: '规模', value: '300 段专家级课程/讲座视频、900 道人工标注题（每视频 3 题）' },
    { label: '覆盖', value: '6 学科、30 个科目；视频平均约 506 秒' },
    { label: '三阶段', value: '感知（认出关键信息）→ 理解（解释概念）→ 迁移（用到新问题）' },
    { label: '特色指标', value: 'Δknowledge：看视频前后做题准确率之差，直接量化「学到多少」' },
    { label: '出题团队', value: '南洋理工 S-Lab × CMU，与 MMMU 团队同源（Xiang Yue 参与）' },
  ],
  frontier: {
    value: null,
    note: '无统一锚定值：官方榜单 2025 年快照（斯坦福 AI Index 2026 转引）最高为 Keye-VL-1.5-8B 的 66%，人类基线 74.4%；而第三方聚合（BenchmarkList，2026-05）显示 2026 年头部模型已逼近 86% 但前五只差 3 个百分点。新旧口径差距过大，暂不锚定单一数字。',
  },
  history: [
    { date: '2025-01-23', event: 'arXiv 论文上线（2501.13826），提出三认知阶段 + Δknowledge 指标' },
    { date: '2025-03', event: '官方榜单更新，收录 Kimi-k1.6-preview 等当时新模型' },
    { date: '2026', event: '被斯坦福《AI Index Report 2026》作为视频知识获取能力的代表基准收录引用' },
  ],
  funFact: 'AI Index 2026 转引的官方数据里有个尴尬纪录：约三分之一的受测模型 Δknowledge 为负——看了教学视频后做题反而更差，等于「上课上到走神」。该项表现最好的 GPT-4o 也只有 +15.6 个百分点，不到人类专家 +33.1 的一半。',
  relatedIds: ['mmmu', 'video-mme'],
  // 分数天梯：2026-08-14 核验。BenchLM 镜像 2026-08 榜；官方 2025 快照口径
  // （斯坦福 AI Index 2026 转引）最高仅 Keye-VL-1.5-8B 66%，新旧口径差异大。
  ladder: [
    { model: 'Qwen3.8 Max', score: '88.7%', note: 'BenchLM 镜像，2026-08' },
    { model: 'Gemini 3 Pro', score: '87.6%', note: 'BenchLM 镜像，2026-08' },
    { model: 'Kimi K2.5', score: '86.6%', note: 'BenchLM 镜像，2026-08' },
    { model: 'Keye-VL-1.5-8B', score: '66%', note: '官方榜 2025 快照（AI Index 2026 转引），历史参照' },
  ],
  traits: ['课程视频当教材', '三认知阶段', 'Δknowledge 指标', '迁移题新场景', '6 学科 30 科目'],
  openSource: {
    status: 'open',
    url: 'https://videommmu.github.io/',
    note: '数据集与评测代码公开（GitHub hu-kairui/Video-MMMU，官方页 videommmu.github.io）',
  },
};
