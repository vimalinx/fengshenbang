import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

/**
 * 内页通用头横幅：面包屑 → H1 → 一行现代描述。
 * 纯白/alt 底，无粒子无纹样。
 */
export default function PageHero({
  breadcrumb,
  title,
  en,
  verdict,
  badges,
  compact = false,
}: {
  breadcrumb: { label: string; to?: string }[];
  title: string;
  en?: string;
  verdict?: string;
  badges?: string[];
  compact?: boolean;
}) {
  return (
    <section
      className={`border-b border-line bg-white ${compact ? 'py-6' : 'py-10'}`}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        {/* 面包屑 */}
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex items-center gap-1.5 text-xs text-ink-2"
          aria-label="面包屑"
        >
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-ink-3">/</span>}
              {b.to ? (
                <Link to={b.to} className="transition-colors duration-150 hover:text-accent">
                  {b.label}
                </Link>
              ) : (
                <span className="text-ink-3">{b.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
              className="flex items-baseline gap-4"
            >
              <h1 className="text-[28px] font-bold leading-[1.25] text-ink">{title}</h1>
              {en && (
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3 sm:block">
                  {en}
                </span>
              )}
            </motion.div>
            {verdict && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="mt-2 text-sm text-ink-2"
              >
                {verdict}
              </motion.p>
            )}
          </div>
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + i * 0.04, ease: 'easeOut' }}
                  className="rounded-[4px] border border-line bg-bg px-2.5 py-1 font-mono text-xs text-ink-2"
                >
                  {b}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** PageHero 右侧扩展插槽（预留给页面代理） */
export function PageHeroExtra({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}
