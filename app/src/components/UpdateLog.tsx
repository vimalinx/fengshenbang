import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { changelogRecent, logTypeColor } from '@/data/changelog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

/**
 * 更新日志侧栏卡：日期（mono 11px accent）+ 类型徽章 + 一行文字，最多 8 条。
 */
export default function UpdateLog({
  max = 8,
  className,
}: {
  max?: number;
  className?: string;
}) {
  const flat = changelogRecent.flatMap((d) =>
    d.items.map((it) => ({ date: d.date, ...it })),
  ).slice(0, max);

  return (
    <div className={cn('rounded-[6px] border border-line bg-white p-4', className)}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <span className="inline-block h-3 w-1 bg-accent" aria-hidden />
          更新日志
        </h3>
        <Link
          to="/changelog"
          className="text-xs text-ink-2 transition-colors duration-150 hover:text-accent"
        >
          全部日志 →
        </Link>
      </div>
      <ScrollArea className="h-[320px] pr-2">
        <ul className="space-y-2.5">
          {flat.map((it, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.03, ease: 'easeOut' }}
              className="flex items-start gap-2 text-[13px] leading-[1.6]"
            >
              <span className="shrink-0 pt-px font-mono text-[11px] font-bold text-accent">
                {it.date}
              </span>
              <span
                className="shrink-0 rounded-[4px] border px-1 py-px font-mono text-[10px]"
                style={{ color: logTypeColor[it.type], borderColor: 'currentColor' }}
              >
                {it.type}
              </span>
              <span className="min-w-0 text-ink-2">{it.text}</span>
            </motion.li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
