import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'eq-bench',
  name: 'EQ-Bench',
  aliases: ['EQ-Bench Creative Writing v3', 'EQBench 长文写作榜'],
  category: 'arena',
  organizer: 'Samuel Paech（个人项目），arXiv:2312.06281；eqbench.com',
  url: 'https://eqbench.com/',
  oneLiner: '给 AI 做情商测试：读段对话，给角色情绪强度打分',
  what: '一个人维护的草根榜，但被广泛引用。主榜测情感理解：60 道英文题，每题一段 GPT-4 生成的冲突/张力对话，让模型给角色的 4 种情绪强度分别打 0-10 分——不是选「他是什么情绪」，而是判断每种情绪各有多强，其中混着需要细读才能分辨的微妙项。论文发现一个耐人寻味的结论：EQ-Bench 得分与 MMLU 的相关性高达 0.97，即情商分和通用智能分高度同涨。站长另有创意写作榜 Creative Writing v3（本站别名里的「长文写作榜」即它）和 EQ-Bench 3/4（LLM 评审的多轮角色扮演版）、Spiral-Bench 等衍生榜。',
  how: '主榜客观计分：模型先打分，再被要求自我批评并修订一轮；把 4 个情绪分归一化到总和 10，与作者定的参考答案逐项求差，10 减去差值总和即单题分（随机作答约为 0，满分 100），初答轮与修订轮各算一次总分取较好者。Creative Writing v3 则是 32 个写作 prompt 各写 3 遍共 96 篇，评审模型（官方口径 Claude Sonnet 4.6）先按 rubric 逐篇打分，再与榜上相邻模型两两对比，用计入胜负幅度的改造 Glicko-2 算出归一化 Elo（锚定 DeepSeek-R1 = 1500）。',
  examples: '论文原例：艺术评论家 Brandon 与 Cecilia 争执批评的分寸——Cecilia 说「你解剖艺术，就像解剖台上一具冰冷的尸体」。问：对话结束时 Brandon 的「被冒犯 / 共情 / 自信 / 不屑」各有多强（0-10）？「自信」「不屑」显而易见，「被冒犯」则要细品弦外之音，「共情」明显不沾边；模型打完分还要自我检讨再改一轮。写作榜的 prompt 则专攻幽默、恋爱、空间感、独特视角等模型易翻车的题材，例如要求把俗套场景写出新角度。',
  reading: '主榜满分 100 代表与参考答案完全一致，作者明说现实中达不到，随机作答约为 0——所以它区分度很好但也别当百分制正确率读。写作榜报归一化 Elo，1500 是 DeepSeek-R1 锚点，头部模型在其上拉开差距；rubric 分在高分段容易饱和，官方建议主要看 Elo。',
  caveat: '主榜参考答案由作者一人裁定，主观成分重；与 MMLU 相关 0.97 既是卖点也是疑问——它测的到底是情商，还是换了个壳又测一遍通用智能。写作榜结果高度依赖评审模型的口味，官方自己列了一串未控制的偏差（文风偏好、对老套桥段的容忍度等），并提醒「分数只是参考，要去读样文」。',
  facts: [
    { label: '作者', value: 'Samuel Paech 个人项目，2023-12 发论文（arXiv:2312.06281）' },
    { label: '主榜', value: '60 道英文题：读冲突对话，给角色 4 种情绪强度打 0-10 分' },
    { label: '计分', value: '归一化后与参考答案求差，10 减差值和；随机作答≈0 分' },
    { label: '亮点', value: '得分与 MMLU 相关性高达 0.97（论文实测）' },
    { label: '写作榜', value: 'Creative Writing v3：32 个 prompt × 3 轮 = 96 篇，rubric + Glicko-2 Elo' },
    { label: '衍生', value: 'EQ-Bench 3/4（LLM 评审角色扮演）、Spiral-Bench 等' },
  ],
  frontier: {
    value: null,
    note: '写作榜是归一化 Elo（DeepSeek-R1 锚定 1500），主榜满分 100 代表现实达不到的「与参考答案完全一致」，两者都没有意义清晰的 0-100 头部百分比可引，故置空。当前座次以 eqbench.com 实时榜为准。',
  },
  // 分数天梯：2026-08 从 eqbench.com 官方实时榜实抓。现版主榜 EQ-Bench 4 为多轮角色扮演 Elo
  //（120 个 persona × 16 轮，三评审 LLM 盲评 + soft Bradley–Terry），Elo 锚定固定参考模型。
  ladder: [
    { model: 'Claude Opus 5', score: '1385', note: 'EQ-Bench 4 Elo 榜首，官方榜 2026-08' },
    { model: 'Claude Fable 5', score: '1340', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'Kimi K3', score: '1339', note: 'EQ-Bench 4 Elo，官方榜 2026-08；开源权重最佳' },
    { model: 'GPT-5.5', score: '1315', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'Claude Opus 4.7', score: '1311', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'Claude Opus 4.8', score: '1281', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'GPT-5.4', score: '1272', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'Muse Spark 1.1', score: '1260', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'GPT-5.6 Sol', score: '1250', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'Claude Sonnet 5', score: '1236', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'GPT-5.6 Terra', score: '1234', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
    { model: 'Inkling', score: '1226', note: 'EQ-Bench 4 Elo，官方榜 2026-08' },
  ],
  history: [
    { date: '2023-12-11', event: '论文发表：60 题主榜 + MIT 开源评测管线，GPT-4-0613 大幅领先' },
    { date: '2025-03-28', event: 'Creative Writing Benchmark v3 仓库发布，确立 rubric + Elo 混合计分' },
    { date: '2025-04', event: 'EQ-Bench 3 上线：改用 LLM 评审（Claude Opus 4.6）的角色扮演与分析任务' },
    { date: '2025 底-2026', event: 'EQ-Bench 4 成为现版主榜：与模拟 persona 用户多轮角色扮演，测主动情感与社交智能' },
  ],
  funFact: '作者自己在论文里报告了一个尴尬数据：这个「情商榜」与 MMLU（典型智商榜）的相关性高达 0.97。他只好论证对 LLM 来说情商和通用智能可能就是一体两面——于是这个一人维护的小榜，意外成了便宜好用的通用智能代理指标，被广泛引用。',
  relatedIds: ['fiction-livebench'],
  traits: [
    '多轮角色扮演 + persona 用户（120 人 × 16 轮）',
    '三 LLM 评审盲评 + Elo 计分',
    '情绪强度打分 / 写作评审等口径各异',
    '与 MMLU 相关性 0.97',
    '参考答案与评审口味主观性强',
  ],
  openSource: {
    status: 'open',
    url: 'https://github.com/eq-bench/eq-bench',
    note: '评测代码在 GitHub（eq-bench/eq-bench，MIT 开源管线），榜单在 eqbench.com，数据与空间在 HuggingFace（sam-paech/EQ-Bench-Leaderboard）',
  },
};
