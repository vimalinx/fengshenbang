/** 数据缺失时的占位：卷轴式空榜——「虚位以待 · 静待封神」。 */
export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="empty-scroll fade-up px-12 py-12 text-center sm:px-20">
      <p className="font-display text-lg tracking-[0.3em] text-gold-400/90">
        虚位以待 · 静待封神
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{text}</p>
      <div className="gold-divider mx-auto mt-6 max-w-xs" aria-hidden>
        <span className="text-[10px] text-gold-400/50">◆</span>
      </div>
    </div>
  );
}
