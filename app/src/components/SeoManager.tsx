import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { benchmarks } from '@/data/benchmarks';
import { comparisons } from '@/data/comparisons';
import { harnesses } from '@/data/harnesses';
import { models } from '@/data/models';
import { buildJsonLd, DEFAULT_SOCIAL_IMAGE, resolveSeoPage, SITE_ORIGIN } from '@/lib/seoCatalog';
import { useWikiData } from './wikiDataContext';

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
}

export default function SeoManager() {
  const { pathname } = useLocation();
  const wikiData = useWikiData();

  useEffect(() => {
    const page = resolveSeoPage(pathname, { models, benchmarks, comparisons, harnesses });
    const canonical = `${SITE_ORIGIN}${page.path === '/' ? '/' : page.path}`;
    document.documentElement.lang = 'zh-CN';
    document.title = page.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: page.description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: page.robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'zh_CN' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: '封神榜 Wiki' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_SOCIAL_IMAGE });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_SOCIAL_IMAGE });

    let canonicalElement = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = canonical;

    let jsonLd = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      jsonLd.dataset.seoJsonld = '';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(buildJsonLd(page));
  }, [pathname, wikiData.source, wikiData.lastModified]);

  return null;
}
