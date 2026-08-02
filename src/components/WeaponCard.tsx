import Link from "next/link";
import { lt, WEAPON_TYPE_LABELS, type Locale } from "@/lib/i18n";
import type { Weapon } from "@/lib/types";
import RarityStars from "./RarityStars";

/** 装备卡（列表/推荐位通用）。 */
export default function WeaponCard({
  weapon,
  lang,
}: {
  weapon: Weapon;
  lang: Locale;
}) {
  return (
    <Link
      href={`/${lang}/weapons/${weapon.slug}`}
      className="block rounded border border-ink-600/60 bg-ink-800 p-4 transition-colors hover:border-gold-400/50 hover:bg-ink-700/60"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="inline-block rounded border border-zinc-400/25 px-1.5 py-0.5 text-xs text-zinc-300">
          {WEAPON_TYPE_LABELS[weapon.type]
            ? lt(WEAPON_TYPE_LABELS[weapon.type], lang)
            : weapon.type}
        </span>
        <RarityStars rarity={weapon.rarity} className="text-sm" />
      </div>
      <h3 className="font-title text-lg text-zinc-100">
        {lt(weapon.name, lang)}
      </h3>
      {weapon.vendor && (
        <p className="text-sm text-zinc-500">{weapon.vendor}</p>
      )}
      {weapon.tagline && (
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {lt(weapon.tagline, lang)}
        </p>
      )}
    </Link>
  );
}
