import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'cursorbench',
  name: 'CursorBench',
  aliases: [
    'CursorBench 3.2',
  ],
  category: 'coding',
  organizer: 'Cursor / Anysphere（3.0 于 2026-03 随 Composer 2 技术报告披露，3.1 于 2026-07）',
  url: 'https://cursor.com',
  oneLiner: '从真实 Cursor 会话里抽的模糊多文件任务',
  what: 'CursorBench 是 Cursor 的内部评测套件，任务不靠人造，而是从真实 Cursor 生产会话中抽取：用一套叫 Cursor Blame 的方法把已提交的代码回溯到当初那条 agent 请求，天然得到「真实需求 → 真实结果」的配对。题目画像是工程师的日常：模糊需求、多文件改动、monorepo、多工作区环境、查生产日志、盯长时任务，覆盖编辑、重构、修 bug、理解、规划、评审六类，且任务集每隔几个月刷新一次以跟上真实用法、降低背题空间。',
  how: '不按单一总分，而是四个维度打分：解答正确性、代码质量、效率、交互行为，同时记录成本、token 消耗和 agent 步数。线下分数之外还混合线上指标——最典型的是 Keep Rate（用户最终保留 AI 所写代码的比率），并辅以受控的线上实验，专门抓「榜上高分但用户不爱用」的错位。',
  examples: '任务的「真实感」体现在规格模糊：不是「给某个函数修某个 bug」，而是一条开发者口吻的模糊请求，落在一个多文件 monorepo 里，agent 要自己弄清楚该动哪几处、怎么验证。官方称从初版到 3.0，平均任务的代码行数和涉及文件数大约翻了一倍——基准在变难的速度，基本就是真实用户对 agent 要求提高的速度。',
  reading: '分数只有相对意义：Composer 2 技术报告自报 CursorBench 61.3 分；2026-03 有 GPT-5.4 登顶 3.0 的说法；3.2 上 Anthropic 宣称 Opus 5 在 max 档位距榜首 Fable 5 不到 0.5%、且单次任务成本减半。跨版本（3.0/3.1/3.2）口径有演进，数字不能直接串着比。',
  caveat: '任务集不公开、分数全部厂商自报，外部无法独立复现，任何「某模型登顶 CursorBench」的说法追到底都是某家发布材料。它深度绑定 Cursor 自家工作流和 Keep Rate，本质是产品选型工具而非中立的学术榜单。',
  facts: [
    { label: '任务来源', value: '真实 Cursor 生产会话，Cursor Blame 回溯「请求→已提交代码」配对' },
    { label: '当前版本', value: '3.2（3.0 于 2026-03 随 Composer 2 技术报告披露，3.1 于 2026-07）' },
    { label: '计分方式', value: '正确性、代码质量、效率、交互行为四维度 + 成本/token/步数' },
    { label: '配套指标', value: '与线上 Keep Rate（用户保留 AI 代码比率）混合评估' },
    { label: '数据公开性', value: '不公开，厂商内部基准' },
    { label: '刷新频率', value: '任务集每隔几个月刷新，跟随真实开发者用法演变' },
  ],
  frontier: {
    value: 61.3,
    note: 'Composer 2 技术报告自报 61.3 分（2026-03）；此后 3.0 有 GPT-5.4 登顶之说，3.2 榜首为 Fable 5、Anthropic 称 Opus 5 距峰值不到 0.5%——均无公开数值，且跨版本口径有演进。',
  },
  ladder: [
    { model: 'Grok 4.6', score: '70.8%', note: '第三方聚合（BenchLM 镜像 3.2 公开分），2026-08' },
    { model: 'Claude Fable 5', score: '70.5%', note: '厂商自报 3.2（Cursor 发布材料，max 档），2026-07；单任务成本约 $17.32' },
    { model: 'Claude Opus 5', score: '70.0%', note: '厂商自报 3.2（Anthropic 系统卡，max 档），2026-07-24；距 Fable 5 不到 0.5 分、单次成本约一半' },
    { model: 'Claude Opus 5', score: '61.3', note: 'Composer 2 技术报告自报基线（2026-03，口径与 3.2 不可直接比）' },
  ],
  traits: ['真实 Cursor 会话抽取任务', 'Cursor Blame 回溯请求→提交配对', '四维打分（正确性/质量/效率/交互）', '混合线上 Keep Rate 指标', '任务集定期刷新防背题'],
  openSource: {
    status: 'closed',
    note: '任务集不公开、分数全部厂商自报，外部无法独立复现；深度绑定 Cursor 自家工作流与 Keep Rate，是产品选型工具而非中立学术榜单',
  },
  history: [
    { date: '2026-03-12', event: 'GPT-5.4 登顶 CursorBench 的说法见报，该榜首次进入大众视野' },
    { date: '2026-03-26', event: 'Composer 2 技术报告（arXiv:2603.24477）正式介绍 CursorBench，自报 61.3 分' },
    { date: '2026-07', event: '3.1 披露；3.2 上 Fable 5 登顶，Anthropic 称 Opus 5 以一半单次成本逼近峰值' },
    { date: '持续机制', event: '任务集每隔几个月刷新一次，跟随真实开发者用法演变，降低背题空间' },
  ],
  funFact: '它的题目不是人出的，是从自家产品里「考古」出来的：Cursor Blame 把用户仓库里已提交的代码回溯到当初那条 agent 请求，自动得到「真实需求→真实结果」的配对。Cursor 保持内部基准的理由也很坦白：榜一旦公开就会被针对优化，不公开反而是更诚实的信号。',
  relatedIds: ['cc-bench', 'aider-polyglot'],
};
