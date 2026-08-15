import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NAV_LINKS = [
  { to: '/', label: '首页' },
  { to: '/models', label: '模型图鉴' },
  { to: '/harnesses', label: 'Harness 库' },
  { to: '/benchmarks', label: '测试集' },
  { to: '/teams', label: '配队榜' },
  { to: '/scenarios', label: '场景' },
  { to: '/guides', label: '攻略' },
  { to: '/tools', label: '工具箱' },
  { to: '/compare', label: '对决' },
  { to: '/changelog', label: '更新日志' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-line bg-white/90 backdrop-blur-[12px]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center gap-4 px-4 md:px-6">
        {/* 左：logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src="/logo.svg" alt="封神榜" className="h-8 w-8 rounded-[6px]" />
          <span className="text-[18px] font-bold leading-none text-ink">封神榜</span>
          <span className="hidden font-mono text-[10px] tracking-[0.18em] text-ink-3 xl:block">
            FENGSHENBANG WIKI
          </span>
        </Link>

        {/* 中：导航项 */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative px-2.5 py-2 text-sm font-medium transition-colors duration-150',
                  isActive ? 'text-accent' : 'text-ink-2 hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2.5 bottom-0 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* 右：搜索 + 赛季徽章 + 汉堡 */}
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <div
            className={cn(
              'hidden items-center gap-2 rounded-[4px] border bg-white px-3 py-1.5 transition-all duration-150 md:flex',
              focus ? 'w-[280px] border-accent' : 'w-[200px] border-line',
            )}
          >
            <Search className="h-3.5 w-3.5 shrink-0 text-ink-3" />
            <input
              placeholder="搜索模型 / Harness / 攻略…"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
            />
          </div>
          <span className="hidden shrink-0 rounded-[4px] border border-line px-2 py-0.5 font-mono text-[11px] text-ink-2 xl:block">
            2026-07 赛季
          </span>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-[4px] text-ink-2 transition-colors duration-150 hover:bg-bg-alt lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="打开导航"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 移动端抽屉 */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={drawerRef}
            className="fixed inset-0 z-[60] bg-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-[60px] items-center justify-between border-b border-line px-4">
              <div className="flex items-center gap-2.5">
                <img src="/logo.svg" alt="" className="h-8 w-8 rounded-[6px]" />
                <span className="text-[18px] font-bold text-ink">封神榜</span>
              </div>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-[4px] text-ink-2 transition-colors duration-150 hover:bg-bg-alt"
                onClick={() => setOpen(false)}
                aria-label="关闭导航"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-6">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.2 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-[4px] px-4 py-3 text-base font-medium transition-colors duration-150',
                        isActive ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-bg-alt',
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-6 px-4">
                <span className="rounded-[4px] border border-line px-2 py-0.5 font-mono text-[11px] text-ink-2">
                  2026-07 赛季
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
