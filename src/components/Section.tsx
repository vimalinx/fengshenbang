import type { ReactNode } from "react";

/** 区块标题：衬线金字 + ◆── 渐变金饰分隔线，可选说明与右侧操作。 */
export default function Section({
  title,
  desc,
  action,
  children,
}: {
  title: string;
  desc?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="gold-divider font-display text-xl font-bold tracking-wider text-gold-300">
            <span aria-hidden className="text-xs text-gold-400/80">◆</span>
            <span>{title}</span>
            <span aria-hidden className="text-xs text-gold-400/80">◆</span>
          </h2>
          {desc && <p className="mt-1.5 text-center text-xs text-muted">{desc}</p>}
        </div>
        {action && <div className="shrink-0 self-center text-sm">{action}</div>}
      </div>
      {children}
    </section>
  );
}
