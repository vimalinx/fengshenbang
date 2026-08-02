import { UI, tx, type Lang } from "@/lib/i18n";

export default function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted">
        <p>
          {tx(UI.site.name, lang)} — {tx(UI.site.tagline, lang)}
        </p>
        <p className="mt-1">{tx(UI.footer.disclaimer, lang)}</p>
      </div>
    </footer>
  );
}
