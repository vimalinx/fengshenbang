/**
 * 测试集（Benchmark）图鉴 —— 数据接入层。
 *
 * 内容不再写在本文件里：真身是 `content/benchmarks/<id>.md`
 * （Tier 1 事实进 YAML frontmatter，Tier 2 散文进 Markdown 正文），
 * 由 `scripts/build-content.ts` 校验后生成 `generated/benchmarks.json`。
 *
 * 想改一条 benchmark，编辑对应的 .md 文件，不要改这里。
 * 想加字段，先改 `schema/benchmark.ts`——那里是唯一的形状权威。
 *
 * 类型直接从 zod schema 推导（`z.infer`），因此 schema 与前端类型
 * 不可能漂移；`import type` 在打包时被擦除，不会把 zod 带进产物。
 */

import benchmarksJson from './generated/benchmarks.json';
import type { BenchmarkCategory, BenchmarkEntry } from '../../schema/benchmark';

export type { BenchmarkCategory, BenchmarkEntry };

/**
 * 74 条档案，按 category 既定顺序（coding → reasoning → agent → arena →
 * multimodal → other）排列，由构建脚本保证。
 *
 * 这里的类型断言是安全的，且断言的依据是可执行的：JSON 由
 * `scripts/build-content.ts` 用 `schema/benchmark.ts` 逐条 zod 校验后写出，
 * 校验不过则构建失败（非零退出），产物根本不会生成。
 * 断言只是补上 JSON 导入会把字面量联合（category、openSource.status）
 * 退化成 string 这一点，不掩盖任何未校验的取值。
 */
export const benchmarks = benchmarksJson as BenchmarkEntry[];

export function getBenchmark(id: string): BenchmarkEntry | undefined {
  return benchmarks.find((b) => b.id === id);
}

/* ---------- 战绩反查：本站哪些模型在该榜的成绩表里出现过 ---------- */
import { models } from './models';
import { modelDetails } from './modelDetails';

export interface BenchmarkAppearance {
  modelId: string;
  modelName: string;   // models.ts 显示名
  value: string;       // 成绩表行 value，或子榜单 rank（附 note）
  source: '成绩表' | '子榜单';
}

/**
 * 给定 BenchmarkEntry，反查本站收录模型中谁的成绩提到它。
 * 匹配口径：modelDetails[].benchGroups[].rows[].label 与
 * community.subBoards[].name，对「条目 name + aliases」做精确字符串
 * 匹配（不模糊、不忽略大小写）；命中即收集，按模型显示名排序。
 */
export function getBenchmarkAppearances(entry: BenchmarkEntry): BenchmarkAppearance[] {
  const targets = new Set([entry.name, ...entry.aliases]);
  const nameById = new Map(models.map((m) => [m.id, m.name]));
  const hits: BenchmarkAppearance[] = [];

  for (const detail of Object.values(modelDetails)) {
    const modelName = nameById.get(detail.modelId) ?? detail.modelId;
    for (const group of detail.benchGroups) {
      for (const row of group.rows) {
        if (targets.has(row.label)) {
          hits.push({ modelId: detail.modelId, modelName, value: row.value, source: '成绩表' });
        }
      }
    }
    for (const board of detail.community?.subBoards ?? []) {
      if (targets.has(board.name)) {
        hits.push({
          modelId: detail.modelId,
          modelName,
          value: board.rank + (board.note ? ` · ${board.note}` : ''),
          source: '子榜单',
        });
      }
    }
  }

  return hits.sort((a, b) => a.modelName.localeCompare(b.modelName));
}
