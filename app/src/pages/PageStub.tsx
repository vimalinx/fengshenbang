import PageHero from '@/components/PageHero';

/**
 * 页面占位组件 —— 由对应页面代理实现完整内容。
 */
export default function PageStub({
  title,
  en,
  verdict,
  crumb,
}: {
  title: string;
  en: string;
  verdict: string;
  crumb?: string;
}) {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: crumb ?? title }]}
        title={title}
        en={en}
        verdict={verdict}
      />
      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-24 text-center">
        <img src="/seal-stamp.svg" alt="" className="h-20 w-20 opacity-70" />
        <p className="mt-6 font-serif text-lg text-ink-2">此殿阁尚在营造中，敬请期待。</p>
        <p className="mt-2 font-mono text-xs tracking-wider text-ink-3">UNDER CONSTRUCTION · {en}</p>
      </div>
    </div>
  );
}
