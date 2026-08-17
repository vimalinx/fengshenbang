import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  Flame,
  Medal,
  Swords,
  Users,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import StarRating from '@/components/StarRating';
import { Reveal } from '@/components/Reveal';
import { TooltipProvider } from '@/components/ui/tooltip';
import { trials, trialMap } from '@/data/trials';
import type { Trial, TrialFloor } from '@/data/trials';
import { cn } from '@/lib/utils';

/* ============ 各层「推荐打法」一行提示（页面级 mock，配合层关 accordion） ============ */
const FLOOR_HINTS: Record<string, string[]> = {
  frontend: [
    '先喂一张高保真截图，让模型输出 DOM 骨架，再逐块精修样式。',
    '整页复刻按「布局 → 配色 → 间距」三轮走，不要一次全要。',
    '部署链路第一天打通，动效与暗色模式留到最后 4 小时冲刺。',
  ],
  refactor: [
    '先让模型产出《迁移计划书》，人类审过再动手（审慎模式）。',
    '每 90 分钟 checkpoint 提交，跑偏可回滚不心疼。',
    '复核流守门：第二位模型只做验收，不参与产出。',
  ],
  agent: [
    '把 5 步任务写成显式状态机，工具描述逐条写清边界。',
    '三灵偶任务正交切分，重叠部分交给共享黑板裁决。',
    '监工模型只审不写；死锁时先查共享记忆的写入顺序。',
  ],
  algo: [
    'Medium 题别急着秒：先让模型复述题意与边界条件。',
    'Hard 题要求完整推理链 + 20 组自造边界用例再提交。',
    '三种范式分别实现后互相对拍，暴力解是最好的人证。',
  ],
  fullstack: [
    'Schema 先行：数据库设计不定，后面全是返工。',
    '支付鉴权交给成熟库，模型只负责胶水层。',
    '部署脚本第一天就写，每个里程碑第二位模型验收。',
  ],
  docs: [
    '先让长文模型吞仓读完代码，再动笔重写 README。',
    '风格样章钉死：先写一段范本，后续全部对齐。',
    '万字专著按章节周更，模型出初稿，人类注入灵魂。',
  ],
};

/* ============ S2. 试炼总览卡 ============ */
function TrialOverviewCard({
  trial,
  active,
  onSelect,
  index,
}: {
  trial: Trial;
  active: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <button
        onClick={onSelect}
        aria-pressed={active}
        className={cn(
          'group block w-full overflow-hidden rounded-[10px] bg-white text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
          active
            ? 'border-[1.5px] border-gold ring-1 ring-gold/40'
            : 'border border-line hover:border-gold/60',
        )}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={trial.image}
            alt={trial.fullName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-2 top-2 rounded-full bg-[rgba(251,248,241,0.92)] px-2 py-0.5 backdrop-blur-sm">
            <StarRating stars={trial.difficulty} size={9} />
          </span>
        </div>
        <div className="p-3.5">
          <h3
            className={cn(
              'font-serif text-[17px] font-semibold leading-snug transition-colors',
              active ? 'text-cinnabar' : 'text-ink group-hover:text-cinnabar',
            )}
          >
            {trial.name} · {trial.scene}
          </h3>
          <p className="mt-1 text-xs text-ink-2">{trial.note}</p>
          <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-cinnabar/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.04em] text-cinnabar">
            <Flame className="h-3 w-3" aria-hidden />
            适配 {trial.suitTarget}
          </span>
        </div>
      </button>
    </Reveal>
  );
}

/* ============ S3 左列：层关行（accordion） ============ */
function FloorRow({
  floor,
  hint,
  open,
  onToggle,
  index,
}: {
  floor: TrialFloor;
  hint: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const isDengxian = floor.level === '三层';
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={cn(
        'overflow-hidden rounded-lg border transition-colors',
        isDengxian ? 'border-gold/50 bg-gold-soft/40' : 'border-line bg-white',
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-gold-soft/50"
      >
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-serif text-[13px] font-bold text-white',
            isDengxian ? 'gold-sheen animate-gold-shine' : 'bg-daiqing',
          )}
        >
          {floor.level.replace('层', '')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-serif text-sm font-semibold text-ink">{floor.name}</span>
            <StarRating stars={floor.difficulty} size={9} />
          </div>
          <p className="mt-0.5 truncate text-xs text-ink-2">{floor.condition}</p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-paper px-2.5 py-1 font-mono text-[11px] text-gold sm:block">
          {floor.reward}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-ink-3">
          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="border-t border-line/70 bg-paper-alt/70 px-3.5 py-2.5 text-[13px] leading-relaxed text-ink-2">
              <span className="mr-1.5 rounded-[4px] bg-cinnabar/10 px-1.5 py-px font-serif text-xs font-semibold text-cinnabar">
                推荐打法
              </span>
              {hint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============ S3. 试炼详情面板 ============ */
function TrialDetailPanel({ trial }: { trial: Trial }) {
  const [openFloor, setOpenFloor] = useState<number | null>(null);
  const hints = FLOOR_HINTS[trial.id] ?? [];

  return (
    <motion.div
      key={trial.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="grid gap-6 lg:grid-cols-12"
    >
      {/* 左列：层关 + 通关要点 */}
      <div className="space-y-5 lg:col-span-7">
        <div className="rounded-xl border border-line bg-white p-4 shadow-card md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-ink">层关</h3>
            <span className="font-mono text-[11px] text-ink-3">点击行展开推荐打法</span>
          </div>
          <div className="space-y-2.5">
            {trial.floors.map((f, i) => (
              <FloorRow
                key={f.level}
                floor={f}
                hint={hints[i] ?? ''}
                index={i}
                open={openFloor === i}
                onToggle={() => setOpenFloor(openFloor === i ? null : i)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gold/40 bg-gold-soft/50 p-4 md:p-5">
          <h3 className="mb-3 flex items-center gap-2 font-serif text-base font-semibold text-ink">
            <Swords className="h-4 w-4 text-cinnabar" aria-hidden />
            通关要点
          </h3>
          <ol className="space-y-2.5">
            {trial.tips.map((tip, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-[1.7] text-ink-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[11px] font-bold text-gold shadow-xs">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 右列：适配体系 + 推荐配队 */}
      <div className="space-y-5 lg:col-span-5">
        <div className="rounded-xl border border-cinnabar/30 bg-cinnabar/5 p-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-cinnabar" aria-hidden />
            <h3 className="font-serif text-base font-semibold text-cinnabar">适配体系</h3>
          </div>
          <p className="mt-2 font-serif text-sm font-semibold text-ink">
            本场景最吃 {trial.suitTarget} 的长处
          </p>
          <p className="mt-1 font-mono text-[11px] text-ink-3">站点编排的适配建议，非实测</p>
        </div>

        <div className="rounded-xl border border-line bg-white p-4 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 font-serif text-base font-semibold text-ink">
              <Users className="h-4 w-4 text-daiqing" aria-hidden />
              推荐配队
            </h3>
            <Link to="/teams" className="link-underline text-xs font-medium text-daiqing hover:text-cinnabar">
              配队推演 →
            </Link>
          </div>
          <div className="space-y-2">
            {trial.recommend.map((r, i) => (
              <Link
                key={r.name}
                to={r.teamId ? `/teams#${r.teamId}` : '/teams'}
                className="group flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 transition-all duration-200 hover:border-gold/60 hover:bg-gold-soft/40"
              >
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold text-white',
                    i === 0 ? 'gold-sheen animate-gold-shine' : 'bg-t2',
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate font-serif text-sm font-semibold text-ink transition-colors group-hover:text-cinnabar">
                  {r.name}
                </span>
                <span className="shrink-0 font-mono text-xs text-ink-2">
                  推荐 #{i + 1}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-cinnabar opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ============ 页面 ============ */
export default function Scenarios() {
  const location = useLocation();
  const [activeId, setActiveId] = useState<string>('refactor'); // 默认选中「天柱试炼」
  const detailRef = useRef<HTMLDivElement>(null);
  const active = trialMap[activeId] ?? trials[1];

  // URL hash 直达试炼（/scenarios#refactor）
  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (id && trialMap[id]) {
      setActiveId(id);
      const t = window.setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => window.clearTimeout(t);
    }
  }, [location.hash]);

  const select = (id: string, scroll = true) => {
    setActiveId(id);
    window.history.replaceState(null, '', `#${id}`);
    if (scroll) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <TooltipProvider delayDuration={150}>
      {/* S1. PageHero */}
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '试炼之境' }]}
        title="试炼之境"
        en="// TRIALS OF THE REALM"
        verdict="六境轮回，各验其道。过登仙层者，名刻封神台。"
        badges={[`场景 ${trials.length} 类`, '三层难度分级', '站点主观编排']}
      />

      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6">
        {/* S2. 试炼总览卡带 */}
        <section aria-label="试炼总览">
          <SectionHeader title="六境总览" en="// SIX TRIALS" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trials.map((t, i) => (
              <TrialOverviewCard
                key={t.id}
                trial={t}
                index={i}
                active={t.id === activeId}
                onSelect={() => select(t.id)}
              />
            ))}
          </div>
        </section>

        {/* S3. 试炼详情区 */}
        <section ref={detailRef} className="mt-12 scroll-mt-[76px]" aria-label="试炼详情">
          <SectionHeader title={active.fullName} en="// TRIAL DETAIL" />
          {/* Tab 条 */}
          <div
            role="tablist"
            aria-label="切换试炼"
            className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-line bg-white p-1.5 shadow-card"
          >
            {trials.map((t) => {
              const isActive = t.id === activeId;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => select(t.id, false)}
                  className={cn(
                    'relative flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors',
                    isActive ? 'text-ink' : 'text-ink-2 hover:bg-paper-alt hover:text-ink',
                  )}
                >
                  <img
                    src={t.image}
                    alt=""
                    className="h-6 w-6 rounded-[4px] border border-line object-cover"
                    loading="lazy"
                  />
                  {t.name}
                  {isActive && (
                    <motion.span
                      layoutId="trial-tab-underline"
                      className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <TrialDetailPanel key={active.id} trial={active} />
          </AnimatePresence>
        </section>
      </div>

      {/* S4. 试炼通则 */}
      <section className="border-t border-line bg-paper-alt" aria-label="试炼通则">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6">
          <SectionHeader title="试炼通则" en="// RULES OF THE REALM" />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: CalendarClock,
                title: '三层难度分级',
                body: 'L1/L2/L3 按任务规模与容错空间递进，条件写明「做到什么算过」，方便横向比较模型与配队的适用面。',
              },
              {
                icon: Medal,
                title: '口径说明',
                body: '场景分类、难度星级与适配体系均为本站主观编排，非实测跑分；积分与徽章是风味文案，本站并无对应机制。',
              },
            ].map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <div className="flex h-full gap-3.5 rounded-xl border border-line bg-white p-5 shadow-card">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cinnabar/10">
                    <r.icon className="h-5 w-5 text-cinnabar" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-ink">{r.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.7] text-ink-2">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
