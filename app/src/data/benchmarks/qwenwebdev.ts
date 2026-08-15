import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'qwenwebdev',
  name: 'QwenWebDev',
  aliases: [],
  category: 'coding',
  organizer: '阿里 Qwen 团队（内部基准，随 Qwen3.7-Plus 于 2026 年中披露）',
  oneLiner: 'Qwen 内部的中英双语网页生成打榜，Elo 定高下',
  what: 'Qwen 团队自建的内部前端代码生成基准，测模型「一句话生成网页」的综合质量。覆盖中英双语任务，分 7 个类别：网页设计、Web 应用、游戏、SVG、数据可视化、动画和 3D。它不只看代码能不能跑，还看做出来的东西好不好看、像不像样，因此采用「自动渲染 + 多模态裁判」的评法——把模型生成的页面真实渲染出来，让多模态模型连代码带画面一起评判。',
  how: '评测产出类 Elo 的 BT 评分：模型两两生成的网页被渲染后由多模态 judge 对比裁决，胜负累积成 Elo 分数，分数越高代表综合前端能力越强。整套任务、裁判 prompt 和原始数据均未公开，外界只能看到 Qwen 发布新模型时顺带披露的对比数字。',
  examples: '按类别可以想象典型任务：给一个中文或英文需求，比如「做一个带图表的销售数据看板」「写一个贪吃蛇小游戏」「生成一段加载动画」，模型要直接产出可运行的前端页面。裁判环节会把页面真实渲染成截图，多模态模型同时看代码和渲染效果，判断谁的页面功能更完整、视觉更精致。',
  reading: '分数是 Elo 量级而非百分比，只能相对比较：Qwen3.7-Plus 发布时报 1617 分，第三方追踪站收录的 Qwen3.7 Max 为 1568、Qwen3.6-27B 为 1487。分差比绝对值更有意义——同一口径下高出几十上百分，说明生成质量有可感知的差距。',
  caveat: '典型的厂商内部基准：无独立页面、无公开数据、无第三方复核，裁判模型和对比阵容都由 Qwen 自己定，各代数字只在自家发布语境里可比。注意别与 Qwen Chat 产品里的「Qwen Web Dev」功能混为一谈；它还有个姐妹基准 QwenSVG（SVG 生成）。第三方站上出现的 QwenWebBench 等写法指的是同一个东西。',
  facts: [
    { label: '发布方', value: '阿里 Qwen 团队（内部基准）' },
    { label: '披露时间', value: '2026 年中，随 Qwen3.7-Plus 发布' },
    { label: '任务语言', value: '中英双语' },
    { label: '任务类别', value: '网页设计、Web 应用、游戏、SVG、数据可视化、动画、3D 共 7 类' },
    { label: '评测方式', value: '生成页面自动渲染，多模态 judge 连代码带画面评判' },
    { label: '计分', value: 'BT/Elo 等级分（非百分比）' },
  ],
  frontier: {
    value: null,
    note: '该榜报 Elo 而非 0-100 通过率，无法直接换算：Qwen3.7-Plus 发布时自报 1617（2026-05/06）；第三方 llm-stats 收录 Qwen3.7 Max 1568、Qwen3.6-27B 1487（2026-08）。',
  },
  history: [
    { date: '2026-05/06', event: '随 Qwen3.7-Plus 发布首次披露，自报 Elo 1617' },
    { date: '2026-06', event: 'benchmarklist 等第三方站开始收录各家自报数字（Qwen3.6 Plus 1500 等）' },
    { date: '2026-08', event: 'llm-stats 以「QwenWebBench」名目收录榜单，收录 2 个自报成绩，Qwen3.7 Max 1568 居首' },
  ],
  funFact: '它本质是「网页比美大赛」：Elo 计分意味着没有绝对对错，模型两两生成同一需求的页面，由多模态裁判看渲染效果判胜负、累积等级分。它还有张专考 SVG 生成的「姐妹卷」QwenSVG。最容易搞混的是：Qwen Chat 产品里有个面向用户的「Qwen Web Dev」功能，和这张内部考卷只是同名。',
  relatedIds: ['webdev-arena', 'vibe-code-bench', 'svg-bench'],
  // 分数天梯：2026-08-14 核验。内部基准、Elo 等级分制，仅厂商自报与第三方转引；
  // llm-stats（2026-08）以「QwenWebBench」名目收录 2 个自报成绩。
  ladder: [
    { model: 'Qwen3.7-Plus', score: '1617', note: 'Qwen 自报 Elo，随发布披露（2026-05/06）' },
    { model: 'Qwen3.7 Max', score: '1568', note: 'llm-stats 收录（QwenWebBench 名目），2026-08' },
    { model: 'Qwen3.6-27B', score: '1487', note: 'llm-stats 收录（QwenWebBench 名目），2026-08' },
  ],
  traits: ['中英双语网页生成', '7 类任务', '自动渲染 + 多模态裁判', 'Elo 等级分', '厂商内部基准'],
  openSource: {
    status: 'closed',
    url: 'https://llm-stats.com/benchmarks/qwenwebbench',
    note: '任务集、裁判 prompt 与原始数据均未公开；仅 Qwen 发布新模型时顺带披露对比数字，第三方（llm-stats）转引',
  },
};
