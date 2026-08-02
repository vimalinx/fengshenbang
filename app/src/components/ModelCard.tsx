import { Link } from 'react-router';
import type { Model } from '@/data/models';
import { systemMap } from '@/data/models';
import TierSeal from './TierSeal';
import StarRating from './StarRating';
import { cn } from '@/lib/utils';

/**
 * 模型标徽：体系品牌图标，bg-alt 底 + 体系色 2px 左边条。
 * 无图标时回退为模型名首 1–2 字符的字母标徽。
 */
export function ModelMonogram({
  name,
  color,
  icon,
  size = 40,
  className,
}: {
  name: string;
  color: string;
  icon?: string;
  size?: number;
  className?: string;
}) {
  const letters = name.replace(/[^A-Za-z0-9.\- ]/g, '').trim().slice(0, 2).toUpperCase();
  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-bg-alt font-mono font-semibold text-ink',
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      aria-hidden
    >
      <span className="absolute inset-y-0 left-0 w-[2px]" style={{ backgroundColor: color }} />
      {icon ? (
        <img src={icon} alt="" style={{ width: size * 0.62, height: size * 0.62 }} />
      ) : (
        letters
      )}
    </span>
  );
}

/**
 * 模型卡：白卡 + 字母标徽 + 名称/星级/梯队 + 三行 mono 数值 + 擅长标签。
 * Hover：描边变 ink + translateY(-2px)。
 */
export default function ModelCard({
  model,
  className,
  cornerBadge,
}: {
  model: Model;
  className?: string;
  cornerBadge?: string;
}) {
  const sys = systemMap[model.system];
  const to = model.hasDetail ? `/models/${model.id}` : '/models';
  return (
    <Link
      to={to}
      className={cn(
        'group relative block rounded-[6px] border border-line bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-ink',
        className,
      )}
    >
      {cornerBadge && (
        <span className="absolute right-3 top-3 rounded-[4px] bg-ink px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white">
          {cornerBadge}
        </span>
      )}
      <div className="flex items-start gap-3">
        <ModelMonogram name={model.name} color={sys.color} icon={sys.sigil} size={56} />
        <div className="min-w-0 pt-0.5">
          <h3 className="truncate text-[15px] font-semibold leading-[1.35] text-ink">
            {model.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5">
            <StarRating stars={model.stars} />
            <TierSeal tier={model.tier} size={20} />
          </div>
          <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: sys.color }}
              aria-hidden
            />
            {sys.name}
          </span>
        </div>
      </div>
      <div className="mt-3 space-y-1 font-mono text-xs text-ink-2">
        <div className="flex justify-between">
          <span className="text-ink-3">上下文</span>
          <span>{model.contextLabel} tok</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-3">价格</span>
          <span>{model.priceIn == null ? model.priceLabel : `${model.priceLabel} /Mtok`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-3">SWE</span>
          <span className="font-bold text-accent">{model.swe.toFixed(1)}%</span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {model.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-[4px] bg-bg-alt px-2 py-0.5 text-[11px] text-ink-2"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
