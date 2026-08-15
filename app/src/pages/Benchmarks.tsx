import { useMemo } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import PageHero from '@/components/PageHero';
import type { BenchmarkEntry } from '@/data/benchmarks';
import { benchmarks } from '@/data/benchmarks';
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/benchmarkMeta';

/* ---------- 条目卡片：名称 + 一句话 + 头部水平迷你条 ---------- */
function BenchmarkCard({ entry }: { entry: BenchmarkEntry }) {
  const meta = CATEGORY_META[entry.category];
  const frontier = entry.frontier;
  return (
    <Link
      to={`/benchmarks/${entry.id}`}
      className="group flex h-full flex-col rounded-[10px] border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-card-hover"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="font-serif text-[15px] font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-cinnabar">
          {entry.name}
        </span>
        <span
          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: meta.color }}
          title={meta.label}
          aria-hidden
        />
      </span>
      <span className="mt-1.5 text-[13px] leading-[1.7] text-ink-2">{entry.oneLiner}</span>

      {/* 头部水平：百分制给朱砂渐变迷你条，相对分制给小签 */}
      <span className="mb-3 mt-3 block">
        {frontier && frontier.value !== null ? (
          <>
            <span className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] tracking-[0.1em] text-ink-3">
                // 头部水平
              </span>
              <span className="font-mono text-[11px] font-bold text-cinnabar">
                {frontier.value}%
              </span>
            </span>
            <span className="mt-1 block h-1 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-cinnabar-deep via-cinnabar to-gold"
                style={{ width: `${Math.min(100, Math.max(0, frontier.value))}%` }}
              />
            </span>
          </>
        ) : (
          <span className="inline-flex items-center rounded-[4px] border border-dashed border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            相对分制 · Elo / 金额
          </span>
        )}
      </span>

      <span className="mt-auto flex items-center justify-between gap-2 border-t border-dashed border-line pt-2.5">
        <span className="truncate text-[11px] text-ink-3">{entry.organizer}</span>
        <span className="shrink-0 font-mono text-[11px] text-ink-3 transition-colors duration-200 group-hover:text-gold">
          详情 →
        </span>
      </span>
    </Link>
  );
}

/* ---------- 页面 ---------- */
export default function Benchmarks() {
  const grouped = useMemo(() => {
    const map = new Map<string, BenchmarkEntry[]>();
    for (const b of benchmarks) {
      const list = map.get(b.category) ?? [];
      list.push(b);
      map.set(b.category, list);
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
      category: c,
      entries: map.get(c)!,
    }));
  }, []);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '测试集图鉴' }]}
        title="测试集图鉴"
        en="// BENCHMARK INDEX"
        verdict="这些榜单到底在测什么、分数怎么看，一页讲清。"
        badges={[`收录 ${benchmarks.length} 条`, '六大类']}
      />

      {/* 分组卡片矩阵 */}
      <section className="mx-auto max-w-[1280px] space-y-10 px-4 py-10 md:px-6">
        {grouped.map(({ category, entries }) => {
          const meta = CATEGORY_META[category];
          const Icon = meta.icon;
          return (
            <div key={category}>
              {/* 分组标题：分类徽章（图标 + 色）+ 名称 + 发丝线 */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border"
                  style={{
                    color: meta.color,
                    borderColor: `${meta.color}59`,
                    backgroundColor: `${meta.color}14`,
                  }}
                  aria-hidden
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h2 className="font-serif text-[18px] font-semibold leading-[1.3] text-ink">
                    {meta.label}
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                    // {meta.en} · {entries.length} 条
                  </span>
                </div>
                <span className="h-px flex-1 bg-line" aria-hidden />
              </div>
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
                {entries.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3), ease: 'easeOut' }}
                    className="h-full"
                  >
                    <BenchmarkCard entry={b} />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* 底部说明带 */}
      <section className="border-t border-line bg-paper-alt">
        <div className="mx-auto max-w-[1280px] space-y-1.5 px-4 py-6 md:px-6">
          <p className="text-xs leading-[1.7] text-ink-2">
            本图鉴只收录现实存在的评测基准；分数高低请先对齐版本与口径，再谈横向对比。
          </p>
          <p className="font-mono text-[11px] text-ink-3">
            条目内容来自 2026-08 联网核验报告 · 74 条已全部就位
          </p>
        </div>
      </section>
    </div>
  );
}
