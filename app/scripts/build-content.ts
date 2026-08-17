/**
 * 内容构建：content/ + curation/ → app/src/data/generated/*.json，并在构建期强制校验。
 *
 * 这是「分层管理」的闸门。跑法（无需 tsx，Node ≥23 内置 TS 剥离）：
 *   node scripts/build-content.ts          # 构建 + 校验
 *   node scripts/build-content.ts --check  # 只校验，不写文件（CI 用）
 *
 * 任何一条校验不过即非零退出——违规内容进不了构建，也进不了线上。
 *
 * 内容目录（人编辑的真身）与生成目录（前端消费的形状）刻意解耦：
 * frontmatter 按「便于人看清分层」分组（specs / scores / editorial / …），
 * 生成的 JSON 则拍平成前端既有的扁平形状，因此前端代码无需跟着内容结构变。
 *
 * Phase 3 的 Cargo ETL 会替换本脚本的「读取」部分，输出格式保持不变。
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';
import {
  benchmarkFrontmatter,
  benchmarkProse,
  validateBenchmarkCollection,
  PROSE_SECTIONS,
  type BenchmarkEntry,
} from '../schema/benchmark.ts';
import {
  modelFrontmatter,
  modelProse,
  modelCuration,
  validateModelCollection,
  MODEL_PROSE_SECTIONS,
  type ModelFrontmatter,
  type ModelCuration,
} from '../schema/model.ts';
import { parseMatter, parseSections } from './lib/matter.ts';

const ROOT = resolve(import.meta.dirname, '..');
const REPO = resolve(ROOT, '..');
const OUT = resolve(ROOT, 'src/data/generated');

const CHECK_ONLY = process.argv.includes('--check');

interface Issue {
  file: string;
  message: string;
}

const issues: Issue[] = [];
const fail = (file: string, message: string) => issues.push({ file, message });

function zodLines(err: { issues: { path: (string | number | symbol)[]; message: string }[] }): string[] {
  return err.issues.map((i) => {
    const p = i.path.map(String).join('.');
    return p ? `${p}: ${i.message}` : i.message;
  });
}

/** 读一个 Markdown 目录：解析 frontmatter + 按 H2 小节切正文 */
function readMarkdownDir(
  dirRel: string,
  sections: readonly { key: string; heading: string; required: boolean }[],
): { file: string; data: Record<string, unknown>; prose: Record<string, string> }[] {
  const dir = resolve(REPO, dirRel);
  if (!existsSync(dir)) {
    fail(dirRel, '目录不存在');
    return [];
  }
  const known = new Set<string>(sections.map((s) => s.heading));
  const out: { file: string; data: Record<string, unknown>; prose: Record<string, string> }[] = [];

  for (const f of readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
    const rel = `${dirRel}/${f}`;
    let data: Record<string, unknown>;
    let body: string;
    try {
      ({ data, body } = parseMatter(readFileSync(resolve(dir, f), 'utf8')));
    } catch (e) {
      fail(rel, (e as Error).message);
      continue;
    }

    let parsed: Map<string, string>;
    try {
      parsed = parseSections(body);
    } catch (e) {
      fail(rel, (e as Error).message);
      continue;
    }
    for (const heading of parsed.keys()) {
      if (!known.has(heading)) {
        fail(rel, `未知小节「## ${heading}」——允许的小节：${[...known].join(' / ')}`);
      }
    }

    const prose: Record<string, string> = {};
    for (const s of sections) {
      const text = parsed.get(s.heading);
      if (text) prose[s.key] = text;
      else if (s.required) fail(rel, `缺少必填小节「## ${s.heading}」`);
    }
    out.push({ file: rel, data, prose });
  }
  return out;
}

/* ---------- benchmarks ---------- */

function loadBenchmarks(): BenchmarkEntry[] {
  const dirRel = 'content/benchmarks';
  const dir = resolve(REPO, dirRel);
  const knownIds = existsSync(dir)
    ? new Set(readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')))
    : new Set<string>();

  const loaded: { file: string; entry: BenchmarkEntry }[] = [];
  for (const { file, data, prose } of readMarkdownDir(dirRel, PROSE_SECTIONS)) {
    const fm = benchmarkFrontmatter.safeParse(data);
    if (!fm.success) {
      zodLines(fm.error).forEach((m) => fail(file, m));
      continue;
    }
    const pr = benchmarkProse.safeParse(prose);
    if (!pr.success) {
      zodLines(pr.error).forEach((m) => fail(file, m));
      continue;
    }
    loaded.push({ file, entry: { ...fm.data, ...pr.data } });
  }
  validateBenchmarkCollection(loaded, knownIds).forEach((i) => fail(i.file, i.message));

  const ORDER = ['coding', 'reasoning', 'agent', 'arena', 'multimodal', 'other'];
  return [...loaded]
    .sort((a, b) => {
      const d = ORDER.indexOf(a.entry.category) - ORDER.indexOf(b.entry.category);
      return d !== 0 ? d : a.entry.id.localeCompare(b.entry.id);
    })
    .map((x) => x.entry);
}

/* ---------- models ---------- */

function loadCuration(): { file: string; entry: ModelCuration }[] {
  const dirRel = 'curation/models';
  const dir = resolve(REPO, dirRel);
  if (!existsSync(dir)) {
    fail(dirRel, '目录不存在');
    return [];
  }
  const out: { file: string; entry: ModelCuration }[] = [];
  for (const f of readdirSync(dir).filter((x) => /\.ya?ml$/.test(x)).sort()) {
    const rel = `${dirRel}/${f}`;
    let raw: unknown;
    try {
      raw = yaml.load(readFileSync(resolve(dir, f), 'utf8'));
    } catch (e) {
      fail(rel, (e as Error).message);
      continue;
    }
    const parsed = modelCuration.safeParse(raw);
    if (!parsed.success) {
      zodLines(parsed.error).forEach((m) => fail(rel, m));
      continue;
    }
    out.push({ file: rel, entry: parsed.data });
  }
  return out;
}

function loadModels() {
  const dirRel = 'content/models';
  const dir = resolve(REPO, dirRel);
  const knownIds = existsSync(dir)
    ? new Set(readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')))
    : new Set<string>();

  const content: { file: string; entry: ModelFrontmatter; prose: Record<string, string> }[] = [];
  for (const { file, data, prose } of readMarkdownDir(dirRel, MODEL_PROSE_SECTIONS)) {
    const fm = modelFrontmatter.safeParse(data);
    if (!fm.success) {
      zodLines(fm.error).forEach((m) => fail(file, m));
      continue;
    }
    const pr = modelProse.safeParse(prose);
    if (!pr.success) {
      zodLines(pr.error).forEach((m) => fail(file, m));
      continue;
    }
    content.push({ file, entry: fm.data, prose: pr.data });
  }

  const curation = loadCuration();
  const curationDir = resolve(REPO, 'curation/models');
  const knownCurationIds = existsSync(curationDir)
    ? new Set(readdirSync(curationDir).filter((f) => /\.ya?ml$/.test(f)).map((f) => f.replace(/\.ya?ml$/, '')))
    : new Set<string>();
  validateModelCollection(
    content.map(({ file, entry }) => ({ file, entry })),
    curation,
    knownIds,
    knownCurationIds,
  ).forEach((i) => fail(i.file, i.message));

  const curById = new Map(curation.map((c) => [c.entry.id, c.entry]));

  // 拍平回前端既有形状：卡片层 + 详情层
  const cards = [];
  const details: Record<string, unknown> = {};

  for (const { entry: m, prose } of content) {
    const cur = curById.get(m.id);
    if (!cur) continue; // 缺 curation 已在集合校验里报过

    cards.push({
      id: m.id,
      name: m.name,
      title: m.editorial.title,
      system: m.system,
      tier: cur.tier,
      stars: cur.stars,
      contextTokens: m.specs.contextTokens,
      contextLabel: m.specs.contextLabel,
      ...(m.specs.maxOutputTokens !== undefined ? { maxOutputTokens: m.specs.maxOutputTokens } : {}),
      priceIn: m.specs.priceIn,
      priceOut: m.specs.priceOut,
      priceLabel: m.specs.priceLabel,
      swe: m.scores.swe,
      ...(m.scores.arenaElo !== undefined ? { arenaElo: m.scores.arenaElo } : {}),
      ...(m.scores.aiderPolyglot !== undefined ? { aiderPolyglot: m.scores.aiderPolyglot } : {}),
      ...(m.scores.toolCallRate !== undefined ? { toolCallRate: m.scores.toolCallRate } : {}),
      ...(m.scores.autonomyHours !== undefined ? { autonomyHours: m.scores.autonomyHours } : {}),
      releaseDate: m.releaseDate,
      collectedDate: m.collectedDate,
      ...(m.avatar !== undefined ? { avatar: m.avatar } : {}),
      tags: m.editorial.tags,
      roles: m.editorial.roles,
      composite: cur.composite,
      verdict: prose.verdict,
      stats: cur.stats,
      hasDetail: true,
      ...(m.unreleased !== undefined ? { unreleased: m.unreleased } : {}),
    });

    details[m.id] = {
      modelId: m.id,
      profile: m.profile,
      benchGroups: m.benchGroups,
      rivalIds: m.relations.rivals,
      talents: m.talents,
      constellation: m.constellation,
      ...(m.effortBench !== undefined ? { effortBench: m.effortBench } : {}),
      community: {
        strengths: m.community.strengths,
        weaknesses: m.community.weaknesses,
        // 三个固定散文小节 → notes[]
        notes: [
          { label: '编程', text: prose.notesCoding },
          { label: '推理', text: prose.notesReasoning },
          { label: '中文', text: prose.notesChinese },
        ],
        sentiment: cur.sentiment,
        platforms: m.community.platforms,
        quotes: m.community.quotes,
        controversies: m.community.controversies,
        upgradeConsensus: m.community.upgradeConsensus,
        consensusNote: prose.consensusNote,
        ...(prose.benchmarkGap ? { benchmarkGap: prose.benchmarkGap } : {}),
        radar: cur.radar,
        danmaku: cur.danmaku,
        ...(m.community.versionDelta ? { versionDelta: m.community.versionDelta } : {}),
        ...(m.community.subBoards ? { subBoards: m.community.subBoards } : {}),
        ...(m.community.heat ? { heat: m.community.heat } : {}),
        ...(m.community.harnessReviews ? { harnessReviews: m.community.harnessReviews } : {}),
        ...(m.community.expertQuotes ? { expertQuotes: m.community.expertQuotes } : {}),
        ...(m.community.timeline ? { timeline: m.community.timeline } : {}),
        ...(m.community.demos ? { demos: m.community.demos } : {}),
        ...(m.community.uncertainties ? { uncertainties: m.community.uncertainties } : {}),
        ...(m.community.sources ? { sources: m.community.sources } : {}),
      },
      bestInSlot: m.relations.bestInSlot,
      teamIds: m.relations.teams,
      trialGood: m.relations.trialGood,
      trialBad: m.relations.trialBad,
      guideIds: m.relations.guides,
    };
  }

  return { cards, details };
}

/* ---------- 主流程 ---------- */

function main() {
  const benchmarks = loadBenchmarks();
  const { cards, details } = loadModels();

  if (issues.length) {
    console.error(`\n✗ 内容校验未通过：${issues.length} 个问题\n`);
    const byFile = new Map<string, string[]>();
    for (const i of issues) {
      if (!byFile.has(i.file)) byFile.set(i.file, []);
      byFile.get(i.file)!.push(i.message);
    }
    let shown = 0;
    for (const [file, msgs] of byFile) {
      if (shown >= 12) {
        console.error(`  …另有 ${byFile.size - shown} 个文件有问题`);
        break;
      }
      console.error(`  ${file}`);
      [...new Set(msgs)].slice(0, 6).forEach((m) => console.error(`    · ${m}`));
      if (msgs.length > 6) console.error(`    · …另有 ${msgs.length - 6} 条`);
      shown += 1;
    }
    console.error('');
    process.exit(1);
  }

  console.log(`✓ benchmarks 校验通过：${benchmarks.length} 条`);
  console.log(`✓ models 校验通过：${cards.length} 条（含 Tier 3 curation）`);

  if (CHECK_ONLY) {
    console.log('(--check：不写文件)');
    return;
  }

  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
  const write = (name: string, data: unknown) =>
    writeFileSync(resolve(OUT, name), JSON.stringify(data, null, 2) + '\n', 'utf8');

  write('benchmarks.json', benchmarks);
  write('models.json', cards);
  write('model-details.json', details);
  console.log('✓ 已写出 src/data/generated/{benchmarks,models,model-details}.json');
}

main();
