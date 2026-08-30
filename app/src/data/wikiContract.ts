import type { BenchmarkEntry } from './benchmarks';
import type { Model } from './models';
import type { ModelDetailData } from './modelDetails';

export interface WikiIndexItem {
  id: string;
  title: string;
}

export interface WikiDataIndex {
  schemaVersion: 1;
  models: WikiIndexItem[];
  benchmarks: WikiIndexItem[];
}

export interface WikiModelPayload {
  schemaVersion: 1;
  kind: 'model';
  id: string;
  wikiTitle: string;
  card: Model;
  detail: ModelDetailData;
}

export interface WikiBenchmarkPayload {
  schemaVersion: 1;
  kind: 'benchmark';
  id: string;
  wikiTitle: string;
  entry: BenchmarkEntry;
}

const ID_PATTERN = /^[a-z0-9][a-z0-9.-]*$/;
const SYSTEMS = new Set(['gpt', 'claude', 'gemini', 'deepseek', 'qwen', 'kimi', 'llama', 'mistral', 'glm', 'xai', 'doubao', 'minimax']);
const TIERS = new Set(['T0', 'T1', 'T2', 'T3']);
const BENCHMARK_CATEGORIES = new Set(['coding', 'reasoning', 'agent', 'arena', 'multimodal', 'other']);

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} 必须是对象`);
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`${label} 不能为空`);
  return value;
}

function number(value: unknown, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error(`${label} 必须是有限数字`);
  return value;
}

function array(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${label} 必须是数组`);
  return value;
}

function id(value: unknown, label: string): string {
  const parsed = text(value, label);
  if (!ID_PATTERN.test(parsed)) throw new Error(`${label} 格式非法`);
  return parsed;
}

function uniqueIndexItems(value: unknown, label: string, titlePrefix: string): WikiIndexItem[] {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();
  return array(value, label).map((item, index) => {
    const parsed = record(item, `${label}[${index}]`);
    const parsedId = id(parsed.id, `${label}[${index}].id`);
    const title = text(parsed.title, `${label}[${index}].title`);
    if (seenIds.has(parsedId)) throw new Error(`${label} 出现重复 id: ${parsedId}`);
    if (seenTitles.has(title)) throw new Error(`${label} 出现重复 title: ${title}`);
    if (title !== `${titlePrefix}${parsedId}`) throw new Error(`${label} 的 title 与 id 不一致: ${parsedId}`);
    seenIds.add(parsedId);
    seenTitles.add(title);
    return { id: parsedId, title };
  });
}

export function parseWikiIndex(value: unknown): WikiDataIndex {
  const parsed = record(value, '数据索引');
  if (parsed.schemaVersion !== 1) throw new Error('数据索引 schemaVersion 不受支持');
  const models = uniqueIndexItems(parsed.models, 'models', '数据:模型:');
  const benchmarks = uniqueIndexItems(parsed.benchmarks, 'benchmarks', '数据:测试集:');
  if (models.length === 0 || benchmarks.length === 0) throw new Error('数据索引不得为空');
  return { schemaVersion: 1, models, benchmarks };
}

function validateModelCard(value: unknown, expectedId: string): Model {
  const card = record(value, `模型 ${expectedId}.card`);
  if (id(card.id, 'card.id') !== expectedId) throw new Error(`模型 ${expectedId} 的 card.id 不一致`);
  text(card.name, 'card.name');
  text(card.title, 'card.title');
  if (!SYSTEMS.has(text(card.system, 'card.system'))) throw new Error(`模型 ${expectedId} 的 system 非法`);
  if (!TIERS.has(text(card.tier, 'card.tier'))) throw new Error(`模型 ${expectedId} 的 tier 非法`);
  number(card.stars, 'card.stars');
  number(card.contextTokens, 'card.contextTokens');
  number(card.swe, 'card.swe');
  number(card.composite, 'card.composite');
  array(card.tags, 'card.tags');
  array(card.roles, 'card.roles');
  const stats = record(card.stats, 'card.stats');
  for (const key of ['code', 'reasoning', 'context', 'speed', 'multimodal', 'value']) {
    number(stats[key], `card.stats.${key}`);
  }
  return card as unknown as Model;
}

function validateModelDetail(value: unknown, expectedId: string): ModelDetailData {
  const detail = record(value, `模型 ${expectedId}.detail`);
  if (id(detail.modelId, 'detail.modelId') !== expectedId) throw new Error(`模型 ${expectedId} 的 detail.modelId 不一致`);
  record(detail.profile, 'detail.profile');
  array(detail.benchGroups, 'detail.benchGroups');
  array(detail.rivalIds, 'detail.rivalIds');
  array(detail.talents, 'detail.talents');
  array(detail.constellation, 'detail.constellation');
  array(detail.bestInSlot, 'detail.bestInSlot');
  array(detail.teamIds, 'detail.teamIds');
  array(detail.trialGood, 'detail.trialGood');
  array(detail.trialBad, 'detail.trialBad');
  array(detail.guideIds, 'detail.guideIds');
  return detail as unknown as ModelDetailData;
}

export function parseWikiModel(value: unknown, expectedId: string): WikiModelPayload {
  const parsed = record(value, `模型 ${expectedId}`);
  if (parsed.schemaVersion !== 1 || parsed.kind !== 'model') throw new Error(`模型 ${expectedId} 的合同版本非法`);
  if (id(parsed.id, 'id') !== expectedId) throw new Error(`模型 ${expectedId} 的顶层 id 不一致`);
  const wikiTitle = text(parsed.wikiTitle, 'wikiTitle');
  const card = validateModelCard(parsed.card, expectedId);
  const detail = validateModelDetail(parsed.detail, expectedId);
  return { schemaVersion: 1, kind: 'model', id: expectedId, wikiTitle, card, detail };
}

export function parseWikiBenchmark(value: unknown, expectedId: string): WikiBenchmarkPayload {
  const parsed = record(value, `测试集 ${expectedId}`);
  if (parsed.schemaVersion !== 1 || parsed.kind !== 'benchmark') throw new Error(`测试集 ${expectedId} 的合同版本非法`);
  if (id(parsed.id, 'id') !== expectedId) throw new Error(`测试集 ${expectedId} 的顶层 id 不一致`);
  const entry = record(parsed.entry, `测试集 ${expectedId}.entry`);
  if (id(entry.id, 'entry.id') !== expectedId) throw new Error(`测试集 ${expectedId} 的 entry.id 不一致`);
  text(entry.name, 'entry.name');
  if (!BENCHMARK_CATEGORIES.has(text(entry.category, 'entry.category'))) throw new Error(`测试集 ${expectedId} 的 category 非法`);
  text(entry.organizer, 'entry.organizer');
  array(entry.aliases, 'entry.aliases');
  array(entry.facts, 'entry.facts');
  array(entry.history, 'entry.history');
  array(entry.traits, 'entry.traits');
  record(entry.frontier, 'entry.frontier');
  record(entry.openSource, 'entry.openSource');
  for (const key of ['oneLiner', 'what', 'how', 'examples', 'reading', 'caveat']) text(entry[key], `entry.${key}`);
  return {
    schemaVersion: 1,
    kind: 'benchmark',
    id: expectedId,
    wikiTitle: text(parsed.wikiTitle, 'wikiTitle'),
    entry: entry as unknown as BenchmarkEntry,
  };
}
