/**
 * 攻略数据。
 *
 * 诚信约定：本文件只登记「已撰写」与「待撰写」两种状态，不得出现阅读量、
 * 作者名、发布日期等无法核实的运营指标（这些字段曾以 mock 形式存在，
 * 已于 Phase 0 诚信清洗中移除）。
 *
 * - 已撰写：带 content，可在阅读抽屉里读到正文。
 * - 待撰写（pending）：仅登记选题，正文尚未撰写。这批条目是开放贡献的首批任务，
 *   后续迁入 wiki 后将呈现为红链（未创建条目）。
 *
 * excerpt 只允许出现在已撰写条目上——为不存在的正文写摘要同样属于编造。
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
  /** true = 仅登记选题，正文待撰写 */
  pending?: boolean;
  /** 仅已撰写条目可有 */
  excerpt?: string;
  featured?: boolean;
  content?: GuideSection[];
}

export const guides: Guide[] = [
  /* ---------- 认知（已撰写 1 篇） ---------- */
  {
    id: 'xinfu-vol1',
    title: '上下文工程·第一卷：角色扮演已无意义，任务拆解才是王道',
    category: '认知',
    excerpt: '2026 年的模型早已不需要你扮演巫师。真正拉开差距的，是把任务切成模型不会迷路的形状……',
    featured: true,
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
          '下面这段 AGENTS.md 是一份可直接套用的模板（节选）：',
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
          '1M 上下文不等于 1M 注意力。模型对窗口中段内容的召回率会明显塌落——重要的东西，放两头。',
          '一个可用的输入顺序：开头放红线与验收标准，中间放参考代码，结尾重申一遍「现在要做的是哪一步」。同一份约束，开头结尾各出现一次。',
        ],
      },
      {
        heading: '第三步·验：检查点式提示',
        body: [
          '别让模型一口气跑到终点。每完成一块，让它自己出验收题：「列出你刚才改动可能破坏的三个调用方，并逐一确认。」——模型自检的通过率，高于人类事后的泛泛叮嘱。',
          '检查点越密，回滚越便宜。',
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

  /* ---------- 以下为待撰写选题（开放贡献） ---------- */

  // 入门
  { id: 'beginner-first-model', title: '从零选择你的第一位主力模型', category: '入门', pending: true },
  { id: 'beginner-ladder', title: '读懂梯队榜：T0/T1 到底意味着什么', category: '入门', pending: true },
  { id: 'beginner-harness', title: 'Harness 是什么？给纯聊天用户的装备课', category: '入门', pending: true },
  { id: 'beginner-apikey', title: 'API Key 从申请到入土全流程', category: '入门', pending: true },
  { id: 'beginner-budget', title: '第一站就破产？新手预算红线指南', category: '入门', pending: true },
  { id: 'beginner-env', title: '本地开发环境搭建：Node、Git 与终端入门', category: '入门', pending: true },

  // 机制
  { id: 'mech-context-decay', title: '上下文窗口的隐性衰减：1M 并不等于 1M', category: '机制', pending: true },
  { id: 'mech-toolcall', title: '工具调用成功率横评：八大 Harness', category: '机制', pending: true },
  { id: 'mech-output-token', title: '价格陷阱：输出 Token 才是成本大头', category: '机制', pending: true },
  { id: 'mech-cache', title: '缓存命中玄学：如何让重复上下文打 1 折', category: '机制', pending: true },
  { id: 'mech-schema', title: '结构化输出的尽头是 Schema', category: '机制', pending: true },
  { id: 'mech-rag', title: 'RAG 已死？长窗时代的检索再思考', category: '机制', pending: true },

  // 认知
  { id: 'xinfu-vol2', title: '上下文工程·第二卷：如何写出 Harness 能读懂的 AGENTS.md', category: '认知', pending: true },
  { id: 'xinfu-vol3', title: '上下文工程·第三卷：负面约束的艺术', category: '认知', pending: true },
  { id: 'xinfu-checkpoint', title: '给模型「留作业」：检查点式提示法', category: '认知', pending: true },
  { id: 'xinfu-order', title: '长上下文投喂顺序：重要的放两头', category: '认知', pending: true },
  { id: 'xinfu-less', title: '少即是多：System Prompt 减肥指南', category: '认知', pending: true },

  // 编排
  { id: 'swarm-intro', title: '蜂群流入门：三个 Sonnet 胜过一个 Opus？', category: '编排', pending: true },
  { id: 'review-flow', title: '复核流详解：GPT 审 Claude 的流程', category: '编排', pending: true },
  { id: 'swarm-blackboard', title: '共享记忆黑板：Agent 间如何同步状态', category: '编排', pending: true },
  { id: 'swarm-overseer', title: '评审模型只审不写：权限分离的艺术', category: '编排', pending: true },

  // 实战
  { id: 'case-refactor', title: '长程重构实录：大型代码库迁移记录', category: '实战', pending: true },
  { id: 'case-frontend', title: '前端冲分：从线框图到上线', category: '实战', pending: true },
  { id: 'case-swarm', title: '一人成团：用蜂群流做一个小产品', category: '实战', pending: true },
  { id: 'case-algo', title: '算法周赛登顶记：推理链有多长', category: '实战', pending: true },
];

const CATEGORY_COLOR: Record<GuideCategory, string> = {
  入门: '#52525B',
  机制: '#52525B',
  认知: '#B8860B',
  编排: '#B8860B',
  实战: '#52525B',
};

/** 分类计数由 guides 实算，避免与实际条目数脱节 */
export const guideCategories: { id: GuideCategory; count: number; color: string }[] = (
  ['入门', '机制', '认知', '编排', '实战'] as GuideCategory[]
).map((id) => ({
  id,
  count: guides.filter((g) => g.category === id).length,
  color: CATEGORY_COLOR[id],
}));

/** 已撰写篇数 */
export const guidesWrittenCount = guides.filter((g) => !g.pending).length;
/** 待撰写篇数 */
export const guidesPendingCount = guides.filter((g) => g.pending).length;

/** 排序：已撰写优先，其余保持登记顺序 */
export const guidesSorted: Guide[] = [
  ...guides.filter((g) => !g.pending),
  ...guides.filter((g) => g.pending),
];

export const guideMap: Record<string, Guide> = Object.fromEntries(
  guides.map((g) => [g.id, g]),
);
