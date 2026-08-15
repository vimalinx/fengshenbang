import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'multipl-e',
  name: 'MultiPL-E',
  aliases: [
    'EvalPlus / MultiPL-E（拆分后此标签按上下文归 evalplus 或 multipl-e）',
  ],
  category: 'coding',
  organizer: 'Northeastern 等（Cassano et al.），arXiv:2208.08227',
  url: 'https://github.com/nuprl/MultiPL-E',
  oneLiner: '把 HumanEval 机器翻译成 18 种语言再来一遍',
  what: '2022 年发布（NeurIPS 2023 正式收录），回答的问题是：代码模型在非 Python 语言上还灵不灵？做法是为 HumanEval 和 MBPP 写一套「编译器式」的翻译器，把题目、单元测试和类型约定逐语言改写，一键扩展到 18 种编程语言，涵盖 Java、C++、JavaScript、TypeScript、Go、Rust、Swift、Ruby、PHP、Bash、R、Julia、Lua、Perl、Scala 等不同范式与冷热程度的语言。它是最早的大规模多语言代码生成基准，让「模型是不是 Python 偏科生」第一次有了量化答案。',
  how: '每种语言的版本与原版题型一致：给函数签名和注释说明，模型补全函数体，跑该语言的原生单元测试，按 pass@k 计分。翻译不是逐字直译——翻译器要处理各语言的类型系统、命名习惯、测试框架差异（比如把 Python 的 doctest 转成 Go 的 testing 包断言），保证题意在目标语言里成立且可自动判分。加一门新语言只需为它写一个翻译器，所以这套东西可扩展性很强。',
  examples: '同一道题在不同语言里长什么样：HumanEval 里一道「判断列表中是否存在两数之差小于阈值」的 Python 题，到了 MultiPL-E 的 Go 版本里，函数签名变成 Go 风格、样例断言变成 Go test 代码，模型要用 Go 的切片和循环写出同样逻辑的解法；到了 Rust 版本又换一套所有权和类型写法。164 道题 × 18 种语言，就构成了一张「同一模型、逐语言对照」的成绩单。',
  reading: '核心看法是横向对比同一模型在各语言上的 pass@k：差距越大偏科越严重。论文里的发现就很有意思——Codex 在其中好几种语言上的表现追平甚至超过 Python，说明强模型的代码能力不完全押在单一语言上；而冷门语言（训练语料里代码少的）普遍得分更低，语言热度与分数正相关。',
  caveat: '题目由机器翻译而来，非 Python 语言的题面质量依赖翻译器水准，个别语言的习语转换未必地道。另外它常与 EvalPlus 连写为一个标签，注意二者是独立基准：一个管多语言，一个管测试加严（理论上可以叠加，但原生 MultiPL-E 沿用的还是母本的弱测试）。',
  facts: [
    { label: '构成', value: 'HumanEval + MBPP 翻译扩展到 18 种语言' },
    { label: '发布', value: '2022-08（arXiv:2208.08227，Northeastern，Cassano et al.）' },
    { label: '计分', value: 'pass@k，逐语言分别报告、横向对照' },
    { label: '方法', value: '为每种目标语言写一个「编译器式」翻译器，加新语言只需新写一个翻译器' },
    { label: '数据', value: '公开（github.com/nuprl/MultiPL-E）' },
  ],
  frontier: {
    value: null,
    note: '没有单一总分榜单，用法是同一模型的逐语言对照；论文时代（2022）Codex 已在好几种语言追平甚至超过 Python，语言冷热与分数正相关。',
  },
  history: [
    { date: '2022-08', event: 'arXiv 发布，把 HumanEval/MBPP 扩展到 18 种语言' },
    { date: '2022-12', event: 'arXiv v4 修订版' },
    { date: '2024 起', event: '成为多语言代码评测事实标准，Qwen2.5-Coder 等模型的多语言分数多取自它' },
  ],
  // 分数天梯：2026-08-15 核验。口径为 llm-stats 聚合的 18 语言平均 pass@1（各模型官方/复测混编，2026-08 访问）；无单一官方榜，逐语言对照更准。
  ladder: [
    { model: 'Qwen3-235B-A22B-Instruct-2507', score: '87.9%', note: 'llm-stats 聚合，2026-08；18 语言平均' },
    { model: 'Qwen3-Next-80B-A3B-Instruct', score: '87.8%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Qwen3 VL 235B A22B Instruct', score: '86.1%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Kimi K2 Instruct', score: '85.7%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Kimi K2-Instruct-0905', score: '85.7%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Qwen2.5 32B Instruct', score: '75.4%', note: 'llm-stats 聚合，2026-08' },
  ],
  traits: ['18 种语言', 'HumanEval/MBPP 机器翻译', '编译器式翻译器扩展', '逐语言横向对照', '测多语言偏科'],
  openSource: {
    status: 'open',
    url: 'https://github.com/nuprl/MultiPL-E',
    note: '翻译器与评测代码在 GitHub（nuprl/MultiPL-E）公开，数据集随仓库发布',
  },
  funFact: '最反直觉的发现是：Codex 在好几种「客场」语言上追平甚至超过了它的主场 Python——强模型的代码能力并不押注单一语言；真正拉开差距的是语言的冷热，训练语料里代码越少的语言，得分越低。',
  relatedIds: ['humaneval', 'evalplus'],
};
