import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'aider-polyglot',
  name: 'Aider Polyglot',
  aliases: [
    'Aider polyglot',
    'Aider-Polyglot（0528）',
    'Aider Polyglot（前代实测/实测）',
  ],
  category: 'coding',
  organizer: 'Aider（Paul Gauthier）',
  url: 'https://aider.chat/docs/leaderboards/',
  oneLiner: '六语言高难度代码编辑考试，来自 Aider 编辑器',
  what: 'AI 编程工具 Aider 的作者做的实战向评测，2024-12 推出，用来接替已经饱和的旧版（旧版 133 道 Python 题被顶尖模型刷到 84%+，榜首之间只差一两题）。从 Exercism 练习平台在 C++、Go、Java、JavaScript、Python、Rust 六种语言下的 697 道题里，只留最难的 225 道。除了考「把题做对」，还考模型能否严格按指定的编辑格式输出改动（diff 还是整文件重写）——后者直接决定 AI 工具能不能把模型的输出可靠地落到代码上，是别的榜不测的实战指标。',
  how: '选题方式本身就是个实验：先让 7 个当时的强模型（Sonnet、o1 Mini、DeepSeek、GPT-4o 等）把 697 题全做一遍，然后只保留「至多 3 个模型做对」的 225 题，确保题目对顶尖模型也有区分度（Java 47、JavaScript 49、Go 39、Python 34、Rust 30、C++ 26）。计分用 pass@2：模型第一次尝试失败后，能看到测试运行的反馈再试一次，两次内做对算过。同时报告编辑格式正确率——输出不符合要求的编辑格式，工具根本没法应用。',
  examples: '题目就是 Exercism 上的高难度练习，比如 Rust 里实现一个需要手写生命周期和错误处理的解析器，或 Java 里实现一个带并发约束的数据结构。过程很像真实结对编程：Aider 把题目要求喂给模型，模型以约定的编辑格式返回代码改动，工具把改动写进文件并跑测试；如果测试挂了，失败输出会回传给模型，让它看着报错再修一次——第二次机会正是 pass@2 里那个「2」。',
  reading: '出题时把难度校准到当时的顶级模型只得 5%–50%（o1 首发成绩 61.7%），留足上升空间。而如今头部模型已到约 88%（gpt-5 high 档 88.0%），这一关在发布不到两年后也接近被攻破。看榜单时两个数字要一起看：正确率之外的「编辑格式正确率」低的模型，在真实工具里往往不好用。',
  caveat: '别和 Aider 旧版的单语言 Python 榜混用，两套题量和计分口径都不一样。另外它是工具作者的「主场」评测：pass@2 的重试机制和编辑格式要求都服务于 Aider 的工作流，分数反映的是「在 Aider 式结对编程里的表现」，外推到其他 agent 框架时要打个折扣。',
  facts: [
    { label: '题量', value: '225 道（从 Exercism 六语言共 697 题中选出最难的）' },
    { label: '语言', value: 'C++ / Go / Java / JavaScript / Python / Rust' },
    { label: '发布', value: '2024-12（Aider 作者 Paul Gauthier）' },
    { label: '计分', value: 'pass@2（失败一次可见测试反馈重试）+ 编辑格式正确率' },
    { label: '难度校准', value: '选题时保证当时顶级模型仅 5%–50%，留足上升空间' },
  ],
  frontier: {
    value: 88,
    note: '官方榜单最高为 gpt-5（high 档）88.0%（2025 年快照）；2024-12 发布时榜首 o1 仅 61.7%，不到两年即逼近天花板。',
  },
  history: [
    { date: '2024 前', event: '旧版单语言 Python 榜（133 题）饱和：Sonnet 84.2%，榜首之间只差一两题' },
    { date: '2024-12-21', event: 'Polyglot 榜发布，o1 以 61.7% 登顶，校准目标 5%–50%' },
    { date: '2025-08', event: 'gpt-5（high 档）达 88.0%，新榜也接近被攻破' },
  ],
  funFact: '它的出题方式是「让模型互卷」：先让 7 个当时的强模型把 697 道题全做一遍，258 道被全员做对的直接扔掉，只保留至多 3 个模型做对的 225 道——考题难度是模型们自己「投票」投出来的。',
  // 分数天梯：2026-08-15 核验。口径为 Aider 官方 Polyglot 榜 pass@2（225 题六语言，2025-08 快照仍为榜首配置）。
  ladder: [
    { model: 'gpt-5 (high)', score: '88.0%', note: '官方榜 pass@2，2025-08' },
    { model: 'gpt-5 (medium)', score: '86.7%', note: '官方榜 pass@2，2025-08' },
    { model: 'o3-pro (high)', score: '84.9%', note: '官方榜 pass@2，2025-08' },
    { model: 'gemini-2.5-pro-preview-06-05 (32k think)', score: '83.1%', note: '官方榜 pass@2，2025-08' },
    { model: 'gpt-5 (low)', score: '81.3%', note: '官方榜 pass@2，2025-08' },
    { model: 'o3 (high)', score: '81.3%', note: '官方榜 pass@2，2025-08' },
    { model: 'grok-4 (high)', score: '79.6%', note: '官方榜 pass@2，2025-08' },
    { model: 'gemini-2.5-pro-preview-06-05 (default think)', score: '79.1%', note: '官方榜 pass@2，2025-08' },
  ],
  traits: ['225 道六语言难题', 'Exercism 高难度题', 'pass@2 允许一次重试', '要求指定编辑格式', '选题由强模型互卷筛出'],
  openSource: {
    status: 'open',
    url: 'https://github.com/Aider-AI/aider',
    note: '评测脚本在 Aider 仓库（Aider-AI/aider）内，题目源自公开的 Exercism 练习平台，榜单在 aider.chat/docs/leaderboards 在线可查',
  },
  relatedIds: ['swe-bench-verified'],
};
