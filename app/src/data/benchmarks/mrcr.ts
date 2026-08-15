import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'mrcr',
  name: 'MRCR',
  aliases: [
    'GDM-MRCR',
    'GDM-MRCR v2 长上下文',
    'OpenAI-MRCR',
  ],
  category: 'other',
  organizer: '原始任务出自 Google「Michelangelo」论文（Vodrahalli 等，arXiv:2409.12640）；GDM 版=eval_hub MRCR v2；OpenAI 版=2/4/8-needle（HF openai/mrcr）',
  url: 'https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2',
  oneLiner: '聊了好几轮相似内容，让 AI 复述「第 2 次」那段',
  what: '全称 Multi-Round Coreference Resolution（多轮共指消解），考超长上下文里的「相似内容辨析 + 次序推理」。场景是一段程序生成的超长多轮对话：用户反复多次让模型写文风相似的内容（比如「写一首关于 X 的诗」），中间隔着大量干扰对话，最后突然问「把你第 2 次写的那首复述出来」。难点在于每次的「针」和干扰项来自同一分布——内容都长得像，模型既要全部记住又要数清是第几次，比传统大海捞针难得多。',
  how: '按模型输出与目标段落的 SequenceMatcher 相似度计分（Mean Match Score），OpenAI 版有个硬规则：复述内容必须带上原文随附的随机 hash 前缀，否则该题记 0 分——这堵死了「重新编一首类似的」的退路。常报 8-needle（对话里埋 8 次相似请求，最难档），按 128K/1M 等上下文长度分桶。对话语料由 GPT-4 合成，可按需生成任意长度。',
  examples: '一个典型 8-needle 实例：128K token 的合成对话里，用户先后 8 次说「给我写一首关于秋天的诗」，模型每次即兴创作一首，且每首前面都附了一个随机字符串（如「xk42-」）；其余几十轮是无关闲聊。最后用户问：「把第 4 次写的那首诗原样复述一遍，包括前缀。」模型必须定位到 8 首相似的诗里正好第 4 首、一字不差地背出来，前缀错或拿错第几首都不得分。',
  reading: '按 0–1 的相似度分读，越高越好，且必须带 needle 数和长度档：「GDM-MRCR v2 (8-needle, 128K)」是常见典型口径。第三方收录显示头部模型在 128K 档 8-needle 已能上 0.9 左右，1M 档明显回落；2-needle 与 8-needle 难度差很多，引用时不可省略档位。',
  caveat: '最大坑是一级两版：GDM 版（eval_hub MRCR v2）和 OpenAI 版（openai/mrcr，2/4/8-needle）同名不同数据、不同判分细节，分数不可互比，引用必须标明版本。OpenAI 版 2025-12-05 出过 v2 修复，此前分数与之后不完全可比。合成数据污染风险低，但「背诗」形式和真实长文本任务有距离。',
  facts: [
    { label: '两个版本', value: 'GDM 版（eval_hub MRCR v2）与 OpenAI 版（2/4/8-needle），同名不同数据' },
    { label: '语料', value: 'GPT-4 合成的多轮对话，针与干扰项同一分布' },
    { label: '计分', value: 'SequenceMatcher 相似度（Mean Match Score），0–1' },
    { label: '硬规则', value: '复述必须带原文随机 hash 前缀，否则该题记 0' },
    { label: '常报口径', value: '8-needle（最难档），按 128K / 1M 等长度分桶' },
  ],
  frontier: {
    value: 91.5,
    note: 'llm-stats MRCR v2（8-needle）榜（2026-08-10）：GPT-5.6 Sol 以 0.915 居首，21 个模型均值仅 0.4；128K 档 8-needle 分榜（2026-07-30）Qwen3.7 Max 为 0.904。均为聚合站收录口径，注意与 GDM 版分数不可混比。',
  },
  history: [
    { date: '2024-09-19', event: 'Google「Michelangelo」论文（arXiv:2409.12640）提出 MRCR，主张长上下文评测要超越大海捞针' },
    { date: '2025', event: 'OpenAI 扩展并开源 openai/mrcr，引入 2/4/8-needle 变体与 hash 前缀规则' },
    { date: '2025-12-05', event: 'OpenAI 版发布 v2 修复；Anthropic 系统卡注明采用修复后版本' },
    { date: '2026', event: '成为 Anthropic、OpenAI 等厂商系统卡里的长上下文标配项，8-needle 为通用最难档' },
  ],
  funFact: '防作弊靠一串随机字符：每次「写诗」前都附一个随机 hash 前缀，复述时不带前缀直接 0 分——模型没法现场再编一首风格差不多的蒙混，因为编得出诗、编不出那串随机前缀。',
  relatedIds: ['graphwalks', 'fiction-livebench'],
  // 分数天梯：2026-08-14 核验。llm-stats MRCR v2（8-needle）榜（2026-08-10，OpenAI 版口径）为主；
  // 同名 GDM 版分数不可混比；llm-registry 收录口径为 GPT-5.4 97.3%（2026-04，历史快照）。
  ladder: [
    { model: 'GPT-5.6 Sol', score: '0.915', note: 'MRCR v2 8-needle，llm-stats 榜第 1，2026-08-10' },
    { model: 'Qwen3.7 Max', score: '0.904', note: 'MRCR v2 8-needle 128K 档分榜，llm-stats，2026-07-30' },
    { model: 'GPT-5.4', score: '97.3%', note: 'MRCR v2 8-needle，llm-registry 收录（历史快照），2026-04' },
    { model: 'Claude Opus 4.6', score: '76%', note: 'MRCR v2 8-needle 1M 档，yage.ai 汇总，2026-03' },
  ],
  traits: ['多轮共指消解', '相似内容辨析', '8-needle 最难档', 'hash 前缀防作弊', 'GDM/OpenAI 两版'],
  openSource: {
    status: 'open',
    url: 'https://github.com/openai/mrcr',
    note: 'OpenAI 版数据与评测代码开源（GitHub openai/mrcr，2/4/8-needle）；GDM 版见 google-deepmind/eval_hub（MRCR v2）',
  },
};
