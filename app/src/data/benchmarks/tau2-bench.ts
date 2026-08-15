import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'tau2-bench',
  name: 'τ²-Bench',
  aliases: ['Tau2-Bench', 'Tau2-Bench（初版）', 'τ²-Bench 行业细分'],
  category: 'agent',
  organizer: 'Sierra Research，τ-bench（arXiv:2406.12045）升级版，τ² 论文 arXiv:2506.07982',
  url: 'https://github.com/sierra-research/tau2-bench',
  oneLiner: '让 AI 当客服，边聊天边按规章办业务',
  what: '模拟真实客服场景，测 AI agent 在多轮对话中调用 API、严格遵守业务政策完成用户请求的能力。覆盖 retail（零售退换货）、airline（机票改签）、telecom（电信故障排查）三个行业域。它最大的特色是「双控环境」：不只 agent 能调用工具改环境，用户模拟器自己也能操作系统——还原了真实客服里「客服指导用户自己动手」的场面。每个域配一份政策文档和一套工具，任务就是各种用户诉求。',
  how: 'agent 拿到政策文档和工具集，与一个由 LLM 扮演的用户多轮对话，通过调用工具修改背后的数据库来办事。判分不看对话说得多漂亮，而是对比对话结束后数据库的最终状态与标准答案状态是否一致（逐条核对预期动作）。主指标是 pass^k：同一个任务连跑 k 次、每次都成功的比例，k 越大越能暴露「会做但不稳定」的问题。',
  examples: '电信域的双控任务最典型：用户手机连不上网，agent 无法远程修好，必须一步步指导用户自己操作——比如开关飞行模式、重置网络设置——用户模拟器会用「用户工具」真实地改变共享环境的状态，agent 说错了步骤就失败。航空域的任务如用户要求改签航班，政策规定某些舱位不能免费改，agent 要先查订座记录、判断资格、再执行改签；零售域则是退货、换货、退款这类订单操作。',
  reading: '这个榜的看点不在 pass^1（头部模型单次成功率已经不低），而在 pass^k 曲线：很多模型跑一次能成，连跑 8 次全对的比例明显下滑，直接量化了客服场景最忌讳的不稳定。论文还做了消融实验：同一个 agent 从「无用户」模式切到双控模式后成功率显著下降，说明「指导用户配合」本身就是难点。',
  caveat: '判分依赖数据库状态精确匹配，任务本身有过勘误：2026-07 发布 v1.0.1 修复 banking_knowledge 域任务错误，官方明确此前版本分数不可与新版本比较。另外用户由 LLM 模拟，模拟器的拟真程度会影响成绩；项目后续演进为含语音、知识检索域的 τ³-bench，注意区分版本。',
  facts: [
    { label: '主办方', value: 'Sierra Research（τ-bench 原班团队）' },
    { label: '任务领域', value: 'retail / airline / telecom；τ³ 新增 banking_knowledge 与语音域' },
    { label: '主指标', value: 'pass^k——同一任务连跑 k 次全成功的比例' },
    { label: '判分方式', value: '对比对话结束后数据库最终状态与标准答案，逐条核对预期动作' },
    { label: '特色机制', value: '双控环境：用户模拟器也能用工具改变共享环境' },
    { label: '官方榜单', value: 'taubench.com，接受外部提交' },
  ],
  frontier: {
    value: null,
    note: '官方榜 taubench.com 按域分别更新 pass^1/pass^k，各域头部不一，未取到可统一核验的当前数值；论文与厂商报告多引用 pass^1。',
  },
  // 分数天梯：2026-08-15 核验。官方榜 taubench.com 为 JS 动态页无法直抓，本表采用
  // BenchLM 来源台账（2026-08-13 核验，143 个已发表结果），多数行为 Artificial Analysis
  // 的 telecom 域实现、少数为官方 telecom 口径，各设置（域/试次/判分指标）不完全一致，
  // 仅作同口径内参考，行间不可直接横比。
  ladder: [
    { model: 'GLM-5.2', score: '99.1%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08；Z.AI 开源权重' },
    { model: 'GPT-5.4', score: '98.9%', note: '官方榜 telecom 口径（经 BenchLM 汇总）2026-08' },
    { model: 'GLM-4.7-Flash', score: '98.8%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08；Z.AI 开源权重' },
    { model: 'Claude Fable 5', score: '98.5%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08' },
    { model: 'Step 3.7 Flash', score: '98.5%', note: '同上；StepFun 开源权重' },
    { model: 'GLM-5', score: '98.2%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08；Z.AI 开源权重' },
    { model: 'GPT-5.5', score: '98.0%', note: '官方榜 telecom 口径（经 BenchLM 汇总）2026-08' },
    { model: 'GLM-5.1', score: '97.7%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08；Z.AI 开源权重' },
    { model: 'Qwen3.6 Plus', score: '97.7%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08' },
    { model: 'Grok 4.3', score: '97.7%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08' },
    { model: 'DeepSeek V4 Pro 0813', score: '96.2%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08' },
    { model: 'Kimi K2.6', score: '95.9%', note: '第三方实测（Artificial Analysis τ²-bench，经 BenchLM 汇总）2026-08；Moonshot 开源权重' },
  ],
  history: [
    { date: '2024-06', event: 'τ-bench 论文发布（arXiv:2406.12045），提出 tool-agent-user 交互评测与 pass^k 指标' },
    { date: '2025-06', event: 'τ²-bench 论文发布（arXiv:2506.07982），新增电信双控域、组合式任务生成器与更拟真的用户模拟器' },
    { date: '2026-03', event: '演进为 τ³-bench：新增 banking_knowledge 知识检索域（约 700 文档）与全双工语音评测' },
    { date: '2026-07', event: 'v1.0.1 评分更新：修复 banking_knowledge 任务错误，官方声明新旧版本分数不可比并重评榜单' },
  ],
  funFact: '名字里的 τ 来自 Tool-Agent-User 三方交互的首字母。升到第三代后名字越来越拗口，官方 README 干脆自嘲：τ³-bench 怎么读？「我们就念 tau three，你随意」。',
  relatedIds: ['acebench'],
  traits: ['多轮客服对话', '双控环境', '政策文档约束', 'pass^k 稳定性指标', '数据库状态判分'],
  openSource: {
    status: 'open',
    url: 'https://github.com/sierra-research/tau2-bench',
    note: '任务集与评测代码开源（GitHub sierra-research/tau2-bench）；官方榜 taubench.com 接受外部提交',
  },
};
