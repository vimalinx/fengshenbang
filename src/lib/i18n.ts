import type { LocalizedText, Role, Series, TeamPosition, WeaponType } from "./types";

export const LANGS = ["zh", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "zh";

/** 兼容别名：早期组件使用 Locale/LOCALES 命名。 */
export type Locale = Lang;
export const LOCALES = LANGS;
export const DEFAULT_LOCALE = DEFAULT_LANG;

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}
export const isLocale = isLang;

/** 取双语文案对应语言，缺语言时回退到另一语言。 */
export function tx(text: LocalizedText | undefined | null, lang: Lang): string {
  if (!text) return "";
  return text[lang] || text.zh || text.en || "";
}
export const lt = tx;

/** 站点 UI 框架文案（非内容数据；内容数据的文案在 content/*.json 里）。 */
export const UI = {
  site: {
    name: { zh: "封神榜", en: "FengShenBang" },
    tagline: {
      zh: "大模型 × Harness 的游戏化 Wiki",
      en: "A gamified wiki for LLMs × harnesses",
    },
  },
  nav: {
    home: { zh: "首页", en: "Home" },
    characters: { zh: "角色", en: "Characters" },
    weapons: { zh: "装备", en: "Weapons" },
    teams: { zh: "配队", en: "Teams" },
    tierList: { zh: "节奏榜", en: "Tier List" },
  },
  home: {
    banner: { zh: "当期 UP 池", en: "Current Banner" },
    bannerDesc: {
      zh: "最新入池的角色（模型）",
      en: "Newly released characters (models)",
    },
    abyss: { zh: "深渊轮换", en: "Abyss Rotation" },
    abyssDesc: {
      zh: "本期推荐配队方案",
      en: "Recommended teams for this cycle",
    },
    tierPreview: { zh: "节奏榜预览", en: "Tier List Preview" },
    viewAll: { zh: "查看全部 →", en: "View all →" },
  },
  character: {
    releaseDate: { zh: "实装日期", en: "Release date" },
    contextWindow: { zh: "上下文窗口", en: "Context window" },
    tokens: { zh: "tokens", en: "tokens" },
    pricing: { zh: "价格", en: "Pricing" },
    pricingInput: { zh: "输入", en: "Input" },
    pricingOutput: { zh: "输出", en: "Output" },
    per1M: { zh: "/ 百万 tokens", en: "/ 1M tokens" },
    benchmarks: { zh: "面板数值", en: "Benchmarks" },
    skills: { zh: "技能", en: "Skills" },
    constellations: { zh: "命之座", en: "Constellations" },
    constellationLevel: { zh: "第 {level} 命", en: "C{level}" },
    bestWeapons: { zh: "推荐装备", en: "Best Weapons" },
    bestTeams: { zh: "推荐配队", en: "Best Teams" },
    weaknesses: { zh: "短板", en: "Weaknesses" },
  },
  weapon: {
    type: { zh: "类型", en: "Type" },
    vendor: { zh: "厂商", en: "Vendor" },
    passive: { zh: "武器特效", en: "Passive" },
    stats: { zh: "基础属性", en: "Stats" },
    bestFor: { zh: "适配角色", en: "Best For" },
    pricing: { zh: "价格模式", en: "Pricing" },
  },
  team: {
    scenario: { zh: "场景", en: "Scenario" },
    members: { zh: "队伍成员", en: "Members" },
    rotation: { zh: "打法循环", en: "Rotation" },
    budgetAlt: { zh: "低配替代", en: "Budget Alternative" },
    tierRating: { zh: "综合评级", en: "Tier Rating" },
  },
  tierList: {
    updatedAt: { zh: "数据截至", en: "Data as of" },
    note: {
      zh: "按稀有度与最高面板分排序；分榜按定位（roles）划分。",
      en: "Ranked by rarity and top benchmark score; role boards split by roles.",
    },
    overall: { zh: "总榜", en: "Overall" },
    byRole: { zh: "分定位榜", en: "By Role" },
    rank: { zh: "排名", en: "Rank" },
    topScore: { zh: "最高面板", en: "Top Score" },
    tierSS: { zh: "SS · 幻神", en: "SS · Apex" },
    tierS: { zh: "S · 五星", en: "S · Five-star" },
    tierA: { zh: "A · 四星", en: "A · Four-star" },
  },
  empty: {
    characters: {
      zh: "榜上尚无角色。封神之战尚未开启——等待第一批模型入池。",
      en: "No characters yet. The investiture has not begun — awaiting the first models.",
    },
    weapons: {
      zh: "装备库空空如也。神兵利器尚未铸成。",
      en: "The armory is empty. No legendary weapons forged yet.",
    },
    teams: {
      zh: "暂无配队方案。深渊入口一片寂静。",
      en: "No teams yet. The abyss lies silent.",
    },
    tierList: {
      zh: "节奏榜虚位以待。待众神归位，自见分晓。",
      en: "The tier list awaits its gods. Check back soon.",
    },
    generic: { zh: "暂无内容", en: "No content yet" },
  },
  notFound: {
    title: { zh: "查无此页", en: "Page not found" },
    desc: {
      zh: "你要找的页面不在封神榜上。",
      en: "The page you seek is not on the list.",
    },
  },
  back: { zh: "← 返回列表", en: "← Back to list" },
  backHome: { zh: "回到首页", en: "Back to home" },
  footer: {
    disclaimer: {
      zh: "数据由社区维护，benchmark 与价格以官方来源为准。",
      en: "Community-maintained data. Benchmarks and pricing follow official sources.",
    },
  },
} as const;

/** 兼容别名的扁平字典：早期 SiteHeader 等组件按 key 取文案。 */
const flatDict = {
  siteName: UI.site.name,
  siteSlogan: UI.site.tagline,
  navHome: UI.nav.home,
  navCharacters: UI.nav.characters,
  navWeapons: UI.nav.weapons,
  navTeams: UI.nav.teams,
  navTierList: UI.nav.tierList,
  viewAll: UI.home.viewAll,
  emptyGeneric: UI.empty.generic,
  backHome: UI.backHome,
} as const;

export type DictKey = keyof typeof flatDict;

export function t(key: DictKey, lang: Lang): string {
  return tx(flatDict[key], lang);
}

export const SERIES_LABELS: Record<Series, LocalizedText> = {
  anthropic: { zh: "Anthropic", en: "Anthropic" },
  openai: { zh: "OpenAI", en: "OpenAI" },
  google: { zh: "Google", en: "Google" },
  moonshot: { zh: "月之暗面", en: "Moonshot" },
  deepseek: { zh: "深度求索", en: "DeepSeek" },
  zhipu: { zh: "智谱", en: "Zhipu" },
  alibaba: { zh: "通义", en: "Alibaba" },
  minimax: { zh: "MiniMax", en: "MiniMax" },
  xai: { zh: "xAI", en: "xAI" },
  meta: { zh: "Meta", en: "Meta" },
  mistral: { zh: "Mistral", en: "Mistral" },
};

export const ROLE_LABELS: Record<Role, LocalizedText> = {
  coding: { zh: "编程", en: "Coding" },
  agent: { zh: "智能体", en: "Agent" },
  reasoning: { zh: "推理", en: "Reasoning" },
  writing: { zh: "写作", en: "Writing" },
  multimodal: { zh: "多模态", en: "Multimodal" },
  "long-context": { zh: "长文本", en: "Long Context" },
};
/** 兼容别名。 */
export const ROLES = ROLE_LABELS;

export const WEAPON_TYPE_LABELS: Record<WeaponType, LocalizedText> = {
  "cli-agent": { zh: "命令行智能体", en: "CLI Agent" },
  ide: { zh: "集成开发环境", en: "IDE" },
  plugin: { zh: "编辑器插件", en: "Plugin" },
  "web-agent": { zh: "网页智能体", en: "Web Agent" },
  framework: { zh: "框架", en: "Framework" },
};
/** 宽松索引别名：页面侧用字符串下标安全取值。 */
export const WEAPON_TYPES: Record<string, LocalizedText> = WEAPON_TYPE_LABELS;

export const POSITION_LABELS: Record<TeamPosition, LocalizedText> = {
  "main-dps": { zh: "主 C", en: "Main DPS" },
  "sub-dps": { zh: "副 C", en: "Sub DPS" },
  support: { zh: "辅助", en: "Support" },
  healer: { zh: "审查 / 测试", en: "Review / Test" },
};
/** 宽松索引别名。 */
export const POSITIONS: Record<string, LocalizedText> = POSITION_LABELS;
