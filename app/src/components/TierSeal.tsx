import type { Tier } from '@/data/models';
import { tierMap } from '@/data/models';
import { cn } from '@/lib/utils';

/**
 * 梯队徽标：24×24 4px 方角。
 * T0 黑底白字，T1 灰底白字，T2 描边款，T3 浅灰底。
 */
export default function TierSeal({
  tier,
  size = 24,
  className,
}: {
  tier: Tier;
  size?: number;
  /** @deprecated v2 无入场动画，保留仅为兼容旧调用签名 */
  animate?: boolean;
  className?: string;
}) {
  const info = tierMap[tier];
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-[4px] font-mono font-bold leading-none',
        tier === 'T0' && 'bg-ink text-white',
        tier === 'T1' && 'bg-ink-2 text-white',
        tier === 'T2' && 'border border-line-strong bg-white text-ink-2',
        tier === 'T3' && 'bg-bg-alt text-ink-3',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
      title={`${tier} · ${info.name}`}
    >
      {tier}
    </span>
  );
}
