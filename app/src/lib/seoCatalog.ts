export const SITE_ORIGIN = 'https://fengshenbang.wiki';
export const SITE_NAME = '封神榜 Wiki';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_ORIGIN}/og-card.svg`;

export interface SeoModel {
  id: string;
  name: string;
  title: string;
  verdict: string;
  tags: string[];
  tier: string;
  hasDetail?: boolean;
  unreleased?: boolean;
}

export interface SeoBenchmark {
  id: string;
  name: string;
  aliases: string[];
  organizer: string;
  oneLiner: string;
  category: string;
}

export interface SeoComparison {
  id: string;
  verdict: string;
  a: { refId: string; type: 'model' | 'harness' };
  b: { refId: string; type: 'model' | 'harness' };
}

export interface SeoHarness {
  id: string;
  name: string;
  title: string;
}

export interface SeoData {
  models: SeoModel[];
  benchmarks: SeoBenchmark[];
  comparisons: SeoComparison[];
  harnesses: SeoHarness[];
}

export interface SeoPage {
  path: string;
  title: string;
  description: string;
  heading: string;
  kind: 'home' | 'collection' | 'model' | 'benchmark' | 'comparison' | 'about' | 'not-found';
  entityNames?: string[];
  robots?: string;
}

const staticPages: SeoPage[] = [
  {
    path: '/',
    title: '封神榜 Wiki｜大模型、AI 编程工具与测试集中文百科',
    description: '社区协作维护的大模型与 AI 编程 Wiki：汇总模型能力、价格、上下文、公开测试集、Harness 工具、场景配队与可追溯信源。',
    heading: '封神榜：大模型 × Harness 游戏化 Wiki',
    kind: 'home',
  },
  {
    path: '/models',
    title: '大模型图鉴与能力榜｜封神榜 Wiki',
    description: '浏览大模型中文图鉴，按站点评分、发布日期、价格、上下文和代码能力筛选；事实数据与主观评价分层展示并开放社区修订。',
    heading: '大模型图鉴与能力榜',
    kind: 'collection',
  },
  {
    path: '/harnesses',
    title: 'AI 编程 Harness 与 Agent 工具库｜封神榜 Wiki',
    description: '对比 Claude Code、Cursor、Cline、Aider 等 AI 编程 Harness、IDE 与自治 Agent 的形态、价格、能力和模型适配。',
    heading: 'AI 编程 Harness 与 Agent 工具库',
    kind: 'collection',
  },
  {
    path: '/benchmarks',
    title: '大模型 Benchmark 测试集百科｜封神榜 Wiki',
    description: '收录代码、推理、Agent、多模态与竞技场类大模型测试集，解释每项 Benchmark 测什么、怎么测、分数如何读以及局限。',
    heading: '大模型 Benchmark 测试集百科',
    kind: 'collection',
  },
  {
    path: '/teams',
    title: '大模型与 Harness 配队榜｜封神榜 Wiki',
    description: '按长程开发、复核流、蜂群流和预算场景组合大模型与 AI 编程工具；配队结论均标注为站点主观评估。',
    heading: '大模型与 Harness 配队榜',
    kind: 'collection',
  },
  {
    path: '/scenarios',
    title: 'AI 编程场景与模型选型｜封神榜 Wiki',
    description: '从前端、重构、Agent、算法、全栈和文档六类真实任务出发，比较适合的大模型、Harness 与协作方式。',
    heading: 'AI 编程场景与模型选型',
    kind: 'collection',
  },
  {
    path: '/guides',
    title: '大模型与 AI 编程实战攻略｜封神榜 Wiki',
    description: '面向中文开发者的大模型选型、上下文工程、Agent 编排、成本控制与 AI 编程实战指南。',
    heading: '大模型与 AI 编程实战攻略',
    kind: 'collection',
  },
  {
    path: '/tools',
    title: 'AI 模型成本、Token 与配队工具｜封神榜 Wiki',
    description: '用交互工具估算大模型 API 成本、上下文 Token 消耗和模型 Harness 配队契合度，辅助选型而非替代实测。',
    heading: 'AI 模型成本、Token 与配队工具',
    kind: 'collection',
  },
  {
    path: '/compare',
    title: '大模型与 AI 编程工具对比｜封神榜 Wiki',
    description: '按能力维度、使用场景、价格与常见问题对比热门大模型和 AI 编程 Harness，快速理解各自取舍。',
    heading: '大模型与 AI 编程工具对比',
    kind: 'collection',
  },
  {
    path: '/changelog',
    title: '封神榜 Wiki 更新日志',
    description: '查看封神榜 Wiki 的模型、测试集、攻略、工具和站点功能更新记录，了解数据口径与页面修订。',
    heading: '封神榜 Wiki 更新日志',
    kind: 'collection',
  },
  {
    path: '/methodology',
    title: '数据方法、信源与编审规范｜封神榜 Wiki',
    description: '了解封神榜如何区分可核实事实、整理性说明与主观评价，以及公开 Wiki 的投稿、审核、纠错和引用流程。',
    heading: '数据方法、信源与编审规范',
    kind: 'about',
  },
];

export function normalizeSeoPath(pathname: string): string {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || '/';
  if (withoutQuery === '/') return '/';
  return `/${withoutQuery.replace(/^\/+|\/+$/g, '')}`;
}

function comparisonName(ref: SeoComparison['a'], data: SeoData): string {
  if (ref.type === 'model') return data.models.find((item) => item.id === ref.refId)?.name ?? ref.refId;
  return data.harnesses.find((item) => item.id === ref.refId)?.name ?? ref.refId;
}

export function resolveSeoPage(pathname: string, data: SeoData): SeoPage {
  const path = normalizeSeoPath(pathname);
  const staticPage = staticPages.find((page) => page.path === path);
  if (staticPage) return staticPage;

  const modelMatch = path.match(/^\/models\/([a-z0-9-]+)$/);
  if (modelMatch) {
    const model = data.models.find((item) => item.id === modelMatch[1]);
    if (model?.hasDetail) {
      const status = model.unreleased ? '未发布资料' : `${model.tier} 模型档案`;
      return {
        path,
        title: `${model.name}：能力、价格、测试与使用建议｜封神榜 Wiki`,
        description: `${model.name}（${model.title}）中文档案：${model.verdict} 查看能力维度、公开测试成绩、价格、上下文、Harness 配队与引用信源。`,
        heading: `${model.name} 模型档案`,
        kind: 'model',
        entityNames: [model.name, model.title, status, ...model.tags],
      };
    }
  }

  const benchmarkMatch = path.match(/^\/benchmarks\/([a-z0-9-]+)$/);
  if (benchmarkMatch) {
    const benchmark = data.benchmarks.find((item) => item.id === benchmarkMatch[1]);
    if (benchmark) {
      return {
        path,
        title: `${benchmark.name} 是什么、怎么测、分数怎么看｜封神榜 Wiki`,
        description: `${benchmark.name} 测试集中文档案：${benchmark.oneLiner} 由 ${benchmark.organizer} 组织，包含测试方法、典型任务、分数解读、沿革与局限。`,
        heading: `${benchmark.name} 测试集档案`,
        kind: 'benchmark',
        entityNames: [benchmark.name, ...benchmark.aliases, benchmark.organizer],
      };
    }
  }

  const comparisonMatch = path.match(/^\/compare\/([a-z0-9-]+)$/);
  if (comparisonMatch) {
    const comparison = data.comparisons.find((item) => item.id === comparisonMatch[1]);
    if (comparison) {
      const a = comparisonName(comparison.a, data);
      const b = comparisonName(comparison.b, data);
      return {
        path,
        title: `${a} vs ${b}：怎么选｜封神榜 Wiki`,
        description: `${a} 与 ${b} 对比：${comparison.verdict} 查看能力维度、适用场景、价格取舍和常见问题。`,
        heading: `${a} vs ${b}`,
        kind: 'comparison',
        entityNames: [a, b],
      };
    }
  }

  return {
    path,
    title: `页面未找到｜${SITE_NAME}`,
    description: '该页面不存在或已迁移，请返回封神榜 Wiki 首页浏览大模型、AI 编程工具与测试集。',
    heading: '页面未找到',
    kind: 'not-found',
    robots: 'noindex,follow',
  };
}

export function buildSeoRoutes(data: SeoData): SeoPage[] {
  const dynamicPaths = [
    ...data.models.filter((model) => model.hasDetail).map((model) => `/models/${model.id}`),
    ...data.benchmarks.map((benchmark) => `/benchmarks/${benchmark.id}`),
    ...data.comparisons.map((comparison) => `/compare/${comparison.id}`),
  ];
  return [...staticPages, ...dynamicPaths.map((path) => resolveSeoPage(path, data))];
}

function breadcrumbItems(page: SeoPage): { name: string; item: string }[] {
  const items = [{ name: '首页', item: `${SITE_ORIGIN}/` }];
  if (page.path === '/') return items;
  const section = page.path.split('/')[1];
  const sectionNames: Record<string, string> = {
    models: '模型图鉴',
    harnesses: 'Harness 库',
    benchmarks: '测试集',
    teams: '配队榜',
    scenarios: '场景',
    guides: '攻略',
    tools: '工具箱',
    compare: '对决',
    changelog: '更新日志',
    methodology: '方法与规范',
  };
  const sectionPath = `/${section}`;
  items.push({ name: sectionNames[section] ?? page.heading, item: `${SITE_ORIGIN}${sectionPath}` });
  if (page.path !== sectionPath) items.push({ name: page.heading, item: `${SITE_ORIGIN}${page.path}` });
  return items;
}

export function buildJsonLd(page: SeoPage): Record<string, unknown> {
  const canonical = `${SITE_ORIGIN}${page.path === '/' ? '/' : page.path}`;
  const pageType = page.kind === 'about'
    ? 'AboutPage'
    : page.kind === 'collection' || page.kind === 'home'
      ? 'CollectionPage'
      : page.kind === 'benchmark'
        ? 'Dataset'
        : page.kind === 'model'
          ? 'TechArticle'
          : page.kind === 'comparison'
            ? 'Article'
            : 'WebPage';
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      alternateName: ['封神榜', 'FENGSHENBANG WIKI'],
      description: staticPages[0].description,
      inLanguage: 'zh-CN',
    },
    {
      '@type': pageType,
      '@id': `${canonical}#page`,
      url: canonical,
      name: page.heading,
      headline: page.title.replace(/｜封神榜 Wiki$/, ''),
      description: page.description,
      inLanguage: 'zh-CN',
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      ...(page.entityNames?.length
        ? { about: page.entityNames.map((name) => ({ '@type': 'Thing', name })) }
        : {}),
    },
  ];
  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbItems(page).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
