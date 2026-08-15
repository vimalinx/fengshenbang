import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'hle',
  name: "HLE（Humanity's Last Exam）",
  aliases: ['HLE-text', 'HLE（无工具/Heavy 带工具）'],
  category: 'reasoning',
  organizer: 'Center for AI Safety（CAIS）× Scale AI，2025-01 发布',
  url: 'https://agi.safe.ai',
  oneLiner: '近千名专家出的「人类最后一场考试」，专挑模型答不出的题',
  what:
    'HLE 的定位很明确：MMLU 这类老牌综合考试被刷到 90%+ 之后，学术界需要一张天花板更高的卷子。它由 CAIS 和 Scale AI 组织，全球近千名来自 500 多家机构、50 个国家的专家出题，覆盖 100 多个学科，从数学、物理、化学到历史、哲学、古典文献。每道题都要求答案明确、可机器判分，且不能靠搜索引擎直接查到。题目总数 3000，其中 2500 道公开、500 道留作私有集防止刷题过拟合。',
  how:
    '出题流程本身就是一道防线：专家投稿的题先拿当时最强的几个模型试答，模型能答对的题直接拒收，再过两轮研究生级别评审和专家终审才入库。题型两种——多选题（约 24%，选项五个起步）和精确匹配简答题（约 76%，答案必须和标答严格一致），约 14% 的题带图片需要图文结合。判分全自动，报准确率；官方还会顺带测模型的「校准度」——即它说自己有把握时到底有几成是对的。',
  examples:
    '公开样题里有一道组合数学题：「G₂ 型正整数 Coxeter-Conway frieze 一共有多少个？」答案是 9——这是要靠专门数学知识推导的数，不是背诵能覆盖的。另一道来自化学家的有机化学题给出具体反应物，要求用「[m]-con / [m]-dis」的专业记号回答电环化反应的电子数和旋转方式、用「[m+n]」记号回答环加成方式，格式不对也算错。这类题的共同点是：外行连题目在问什么都看不懂，但答案本身短到可以机器核对。',
  reading:
    '2025 年初发布时，所有前沿模型准确率都在 10% 以下，且普遍「不懂装懂」（RMS 校准误差超过 80%）。之后分数涨得很快，按核验记录到 2026-02 最高约 Gemini 3 Pro 的 38.3%。读分时要注意口径：纯文本子集（HLE-text）、允许联网/带工具的跑法分数会明显更高，不同榜单未必同口径。',
  caveat:
    '「最后一场考试」的名字带宣传色彩，实际它只覆盖封闭式学术问答，不考开放性研究能力。约四分之一的题是多选，存在猜对空间。公开集放出后污染风险上升，这也是官方保留 500 题私有集的原因；各机构报分是否带工具、是否只用文本子集，口径差异很大，横向比较前要看清设置。',
  facts: [
    { label: '题量', value: '3,000 题（公开 2,500 + 私有 500）' },
    { label: '供题', value: '50 国、500+ 机构、近千名专家' },
    { label: '题型', value: '约 76% 精确匹配简答、24% 多选；约 14% 带图' },
    { label: '计分', value: '自动判分准确率，另测「校准度」' },
    { label: '难度防线', value: '投稿题先考最强模型，答对即拒收' },
  ],
  frontier: {
    value: 38.3,
    note: '无工具官方口径最高 Gemini 3 Pro 38.3%（2026-02 核验记录）。第三方汇总（BenchLM，2026-08）带工具口径最高 Claude Opus 5 64.7%、无工具 Claude Mythos 5 59%，以自报为主。',
  },
  history: [
    { date: '2025-01', event: 'CAIS × Scale AI 发布（arXiv:2501.14249），3,000 题；发布时前沿模型全部低于 10%' },
    { date: '2025-01 起', event: '官方设 50 万美元奖金池，持续向全球专家征集难题' },
    { date: '2026-01', event: '论文正式发表于《Nature》' },
    { date: '2026-02', event: '无工具口径最高纪录刷新至 Gemini 3 Pro 38.3%' },
    { date: '2026-08', event: '第三方汇总带工具口径最高约 64.7%（Claude Opus 5），无工具约 59%（Claude Mythos 5）' },
  ],
  funFact:
    'HLE 的出题流程像一场军备竞赛：每道投稿题先拿去考当时最强的几个模型，模型答对就直接拒收。为了征集到足够难的题，官方还掏了 50 万美元奖金池向全球专家「买难题」。',
  relatedIds: ['gpqa-diamond', 'mmlu', 'frontier-science'],
  // 分数天梯：2026-08-14 核验。口径差异大：带工具跑法明显更高；
  // 无工具口径以 AA/pricepertoken 汇总为准，带工具以 BenchLM 为准，官方 Scale Labs 榜为自报。
  ladder: [
    { model: 'Claude Opus 5', score: '64.7%', note: '带工具口径，BenchLM 2026-08' },
    { model: 'Claude Fable 5', score: '55.5%', note: '无工具口径，AA/pricepertoken 2026-08' },
    { model: 'Claude Opus 5', score: '54.9%', note: '无工具口径，pricepertoken 2026-08' },
    { model: 'GLM-5', score: '50.4%', note: 'Thinking w/ tools，厂商自报 2026-08' },
    { model: 'GPT-5.6 Sol', score: '49.5%', note: '无工具口径，pricepertoken 2026-08' },
    { model: 'Gemini 3 Pro', score: '38.3%', note: '无工具官方口径，2026-02 核验记录' },
    { model: 'gpt-5.4 (xhigh)', score: '36.2%', note: 'Scale Labs 官方榜自报，2026-03' },
  ],
  traits: ['千名专家出题', '答对即拒收', '精确匹配判分', '76% 简答 + 24% 多选', '私有 500 题防污染'],
  openSource: {
    status: 'partial',
    url: 'https://agi.safe.ai',
    note: '公开 2,500 题可下载（HuggingFace cais/hle），私有 500 题不公开；判分代码公开，题目本身由官方托管',
  },
};
