import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'dsbench',
  name: 'DSBench',
  aliases: [
    'DSBench（WebDev 代理）',
  ],
  category: 'coding',
  organizer: 'UT Dallas、USC、Tencent AI Lab Seattle（Liqiang Jing 等，ICLR 2025），arXiv:2409.07703',
  url: 'https://github.com/LiqiangJing/DSBench',
  oneLiner: '拿真实数据竞赛题考 AI 当数据分析师和建模工程师',
  what: '测的是 agent 干数据科学这行的真本事，题目全部来自真实数据竞赛。分两大类：466 道数据分析题取自 ModelOff 竞赛的迷你案例，要求读懂长背景材料和多份数据文件后回答分析问题；74 道数据建模题取自 Kaggle，要求端到端完成整个机器学习竞赛流程。刻意保留真实世界的复杂度：长上下文、多模态背景（Excel、表格、图片）、大体积数据文件、多表关联。',
  how: '分析题以选择题或填空题形式给出，背景材料平均约 749 词，答案按准确率判分（数值答案给容差）。建模题则给训练集和测试集，agent 要自己写代码完成预处理、建模、调优，最后产出符合竞赛提交格式的预测文件，按任务指标和相对表现差距（RPG）计分。模型需要在能执行代码的 agent 环境里跑完整个流程，不是一次性问答。',
  examples: '一道典型分析题：给你某公司业务背景的近千词描述、几张 Excel 表和图表，问「上个季度哪个产品线的毛利率下滑最多」式的经营分析问题，agent 得自己读懂表结构、跨表计算才能填出答案。建模题则直接复刻 Kaggle 竞赛：给你多 GB 的训练 CSV 和赛题说明，要求你提交一份对测试集的预测文件，像真人选手一样被排行榜指标评判。',
  reading: '论文评测的当时最强 agent 也只解决了 34.12% 的数据分析任务，建模任务的相对表现差距（RPG）为 34.74%——离「数据科学专家」还差得远。这个榜的意义在于揭示：模型在编程榜上分数再高，面对真实数据工作的脏活（长材料、脏数据、多表关联）依然会翻车。',
  caveat: '题目源自公开的 ModelOff 和 Kaggle 竞赛，这些材料在模型预训练语料中很可能出现过，存在污染风险。另外注意撞名：DeepSeek 后来发布过内部的「DSBench-FullStack / DSBench-Hard」编程基准，与本条目完全是两回事，引用时需分清。',
  facts: [
    { label: '发布方', value: 'UT Dallas、USC、Tencent AI Lab Seattle（Liqiang Jing 等）' },
    { label: '发表', value: 'ICLR 2025（arXiv:2409.07703）' },
    { label: '任务规模', value: '466 道数据分析题（ModelOff）+ 74 道数据建模题（Kaggle）' },
    { label: '分析题形态', value: '选择题/填空题，背景材料平均约 749 词，多模态（Excel、表格、图片）' },
    { label: '建模题形态', value: '端到端机器学习竞赛：预处理、建模、调优、产出提交文件' },
    { label: '计分', value: '分析题按准确率（数值给容差）；建模题按任务指标与相对表现差距 RPG' },
  ],
  frontier: {
    value: 34.12,
    note: '论文发布时（2024-09，ICLR 2025 版沿用）最强 agent 的数据分析准确率仅 34.12%，建模任务相对表现差距（RPG）34.74%；此后官方未见持续更新，注意该数字反映的是 2024 年底的模型水平。',
  },
  history: [
    { date: '2024-09-12', event: 'arXiv v1 发布，提出从真实竞赛取材的数据科学 agent 评测' },
    { date: '2025-01', event: '被 ICLR 2025 接收' },
    { date: '2025-02-22', event: 'arXiv v2 修订' },
    { date: '2026', event: 'DeepSeek 发布内部编程基准「DSBench-FullStack / DSBench-Hard」，与本条目撞名，第三方榜单开始出现混淆记录' },
  ],
  funFact: '分析题全部取自 ModelOff——有「财务建模世界杯」之称的 Excel 建模竞赛，人类选手比的是谁能最快读懂财报背景、跨表算出经营答案。把 AI 扔进这个赛场，等于考它能不能顶替咨询顾问做经营分析，而不只是写代码。',
  // 分数天梯：2026-08-14 核验。无 ladder——官方无持续更新的公开榜单，
  // 论文（2024-09 / v3 2025-04）仅报当时最强 agent 34.12% 分析准确率与 34.74% RPG，
  // 无逐模型排名；llm-stats 的「DSBench-Hard」为 DeepSeek 内部基准（见 caveat），与本条无关。
  traits: ['真实数据竞赛取材', '长上下文多模态背景', '端到端建模流程', '数值容差判分', 'ICLR 2025 论文'],
  openSource: {
    status: 'open',
    url: 'https://github.com/LiqiangJing/DSBench',
    note: '任务集与评测代码公开于 GitHub（LiqiangJing/DSBench，Apache-2.0）；数据来自公开的 ModelOff 与 Kaggle 竞赛',
  },
};
