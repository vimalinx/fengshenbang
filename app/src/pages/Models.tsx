import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import PageHero from '@/components/PageHero';
import ModelCard from '@/components/ModelCard';
import TierSeal from '@/components/TierSeal';
import StarRating from '@/components/StarRating';
import { Reveal } from '@/components/Reveal';
import type { Model, SystemId, Tier } from '@/data/models';
import { models, systems, systemMap, tierMap, modelAvatar } from '@/data/models';
import { cn } from '@/lib/utils';

/* ---------- 筛选维度常量 ---------- */
const ROLE_OPTIONS = ['代码', '推理', '长文', '多模态', '性价比', '开源'] as const;
const TIER_OPTIONS: Tier[] = ['T0', 'T1', 'T2'];

type SortKey = 'composite' | 'release' | 'price' | 'context' | 'speed';
const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: 'composite', label: '综合评分 ↓' },
  { id: 'release', label: '发布日期 ↓' },
  { id: 'price', label: '价格 ↑' },
  { id: 'context', label: '上下文 ↓' },
  { id: 'speed', label: '速度 ↓' },
];

function sortModels(list: Model[], key: SortKey): Model[] {
  const arr = [...list];
  switch (key) {
    case 'composite':
      return arr.sort((a, b) => b.composite - a.composite);
    case 'release':
      // 未发布模型排在已发布之后，避免占位日期扰乱时间序
      return arr.sort(
        (a, b) =>
          Number(a.unreleased ?? false) - Number(b.unreleased ?? false) ||
          b.releaseDate.localeCompare(a.releaseDate),
      );
    case 'price':
      return arr.sort((a, b) => (a.priceIn ?? Infinity) - (b.priceIn ?? Infinity));
    case 'context':
      return arr.sort((a, b) => b.contextTokens - a.contextTokens);
    case 'speed':
      return arr.sort((a, b) => b.stats.speed - a.stats.speed);
  }
}

/* ---------- 封神殿 T0 大角色卡 ---------- */
function T0Card({ model, index }: { model: Model; index: number }) {
  const navigate = useNavigate();
  const sys = systemMap[model.system];
  const price = model.priceIn == null ? model.priceLabel : `$${model.priceIn}·${model.priceOut}`;
  const stats: { label: string; value: string }[] = [
    { label: '综合分', value: model.composite.toFixed(1) },
    { label: 'SWE', value: `${model.swe.toFixed(1)}%` },
    { label: '上下文', value: model.contextLabel },
    { label: '价格', value: price },
  ];
  const goDetail = () => {
    if (model.hasDetail) navigate(`/models/${model.id}`);
    else toast('该角色传记编撰中', { description: `${model.name} · ${model.title}` });
  };
  return (
    <Reveal delay={0.1 + index * 0.12} className="h-full">
      <button
        onClick={goDetail}
        className="group flex h-full min-h-[220px] w-full flex-col rounded-xl border border-line bg-white p-4 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover"
      >
        <div className="flex items-start gap-3.5">
          {/* 金环流光头像 */}
          <div className="gold-sheen animate-gold-shine shrink-0 rounded-full p-[2px]">
            <div className="avatar-sheen h-24 w-24 overflow-hidden rounded-full border border-line bg-paper-alt">
              <img
                src={modelAvatar(model)}
                alt={model.name}
                className={cn('h-full w-full object-cover', !model.avatar && 'object-contain p-5')}
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-serif text-xl font-bold leading-tight text-ink">
                {model.name}
              </h3>
              <TierSeal tier={model.tier} size={24} animate={false} />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <StarRating stars={model.stars} size={11} />
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-medium tracking-[0.04em] text-white"
                style={{ backgroundColor: sys.color }}
              >
                {sys.name}
              </span>
            </div>
            <p className="mt-2 truncate font-serif text-[13px] italic text-ink-2">
              「{model.title}」 {model.verdict}
            </p>
          </div>
        </div>
        <div className="mt-3 grid flex-1 grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-xs">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between border-b border-line/70 pb-1">
              <span className="text-ink-3">{s.label}</span>
              <span className="font-bold text-gold">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-right text-[13px] font-medium text-daiqing transition-colors group-hover:text-cinnabar">
          查看详情 →
        </div>
      </button>
    </Reveal>
  );
}

/* ---------- 筛选 chip ---------- */
function Chip({
  active,
  activeColor,
  onClick,
  children,
  className,
}: {
  active: boolean;
  activeColor?: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.04em] transition-colors duration-200',
        active
          ? 'border-transparent text-white'
          : 'border-line bg-white text-ink-2 hover:border-gold hover:text-ink',
        className,
      )}
      style={active ? { backgroundColor: activeColor ?? '#C03A28' } : undefined}
    >
      {children}
    </button>
  );
}

/* ---------- 列表视图行 ---------- */
function ListRow({ model }: { model: Model }) {
  const navigate = useNavigate();
  const sys = systemMap[model.system];
  const tier = tierMap[model.tier];
  return (
    <button
      onClick={() => {
        if (model.hasDetail) navigate(`/models/${model.id}`);
        else toast('该角色传记编撰中', { description: `${model.name} · ${model.title}` });
      }}
      className="grid w-full min-w-[760px] grid-cols-[2fr_1fr_0.8fr_0.9fr_1fr_0.8fr_0.8fr] items-center gap-3 border-b border-line px-4 py-2.5 text-left transition-colors hover:bg-gold-soft/50"
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-line bg-paper-alt">
          <img
            src={modelAvatar(model)}
            alt=""
            className={cn('h-full w-full object-cover', !model.avatar && 'p-1')}
            loading="lazy"
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-serif text-sm font-semibold text-ink">{model.name}</span>
          <StarRating stars={model.stars} size={8} />
        </span>
      </span>
      <span className="flex items-center gap-1 text-xs text-ink-2">
        <img src={sys.sigil} alt="" className="h-4 w-4" />
        {sys.name}
      </span>
      <span className="font-serif text-xs font-bold" style={{ color: tier.color }}>
        {model.tier} {tier.name}
      </span>
      <span className="font-mono text-xs text-ink-2">{model.contextLabel}</span>
      <span className="font-mono text-xs text-ink-2">
        {model.priceIn == null ? model.priceLabel : `${model.priceLabel}`}
      </span>
      <span className="font-mono text-xs font-bold text-gold">
        {model.unreleased ? '未发布' : `${model.swe.toFixed(1)}%`}
      </span>
      <span className="font-mono text-xs font-bold text-ink">
        {model.unreleased ? '—' : model.composite.toFixed(1)}
      </span>
    </button>
  );
}

/* ---------- 页面 ---------- */
export default function Models() {
  const [system, setSystem] = useState<SystemId | 'all'>('all');
  const [tier, setTier] = useState<Tier | 'all'>('all');
  const [roles, setRoles] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('composite');
  const [view, setView] = useState<'card' | 'list'>('card');
  const [filterOpen, setFilterOpen] = useState(false);

  const t0Models = useMemo(() => models.filter((m) => m.tier === 'T0'), []);

  const filtered = useMemo(() => {
    const list = models.filter(
      (m) =>
        (system === 'all' || m.system === system) &&
        (tier === 'all' || m.tier === tier) &&
        (roles.length === 0 || roles.some((r) => m.roles.includes(r))),
    );
    return sortModels(list, sort);
  }, [system, tier, roles, sort]);

  const toggleRole = (r: string) =>
    setRoles((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  const filterRows = (
    <div className="space-y-2.5">
      {/* 行 1：体系 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 md:flex-wrap md:overflow-visible">
        <span className="shrink-0 font-serif text-xs font-semibold text-ink-3">体系</span>
        <Chip active={system === 'all'} onClick={() => setSystem('all')}>
          全部
        </Chip>
        {systems.map((s) => (
          <Chip
            key={s.id}
            active={system === s.id}
            activeColor={s.color}
            onClick={() => setSystem(system === s.id ? 'all' : s.id)}
          >
            <img src={s.sigil} alt="" className="h-4 w-4 rounded-full bg-white/80" />
            {s.name}
          </Chip>
        ))}
      </div>
      {/* 行 2：位阶 + 定位 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 md:flex-wrap md:overflow-visible">
        <span className="shrink-0 font-serif text-xs font-semibold text-ink-3">位阶</span>
        <Chip active={tier === 'all'} onClick={() => setTier('all')}>
          全部
        </Chip>
        {TIER_OPTIONS.map((t) => (
          <Chip
            key={t}
            active={tier === t}
            activeColor={tierMap[t].color}
            onClick={() => setTier(tier === t ? 'all' : t)}
          >
            {t} {tierMap[t].name}
          </Chip>
        ))}
        <span className="mx-1 hidden h-4 w-px shrink-0 bg-line-strong md:block" aria-hidden />
        <span className="shrink-0 font-serif text-xs font-semibold text-ink-3">定位</span>
        {ROLE_OPTIONS.map((r) => (
          <Chip key={r} active={roles.includes(r)} activeColor="#2F4858" onClick={() => toggleRole(r)}>
            {r}
          </Chip>
        ))}
      </div>
      {/* 行 3：排序 + 计数 + 视图 */}
      <div className="flex items-center gap-3">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-8 rounded-full border border-line bg-white px-3 text-xs text-ink-2 outline-none transition-colors focus:border-gold"
          aria-label="排序"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="font-mono text-xs text-ink-2">共 {filtered.length} 位</span>
        <div className="ml-auto flex items-center rounded-full border border-line bg-white p-0.5">
          {(
            [
              { id: 'card', icon: LayoutGrid, label: '卡片视图' },
              { id: 'list', icon: List, label: '列表视图' },
            ] as const
          ).map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              aria-label={v.label}
              className={cn(
                'rounded-full p-1.5 transition-colors duration-200',
                view === v.id ? 'bg-cinnabar text-white' : 'text-ink-3 hover:text-ink',
              )}
            >
              <v.icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Toaster position="top-center" />
      {/* S1 PageHero */}
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '角色图鉴' }]}
        title="角色图鉴"
        en="// CODEX OF MODELS"
        verdict="凡入榜者，皆经试炼淬炼。位阶随时令流转，强者为尊。"
        badges={['收录 14 位', '体系 10 支', '本季新晋 5 位']}
      />

      {/* S2 封神殿 · T0 展示带 */}
      <section className="relative bg-gold-soft">
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #B8860B 30%, #B8860B 70%, transparent)' }}
          aria-hidden
        />
        <div className="mx-auto flex max-w-[1280px] gap-5 px-4 py-8 md:px-6">
          <div className="hidden shrink-0 items-start justify-center md:flex">
            <span
              className="font-brand text-lg leading-none tracking-[0.3em] text-cinnabar"
              style={{ writingMode: 'vertical-rl' }}
            >
              封神殿
            </span>
          </div>
          <div className="grid min-w-0 flex-1 gap-4 md:grid-cols-3">
            {t0Models.map((m, i) => (
              <T0Card key={m.id} model={m} index={i} />
            ))}
          </div>
        </div>
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #B8860B 30%, #B8860B 70%, transparent)' }}
          aria-hidden
        />
      </section>

      {/* S3 筛选器栏（sticky） */}
      <div className="sticky top-[60px] z-20 border-b border-line bg-paper-alt/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-4 py-3 md:px-6">
          {/* 移动端折叠按钮 */}
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink md:hidden"
            aria-expanded={filterOpen}
          >
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-cinnabar" />
              筛选 · 共 {filtered.length} 位
            </span>
            <ChevronDown className={cn('h-4 w-4 transition-transform', filterOpen && 'rotate-180')} />
          </button>
          <div className={cn('mt-3 md:mt-0', filterOpen ? 'block' : 'hidden md:block')}>
            {filterRows}
          </div>
        </div>
      </div>

      {/* S4 角色卡片矩阵 */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        {filtered.length === 0 ? (
          <Reveal className="flex flex-col items-center py-20 text-center">
            <img src="/seal-stamp.svg" alt="" className="h-16 w-16 opacity-60" />
            <p className="mt-4 font-serif text-base text-ink-2">此条件下暂无在榜角色。</p>
            <p className="mt-1 font-mono text-xs text-ink-3">请放宽筛选条件再试。</p>
          </Reveal>
        ) : view === 'card' ? (
          <motion.div layout className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30, delay: Math.min(i * 0.03, 0.3) }}
                  onClickCapture={
                    m.hasDetail
                      ? undefined
                      : (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toast('该角色传记编撰中', { description: `${m.name} · ${m.title}` });
                        }
                  }
                >
                  <ModelCard model={m} className="h-full" />
                  <div className="mt-1.5 flex items-center justify-between px-1 font-mono text-[11px] text-ink-3">
                    <span>收录于 {m.collectedDate}</span>
                    <span>详情 →</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <Reveal>
            <div className="overflow-x-auto rounded-[10px] border border-line bg-white shadow-card">
              <div className="grid min-w-[760px] grid-cols-[2fr_1fr_0.8fr_0.9fr_1fr_0.8fr_0.8fr] gap-3 border-b border-line-strong bg-paper-alt px-4 py-2 font-mono text-[11px] tracking-wider text-ink-3">
                <span>名称</span>
                <span>体系</span>
                <span>位阶</span>
                <span>上下文</span>
                <span>价格</span>
                <span>SWE</span>
                <span>综合分</span>
              </div>
              {filtered.map((m) => (
                <ListRow key={m.id} model={m} />
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* S5 底部说明带 */}
      <Reveal>
        <section className="border-t border-line bg-paper-alt">
          <div className="mx-auto max-w-[1280px] space-y-1.5 px-4 py-6 text-xs leading-relaxed text-ink-2 md:px-6">
            <p>
              位阶评定规则：综合战力 = 代码修行 40% + 推理道行 25% + 性价比 20% + 生态契合
              15%，每周一 04:00 重算。
            </p>
            <p>数值来源为 2026-07 季度演示 mock，仅供观赏，不代表真实跑分。</p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
