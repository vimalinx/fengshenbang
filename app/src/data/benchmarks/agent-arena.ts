import type { BenchmarkEntry } from '../benchmarks';

export const ENTRY: BenchmarkEntry = {
  id: 'agent-arena',
  name: 'Agent Arena',
  aliases: ['Agent Arena 智能体', 'Agentic 三榜（Coding / Browser-Use / Tool-Use）'],
  category: 'agent',
  organizer: 'UC Berkeley Gorilla 团队，2024-10 上线（agent-arena.com）',
  url: 'https://gorilla.cs.berkeley.edu/blogs/14_agent_arena.html',
  oneLiner: '让两个 AI agent 同题对战，用户投票定排名',
  what: 'Chatbot Arena 思路在 agent 上的移植：用户出一道题，两个 agent 各自实跑，用户投票选更好的那个。它的独特之处是把 agent 拆成「模型 + 框架 + 工具」三元组来评——比如 LangChain + Brave-Search + GPT-4o 对阵 LlamaIndex + Wikipedia + Claude-3.5-Sonnet——用扩展的 Bradley-Terry 模型把一场对局的胜负归因到每个子组件上，因此除了 agent 总榜，还能拆出模型榜、工具榜、框架榜。平台还带一个 1,000+ 任务的 prompt hub，可以看到真实用户都在让 agent 干什么。',
  how: '计分是 Elo 式对战评分：每局对战胜负更新双方评分，并用逻辑回归（L2 正则）拟合各子组件对胜负的贡献，避免常见组合搭配带来的混淆。排名实时更新，既能看整体 agent 强弱，也能回答「是不是这个搜索工具拖了后腿」这类问题。',
  examples: '官方博客展示的真实对战：用户给一份去年销售数据 CSV 让 agent 分析该加大哪些产品——GPT-4o + SQL agent 把 CSV 误当 SQLite 数据库报错卡壳，GPT-4o + Pandas DataFrame 则顺利找出畅销的 Laptop、Smartphone 并建议扩产 Headphones。另一例是「规划旧金山到 Carmel-by-the-Sea 的一日游，选最省油且景点最多的路线」，crewAI 旅行规划 agent 与 LangChain 搜索 agent 同题竞技，胜负由用户看谁给的行程更靠谱。',
  reading: '看这个榜的正确姿势是盯子组件榜而不只是总榜：总 Elo 告诉你哪个组合强，子组件分告诉你强在模型还是工具。适合给「我该选什么框架配什么模型」找参考。注意它近年活跃度一般，投票量有限时 Elo 波动较大，排名只能当方向性参考。',
  caveat: '重名重灾区：本站锚定 Berkeley Gorilla 团队这个 Agent Arena，勿与微软 Windows Agent Arena、Android Agent Arena 等同名基准混淆。机制上它是用户投票式评估，主观性强、样本量小，权威性不如执行校验型基准；平台规划中的多轮、私有数据接入等能力多年未完全落地。',
  facts: [
    { label: '机制', value: '两两对战 + 用户投票，用扩展 Bradley-Terry 模型评分' },
    { label: '特色', value: '把胜负归因到模型 / 框架 / 工具子组件，除总榜外还有三张分榜' },
    { label: '配套', value: '1,000+ 真实用户任务的 prompt hub，可看各 agent 的完整执行过程' },
    { label: '上榜组合示例', value: 'LangChain + Brave-Search + GPT-4o 对阵 LlamaIndex + Wikipedia + Claude-3.5-Sonnet' },
    { label: '状态', value: '2024 年上线后近年活跃度一般' },
  ],
  frontier: {
    value: null,
    note: '投票式 Elo 只有相对评分、无绝对分数，且投票量有限时排名波动大；未取到当前可核验的榜首数据。',
  },
  // 分数天梯：官方 Elo 榜（agent-arena.com/leaderboard）按类别出榜，无单一总榜；
  // 以下取规模最大的 Search Engines 类别（gorilla 仓库 elo_ratings_by_category.txt），
  // 榜单最后更新 2024-12-04，此后平台活跃度走低，排名仅作历史参考。
  ladder: [
    { model: 'langchain google-serper（llama-3.1-405B）', score: '1436', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain google-serper（gemini-1.5-pro）', score: '1363', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain brave-search（llama-3.1-70B）', score: '1333', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain brave-search（claude-3-opus）', score: '1259', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain You.com Search（gemini-1.5-pro）', score: '1213', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain google-serper（open-mixtral-8x7b）', score: '1190', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain You.com Search（gpt-4-turbo）', score: '1188', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain google-serper（open-mixtral-8x22b）', score: '1184', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain brave-search（gemini-1.5-pro）', score: '1176', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
    { model: 'langchain brave-search（open-mixtral-8x7b）', score: '1172', note: '官方 Elo 榜·Search Engines 类别，2024-12 最后更新' },
  ],
  traits: ['用户投票式对战（Chatbot Arena 思路移植到 agent）', '按「模型+框架+工具」三元组拆评并附三张子榜', 'Elo 评分 + Bradley-Terry 逻辑回归归因子组件', '1,000+ 真实用户任务 prompt hub', '2024 年后活跃度走低，榜单停留 2024-12'],
  openSource: {
    status: 'open',
    url: 'https://github.com/ShishirPatil/gorilla/tree/main/agent-arena',
    note: '前端、对战记录与 Elo 计算 notebook 均公开在 gorilla 仓库 agent-arena 目录（agent-arena/evalutation），可自行复算',
  },
  history: [
    { date: '2024-09-29', event: 'Berkeley Gorilla 团队发布博客宣布上线 agent-arena.com' },
    { date: '2024-10', event: '平台正式开放，配套 prompt hub 积累真实用户任务' },
    { date: '2024 之后', event: '路线图中的多轮对话、私有数据接入（Jira/GitHub/GSuite）等规划多年未完全落地，活跃度走低' },
  ],
  funFact: '官方博客里有个名场面：同一道「分析销售 CSV 该扩产什么」的题，GPT-4o + SQL agent 把 CSV 误当 SQLite 数据库直接报错卡壳，GPT-4o + Pandas 却顺利给出答案——同一模型换个框架，胜负立判，这正是它要拆子组件评分的原因。',
  relatedIds: ['lmarena'],
};
