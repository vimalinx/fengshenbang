import { PencilLine } from 'lucide-react';
import { wikiPageUrl } from '@/data/wikiBackend';

export default function WikiEditLink({ title, label = '编辑此条目的数据' }: { title: string; label?: string }) {
  return (
    <a
      href={wikiPageUrl(title, 'edit')}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-line bg-white px-3 py-2 text-[13px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
    >
      <PencilLine className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
