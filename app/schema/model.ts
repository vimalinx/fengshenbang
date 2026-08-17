/**
 * 模型（model）内容 schema。
 *
 * 与 benchmark 的关键差别：模型有 Tier 3 主观打分层，且它被物理隔离到
 * `curation/models/<id>.yml`——不与事实同文件，将来改成社区投票时可整层替换。
 *
 * 三层落地：
 * - Tier 1 事实 + 编排标签 → `content/models/<id>.md` 的 YAML frontmatter
 * - Tier 2 散文考据       → 同文件 Markdown 正文的 6 个固定 H2 小节
 * - Tier 3 主观打分       → `curation/models/<id>.yml`（tier/stars/composite/
 *                           stats/sentiment/radar/danmaku——即用户明确点名的那几项）
 *
 * frontmatter 里刻意把「事实」与「本站编排」分组（specs/scores vs editorial），
 * 让界线在编辑时肉眼可见，而不只是靠注释。
 *
 * 校验刻意放宽的地方（都基于真实数据核对过，强校验会误杀）：
 * - `constellation.date` / `timeline.date` 允许自由文本：真实数据含
 *   「2024-12（估）」「2026-12（预计）」「2026-?」「2026-Q2 末」，
 *   且 timeline 有 259/329 条是无年份的 MM-DD。
 * - 未发布模型 `releaseDate` 为「未发布」、数值字段为占位零值、价格为 null。
 */

import { z } from 'zod';

/* ---------- 基础 ---------- */

const nonEmpty = (label: string) => z.string().trim().min(1, `${label} 不能为空`);

export const modelId = z
  .string()
  .regex(/^[a-z0-9][a-z0-9.-]*$/, 'id 只能用小写字母、数字、点、连字符');

export const systemId = z.enum([
  'gpt', 'claude', 'gemini', 'deepseek', 'qwen', 'kimi',
  'llama', 'mistral', 'glm', 'xai', 'doubao', 'minimax',
]);

export const tierId = z.enum(['T0', 'T1', 'T2', 'T3']);

/** 时间表述：ISO / YYYY-MM / MM-DD / 自由文本（「2026-Q2 末」「2024-12（估）」） */
const dateish = nonEmpty('date');

/** 发布日期：ISO，或未发布模型用的字面「未发布」 */
const releaseDate = z
  .string()
  .refine((s) => s === '未发布' || /^\d{4}-\d{2}-\d{2}$/.test(s), {
    message: 'releaseDate 必须是 YYYY-MM-DD，或未发布模型的「未发布」',
  });

/* ---------- Tier 1：规格与成绩 ---------- */

const specs = z.object({
  contextTokens: z.number().int().min(0),
  contextLabel: nonEmpty('specs.contextLabel'),
  maxOutputTokens: z.number().int().positive().optional(),
  // null = 自部署，无公开单价（llama-4 等）
  priceIn: z.number().min(0).nullable(),
  priceOut: z.number().min(0).nullable(),
  priceLabel: nonEmpty('specs.priceLabel'),
}).strict();

/** 榜单成绩。须能追到 research-addenda/ 的调研笔记。 */
const scores = z.object({
  swe: z.number().min(0).max(100),
  arenaElo: z.number().int().positive().optional(),
  aiderPolyglot: z.number().min(0).max(100).optional(),
  toolCallRate: z.number().min(0).max(100).optional(),
  autonomyHours: z.number().min(0).optional(),
}).strict();

/**
 * 本站编排的标签——不是事实，但也不是打分，故留在 content 里并单独分组。
 * 分组本身就是声明：这三项由编辑决定，欢迎讨论，但别当厂商口径引用。
 */
const editorial = z.object({
  title: nonEmpty('editorial.title'),
  tags: z.array(nonEmpty('editorial.tags[]')).max(3, 'tags 最多 3 个'),
  roles: z.array(z.enum(['代码', '推理', '长文', '多模态', '性价比', '开源', '中文', '速度'])),
}).strict();

/**
 * 基础档案。
 *
 * ⚠ `profile.releaseDate` 与顶层 `releaseDate` 是**两个字段**，不是重复。
 * 迁移时核对发现 42 个模型里有 9 个两者取值不同（deepseek-v3-2、deepseek-v4、
 * gemini-3-pro、glm-5、gpt-5-2、grok-5、kimi-k3、llama-5-maverick、qwen3-max），
 * 差距最大的相隔 9 个月。两者语义尚未厘清（首发日期 vs 站内收录的版本日期？），
 * 故迁移保留两份、不做合并；此处允许自由文本，因为 profile 侧含
 * 「未发布（预计 2026 年底 · 原 Q1/Q2 两度跳票）」这类带说明的表述。
 *
 * 这 9 处不一致是待办的内容问题，需要回到 research-addenda/ 核对后统一口径。
 */
const profile = z.object({
  apiId: nonEmpty('profile.apiId'),
  vendor: nonEmpty('profile.vendor'),
  releaseDate: nonEmpty('profile.releaseDate'),
  access: z.array(nonEmpty('profile.access[]')),
  costNote: nonEmpty('profile.costNote'),
  nicknames: z.array(nonEmpty('profile.nicknames[]')),
  signature: nonEmpty('profile.signature'),
}).strict();

const benchGroup = z.object({
  label: nonEmpty('benchGroups[].label'),
  rows: z
    .array(z.object({ label: nonEmpty('row.label'), value: nonEmpty('row.value') }))
    .min(1),
}).strict();

const constellationNode = z.object({
  version: nonEmpty('constellation[].version'),
  date: dateish,
  effect: nonEmpty('constellation[].effect'),
  current: z.boolean().optional(),
}).strict();

/** 天赋：结构化字段在此，散文 desc 也在此（按条目走，无法拆成 H2 小节） */
const talent = z.object({
  kind: z.enum(['normal', 'skill', 'burst', 'passive']),
  seal: z.string().trim().length(1, 'seal 必须是单个字'),
  name: nonEmpty('talents[].name'),
  desc: nonEmpty('talents[].desc'),
  metric: nonEmpty('talents[].metric'),
}).strict();

const effortBench = z.object({
  levels: z.array(nonEmpty('effortBench.levels[]')).min(1),
  rows: z
    .array(
      z.object({
        name: nonEmpty('effortBench.rows[].name'),
        values: z.array(z.number().nullable()),
        note: z.string().trim().min(1).optional(),
      }),
    )
    .min(1),
}).strict();

/* ---------- Tier 1：社区事实（可核实的引文与热度快照） ---------- */

const platformSentiment = z.object({
  name: nonEmpty('platforms[].name'),
  tone: z.enum(['pos', 'mix', 'neg']),
  summary: nonEmpty('platforms[].summary'),
}).strict();

const communityQuote = z.object({
  text: nonEmpty('quotes[].text'),
  source: nonEmpty('quotes[].source'),
  tone: z.enum(['pos', 'neg']),
}).strict();

const controversy = z.object({
  event: nonEmpty('controversies[].event'),
  response: z.string().trim().min(1).optional(),
}).strict();

const expertQuote = z.object({
  text: nonEmpty('expertQuotes[].text'),
  name: nonEmpty('expertQuotes[].name'),
  role: nonEmpty('expertQuotes[].role'),
  tone: z.enum(['pos', 'mix', 'neg']),
}).strict();

const sourceRef = z.object({
  title: nonEmpty('sources[].title'),
  platform: nonEmpty('sources[].platform'),
  url: z.string().url('sources[].url 必须是合法 URL'),
}).strict();

const community = z.object({
  strengths: z.array(nonEmpty('community.strengths[]')),
  weaknesses: z.array(nonEmpty('community.weaknesses[]')),
  upgradeConsensus: z.enum(['worth', 'wait', 'split']),
  platforms: z.array(platformSentiment).min(1),
  quotes: z.array(communityQuote),
  controversies: z.array(controversy),
  subBoards: z
    .array(
      z.object({
        name: nonEmpty('subBoards[].name'),
        rank: nonEmpty('subBoards[].rank'),
        note: z.string().trim().min(1).optional(),
      }),
    )
    .optional(),
  heat: z
    .array(z.object({ label: nonEmpty('heat[].label'), value: nonEmpty('heat[].value') }))
    .optional(),
  expertQuotes: z.array(expertQuote).optional(),
  timeline: z.array(z.object({ date: dateish, event: nonEmpty('timeline[].event') })).optional(),
  sources: z.array(sourceRef).optional(),
  uncertainties: z.array(nonEmpty('uncertainties[]')).optional(),
  versionDelta: z
    .object({
      base: nonEmpty('versionDelta.base'),
      improves: z.array(nonEmpty('versionDelta.improves[]')),
      regresses: z.array(nonEmpty('versionDelta.regresses[]')),
    })
    .optional(),
  harnessReviews: z
    .array(
      z.object({
        id: nonEmpty('harnessReviews[].id'),
        text: nonEmpty('harnessReviews[].text'),
        placeholder: z.boolean().optional(),
      }),
    )
    .optional(),
  demos: z
    .array(
      z.object({
        title: nonEmpty('demos[].title'),
        desc: nonEmpty('demos[].desc'),
        placeholder: z.boolean().optional(),
      }),
    )
    .optional(),
}).strict();

/** 站内关联。构建期校验这些 id 真实存在。 */
const relations = z.object({
  rivals: z.array(modelId),
  teams: z.array(nonEmpty('relations.teams[]')),
  guides: z.array(nonEmpty('relations.guides[]')),
  bestInSlot: z.array(z.object({ id: nonEmpty('bestInSlot[].id'), note: nonEmpty('bestInSlot[].note') })),
  trialGood: z.array(z.object({ label: nonEmpty('trialGood[].label'), to: nonEmpty('trialGood[].to') })),
  trialBad: z.array(
    z.object({
      label: nonEmpty('trialBad[].label'),
      to: nonEmpty('trialBad[].to'),
      note: z.string().trim().min(1).optional(),
    }),
  ),
}).strict();

/* ---------- frontmatter 全集 ---------- */

export const modelFrontmatter = z
  .object({
    id: modelId,
    name: nonEmpty('name'),
    system: systemId,
    releaseDate,
    collectedDate: z.string().regex(/^\d{2}-\d{2}$/, 'collectedDate 必须是 MM-DD'),
    unreleased: z.boolean().optional(),
    avatar: z.string().trim().min(1).optional(),
    specs,
    scores,
    editorial,
    profile,
    benchGroups: z.array(benchGroup).min(1),
    constellation: z.array(constellationNode).min(1),
    effortBench: effortBench.optional(),
    talents: z.array(talent).min(1),
    community,
    relations,
  })
  .strict()
  .superRefine((m, ctx) => {
    // 未发布模型：数值必须是占位零值，避免出现无信源的臆造数字
    if (m.unreleased) {
      if (m.releaseDate !== '未发布')
        ctx.addIssue({ code: 'custom', path: ['releaseDate'], message: 'unreleased 模型的 releaseDate 应为「未发布」' });
      if (m.scores.swe !== 0)
        ctx.addIssue({ code: 'custom', path: ['scores', 'swe'], message: 'unreleased 模型不得有非零成绩（无信源）' });
    } else if (m.releaseDate === '未发布') {
      ctx.addIssue({ code: 'custom', path: ['releaseDate'], message: 'releaseDate 为「未发布」时必须设 unreleased: true' });
    }
    // 价格标签与数值不能自相矛盾
    if (m.specs.priceIn === null && m.specs.priceOut !== null)
      ctx.addIssue({ code: 'custom', path: ['specs'], message: 'priceIn 为 null（自部署）时 priceOut 也应为 null' });
  });

export type ModelFrontmatter = z.infer<typeof modelFrontmatter>;

/* ---------- Tier 2：散文小节 ---------- */

export const MODEL_PROSE_SECTIONS = [
  { key: 'verdict', heading: '一句话点评', required: true },
  { key: 'notesCoding', heading: '社区反馈 · 编程', required: true },
  { key: 'notesReasoning', heading: '社区反馈 · 推理', required: true },
  { key: 'notesChinese', heading: '社区反馈 · 中文', required: true },
  { key: 'consensusNote', heading: '升级共识', required: true },
  { key: 'benchmarkGap', heading: '榜单与实测落差', required: false },
] as const;

export const modelProse = z.object({
  verdict: nonEmpty('一句话点评'),
  notesCoding: nonEmpty('社区反馈 · 编程'),
  notesReasoning: nonEmpty('社区反馈 · 推理'),
  notesChinese: nonEmpty('社区反馈 · 中文'),
  consensusNote: nonEmpty('升级共识'),
  benchmarkGap: z.string().trim().min(1).optional(),
});

/* ---------- Tier 3：主观打分（curation/，与事实分离） ---------- */

/** 六维体感雷达的固定 10 轴——42 份数据完全一致，故锁定 */
export const RADAR_AXES = [
  '长程任务', '编程工程', '抽象推理', '上下文利用', '中文能力',
  '响应速度', '稳定性', '指令遵循', '易用性', '性价比',
] as const;

export const PLATFORM_IDS = ['reddit', 'hn', 'x', 'zhihu', 'linuxdo', 'v2ex', 'bilibili'] as const;

/**
 * Tier 3：本站主观打分。
 * 范围严格对应用户的决定——tier/stars/composite/stats/sentiment/radar/danmaku。
 * 后续改为社区投票时，整层替换即可，不动 content/ 里的事实。
 */
export const modelCuration = z
  .object({
    id: modelId,
    tier: tierId,
    stars: z.union([z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
    composite: z.number().min(0).max(100),
    stats: z.object({
      code: z.number().int().min(0).max(100),
      reasoning: z.number().int().min(0).max(100),
      context: z.number().int().min(0).max(100),
      speed: z.number().int().min(0).max(100),
      multimodal: z.number().int().min(0).max(100),
      value: z.number().int().min(0).max(100),
    }),
    sentiment: z.object({
      positive: z.number().int().min(0).max(100),
      mixed: z.number().int().min(0).max(100),
      negative: z.number().int().min(0).max(100),
    }),
    radar: z.array(z.object({ axis: z.enum(RADAR_AXES), value: z.number().int().min(0).max(100) })),
    danmaku: z.array(
      z.object({
        text: nonEmpty('danmaku[].text'),
        platform: z.enum(PLATFORM_IDS),
        main: z.boolean(),
      }),
    ),
  })
  .strict()
  .superRefine((c, ctx) => {
    const s = c.sentiment;
    if (s.positive + s.mixed + s.negative !== 100) {
      ctx.addIssue({
        code: 'custom',
        path: ['sentiment'],
        message: `情绪比例三项之和必须为 100，当前 ${s.positive + s.mixed + s.negative}`,
      });
    }
    const axes = c.radar.map((r) => r.axis);
    const missing = RADAR_AXES.filter((a) => !axes.includes(a));
    if (missing.length) {
      ctx.addIssue({ code: 'custom', path: ['radar'], message: `radar 缺少轴：${missing.join('、')}` });
    }
    if (new Set(axes).size !== axes.length) {
      ctx.addIssue({ code: 'custom', path: ['radar'], message: 'radar 有重复的轴' });
    }
  });

export type ModelCuration = z.infer<typeof modelCuration>;

/* ---------- 集合级校验 ---------- */

export interface CollectionIssue {
  file: string;
  message: string;
}

/**
 * 跨文件校验：
 * - content 与 curation 必须一一对应（缺任一侧即报错）
 * - 文件名与 id 一致、id 唯一
 * - relations.rivals 指向真实存在的模型、不自引
 *
 * `knownIds` / `knownCurationIds` 传「目录里的文件名」而非「解析成功的条目」：
 * 否则一个文件校验失败会级联报出一堆「另一侧不存在」，把真正的错误埋掉。
 */
export function validateModelCollection(
  content: { file: string; entry: ModelFrontmatter }[],
  curation: { file: string; entry: ModelCuration }[],
  knownIds: Set<string>,
  knownCurationIds?: Set<string>,
): CollectionIssue[] {
  const issues: CollectionIssue[] = [];
  const seen = new Map<string, string>();

  for (const { file, entry } of content) {
    const prev = seen.get(entry.id);
    if (prev) issues.push({ file, message: `id "${entry.id}" 与 ${prev} 重复` });
    else seen.set(entry.id, file);

    const base = file.replace(/\.md$/, '').split('/').pop();
    if (base && base !== entry.id) {
      issues.push({ file, message: `文件名 "${base}" 与 id "${entry.id}" 不一致` });
    }
  }

  const curationExists = knownCurationIds ?? new Set(curation.map((c) => c.entry.id));
  for (const { file, entry } of content) {
    if (!curationExists.has(entry.id)) {
      issues.push({ file, message: `缺少对应的 curation/models/${entry.id}.yml（Tier 3 打分）` });
    }
    for (const rid of entry.relations.rivals) {
      if (rid === entry.id) issues.push({ file, message: `relations.rivals 不应包含自身` });
      else if (!knownIds.has(rid)) issues.push({ file, message: `relations.rivals 指向不存在的模型 "${rid}"` });
    }
  }

  for (const { file, entry } of curation) {
    if (!knownIds.has(entry.id)) {
      issues.push({ file, message: `curation 存在但没有对应的 content/models/${entry.id}.md` });
    }
    const base = file.replace(/\.ya?ml$/, '').split('/').pop();
    if (base && base !== entry.id) {
      issues.push({ file, message: `文件名 "${base}" 与 id "${entry.id}" 不一致` });
    }
  }

  return issues;
}
