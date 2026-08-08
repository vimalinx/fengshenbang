import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronLeft, ChevronRight, Compass, ListOrdered, Coins,
  Layers, Users, Wrench, ArrowRight,
} from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import TierSeal from '@/components/TierSeal';
import StarRating from '@/components/StarRating';
import ModelCard, { ModelMonogram } from '@/components/ModelCard';
import GuideListItem from '@/components/GuideListItem';
import UpdateLog from '@/components/UpdateLog';
import { Reveal } from '@/components/Reveal';
import { modelMap, ladderComposite, ladderCode, ladderValue, systemMap, type Model } from '@/data/models';
import { trials } from '@/data/trials';
import { guides, guideCategories } from '@/data/guides';
import { teams } from '@/data/teams';
import { cn } from '@/lib/utils';

/* ================= S1. 本期推荐 / THIS WEEK（纯排版轮播卡） ================= */

interface UpBanner {
  tag: string;
  name: string;
  title: string;
  tier?: 'T0';
  stars?: number;
  verdict: string;
  capsules: string[];
  cta: { label: string; to: string; primary?: boolean }[];
}

const UP_BANNERS: UpBanner[] = [
  {
    tag: '本期推荐 · 模型',
    name: 'Claude Opus 4.7',
    title: '长程自治旗舰',
    tier: 'T0',
    stars: 6,
    verdict: '支持 40 小时级连续自治编码，长程重构场景通过率全场最高。',
    capsules: ['SWE 82.4%', '上下文 1M', '$8/$40'],
    cta: [
      { label: '查看模型详情 →', to: '/models/claude-opus-4-7', primary: true },
      { label: '加入配队模拟', to: '/tools' },
    ],
  },
  {
    tag: '本期推荐 · HARNESS',
    name: 'Claude Code 2.0',
    title: '终端智能体',
    verdict: '终端内体验最完整的 Coding Agent，全仓感知能力领先。',
    capsules: ['CLI 工具', 'Claude 系 +18%', '$20/月起'],
    cta: [{ label: '查看 Harness →', to: '/harnesses', primary: true }],
  },
  {
    tag: '本期推荐 · 性价比',
    name: 'DeepSeek-V4',
    title: '高性价比开源主力',
    verdict: '以约十分之一的旗舰价格，提供八成以上的代码能力。',
    capsules: ['SWE 74.2%', '$0.8/$2.4', '开源可自部署'],
    cta: [{ label: '查看模型 →', to: '/models', primary: true }],
  },
];

/** 倒计时：距轮换 12 天起逐秒跳动 */
function useCountdown() {
  const [left, setLeft] = useState(12 * 86400 + 7 * 3600 + 42 * 60 + 33);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.floor(left / 86400);
  const h = Math.floor((left % 86400) / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `距轮换 ${d}天 ${pad(h)}:${pad(m)}:${pad(s)}`;
}

function UpCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const countdown = useCountdown();

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // 自动播放 6s，悬停暂停
  useEffect(() => {
    if (!emblaApi || hover) return;
    const t = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(t);
  }, [emblaApi, hover]);

  return (
    <div
      className="group/car relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 倒计时徽章 */}
      <div className="absolute right-4 top-4 z-20 rounded-[4px] border border-line bg-white px-2.5 py-1 font-mono text-xs font-bold text-ink">
        {countdown}
      </div>

      <div className="overflow-hidden rounded-[6px] border border-line bg-white" ref={emblaRef}>
        <div className="flex">
          {UP_BANNERS.map((b) => (
            <div key={b.tag} className="relative min-w-0 flex-[0_0_100%]">
              {/* accent 细线 */}
              <div className="h-[2px] w-full bg-accent" aria-hidden />
              <div className="flex min-h-[260px] flex-col justify-center p-6 md:p-10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    // {b.tag}
                  </span>
                  {b.tier && <TierSeal tier={b.tier} size={22} />}
                  {b.stars && <StarRating stars={b.stars} size={11} />}
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-[32px] font-bold leading-tight tracking-tight text-ink md:text-[44px]">
                    {b.name}
                  </h3>
                  <span className="text-base font-medium text-ink-2 md:text-lg">{b.title}</span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-2">{b.verdict}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-ink-2">
                  {b.capsules.map((c) => (
                    <span key={c} className="flex items-center gap-1.5">
                      <span className="inline-block h-1 w-1 bg-accent" aria-hidden />
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {b.cta.map((c) => (
                    <Link
                      key={c.label}
                      to={c.to}
                      className={cn(
                        'rounded-[4px] px-4 py-2 text-[13px] font-medium transition-colors duration-150',
                        c.primary
                          ? 'bg-accent text-white hover:bg-accent-deep'
                          : 'border border-line bg-white text-ink hover:border-ink',
                      )}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-6 z-20 flex gap-1.5 md:left-10">
        {UP_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`第 ${i + 1} 张`}
            className={cn(
              'h-[3px] transition-all duration-150',
              i === index ? 'w-6 bg-accent' : 'w-3 bg-line-strong hover:bg-ink-3',
            )}
          />
        ))}
      </div>

      {/* 悬停箭头 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 opacity-0 transition-opacity duration-150 group-hover/car:opacity-100">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="上一张"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-[4px] border border-line bg-white text-ink transition-colors duration-150 hover:border-ink"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="下一张"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-[4px] border border-line bg-white text-ink transition-colors duration-150 hover:border-ink"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ================= S2-A. 梯队榜速览 ================= */

function LadderRow({
  rank,
  model,
  right,
  delay,
}: {
  rank: number;
  model?: Model;
  right: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
    >
      <Link
        to={model?.hasDetail ? `/models/${model.id}` : '/models'}
        className="group flex items-center gap-2.5 rounded-[4px] px-2 py-1.5 transition-colors duration-150 hover:bg-bg-alt"
      >
        <span
          className={cn(
            'w-5 shrink-0 text-center font-mono font-bold',
            rank === 1 ? 'text-xl text-ink' : 'text-sm text-ink-3',
          )}
        >
          {rank}
        </span>
        {model && (
          <ModelMonogram name={model.name} color={systemMap[model.system].color} icon={systemMap[model.system].sigil} size={28} />
        )}
        <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{model?.name}</span>
        <span className="shrink-0 font-mono text-xs font-bold text-ink-2">{right}</span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
      </Link>
    </motion.div>
  );
}

function LadderSection() {
  const cards: {
    title: string;
    rows: { rank: number; model?: Model; right: string }[];
  }[] = [
    {
      title: '综合战力榜',
      rows: ladderComposite.slice(0, 5).map((m, i) => ({
        rank: i + 1,
        model: m,
        right: m.composite.toFixed(1),
      })),
    },
    {
      title: '代码能力榜',
      rows: ladderCode.slice(0, 5).map((m, i) => ({
        rank: i + 1,
        model: m,
        right: `${m.swe.toFixed(1)}%`,
      })),
    },
    {
      title: '性价比榜',
      rows: ladderValue.map((r) => ({
        rank: r.rank,
        model: r.modelId ? modelMap[r.modelId] : undefined,
        right: '',
      })),
    },
  ];

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  // 自动轮播 5s，悬停暂停
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % cards.length), 5000);
    return () => clearInterval(t);
  }, [hover, cards.length]);

  const active = cards[index];

  return (
    <section>
      <SectionHeader title="T0 梯队 · 榜单速览" en="// TIER LIST" moreTo="/models" moreLabel="完整榜单 →" />
      <Reveal>
        <div
          className="rounded-[6px] border border-line bg-white p-3"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* 榜单切换 tabs（兼作轮播指示器） */}
          <div className="mb-2 flex items-center gap-1 overflow-x-auto border-b border-line px-1 pb-2">
            {cards.map((c, i) => (
              <button
                key={c.title}
                onClick={() => setIndex(i)}
                className={cn(
                  'relative shrink-0 px-3 py-1.5 text-[13px] font-medium transition-colors duration-150',
                  i === index ? 'text-accent' : 'text-ink-2 hover:text-ink',
                )}
              >
                {c.title}
                {i === index && (
                  <motion.span
                    layoutId="ladder-tab"
                    className="absolute inset-x-3 bottom-0 h-0.5 bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <span className="ml-auto pr-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
              TOP 5
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-0.5"
            >
              {active.rows.map((r, ri) =>
                r.model ? (
                  <LadderRow
                    key={r.model.id}
                    rank={r.rank}
                    model={r.model}
                    right={r.right}
                    delay={ri * 0.03}
                  />
                ) : (
                  <div key={`x-${r.rank}`} className="flex items-center gap-2.5 rounded-[4px] px-2 py-1.5">
                    <span className="w-5 shrink-0 text-center font-mono text-sm font-bold text-ink-3">
                      {r.rank}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-bg-alt font-mono text-[10px] font-semibold text-ink-3">
                      MI
                    </span>
                    <span className="flex-1 truncate text-[13px] text-ink">Mistral Large 4</span>
                  </div>
                ),
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= S2-B. 当期场景 ================= */

function TrialsSection() {
  const featured = ['refactor', 'frontend', 'agent'].map((id) => trials.find((t) => t.id === id)!);
  return (
    <section>
      <SectionHeader title="当期场景" en="// SCENARIOS" moreTo="/scenarios" moreLabel="全部场景 →" />
      <div className="flex gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible">
        {featured.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.04} className="min-w-[260px] md:min-w-0">
            <Link
              to={`/scenarios#${t.id}`}
              className="group flex h-full flex-col rounded-[6px] border border-line bg-white transition-all duration-150 hover:-translate-y-0.5 hover:border-ink"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                  {String(i + 1).padStart(2, '0')} / {t.name}
                </span>
                <span className="rounded-[4px] bg-accent-soft px-1.5 py-px font-mono text-[11px] text-accent">
                  {t.buff}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <StarRating stars={t.difficulty} size={11} />
                <h3 className="mt-2 text-[15px] font-semibold text-ink">{t.fullName}</h3>
                <p className="mt-1 text-xs text-ink-2">{t.note}</p>
                <p className="mt-3 border-t border-line pt-2.5 text-xs text-ink-2">
                  推荐配队：<span className="font-medium text-accent">{t.recommend[0].name}</span>
                  <span className="ml-2 font-mono text-ink-3">通过率 {t.recommend[0].passRate}%</span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-3">
        场景增益每周一 04:00 轮换 · 通关大师层可获大师徽章
      </p>
    </section>
  );
}

/* ================= S2-C. 攻略推荐 ================= */

function GuidesSection() {
  const tabs = guideCategories.map((c) => c.id);
  const [tab, setTab] = useState<(typeof tabs)[number]>('认知');
  const list = useMemo(
    () =>
      guides
        .filter((g) => g.category === tab)
        .sort((a, b) => b.readsNum - a.readsNum)
        .slice(0, 6),
    [tab],
  );

  return (
    <section>
      <SectionHeader title="攻略推荐" en="// GUIDES" moreTo="/guides" moreLabel="全部攻略 →" />
      <div className="rounded-[6px] border border-line bg-white p-3 md:p-4">
        {/* Tabs */}
        <div className="mb-3 flex gap-1 overflow-x-auto border-b border-line pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'relative shrink-0 px-3 py-1.5 text-[13px] font-medium transition-colors duration-150',
                tab === t ? 'text-accent' : 'text-ink-2 hover:text-ink',
              )}
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId="guide-tab"
                  className="absolute inset-x-3 bottom-0 h-0.5 bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-x-6 md:grid-cols-2"
          >
            {list.map((g, i) => (
              <motion.li
                key={g.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03, ease: 'easeOut' }}
              >
                <GuideListItem guide={g} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================= S2-D. 新晋模型 ================= */

function NewArrivalsSection() {
  const ids = ['grok-5', 'deepseek-r2', 'qwen3-max', 'gemini-3-flash', 'claude-haiku-4-5'];
  return (
    <section>
      <SectionHeader title="新晋模型 · 最近收录" en="// NEW ARRIVALS" moreTo="/models" moreLabel="模型图鉴 →" />
      <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {ids.map((id, i) => {
          const m = modelMap[id];
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
              className="w-[240px] shrink-0"
            >
              <ModelCard model={m} cornerBadge="NEW" className="h-full" />
              <p className="mt-1.5 pl-1 font-mono text-[11px] text-ink-3">收录于 {m.collectedDate}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ================= S2-E. 新手上路 ================= */

const START_HERE = [
  { icon: Compass, title: '如何选第一位主力模型', desc: 'T0 虽强，趁手为先', to: '/guides' },
  { icon: ListOrdered, title: '读懂梯队榜', desc: 'T0/T1/T2 的分级逻辑', to: '/models' },
  { icon: Coins, title: '成本入门：Token 计价', desc: '输出才是成本大头', to: '/tools' },
  { icon: Layers, title: '上下文管理基础', desc: '1M 不等于 1M', to: '/guides' },
  { icon: Users, title: '配队思路：复核流与蜂群流', desc: '双模型协作，事半功倍', to: '/teams' },
  { icon: Wrench, title: 'Harness 上手：装机指南', desc: '按场景选装备', to: '/harnesses' },
];

function StartHereSection() {
  return (
    <section>
      <SectionHeader title="新手上路 · 入门指南" en="// START HERE" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {START_HERE.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.03}>
            <Link
              to={a.to}
              className="group flex h-full items-start gap-3 rounded-[6px] border border-line bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-ink"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-accent-soft text-accent">
                <a.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-medium text-ink">{a.title}</span>
                <span className="mt-0.5 block text-xs text-ink-2">{a.desc}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= 侧栏 ================= */

function RotationCard() {
  return (
    <div className="rounded-[6px] border border-line bg-white p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
        // 本周轮换 · WEEK 3
      </p>
      <div className="mt-3 space-y-2">
        {[
          { label: 'Claude 系', value: '+15%' },
          { label: '复核流', value: '+15%' },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between text-[13px]">
            <span className="text-ink">{r.label}</span>
            <span className="font-mono text-xs font-bold text-accent">{r.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-line pt-2.5 text-xs leading-relaxed text-ink-2">
        场景增益每周一 04:00 轮换，本周适配长程重构场景。
      </p>
    </div>
  );
}

function TeamTrendCard() {
  const top = [...teams].sort((a, b) => b.usage - a.usage).slice(0, 3);
  const colors = ['#09090B', '#B8860B', '#A1A1AA'];
  return (
    <div className="rounded-[6px] border border-line bg-white p-4">
      <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
        <span className="inline-block h-3 w-1 bg-accent" aria-hidden />
        本周配队趋势
      </h3>
      <ul className="mt-3 space-y-2">
        {top.map((t, i) => (
          <li key={t.id} className="flex items-center justify-between text-[13px]">
            <Link to="/teams" className="text-ink transition-colors duration-150 hover:text-accent">
              {t.name}
            </Link>
            <span className="font-mono text-xs font-bold" style={{ color: colors[i] }}>
              {t.usage}%
            </span>
          </li>
        ))}
      </ul>
      {/* 占比条 */}
      <div className="mt-3 flex h-1 overflow-hidden rounded-full bg-line">
        {top.map((t, i) => (
          <motion.div
            key={t.id}
            className="h-full"
            style={{ backgroundColor: colors[i] }}
            initial={{ width: 0 }}
            whileInView={{ width: `${t.usage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] text-ink-3">// 榜单使用占比 · WEEK 3</p>
    </div>
  );
}

function DisclaimerCard() {
  return (
    <div className="rounded-[6px] border border-line bg-bg-alt p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
        SEASON 2026-07 · FICTIONAL DATA FOR DEMO
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-ink-3">
        本站为爱好者演示 Wiki，数值均为虚构 mock。
      </p>
    </div>
  );
}

/* ================= 页面组装 ================= */

export default function Home() {
  return (
    <div>
      {/* S0 品牌 H1（SEO 唯一 H1；视觉克制，不抢轮播焦点） */}
      <div className="mx-auto max-w-[1280px] px-4 pt-6 md:px-6 md:pt-8">
        <Reveal>
          <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
            <h1 className="font-serif text-xl font-bold tracking-[0.02em] text-ink-1 md:text-2xl">
              封神榜 · AI 编程模型与工具图鉴
            </h1>
            <p className="text-xs leading-relaxed text-ink-2 md:text-[13px]">
              模型即神将，工具即神兵。图鉴 / 配队 / 对决，一榜看懂 AI 编程生态。
            </p>
          </header>
        </Reveal>
      </div>

      {/* S1 本期推荐轮播（页面顶部，替代原大标题 Hero） */}
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <Reveal>
          <UpCarousel />
        </Reveal>
      </div>

      {/* S2 三栏：左榜单 / 中主栏 / 右侧栏 */}
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 md:px-6 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
        {/* 中栏（移动端排最前） */}
        <div className="order-1 min-w-0 space-y-12 lg:order-2">
          <StartHereSection />
          <TrialsSection />
          <GuidesSection />
          <NewArrivalsSection />
        </div>

        {/* 左栏：榜单轮播 */}
        <aside className="order-2 content-start lg:sticky lg:top-[76px] lg:order-1 lg:self-start">
          <LadderSection />
        </aside>

        {/* 右栏：配队趋势置顶 */}
        <aside className="order-3 grid content-start gap-4 sm:grid-cols-2 lg:sticky lg:top-[76px] lg:grid-cols-1 lg:self-start">
          <TeamTrendCard />
          <RotationCard />
          <UpdateLog />
          <DisclaimerCard />
        </aside>
      </div>

      {/* S3 对决入口（人无我有：工具 × 模型两两对决） */}
      <div className="mx-auto max-w-[1280px] px-4 pb-12 md:px-6">
        <Reveal>
          <div className="rounded-[6px] border border-line bg-white p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-lg font-bold text-ink-1">装备与模型对决</h2>
                <p className="mt-1 text-[13px] text-ink-2">选型不再拍脑袋：Claude Code vs Cursor、DeepSeek-V4 vs Kimi K3，维度对比 + 场景结论一页看懂。</p>
              </div>
              <Link to="/compare" className="group flex items-center gap-1 rounded-[4px] border border-gold/50 bg-gold/5 px-3 py-1.5 text-[13px] font-semibold text-accent transition-colors hover:bg-gold/10">
                全部对决
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ['claude-code-vs-cursor', 'Claude Code vs Cursor'],
                ['kimi-code-vs-claude-code', 'Kimi Code vs Claude Code'],
                ['deepseek-v4-vs-kimi-k3', 'DeepSeek-V4 vs Kimi K3'],
                ['gemini-3-pro-vs-claude-opus-4-7', 'Gemini 3 Pro vs Claude Opus 4.7'],
                ['cline-vs-aider', 'Cline vs Aider'],
              ].map(([id, label]) => (
                <Link
                  key={id}
                  to={`/compare/${id}`}
                  className="rounded-[4px] border border-line bg-bg-alt px-3 py-1.5 text-[13px] text-ink-1 transition-colors hover:border-gold/60 hover:text-accent"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
