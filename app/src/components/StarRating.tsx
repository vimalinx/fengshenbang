import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 星级：实心 ink / 空心 line-strong。
 */
export default function StarRating({
  stars,
  size = 10,
  className,
}: {
  stars: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-[1px]', className)} aria-label={`${stars} 星`}>
      {Array.from({ length: 6 }, (_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          fill={i < stars ? '#09090B' : 'none'}
          color={i < stars ? '#09090B' : '#D4D4D8'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
