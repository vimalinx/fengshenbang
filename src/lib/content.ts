import { cache } from "react";
import fs from "node:fs";
import path from "node:path";
import { SERIES_LABELS } from "./i18n";
import type {
  Character,
  LocalizedText,
  Team,
  TierList,
  Weapon,
} from "./types";

export type { Character, LocalizedText, Team, TierList, Weapon } from "./types";
export type { Benchmark, TeamMember } from "./types";

/** 系列徽章配色（细描边文字徽章，克制低饱和）。 */
export interface SeriesMeta {
  label: LocalizedText;
  badgeClass: string;
}

export const DEFAULT_SERIES_BADGE = "border-white/15 text-muted";

export const SERIES_META: Record<string, SeriesMeta> = Object.fromEntries(
  Object.entries(SERIES_LABELS).map(([key, label]) => [
    key,
    { label, badgeClass: DEFAULT_SERIES_BADGE },
  ]),
);

const CONTENT_ROOT = path.join(process.cwd(), "content");

function isLocalizedText(v: unknown): v is LocalizedText {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as LocalizedText).zh === "string" &&
    typeof (v as LocalizedText).en === "string"
  );
}

/**
 * 读取 content/<dir> 下所有 *.json。
 * 容错是硬要求：目录不存在、文件损坏、字段缺失都不抛错，
 * 只跳过并在构建日志里告警，页面渲染为空状态。
 */
function readJsonDir<T>(
  dir: string,
  validate: (raw: unknown) => T | null,
): T[] {
  const abs = path.join(CONTENT_ROOT, dir);
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(abs)
      .filter((f) => f.endsWith(".json"))
      .sort();
  } catch {
    return [];
  }
  const out: T[] = [];
  for (const file of files) {
    const rel = `${dir}/${file}`;
    try {
      const raw: unknown = JSON.parse(
        fs.readFileSync(path.join(abs, file), "utf8"),
      );
      const parsed = validate(raw);
      if (parsed) {
        out.push(parsed);
      } else {
        console.warn(`[content] skipping invalid file: ${rel}`);
      }
    } catch (err) {
      console.warn(`[content] failed to parse ${rel}:`, err);
    }
  }
  return out;
}

function readJsonFile<T>(
  file: string,
  validate: (raw: unknown) => T | null,
): T | null {
  const abs = path.join(CONTENT_ROOT, file);
  try {
    const raw: unknown = JSON.parse(fs.readFileSync(abs, "utf8"));
    const parsed = validate(raw);
    if (!parsed) console.warn(`[content] skipping invalid file: ${file}`);
    return parsed;
  } catch {
    return null;
  }
}

function hasSlugAndName(v: unknown): v is { slug: string; name: LocalizedText } {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as Character).slug === "string" &&
    isLocalizedText((v as Character).name)
  );
}

function validateCharacter(raw: unknown): Character | null {
  if (!hasSlugAndName(raw)) return null;
  const c = raw as Character;
  if (typeof c.series !== "string" || typeof c.rarity !== "number") return null;
  return c;
}

function validateWeapon(raw: unknown): Weapon | null {
  if (!hasSlugAndName(raw)) return null;
  const w = raw as Weapon;
  if (typeof w.type !== "string" || typeof w.rarity !== "number") return null;
  return w;
}

function validateTeam(raw: unknown): Team | null {
  if (!hasSlugAndName(raw)) return null;
  return raw as Team;
}

function validateTierList(raw: unknown): TierList | null {
  if (
    typeof raw !== "object" ||
    raw === null ||
    !Array.isArray((raw as TierList).tiers)
  ) {
    return null;
  }
  return raw as TierList;
}

export const getCharacters = cache((): Character[] => {
  return readJsonDir("characters", validateCharacter);
});

export const getCharacter = cache(
  (slug: string): Character | undefined =>
    getCharacters().find((c) => c.slug === slug),
);

export const getWeapons = cache((): Weapon[] => {
  return readJsonDir("weapons", validateWeapon);
});

export const getWeapon = cache(
  (slug: string): Weapon | undefined =>
    getWeapons().find((w) => w.slug === slug),
);

export const getTeams = cache((): Team[] => {
  return readJsonDir("teams", validateTeam);
});

export const getTeam = cache(
  (slug: string): Team | undefined =>
    getTeams().find((t) => t.slug === slug),
);

export const getTierList = cache((): TierList | null => {
  return readJsonFile("tier-list.json", validateTierList);
});

/** 按 slug 列表取角色，保持传入顺序，跳过不存在的条目。 */
export function getCharactersBySlugs(slugs?: string[]): Character[] {
  if (!slugs || slugs.length === 0) return [];
  const all = getCharacters();
  return slugs
    .map((s) => all.find((c) => c.slug === s))
    .filter((c): c is Character => Boolean(c));
}

/** 按 slug 列表取装备，保持传入顺序，跳过不存在的条目。 */
export function getWeaponsBySlugs(slugs?: string[]): Weapon[] {
  if (!slugs || slugs.length === 0) return [];
  const all = getWeapons();
  return slugs
    .map((s) => all.find((w) => w.slug === s))
    .filter((w): w is Weapon => Boolean(w));
}

/** 按 slug 列表取配队，保持传入顺序，跳过不存在的条目。 */
export function getTeamsBySlugs(slugs?: string[]): Team[] {
  if (!slugs || slugs.length === 0) return [];
  const all = getTeams();
  return slugs
    .map((s) => all.find((t) => t.slug === s))
    .filter((t): t is Team => Boolean(t));
}

/** 稀有度 → 榜单分桶：6 星 SS、5 星 S、其余 A。 */
export function tierBucket(rarity: number): "SS" | "S" | "A" {
  if (rarity >= 6) return "SS";
  if (rarity === 5) return "S";
  return "A";
}

/** 取角色最高 benchmark 分数，无数据返回 -1。 */
export function topBenchmarkScore(character: Character): number {
  const scores = (character.benchmarks ?? []).map((b) => b.score);
  return scores.length > 0 ? Math.max(...scores) : -1;
}

/** 按实装日期倒序（新→旧），用于「当期 UP 池」。 */
export function sortByReleaseDate(characters: Character[]): Character[] {
  return [...characters].sort((a, b) =>
    (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""),
  );
}

/** 榜单序：稀有度降序 → 最高面板分降序 → slug。 */
export function sortForTierList(characters: Character[]): Character[] {
  return [...characters].sort(
    (a, b) =>
      b.rarity - a.rarity ||
      topBenchmarkScore(b) - topBenchmarkScore(a) ||
      a.slug.localeCompare(b.slug),
  );
}

const TIER_RATING_ORDER = ["SSS", "SS", "S", "A", "B", "C", "D"];

/** 按综合评级排序（S→D，未评级排最后）。 */
export function sortTeamsByRating(teams: Team[]): Team[] {
  const rank = (rating?: string) => {
    const i = TIER_RATING_ORDER.indexOf((rating ?? "").toUpperCase());
    return i === -1 ? TIER_RATING_ORDER.length : i;
  };
  return [...teams].sort(
    (a, b) => rank(a.tierRating) - rank(b.tierRating) || a.slug.localeCompare(b.slug),
  );
}
