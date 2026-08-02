import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 通用入场动效（v2 唯一预设 fade-up）：
 * opacity 0→1, y 8→0, 200ms, ease-out，进入视口触发一次。
 */
export function Reveal({
  children,
  delay = 0,
  y = 8,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
