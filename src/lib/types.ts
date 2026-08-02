/** 双语文案：所有展示文案均为 { zh, en } 结构（见 content/README.md）。 */
export interface LocalizedText {
  zh: string;
  en: string;
}

export const SERIES = [
  "anthropic",
  "openai",
  "google",
  "moonshot",
  "deepseek",
  "zhipu",
  "alibaba",
  "minimax",
  "xai",
  "meta",
  "mistral",
] as const;
export type Series = (typeof SERIES)[number];

export const ROLES = [
  "coding",
  "agent",
  "reasoning",
  "writing",
  "multimodal",
  "long-context",
] as const;
export type Role = (typeof ROLES)[number];

export const WEAPON_TYPES = [
  "cli-agent",
  "ide",
  "plugin",
  "web-agent",
  "framework",
] as const;
export type WeaponType = (typeof WEAPON_TYPES)[number];

export const TEAM_POSITIONS = [
  "main-dps",
  "sub-dps",
  "support",
  "healer",
] as const;
export type TeamPosition = (typeof TEAM_POSITIONS)[number];

export type Rarity = 4 | 5 | 6;

export interface Benchmark {
  name: string;
  score: number;
  unit?: string;
}

export interface Skill {
  name: LocalizedText;
  desc: LocalizedText;
}

export interface Constellation {
  level: number;
  name: LocalizedText;
  desc: LocalizedText;
}

export interface Pricing {
  inputPer1M?: number;
  outputPer1M?: number;
  currency?: string;
}

/** 角色 = 模型小版本（content/characters/<slug>.json）。 */
export interface Character {
  slug: string;
  name: LocalizedText;
  title?: LocalizedText;
  series: Series;
  rarity: Rarity;
  roles?: Role[];
  releaseDate?: string;
  contextWindow?: number;
  pricing?: Pricing;
  benchmarks?: Benchmark[];
  tagline?: LocalizedText;
  lore?: LocalizedText;
  skills?: Skill[];
  constellations?: Constellation[];
  bestWeapons?: string[];
  bestTeams?: string[];
  weaknesses?: LocalizedText;
}

export interface WeaponPassive {
  name: LocalizedText;
  desc: LocalizedText;
}

export interface WeaponStat {
  name: LocalizedText;
  value: string;
}

/** 装备 = Harness / Agent 工具（content/weapons/<slug>.json）。 */
export interface Weapon {
  slug: string;
  name: LocalizedText;
  type: WeaponType;
  rarity: Rarity;
  vendor?: string;
  tagline?: LocalizedText;
  desc?: LocalizedText;
  passive?: WeaponPassive;
  stats?: WeaponStat[];
  bestFor?: string[];
  pricing?: LocalizedText;
}

export interface TeamMember {
  position: TeamPosition;
  character: string;
  weapon?: string;
  note?: LocalizedText;
}

/** 配队 = 场景化组合方案（content/teams/<slug>.json）。 */
export interface Team {
  slug: string;
  name: LocalizedText;
  scenario?: LocalizedText;
  members?: TeamMember[];
  rotation?: LocalizedText;
  budgetAlt?: LocalizedText;
  tierRating?: string;
}

export interface TierEntry {
  tier: string;
  characters: string[];
  comment?: LocalizedText;
}

/** 节奏榜（content/tier-list.json，单文件）。 */
export interface TierList {
  updatedAt?: string;
  note?: LocalizedText;
  tiers: TierEntry[];
}
