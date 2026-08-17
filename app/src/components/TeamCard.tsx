import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Team } from '@/data/teams';
import { modelMap, systemMap } from '@/data/models';
import { harnessMap } from '@/data/harnesses';
import TierSeal from './TierSeal';
import { ModelMonogram } from './ModelCard';
import { cn } from '@/lib/utils';

function MemberAvatar({ kind, refId, role, size, primary }: { kind: 'model' | 'harness'; refId: string; size: number; role: string; primary?: boolean }) {
  let name = refId;
  if (kind === 'model') {
    const m = modelMap[refId];
    if (m) {
      return (
        <span
          className={cn('inline-flex rounded-[6px] ring-2 ring-white', primary && 'outline outline-1 outline-ink')}
          title={`${role} · ${m.name}`}
        >
          <ModelMonogram name={m.name} color={systemMap[m.system].color} icon={systemMap[m.system].sigil} size={size} />
        </span>
      );
    }
  } else {
    const h = harnessMap[refId];
    if (h) {
      name = h.name;
      return (
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-[6px] border border-line bg-white p-1.5 ring-2 ring-white',
            primary && 'border-ink',
          )}
          style={{ width: size, height: size }}
          title={`${role} · ${name}`}
        >
          <img src={h.icon} alt={name} className="h-full w-full" loading="lazy" />
        </span>
      );
    }
  }
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[6px] bg-bg-alt font-mono text-xs text-ink-3 ring-2 ring-white"
      style={{ width: size, height: size }}
      title={role}
    >
      ?
    </span>
  );
}

/**
 * 配队卡：横向卡 + 成员标徽组 + 成本/综合 + 打法手风琴（250ms）。
 */
export default function TeamCard({
  team,
  className,
  defaultOpen = false,
}: {
  team: Team;
  className?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isT0 = team.tier === 'T0';
  return (
    <div
      className={cn(
        'rounded-[6px] bg-white transition-colors duration-150',
        isT0 ? 'border border-ink' : 'border border-line hover:border-line-strong',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-4 p-4 md:flex-nowrap">
        {/* 左：队名 + 梯队 */}
        <div className="flex min-w-[150px] items-center gap-2.5">
          <TierSeal tier={team.tier} size={32} />
          <div>
            <h3 className="text-[15px] font-semibold leading-tight text-ink">{team.name}</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {team.scenarios.map((s) => (
                <span key={s} className="rounded-[4px] bg-bg-alt px-1.5 py-px text-[11px] text-ink-2">
                  {s.replace(/^[^·]+·/, '')}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* 中：成员标徽组（重叠 -8px） */}
        <div className="flex flex-1 items-center">
          {team.members.map((m, i) => (
            <div key={i} className={i > 0 ? '-ml-2' : ''} style={{ zIndex: team.members.length - i }}>
              <MemberAvatar
                kind={m.kind}
                refId={m.refId}
                role={m.role + (m.count ? ` ×${m.count}` : '')}
                size={m.role === '主C' ? 44 : 36}
                primary={m.role === '主C'}
              />
            </div>
          ))}
          <div className="ml-3 hidden text-xs leading-relaxed text-ink-2 sm:block">
            {team.members.map((m, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-1 text-ink-3">·</span>}
                <span className="text-ink-3">{m.role}</span>
                {m.count && <span className="text-ink-3">×{m.count}</span>}{' '}
                {m.kind === 'model' ? modelMap[m.refId]?.name : harnessMap[m.refId]?.name}
              </span>
            ))}
          </div>
        </div>
        {/* 右：成本 + 综合（站点评分） */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-lg font-bold text-ink">¥{team.costPerHour}/h</div>
            <div className="font-mono text-xs text-ink-2" title="站点主观评估，非实测">
              站点评分 <span className="font-bold text-accent">{team.composite}</span>
            </div>
          </div>
        </div>
      </div>
      {/* 打法思路手风琴 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between border-t border-line px-4 py-2 text-[13px] font-medium text-ink-2 transition-colors duration-150 hover:text-accent"
        aria-expanded={open}
      >
        打法思路
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 border-t border-line bg-bg-alt/60 p-4 text-[13px] leading-[1.7] text-ink-2 md:grid-cols-3">
              {[
                { k: '分工', v: team.strategy.position },
                { k: '流程', v: team.strategy.rotation },
                { k: '要点', v: team.strategy.keypoint },
              ].map((s) => (
                <div key={s.k}>
                  <span className="mb-1 inline-block rounded-[4px] bg-accent-soft px-1.5 py-px font-mono text-[11px] font-semibold text-accent">
                    {s.k}
                  </span>
                  <p>{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
