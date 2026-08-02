import { Link } from 'react-router';

/**
 * 区块标题：accent 竖条 + H2 + mono 英文小注 + 1px 发丝线 + 右侧查看更多。
 */
export default function SectionHeader({
  title,
  en,
  moreTo,
  moreLabel = '查看更多 →',
  barColor,
}: {
  title: string;
  en?: string;
  moreTo?: string;
  moreLabel?: string;
  /** 竖条颜色，默认站点 accent 蓝 */
  barColor?: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block h-3 w-1 bg-accent"
            style={barColor ? { backgroundColor: barColor } : undefined}
            aria-hidden
          />
          <h2 className="text-[18px] font-semibold leading-[1.3] text-ink">{title}</h2>
          {en && (
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 sm:block">
              {en}
            </span>
          )}
        </div>
        {moreTo && (
          <Link
            to={moreTo}
            className="shrink-0 text-[13px] font-medium text-ink-2 transition-colors duration-150 hover:text-accent"
          >
            {moreLabel}
          </Link>
        )}
      </div>
      <div className="mt-2.5 h-px w-full bg-line" aria-hidden />
    </div>
  );
}
