/**
 * 测试集（Benchmark）图鉴数据。
 *
 * 本站新增「测试集图鉴」版块的数据文件，只收录现实存在的评测基准。
 * 所有事实与数字均来自 benchmark-research/ 目录下的联网核验报告
 * （2026-08-13 核验），不允许在此之外编造成绩、日期与题量。
 * 条目 id / 正名 / 别名以 benchmark-research/inventory.md 正名总表为准。
 *
 * 条目分散在 benchmarks/ 目录下（每个条目一个文件，导出 ENTRY），
 * 此处统一聚合为 benchmarks 数组；顺序与 inventory.md 一致：
 * coding 28 → reasoning 18 → agent 11 → arena 8 → multimodal 5 → other 4。
 */

export type BenchmarkCategory = 'coding' | 'reasoning' | 'agent' | 'arena' | 'multimodal' | 'other';

export interface BenchmarkEntry {
  id: string;              // 如 'swe-bench-verified'
  name: string;            // 正名，如 'SWE-bench Verified'
  aliases: string[];       // 站内出现过的写法
  category: BenchmarkCategory;
  organizer: string;       // 主办方/出处
  url?: string;            // 官方链接（核验报告里有就写）
  oneLiner: string;        // 一句话通俗介绍（大白话，≤40字）
  what: string;            // 测什么，2-4 句
  how: string;             // 怎么测、怎么计分，2-4 句
  examples: string;        // 典型任务长什么样——具体例子
  reading: string;         // 分数怎么看：多少算高/什么水平，1-3 句
  caveat: string;          // 含金量与局限：污染/饱和/自报/弃用等，1-3 句
  facts: { label: string; value: string }[];   // 档案速览：题量/年份/计分方式/数据公开性等
  frontier?: { value: number | null; note: string };  // 头部模型当前水平（value 0-100 或 null）
  history: { date: string; event: string }[];  // 版本沿革·大事记
  funFact?: string;                            // 名场面·冷知识
  relatedIds?: string[];                       // 相关条目 id
  ladder?: { model: string; score: string; note?: string }[];  // 分数天梯：当前榜单排名，按分数降序
  traits?: string[];          // 特点 3-5 条短语：如「真实 GitHub issue」「跑测试判分」「已弃用」
  openSource?: { status: 'open' | 'partial' | 'closed'; url?: string; note?: string };  // 数据集/代码开源状态
}

/* ---------- coding（28） ---------- */
import { ENTRY as sweBenchVerified } from './benchmarks/swe-bench-verified';
import { ENTRY as sweBenchPro } from './benchmarks/swe-bench-pro';
import { ENTRY as sweBenchMultilingual } from './benchmarks/swe-bench-multilingual';
import { ENTRY as sweMarathon } from './benchmarks/swe-marathon';
import { ENTRY as terminalBench } from './benchmarks/terminal-bench';
import { ENTRY as livecodebench } from './benchmarks/livecodebench';
import { ENTRY as aiderPolyglot } from './benchmarks/aider-polyglot';
import { ENTRY as humaneval } from './benchmarks/humaneval';
import { ENTRY as evalplus } from './benchmarks/evalplus';
import { ENTRY as multiplE } from './benchmarks/multipl-e';
import { ENTRY as cruxeval } from './benchmarks/cruxeval';
import { ENTRY as frontierBench } from './benchmarks/frontier-bench';
import { ENTRY as frontierswe } from './benchmarks/frontierswe';
import { ENTRY as frontiercode } from './benchmarks/frontiercode';
import { ENTRY as deepswe } from './benchmarks/deepswe';
import { ENTRY as codeforces } from './benchmarks/codeforces';
import { ENTRY as fullstackbench } from './benchmarks/fullstackbench';
import { ENTRY as kernelbench } from './benchmarks/kernelbench';
import { ENTRY as cursorbench } from './benchmarks/cursorbench';
import { ENTRY as programbench } from './benchmarks/programbench';
import { ENTRY as ccBench } from './benchmarks/cc-bench';
import { ENTRY as toolathlon } from './benchmarks/toolathlon';
import { ENTRY as svgBench } from './benchmarks/svg-bench';
import { ENTRY as vibeCodeBench } from './benchmarks/vibe-code-bench';
import { ENTRY as dsbench } from './benchmarks/dsbench';
import { ENTRY as clawbench } from './benchmarks/clawbench';
import { ENTRY as opqa } from './benchmarks/opqa';
import { ENTRY as qwenwebdev } from './benchmarks/qwenwebdev';

/* ---------- reasoning（18） ---------- */
import { ENTRY as gpqaDiamond } from './benchmarks/gpqa-diamond';
import { ENTRY as supergpqa } from './benchmarks/supergpqa';
import { ENTRY as aime } from './benchmarks/aime';
import { ENTRY as hmmt } from './benchmarks/hmmt';
import { ENTRY as math500 } from './benchmarks/math-500';
import { ENTRY as usamo } from './benchmarks/usamo';
import { ENTRY as imo2025 } from './benchmarks/imo-2025';
import { ENTRY as amc } from './benchmarks/amc';
import { ENTRY as matharenaApex } from './benchmarks/matharena-apex';
import { ENTRY as arcAgi } from './benchmarks/arc-agi';
import { ENTRY as hle } from './benchmarks/hle';
import { ENTRY as mmlu } from './benchmarks/mmlu';
import { ENTRY as mmluPro } from './benchmarks/mmlu-pro';
import { ENTRY as simplebench } from './benchmarks/simplebench';
import { ENTRY as frontierScience } from './benchmarks/frontier-science';
import { ENTRY as nytConnections } from './benchmarks/nyt-connections';
import { ENTRY as healthbench } from './benchmarks/healthbench';
import { ENTRY as aaOmniscience } from './benchmarks/aa-omniscience';

/* ---------- agent（11） ---------- */
import { ENTRY as tau2Bench } from './benchmarks/tau2-bench';
import { ENTRY as osworld } from './benchmarks/osworld';
import { ENTRY as browsecomp } from './benchmarks/browsecomp';
import { ENTRY as mcpAtlas } from './benchmarks/mcp-atlas';
import { ENTRY as acebench } from './benchmarks/acebench';
import { ENTRY as clawEval } from './benchmarks/claw-eval';
import { ENTRY as agentArena } from './benchmarks/agent-arena';
import { ENTRY as openhandsIndex } from './benchmarks/openhands-index';
import { ENTRY as kingbench } from './benchmarks/kingbench';
import { ENTRY as scaleSeal } from './benchmarks/scale-seal';
import { ENTRY as vendingBench } from './benchmarks/vending-bench';

/* ---------- arena（8） ---------- */
import { ENTRY as lmarena } from './benchmarks/lmarena';
import { ENTRY as webdevArena } from './benchmarks/webdev-arena';
import { ENTRY as designArena } from './benchmarks/design-arena';
import { ENTRY as benchlm } from './benchmarks/benchlm';
import { ENTRY as aaIntelligenceIndex } from './benchmarks/aa-intelligence-index';
import { ENTRY as gdpval } from './benchmarks/gdpval';
import { ENTRY as eqBench } from './benchmarks/eq-bench';
import { ENTRY as livebench } from './benchmarks/livebench';

/* ---------- multimodal（5） ---------- */
import { ENTRY as mmmu } from './benchmarks/mmmu';
import { ENTRY as videoMme } from './benchmarks/video-mme';
import { ENTRY as videoMmmu } from './benchmarks/video-mmmu';
import { ENTRY as charxiv } from './benchmarks/charxiv';
import { ENTRY as babyvision } from './benchmarks/babyvision';

/* ---------- other（4） ---------- */
import { ENTRY as exploitbench } from './benchmarks/exploitbench';
import { ENTRY as fictionLivebench } from './benchmarks/fiction-livebench';
import { ENTRY as graphwalks } from './benchmarks/graphwalks';
import { ENTRY as mrcr } from './benchmarks/mrcr';

export const benchmarks: BenchmarkEntry[] = [
  // coding（28）
  sweBenchVerified,
  sweBenchPro,
  sweBenchMultilingual,
  sweMarathon,
  terminalBench,
  livecodebench,
  aiderPolyglot,
  humaneval,
  evalplus,
  multiplE,
  cruxeval,
  frontierBench,
  frontierswe,
  frontiercode,
  deepswe,
  codeforces,
  fullstackbench,
  kernelbench,
  cursorbench,
  programbench,
  ccBench,
  toolathlon,
  svgBench,
  vibeCodeBench,
  dsbench,
  clawbench,
  opqa,
  qwenwebdev,
  // reasoning（18）
  gpqaDiamond,
  supergpqa,
  aime,
  hmmt,
  math500,
  usamo,
  imo2025,
  amc,
  matharenaApex,
  arcAgi,
  hle,
  mmlu,
  mmluPro,
  simplebench,
  frontierScience,
  nytConnections,
  healthbench,
  aaOmniscience,
  // agent（11）
  tau2Bench,
  osworld,
  browsecomp,
  mcpAtlas,
  acebench,
  clawEval,
  agentArena,
  openhandsIndex,
  kingbench,
  scaleSeal,
  vendingBench,
  // arena（8）
  lmarena,
  webdevArena,
  designArena,
  benchlm,
  aaIntelligenceIndex,
  gdpval,
  eqBench,
  livebench,
  // multimodal（5）
  mmmu,
  videoMme,
  videoMmmu,
  charxiv,
  babyvision,
  // other（4）
  exploitbench,
  fictionLivebench,
  graphwalks,
  mrcr,
];

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
