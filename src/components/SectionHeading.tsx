/** 区块标题：衬线 + 哑光金细线，wiki 式分节。 */
export default function SectionHeading({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b border-gold-400/20 pb-2">
      <div>
        <h2 className="font-title text-2xl text-zinc-100">{title}</h2>
        {desc && <p className="mt-1 text-sm text-zinc-500">{desc}</p>}
      </div>
      {action && <div className="shrink-0 text-sm">{action}</div>}
    </div>
  );
}
