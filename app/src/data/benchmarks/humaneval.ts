import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'humaneval',
  name: 'HumanEval',
  aliases: [
    'HumanEval pass@1',
    'HumanEval（官方宣称）',
  ],
  category: 'coding',
  organizer: 'OpenAI，Codex 论文 2021（arXiv:2107.03374）',
  url: 'https://github.com/openai/human-eval',
  oneLiner: '代码生成评测的鼻祖：164 道 Python 小题',
  what: '2021 年随 OpenAI 的 Codex 论文发布，是大模型代码评测的起点。164 道人工手写的 Python 函数级小题：给出函数签名和 docstring 说明，让模型补全整个函数体。题目刻意手写而不从网上扒，初衷就是防污染（当时 GitHub 代码都在训练语料里）。它只测单函数、纯算法逻辑、不依赖第三方库——在今天看是最基础的入门关，但它确立了「用单元测试自动判定代码对错」的范式，后来的 EvalPlus、MultiPL-E 都以它为母本。',
  how: '每道题把签名和 docstring 拼给模型，生成的函数体接在后面，然后跑题目自带的单元测试（平均每题仅 7.7 个用例，执行有秒级超时），全过算对。计分用论文发明的 pass@k：每题采样 k 次，至少一次通过就算解决，常用 pass@1、pass@10、pass@100。pass@k 的设计源于一个观察：让模型多生成几次，至少蒙对一次的概率远高于单次命中（论文里 Codex-12B 的 pass@1 约 28.8%，pass@100 超过 70%）。',
  examples: '以第 0 题 has_close_elements 为例：签名是 `has_close_elements(numbers: List[float], threshold: float) -> bool`，docstring 要求「判断列表中是否存在两个数，它们的差小于给定阈值」，并附两个 doctest 样例（如 [1.0, 2.8, 3.0, 4.0, 5.0, 2.0] 配阈值 0.3 应返回 True）。模型要补出完整函数体——一个正确解法是排序后检查相邻元素差。难度大约是技术面试的入门题，模型答错的方式往往是没有遍历所有数对之类的边界遗漏。',
  reading: 'pass@1 越高越好，但 2023 年底前沿模型就普遍过了 90%，2026 年这个分数已经完全没有区分度，只剩「是不是满分」的区别。它现在的正确用法是：当一个快速冒烟测试，或者作为历史坐标——读老论文里的分数时知道它在说哪把尺。',
  caveat: '严重饱和加严重污染：研究发现（Yang et al. 2023）预训练数据与题目有 8–18% 的逐字重叠，「背题」空间实打实存在；且平均每题仅 7.7 个测试用例太弱，EvalPlus 证明很多模型靠侥幸通过（加强测试后分数明显缩水）。今天的价值主要是「鼻祖基准」的历史定位，任何拿它当主要卖点的现代模型宣传都该打个问号。',
  facts: [
    { label: '题量', value: '164 道手写 Python 函数题，平均每题仅 7.7 个测试用例' },
    { label: '发布', value: '2021-07（OpenAI Codex 论文，arXiv:2107.03374）' },
    { label: '计分', value: 'pass@k——这个指标本身就是该论文发明的' },
    { label: '数据', value: '公开（github.com/openai/human-eval）' },
    { label: '状态', value: '严重饱和 + 污染（8–18% 逐字重叠），2026 年已无区分度' },
  ],
  frontier: {
    value: 96,
    note: '前沿模型 pass@1 已达 96–98%（2026 年多方评测口径），2023 年底即突破 90%，现已基本顶格、无区分度。',
  },
  history: [
    { date: '2021-07', event: '随 Codex 论文发布；Codex-12B 的 pass@1 仅 28.8%，pass@100 超 70%' },
    { date: '2022-08', event: 'MultiPL-E 把它机器翻译扩展到 18 种语言' },
    { date: '2023', event: 'Yang et al. 发现预训练语料与题目 8–18% 逐字重叠；EvalPlus（NeurIPS 2023）证明弱测试漏放大量错解' },
    { date: '2023 底', event: '前沿模型 pass@1 突破 90%，开始饱和' },
  ],
  funFact: '为了防污染，164 道题全是人工手写、不从网上扒——结果几年后发现预训练语料里仍有 8–18% 的逐字重叠：题是原创的，但题解、变体和社区讨论早已传遍全网，「原创题」也没能躲过被背下来的命运。',
  // 分数天梯：2026-08-15 核验。口径为 CodeSOTA 聚合的 HumanEval pass@1（greedy decode，2026-04 更新）；该榜已饱和，仅剩满分区间区分度。
  ladder: [
    { model: 'o4-mini', score: '97.3%', note: 'CodeSOTA 聚合，2026-04' },
    { model: 'Claude Opus 4.6', score: '96.3%', note: 'CodeSOTA 聚合，2026-04' },
    { model: 'o3-mini', score: '96.3%', note: 'CodeSOTA 聚合，2026-04' },
    { model: 'GPT-5', score: '95.1%', note: 'CodeSOTA 聚合，2026-04' },
    { model: 'o3', score: '94.8%', note: 'CodeSOTA 聚合，2026-04' },
    { model: 'GPT-4.1', score: '94.5%', note: 'CodeSOTA 聚合，2026-04' },
    { model: 'Claude Sonnet 4.6', score: '94.1%', note: 'CodeSOTA 聚合，2026-04' },
    { model: 'GPT-4.1 mini', score: '93.8%', note: 'CodeSOTA 聚合，2026-04' },
  ],
  traits: ['164 道手写 Python 题', '单函数补全', '单元测试自动判分', 'pass@k 指标发源地', '已饱和+污染'],
  openSource: {
    status: 'open',
    url: 'https://github.com/openai/human-eval',
    note: '题目与评测代码在 GitHub（openai/human-eval）公开',
  },
  relatedIds: ['evalplus', 'multipl-e'],
};
