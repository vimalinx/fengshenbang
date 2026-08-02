/**
 * 攻略文章数据 — 2026-07 mock
 * 仅《上下文工程·第一卷》内置完整正文，其余文章阅读时显示「内容整理中」占位。
 */

export type GuideCategory = '入门' | '机制' | '认知' | '编排' | '实战';

export interface GuideSection {
  heading: string;
  body: string[]; // 段落
  code?: string; // 代码块
}

export interface Guide {
  id: string;
  title: string;
  category: GuideCategory;
  reads: string; // 展示阅读量
  readsNum: number; // 排序用
  date: string; // MM-DD
  author: string; // 作者
  excerpt?: string;
  featured?: boolean;
  words?: string;
  content?: GuideSection[];
}

export const guideCategories: { id: GuideCategory; count: number; color: string }[] = [
  { id: '入门', count: 18, color: '#52525B' },
  { id: '机制', count: 21, color: '#52525B' },
  { id: '认知', count: 17, color: '#B8860B' },
  { id: '编排', count: 12, color: '#B8860B' },
  { id: '实战', count: 18, color: '#52525B' },
];

export const guides: Guide[] = [
  { id: 'beginner-first-model', title: '从零选择你的第一位主力模型', category: '入门', reads: '24.1k', readsNum: 24100, date: '07-16', author: '引路人' },
  { id: 'beginner-ladder', title: '读懂梯队榜：T0/T1 到底意味着什么', category: '入门', reads: '19.8k', readsNum: 19800, date: '07-12', author: '引路人' },
  { id: 'beginner-harness', title: 'Harness 是什么？给纯聊天用户的装备课', category: '入门', reads: '16.3k', readsNum: 16300, date: '07-08', author: '装备评测员' },
  { id: 'beginner-apikey', title: 'API Key 从申请到入土全流程', category: '入门', reads: '11.2k', readsNum: 11200, date: '07-03', author: '装备评测员' },
  { id: 'beginner-budget', title: '第一站就破产？新手预算红线指南', category: '入门', reads: '10.5k', readsNum: 10500, date: '06-28', author: '成本控' },
  { id: 'mech-context-decay', title: '上下文窗口的隐性衰减：1M 并不等于 1M', category: '机制', reads: '14.7k', readsNum: 14700, date: '07-17', author: '显微镜' },
  { id: 'mech-toolcall', title: '工具调用成功率实测：八大 Harness 横评', category: '机制', reads: '13.9k', readsNum: 13900, date: '07-15', author: '工具评测员', excerpt: 'MCP 与终端工具调用成功率横评：八大 Harness、最长两百步调用链实测，谁在半路掉链子、谁稳如老狗……' },
  { id: 'mech-output-token', title: '价格陷阱：输出 Token 才是成本大头', category: '机制', reads: '12.6k', readsNum: 12600, date: '07-10', author: '成本控' },
  { id: 'mech-cache', title: '缓存命中玄学：如何让重复上下文打 1 折', category: '机制', reads: '9.8k', readsNum: 9800, date: '07-05', author: '显微镜' },
  { id: 'mech-schema', title: '结构化输出的尽头是 Schema', category: '机制', reads: '7.4k', readsNum: 7400, date: '06-29', author: '架构观察员' },
  {
    id: 'xinfu-vol1',
    title: '上下文工程·第一卷：角色扮演已无意义，任务拆解才是王道',
    category: '认知',
    reads: '18.2k',
    readsNum: 18200,
    date: '07-18',
    author: 'prompt 老中医',
    excerpt: '2026 年的模型早已不需要你扮演巫师。真正拉开差距的，是把任务切成模型不会迷路的形状……',
    featured: true,
    words: '4,208 字',
    content: [
      {
        heading: '引子：角色扮演为何失效',
        body: [
          '三年前，「你是资深架构师」曾是提示词的第一行。2026 年的今天，主流旗舰模型的指令遵循早已饱和——你扮演巫师、长老还是程序员的祖师爷，对输出质量的影响已落在统计噪声之内。',
          '真正拉开差距的，从来不是人设，而是任务的形状。模型会在一条没有路标的路上迷路，却几乎不会在一段铺好铁轨的区间出轨。本卷只讲一件事：如何替模型把路修直。',
        ],
      },
      {
        heading: '第一步·切：任务拆解三步',
        body: [
          '拿到一个大任务，先拆三步：目标、边界、验收。目标回答「做完长什么样」，边界回答「什么不许碰」，验收回答「怎么算过」。三步拆完，大任务自然碎成模型一次能吞下的小块。',
          '下面这段 AGENTS.md 是旗舰复核队本赛季的模板（节选）：',
        ],
        code: `# AGENTS.md
## 目标
将订单模块从 REST 迁移至 RPC，对外行为不变。

## 边界（红线）
- 不动数据库 schema
- 不改 public API 签名
- 单文件改动 >300 行必须先报计划

## 验收
- pnpm test:orders 全绿
- 迁移后端到端延迟 P95 不劣化`,
      },
      {
        heading: '第二步·序：输入顺序与上下文衰减',
        body: [
          '1M 上下文不等于 1M 注意力。实测中，模型对窗口中段内容的召回率会明显塌落——重要的东西，放两头。',
          '我们本赛季的输入顺序：开头放红线与验收标准，中间放参考代码，结尾重申一遍「现在要做的是哪一步」。同一份约束，开头结尾各出现一次，命中率提升近四成。',
        ],
      },
      {
        heading: '第三步·验：检查点式提示',
        body: [
          '别让模型一口气跑到终点。每完成一块，让它自己出验收题：「列出你刚才改动可能破坏的三个调用方，并逐一确认。」——模型自检的通过率，远高于人类事后的泛泛叮嘱。',
          '检查点越密，回滚越便宜。90 分钟一个 checkpoint，是本赛季大师层选手的共识节奏。',
        ],
      },
      {
        heading: '结语',
        body: [
          '所谓上下文工程，不过是替模型把路修直。路直了，小模型也能跑到终点；路不直，T0 也会在半路打转。',
        ],
      },
    ],
  },
  { id: 'xinfu-vol2', title: '上下文工程·第二卷：如何写出 Harness 能读懂的 AGENTS.md', category: '认知', reads: '15.7k', readsNum: 15700, date: '07-14', author: 'prompt 老中医', excerpt: 'AGENTS.md 不是许愿池，是给 Harness 读的施工图纸：目标、边界、验收三段式模板逐行讲透，附本赛季旗舰复核队的实战样例……' },
  { id: 'xinfu-vol3', title: '上下文工程·第三卷：负面约束的艺术', category: '认知', reads: '9.4k', readsNum: 9400, date: '07-06', author: 'prompt 老中医' },
  { id: 'xinfu-checkpoint', title: '给模型"留作业"：检查点式提示法', category: '认知', reads: '7.1k', readsNum: 7100, date: '06-30', author: '提示词实验室' },
  { id: 'xinfu-order', title: '长上下文投喂顺序：重要的放两头', category: '认知', reads: '6.8k', readsNum: 6800, date: '06-25', author: '显微镜' },
  { id: 'xinfu-less', title: '少即是多：System Prompt 减肥指南', category: '认知', reads: '5.9k', readsNum: 5900, date: '06-20', author: '提示词实验室' },
  { id: 'swarm-intro', title: '蜂群流入门：三个 Sonnet 胜过一个 Opus？', category: '编排', reads: '11.3k', readsNum: 11300, date: '07-17', author: 'Agent 指挥官' },
  { id: 'review-flow', title: '复核流详解：GPT 审 Claude 的黄金流程', category: '编排', reads: '10.8k', readsNum: 10800, date: '07-13', author: '双模玩家', excerpt: 'Claude 写、GPT 审的黄金流程：双模型槽位怎么排、复核提示词怎么写、两家结论打架时怎么裁决……' },
  { id: 'swarm-blackboard', title: '共享记忆黑板：Agent 间如何同步状态', category: '编排', reads: '6.2k', readsNum: 6200, date: '07-07', author: 'Agent 指挥官' },
  { id: 'swarm-overseer', title: '评审模型只审不写：权限分离的艺术', category: '编排', reads: '5.1k', readsNum: 5100, date: '06-27', author: '双模玩家' },
  { id: 'case-refactor', title: '长程重构实录：40 万行代码库迁移全记录', category: '实战', reads: '16.9k', readsNum: 16900, date: '07-16', author: '重构老司机', excerpt: '40 万行单体仓库迁移全程复盘：90 分钟一个检查点、Opus 主力施工、GPT 复核兜底，七天零回滚是怎么做到的……' },
  { id: 'case-frontend', title: '前端冲分 24 小时：从线框图到上线', category: '实战', reads: '12.2k', readsNum: 12200, date: '07-11', author: '像素强迫症' },
  { id: 'case-swarm', title: '一人成团：我用蜂群流做了个小产品', category: '实战', reads: '8.7k', readsNum: 8700, date: '07-04', author: 'Agent 指挥官' },
  { id: 'case-algo', title: '算法周赛登顶记：R2 的推理链有多长', category: '实战', reads: '7.9k', readsNum: 7900, date: '06-26', author: '计算器成精' },
  // 补足每类（列表 6-8 条用）
  { id: 'beginner-env', title: '本地开发环境搭建：Node、Git 与终端入门', category: '入门', reads: '8.9k', readsNum: 8900, date: '06-22', author: '引路人' },
  { id: 'mech-rag', title: 'RAG 已死？长窗时代的检索再思考', category: '机制', reads: '8.1k', readsNum: 8100, date: '06-24', author: '架构观察员' },
];

export const guideMap: Record<string, Guide> = Object.fromEntries(
  guides.map((g) => [g.id, g]),
);
