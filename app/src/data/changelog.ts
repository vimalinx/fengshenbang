/**
 * 更新日志。
 *
 * 诚信约定：本文件的每一条都必须对应仓库里一个真实 commit——
 * 不得编造条目、时间戳或「阅读破 N 万」这类无遥测支撑的运营数字。
 * 新增条目时以 `git log --date=short` 为准，日期用 commit 日期。
 *
 * 数据来源：git log（2026-08-02 首次提交 → 2026-08-15）。
 * time 字段留空——commit 时刻对读者无意义，且不应臆造。
 */

export type LogType = '榜单' | '图鉴' | '攻略' | '工具' | '站点';

export interface LogItem {
  type: LogType;
  text: string;
  time?: string;
}

export interface LogDay {
  date: string; // MM-DD
  weekday: string;
  items: LogItem[];
}

export const logTypeColor: Record<LogType, string> = {
  榜单: '#B8860B',
  图鉴: '#52525B',
  攻略: '#52525B',
  工具: '#52525B',
  站点: '#A1A1AA',
};

/** 近期（默认展开） */
export const changelogRecent: LogDay[] = [
  {
    date: '08-15',
    weekday: '周六',
    items: [
      { type: '图鉴', text: '测试集图鉴上线：74 条真实评测基准档案，含分数天梯与开源状态' },
      { type: '站点', text: '测试集详情页改双栏版式；补齐开源发布所需文件（LICENSE、README）' },
    ],
  },
  {
    date: '08-11',
    weekday: '周二',
    items: [
      { type: '图鉴', text: '37 个详情页装备卡文案瘦身：引言 ≤60 字、实战 ≤120 字，事实零新增' },
    ],
  },
  {
    date: '08-10',
    weekday: '周一',
    items: [
      { type: '图鉴', text: '最后 7 个模型详情页补齐，图鉴 42/42 全覆盖' },
      { type: '图鉴', text: 'grok-5 与 llama-5-maverick 改「未发布」口径，清除无信源的占位数值' },
      { type: '站点', text: '图鉴页移除封神殿展示带，筛选栏置顶' },
    ],
  },
  {
    date: '08-09',
    weekday: '周日',
    items: [
      { type: '图鉴', text: '33 个详情页深化：逐模型补调研，厚度对齐 Opus 5 条目' },
      { type: '图鉴', text: '34 个模型全量详情页上线，调研库 v2 数据录入' },
    ],
  },
  {
    date: '08-08',
    weekday: '周六',
    items: [
      { type: '站点', text: 'SEO 建设：对比页、首页 H1 与对决入口、模型 FAQ、sitemap；修复 base 路径 bug' },
      { type: '图鉴', text: '详情页术语统一「法宝」→「装备」，版面对齐 checklist' },
    ],
  },
  {
    date: '08-04',
    weekday: '周二',
    items: [
      { type: '站点', text: 'CI：push 到 main 自动构建并部署到 Cloudflare Pages' },
    ],
  },
  {
    date: '08-02',
    weekday: '周日',
    items: [
      { type: '站点', text: '封神榜 LLM 维基首次提交：模型图鉴详情页（社区调研数据版）' },
    ],
  },
];

/** 更早（折叠）——首次提交即 2026-08-02，暂无更早记录 */
export const changelogArchive: LogDay[] = [];

export const changelogAll: LogDay[] = [...changelogRecent, ...changelogArchive];
export const changelogCount = changelogAll.reduce((n, d) => n + d.items.length, 0);
/** 最近更新日期（MM-DD），取 changelogAll 首条 */
export const changelogLatestDate = changelogAll[0]?.date ?? '';
