import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { Team, TeamStyle } from '@/data/teams';
import { teams, teamStyles } from '@/data/teams';
import type { Tier } from '@/data/models';
import { latestReleased } from '@/data/models';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import TeamCard from '@/components/TeamCard';
import TierSeal from '@/components/TierSeal';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

/* ---------------- 榜单横幅 ---------------- */

/**
 * 配队榜横幅。
 * 本站不设赛季，也没有人为的周期轮换——时间锚点用真实的模型发布日期。
 */
function LadderBanner() {
  return (
    <Reveal>
      <div className="rounded-[12px] bg-gold-grad p-[1.5px] shadow-card">
        <div className="flex flex-col gap-6 rounded-[10.5px] bg-gold-soft px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
          {/* 左：榜名 */}
          <div className="shrink-0">
            <h2 className="font-brand text-[22px] leading-tight text-ink">配队榜</h2>
            <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-ink-2">
              {teams.length} 支配队 · {teamStyles.length} 种流派
            </p>
          </div>
          {/* 中：编排口径 */}
          <div className="text-left md:text-center">
            <p className="text-[13px] leading-relaxed text-ink-2">
              配队与站位由本站主观编排，
              <br className="hidden md:block" />
              成本按站内价格快照试算，非实测。
            </p>
          </div>
          {/* 右：最近发布的模型（真实发布日期） */}
          <div className="shrink-0 border-t border-gold/30 pt-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
              最近发布
            </p>
            <Link
              to={latestReleased.hasDetail ? `/models/${latestReleased.id}` : '/models'}
              className="mt-1 block font-serif text-[15px] font-semibold text-ink transition-colors hover:text-cinnabar"
            >
              {latestReleased.name}
            </Link>
            <p className="mt-0.5 font-mono text-[11px] text-ink-2">{latestReleased.releaseDate}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}


/* ---------------- 梯队榜 ---------------- */

const tierGroups: { tier: Tier; title: string; note: string }[] = [
  { tier: 'T0', title: 'T0 · 封神之队', note: '不计成本，只求登顶' },
  { tier: 'T1', title: 'T1 · 金仙之队', note: '实力中坚，各具神通' },
  { tier: 'T2', title: 'T2 · 真君之队', note: '轻装上阵，妙用无穷' },
];

function TierGroup({
  tier,
  title,
  note,
  teams: groupTeams,
}: {
  tier: Tier;
  title: string;
  note: string;
  teams: Team[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <Reveal>
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center gap-3.5 text-left"
          aria-expanded={open}
        >
          <TierSeal tier={tier} size={36} />
          <h3 className="font-serif text-xl font-bold text-ink">{title}</h3>
          <span className="ml-auto hidden text-xs italic text-ink-2 sm:block">{note}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-ink-3 transition-transform duration-300 group-hover:text-cinnabar',
              !open && '-rotate-90',
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                {groupTeams.map((t, i) => (
                  <Reveal key={t.id} delay={i * 0.12} y={20}>
                    <TeamCard team={t} defaultOpen={tier === 'T0' && i === 0} />
                  </Reveal>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ---------------- 流派卡 ---------------- */

function StyleCard({ style, index }: { style: TeamStyle; index: number }) {
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <div className="group flex h-full flex-col rounded-[10px] border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover">
        <span
          className="inline-block h-8 w-8 rounded-[6px] bg-cinnabar text-center font-serif text-sm font-bold leading-8 text-white"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(251,248,241,.5)' }}
          aria-hidden
        >
          {style.name.charAt(0)}
        </span>
        <h3 className="mt-3 font-brand text-xl leading-tight text-ink transition-colors duration-300 group-hover:text-cinnabar">
          {style.name}
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-ink-2">{style.desc}</p>
        <p className="mt-3 font-mono text-xs font-bold text-gold">{style.buff}</p>
        <div className="mt-3 border-t border-dashed border-line pt-3">
          <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-ink-2">
            代表队 · {style.repTeam}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- 页面 ---------------- */

export default function Teams() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '配队推演' }]}
        title="配队推演"
        en="// TEAM COMPOSITIONS"
        verdict="独木不成林，单仙难登天。配队之妙，在于相生。"
        badges={[`在榜 ${teams.length} 队`, `流派 ${teamStyles.length} 支`, '站点主观编排']}
      />

      {/* S2 榜单横幅 */}
      <section className="mx-auto max-w-[1280px] px-4 pt-10 md:px-6">
        <LadderBanner />
      </section>

      {/* S3 梯队榜 */}
      <section className="mx-auto max-w-[1280px] px-4 pt-12 md:px-6">
        <SectionHeader title="梯队榜" en="// TIER LIST" />
        <div className="space-y-10">
          {tierGroups.map((g) => (
            <TierGroup
              key={g.tier}
              tier={g.tier}
              title={g.title}
              note={g.note}
              teams={teams.filter((t) => t.tier === g.tier)}
            />
          ))}
        </div>
      </section>

      {/* S4 流派图鉴 */}
      <section className="mx-auto max-w-[1280px] px-4 pt-12 md:px-6">
        <SectionHeader title="协同机制 · 流派四式" en="// SYNERGY STYLES" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamStyles.map((s, i) => (
            <StyleCard key={s.id} style={s} index={i} />
          ))}
        </div>
      </section>

      {/* S5 配队模拟器 CTA 带 */}
      <section className="mt-12 bg-cinnabar">
        <Reveal className="mx-auto flex max-w-[1280px] flex-col items-start gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="font-brand text-[26px] leading-snug text-white">
            「纸上谈兵终觉浅，何不亲手排一阵？」
          </p>
          <Link
            to="/tools#team-builder"
            className="flex shrink-0 items-center gap-1.5 rounded-lg border-[1.5px] border-white px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.04] hover:bg-white hover:text-cinnabar"
          >
            进入配队模拟器
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
