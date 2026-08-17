import { Link } from 'react-router';
import type { Guide } from '@/data/guides';
import { guideCategories } from '@/data/guides';
import { cn } from '@/lib/utils';

/**
 * 攻略条目：分类描边徽章（mono 11px）+ 标题 + 右侧 meta。
 */
export default function GuideListItem({
  guide,
  className,
  onClick,
}: {
  guide: Guide;
  className?: string;
  /** 提供 onClick 时用按钮渲染（如打开阅读抽屉），否则链接到 /guides */
  onClick?: (g: Guide) => void;
}) {
  const cat = guideCategories.find((c) => c.id === guide.category);
  const inner = (
    <>
      <span
        className="shrink-0 rounded-[4px] border px-1.5 py-px font-mono text-[11px]"
        style={{ color: cat?.color ?? '#52525B', borderColor: 'currentColor' }}
      >
        {guide.category}
      </span>
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm transition-colors duration-150',
          guide.pending ? 'text-ink-3' : 'text-ink group-hover:text-accent',
        )}
      >
        {guide.title}
      </span>
      <span className="shrink-0 font-mono text-xs text-ink-3">
        {guide.pending ? '待撰写' : '已撰写'}
      </span>
    </>
  );
  const cls = cn(
    'group flex w-full items-center gap-2.5 rounded-[4px] border border-transparent px-3 py-2.5 text-left transition-colors duration-150 hover:border-line hover:bg-bg-alt',
    className,
  );
  if (onClick) {
    return (
      <button className={cls} onClick={() => onClick(guide)}>
        {inner}
      </button>
    );
  }
  return (
    <Link to="/guides" className={cls}>
      {inner}
    </Link>
  );
}
