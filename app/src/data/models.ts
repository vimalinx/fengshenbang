/**
 * 模型图鉴数据 — 2026-07-18 赛季 mock
 * 数值风格对齐真实 benchmark 呈现方式，但全部为虚构演示数据。
 */

export type SystemId =
  | 'gpt'
  | 'claude'
  | 'gemini'
  | 'deepseek'
  | 'qwen'
  | 'kimi'
  | 'llama'
  | 'mistral'
  | 'glm'
  | 'xai';

export type Tier = 'T0' | 'T1' | 'T2' | 'T3';

export interface ModelStat {
  code: number; // 代码能力
  reasoning: number; // 推理能力
  context: number; // 长上下文
  speed: number; // 响应速度
  multimodal: number; // 多模态
  value: number; // 性价比
}

export interface Model {
  id: string;
  name: string;
  title: string; // 定位
  system: SystemId;
  tier: Tier;
  stars: 6 | 5 | 4 | 3;
  contextTokens: number;
  contextLabel: string;
  maxOutputTokens?: number;
  priceIn: number | null; // $ / Mtok（null = 自部署）
  priceOut: number | null;
  priceLabel: string;
  swe: number; // SWE-bench Verified %
  arenaElo?: number;
  aiderPolyglot?: number;
  toolCallRate?: number; // %
  autonomyHours?: number;
  releaseDate: string;
  collectedDate: string; // 收录日期 MM-DD
  avatar?: string; // 专属头像；缺省用体系标识
  tags: string[]; // 擅长标签 ≤3
  roles: string[]; // 定位：代码/推理/长文/多模态/性价比/开源/速度/中文
  composite: number; // 综合战力
  verdict: string; // 一句话点评
  stats: ModelStat;
  hasDetail?: boolean;
}

export interface SystemInfo {
  id: SystemId;
  name: string;
  color: string;
  sigil: string;
}

export const systems: SystemInfo[] = [
  { id: 'gpt', name: 'GPT 系', color: '#417878', sigil: '/sigil-gpt.svg' },
  { id: 'claude', name: 'Claude 系', color: '#A56F4A', sigil: '/sigil-claude.svg' },
  { id: 'gemini', name: 'Gemini 系', color: '#5E74BD', sigil: '/sigil-gemini.svg' },
  { id: 'deepseek', name: 'DeepSeek 系', color: '#434E6F', sigil: '/sigil-deepseek.svg' },
  { id: 'qwen', name: 'Qwen 系', color: '#7A5E8F', sigil: '/sigil-qwen.svg' },
  { id: 'kimi', name: 'Kimi 系', color: '#978761', sigil: '/sigil-kimi.svg' },
  { id: 'llama', name: 'Llama 系', color: '#5D8C71', sigil: '/sigil-llama.svg' },
  { id: 'mistral', name: 'Mistral 系', color: '#626B75', sigil: '/sigil-mistral.svg' },
  { id: 'glm', name: 'GLM 系', color: '#4B6E5D', sigil: '/sigil-glm.svg' },
  { id: 'xai', name: 'xAI 系', color: '#99574A', sigil: '/sigil-xai.svg' },
];

export const systemMap: Record<SystemId, SystemInfo> = Object.fromEntries(
  systems.map((s) => [s.id, s]),
) as Record<SystemId, SystemInfo>;

export interface TierInfo {
  id: Tier;
  name: string; // 梯队名
  color: string;
  stars: number;
  sealChar: string; // 徽标字符（与 id 一致）
}

export const tiers: TierInfo[] = [
  { id: 'T0', name: 'T0 梯队', color: '#09090B', stars: 6, sealChar: 'T0' },
  { id: 'T1', name: 'T1 梯队', color: '#52525B', stars: 5, sealChar: 'T1' },
  { id: 'T2', name: 'T2 梯队', color: '#A1A1AA', stars: 4, sealChar: 'T2' },
  { id: 'T3', name: 'T3 梯队', color: '#A1A1AA', stars: 3, sealChar: 'T3' },
];

export const tierMap: Record<Tier, TierInfo> = Object.fromEntries(
  tiers.map((t) => [t.id, t]),
) as Record<Tier, TierInfo>;

export const models: Model[] = [
  {
    id: 'claude-opus-4-7',
    name: 'Claude Opus 4.7',
    title: '长程自治旗舰',
    system: 'claude',
    tier: 'T0',
    stars: 6,
    contextTokens: 1_000_000,
    contextLabel: '1M',
    maxOutputTokens: 128_000,
    priceIn: 8,
    priceOut: 40,
    priceLabel: '$8/$40',
    swe: 82.4,
    arenaElo: 1412,
    aiderPolyglot: 88.1,
    toolCallRate: 96.8,
    autonomyHours: 40,
    releaseDate: '2026-06-02',
    collectedDate: '06-02',
    tags: ['长程自治', '重构', '工具调用'],
    roles: ['代码', '推理', '长文'],
    composite: 96.2,
    verdict: '支持 40 小时级连续自治编码，长程重构场景通过率全场最高。',
    stats: { code: 96, reasoning: 92, context: 90, speed: 68, multimodal: 85, value: 55 },
    hasDetail: true,
  },
  {
    id: 'claude-opus-5',
    name: 'Claude Opus 5',
    title: '推理破局旗舰',
    system: 'claude',
    tier: 'T0',
    stars: 6,
    contextTokens: 1_000_000,
    contextLabel: '1M',
    maxOutputTokens: 128_000,
    priceIn: 5,
    priceOut: 25,
    priceLabel: '$5/$25',
    swe: 96.5,
    releaseDate: '2026-07-24',
    collectedDate: '07-25',
    tags: ['长程任务', '推理', '性价比'],
    roles: ['代码', '推理', '长文'],
    composite: 97.1,
    verdict: 'Benchmark 全面登顶的「ADHD 模型」——分数碾压、体感两极，长程任务全场最佳。',
    stats: { code: 98, reasoning: 97, context: 92, speed: 62, multimodal: 86, value: 78 },
    hasDetail: true,
  },
  {
    id: 'gpt-5-2',
    name: 'GPT-5.2',
    title: '全能旗舰',
    system: 'gpt',
    tier: 'T0',
    stars: 6,
    contextTokens: 800_000,
    contextLabel: '800k',
    maxOutputTokens: 96_000,
    priceIn: 5,
    priceOut: 30,
    priceLabel: '$5/$30',
    swe: 80.1,
    arenaElo: 1405,
    aiderPolyglot: 85.6,
    toolCallRate: 95.2,
    autonomyHours: 24,
    releaseDate: '2026-05-14',
    collectedDate: '05-16',
    tags: ['全能', '多模态', '生态'],
    roles: ['代码', '多模态', '推理'],
    composite: 94.8,
    verdict: '能力面最宽的全能旗舰，多模态与工具生态完整，无明显短板。',
    stats: { code: 94, reasoning: 93, context: 84, speed: 74, multimodal: 95, value: 60 },
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    title: '超长上下文旗舰',
    system: 'gemini',
    tier: 'T0',
    stars: 6,
    contextTokens: 2_000_000,
    contextLabel: '2M',
    maxOutputTokens: 64_000,
    priceIn: 4,
    priceOut: 18,
    priceLabel: '$4/$18',
    swe: 78.9,
    arenaElo: 1398,
    aiderPolyglot: 82.3,
    toolCallRate: 93.6,
    autonomyHours: 18,
    releaseDate: '2026-04-28',
    collectedDate: '05-02',
    tags: ['超长文', '前端', '多模态'],
    roles: ['长文', '多模态', '代码'],
    composite: 93.5,
    verdict: '2M 上下文可整仓吞吐，前端与多模态任务表现突出。',
    stats: { code: 92, reasoning: 88, context: 98, speed: 72, multimodal: 96, value: 72 },
  },
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    title: '均衡主力',
    system: 'claude',
    tier: 'T1',
    stars: 5,
    contextTokens: 500_000,
    contextLabel: '500k',
    maxOutputTokens: 64_000,
    priceIn: 3,
    priceOut: 15,
    priceLabel: '$3/$15',
    swe: 76.3,
    arenaElo: 1372,
    toolCallRate: 94.1,
    autonomyHours: 12,
    releaseDate: '2026-03-20',
    collectedDate: '03-24',
    tags: ['均衡', '蜂群', '日常'],
    roles: ['代码', '性价比'],
    composite: 85.9,
    verdict: '速度与质量均衡，多实例并行时单位成本效率最高。',
    stats: { code: 88, reasoning: 82, context: 76, speed: 82, multimodal: 72, value: 74 },
  },
  {
    id: 'deepseek-v4',
    name: 'DeepSeek-V4',
    title: '高性价比开源主力',
    system: 'deepseek',
    tier: 'T1',
    stars: 5,
    contextTokens: 512_000,
    contextLabel: '512k',
    maxOutputTokens: 64_000,
    priceIn: 0.8,
    priceOut: 2.4,
    priceLabel: '$0.8/$2.4',
    swe: 74.2,
    arenaElo: 1355,
    toolCallRate: 91.8,
    releaseDate: '2026-02-11',
    collectedDate: '02-14',
    tags: ['性价比', '开源', '代码'],
    roles: ['性价比', '开源', '代码'],
    composite: 88.1,
    verdict: '以约十分之一的旗舰价格，提供八成以上的代码能力。',
    stats: { code: 86, reasoning: 84, context: 74, speed: 70, multimodal: 52, value: 97 },
  },
  {
    id: 'grok-5',
    name: 'Grok 5',
    title: '实时检索特化',
    system: 'xai',
    tier: 'T1',
    stars: 5,
    contextTokens: 1_000_000,
    contextLabel: '1M',
    maxOutputTokens: 64_000,
    priceIn: 6,
    priceOut: 24,
    priceLabel: '$6/$24',
    swe: 73.0,
    arenaElo: 1349,
    toolCallRate: 89.4,
    releaseDate: '2026-07-10',
    collectedDate: '07-16',
    tags: ['实时检索', '长文', '高方差'],
    roles: ['长文', '多模态'],
    composite: 86.7,
    verdict: '实时检索能力领先，输出方差较大，建议配置人工复核。',
    stats: { code: 82, reasoning: 85, context: 88, speed: 80, multimodal: 78, value: 58 },
  },
  {
    id: 'kimi-k3',
    name: 'Kimi K3',
    title: '长文档与中文特化',
    system: 'kimi',
    tier: 'T1',
    stars: 5,
    contextTokens: 2_000_000,
    contextLabel: '2M',
    maxOutputTokens: 64_000,
    priceIn: 2,
    priceOut: 10,
    priceLabel: '$2/$10',
    swe: 70.5,
    arenaElo: 1341,
    toolCallRate: 90.2,
    releaseDate: '2026-05-28',
    collectedDate: '06-01',
    tags: ['长文', '文档', '中文'],
    roles: ['长文', '中文'],
    composite: 84.2,
    verdict: '2M 长文与中文文档理解稳定，适合知识密集型任务。',
    stats: { code: 78, reasoning: 80, context: 97, speed: 66, multimodal: 60, value: 82 },
  },
  {
    id: 'qwen3-max',
    name: 'Qwen3-Max',
    title: '开源性价比主力',
    system: 'qwen',
    tier: 'T1',
    stars: 5,
    contextTokens: 256_000,
    contextLabel: '256k',
    maxOutputTokens: 32_000,
    priceIn: 1.2,
    priceOut: 3.6,
    priceLabel: '$1.2/$3.6',
    swe: 72.8,
    arenaElo: 1338,
    toolCallRate: 90.6,
    releaseDate: '2026-06-25',
    collectedDate: '07-10',
    tags: ['性价比', '开源', '中文'],
    roles: ['性价比', '开源', '中文'],
    composite: 83.6,
    verdict: '开源系中性价比最高的通用模型，中文能力扎实。',
    stats: { code: 84, reasoning: 78, context: 62, speed: 72, multimodal: 64, value: 92 },
  },
  {
    id: 'deepseek-r2',
    name: 'DeepSeek-R2',
    title: '深度推理特化',
    system: 'deepseek',
    tier: 'T1',
    stars: 5,
    contextTokens: 256_000,
    contextLabel: '256k',
    maxOutputTokens: 96_000,
    priceIn: 1.5,
    priceOut: 6,
    priceLabel: '$1.5/$6',
    swe: 68.9,
    arenaElo: 1352,
    releaseDate: '2026-07-08',
    collectedDate: '07-14',
    tags: ['推理', '算法', '数学'],
    roles: ['推理', '开源'],
    composite: 82.8,
    verdict: '推理链最深的模型，算法与数学场景首选。',
    stats: { code: 76, reasoning: 98, context: 60, speed: 48, multimodal: 30, value: 88 },
  },
  {
    id: 'gemini-3-flash',
    name: 'Gemini 3 Flash',
    title: '高速轻量',
    system: 'gemini',
    tier: 'T2',
    stars: 4,
    contextTokens: 1_000_000,
    contextLabel: '1M',
    maxOutputTokens: 32_000,
    priceIn: 0.6,
    priceOut: 2.5,
    priceLabel: '$0.6/$2.5',
    swe: 65.1,
    arenaElo: 1302,
    releaseDate: '2026-06-30',
    collectedDate: '07-08',
    tags: ['速度', '杂务', '多模态'],
    roles: ['速度', '性价比', '多模态'],
    composite: 78.5,
    verdict: '延迟最低的多模态模型，适合高频轻量任务。',
    stats: { code: 72, reasoning: 68, context: 86, speed: 96, multimodal: 84, value: 90 },
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    title: '轻量并行单元',
    system: 'claude',
    tier: 'T2',
    stars: 4,
    contextTokens: 200_000,
    contextLabel: '200k',
    maxOutputTokens: 32_000,
    priceIn: 1,
    priceOut: 5,
    priceLabel: '$1/$5',
    swe: 63.4,
    arenaElo: 1294,
    toolCallRate: 92.4,
    releaseDate: '2026-06-20',
    collectedDate: '07-02',
    tags: ['速度', '轻量', '蜂群'],
    roles: ['速度', '性价比'],
    composite: 77.2,
    verdict: '轻量快速，适合作为并行执行的子任务单元。',
    stats: { code: 70, reasoning: 66, context: 54, speed: 94, multimodal: 58, value: 84 },
  },
  {
    id: 'qwen3-coder',
    name: 'Qwen3-Coder',
    title: '开源代码特化',
    system: 'qwen',
    tier: 'T2',
    stars: 4,
    contextTokens: 128_000,
    contextLabel: '128k',
    maxOutputTokens: 32_000,
    priceIn: 0.4,
    priceOut: 1.6,
    priceLabel: '$0.4/$1.6',
    swe: 66.2,
    arenaElo: 1288,
    releaseDate: '2026-05-06',
    collectedDate: '05-10',
    tags: ['代码', '开源', '平民'],
    roles: ['代码', '开源', '性价比'],
    composite: 77.9,
    verdict: '低成本开源代码模型，日常开发足够可靠。',
    stats: { code: 80, reasoning: 64, context: 46, speed: 76, multimodal: 22, value: 95 },
  },
  {
    id: 'glm-5',
    name: 'GLM-5',
    title: '国产 Agent 主力',
    system: 'glm',
    tier: 'T2',
    stars: 4,
    contextTokens: 256_000,
    contextLabel: '256k',
    maxOutputTokens: 32_000,
    priceIn: 0.9,
    priceOut: 2.8,
    priceLabel: '$0.9/$2.8',
    swe: 62.7,
    arenaElo: 1276,
    toolCallRate: 88.9,
    releaseDate: '2026-04-16',
    collectedDate: '04-20',
    tags: ['中文', 'Agent', '国产'],
    roles: ['中文', '性价比'],
    composite: 75.8,
    verdict: '国产模型中工具调用最成熟，中文 Agent 场景稳定。',
    stats: { code: 68, reasoning: 70, context: 66, speed: 70, multimodal: 56, value: 86 },
  },
  {
    id: 'llama-5-maverick',
    name: 'Llama 5 Maverick',
    title: '开源自部署',
    system: 'llama',
    tier: 'T2',
    stars: 4,
    contextTokens: 512_000,
    contextLabel: '512k',
    maxOutputTokens: 32_000,
    priceIn: null,
    priceOut: null,
    priceLabel: '自部署',
    swe: 60.3,
    arenaElo: 1262,
    releaseDate: '2026-03-08',
    collectedDate: '03-12',
    tags: ['开源', '自部署', '隐私'],
    roles: ['开源'],
    composite: 73.4,
    verdict: '可完全自部署的开源模型，数据不出内网。',
    stats: { code: 64, reasoning: 62, context: 70, speed: 62, multimodal: 66, value: 80 },
  },
];

export const modelMap: Record<string, Model> = Object.fromEntries(
  models.map((m) => [m.id, m]),
);

/** 模型头像路径（v2 界面改用字母标徽，字段保留兼容） */
export function modelAvatar(m: Model): string {
  return m.avatar ?? systemMap[m.system].sigil;
}

/** 梯队榜数据（与首页 /models 页共用同一 mock 源） */
export const ladderComposite = [...models].sort((a, b) => b.composite - a.composite);
export const ladderCode = [...models].sort((a, b) => b.swe - a.swe);

/** 性价比榜前五（名次固定 mock，末位「Mistral Large 4」为榜外模型仅展示名） */
export const ladderValue: { rank: number; name: string; modelId?: string }[] = [
  { rank: 1, name: 'DeepSeek-V4', modelId: 'deepseek-v4' },
  { rank: 2, name: 'Qwen3-Max', modelId: 'qwen3-max' },
  { rank: 3, name: 'Gemini 3 Flash', modelId: 'gemini-3-flash' },
  { rank: 4, name: 'Qwen3-Coder', modelId: 'qwen3-coder' },
  { rank: 5, name: 'Mistral Large 4' },
];
