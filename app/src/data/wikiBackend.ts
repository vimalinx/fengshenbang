import { benchmarks as shippedBenchmarks, replaceBenchmarks, type BenchmarkEntry } from './benchmarks';
import { modelDetails as shippedDetails, replaceModelDetails, type ModelDetailData } from './modelDetails';
import { models as shippedModels, replaceModels, type Model } from './models';
import { parseWikiBenchmark, parseWikiIndex, parseWikiModel, type WikiIndexItem } from './wikiContract';

export const WIKI_BASE_URL = import.meta.env.VITE_WIKI_BASE_URL || 'https://wiki-staging.fengshenbang.wiki';
export const WIKI_API_URL = import.meta.env.VITE_WIKI_API_URL || `${WIKI_BASE_URL}/w/api.php`;

const fallbackModels = structuredClone(shippedModels) as Model[];
const fallbackDetails = structuredClone(shippedDetails) as Record<string, ModelDetailData>;
const fallbackBenchmarks = structuredClone(shippedBenchmarks) as BenchmarkEntry[];

export interface WikiSnapshot {
  models: Model[];
  modelDetails: Record<string, ModelDetailData>;
  benchmarks: BenchmarkEntry[];
  lastModified: string | null;
  warnings: string[];
}

interface RevisionPage {
  title?: string;
  missing?: boolean;
  revisions?: Array<{
    timestamp?: string;
    slots?: { main?: { content?: string } };
  }>;
}

function apiUrl(apiBase: string, params: Record<string, string>): string {
  const url = new URL(apiBase);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set('format', 'json');
  url.searchParams.set('formatversion', '2');
  url.searchParams.set('origin', '*');
  url.searchParams.set('maxlag', '5');
  return url.toString();
}

async function requestJson(fetchImpl: typeof fetch, url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetchImpl(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Wiki API 返回 HTTP ${response.status}`);
  const payload = await response.json() as Record<string, unknown>;
  if (payload.error) throw new Error(`Wiki API 错误：${JSON.stringify(payload.error)}`);
  return payload;
}

function revisionPages(payload: unknown): RevisionPage[] {
  if (!payload || typeof payload !== 'object') throw new Error('Wiki API 响应不是对象');
  const query = (payload as { query?: unknown }).query;
  if (!query || typeof query !== 'object') throw new Error('Wiki API 响应缺少 query');
  const pages = (query as { pages?: unknown }).pages;
  if (!Array.isArray(pages)) throw new Error('Wiki API 响应缺少 pages');
  return pages as RevisionPage[];
}

async function fetchPages(
  items: WikiIndexItem[],
  apiBase: string,
  fetchImpl: typeof fetch,
  signal?: AbortSignal,
): Promise<Map<string, { content: unknown; timestamp: string | null }>> {
  const byTitle = new Map(items.map((item) => [item.title, item]));
  const result = new Map<string, { content: unknown; timestamp: string | null }>();

  for (let offset = 0; offset < items.length; offset += 50) {
    const batch = items.slice(offset, offset + 50);
    const payload = await requestJson(fetchImpl, apiUrl(apiBase, {
      action: 'query',
      prop: 'revisions',
      rvprop: 'content|timestamp',
      rvslots: 'main',
      titles: batch.map((item) => item.title).join('|'),
    }), signal);
    for (const page of revisionPages(payload)) {
      if (!page.title || page.missing) continue;
      const item = byTitle.get(page.title);
      const revision = page.revisions?.[0];
      const raw = revision?.slots?.main?.content;
      if (!item || !revision || typeof raw !== 'string') continue;
      try {
        result.set(item.id, { content: JSON.parse(raw), timestamp: revision.timestamp ?? null });
      } catch {
        result.set(item.id, { content: null, timestamp: revision.timestamp ?? null });
      }
    }
  }
  return result;
}

function latestTimestamp(values: Array<string | null>): string | null {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1) ?? null;
}

export async function loadWikiSnapshot(options: {
  apiUrl?: string;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal;
} = {}): Promise<WikiSnapshot> {
  const apiBase = options.apiUrl ?? WIKI_API_URL;
  const fetchImpl = options.fetchImpl ?? fetch;
  const indexPayload = await requestJson(fetchImpl, apiUrl(apiBase, {
    action: 'query',
    prop: 'revisions',
    rvprop: 'content|timestamp',
    rvslots: 'main',
    titles: '数据:索引',
  }), options.signal);
  const indexPage = revisionPages(indexPayload)[0];
  const indexRaw = indexPage?.revisions?.[0]?.slots?.main?.content;
  if (typeof indexRaw !== 'string') throw new Error('Wiki 数据索引不存在');
  const index = parseWikiIndex(JSON.parse(indexRaw));

  const [modelPages, benchmarkPages] = await Promise.all([
    fetchPages(index.models, apiBase, fetchImpl, options.signal),
    fetchPages(index.benchmarks, apiBase, fetchImpl, options.signal),
  ]);

  const fallbackModelMap = new Map(fallbackModels.map((model) => [model.id, model]));
  const fallbackBenchmarkMap = new Map(fallbackBenchmarks.map((entry) => [entry.id, entry]));
  const models: Model[] = [];
  const details: Record<string, ModelDetailData> = {};
  const benchmarks: BenchmarkEntry[] = [];
  const warnings: string[] = [];
  const timestamps: Array<string | null> = [indexPage?.revisions?.[0]?.timestamp ?? null];

  for (const item of index.models) {
    const page = modelPages.get(item.id);
    timestamps.push(page?.timestamp ?? null);
    try {
      const parsed = parseWikiModel(page?.content, item.id);
      models.push(parsed.card);
      details[item.id] = parsed.detail;
    } catch (error) {
      const fallback = fallbackModelMap.get(item.id);
      const fallbackDetail = fallbackDetails[item.id];
      if (fallback && fallbackDetail) {
        models.push(fallback);
        details[item.id] = fallbackDetail;
        warnings.push(`${item.id} 使用发布快照：${(error as Error).message}`);
      } else {
        warnings.push(`${item.id} 已跳过：${(error as Error).message}`);
      }
    }
  }

  for (const item of index.benchmarks) {
    const page = benchmarkPages.get(item.id);
    timestamps.push(page?.timestamp ?? null);
    try {
      benchmarks.push(parseWikiBenchmark(page?.content, item.id).entry);
    } catch (error) {
      const fallback = fallbackBenchmarkMap.get(item.id);
      if (fallback) {
        benchmarks.push(fallback);
        warnings.push(`${item.id} 使用发布快照：${(error as Error).message}`);
      } else {
        warnings.push(`${item.id} 已跳过：${(error as Error).message}`);
      }
    }
  }

  if (models.length === 0 || benchmarks.length === 0) throw new Error('Wiki 数据集为空');
  return { models, modelDetails: details, benchmarks, lastModified: latestTimestamp(timestamps), warnings };
}

export function applyWikiSnapshot(snapshot: WikiSnapshot): void {
  replaceModels(snapshot.models);
  replaceModelDetails(snapshot.modelDetails);
  replaceBenchmarks(snapshot.benchmarks);
}

export function wikiPageUrl(title: string, action?: 'edit'): string {
  const url = new URL(`/wiki/${encodeURIComponent(title)}`, WIKI_BASE_URL);
  if (action) url.searchParams.set('action', action);
  return url.toString();
}
