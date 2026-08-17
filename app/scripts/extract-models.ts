/**
 * 一次性迁移：42 个模型的 TS 字面量 → content/models/<id>.md + curation/models/<id>.yml。
 *
 * 数据来自两处：`models.ts` 的卡片层与 `modelDetails.ts` 的详情层，
 * 按三层分级重新落盘：
 *   - Tier 1 事实 + 编排标签 → content frontmatter（分组：specs / scores / editorial / …）
 *   - Tier 2 散文           → content 正文的 6 个 H2 小节
 *   - Tier 3 主观打分       → curation/models/<id>.yml
 *
 * 跑法（需要路径别名与无扩展名导入，故用 vite-node）：
 *   npx vite-node scripts/extract-models.ts
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';
import { models } from '../src/data/models';
import { modelDetails } from '../src/data/modelDetails';
import { MODEL_PROSE_SECTIONS } from '../schema/model';
import { stringifyMatter, stringifySections } from './lib/matter';

const REPO = resolve(import.meta.dirname, '../..');
const CONTENT_DIR = resolve(REPO, 'content/models');
const CURATION_DIR = resolve(REPO, 'curation/models');

/** 去掉 undefined 键，避免 YAML 里出现 `key: null` 噪声 */
function clean<T extends Record<string, unknown>>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

function main() {
  for (const d of [CONTENT_DIR, CURATION_DIR]) if (!existsSync(d)) mkdirSync(d, { recursive: true });

  const problems: string[] = [];
  let n = 0;

  for (const m of models) {
    const detail = modelDetails[m.id];
    if (!detail) {
      problems.push(`${m.id}: 缺少 modelDetails 条目`);
      continue;
    }
    const c = detail.community;
    if (!c) {
      problems.push(`${m.id}: 缺少 community`);
      continue;
    }

    /* ---- Tier 2：散文小节 ---- */
    const noteBy = (label: string) => c.notes.find((x) => x.label === label)?.text ?? '';
    const proseMap: Record<string, string> = {
      verdict: m.verdict,
      notesCoding: noteBy('编程'),
      notesReasoning: noteBy('推理'),
      notesChinese: noteBy('中文'),
      consensusNote: c.consensusNote,
      benchmarkGap: c.benchmarkGap ?? '',
    };
    for (const s of MODEL_PROSE_SECTIONS) {
      if (s.required && !proseMap[s.key]?.trim()) problems.push(`${m.id}: 必填散文「${s.heading}」为空`);
    }

    /* ---- Tier 1：frontmatter ---- */
    const fm = clean({
      id: m.id,
      name: m.name,
      system: m.system,
      releaseDate: m.releaseDate,
      collectedDate: m.collectedDate,
      unreleased: m.unreleased,
      avatar: m.avatar,
      specs: clean({
        contextTokens: m.contextTokens,
        contextLabel: m.contextLabel,
        maxOutputTokens: m.maxOutputTokens,
        priceIn: m.priceIn,
        priceOut: m.priceOut,
        priceLabel: m.priceLabel,
      }),
      scores: clean({
        swe: m.swe,
        arenaElo: m.arenaElo,
        aiderPolyglot: m.aiderPolyglot,
        toolCallRate: m.toolCallRate,
        autonomyHours: m.autonomyHours,
      }),
      editorial: { title: m.title, tags: m.tags, roles: m.roles },
      // profile.releaseDate 保留：它与顶层 releaseDate 并非同一事实
      // （42 个模型里 9 个取值不同，详见 schema/model.ts 的说明）
      profile: detail.profile,
      benchGroups: detail.benchGroups,
      constellation: detail.constellation,
      effortBench: detail.effortBench,
      talents: detail.talents,
      community: clean({
        strengths: c.strengths,
        weaknesses: c.weaknesses,
        upgradeConsensus: c.upgradeConsensus,
        platforms: c.platforms,
        quotes: c.quotes,
        controversies: c.controversies,
        subBoards: c.subBoards,
        heat: c.heat,
        expertQuotes: c.expertQuotes,
        timeline: c.timeline,
        sources: c.sources,
        uncertainties: c.uncertainties,
        versionDelta: c.versionDelta,
        harnessReviews: c.harnessReviews,
        demos: c.demos,
      }),
      relations: {
        rivals: detail.rivalIds,
        teams: detail.teamIds,
        guides: detail.guideIds,
        bestInSlot: detail.bestInSlot,
        trialGood: detail.trialGood,
        trialBad: detail.trialBad,
      },
    });

    const body = stringifySections(
      MODEL_PROSE_SECTIONS.map((s) => ({ heading: s.heading, text: proseMap[s.key] ?? '' })),
    );
    writeFileSync(resolve(CONTENT_DIR, `${m.id}.md`), stringifyMatter(fm, body), 'utf8');

    /* ---- Tier 3：curation ---- */
    const cur = {
      id: m.id,
      tier: m.tier,
      stars: m.stars,
      composite: m.composite,
      stats: m.stats,
      sentiment: c.sentiment,
      radar: c.radar,
      danmaku: c.danmaku,
    };
    const header =
      '# Tier 3 · 本站主观打分——不是事实，不得当实测引用。\n' +
      '# 与 content/models/ 的事实层物理分离，后续计划改为社区投票产生。\n' +
      `# 规则见 app/schema/model.ts 的 modelCuration。\n`;
    writeFileSync(
      resolve(CURATION_DIR, `${m.id}.yml`),
      header + yaml.dump(cur, { lineWidth: 100, noRefs: true, quotingType: '"', sortKeys: false }),
      'utf8',
    );

    n += 1;
  }

  console.log(`已写出 ${n} 个模型 → content/models/ + curation/models/`);
  if (problems.length) {
    console.log(`⚠ ${problems.length} 个问题：`);
    problems.forEach((p) => console.log(`   ${p}`));
  }
}

main();
