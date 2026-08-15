import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'babyvision',
  name: 'BabyVision',
  aliases: [
    'BabyVision（Pro 档）',
  ],
  category: 'multimodal',
  organizer: 'UniPat AI 等（Liang Chen 等，联合北大、清华、阿里、月之暗面等），arXiv:2601.06521（2026-01）',
  url: 'https://arxiv.org/abs/2601.06521',
  oneLiner: '3 岁小孩秒答的纯视觉题，AI 集体翻车',
  what: '388 道「纯视觉」题，分 4 大类 22 个子类：细粒度辨别、视觉追踪、空间感知、图案识别，任务原型取自幼儿发展测评。设计的出发点是：人类在学会语言之前就会这些视觉技能，而多模态模型在知识榜上刷高分，很可能是靠语言先验「说」出来的，不是真「看」出来的——BabyVision 刻意把语言捷径剥掉，题目不需要任何文字知识，只看眼睛好不好使。',
  how: '388 题中 135 道选择题、253 道填空题。填空题由 judge 判语义等价（不卡字面匹配），报 Avg@3（每题测 3 次取平均）。同时做了真人实测作对照：3–6 岁儿童、成年人分批答题，形成人机同卷对比。',
  examples: '典型题目画风：「找不同」——在一堆形状、朝向、颜色几乎一样的图案里找出那个不一样的；「连线追踪」——在多条互相缠绕交叉的线里盯住一条走到底，或走简易迷宫；「数积木」——看一堆积木的透视图，数出被挡住的隐藏方块共有几块；「图形推理」——看一组按规律旋转的图形序列，选出下一个该出现的图案。这些题幼儿园孩子做得飞快，模型却大面积答错。',
  reading: '论文实测：成年人平均 94.1 分，而当时最强的 Gemini 3 Pro Preview 只有 49.7 分，连 6 岁儿童的水平都没到。这个榜读法很直白——分数越接近 94，说明模型的「视觉基本功」越接近成人；50 分上下意味着一半幼儿园级别的题都答不对。',
  caveat: '2026 年 1 月的新榜，题目是人工构造的测评题而非自然图像，代表性偏「视觉原语」这一窄面，不能外推为整体多模态能力。填空题由 judge 判分，判分口径会影响绝对值；且榜单年轻，各模型分数多为论文自测，第三方复现还少。',
  facts: [
    { label: '规模', value: '388 题，4 大类 22 个子类' },
    { label: '四大类', value: '细粒度辨别 / 视觉追踪 / 空间感知 / 图案识别' },
    { label: '题型与判分', value: '135 道选择 + 253 道填空（judge 判语义等价），报 Avg@3' },
    { label: '人机对照', value: '成人 94.1 分；Gemini 3 Pro Preview 49.7 分，不及 6 岁儿童' },
    { label: '任务原型', value: '取自 3–6 岁儿童发展测评，刻意剥离语言知识' },
  ],
  frontier: {
    value: 49.7,
    note: '论文实测（2026-01）：受测模型最高为 Gemini 3 Pro Preview 的 49.7，距成人 94.1 差 44 分；截至 2026-08 尚无权威第三方复现榜单更新此数字。',
  },
  history: [
    { date: '2026-01-10', event: 'arXiv v1 上线（2601.06521），同步公开项目页与 GitHub 仓库（UniPat-AI/BabyVision）' },
    { date: '2026-01', event: '凭「AI 不如 3 岁小孩」的实测结论进入 HuggingFace 热门论文榜' },
    { date: '2026-07-07', event: 'arXiv v2 提交，作者阵容扩至十余家机构' },
  ],
  funFact: '署名阵容罕见地「联合作战」：UniPat AI 牵头，北大、清华、阿里、月之暗面、阶跃星辰、普林斯顿、南洋理工等十余家同列——其中好几家是互相竞争的模型厂商，等于联合发布了一个打脸包括自家模型在内的基准。',
  relatedIds: ['mmmu'],
  // 分数天梯：2026-08-14 核验。BenchLM 镜像榜（2026-08-15，4 模型）为主；
  // 论文首发（2026-01）时最强 Gemini 3 Pro Preview 仅 49.7，人类成人 94.1。
  ladder: [
    { model: 'Qwen3.8 Max', score: '82.0%', note: 'BenchLM 镜像榜第 1，2026-08-15' },
    { model: 'Meta Muse Spark 1.1', score: '76.3%', note: 'BenchLM 镜像榜第 2，2026-08-15' },
    { model: 'Qwen3.8-27B', score: '65.7%', note: 'BenchLM 镜像榜第 3，2026-08-15' },
    { model: 'Gemini 3 Pro Preview', score: '49.7%', note: '论文首发最强（2026-01），历史参照' },
  ],
  traits: ['388 题纯视觉', '幼儿发展测评原型', '剥离语言先验', 'Avg@3 判分', '人机同卷对比'],
  openSource: {
    status: 'open',
    url: 'https://github.com/UniPat-AI/BabyVision',
    note: '数据集与评测代码公开于 GitHub（UniPat-AI/BabyVision）；官方页 unipat.ai/benchmarks/BabyVision',
  },
};
