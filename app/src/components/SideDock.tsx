import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { BookOpen, Compass, History, Home, ScrollText, Users, Wand2, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

const DOCK_LINKS = [
  { to: '/', label: '首页', icon: Home },
  { to: '/models', label: '模型图鉴', icon: BookOpen },
  { to: '/harnesses', label: 'Harness 库', icon: Wand2 },
  { to: '/teams', label: '配队榜', icon: Users },
  { to: '/scenarios', label: '场景', icon: Compass },
  { to: '/guides', label: '攻略', icon: ScrollText },
  { to: '/tools', label: '工具箱', icon: Wrench },
  { to: '/changelog', label: '更新日志', icon: History },
];

/**
 * 全站左侧悬浮轻导航（ghost dock）。与词条页标签页同为导航职责，刻意做轻：
 * 无边框无投影，仅一层薄纱底；当前页金点小标，悬停淡出站名。
 * 仅在屏幕足够宽（≥1420px，主内容 1280 居中后两侧留白充足）时显示。
 */
export default function SideDock() {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="fixed left-3 top-1/2 z-[70] hidden -translate-y-1/2 min-[1420px]:flex"
      aria-label="全站快捷导航"
    >
      <div className="flex flex-col gap-1 rounded-full bg-white/45 px-1.5 py-2 backdrop-blur-[6px]">
        {DOCK_LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className="group relative">
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150',
                    isActive ? 'text-gold' : 'text-ink-3/60 hover:text-gold',
                  )}
                >
                  <l.icon className="h-[18px] w-[18px]" />
                  {isActive && (
                    <motion.span
                      layoutId="dock-active-dot"
                      className="absolute -left-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </span>
                <span className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/80 px-2 py-0.5 text-xs text-ink-2 opacity-0 backdrop-blur-[6px] transition-opacity duration-150 group-hover:opacity-100">
                  {l.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
