/**
 * 测试集（benchmark）内容 schema。
 *
 * 这是「分层管理」的机制层：Phase 0 把 Tier 1（可核实事实）与 Tier 2（散文考据）
 * 的界线写成了注释与文案约定，本文件把它变成构建期拦得住的校验。
 *
 * 分层落地：
 * - Tier 1 事实 → YAML frontmatter，本文件的 `benchmarkFrontmatter` 校验
 * - Tier 2 散文 → Markdown 正文的 H2 小节，本文件的 `PROSE_SECTIONS` 定义
 * - Tier 3 主观打分 → benchmark 没有这一层（全是事实与散文），故无 curation 文件
 *
 * 校验刻意覆盖 `tsc` 管不到的语义：取值区间、枚举、跨条目引用完整性、
 * 事实必须带出处的场合。日期**不做** ISO 强校验——真实数据里
 * 「2024–2026」「2025 起」「发布以来」是合法的沿革表述（289 条里 34 条如此）。
 */

import { z } from 'zod';

/* ---------- 基础 ---------- */

const nonEmpty = (label: string) => z.string().trim().min(1, `${label} 不能为空`);

/** id：小写字母、数字、连字符（与文件名一致，也是未来 wiki 页名的基础） */
export const benchmarkId = z
  .string()
  .regex(/^[a-z0-9][a-z0-9-]*$/, 'id 只能用小写字母、数字、连字符');

export const benchmarkCategory = z.enum([
  'coding',
  'reasoning',
  'agent',
  'arena',
  'multimodal',
  'other',
]);
export type BenchmarkCategory = z.infer<typeof benchmarkCategory>;

/**
 * 沿革/天梯里的时间表述。
 * 允许 YYYY / YYYY-MM / YYYY-MM-DD 以及自由文本区间（「2024–2026」「2025 起」）。
 * 只拦空值与明显笔误。年份下界取 1900 而非「LLM 时代」——本站收录的
 * AMC(1950)、IMO(1959)、USAMO(1972)、AIME(1983) 等是被复用为 LLM 评测的老牌竞赛。
 */
const dateish = nonEmpty('date').refine(
  (s) => !/^\d+$/.test(s) || (Number(s) >= 1900 && Number(s) <= 2100),
  { message: '纯数字的 date 必须是 1900–2100 的年份' },
);

/* ---------- Tier 1：事实 ---------- */

const factRow = z.object({
  label: nonEmpty('facts[].label'),
  value: nonEmpty('facts[].value'),
});

const historyRow = z.object({
  date: dateish,
  event: nonEmpty('history[].event'),
});

/** 分数天梯一行。score 保留字符串（真实数据含 '96.5%'、'1861'、'63' 等多种量纲） */
const ladderRow = z.object({
  model: nonEmpty('ladder[].model'),
  score: nonEmpty('ladder[].score'),
  note: z.string().trim().min(1).optional(),
});

/** 头部水平。value 为 0-100 的百分制分数，或 null（该榜非百分制/无公开头部值） */
const frontier = z.object({
  value: z.number().min(0).max(100).nullable(),
  note: nonEmpty('frontier.note'),
});

const openSource = z.object({
  status: z.enum(['open', 'partial', 'closed']),
  url: z.string().url('openSource.url 必须是合法 URL').optional(),
  note: z.string().trim().min(1).optional(),
});

/**
 * frontmatter = Tier 1 全集。
 * strict()：出现未定义字段即报错——防止有人把主观打分偷偷塞进事实层。
 */
export const benchmarkFrontmatter = z
  .object({
    id: benchmarkId,
    name: nonEmpty('name'),
    aliases: z.array(nonEmpty('aliases[]')),
    category: benchmarkCategory,
    organizer: nonEmpty('organizer'),
    url: z.string().url('url 必须是合法 URL').optional(),
    facts: z.array(factRow).min(1, 'facts 至少一条——事实层不能是空的'),
    frontier,
    history: z.array(historyRow).min(1, 'history 至少一条'),
    relatedIds: z.array(benchmarkId).optional(),
    ladder: z.array(ladderRow).optional(),
    traits: z.array(nonEmpty('traits[]')),
    openSource,
  })
  .strict();

export type BenchmarkFrontmatter = z.infer<typeof benchmarkFrontmatter>;

/* ---------- Tier 2：散文小节 ---------- */

/**
 * Markdown 正文的 H2 小节 ↔ 数据字段。
 * heading 是贡献者在 wiki 里看到的中文标题，key 是前端消费的字段名。
 */
export const PROSE_SECTIONS = [
  { key: 'oneLiner', heading: '一句话', required: true },
  { key: 'what', heading: '测什么', required: true },
  { key: 'how', heading: '怎么测', required: true },
  { key: 'examples', heading: '典型任务', required: true },
  { key: 'reading', heading: '分数怎么看', required: true },
  { key: 'caveat', heading: '含金量与局限', required: true },
  { key: 'funFact', heading: '冷知识', required: false },
] as const;

export type ProseKey = (typeof PROSE_SECTIONS)[number]['key'];

export const benchmarkProse = z.object({
  oneLiner: nonEmpty('一句话').max(60, '「一句话」应在 60 字内'),
  what: nonEmpty('测什么'),
  how: nonEmpty('怎么测'),
  examples: nonEmpty('典型任务'),
  reading: nonEmpty('分数怎么看'),
  caveat: nonEmpty('含金量与局限'),
  funFact: z.string().trim().min(1).optional(),
});

/* ---------- 合并：一条完整档案 ---------- */

export const benchmarkEntry = benchmarkFrontmatter.merge(benchmarkProse);
export type BenchmarkEntry = z.infer<typeof benchmarkEntry>;

/* ---------- 集合级校验（单条校验管不到的） ---------- */

export interface CollectionIssue {
  file: string;
  message: string;
}

/**
 * 跨条目校验：id 唯一、文件名与 id 一致、relatedIds 不悬空、不自引。
 * 这些是 tsc 与单条 schema 都发现不了的一类错误。
 *
 * `knownIds` 传「目录里所有 .md 文件名」而非「解析成功的条目」：
 * 否则一个文件校验失败会级联报出一堆无关的「relatedIds 悬空」，
 * 把贡献者的注意力从真正的错误上引开。
 */
export function validateBenchmarkCollection(
  entries: { file: string; entry: BenchmarkEntry }[],
  knownIds?: Set<string>,
): CollectionIssue[] {
  const issues: CollectionIssue[] = [];
  const ids = new Map<string, string>();

  for (const { file, entry } of entries) {
    const prev = ids.get(entry.id);
    if (prev) issues.push({ file, message: `id "${entry.id}" 与 ${prev} 重复` });
    else ids.set(entry.id, file);

    const base = file.replace(/\.md$/, '').split('/').pop();
    if (base && base !== entry.id) {
      issues.push({ file, message: `文件名 "${base}" 与 id "${entry.id}" 不一致` });
    }
  }

  const exists = knownIds ?? new Set(ids.keys());
  for (const { file, entry } of entries) {
    for (const rid of entry.relatedIds ?? []) {
      if (rid === entry.id) {
        issues.push({ file, message: `relatedIds 不应包含自身 "${rid}"` });
      } else if (!exists.has(rid)) {
        issues.push({ file, message: `relatedIds 指向不存在的条目 "${rid}"` });
      }
    }
  }

  return issues;
}
