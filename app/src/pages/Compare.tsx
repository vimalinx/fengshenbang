import { Link, Navigate, useParams } from 'react-router';
import { Swords, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import { Reveal } from '@/components/Reveal';
import { comparisonById, comparisons, comparisonGroups, type Comparison } from '@/data/comparisons';
import { modelMap, modelAvatar } from '@/data/models';
import { harnessMap } from '@/data/harnesses';
import { cn } from '@/lib/utils';

function refInfo(ref: { refId: string; type: 'model' | 'harness' }) {
  if (ref.type === 'model') {
    const m = modelMap[ref.refId];
    return {
      name: m?.name ?? ref.refId,
      meta: m ? `${m.contextLabel} 上下文 · $${m.priceIn}/${m.priceOut} · SWE ${m.swe}%` : '',
      to: `/models/${ref.refId}`,
      badge: '模型',
      avatar: modelAvatar(m),
    };
  }
  const h = harnessMap[ref.refId];
  return {
    name: h?.name ?? ref.refId,
    meta: h ? `${h.type} · ${h.priceLabel}` : '',
    to: `/harnesses`,
    badge: 'Harness',
    avatar: h?.icon,
  };
}

/* ---------------- 列表页 ---------------- */
function CompareList() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '封神榜' }, { label: '对决' }]}
        title="对决"
        en="COMPARE"
        verdict="模型与 Harness 两两对决：维度对比、场景结论与 FAQ 一页看懂，选型不再拍脑袋。"
        badges={['10 组对决', '双参考派生', '赛季 2026-08']}
      />
      <div className="mx-auto max-w-[1280px] space-y-10 px-4 py-10 md:px-6">
        {comparisonGroups.map((g) => (
          <section key={g.label}>
            <SectionHeader title={g.label} en={g.label === '装备对决' ? 'HARNESS DUELS' : 'MODEL DUELS'} />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.ids.map((id) => {
                const c = comparisonById[id];
                const a = refInfo(c.a);
                const b = refInfo(c.b);
                return (
                  <Reveal key={id}>
                    <Link
                      to={`/compare/${id}`}
                      className="group block rounded-[6px] border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_8px_30px_rgba(184,134,11,0.10)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-[4px] bg-bg-alt px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                          {c.kind === 'harness' ? '装备对决' : '模型对决'}
                        </span>
                        <Swords className="h-4 w-4 text-gold" />
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg-alt text-base font-bold text-ink-1">
                            {a.name.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold text-ink-1">{a.name}</span>
                        </div>
                        <span className="font-mono text-[11px] text-ink-3">VS</span>
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg-alt text-base font-bold text-ink-1">
                            {b.name.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold text-ink-1">{b.name}</span>
                        </div>
                      </div>
                      <p className="mt-4 line-clamp-2 text-[13px] leading-relaxed text-ink-2">{c.verdict}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-accent">
                        看对决
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 详情页 ---------------- */
function CompareDetail({ c }: { c: Comparison }) {
  const a = refInfo(c.a);
  const b = refInfo(c.b);
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '封神榜' }, { label: '对决', to: '/compare' }, { label: `${a.name} vs ${b.name}` }]}
        title={`${a.name} vs ${b.name}`}
        en="DUEL"
        verdict={c.verdict}
        badges={[c.kind === 'harness' ? '装备对决' : '模型对决', '赛季 2026-08']}
      />
      <div className="mx-auto max-w-[1080px] space-y-12 px-4 py-10 md:px-6">
        {/* 双参考卡 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <Link to={a.to} className="block rounded-[6px] border border-line bg-white p-5 transition-colors hover:border-gold/60">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-alt text-sm font-bold text-ink-1">
                  {a.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="text-sm font-bold text-ink-1">{a.name}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-ink-3">{a.meta}</div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold text-accent">查看{a.badge}详情 →</div>
            </Link>
          </Reveal>
          <Reveal>
            <Link to={b.to} className="block rounded-[6px] border border-line bg-white p-5 transition-colors hover:border-gold/60">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-alt text-sm font-bold text-ink-1">
                  {b.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="text-sm font-bold text-ink-1">{b.name}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-ink-3">{b.meta}</div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold text-accent">查看{b.badge}详情 →</div>
            </Link>
          </Reveal>
        </div>

        {/* 维度对比表 */}
        <section>
          <SectionHeader title="维度对比" en="DIMENSIONS" />
          <div className="mt-5 overflow-hidden rounded-[6px] border border-line bg-white">
            <div className="grid grid-cols-[110px_1fr_64px_1fr] items-center border-b border-line bg-bg-alt px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">
              <span>维度</span>
              <span>{a.name}</span>
              <span className="text-center">胜</span>
              <span>{b.name}</span>
            </div>
            {c.dimensions.map((d, i) => (
              <div
                key={i}
                className={cn(
                  'grid grid-cols-[110px_1fr_64px_1fr] items-center gap-2 px-4 py-3 text-[13px]',
                  i % 2 === 1 && 'bg-bg-alt/40',
                )}
              >
                <span className="font-semibold text-ink-2">{d.name}</span>
                <span className={cn('text-ink-1', d.winner === 'a' && 'font-semibold text-gold')}>{d.a}</span>
                <span className="text-center font-mono text-[11px] text-ink-3">
                  {d.winner === 'a' ? 'A' : d.winner === 'b' ? 'B' : '—'}
                </span>
                <span className={cn('text-ink-1', d.winner === 'b' && 'font-semibold text-gold')}>{d.b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 场景结论 */}
        <section>
          <SectionHeader title="场景怎么选" en="SCENARIOS" />
          <div className="mt-5 space-y-3">
            {c.scenarios.map((s, i) => (
              <Reveal key={i}>
                <div className="flex items-start gap-4 rounded-[6px] border border-line bg-white p-4">
                  <span
                    className={cn(
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-bold',
                      s.pick === 'a' ? 'border-gold/40 bg-gold/10 text-gold' : 'border-accent/40 bg-accent/10 text-accent',
                    )}
                  >
                    {s.pick === 'a' ? 'A' : 'B'}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-ink-1">{s.name}</div>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{s.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionHeader title="常见问题" en="FAQ" />
          <div className="mt-5 space-y-3">
            {c.faq.map((f, i) => (
              <details key={i} className="group rounded-[6px] border border-line bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-ink-1">
                  {f.q}
                  <span className="font-mono text-xs text-ink-3 transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-line px-4 py-3 text-[13px] leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 更多对决 */}
        <section>
          <SectionHeader title="更多对决" en="MORE DUELS" />
          <div className="mt-5 flex flex-wrap gap-2">
            {comparisons
              .filter((x) => x.id !== c.id)
              .slice(0, 6)
              .map((x) => (
                <Link
                  key={x.id}
                  to={`/compare/${x.id}`}
                  className="rounded-[4px] border border-line bg-white px-3 py-1.5 text-[13px] text-ink-1 transition-colors hover:border-gold/60 hover:text-accent"
                >
                  {refInfo(x.a).name} vs {refInfo(x.b).name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- 入口 ---------------- */
export default function Compare() {
  const { pairId } = useParams();
  if (!pairId) return <CompareList />;
  const c = comparisonById[pairId];
  if (!c) return <Navigate to="/compare" replace />;
  return <CompareDetail c={c} />;
}
