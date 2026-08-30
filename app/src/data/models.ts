/**
 * 模型图鉴卡片 —— 数据接入层。
 *
 * 内容不再写在本文件里。真身是：
 *   content/models/<id>.md    Tier 1 事实 + Tier 2 散文
 *   curation/models/<id>.yml  Tier 3 主观打分（tier/stars/composite/stats/…）
 * 由 scripts/build-content.ts 校验后拍平成 generated/models.json。
 *
 * 想改一个模型，编辑那两个文件；想加字段，先改 schema/model.ts。
 *
 * 诚信约定：
 * - swe / arenaElo / priceIn / priceOut / contextTokens 等为可核实事实，须有信源。
 * - composite（综合战力）与 stats（六维）是站点主观评估，展示时须标注为站点评分，
 *   不得呈现为实测；后续计划改由社区投票产生。
 * - unreleased = true 的条目数值字段为占位零值，UI 显示「未发布」，不得参与榜单排序。
 */

import rawModels from './generated/models.json';

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
  | 'xai'
  | 'doubao'
  | 'minimax';

export type Tier = 'T0' | 'T1' | 'T2' | 'T3';

export interface ModelStat {
  // 六维均为站点主观评估（0-100），非实测；后续计划改由社区投票产生
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
  composite: number; // 综合战力：站点主观评估，非实测
  verdict: string; // 一句话点评
  stats: ModelStat;
  hasDetail?: boolean;
  unreleased?: boolean; // 未发布：数值字段为占位零值，UI 显示「未发布」
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
  { id: 'doubao', name: '豆包系', color: '#4E86C6', sigil: '/sigil-doubao.svg' },
  { id: 'minimax', name: 'MiniMax 系', color: '#C08A3E', sigil: '/sigil-minimax.svg' },
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

/**
 * 42 条卡片，由 generated/models.json 载入。
 *
 * 这里逐字段展开而非整体断言，是为了留一个编译期守卫：
 * 若生成的 JSON 缺了 Model 要求的字段，此处报错。
 * 联合类型（system/tier/stars）需要收窄——取值本身由构建期 zod 校验保证。
 */
export const models: Model[] = rawModels.map(
  (m): Model => ({
    ...m,
    system: m.system as SystemId,
    tier: m.tier as Tier,
    stars: m.stars as Model['stars'],
  }),
);

export const modelMap: Record<string, Model> = Object.fromEntries(
  models.map((m) => [m.id, m]),
);

/** 模型头像路径（v2 界面改用字母标徽，字段保留兼容） */
export function modelAvatar(m: Model): string {
  return m.avatar ?? systemMap[m.system].sigil;
}

/** 梯队榜：由本文件数值实算排序 */
export const ladderComposite = [...models].sort((a, b) => b.composite - a.composite);
export const ladderCode = [...models].sort((a, b) => b.swe - a.swe);

/**
 * 按发布时间倒序（新→旧），未发布模型排在最后。
 * 本站不设「赛季」或人为的周期轮换——站点的时间锚点就是模型的真实发布日期。
 */
export const modelsByRelease = [...models].sort((a, b) => {
  if (a.unreleased !== b.unreleased) return a.unreleased ? 1 : -1;
  return b.releaseDate.localeCompare(a.releaseDate);
});

/** 最近发布的已发布模型 */
export let latestReleased = modelsByRelease.find((m) => !m.unreleased) ?? models[0];

/**
 * 性价比榜：由 SWE-bench Verified 成绩 ÷ 输出价格（$/Mtok）实算，取前五。
 * 自部署模型（priceOut = null）无公开单价，不参与；未发布模型数值为占位零值，排除。
 * 此前为手工钉死的固定名次（且含一个未收录模型），已于 Phase 0 改为可复现实算。
 */
export const ladderValue: { rank: number; name: string; modelId: string; ratio: number }[] = models
  .filter((m) => !m.unreleased && m.priceOut != null && m.priceOut > 0 && m.swe > 0)
  .map((m) => ({ m, ratio: m.swe / (m.priceOut as number) }))
  .sort((a, b) => b.ratio - a.ratio)
  .slice(0, 5)
  .map(({ m, ratio }, i) => ({ rank: i + 1, name: m.name, modelId: m.id, ratio }));

/**
 * Atomically replace the runtime catalogue after the approved Wiki payload has
 * passed validation.  Arrays and maps are mutated in place so existing imports
 * across the presentation layer keep their references.
 */
export function replaceModels(next: Model[]): void {
  models.splice(0, models.length, ...next);

  for (const key of Object.keys(modelMap)) delete modelMap[key];
  for (const model of next) modelMap[model.id] = model;

  ladderComposite.splice(0, ladderComposite.length, ...[...next].sort((a, b) => b.composite - a.composite));
  ladderCode.splice(0, ladderCode.length, ...[...next].sort((a, b) => b.swe - a.swe));

  const byRelease = [...next].sort((a, b) => {
    if (a.unreleased !== b.unreleased) return a.unreleased ? 1 : -1;
    return b.releaseDate.localeCompare(a.releaseDate);
  });
  modelsByRelease.splice(0, modelsByRelease.length, ...byRelease);
  latestReleased = byRelease.find((model) => !model.unreleased) ?? byRelease[0];

  const byValue = next
    .filter((model) => !model.unreleased && model.priceOut != null && model.priceOut > 0 && model.swe > 0)
    .map((model) => ({ model, ratio: model.swe / (model.priceOut as number) }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 5)
    .map(({ model, ratio }, index) => ({
      rank: index + 1,
      name: model.name,
      modelId: model.id,
      ratio,
    }));
  ladderValue.splice(0, ladderValue.length, ...byValue);
}
