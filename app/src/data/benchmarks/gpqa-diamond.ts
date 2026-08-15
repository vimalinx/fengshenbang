import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'gpqa-diamond',
  name: 'GPQA Diamond',
  aliases: ['GPQA', 'GPQA Diamond（3.1 Pro 参考/Epoch 复现）'],
  category: 'reasoning',
  organizer: 'NYU / Cohere / Anthropic 研究者（David Rein 等），arXiv:2311.12022，COLM 2024',
  url: 'https://arxiv.org/abs/2311.12022',
  oneLiner: '博士级理化生选择题，谷歌也搜不到答案',
  what: 'GPQA 全称 Graduate-Level Google-Proof Q&A，由 NYU 等机构的研究生发布，包含 448 道生物、化学、物理三个领域的博士级四选一题，全部由对应领域的博士级专家亲自编写。设计目标是「谷歌也救不了你」：让非本领域的高水平验证者开卷用搜索引擎查 30 分钟以上，正确率也只有约 34%，而本领域专家约 65%（剔除自认的笔误后 74%）。Diamond 是从中再筛出的 198 题——专家答得对、非专家大多答错的那批，是公认最难的子集，也是今天厂商报分默认用的版本。它针对的是「模型是否具备专家级科学推理」这一能力，而不是事实检索。',
  how: '模型拿到题干和四个选项，输出选项字母，按准确率计分。主流评测脚本（如 OpenAI simple-evals）会把选项顺序随机打乱，并且每题重复采样 4 次取平均，以降低选项位置带来的噪声。人类基线就是前面那组数字：专家约 65–74%，非专家约 34%，瞎蒙下限 25%。',
  examples: '论文给出的样题以一段具体科研情境开头（例如一道分子生物学题描述一位科学家的实验设置），随后给出四个都貌似合理的选项——三个干扰项同样按「能骗过聪明外行」的标准设计，必须真正懂该领域的机制和计算才能排除。值得注意的是，数据集作者明确要求不要在网上明文贴出原题，以防泄进训练语料，所以公开渠道几乎看不到完整题目，只能看到学科分布、评测脚本和各家分数。',
  reading: 'GPT-4 时代最强基线只有 39%，远低于专家；推理模型出现后分数快速攀升，如今前沿模型普遍超过专家基线，80% 以上算头部水平。它是判断「模型科学推理是否逼近博士专家」最常用的试金石之一，厂商发布新模型几乎必报。',
  caveat: '只有 198 题，统计噪声不小，一两个点的分差意义有限；题目虽有保密要求，但答案片段难免在网上流传，污染风险长期存在；Epoch AI 等第三方复现的分数与厂商自报常有出入，横向对比要认准同一评测口径。选择题形式也决定了它测不了完整的推导过程。',
  facts: [
    { label: '题量', value: 'Diamond 子集 198 题（全集 448 题，生物/化学/物理）' },
    { label: '题型', value: '四选一单选，评测时选项顺序随机打乱' },
    { label: '出题人', value: '对应领域博士级专家亲手编写，并由其他专家交叉验证' },
    { label: '人类基线', value: '领域专家约 65%（剔除自认笔误后 74%），非专家开卷用谷歌约 34%' },
    { label: '防污染设计', value: '作者明确要求不得在网上明文传播原题' },
  ],
  frontier: {
    value: 94.9,
    note: 'Kaggle Open Benchmarks GPQA Diamond zero-shot 榜（2026-07）：Grok 4.5 94.9%、Gemini 3 Pro Preview 93.4%；OpenRouter 榜（2026-08）GPT-5.2 为 87.9%。头部模型已远超 65% 的专家基线。',
  },
  history: [
    { date: '2023-11', event: '论文 arXiv:2311.12022 发布，448 题，当时最强 GPT-4 基线仅 39%' },
    { date: '2024-09', event: 'OpenAI o1 发布，GPQA Diamond 成绩首次越过人类专家基线，成为推理模型时代的标志性时刻' },
    { date: '2024', event: '被 COLM 2024 录用；此后成为厂商发布新模型几乎必报的试金石' },
    { date: '2025–2026', event: '头部模型普遍 80%+，Epoch AI、Kaggle、OpenRouter 等第三方榜单开始独立复现以对冲厂商自报' },
  ],
  funFact: 'GPQA 是最早把「防背题」写进设计的主流基准之一：数据集内置 canary 字符串用于侦测训练语料泄漏，作者还公开请求所有人不要在网上贴原题。名字本身就是卖点——Google-Proof，谷歌也搜不到答案。',
  relatedIds: ['supergpqa', 'hle'],
  // 分数天梯：2026-08-14 核验。口径以 llm-stats 聚合榜（2026-08，239 模型）为主，
  // 交叉 tensorfeed（2026-07-24 刷新：Opus 4.8 93.6% 居首）与 pricepertoken；官方自报口径另注。
  ladder: [
    { model: 'Claude Mythos Preview', score: '94.6%', note: 'llm-stats 聚合，2026-08；与 GPT-5.6 Sol 并列第一' },
    { model: 'GPT-5.6 Sol', score: '94.6%', note: 'llm-stats 聚合，2026-08；pricepertoken 同录 94.1%' },
    { model: 'Gemini 3.1 Pro', score: '94.3%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Claude Opus 4.7', score: '94.2%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Claude Opus 4.8', score: '93.6%', note: 'llm-stats 聚合 2026-08；tensorfeed 2026-07 居首 93.6%' },
    { model: 'GPT-5.5', score: '93.6%', note: 'llm-stats 聚合，2026-08；与 Opus 4.8 并列' },
    { model: 'Kimi K3', score: '93.5%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Grok 4.5', score: '93.0%', note: 'llm-stats 聚合，2026-08' },
    { model: 'GPT-5.4', score: '92.8%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Claude Mythos 5', score: '≈88%', note: '第三方估算（Presenc，2026-06），口径与 llm-stats 不同，仅供参考' },
  ],
  traits: ['博士级理化生四选一', '198 题 Diamond 子集', '谷歌搜不到答案', '选项乱序+多次采样', '专家基线 65%'],
  openSource: {
    status: 'open',
    url: 'https://huggingface.co/datasets/Idavidrein/gpqa',
    note: '数据集在 HuggingFace（Idavidrein/gpqa）公开，评测脚本见 OpenAI simple-evals 与 Epoch AI 复现仓库；题目保密要求仅针对明文传播，不阻碍复现',
  },
};
