/**
 * 配队榜数据 — 赛季 2026-07 第 3 周 mock
 * 「本周配队趋势」使用率与首页侧栏共享同一 mock 源（本文件 teams[].usage）。
 */
import type { Tier } from './models';

export type TeamStyleId = 'fuidu' | 'jieli' | 'fengqun' | 'kuaiman';

export interface TeamMember {
  kind: 'model' | 'harness';
  refId: string; // models.ts / harnesses.ts 的 id
  role: string; // 主C / 辅助 / 装备 / 复核 / 评审 / 杂务 / 长文辅助
  count?: number; // 蜂群同角色数量
}

export interface Team {
  id: string;
  name: string;
  tier: Tier;
  composite: number; // 综合分
  costPerHour: number; // ¥/h
  usage: number; // 本周使用率 %
  change?: 'up' | 'down' | 'new';
  changeNote?: string;
  style: TeamStyleId;
  members: TeamMember[];
  scenarios: string[]; // 适用场景名
  scenarioIds: string[]; // trials.ts id
  strategy: { position: string; rotation: string; keypoint: string }; // 分工/流程/要点
}

export const teams: Team[] = [
  {
    id: 'fengshen-flagship',
    name: '旗舰复核队',
    tier: 'T0',
    composite: 96,
    costPerHour: 58,
    usage: 31,
    style: 'fuidu',
    members: [
      { kind: 'model', refId: 'claude-opus-4-7', role: '主C' },
      { kind: 'harness', refId: 'claude-code', role: '装备' },
      { kind: 'model', refId: 'gpt-5-2', role: '复核' },
    ],
    scenarios: ['长程重构·代码迁移', '全栈交付·产品交付'],
    scenarioIds: ['refactor', 'fullstack'],
    strategy: {
      position: 'Opus 4.7 主 C 运行于 Claude Code 终端，GPT-5.2 待命复核。',
      rotation:
        '主 C 自主推进 2–4h → 自检 → 关键节点（删改 >500 行）交 GPT-5.2 复核 → 意见不合时人类仲裁。',
      keypoint: 'AGENTS.md 必写架构红线；每 90 分钟一次 checkpoint 提交；复核流使返工率 -41%。',
    },
  },
  {
    id: 'galaxy-warship',
    name: '星河战舰',
    tier: 'T0',
    composite: 93,
    costPerHour: 26,
    usage: 24,
    change: 'up',
    changeNote: '本周新晋 T0',
    style: 'kuaiman',
    members: [
      { kind: 'model', refId: 'gemini-3-pro', role: '主C' },
      { kind: 'harness', refId: 'cursor', role: '装备' },
      { kind: 'model', refId: 'gemini-3-flash', role: '杂务' },
    ],
    scenarios: ['前端开发·前端冲分', '文档写作·知识沉淀'],
    scenarioIds: ['frontend', 'docs'],
    strategy: {
      position: '3 Pro 驱动 Cursor，Flash 处理命名、注释、小修小补。',
      rotation: '设计稿/截图直喂 3 Pro（2M 上下文整仓吞）→ 组件级生成 → Flash 收尾 polish。',
      keypoint: '多模态直读截图是关键；杂务分流使成本 -38%。',
    },
  },
  {
    id: 'budget-vanguard',
    name: '性价比先锋',
    tier: 'T1',
    composite: 89,
    costPerHour: 6,
    usage: 18,
    style: 'kuaiman',
    members: [
      { kind: 'model', refId: 'deepseek-v4', role: '主C' },
      { kind: 'harness', refId: 'cline', role: '装备' },
    ],
    scenarios: ['算法竞赛·竞赛刷题', '日常开发'],
    scenarioIds: ['algo'],
    strategy: {
      position: 'DeepSeek-V4 单核驱动 Cline，无需辅助，配置极简。',
      rotation: '计划态出方案 → 人类过目 → 执行态动手，双态严格分开。',
      keypoint: '预算上限锁 $2/任务；约十分之一的价格打出八成以上的能力。',
    },
  },
  {
    id: 'puppet-workshop',
    name: '蜂群工坊',
    tier: 'T1',
    composite: 86,
    costPerHour: 22,
    usage: 9,
    change: 'new',
    changeNote: '本周进榜',
    style: 'fengqun',
    members: [
      { kind: 'model', refId: 'claude-sonnet-4-6', role: '主力', count: 3 },
      { kind: 'harness', refId: 'openhands', role: '装备' },
      { kind: 'model', refId: 'claude-opus-4-7', role: '评审' },
    ],
    scenarios: ['Agent 开发·多 Agent 编排'],
    scenarioIds: ['agent'],
    strategy: {
      position: '三个 Sonnet 实例分领模块并行，Opus 只做 Code Review。',
      rotation: '任务切分 → 三实例并行推进 → 共享黑板同步 → Opus 收口验收。',
      keypoint: '蜂群流核心是任务切分正交，冲突率 <5% 才放行。',
    },
  },
  {
    id: 'twin-swords',
    name: '双模接力队',
    tier: 'T1',
    composite: 87,
    costPerHour: 18,
    usage: 7,
    change: 'down',
    changeNote: '降至 T1',
    style: 'jieli',
    members: [
      { kind: 'model', refId: 'gpt-5-2', role: '主C' },
      { kind: 'harness', refId: 'aider', role: '装备' },
      { kind: 'model', refId: 'kimi-k3', role: '长文辅助' },
    ],
    scenarios: ['文档写作·知识沉淀', '全栈交付·产品交付'],
    scenarioIds: ['docs', 'fullstack'],
    strategy: {
      position: 'Kimi K3 先读长文出摘要，GPT-5.2 据摘要执行，Aider 落成 commit。',
      rotation: 'Kimi 读 2M 文档 → 输出摘要 → GPT 精炼执行 → Aider 提交归档。',
      keypoint: '接力流省 55% 上下文费；摘要质量决定成败，样章先行。',
    },
  },
  {
    id: 'common-warlord',
    name: '平民战神',
    tier: 'T2',
    composite: 82,
    costPerHour: 4,
    usage: 6,
    style: 'kuaiman',
    members: [
      { kind: 'model', refId: 'qwen3-max', role: '主C' },
      { kind: 'harness', refId: 'aider', role: '装备' },
    ],
    scenarios: ['日常开发', '学习练功'],
    scenarioIds: [],
    strategy: {
      position: 'Qwen3-Max 独立承担，Aider 配合提交，极简配置。',
      rotation: '日常任务直接推进，大任务先出计划再动手。',
      keypoint: '开源自部署可压至 ¥0（电费自理）。',
    },
  },
  {
    id: 'wild-ranger',
    name: '检索先锋',
    tier: 'T2',
    composite: 79,
    costPerHour: 15,
    usage: 5,
    style: 'kuaiman',
    members: [
      { kind: 'model', refId: 'grok-5', role: '主C' },
      { kind: 'harness', refId: 'zed', role: '装备' },
    ],
    scenarios: ['实时检索驱动开发'],
    scenarioIds: [],
    strategy: {
      position: 'Grok 5 负责实时检索，Zed AI 承担高速编辑。',
      rotation: '实时检索 → 结果直读 → 快速试错迭代。',
      keypoint: '实时检索是强项，但高方差输出需人工复核。',
    },
  },
];

export const teamMap: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.id, t]),
);

export interface TeamStyle {
  id: TeamStyleId;
  name: string;
  desc: string;
  buff: string;
  repTeam: string; // 代表队名
  bonus: number; // 配队模拟器双模型协作模式加成
}

export const teamStyles: TeamStyle[] = [
  {
    id: 'fuidu',
    name: '复核流',
    desc: '双模型交叉验证，一攻一审。',
    buff: '返工率 -41% · 成本 +30%',
    repTeam: '旗舰复核队',
    bonus: 10,
  },
  {
    id: 'jieli',
    name: '接力流',
    desc: '长文模型先读摘要，旗舰模型据要而动。',
    buff: '上下文费 -55%',
    repTeam: '双模接力队',
    bonus: 8,
  },
  {
    id: 'fengqun',
    name: '蜂群流',
    desc: '多实例并行切分任务，评审收口。',
    buff: '吞吐 ×3 · 需正交切分',
    repTeam: '蜂群工坊',
    bonus: 12,
  },
  {
    id: 'kuaiman',
    name: '快慢流',
    desc: '旗舰规划、廉价执行，好钢用在刀刃。',
    buff: '成本 -38%',
    repTeam: '星河战舰',
    bonus: 9,
  },
];
