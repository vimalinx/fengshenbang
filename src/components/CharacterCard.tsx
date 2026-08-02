import Link from "next/link";
import { lt, ROLE_LABELS, type Locale } from "@/lib/i18n";
import type { Character } from "@/lib/types";
import RarityStars from "./RarityStars";
import SeriesBadge from "./SeriesBadge";

/** 角色卡（列表/推荐位通用）。 */
export default function CharacterCard({
  character,
  lang,
}: {
  character: Character;
  lang: Locale;
}) {
  return (
    <Link
      href={`/${lang}/characters/${character.slug}`}
      className="block rounded border border-ink-600/60 bg-ink-800 p-4 transition-colors hover:border-gold-400/50 hover:bg-ink-700/60"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <SeriesBadge series={character.series} lang={lang} />
        <RarityStars rarity={character.rarity} className="text-sm" />
      </div>
      <h3 className="font-title text-lg text-zinc-100">
        {lt(character.name, lang)}
      </h3>
      {character.title && (
        <p className="text-sm text-gold-300/80">{lt(character.title, lang)}</p>
      )}
      {character.tagline && (
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {lt(character.tagline, lang)}
        </p>
      )}
      {character.roles && character.roles.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {character.roles.map((role) => (
            <span
              key={role}
              className="rounded bg-ink-700 px-1.5 py-0.5 text-xs text-zinc-400"
            >
              {ROLE_LABELS[role] ? lt(ROLE_LABELS[role], lang) : role}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
