import Link from "next/link";
import { lt, POSITION_LABELS, t, type Locale } from "@/lib/i18n";
import type { Team } from "@/lib/types";

/** 配队卡（列表/推荐位通用）。成员只显示 slug 文本，详情页才做联动查询。 */
export default function TeamCard({ team, lang }: { team: Team; lang: Locale }) {
  return (
    <Link
      href={`/${lang}/teams/${team.slug}`}
      className="block rounded border border-ink-600/60 bg-ink-800 p-4 transition-colors hover:border-gold-400/50 hover:bg-ink-700/60"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="font-title text-lg text-zinc-100">
          {lt(team.name, lang)}
        </h3>
        {team.tierRating && (
          <span className="font-title text-xl text-gold-300">
            {team.tierRating}
          </span>
        )}
      </div>
      {team.scenario && (
        <p className="line-clamp-2 text-sm text-zinc-400">
          {lt(team.scenario, lang)}
        </p>
      )}
      {team.members && team.members.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {team.members.map((m, i) => (
            <span
              key={`${m.character}-${i}`}
              className="rounded bg-ink-700 px-1.5 py-0.5 text-xs text-zinc-400"
            >
              {POSITION_LABELS[m.position]
                ? lt(POSITION_LABELS[m.position], lang)
                : m.position}
              · {m.character}
            </span>
          ))}
        </div>
      )}
      {(!team.members || team.members.length === 0) && (
        <p className="mt-3 text-xs text-zinc-600">{t("emptyGeneric", lang)}</p>
      )}
    </Link>
  );
}
