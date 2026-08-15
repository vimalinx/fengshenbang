import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'swe-bench-multilingual',
  name: 'SWE-bench Multilingual',
  aliases: [
    'SWE-Bench Multilingual',
    'SWE-bench Multilingual（初版）',
  ],
  category: 'coding',
  organizer: 'SWE-bench 官方团队（Princeton/Stanford 系），2025',
  url: 'https://www.swebench.com/',
  oneLiner: '多语言版 SWE-bench，专治只会在 Python 里修 bug',
  what: '原版 SWE-bench 全是 Python 项目，很多 agent 框架的工具链都为 Python 深度优化，等于变相「偏科」。Multilingual 把同一套玩法扩展到 9 种语言：C、C++、Go、Java、JavaScript、TypeScript、PHP、Ruby、Rust，共 300 个任务、42 个仓库（注意：完全不含 Python）。仓库选自各语言 GitHub 星数前 100 的项目，覆盖 Web 框架、数据存储与处理工具、核心库等领域；筛选时约三成仓库因为「本地编译不过、构建或跑测试太慢」被直接淘汰。题目刻意控制在 300 个，保证一轮评测跑得起。',
  how: '任务构造、数据格式与评测协议完全复刻 SWE-bench：agent 拿到 issue 描述和修复前的仓库快照，产出补丁；判定用从真实 PR 提取的两组测试——fail-to-pass 确认问题解决，pass-to-pass 确认没有引入回归，报 % Resolved。每题入库前经过完整人工验证：先跑 PR 新增测试确认不改代码确实失败，再打上官方补丁确认全部通过。官网有独立的 Multilingual 分榜。',
  examples: '一道典型任务和 SWE-bench 长得一样，只是换了语言生态：比如某 Go 仓库的用户 issue 描述了一个边界场景下的错误行为，agent 要在完全没见过的 Go 代码库里顺着调用链找到问题函数，写出符合 Go 习惯的补丁，并保证 PR 里新增的 Go 测试从红变绿、原有测试不翻车。任务的难点不只是「会写 Go」，还有读懂该语言的工程惯例（错误处理、接口约定、构建工具链）。',
  reading: '发布时的基线很有说服力：同一套 SWE-agent 框架配 Claude 3.7 Sonnet，在 Multilingual 上只解决 43%，而同一模型在 Python 的 Verified 上是 63%——这 20 个点的落差就是「Python 之外能力打折」的直接量化。分语言看，Rust 任务解决率最高，C/C++ 最低。这个榜的核心用法就是看落差：Verified 很高而 Multilingual 明显低，说明模型的工程能力偏科。',
  caveat: '⚠️ 别和字节跳动的 Multi-SWE-bench（arXiv:2504.02605，7 种语言、1632 个实例）搞混，部分第三方站点把两者数据混写。认准三个特征：300 题、9 语言、SWE-bench 官方团队出品。另外任务量只有 300，分到 9 种语言后每种语言样本不大，单语言的细分排名噪声不小。',
  facts: [
    { label: '题量', value: '300 任务 / 9 种语言 / 42 个仓库（完全不含 Python）' },
    { label: '发布', value: '2025（SWE-bench 官方团队，作者 Kabir Khandpur）' },
    { label: '计分', value: '% Resolved，协议与 SWE-bench 完全一致' },
    { label: '选库', value: '各语言 GitHub 星数 Top 100，约 30% 因构建/测试太慢被淘汰' },
    { label: '数据', value: '公开（HuggingFace，评测代码并入 SWE-bench 官方仓库）' },
  ],
  frontier: {
    value: 43,
    note: '发布基线（2025）：SWE-agent + Claude 3.7 Sonnet 为 43%（同模型 Python 版 Verified 为 63%）；最新榜首以官网 Multilingual 分榜为准。',
  },
  history: [
    { date: '2025-05', event: '由 Kabir Khandpur 与 SWE-bench 团队合作公开发布（300 题 / 9 语言）' },
    { date: '2025', event: '基线测试 Claude 3.7 Sonnet 仅 43%，与 Python 版 63% 的落差引发「偏科」讨论' },
    { date: '2025 起', event: '与字节 Multi-SWE-bench 长期被第三方站点混写，需认准「300 题 / 9 语言 / 官方团队」' },
  ],
  funFact: '出题最大的拦路虎不是找 issue，而是仓库自己「不争气」：候选仓库里约三成因为本地编译不过、构建太慢或测试跑不完被直接淘汰——真实开源世界的工程质量，先给出题人上了一课。',
  // 分数天梯：2026-08-15 核验。口径为 llm-stats 聚合的 9 语言整体 % Resolved（各厂自报/复测混编）。
  ladder: [
    { model: 'Claude Mythos Preview', score: '87.3%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Claude Opus 4.8', score: '84.4%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Laguna S 2.1', score: '78.5%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Qwen3.7 Max', score: '78.3%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Claude Sonnet 5', score: '78.3%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Claude Opus 4.6', score: '77.8%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Kimi K2.6', score: '76.7%', note: 'llm-stats 聚合，2026-08' },
    { model: 'MiniMax M2.7', score: '76.5%', note: 'llm-stats 聚合，2026-08' },
    { model: 'DeepSeek-V4-Pro-Max', score: '76.2%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Qwen3.7-Plus', score: '75.8%', note: 'llm-stats 聚合，2026-08' },
    { model: 'Hy3', score: '75.8%', note: 'llm-stats 聚合，2026-08（腾讯）' },
    { model: 'Qwen3.6 Plus', score: '73.8%', note: 'llm-stats 聚合，2026-08' },
  ],
  traits: ['9 种语言 300 题', '42 个仓库不含 Python', '协议复刻 SWE-bench', '跑 fail-to-pass + pass-to-pass', '专测多语言工程能力'],
  openSource: {
    status: 'open',
    url: 'https://huggingface.co/datasets/Kabir5294/SWE-bench_Multilingual',
    note: '数据集在 HuggingFace（Kabir5294/SWE-bench_Multilingual）公开，评测代码并入 SWE-bench 官方仓库（swe-bench/SWE-bench）',
  },
  relatedIds: ['swe-bench-verified', 'swe-bench-pro'],
};
