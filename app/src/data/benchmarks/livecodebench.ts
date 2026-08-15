import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'livecodebench',
  name: 'LiveCodeBench',
  aliases: [
    'LiveCodeBench v6',
    'LiveCodeBench Pass@1',
    'LiveCodeBench v6（K2 Thinking）',
  ],
  category: 'coding',
  organizer: 'UC Berkeley（Naman Jain 等），ICLR 2025',
  url: 'https://livecodebench.github.io/',
  oneLiner: '不断上新题的竞赛编程榜，专防模型背答案',
  what: '竞赛编程评测的「防污染」方案：滚动收录 LeetCode、AtCoder、Codeforces 三大平台不断新出的比赛题，每道题都标注发布日期。评测时只取模型训练截止日之后发布的题——这些题在模型训练时还不存在，背答案在机制上不可能。除了标准代码生成，它还测另外三种能力：自修复（错了给反馈再改）、代码执行（不给电脑，让模型在脑子里跑代码说出结果）、测试输出预测（给题目和某个具体测试输入，直接预测输出），把「会写码」拆成更细的能力谱。',
  how: '主场景是代码生成：模型拿到竞赛题的完整题面（问题描述、输入输出格式、样例），输出完整程序，用比赛自带的隐藏测试判对错，按 pass@1 计分（部分场景用 avg@8）。自修复场景则先让模型生成一版，如果错了，把报错信息或失败的测试用例喂回去让它修。最关键的是时间窗切片：报告分数时必须圈定题目日期范围（如「2024-08 至 2025-05」），只算窗口内的题。',
  examples: '一道典型的代码生成任务就是当周 LeetCode 周赛真题：比如给你一段「给定数组和查询列表，对每个查询返回满足某条件的最长子数组长度」的题面和两个样例，模型要交出一份能过全部隐藏测试的完整解答——包括想出正确的算法（往往涉及数据结构巧思）而非暴力枚举。测试输出预测场景则反过来：不写代码，直接告诉模型「对这个输入，正确程序的输出应该是什么」，考的是对题意和算法的纯推理。',
  reading: 'pass@1 越高越好，但这个榜的数字必须带着日期窗一起读：同一个模型，题目窗口越新通常分越低。官方榜单支持自定义时间窗口（例如 v6 口径下默认窗内约 454 题）。它的价值在于分数是「未见过的题」上的真实水平，污染被时间戳从机制上排除。',
  caveat: '「v6」指 release_v6（约 1055 题，收录至 2025 年中），不同 release 题目池不同，比较分数前必须对齐版本号和日期窗口，否则是在比两套不同的卷子。另外竞赛题风格和工业开发差距大，这里的低分不代表工程能力弱，高分也不直接等于能干活。',
  facts: [
    { label: '题量', value: '滚动更新；release_v6 约 1055 题（2023-05 至 2025 年中的赛题）' },
    { label: '题源', value: 'LeetCode / AtCoder / Codeforces 新赛题，逐题标注发布日期' },
    { label: '场景', value: '代码生成 / 自修复 / 代码执行 / 测试输出预测 共 4 个' },
    { label: '计分', value: 'pass@1（部分场景 avg@8），必须按日期窗切片' },
    { label: '发表', value: 'ICLR 2025（UC Berkeley，Naman Jain 等）' },
  ],
  frontier: {
    value: 91.6,
    note: '第三方聚合站 BenchLM 2026-08 榜单：Qwen3.7 Max 91.6%（v6 口径）；厂商官方口径如 Kimi K2.5 自报 v6 85.0%（2026）。日期窗不同不可比。',
  },
  history: [
    { date: '2024-03', event: '论文上线（arXiv:2403.07974），提出按题目发布日期防污染的评测范式' },
    { date: '2024', event: '论文用时间窗曲线实锤 DeepSeek 系列模型在旧题上异常高分，成为污染检测的标志性案例' },
    { date: '2025', event: '被 ICLR 2025 收录，成为竞赛编程防污染评测的标准' },
    { date: '2025 年中', event: 'release_v6 冻结，约 1055 题' },
  ],
  funFact: '它最出名的一次「抓包」：论文把模型分数按题目发布月份画成曲线，发现 DeepSeek 系列在训练截止前的旧题上表现异常好、截止后的新题上断崖下跌——数据污染第一次被时间戳当场可视化，这一招后来成了评测界排查污染的标配动作。',
  // 分数天梯：2026-08-15 核验。口径为 BenchLM 聚合的代码生成 pass@1（v6 日期窗，2026-08-14 更新）；不同 release/日期窗不可直接比。
  ladder: [
    { model: 'Qwen3.7 Max', score: '91.6%', note: 'BenchLM 聚合 2026-08-14（v6 口径）' },
    { model: 'Qwen3.7 Plus', score: '89.6%', note: 'BenchLM 聚合 2026-08-14' },
    { model: 'GLM-4.7', score: '84.9%', note: 'BenchLM 聚合 2026-08-14；开源权重最佳' },
    { model: 'Qwen3.6-27B', score: '83.9%', note: 'BenchLM 聚合 2026-08-14' },
    { model: 'Qwen3.6-35B-A3B', score: '80.4%', note: 'BenchLM 聚合 2026-08-14' },
    { model: 'Mercury 2', score: '67.3%', note: 'BenchLM 聚合 2026-08-14' },
    { model: 'DeepSeek V3', score: '37.6%', note: 'BenchLM 聚合 2026-08-14' },
  ],
  traits: ['滚动上新赛题', 'LeetCode/AtCoder/Codeforces 题源', '按发布日期防污染', '4 种评测场景', 'pass@1 按日期窗计分'],
  openSource: {
    status: 'open',
    url: 'https://github.com/LiveCodeBench/LiveCodeBench',
    note: '数据集与评测代码在 GitHub（LiveCodeBench/LiveCodeBench）公开，官方榜单 livecodebench.github.io 在线可查',
  },
  relatedIds: ['codeforces', 'humaneval'],
};
