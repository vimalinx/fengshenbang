/**
 * 更新日志数据 — 赛季 2026-07，共 47 条 mock
 * 前 28 条默认展开，07-02 起的 19 条折叠于「展开更早」。
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

/** 默认展开的近 28 条 */
export const changelogRecent: LogDay[] = [
  {
    date: '07-18',
    weekday: '周五',
    items: [
      { type: '攻略', text: '《上下文工程·第一卷：任务拆解才是王道》发布，半日阅读破 1.8 万', time: '10:24' },
      { type: '榜单', text: '性价比榜更新：Gemini 3 Flash 升至第 3', time: '09:02' },
      { type: '站点', text: '攻略页新增「编辑精选」认证徽标', time: '08:40' },
    ],
  },
  {
    date: '07-17',
    weekday: '周四',
    items: [
      { type: '榜单', text: '综合战力榜：Grok 5 超越 Sonnet 4.6 升至第 5', time: '18:12' },
      { type: '攻略', text: '新增《蜂群流入门：三个 Sonnet 胜过一个 Opus？》', time: '15:30' },
      { type: '工具', text: '配队模拟器新增「为我推荐」复制功能', time: '11:05' },
    ],
  },
  {
    date: '07-16',
    weekday: '周三',
    items: [
      { type: '图鉴', text: '收录模型 Grok 5（xAI 系 · T1）', time: '20:44' },
      { type: '攻略', text: '《长程重构实录》更新：补充大师层 72h 数据', time: '16:20' },
      { type: '榜单', text: '配队榜：蜂群工坊进榜（T1）', time: '09:12' },
    ],
  },
  {
    date: '07-15',
    weekday: '周二',
    items: [
      { type: '榜单', text: '场景增益轮换：Claude 系 +15% / 复核流 +15%', time: '04:00' },
      { type: '攻略', text: '《工具调用成功率实测：八大 Harness 横评》发布', time: '14:36' },
      { type: '站点', text: '首页新增「本周轮换」小组件', time: '11:18' },
    ],
  },
  {
    date: '07-14',
    weekday: '周一',
    items: [
      { type: '图鉴', text: '收录模型 DeepSeek-R2（DeepSeek 系 · T1 · 推理特化）', time: '21:02' },
      { type: '榜单', text: '赛季 2026-07 第 3 周开赛，上期徽章已发放', time: '04:05' },
      { type: '攻略', text: '《上下文工程·第二卷：AGENTS.md》修订 v2', time: '13:48' },
    ],
  },
  {
    date: '07-13',
    weekday: '周日',
    items: [
      { type: '攻略', text: '《复核流详解》更新 v3：新增成本对照表', time: '17:26' },
      { type: '图鉴', text: 'Harness「Devin 2」词条补充异步交付模式说明', time: '10:52' },
    ],
  },
  {
    date: '07-12',
    weekday: '周六',
    items: [
      { type: '工具', text: '成本计算器新增年费视图与缓存折扣开关', time: '15:40' },
      { type: '榜单', text: '算法竞赛纪录榜易主：「计算器成精」刷新纪录', time: '12:08' },
    ],
  },
  {
    date: '07-11',
    weekday: '周五',
    items: [
      { type: '攻略', text: '《前端冲分 24 小时》发布（实战复盘）', time: '19:24' },
      { type: '图鉴', text: 'Gemini 3 Flash 数值复核：输出价下调至 $2.5', time: '10:16' },
    ],
  },
  {
    date: '07-10',
    weekday: '周四',
    items: [
      { type: '图鉴', text: '收录模型 Qwen3-Max（Qwen 系 · T1）', time: '22:30' },
      { type: '攻略', text: '《价格陷阱：输出 Token 才是成本大头》发布', time: '14:02' },
    ],
  },
  {
    date: '07-09',
    weekday: '周三',
    items: [
      { type: '榜单', text: '长程重构纪录榜：「重构老司机」47h 05m 升至第二', time: '16:44' },
    ],
  },
  {
    date: '07-08',
    weekday: '周二',
    items: [
      { type: '图鉴', text: '收录模型 Gemini 3 Flash（T2 · 速度特化）', time: '20:12' },
      { type: '站点', text: '全站搜索上线 ⌘K 快捷键', time: '11:58' },
    ],
  },
  {
    date: '07-07',
    weekday: '周一',
    items: [
      { type: '榜单', text: '配队榜第 2 周结算：旗舰复核队蝉联使用率榜首', time: '04:05' },
      { type: '攻略', text: '《共享记忆黑板：Agent 间如何同步状态》发布', time: '15:20' },
    ],
  },
];

/** 「展开更早」折叠区 19 条（07-06 ~ 06-28） */
export const changelogArchive: LogDay[] = [
  {
    date: '07-06',
    weekday: '周日',
    items: [
      { type: '攻略', text: '《上下文工程·第三卷：负面约束的艺术》发布', time: '13:36' },
      { type: '榜单', text: '代码能力榜：Sonnet 4.6 与 DeepSeek-V4 分差缩至 2.1', time: '10:04' },
    ],
  },
  {
    date: '07-05',
    weekday: '周六',
    items: [
      { type: '攻略', text: '《缓存命中玄学》发布（机制解析）', time: '16:50' },
    ],
  },
  {
    date: '07-04',
    weekday: '周五',
    items: [
      { type: '攻略', text: '《一人成团：我用蜂群流做了个小产品》发布', time: '18:42' },
      { type: '图鉴', text: 'Harness「OpenHands」补充蜂群编排示例', time: '14:08' },
    ],
  },
  {
    date: '07-03',
    weekday: '周四',
    items: [
      { type: '攻略', text: '《API Key 从申请到入土全流程》发布', time: '12:26' },
      { type: '榜单', text: '全栈交付纪录榜开榜，首批收录三条', time: '09:44' },
    ],
  },
  {
    date: '07-02',
    weekday: '周三',
    items: [
      { type: '图鉴', text: '收录模型 Claude Haiku 4.5（T2 · 轻量并行）', time: '21:16' },
      { type: '图鉴', text: '收录 Harness Zed AI（IDE 集成 · ★4）', time: '17:38' },
      { type: '站点', text: '场景页上线，六大场景开放', time: '10:00' },
    ],
  },
  {
    date: '07-01',
    weekday: '周二',
    items: [
      { type: '榜单', text: '赛季 2026-07 第 1 周榜单结算', time: '04:05' },
      { type: '工具', text: '「Token 估算器」上线', time: '15:12' },
    ],
  },
  {
    date: '06-30',
    weekday: '周一',
    items: [
      { type: '攻略', text: '《给模型"留作业"：检查点式提示法》发布', time: '14:48' },
      { type: '站点', text: '配队榜页上线，首期七队在榜', time: '10:30' },
    ],
  },
  {
    date: '06-29',
    weekday: '周日',
    items: [
      { type: '攻略', text: '《结构化输出的尽头是 Schema》发布', time: '16:04' },
      { type: '图鉴', text: 'Kimi K3 数值复核：中文长文加权上调', time: '11:40' },
    ],
  },
  {
    date: '06-28',
    weekday: '周六',
    items: [
      { type: '站点', text: '攻略页上线，首批收录攻略 21 篇', time: '14:00' },
      { type: '站点', text: '封神榜 Wiki 开站：首批收录 9 模型 8 Harness', time: '10:00' },
      { type: '攻略', text: '《第一站就破产？新手预算红线指南》发布', time: '10:30' },
    ],
  },
];

export const changelogAll: LogDay[] = [...changelogRecent, ...changelogArchive];
export const changelogCount = changelogAll.reduce((n, d) => n + d.items.length, 0);
