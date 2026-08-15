import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'codeforces',
  name: 'Codeforces Rating',
  aliases: [
    'Codeforces',
    'CFEval / CodeForces',
  ],
  category: 'coding',
  organizer: 'Codeforces 平台；标准化评测代表作 CodeElo（阿里 Qwen 团队，arXiv:2501.01257）',
  url: 'https://codeforces.com',
  oneLiner: '直接拿竞赛平台的 Elo 分给 AI 排名',
  what: '这不是一个独立题库，而是「用人类竞赛平台的尺子量 AI」：让模型做 Codeforces 上的真实竞赛题（题目难度 rating 从 800 到 2400+），再折算成与人类选手同体系的 Elo rating。题目难度本身有精确定义：一道 rating 为 x 的题，表示 rating 为 x 的人类选手第一次见它有 50% 概率做出。代表作是 Qwen 团队的 CodeElo（2025-01），收录 2024 年 5–11 月的 54 场比赛、387 题，首次做到与人类完全可比的评分。',
  how: 'CodeElo 的做法最「硬核」：用机器人把模型生成的代码直接提交到 Codeforces 官方平台，跑平台的隐藏测试和 special judge（约三成题答案不唯一、需要专门判题器），全过才算 Accept，实现零误判。每题最多提交 8 次，失败罚分照平台规则算。Elo 换算把每场比赛当独立事件：将模型的成绩插入该场人类选手名次表，用二分搜索反解出「打出这个名次所对应的期望 rating」，方差比平台官方的逐场更新法更低。',
  examples: '一场典型评测就是一场真实比赛：模型拿到题面（保留原始 HTML 格式，含输入输出约定、数据范围和时限），要写出完整可提交的 C++ 程序——论文发现强制用 C++ 时几乎所有模型分数更高，因为竞赛题卡运行时间，而模型默认爱写 Python。题目的算法标签（贪心、DP、图论等 35 种，平均每题 3.9 个）对模型不可见，事后用于分析：模型普遍擅长数学和模拟类题，栽在动态规划和树上。',
  reading: 'rating 直接对照人类段位，是少数「人机同尺」的编程指标。CodeElo 实测（2025 初）：o1-mini 拿到 1578，约超过近 90% 的人类参赛者；QwQ-32B-Preview 1261 约在 60 百分位；其余模型大多连最简题都吃力，落在人类最低的 10–25 百分位。此后各厂商发布推理模型时常自报 Codeforces 分数，头部数字已远超于此。',
  caveat: '「CFEval」只是厂商自报 Codeforces 分数时的非正式标签，不是独立基准，本站统一归到本条。各家自报口径差异很大（选题范围、是否允许重复提交、是否真在平台判题、是否对齐训练截止后的新题），横向对比前务必确认方法是否对齐 CodeElo 这类标准化做法。',
  facts: [
    { label: '题型', value: '真实竞赛题，题目难度 rating 800–2400+' },
    { label: '平台', value: 'Codeforces，2010 年上线（Mike Mirzayanov）' },
    { label: '标准化评测', value: '代表作 CodeElo（阿里 Qwen 团队，2025-01）：54 场比赛、387 题' },
    { label: '计分方式', value: '与人类选手同体系的 Elo/rating' },
    { label: '判题方式', value: '机器人直交官方平台，隐藏测试 + special judge，零误判' },
    { label: '提交预算', value: 'CodeElo 每题最多 8 次提交，失败按平台规则罚分' },
  ],
  frontier: {
    value: null,
    note: 'Elo 分不是百分制。CodeElo 实测（2025-01）：o1-mini 1578 分、约超过 90% 的人类参赛者，QwQ-32B-Preview 1261 分约在 60 百分位；此后各厂商自报的头部分数已远超于此，但口径不一，不宜直接横比。',
  },
  ladder: [
    { model: 'Gemini 3 Deep Think', score: '3455', note: 'Google 技术报告自报 Elo，2026-02-12；当时仅 7 名人类选手更高' },
    { model: 'DeepSeek V4-Pro-Max', score: '3206', note: 'DeepSeek 自报，2026-04 发布时全模型最高' },
    { model: 'GPT-5.5', score: '3168', note: 'OpenAI 自报，2026-04（DeepSeek 发布稿交叉引用）' },
    { model: 'o3', score: '2727', note: 'OpenAI 自报 performance rating，2025-09' },
    { model: 'o1-mini', score: '1578', note: 'CodeElo 标准化实测（arXiv:2501.01257），2025-01，超过约 90% 人类参赛者' },
    { model: 'QwQ-32B-Preview', score: '1261', note: 'CodeElo 标准化实测，2025-01，约 60 百分位' },
    { model: 'GPT-4', score: '392', note: '历史对比（2023-03 自报），人类底部 5% 水平' },
  ],
  traits: ['真实竞赛题（难度 800–2400+）', '与人类同体系 Elo 评分', '机器人直交官方平台判题', '隐藏测试 + special judge', '各家自报口径不一'],
  openSource: {
    status: 'open',
    url: 'https://github.com/OpenBMB/CodeElo',
    note: '题目本身在 Codeforces 平台公开；CodeElo 标准化评测代码公开（GitHub OpenBMB/CodeElo，arXiv:2501.01257）',
  },
  history: [
    { date: '2010', event: 'Codeforces 平台上线，逐渐成为全球竞赛编程主战场' },
    { date: '2023', event: 'OpenAI 报 GPT-4 的 Codeforces rating 约 392，处于人类底部 5%' },
    { date: '2024-12 前后', event: 'o1、o3、DeepSeek-R1 发布均以 Codeforces 分数作卖点，但各家自报口径不一' },
    { date: '2025-01', event: 'Qwen 团队发布 CodeElo（arXiv:2501.01257）：机器人直交平台、人机可比 Elo，o1-mini 1578 居首' },
  ],
  funFact: 'CodeElo 论文发现一个反直觉现象：不给约束时 95% 以上的模型会默认写 Python，但强制改用 C++ 后几乎所有模型分数都上涨——因为竞赛题卡运行时间，而人类选手约八成用 C++。换句话说，大部分模型的「默认手感」和竞赛高分策略是拧着的。',
  relatedIds: ['livecodebench'],
};
