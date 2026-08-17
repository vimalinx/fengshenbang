/**
 * 一次性迁移：把 74 个 benchmark 的 TS 字面量抽成 content/benchmarks/<id>.md。
 *
 * 关键手法：现有数据本身就是 TS 模块，所以直接 import 后序列化即可——
 * 不需要解析 AST，也不需要文本转换，可靠性高得多。
 *
 * 因为要 import 带路径别名（@/）与无扩展名的模块，本脚本用 vite-node 跑：
 *   npx vite-node scripts/extract-benchmarks.ts
 *
 * 迁移完成后本脚本即可删除（保留在仓库里作为迁移记录亦可）。
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { benchmarks } from '../src/data/benchmarks';
import { PROSE_SECTIONS } from '../schema/benchmark';
import { stringifyMatter, stringifySections } from './lib/matter';

const OUT_DIR = resolve(import.meta.dirname, '../../content/benchmarks');

/** frontmatter 键序：身份 → 归类 → 出处 → 事实 → 关联。刻意与 schema 的语义顺序一致。 */
function buildFrontmatter(b: (typeof benchmarks)[number]): Record<string, unknown> {
  const fm: Record<string, unknown> = {
    id: b.id,
    name: b.name,
    category: b.category,
    organizer: b.organizer,
  };
  if (b.url) fm.url = b.url;
  fm.aliases = b.aliases;
  fm.traits = b.traits ?? [];
  fm.facts = b.facts;
  fm.frontier = b.frontier ?? { value: null, note: '' };
  fm.openSource = b.openSource ?? { status: 'closed' };
  fm.history = b.history;
  if (b.ladder?.length) fm.ladder = b.ladder;
  if (b.relatedIds?.length) fm.relatedIds = b.relatedIds;
  return fm;
}

function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  let written = 0;
  const skippedProse: string[] = [];

  for (const b of benchmarks) {
    const sections = PROSE_SECTIONS.map((s) => {
      const text = (b as unknown as Record<string, string | undefined>)[s.key] ?? '';
      if (s.required && !text.trim()) skippedProse.push(`${b.id}.${s.key}`);
      return { heading: s.heading, text };
    });

    const md = stringifyMatter(buildFrontmatter(b), stringifySections(sections));
    writeFileSync(resolve(OUT_DIR, `${b.id}.md`), md, 'utf8');
    written += 1;
  }

  console.log(`已写出 ${written} 个文件 → content/benchmarks/`);
  if (skippedProse.length) {
    console.log(`⚠ 必填散文为空：${skippedProse.join(', ')}`);
  }
}

main();
