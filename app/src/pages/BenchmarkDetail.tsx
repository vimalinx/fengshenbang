import type { ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { getBenchmark, getBenchmarkAppearances } from '@/data/benchmarks';
import type { BenchmarkAppearance, BenchmarkEntry } from '@/data/benchmarks';
import { models } from '@/data/models';
import { CATEGORY_META } from '@/lib/benchmarkMeta';
import { cn } from '@/lib/utils';

/* ---------- 天梯模型名 → 本站模型 id（规范化后精确匹配，匹配不上就不链） ---------- */
const normalizeName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const MODEL_ID_BY_NAME = new Map(models.map((m) => [normalizeName(m.name), m.id]));

/* ---------- 头部水平：刻度尺 + 朱砂指针（无 ladder 条目的左栏降级内容） ---------- */
function FrontierContent({ entry }: { entry: BenchmarkEntry }) {
  const frontier = entry.frontier;
  const value = frontier && frontier.value !== null
    ? Math.min(100, Math.max(0, frontier.value))
    : null;

  if (!frontier) return null;

  return (
    <div>
      {value !== null ? (
        <>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-4xl font-bold leading-none tracking-tight text-cinnabar md:text-5xl">
              {value}
              <span className="text-xl md:text-2xl">%</span>
            </span>
            <span className="text-[13px] text-ink-3">
              头部模型在这个榜上的当前水位（0–100 口径）
            </span>
          </div>
          {/* 刻度尺 */}
          <div className="relative mt-5">
            <div className="h-2.5 overflow-hidden rounded-full bg-line">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                className="h-full rounded-full bg-gradient-to-r from-cinnabar-deep via-cinnabar to-gold"
              />
            </div>
            {/* 朱砂指针 */}
            <motion.span
              initial={{ left: 0 }}
              whileInView={{ left: `${value}%` }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              className="absolute -top-1 h-[18px] w-[3px] -translate-x-1/2 rounded-full bg-cinnabar-deep"
              aria-hidden
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-3">
              {[0, 25, 50, 75, 100].map((t) => (
                <span key={t} className="flex flex-col items-center gap-1">
                  <span className="h-1.5 w-px bg-line-strong" aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-[6px] border border-dashed border-line-strong bg-white px-2.5 py-1 font-mono text-xs text-ink-2">
            相对分制 · 无 0–100 口径
          </span>
          <span className="text-[13px] text-ink-3">
            这个榜用 Elo / 金额 / 名次等相对口径计分，压不成一根百分条。
          </span>
        </div>
      )}
      {frontier.note && (
        <p className="mt-4 border-t border-dashed border-gold/25 pt-3 text-[13px] leading-[1.8] text-ink-2">
          {frontier.note}
        </p>
      )}
    </div>
  );
}

/* ---------- 左栏：分数天梯（无 ladder 时降级为「整理中」+ 头部水平锚点） ---------- */
const RANK_STYLE = [
  'bg-gold text-white',            // 状元·金
  'bg-[#A8A29E] text-white',       // 榜眼·银
  'bg-[#B0793C] text-white',       // 探花·铜（朱砂系）
];

function LadderBoard({ entry }: { entry: BenchmarkEntry }) {
  const ladder = entry.ladder;
  const scores = (ladder ?? []).map((r) => parseFloat(r.score));
  const max = scores.length > 0 ? Math.max(...scores.filter((v) => !Number.isNaN(v))) : NaN;

  return (
    <Reveal>
      <section className="overflow-hidden rounded-xl border border-gold/40 bg-paper shadow-card">
        <div className="flex items-center gap-3 border-b border-gold/25 px-5 py-2.5 md:px-6">
          <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-gold">
            // LADDER · 分数天梯
          </span>
          <span className="h-px flex-1 bg-gold/25" aria-hidden />
        </div>

        {ladder && ladder.length > 0 ? (
          <div className="p-5 md:p-6">
            {/* 头部水平注记（原 FRONTIER 锚点的精简版，避免另占大区块） */}
            {entry.frontier && (
              <p className="mb-4 rounded-[6px] border border-dashed border-gold/30 bg-white px-3 py-2 text-[12px] leading-[1.7] text-ink-3">
                <span className="font-mono font-semibold text-cinnabar">
                  头部水位{entry.frontier.value !== null ? ` ~${entry.frontier.value}%` : ''}
                </span>
                {' · '}
                {entry.frontier.note}
              </p>
            )}
            <ol>
              {ladder.map((row, i) => {
                const v = parseFloat(row.score);
                const width = !Number.isNaN(v) && !Number.isNaN(max) && max > 0
                  ? Math.max(3, (v / max) * 100)
                  : null;
                const modelId = MODEL_ID_BY_NAME.get(normalizeName(row.model));
                return (
                  <li
                    key={`${row.model}-${i}`}
                    className={cn('flex items-center gap-3 py-2.5', i > 0 && 'border-t border-line/70')}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] font-mono text-[11px] font-bold',
                        RANK_STYLE[i] ?? 'border border-line-strong bg-white text-ink-3'
                      )}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        {modelId ? (
                          <Link
                            to={`/models/${modelId}`}
                            className="truncate font-serif text-sm font-semibold text-ink transition-colors hover:text-cinnabar"
                          >
                            {row.model}
                          </Link>
                        ) : (
                          <span className="truncate font-serif text-sm font-semibold text-ink">
                            {row.model}
                          </span>
                        )}
                        <span className="shrink-0 font-mono text-sm font-bold text-gold">
                          {row.score}
                        </span>
                      </div>
                      {width !== null && (
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${width}%` }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 * i }}
                            className={cn(
                              'h-full rounded-full',
                              i === 0
                                ? 'bg-gradient-to-r from-cinnabar-deep via-cinnabar to-gold'
                                : 'bg-gold/70'
                            )}
                          />
                        </div>
                      )}
                      {row.note && (
                        <p className="mt-1 text-[11px] leading-[1.6] text-ink-3">{row.note}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 border-t border-dashed border-gold/25 pt-2.5 font-mono text-[10px] leading-relaxed text-ink-3">
              // 来源：官方榜单（swebench.com）与第三方追踪 steel.dev / BenchLM / llm-stats，
              2026-08 核验；口径为 % Resolved，自报与第三方实测分别标注
            </p>
          </div>
        ) : (
          <div className="p-5 md:p-6">
            <p className="rounded-[6px] border border-dashed border-line-strong bg-white px-3 py-2.5 text-center font-mono text-xs text-ink-3">
              天梯数据整理中 · 先参考头部模型当前水位
            </p>
            <div className="mt-5">
              <FrontierContent entry={entry} />
            </div>
          </div>
        )}
      </section>
    </Reveal>
  );
}

/* ---------- 右栏：测试内容与特点 ---------- */
function WhatCard({ entry }: { entry: BenchmarkEntry }) {
  const brief = entry.what.split('。')[0] + '。';
  return (
    <Reveal>
      <section className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="border-b border-line px-5 py-2.5 font-serif text-sm font-semibold text-ink">
          测试内容与特点
          <span className="ml-1.5 font-mono text-[11px] font-normal tracking-[0.12em] text-ink-3">
            // WHAT &amp; TRAITS
          </span>
        </div>
        <div className="p-5">
          <p className="text-[13px] leading-[1.85] text-ink-2">{brief}</p>
          {entry.traits && entry.traits.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.traits.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-gold/40 bg-gold-soft px-2.5 py-1 text-[11px] font-medium text-accent-deep"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}

/* ---------- 右栏：开源状态印章卡 ---------- */
const OPEN_SOURCE_META = {
  open: { label: '开源', color: '#4B6E5D', desc: '数据集与评测代码公开，可自行复现验分' },
  partial: { label: '部分开源', color: '#B8860B', desc: '仅部分数据或代码公开，复现口径受限' },
  closed: { label: '闭源', color: '#A32F20', desc: '数据与代码均未公开，只能信官方/自报数字' },
} as const;

function OpenSourceCard({ entry }: { entry: BenchmarkEntry }) {
  const os = entry.openSource;
  if (!os) return null;
  const meta = OPEN_SOURCE_META[os.status];

  return (
    <Reveal delay={0.05}>
      <section className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="border-b border-line px-5 py-2.5 font-serif text-sm font-semibold text-ink">
          开源状态
          <span className="ml-1.5 font-mono text-[11px] font-normal tracking-[0.12em] text-ink-3">
            // OPEN SOURCE
          </span>
        </div>
        <div className="flex items-start gap-4 p-5">
          {/* 印章 */}
          <span
            className="flex h-12 w-12 shrink-0 rotate-3 items-center justify-center rounded-[8px] border-2 font-serif text-sm font-bold shadow-card"
            style={{ color: meta.color, borderColor: meta.color, backgroundColor: `${meta.color}14` }}
          >
            {meta.label}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] leading-[1.7] text-ink-2">{meta.desc}</p>
            {os.note && (
              <p className="mt-1.5 text-[12px] leading-[1.7] text-ink-3">{os.note}</p>
            )}
            {os.url && (
              <a
                href={os.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                style={{ color: meta.color, borderColor: `${meta.color}59`, backgroundColor: `${meta.color}0D` }}
              >
                数据集 / 代码仓库
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ---------- 右栏：档案速览 ledger 格 ---------- */
function FactsGrid({ entry }: { entry: BenchmarkEntry }) {
  return (
    <Reveal delay={0.1}>
      <section className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="border-b border-line px-5 py-2.5 font-serif text-sm font-semibold text-ink">
          档案速览
          <span className="ml-1.5 font-mono text-[11px] font-normal tracking-[0.12em] text-ink-3">
            // FACT SHEET
          </span>
        </div>
        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
          {entry.facts.map((f) => (
            <div key={f.label} className="bg-white p-4">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                {f.label}
              </div>
              <div className="mt-1.5 text-[13px] leading-[1.7] text-ink-2">{f.value}</div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

/* ---------- 编辑式内容小节：序号 + 标题 + 正文 ---------- */
const NOTES: { key: 'what' | 'how' | 'examples' | 'reading' | 'caveat'; title: string; en: string }[] = [
  { key: 'what', title: '测什么', en: 'WHAT' },
  { key: 'how', title: '怎么测', en: 'HOW' },
  { key: 'examples', title: '典型任务长什么样', en: 'EXAMPLES' },
  { key: 'reading', title: '分数怎么看', en: 'READING' },
  { key: 'caveat', title: '含金量与局限', en: 'CAVEAT' },
];

function EditorialNotes({ entry }: { entry: BenchmarkEntry }) {
  return (
    <div className="border-t border-line">
      {NOTES.map((n, i) => {
        const isExample = n.key === 'examples';
        return (
          <Reveal key={n.key} delay={i * 0.04}>
            <div
              className={cn(
                'grid gap-3 border-b border-line py-6 md:grid-cols-[150px_1fr] md:gap-6',
                isExample && 'border-l-[3px] border-l-cinnabar bg-paper-alt/70 pl-4 md:pl-6'
              )}
            >
              <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                <span className="font-mono text-[22px] font-bold leading-none text-gold/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-[15px] font-semibold text-ink">
                  {n.title}
                  <span className="ml-2 font-mono text-[10px] font-normal tracking-[0.14em] text-ink-3">
                    // {n.en}
                  </span>
                </h3>
              </div>
              <div>
                {isExample && (
                  <span className="mb-2 inline-block rounded-[4px] bg-cinnabar px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] text-white">
                    看得见题目的一段
                  </span>
                )}
                <p className="text-sm leading-[1.9] text-ink-2">{entry[n.key]}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------- 小节标题（页内三级） ---------- */
function SubHead({ en, children }: { en: string; children: ReactNode }) {
  return (
    <h2 className="mb-4 flex items-baseline gap-2.5">
      <span className="inline-block h-3 w-1 bg-gold" aria-hidden />
      <span className="font-serif text-lg font-semibold text-ink">{children}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">// {en}</span>
    </h2>
  );
}

/* ---------- 页面 ---------- */
export default function BenchmarkDetail() {
  const { benchmarkId } = useParams();
  const entry = benchmarkId ? getBenchmark(benchmarkId) : undefined;

  if (!entry) return <Navigate to="/benchmarks" replace />;

  const meta = CATEGORY_META[entry.category];
  const Icon = meta.icon;
  const appearances: BenchmarkAppearance[] = getBenchmarkAppearances(entry);
  const related = (entry.relatedIds ?? [])
    .map((id) => getBenchmark(id))
    .filter((b): b is BenchmarkEntry => Boolean(b));

  return (
    <div>
      {/* S1 报头行：面包屑 */}
      <section className="border-b border-line bg-paper-alt py-5">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 md:px-6">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-sm text-ink-2"
            aria-label="面包屑"
          >
            <Link to="/" className="transition-colors hover:text-cinnabar">
              首页
            </Link>
            <span className="text-ink-3">/</span>
            <Link to="/benchmarks" className="transition-colors hover:text-cinnabar">
              测试集图鉴
            </Link>
            <span className="text-ink-3">/</span>
            <span className="text-ink-3">{entry.name}</span>
          </motion.nav>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-mono text-xs text-ink-3"
          >
            {entry.organizer}
          </motion.span>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        {/* S2 头部：名称 + 一句话 + 分类徽章 + 别名 + 外链 */}
        <section className="mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="shrink-0 font-mono text-[11px] font-semibold tracking-[0.25em] text-gold">
                BENCHMARK FILE · 测试集档案
              </span>
              <span className="h-px flex-1 bg-gold/40" aria-hidden />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl"
            >
              {entry.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 font-serif text-lg leading-loose text-ink-2"
            >
              {entry.oneLiner}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-xs font-medium"
                style={{
                  color: meta.color,
                  borderColor: `${meta.color}59`,
                  backgroundColor: `${meta.color}14`,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
              </span>
              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cinnabar px-4 py-2 text-[13px] font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-cinnabar-deep active:scale-[0.98]"
                >
                  官方页面
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {entry.aliases.length > 0 && (
                <p className="font-mono text-[11px] leading-relaxed text-ink-3">
                  站内也叫：{entry.aliases.join(' / ')}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* S3 双栏主区：左天梯 / 右档案（移动端天梯在前） */}
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <LadderBoard entry={entry} />
          <div className="flex flex-col gap-6">
            <WhatCard entry={entry} />
            <OpenSourceCard entry={entry} />
            <FactsGrid entry={entry} />
          </div>
        </div>

        {/* S4 五个内容小节（编辑式排版） */}
        <section className="mt-10">
          <SubHead en="FIELD NOTES">怎么看这个榜</SubHead>
          <EditorialNotes entry={entry} />
        </section>

        {/* S5 名场面 + 版本沿革（双栏） */}
        <section className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          {entry.funFact && (
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-[10px] border border-cinnabar/45 bg-paper p-5 shadow-card md:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 rotate-3 items-center justify-center rounded-[6px] bg-cinnabar text-white shadow-card">
                    <Quote className="h-4 w-4" />
                  </span>
                  <h2 className="font-serif text-lg font-semibold text-ink">
                    名场面
                    <span className="ml-2 font-mono text-[11px] font-normal tracking-[0.12em] text-ink-3">
                      // LEGEND
                    </span>
                  </h2>
                </div>
                <p className="mt-4 flex-1 font-serif text-[15px] leading-[1.95] text-ink">
                  {entry.funFact}
                </p>
                <p className="mt-4 border-t border-dashed border-cinnabar/30 pt-2.5 font-mono text-[10px] text-ink-3">
                  // 冷知识一则，出处见联网核验报告
                </p>
              </div>
            </Reveal>
          )}

          {/* 版本沿革·大事记：竖向时间线 */}
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col rounded-[10px] border border-line bg-white shadow-card">
              <div className="border-b border-line px-4 py-2.5 font-serif text-sm font-semibold text-ink">
                版本沿革 · 大事记
                <span className="ml-1 font-mono text-xs font-normal text-ink-3">// TIMELINE</span>
              </div>
              <ol className="ml-4 flex-1 border-l border-line py-2">
                {entry.history.map((t) => (
                  <li key={t.date + t.event} className="relative px-4 py-1.5">
                    <span
                      className="absolute -left-[5px] top-[13px] h-2 w-2 rounded-full bg-gold"
                      aria-hidden
                    />
                    <span className="font-mono text-xs font-bold text-gold">{t.date}</span>
                    <p className="text-sm leading-[1.6] text-ink-2">{t.event}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </section>

        {/* S6 本站模型战绩（反查成绩表与子榜单） */}
        <section className="mt-10">
          <SubHead en="LOCAL SCORES">本站模型战绩</SubHead>
          <Reveal>
            {appearances.length > 0 ? (
              <div className="overflow-hidden rounded-[10px] border border-line bg-white shadow-card">
                <div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 border-b border-line bg-paper-alt px-4 py-2 font-mono text-[10px] tracking-[0.12em] text-ink-3">
                  <span>模型</span>
                  <span>成绩</span>
                  <span>来源</span>
                </div>
                {appearances.map((a, i) => (
                  <div
                    key={`${a.modelId}-${a.source}-${i}`}
                    className={cn(
                      'grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 px-4 py-2.5',
                      i > 0 && 'border-t border-line'
                    )}
                  >
                    <Link
                      to={`/models/${a.modelId}`}
                      className="font-serif text-sm font-semibold text-ink transition-colors hover:text-cinnabar"
                    >
                      {a.modelName}
                    </Link>
                    <span className="text-right font-mono text-sm font-bold text-gold">
                      {a.value}
                    </span>
                    <span
                      className={cn(
                        'rounded-[4px] border px-1.5 py-0.5 text-right font-mono text-[10px]',
                        a.source === '成绩表'
                          ? 'border-gold/50 bg-gold-soft text-accent-deep'
                          : 'border-line-strong text-ink-3'
                      )}
                    >
                      {a.source}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-[10px] border border-dashed border-line-strong px-4 py-5 text-center text-[13px] text-ink-3">
                本站模型暂未收录该榜成绩
              </p>
            )}
          </Reveal>
          {appearances.length > 0 && (
            <p className="mt-2 font-mono text-[11px] text-ink-3">
              // 按模型成绩表与子榜单中的榜单名精确匹配反查
            </p>
          )}
        </section>

        {/* S7 相关测试集 */}
        {related.length > 0 && (
          <section className="mt-10">
            <SubHead en="RELATED">相关测试集</SubHead>
            <div className="flex flex-wrap gap-2.5">
              {related.map((b) => {
                const bMeta = CATEGORY_META[b.category];
                return (
                  <Link
                    key={b.id}
                    to={`/benchmarks/${b.id}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-3 pr-3.5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:shadow-card-hover"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: bMeta.color }}
                      aria-hidden
                    />
                    <span className="text-[13px] font-medium text-ink-2 transition-colors group-hover:text-cinnabar">
                      {b.name}
                    </span>
                    <span className="font-mono text-[11px] text-ink-3 transition-colors group-hover:text-gold">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* S8 返回 */}
        <div className="mt-10 pb-10">
          <Link
            to="/benchmarks"
            className="text-[13px] font-medium text-ink-2 transition-colors duration-150 hover:text-accent"
          >
            ← 返回测试集图鉴
          </Link>
        </div>
      </div>
    </div>
  );
}
