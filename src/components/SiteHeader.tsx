"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, t, type Locale } from "@/lib/i18n";

const NAV_ITEMS = [
  { key: "navCharacters", path: "characters" },
  { key: "navWeapons", path: "weapons" },
  { key: "navTeams", path: "teams" },
  { key: "navTierList", path: "tier-list" },
] as const;

/** 顶栏导航 + 中英切换（保留当前路径，仅替换语言前缀）。 */
export default function SiteHeader({ lang }: { lang: Locale }) {
  const pathname = usePathname() ?? `/${lang}`;
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  const switchPath = (target: Locale) =>
    pathname.replace(/^\/(zh|en)(?=\/|$)/, `/${target}`);

  return (
    <header className="border-b border-gold-400/15 bg-ink-950/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href={`/${lang}`} className="flex items-baseline gap-2">
          <span className="font-title text-xl text-gold-300">
            {t("siteName", lang)}
          </span>
          <span className="hidden text-xs text-zinc-500 sm:inline">
            {t("siteSlogan", lang)}
          </span>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <Link
            href={`/${lang}`}
            className={
              isHome ? "text-gold-300" : "text-zinc-400 hover:text-zinc-200"
            }
          >
            {t("navHome", lang)}
          </Link>
          {NAV_ITEMS.map(({ key, path }) => {
            const href = `/${lang}/${path}`;
            const active = pathname.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                className={
                  active
                    ? "text-gold-300"
                    : "text-zinc-400 hover:text-zinc-200"
                }
              >
                {t(key, lang)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1 text-sm">
          {LOCALES.map((l, i) => (
            <span key={l} className="flex items-center gap-1">
              {i > 0 && <span className="text-zinc-600">/</span>}
              {l === lang ? (
                <span className="text-gold-300">{l.toUpperCase()}</span>
              ) : (
                <Link
                  href={switchPath(l)}
                  className="text-zinc-500 hover:text-zinc-200"
                >
                  {l.toUpperCase()}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
