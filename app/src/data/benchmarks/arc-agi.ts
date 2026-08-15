import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'arc-agi',
  name: 'ARC-AGI',
  aliases: [
    'ARC-AGI-1/2/3',
    'ARC-AGI-1/2 Semi-Private',
    'ARC-AGI-2（Thinking verified/3.1 Pro 参考/家族参照）',
    'ARC-AGI 官方验证',
    'Grok 4 ARC-AGI SOTA（背景）',
    'LMArena / ARC-AGI',
  ],
  category: 'reasoning',
  organizer: 'ARC Prize Foundation（François Chollet 与 Mike Knoop 创办）',
  url: 'https://arcprize.org',
  oneLiner: '彩色方格谜题，考模型能不能当场学会从没见过的新规律',
  what:
    'ARC-AGI 想测的不是知识而是「流体智力」：面对一个全新的小规律，看几个例子就能举一反三。题目是彩色方格（grid）谜题，不考语言、不考常识，只用上物体恒存、计数、基本几何这类学龄前儿童就有的「核心知识先验」，刻意让刷题背答案无效。系列已出三代：ARC-AGI-1（2019）是静态网格变换；ARC-AGI-2（2025-03）同样形式但难度大幅提高；ARC-AGI-3（2026-03，arXiv:2603.24621）改成交互式环境，不再给示例对，agent 要在没有说明书的情况下自己摸索操作含义、推断目标并规划行动。',
  how:
    '前两代的玩法：每道题给 2~5 对「输入网格→输出网格」示范，模型要对一个新的输入网格生成输出网格，每个格子的颜色全对才算通过，每题最多 2 次尝试；成绩是任务通过率，ARC Prize 百万美元大奖的门槛是半私有评测集上 85%。ARC-AGI-3 则让 agent 在回合制环境里一步步操作，计分改为相对人类玩家行为效率的效率分（动作越接近人类高手越少浪费，分越高），乱试是过不了关的。官方榜单还同时画「每题成本—通过率」散点，强调聪明不只是做对，还要做得便宜。',
  examples:
    '一道典型的 ARC-AGI-1/2 题长这样：给你几对 10×10 左右的小方格图，比如输入是零散的几个色块、输出是把每个色块按某种对称性补全成完整图形；你要从这些示范里猜出隐藏规则，再把规则用到第四个输入上，逐格填出答案——错一个格子就算失败。ARC-AGI-3 则完全不同：模型被丢进一个抽象的小世界，开始时连「哪个操作会让画面怎么变」都不知道，只能靠尝试和观察反馈自己摸索出机制，再规划一连串动作达成目标。',
  reading:
    '对人类来说这些题大多不难，所以分数低很能说明问题。ARC-AGI-1 发布五年多后才被高额奖金和推理模型逼到高分区；ARC-AGI-2 到 2026 年初前沿模型才接近或突破 85% 这条大奖线；ARC-AGI-3 发布时前沿模型得分不足 1%，是目前最难的一档。注意三代之间分数完全不可比，报分一定要说清是哪一代、公开集还是半私有集。',
  caveat:
    '网格任务形式固定，存在被「针对性训练」的空间：2025 年已有人用测试时逐题训练的小模型（如 7M 参数的 TRM）在 ARC-AGI-1 上拿到 45%，说明高分不一定等于通用推理。ARC-AGI-2 公开集已被广泛刷题，官方更看重半私有集成绩。ARC-AGI-3 的交互评测成本和环境接口仍在迭代，早期分数波动大。',
  facts: [
    { label: '出题方', value: 'ARC Prize Foundation（Chollet × Mike Knoop）' },
    { label: '题量', value: 'ARC-AGI-2 公开训练集 1,000 题、公开评测集 120 题，另有半私有/私有集' },
    { label: '题型', value: '1/2 代为彩色方格规律归纳，3 代为交互式环境探索' },
    { label: '计分', value: '每题 2 次尝试、逐格全对；大奖线为半私有集 85%' },
    { label: '奖金', value: '2026 赛季三赛道总奖金超 200 万美元' },
    { label: '现状', value: '2026 年是 ARC-AGI-2 最后一届官方 Kaggle 竞赛' },
  ],
  frontier: {
    value: 92.5,
    note: 'ARC-AGI-2 官方验证榜：GPT-5.6 Sol（max）92.5%（2026-07，arcprize.org）。同期 ARC-AGI-3 公开集最高仅约 13.3%（同为 GPT-5.6 Sol），三代分数完全不可比。',
  },
  history: [
    { date: '2019', event: 'Chollet 发表《On the Measure of Intelligence》，ARC-AGI-1 随文问世' },
    { date: '2024', event: 'ARC Prize 竞赛启动，百万美元级奖金，半私有集 85% 为大奖线' },
    { date: '2025-03', event: 'ARC-AGI-2 发布，发布时最强推理系统只有个位数分数' },
    { date: '2025-07~08', event: 'ARC-AGI-3 预览赛：3 个公开环境 + 3 个隐藏环境，冠军 12.58%' },
    { date: '2026-03', event: 'ARC-AGI-3 正式发布（arXiv:2603.24621），发布时前沿模型 <1%' },
    { date: '2026-07', event: 'GPT-5.6 Sol 官方验证 ARC-AGI-2 92.5%；ARC-AGI-3 公开集 13.33% 居首，首次赢下整局游戏' },
  ],
  funFact:
    'ARC-AGI-2 发布时官方请人类两人小组实测，每道题都有人解出（合计 100%），而最强 AI 系统只有个位数——「人类觉得不难、AI 全军覆没」的直观对照。2025 年 Kaggle 竞赛吸引 1,455 支队伍，冠军系统也只拿了 24%。',
  // 分数天梯：2026-08-14 核验。三代分数完全不可比，按代分列；
  // ARC-AGI-2 以官方验证（arcprize.org）为准，1/3 代交叉 BenchLM 与 ARC Prize 官方。
  ladder: [
    { model: 'Claude Opus 5', score: '30.2%', note: 'ARC-AGI-3 公开集，ARC Prize 官方验证 2026-07，约为 GPT-5.6 Sol 纪录 4 倍' },
    { model: 'GPT-5.6 Sol (max)', score: '13.33%', note: 'ARC-AGI-3 公开集，arcprize.org 2026-07；半私有集 7.78%' },
    { model: 'Claude Opus 4.8 (High)', score: '1.5%', note: 'ARC-AGI-3 公开集，arcprize.org 2026-07' },
    { model: 'GPT-5.6 Sol (max)', score: '92.5%', note: 'ARC-AGI-2 官方验证榜，2026-07，arcprize.org' },
    { model: 'Claude Opus 5', score: '90.4%', note: 'ARC-AGI-2 官方验证榜，2026-07（BenchLM 同录）' },
    { model: 'GPT-5.5', score: '85%', note: 'ARC-AGI-2 官方验证榜，2026-07' },
    { model: 'Claude Opus 5', score: '97.5%', note: 'ARC-AGI-1 榜，BenchLM 2026-08' },
  ],
  traits: ['彩色方格谜题', '当场学会新规律', '逐格全对判分', '三代难度递进', '大奖线 85%'],
  openSource: {
    status: 'open',
    url: 'https://arcprize.org/leaderboard',
    note: '数据集公开（HuggingFace arcprize/arc-agi-2 等，Kaggle 竞赛同步）；官方验证榜与成绩页见 arcprize.org',
  },
};
