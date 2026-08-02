import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { BellRing, ChevronDown, ChevronUp } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import PageHero from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import {
  changelogRecent,
  changelogArchive,
  changelogCount,
  logTypeColor,
} from '@/data/changelog';
import type { LogDay, LogItem, LogType } from '@/data/changelog';
import { cn } from '@/lib/utils';

const FILTERS: { id: LogType | 'all'; name: string }[] = [
  { id: 'all', name: '全部' },
  { id: '榜单', name: '榜单' },
  { id: '图鉴', name: '图鉴' },
  { id: '攻略', name: '攻略' },
  { id: '工具', name: '工具' },
  { id: '站点', name: '站点' },
];

function filterDays(days: LogDay[], filter: LogType | 'all'): LogDay[] {
  if (filter === 'all') return days;
  return days
    .map((d) => ({ ...d, items: d.items.filter((it) => it.type === filter) }))
    .filter((d) => d.items.length > 0);
}

/** 条目内容中的实体名跳转：图鉴→对应图鉴页，攻略→攻略阁 */
function itemLink(item: LogItem): string | null {
  if (item.type === '图鉴') {
    return item.text.includes('法宝') ? '/harnesses' : '/models';
  }
  if (item.type === '攻略') return '/guides';
  if (item.type === '工具') return '/tools';
  if (item.type === '榜单') return '/models';
  return null;
}

function LogEntryCard({ item, index }: { item: LogItem; index: number }) {
  const to = itemLink(item);
  const color = logTypeColor[item.type];
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="flex items-center gap-3 rounded-lg border border-line bg-white px-3.5 py-2.5 shadow-card"
    >
      <span
        className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium text-white"
        style={{ backgroundColor: color }}
      >
        {item.type}
      </span>
      <div className="min-w-0 flex-1 text-sm leading-relaxed text-ink">
        {to ? (
          <Link to={to} className="transition-colors hover:text-cinnabar hover:underline">
            {item.text}
          </Link>
        ) : (
          item.text
        )}
      </div>
      {item.time && (
        <span className="shrink-0 font-mono text-[11px] text-ink-3">{item.time}</span>
      )}
    </motion.div>
  );
}

function DayGroup({ day, index }: { day: LogDay; index: number }) {
  const [mm, dd] = day.date.split('-');
  const nodeColor = logTypeColor[day.items[0]?.type ?? '站点'];
  return (
    <motion.section
      layout="position"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 sm:pl-10"
    >
      {/* 节点圆点 */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 380, damping: 14 }}
        className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-paper"
        style={{ backgroundColor: nodeColor }}
        aria-hidden
      />
      <div className="mb-2.5 flex items-baseline gap-2">
        <h3 className="font-mono text-lg font-bold text-gold">
          {mm} / {dd}
        </h3>
        <span className="font-mono text-xs text-ink-3">· {day.weekday}</span>
        <span className="font-mono text-[11px] text-ink-3">{day.items.length} 条</span>
      </div>
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {day.items.map((it, i) => (
            <LogEntryCard key={`${day.date}-${it.text}`} item={it} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default function Changelog() {
  const [filter, setFilter] = useState<LogType | 'all'>('all');
  const [expanded, setExpanded] = useState(false);

  const recent = useMemo(() => filterDays(changelogRecent, filter), [filter]);
  const archive = useMemo(() => filterDays(changelogArchive, filter), [filter]);
  const archiveCount = changelogArchive.reduce((n, d) => n + d.items.length, 0);
  const archiveFilteredCount = archive.reduce((n, d) => n + d.items.length, 0);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '更新日志' }]}
        title="编纂录"
        en="// CHRONICLE OF UPDATES"
        verdict="榜上有春秋，笔笔有来处。"
        badges={[`本赛季记录 ${changelogCount} 条`, '最近更新 07-18']}
      />

      {/* 类型筛选 chips（吸顶） */}
      <div className="sticky top-[60px] z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[860px] gap-2 overflow-x-auto px-4 py-3">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const color = f.id === 'all' ? '#29241C' : logTypeColor[f.id];
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                  active
                    ? 'border-transparent text-white shadow-sm'
                    : 'border-line bg-white text-ink-2 hover:text-ink',
                )}
                style={active ? { backgroundColor: color } : undefined}
              >
                {f.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 时间线 */}
      <div className="mx-auto max-w-[860px] px-4 py-10">
        {recent.length === 0 && archive.length === 0 ? (
          <div className="rounded-xl border border-line bg-white p-10 text-center text-sm text-ink-2">
            此类目下本赛季尚无记录。
          </div>
        ) : (
          <div className="relative">
            {/* 竖线 */}
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute bottom-4 left-[4px] top-2 w-[2px] bg-line-strong"
              style={{ transformOrigin: 'top' }}
              aria-hidden
            />
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {recent.map((d, i) => (
                  <DayGroup key={`${d.date}-${filter}`} day={d} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {/* 折叠区：展开更早 */}
            {archive.length > 0 && (
              <div className="mt-8">
                {!expanded ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-paper-alt py-3.5 text-sm text-ink-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <ChevronDown className="h-4 w-4" />
                    展开更早的 {filter === 'all' ? archiveCount : archiveFilteredCount} 条
                  </button>
                ) : (
                  <>
                    <div className="space-y-8">
                      <AnimatePresence mode="popLayout">
                        {archive.map((d, i) => (
                          <DayGroup key={`${d.date}-${filter}`} day={d} index={i} />
                        ))}
                      </AnimatePresence>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-paper-alt py-3 text-sm text-ink-2 transition-colors hover:border-gold hover:text-gold"
                    >
                      <ChevronUp className="h-4 w-4" />
                      收起洪荒旧事
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* 底部说明 */}
        <Reveal className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-line bg-paper-alt p-5 sm:flex-row">
            <p className="text-xs leading-relaxed text-ink-2">
              编纂录仅记本赛季（2026-07）之事。更早的洪荒纪元？那时本站还不存在。
            </p>
            <button
              type="button"
              onClick={() => toast('已记入封神台玉简（并不会真的提醒你）')}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-cinnabar px-4 py-2 text-xs font-medium text-white transition-all hover:scale-[1.02] hover:bg-cinnabar-deep active:scale-[0.98]"
            >
              <BellRing className="h-3.5 w-3.5" />
              订阅轮换提醒（演示）
            </button>
          </div>
        </Reveal>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
