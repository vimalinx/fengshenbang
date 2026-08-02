import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Terminal,
  SquareCode,
  ScrollText,
  Bot,
  Globe,
  X,
  ArrowRight,
  Swords,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Harness, HarnessType } from '@/data/harnesses';
import { harnesses, harnessMap, harnessTypes } from '@/data/harnesses';
import { modelMap, modelAvatar, systems } from '@/data/models';
import type { SystemId } from '@/data/models';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import HarnessCard from '@/components/HarnessCard';
import StarRating from '@/components/StarRating';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, LucideIcon> = {
  terminal: Terminal,
  'square-code': SquareCode,
  'scroll-text': ScrollText,
  bot: Bot,
  globe: Globe,
};

type StarFilter = 0 | 6 | 5 | 4;
type PriceFilter = '全部' | '开源' | '订阅' | '按量';
type SystemFilter = '全部' | '通用' | SystemId;
type SortKey = 'composite' | 'fit' | 'price';

const priceFilters: PriceFilter[] = ['全部', '开源', '订阅', '按量'];
const sortOptions: { id: SortKey; label: string }[] = [
  { id: 'composite', label: '综合评分' },
  { id: 'fit', label: '契合度' },
  { id: 'price', label: '价格' },
];

function matchPrice(h: Harness, f: PriceFilter): boolean {
  if (f === '全部') return true;
  if (f === '开源') return h.openSource;
  if (f === '订阅') return h.pricing.includes('订阅');
  return h.pricing.includes('按量');
}

function matchSystem(h: Harness, f: SystemFilter): boolean {
  if (f === '全部') return true;
  if (f === '通用') return h.fitSystemIds === 'all';
  return h.fitSystemIds === 'all' || h.fitSystemIds.includes(f);
}

function maxFit(h: Harness): number {
  return Math.max(...h.topFits.map((f) => f.pct));
}

/* ---------------- 筛选 chip ---------------- */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium tracking-[0.04em] transition-all duration-200',
        active
          ? 'border-cinnabar bg-cinnabar text-white shadow-sm'
          : 'border-line bg-white text-ink-2 hover:border-cinnabar/50 hover:text-cinnabar',
      )}
    >
      {children}
    </button>
  );
}

/* ---------------- 详情抽屉 ---------------- */
function HarnessDrawer({ harness, onClose }: { harness: Harness; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const staggerItem = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-[rgba(41,36,28,.3)] backdrop-blur-[2px]"
        aria-hidden
      />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        className="fixed inset-y-0 right-0 z-[61] w-full max-w-[480px] overflow-y-auto border-l border-line bg-paper-alt shadow-2xl"
        role="dialog"
        aria-label={`${harness.name} 详情`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-cinnabar hover:text-cinnabar"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>

        <div key={harness.id} className="px-6 pb-10 pt-10">
          {/* 顶：徽章 + 名 + 仙号 */}
          <motion.div
            {...staggerItem}
            transition={{ duration: 0.45, delay: 0.05, ease }}
            className="flex flex-col items-center text-center"
          >
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-line-strong bg-white shadow-card">
              <img src={harness.icon} alt={harness.name} className="h-full w-full object-cover" />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold leading-tight text-ink">
              {harness.name}
            </h2>
            <p className="mt-1 font-serif text-sm italic text-ink-2">「{harness.title}」</p>
            <div className="mt-2.5 flex items-center gap-2">
              <StarRating stars={harness.stars} />
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-daiqing/10 px-2.5 py-0.5 text-[11px] font-medium tracking-[0.04em] text-daiqing">
                {harness.type}
              </span>
              <span className="rounded-full bg-gold-soft px-2.5 py-0.5 font-mono text-[11px] font-bold text-gold">
                {harness.priceLabel}
              </span>
              {harness.openSource && (
                <span className="rounded-full bg-[#5E8C66]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#5E8C66]">
                  开源
                </span>
              )}
            </div>
          </motion.div>

          {/* 判词 */}
          <motion.blockquote
            {...staggerItem}
            transition={{ duration: 0.45, delay: 0.12, ease }}
            className="mt-7 flex gap-3"
          >
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-[3px] origin-top rounded-full bg-cinnabar"
              aria-hidden
            />
            <p className="font-serif text-sm italic leading-[1.8] text-ink-2">{harness.verdict}</p>
          </motion.blockquote>

          {/* 属性表 */}
          <motion.div
            {...staggerItem}
            transition={{ duration: 0.45, delay: 0.18, ease }}
            className="mt-7 rounded-[10px] border border-line bg-white p-4 shadow-card"
          >
            <h3 className="mb-2 font-serif text-sm font-semibold text-ink">属性</h3>
            <dl>
              {harness.attrs.map((a) => (
                <div
                  key={a.label}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-2 last:border-0"
                >
                  <dt className="shrink-0 text-xs text-ink-2">{a.label}</dt>
                  <dd className="text-right font-mono text-xs font-medium text-ink">{a.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* 被动技能 */}
          <motion.div
            {...staggerItem}
            transition={{ duration: 0.45, delay: 0.24, ease }}
            className="mt-4 rounded-[10px] border border-gold/40 bg-gold-soft p-4"
          >
            <h3 className="flex items-center gap-1.5 font-serif text-sm font-semibold text-ink">
              <Swords className="h-3.5 w-3.5 text-gold" />
              被动技能 · {harness.passive.split('，')[0]}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.75] text-ink-2">{harness.passiveDetail}</p>
          </motion.div>

          {/* 适配角色 Top3 */}
          <motion.div
            {...staggerItem}
            transition={{ duration: 0.45, delay: 0.3, ease }}
            className="mt-4 rounded-[10px] border border-line bg-white p-4 shadow-card"
          >
            <h3 className="mb-3 font-serif text-sm font-semibold text-ink">适配角色 · 契合度</h3>
            <div className="space-y-3">
              {harness.topFits.map((fit, i) => {
                const m = modelMap[fit.modelId];
                if (!m) return null;
                return (
                  <div key={fit.modelId} className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-line-strong bg-white">
                      <img
                        src={modelAvatar(m)}
                        alt={m.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-[13px] font-medium text-ink">{m.name}</span>
                        <span className="font-mono text-xs font-bold text-gold">{fit.pct}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paper">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${fit.pct}%` }}
                          transition={{ duration: 0.8, delay: 0.35 + i * 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gold-grad"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 border-t border-dashed border-line pt-2.5 font-mono text-[11px] text-ink-3">
              其余体系 · {harness.offFitLabel}
            </p>
          </motion.div>

          {/* 获取方式 + CTA */}
          <motion.div
            {...staggerItem}
            transition={{ duration: 0.45, delay: 0.36, ease }}
            className="mt-4 rounded-[10px] border border-line bg-white p-4 shadow-card"
          >
            <h3 className="font-serif text-sm font-semibold text-ink">获取方式</h3>
            <p className="mt-1.5 font-mono text-xs text-ink-2">{harness.obtain}</p>
            <Link
              to={`/tools?harness=${harness.id}`}
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-cinnabar px-4 py-2.5 text-[13px] font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-cinnabar-deep active:scale-[0.98]"
            >
              去配队模拟试用
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}

/* ---------------- 页面 ---------------- */
export default function Harnesses() {
  const location = useLocation();
  const [typeFilter, setTypeFilter] = useState<HarnessType | '全部'>('全部');
  const [starFilter, setStarFilter] = useState<StarFilter>(0);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('全部');
  const [systemFilter, setSystemFilter] = useState<SystemFilter>('全部');
  const [sortKey, setSortKey] = useState<SortKey>('composite');
  const [selected, setSelected] = useState<Harness | null>(null);

  /* URL hash 深链：/harnesses#claude-code 直接展开抽屉 */
  useEffect(() => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    setSelected(id && harnessMap[id] ? harnessMap[id] : null);
  }, [location.hash]);

  const closeDrawer = () => {
    setSelected(null);
    if (location.hash) window.history.replaceState(null, '', '/harnesses');
  };

  const filtered = useMemo(() => {
    const list = harnesses.filter(
      (h) =>
        (typeFilter === '全部' || h.type === typeFilter) &&
        (starFilter === 0 || h.stars === starFilter) &&
        matchPrice(h, priceFilter) &&
        matchSystem(h, systemFilter),
    );
    const sorted = [...list];
    if (sortKey === 'composite') sorted.sort((a, b) => b.composite - a.composite);
    else if (sortKey === 'fit') sorted.sort((a, b) => maxFit(b) - maxFit(a));
    else sorted.sort((a, b) => a.monthlyUSD - b.monthlyUSD || b.composite - a.composite);
    return sorted;
  }, [typeFilter, starFilter, priceFilter, systemFilter, sortKey]);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '法宝图鉴' }]}
        title="法宝图鉴"
        en="// ARMORY OF HARNESS"
        verdict="仙无法宝，如虎无翼。器型相合，方能人器合一。"
        badges={['收录 12 件', '器型 5 类', '开源 6 件']}
      />

      {/* S2 器型说明带 */}
      <section className="mx-auto max-w-[1280px] px-4 pt-10 md:px-6">
        <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {harnessTypes.map((t, i) => {
            const Icon = typeIcons[t.icon] ?? Terminal;
            return (
              <Reveal key={t.id} delay={i * 0.06} className="min-w-[200px] flex-1 lg:min-w-0">
                <button
                  onClick={() => setTypeFilter(typeFilter === t.id ? '全部' : t.id)}
                  className={cn(
                    'group flex h-full w-full items-center gap-3 rounded-[10px] border bg-white p-4 text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
                    typeFilter === t.id ? 'border-cinnabar' : 'border-line hover:border-gold',
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0 text-cinnabar transition-transform duration-300 group-hover:-rotate-6" />
                  <span className="min-w-0">
                    <span className="block font-serif text-[15px] font-semibold text-ink">
                      {t.id}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-2">{t.note}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* S3 筛选器栏（sticky） */}
      <div className="sticky top-[60px] z-40 mt-8 border-y border-line bg-paper-alt/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1280px] space-y-2.5 px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-12 shrink-0 text-xs text-ink-3">器型</span>
            <Chip active={typeFilter === '全部'} onClick={() => setTypeFilter('全部')}>
              全部
            </Chip>
            {harnessTypes.map((t) => (
              <Chip key={t.id} active={typeFilter === t.id} onClick={() => setTypeFilter(t.id)}>
                {t.id}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-12 shrink-0 text-xs text-ink-3">星级</span>
              {([0, 6, 5, 4] as StarFilter[]).map((s) => (
                <Chip key={s} active={starFilter === s} onClick={() => setStarFilter(s)}>
                  {s === 0 ? '全部' : `★${s}`}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-12 shrink-0 text-xs text-ink-3">价格</span>
              {priceFilters.map((p) => (
                <Chip key={p} active={priceFilter === p} onClick={() => setPriceFilter(p)}>
                  {p === '开源' ? '免费开源' : p}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-12 shrink-0 text-xs text-ink-3">体系</span>
              <Chip active={systemFilter === '全部'} onClick={() => setSystemFilter('全部')}>
                全部
              </Chip>
              {systems.slice(0, 5).map((s) => (
                <Chip key={s.id} active={systemFilter === s.id} onClick={() => setSystemFilter(s.id)}>
                  {s.name}
                </Chip>
              ))}
              <Chip active={systemFilter === '通用'} onClick={() => setSystemFilter('通用')}>
                全系通用
              </Chip>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-dashed border-line pt-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-3">排序</span>
              {sortOptions.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSortKey(o.id)}
                  className={cn(
                    'text-xs transition-colors duration-200',
                    sortKey === o.id
                      ? 'font-medium text-cinnabar'
                      : 'text-ink-2 hover:text-cinnabar',
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <span className="font-mono text-xs text-ink-2">
              共 <span className="font-bold text-cinnabar">{filtered.length}</span> 件
            </span>
          </div>
        </div>
      </div>

      {/* S4 法宝卡片矩阵 */}
      <section className="mx-auto max-w-[1280px] px-4 py-10 md:px-6">
        <SectionHeader title="法宝名录" en="// HARNESS INDEX" />
        {filtered.length === 0 ? (
          <div className="rounded-[10px] border border-dashed border-line-strong bg-white/60 py-16 text-center">
            <p className="font-serif text-base text-ink-2">此筛选组合下暂无法宝收录。</p>
            <p className="mt-1.5 font-mono text-xs text-ink-3">NO HARNESS MATCHES · 试试放宽条件</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((h, i) => (
                <motion.div
                  key={h.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    layout: { type: 'spring', stiffness: 380, damping: 34 },
                    duration: 0.35,
                    delay: i < 8 ? i * 0.05 : 0,
                  }}
                >
                  <HarnessCard harness={h} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* S6 底部说明带 */}
      <section className="border-t border-line bg-paper-alt">
        <Reveal className="mx-auto max-w-[1280px] space-y-1.5 px-4 py-6 text-center md:px-6">
          <p className="text-xs leading-[1.7] text-ink-2">
            法宝与角色的契合度 = 同宗加成 × 器型匹配 × 场景相性，
            <Link to="/tools" className="link-underline text-daiqing hover:text-cinnabar">
              配队模拟器
            </Link>
            可自由试算。
          </p>
          <p className="font-mono text-[11px] text-ink-3">价格与能力均为 2026-07 演示 mock。</p>
        </Reveal>
      </section>

      {/* S5 详情抽屉 */}
      <AnimatePresence>
        {selected && <HarnessDrawer harness={selected} onClose={closeDrawer} />}
      </AnimatePresence>
    </div>
  );
}
