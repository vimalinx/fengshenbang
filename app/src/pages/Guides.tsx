import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Search, X } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import GuideListItem from '@/components/GuideListItem';
import { Reveal } from '@/components/Reveal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { guides, guideCategories } from '@/data/guides';
import type { Guide, GuideCategory } from '@/data/guides';
import { cn } from '@/lib/utils';

const CAT_SHORT: Record<string, string> = {
  新手入门: '新手',
  机制解析: '机制',
  提示词心法: '心法',
  多Agent编排: '编排',
  实战复盘: '实战',
};

function catColor(c: string) {
  return guideCategories.find((x) => x.id === c)?.color ?? '#B8860B';
}

/* ============ S2. 精选攻略头图卡 ============ */
function FeaturedCard({ guide, onOpen }: { guide: Guide; onOpen: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-white shadow-card lg:flex">
      {/* 左：插画（clip-path 左展开） */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative lg:w-[55%]"
      >
        <img
          src="/guides-featured.png"
          alt="攻略阁精选插画"
          className="h-52 w-full object-cover lg:h-full"
        />
        <div
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-white lg:block"
          aria-hidden
        />
      </motion.div>
      {/* 右：文案 */}
      <div className="flex flex-1 flex-col justify-center gap-3 p-5 md:p-7 lg:w-[45%]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col gap-3"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-2"
          >
            <span className="rounded-full bg-cinnabar px-2.5 py-0.5 text-[11px] font-medium tracking-[0.04em] text-white">
              编辑精选
            </span>
            <span
              className="rounded-[4px] px-1.5 py-px text-[11px] font-medium tracking-[0.04em] text-white"
              style={{ backgroundColor: catColor(guide.category) }}
            >
              {CAT_SHORT[guide.category] ?? guide.category}
            </span>
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="font-serif text-2xl font-bold leading-[1.3] text-ink"
          >
            《{guide.title}》
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="text-[13px] italic leading-[1.75] text-ink-2"
          >
            「{guide.excerpt}」
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="font-mono text-xs text-ink-3"
          >
            阅读 {guide.reads} · 仙号「{guide.author}」· {guide.date}
          </motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
            <button
              onClick={onOpen}
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-cinnabar px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-cinnabar-deep active:scale-[0.98]"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              展卷阅读 →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============ S5. 阅读抽屉 ============ */
function ReaderDrawer({
  guide,
  onClose,
  onSwitch,
}: {
  guide: Guide;
  onClose: () => void;
  onSwitch: (g: Guide) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const related = useMemo(
    () => guides.filter((g) => g.category === guide.category && g.id !== guide.id).slice(0, 3),
    [guide],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [guide.id]);

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] bg-ink/35 backdrop-blur-[2px]"
        aria-hidden
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={`阅读：${guide.title}`}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="fixed inset-y-0 right-0 z-[80] flex w-full flex-col border-l border-line-strong bg-paper shadow-2xl md:w-[720px]"
      >
        {/* 顶栏 */}
        <div className="flex items-center justify-between border-b border-line bg-paper-alt px-5 py-3">
          <span
            className="rounded-[4px] px-1.5 py-0.5 text-[11px] font-medium tracking-[0.04em] text-white"
            style={{ backgroundColor: catColor(guide.category) }}
          >
            {guide.category}
          </span>
          <button
            onClick={onClose}
            aria-label="收起卷轴"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-line hover:text-cinnabar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 内容（切换时交叉淡入） */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait">
            <motion.div
              key={guide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-6 md:px-10 md:py-8"
            >
              {/* 头部 */}
              <h1 className="font-serif text-[26px] font-bold leading-[1.35] text-ink">
                《{guide.title}》
              </h1>
              <p className="mt-3 font-mono text-xs text-ink-2">
                仙号「{guide.author}」 · {guide.date} · 阅读 {guide.reads}
                {guide.words && ` · ${guide.words}`}
              </p>
              <div className="cloud-line mt-4 h-3 w-full opacity-50" aria-hidden />

              {guide.content ? (
                /* 正文 */
                <div className="mt-6 space-y-8">
                  {guide.content.map((sec, si) => (
                    <motion.section
                      key={si}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + si * 0.04 }}
                    >
                      <h2 className="flex items-center gap-2.5 font-serif text-lg font-semibold text-ink">
                        <span className="inline-block h-3 w-3 rounded-[3px] bg-cinnabar" aria-hidden />
                        {sec.heading}
                      </h2>
                      <div className="mt-3 space-y-3">
                        {sec.body.map((p, pi) =>
                          sec.heading === '结语' ? (
                            <blockquote
                              key={pi}
                              className="border-l-[3px] border-cinnabar bg-cinnabar/5 px-4 py-3 font-serif text-[15px] italic leading-[1.9] text-ink"
                            >
                              {p}
                            </blockquote>
                          ) : (
                            <p key={pi} className="text-[15px] leading-[1.9] text-ink">
                              {p}
                            </p>
                          ),
                        )}
                      </div>
                      {sec.code && (
                        <motion.pre
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: 0.15 + si * 0.04 }}
                          className="mt-4 overflow-x-auto rounded-lg bg-[#EEF2F5] p-4 font-mono text-[13px] leading-[1.7] text-daiqing"
                        >
                          <code>{sec.code}</code>
                        </motion.pre>
                      )}
                    </motion.section>
                  ))}
                </div>
              ) : (
                /* 誊抄中占位 */
                <div className="mt-10 flex flex-col items-center py-14 text-center">
                  <img src="/seal-stamp.svg" alt="" className="h-16 w-16 opacity-60" />
                  <h2 className="mt-5 font-serif text-lg font-semibold text-ink">传记编撰中</h2>
                  <div className="cloud-line mt-3 h-3 w-40 opacity-50" aria-hidden />
                  <p className="mt-4 font-serif text-sm italic text-ink-2">
                    「此文尚在玉简誊抄中，敬请期待。」
                  </p>
                </div>
              )}

              {/* 底部：相关攻略 + 收录小字 */}
              <div className="mt-10 border-t border-line pt-5">
                <h3 className="mb-1 font-serif text-sm font-semibold text-ink">相关攻略</h3>
                <div>
                  {related.map((r) => (
                    <GuideListItem key={r.id} guide={r} onClick={onSwitch} />
                  ))}
                </div>
                <p className="mt-4 font-mono text-[11px] text-ink-3">
                  收录于攻略阁 · 内容为演示 mock
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}

/* ============ 页面 ============ */
export default function Guides() {
  const [tab, setTab] = useState<GuideCategory>('认知');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'latest' | 'hottest'>('latest');
  const [openGuide, setOpenGuide] = useState<Guide | null>(null);

  const featured = useMemo(() => guides.find((g) => g.featured) ?? guides[0], []);

  const list = useMemo(() => {
    const q = query.trim();
    const filtered = guides.filter(
      (g) => g.category === tab && (!q || g.title.includes(q)),
    );
    return [...filtered].sort((a, b) =>
      sort === 'hottest' ? b.readsNum - a.readsNum : b.date.localeCompare(a.date),
    );
  }, [tab, query, sort]);

  return (
    <div>
      {/* S1. PageHero */}
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '攻略阁' }]}
        title="攻略阁"
        en="// PAVILION OF GUIDES"
        verdict="他山之石，可以攻玉。前人渡劫手记，尽藏于此阁。"
        badges={['收录攻略 86 篇', '作者 23 位', '本周新增 9 篇']}
      />

      <div className="mx-auto max-w-[1280px] px-4 pt-10 md:px-6">
        {/* S2. 精选攻略头图卡 */}
        <Reveal>
          <FeaturedCard guide={featured} onOpen={() => setOpenGuide(featured)} />
        </Reveal>
      </div>

      {/* S3. 分类 Tab + 搜索（sticky） */}
      <div className="sticky top-[60px] z-30 mt-10 border-y border-line bg-[rgba(251,248,241,0.92)] backdrop-blur-[12px]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-4 py-2.5 md:px-6">
          <div role="tablist" aria-label="攻略分类" className="flex flex-1 flex-wrap items-center gap-1">
            {guideCategories.map((c) => {
              const isActive = c.id === tab;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(c.id)}
                  className={cn(
                    'relative rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors',
                    isActive ? 'text-cinnabar' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {c.id}
                  <span className="ml-1 font-mono text-[11px] text-ink-3">({c.count})</span>
                  {isActive && (
                    <motion.span
                      layoutId="guide-tab-underline"
                      className="absolute inset-x-3 -bottom-[9px] h-[2px] rounded-full bg-cinnabar"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-3" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜攻略标题…"
                aria-label="搜攻略标题"
                className="h-8 w-[160px] rounded-lg border border-line bg-white pl-8 pr-3 text-[13px] text-ink outline-none transition-all placeholder:text-ink-3 focus:w-[200px] focus:border-gold"
              />
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as 'latest' | 'hottest')}>
              <SelectTrigger className="h-8 w-[92px] border-line bg-white text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">最新</SelectItem>
                <SelectItem value="hottest">最热</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* S4. 文章列表（双栏） */}
      <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <SectionHeader title={tab} en="// GUIDE ARCHIVE" />
        <AnimatePresence mode="wait">
          <motion.div
            key={tab + sort + query}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-x-8 gap-y-1 md:grid-cols-2"
          >
            {list.length > 0 ? (
              list.map((g, i) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <GuideListItem guide={g} onClick={setOpenGuide} />
                </motion.div>
              ))
            ) : (
              <p className="col-span-2 py-12 text-center font-serif text-sm italic text-ink-3">
                「阁中暂未寻得此卷，换个关键词试试。」
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* S5. 阅读抽屉 */}
      <AnimatePresence>
        {openGuide && (
          <ReaderDrawer
            guide={openGuide}
            onClose={() => setOpenGuide(null)}
            onSwitch={setOpenGuide}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
