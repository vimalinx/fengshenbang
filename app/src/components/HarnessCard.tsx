import { Link } from 'react-router';
import type { Harness } from '@/data/harnesses';
import StarRating from './StarRating';
import { cn } from '@/lib/utils';

/**
 * Harness 卡：线性极简图标 + 类型 chip + 能力一行 + 价格。
 */
export default function HarnessCard({
  harness,
  className,
  linkTo,
}: {
  harness: Harness;
  className?: string;
  /** 默认跳 /harnesses#id 打开详情抽屉 */
  linkTo?: string;
}) {
  const to = linkTo ?? `/harnesses#${harness.id}`;
  const isTop = harness.stars >= 6;
  return (
    <Link
      to={to}
      className={cn(
        'group relative block rounded-[6px] border bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-ink',
        isTop ? 'border-ink' : 'border-line',
        className,
      )}
    >
      {isTop && (
        <span className="absolute right-3 top-3 rounded-[4px] bg-ink px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white">
          TOP
        </span>
      )}
      <div className="flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border border-line bg-white p-2.5">
          <img src={harness.icon} alt={harness.name} className="h-full w-full" loading="lazy" />
        </div>
        <div className="min-w-0 pt-0.5">
          <h3 className="truncate text-[15px] font-semibold leading-[1.35] text-ink">
            {harness.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <StarRating stars={harness.stars} />
            <span className="rounded-[4px] border border-line px-1.5 py-px font-mono text-[11px] text-ink-2">
              {harness.type}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 min-h-[2.6em] text-[13px] leading-[1.6] text-ink-2">
        {harness.passive}
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
        <span className="font-mono text-xs font-bold text-ink">{harness.priceLabel}</span>
        <span className="text-xs text-ink-2 transition-colors duration-150 group-hover:text-accent">
          详情 →
        </span>
      </div>
    </Link>
  );
}
