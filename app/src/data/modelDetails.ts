/**
 * 模型角色卡详情数据 — 对标游戏 Wiki 角色页结构。
 * 数值字段来自 models.ts；此处承载详情页专属内容：
 * 基础档案、天赋、命座（版本迭代）、社区反馈（来自社区调研数据提炼）。
 */


import rawDetails from './generated/model-details.json';

export interface ModelProfile {
  apiId: string; // API 模型标识
  vendor: string; // 发布方
  releaseDate: string;
  access: string[]; // 获取方式
  costNote: string; // 接入成本说明
  nicknames: string[]; // 社区昵称
  signature: string; // 招牌能力（特殊料理位）
}

export interface BenchGroup {
  label: string; // 如「榜单成绩」「规格与接入」
  rows: { label: string; value: string }[];
}

export type TalentKind = 'normal' | 'skill' | 'burst' | 'passive';

export interface Talent {
  kind: TalentKind;
  seal: string; // 单字印
  name: string;
  desc: string;
  metric: string; // 关键数值一行
}

export interface ConstellationNode {
  version: string;
  date: string;
  effect: string; // 该版本带来的强化
  current?: boolean;
}

export interface PlatformSentiment {
  name: string;
  tone: 'pos' | 'mix' | 'neg';
  summary: string;
}

export interface CommunityQuote {
  text: string;
  source: string;
  tone: 'pos' | 'neg';
}

export interface Controversy {
  event: string;
  response?: string; // 官方回应
}

/** 思考强度档位 benchmark（仅支持 effort 调节的模型有此数据） */
export interface EffortBench {
  levels: string[]; // 如 ['Low', 'Medium', 'High', 'Max']
  rows: { name: string; values: (number | null)[]; note?: string }[];
}

/** 社区体感雷达维度（0-100） */
export interface RadarDim {
  axis: string;
  value: number;
}

export type PlatformId = 'reddit' | 'hn' | 'x' | 'zhihu' | 'linuxdo' | 'v2ex' | 'bilibili';

/** 背景弹幕：平台真实评价；main = 主流/高影响力（大胶囊） */
export interface DanmakuItem {
  text: string;
  platform: PlatformId;
  main: boolean;
}

export interface CommunityFeedback {
  strengths: string[]; // 公认强项
  weaknesses: string[]; // 公认弱项
  notes: { label: string; text: string }[]; // 编程/推理/中文 细分反馈
  sentiment: { positive: number; mixed: number; negative: number }; // 整体情绪比例
  platforms: PlatformSentiment[];
  quotes: CommunityQuote[];
  controversies: Controversy[];
  upgradeConsensus: 'worth' | 'wait' | 'split'; // 社区升级共识
  consensusNote: string;
  benchmarkGap?: string; // 榜单 vs 实测落差
  radar: RadarDim[]; // 社区体感多维雷达
  danmaku: DanmakuItem[]; // 背景弹幕
  versionDelta?: { base: string; improves: string[]; regresses: string[] }; // 版本变迁（进步 vs 退步）
  subBoards?: { name: string; rank: string; note?: string }[]; // 子榜单交叉
  heat?: { label: string; value: string }[]; // 讨论热度数字
  harnessReviews?: { id: string; text: string; placeholder?: boolean }[]; // 装备实战评测
  expertQuotes?: { text: string; name: string; role: string; tone: 'pos' | 'mix' | 'neg' }[]; // 大佬/媒体评价（试炼相性下方引用块）
  timeline?: { date: string; event: string }[]; // 发布大事记
  demos?: { title: string; desc: string; placeholder?: boolean }[]; // 官方演示场景
  uncertainties?: string[]; // 存疑标注
  sources?: { title: string; platform: string; url: string }[]; // 参考来源
}

export interface ModelDetailData {
  modelId: string;
  profile: ModelProfile;
  benchGroups: BenchGroup[];
  rivalIds: string[]; // 雷达对比候选（须在 models.ts 中存在）
  talents: Talent[];
  constellation: ConstellationNode[];
  effortBench?: EffortBench; // 思考强度档位实测（仅支持 effort 调节的模型）
  community?: CommunityFeedback; // 无调研数据的模型可缺省，对应板块不渲染
  bestInSlot: { id: string; note: string }[];
  teamIds: string[];
  trialGood: { label: string; to: string }[];
  trialBad: { label: string; to: string; note?: string }[];
  guideIds: string[];
}

/**
 * 42 份详情，由 generated/model-details.json 载入。
 *
 * 内容真身是 content/models/<id>.md（Tier 1 事实 + Tier 2 散文）
 * 与 curation/models/<id>.yml（Tier 3：sentiment / radar / danmaku）。
 * 想改详情，编辑那两个文件；想加字段，先改 schema/model.ts。
 *
 * 这里的断言依据是可执行的：JSON 由构建脚本逐条 zod 校验后写出，
 * 校验不过则构建失败、产物不生成。断言只补上 JSON 导入会把字面量联合
 * （talents[].kind、platforms[].tone、danmaku[].platform 等）退化成 string 这一点。
 */
export const modelDetails = rawDetails as unknown as Record<string, ModelDetailData>;

export function replaceModelDetails(next: Record<string, ModelDetailData>): void {
  for (const key of Object.keys(modelDetails)) delete modelDetails[key];
  Object.assign(modelDetails, next);
}
