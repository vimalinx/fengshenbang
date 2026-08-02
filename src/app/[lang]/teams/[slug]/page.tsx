import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import {
  getCharacters,
  getTeam,
  getWeapons,
  type Team,
} from "@/lib/content";
import { POSITIONS, UI, tx, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Params = { lang: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const team = await getTeam(slug);
  return { title: team ? tx(team.name, lang) || slug : slug };
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const team: Team | undefined = await getTeam(slug);
  if (!team) notFound();

  const [characters, weapons] = await Promise.all([getCharacters(), getWeapons()]);
  const name = tx(team.name, lang) || team.slug;

  const memberLink = (
    kind: "characters" | "weapons",
    slugValue: string | undefined,
    display: string,
  ) =>
    slugValue ? (
      <Link
        href={`/${lang}/${kind}/${slugValue}`}
        className="text-gold-400 hover:text-gold-300"
      >
        {display}
      </Link>
    ) : (
      <span className="text-muted">—</span>
    );

  return (
    <div>
      <Link href={`/${lang}/teams`} className="text-sm text-muted hover:text-gold-300">
        {tx(UI.back, lang)}
      </Link>

      <header className="mt-4 rounded-lg border border-white/10 bg-ink-850 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-display text-3xl font-bold text-parchment">{name}</h1>
          {team.tierRating && (
            <span className="rounded border border-gold-400/50 px-2 py-1 font-display text-sm font-bold text-gold-300">
              {tx(UI.team.tierRating, lang)} · {team.tierRating.toUpperCase()}
            </span>
          )}
        </div>
        {tx(team.scenario, lang) && (
          <p className="mt-3 text-sm leading-6 text-muted">{tx(team.scenario, lang)}</p>
        )}
      </header>

      {(team.members ?? []).length > 0 && (
        <Section title={tx(UI.team.members, lang)}>
          <div className="overflow-x-auto rounded border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink-800 text-left text-xs text-muted">
                  <th className="px-3 py-2 font-normal">{lang === "zh" ? "位置" : "Position"}</th>
                  <th className="px-3 py-2 font-normal">{tx(UI.nav.characters, lang)}</th>
                  <th className="px-3 py-2 font-normal">{tx(UI.nav.weapons, lang)}</th>
                  <th className="px-3 py-2 font-normal">{lang === "zh" ? "说明" : "Note"}</th>
                </tr>
              </thead>
              <tbody>
                {(team.members ?? []).map((m, i) => {
                  const c = characters.find((x) => x.slug === m.character);
                  const w = weapons.find((x) => x.slug === m.weapon);
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-ink-850" : "bg-ink-800"}>
                      <td className="px-3 py-2 whitespace-nowrap text-gold-300">
                        {tx(m.position ? POSITIONS[m.position] : undefined, lang) ||
                          m.position ||
                          "—"}
                      </td>
                      <td className="px-3 py-2">
                        {memberLink(
                          "characters",
                          m.character,
                          (c && tx(c.name, lang)) || m.character || "",
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {memberLink(
                          "weapons",
                          m.weapon,
                          (w && tx(w.name, lang)) || m.weapon || "",
                        )}
                      </td>
                      <td className="px-3 py-2 text-muted">{tx(m.note, lang)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {tx(team.rotation, lang) && (
        <Section title={tx(UI.team.rotation, lang)}>
          <p className="whitespace-pre-line rounded border border-white/10 bg-ink-850 p-4 text-sm leading-6 text-parchment/90">
            {tx(team.rotation, lang)}
          </p>
        </Section>
      )}

      {tx(team.budgetAlt, lang) && (
        <Section title={tx(UI.team.budgetAlt, lang)}>
          <p className="whitespace-pre-line rounded border border-white/10 bg-ink-850 p-4 text-sm leading-6 text-muted">
            {tx(team.budgetAlt, lang)}
          </p>
        </Section>
      )}
    </div>
  );
}
