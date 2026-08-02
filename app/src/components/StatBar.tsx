import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * 属性条：标签 + 4px line 轨道 + ink 填充 + 数值，进入视口 0→X%（500ms）。
 */
export default function StatBar({
  label,
  value,
  color = '#09090B',
  max = 100,
  delay = 0,
  className,
}: {
  label: string;
  value: number;
  color?: string;
  max?: number;
  delay?: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={className}>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-ink-2">{label}</span>
        <span className="font-mono text-xs font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/** 数字 count-up（进入视口触发，500ms 内完成，无回弹） */
export function CountUp({
  to,
  duration = 0.5,
  decimals = 0,
  className,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
          setDisplay(to);
          return;
        }
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - p, 2);
          setDisplay(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}
