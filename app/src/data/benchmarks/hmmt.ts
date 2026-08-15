import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'hmmt',
  name: 'HMMT',
  aliases: ['HMMT25', 'HMMT（Thinking）'],
  category: 'reasoning',
  organizer: '哈佛/MIT 学生组织；基准化由 MathArena（ETH SRI）赛后数天内完成',
  url: 'https://matharena.ai',
  oneLiner: '哈佛-MIT 数学赛真题，赛后立刻开测防背题',
  what: 'HMMT 是哈佛和 MIT 学生组织合办的高水平数学竞赛，每年 2 月、11 月各一场，个人赛按代数、组合、几何、数论分轮次，题目一律要求给出最终答案（数值或表达式）。作为 AI 基准，它由 MathArena（苏黎世联邦理工 SRI 实验室）在赛后数天内把新题整理上线评测，最常用的是 HMMT February 2025 的 30 题。它的核心价值是「新鲜」：题目在模型训练数据截止之后才公开，从机制上排除背题的可能，难度又普遍高于 AIME。',
  how: '按 MathArena 协议评测：模型逐题独立作答，输出完整推理和最终答案，与官方答案精确匹配判分；每题采样多次（通常 4 次起）报平均正确率。评测紧跟比赛日程——HMMT 2025 年 2 月 15 日举办，数天内模型分数就已上线，抢在任何厂商把新题喂进训练数据之前完成。',
  examples: '以 HMMT 2025 年 2 月几何轮第 1 题为例：矩形 ABCD 中 BC=24，内部一点 X 满足 ∠AXB=90°，已知 △AXD 和 △BXC 都是锐角三角形且外接圆半径分别为 13 和 15，求 AB 的长度——官方答案 14+4√37，需要作对称点加圆幂定理才能解出。组合轮第 1 题则要求计算把 1 到 7 这七个数排成一圈、满足特定相邻条件的排法数。题面都很短，但多数题需要竞赛技巧而非直接套公式。',
  reading: '在 MathArena 榜单上，HMMT February 2025 长期比同年 AIME 更难，同一模型在 HMMT 上的得分通常明显低于 AIME 2025。分数随模型迭代变化很快，以 matharena.ai 实时榜单为准；2025 年下半年头部模型（如 GPT-5）在最终答案型赛事整体上已到约 90%。',
  caveat: '题量小（每场 30 题），方差大；赛事本身是学生组织办的，基准化是第三方（MathArena）行为，不同平台或厂商自报可能用不同子集、不同采样次数，横向对比要看清协议；只判最终答案，证明类能力测不到。',
  facts: [
    { label: '赛事方', value: '哈佛/MIT 学生组织，每年 2 月、11 月各一场' },
    { label: '基准规模', value: '每场取 30 题（如 HMMT February 2025）' },
    { label: '题型', value: '最终答案型（数值或表达式），精确匹配判分' },
    { label: '评测方', value: 'MathArena（ETH SRI），赛后数天内上线评测' },
    { label: '核心卖点', value: '题目在模型训练数据截止后才公开，机制上防污染' },
  ],
  frontier: {
    value: 90,
    note: 'MathArena Apex 博文（2025-08）：GPT-5 在其评测的所有最终答案型赛事（含 HMMT February 2025）上约 90%；单项实时分数以 matharena.ai 榜单为准。',
  },
  history: [
    { date: '1998', event: 'HMMT 由哈佛与 MIT 学生创办，此后每年两届' },
    { date: '2025-02-15', event: 'HMMT February 2025 举办，数天内 MathArena 上线 30 题评测' },
    { date: '2025-05', event: 'MathArena 论文 arXiv:2505.23281 发布，HMMT 成为其常驻赛事之一' },
    { date: '2025-08', event: 'GPT-5 等头部模型在最终答案型赛事约 90%，MathArena 转而推出 Apex 难题集' },
  ],
  funFact: 'HMMT 的价值全在一个「快」字：题目周六公布，模型下周就被拉进考场，抢在任何厂商来得及把新题喂进训练数据之前。它本质上是一场命题人与训练流水线之间的赛跑。',
  relatedIds: ['aime', 'matharena-apex', 'usamo'],
  // 分数天梯：2026-08-14 核验。llm-stats 聚合 HMMT 2025 榜（2026-08 快照）为主，
  // 交叉 BenchLM 镜像（2026-08-15，GLM-4.7 97.1% 居首）与 MathArena 赛后即时评测口径。
  ladder: [
    { model: 'GPT-5.2 Pro', score: '100%', note: 'llm-stats 聚合 HMMT 2025，2026-08' },
    { model: 'GPT-5.2', score: '99.4%', note: 'llm-stats 聚合，2026-08' },
    { model: 'DeepSeek-V3.2-Speciale', score: '99.2%', note: 'llm-stats 聚合，2026-08' },
    { model: 'GLM-4.7', score: '97.1%', note: 'BenchLM 镜像，2026-08-15 居首' },
    { model: 'Kimi K2-Thinking-0905', score: '97.5%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Qwen3.6 Plus', score: '96.7%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Kimi K2.5', score: '95.4%', note: 'llm-stats 聚合，2026-08' },
    { model: 'GLM-5.2', score: '94.4%', note: 'llm-stats 聚合，2026-08' },
    { model: 'GPT-5', score: '≈90%', note: 'HMMT Feb 2025，MathArena 赛后评测（2025-08 快照）' },
    { model: 'GPT-5.6 Sol', score: '≈90%', note: 'HMMT 2025，厂商自报口径（OpenAI 发布稿，2026-07）' },
  ],
  traits: ['哈佛-MIT 赛事真题', '赛后数天即测', '题目防污染', '精确匹配判分', '难度高于 AIME'],
  openSource: {
    status: 'open',
    url: 'https://huggingface.co/datasets/MathArena/hmmt_feb_2025',
    note: 'MathArena 整理的数据集在 HuggingFace（MathArena/hmmt_feb_2025）公开，评测框架开源（matharena-eth 仓库）；题目源自 HMMT 赛事，官方赛题亦在 hmmt.org 公开',
  },
};
