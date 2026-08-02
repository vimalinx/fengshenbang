import Link from "next/link";
import CharacterCard from "@/components/CharacterCard";
import TeamCard from "@/components/TeamCard";
import Section from "@/components/Section";
import EmptyState from "@/components/EmptyState";
import RarityStars from "@/components/RarityStars";
import SeriesIcon from "@/components/SeriesIcon";
import {
  getCharacters,
  getTeams,
  sortByReleaseDate,
  sortForTierList,
  sortTeamsByRating,
  topBenchmarkScore,
} from "@/lib/content";
import { UI, tx, type Lang } from "@/lib/i18n";

/** 内容在请求时读取，避免构建期固化空目录。 */
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const [characters, teams] = await Promise.all([getCharacters(), getTeams()]);

  const banner = sortByReleaseDate(characters).slice(0, 3);
  const abyss = sortTeamsByRating(teams).slice(0, 3);
  const tierPreview = sortForTierList(characters).slice(0, 5);

  return (
    <div>
      <section className="rounded-lg border border-gold-400/20 bg-ink-850 px-6 py-10 text-center">
        <h1 className="font-display text-3xl font-bold tracking-widest text-gold-300 sm:text-4xl">
          {tx(UI.site.name, lang)}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          {tx(UI.site.tagline, lang)}
        </p>
      </section>

      <Section
        title={tx(UI.home.banner, lang)}
        desc={tx(UI.home.bannerDesc, lang)}
        action={
          characters.length > 0 ? (
            <Link href={`/${lang}/characters`} className="text-gold-400 hover:text-gold-300">
              {tx(UI.home.viewAll, lang)}
            </Link>
          ) : undefined
        }
      >
        {banner.length === 0 ? (
          <EmptyState text={tx(UI.empty.characters, lang)} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {banner.map((c) => (
              <CharacterCard key={c.slug} character={c} lang={lang} />
            ))}
          </div>
        )}
      </Section>

      <Section
        title={tx(UI.home.abyss, lang)}
        desc={tx(UI.home.abyssDesc, lang)}
        action={
          teams.length > 0 ? (
            <Link href={`/${lang}/teams`} className="text-gold-400 hover:text-gold-300">
              {tx(UI.home.viewAll, lang)}
            </Link>
          ) : undefined
        }
      >
        {abyss.length === 0 ? (
          <EmptyState text={tx(UI.empty.teams, lang)} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {abyss.map((t) => (
              <TeamCard key={t.slug} team={t} lang={lang} />
            ))}
          </div>
        )}
      </Section>

      <Section
        title={tx(UI.home.tierPreview, lang)}
        action={
          characters.length > 0 ? (
            <Link href={`/${lang}/tier-list`} className="text-gold-400 hover:text-gold-300">
              {tx(UI.home.viewAll, lang)}
            </Link>
          ) : undefined
        }
      >
        {tierPreview.length === 0 ? (
          <EmptyState text={tx(UI.empty.characters, lang)} />
        ) : (
          <ol className="divide-y divide-white/5 rounded border border-white/10">
            {tierPreview.map((c, i) => (
              <li key={c.slug} className={i % 2 === 0 ? "bg-ink-850" : "bg-ink-800"}>
                <Link
                  href={`/${lang}/characters/${c.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-ink-700"
                >
                  <span className="w-6 font-display text-sm font-bold text-gold-400">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-parchment">
                    {tx(c.name, lang) || c.slug}
                  </span>
                  <SeriesIcon series={c.series} lang={lang} />
                  <RarityStars rarity={c.rarity} lang={lang} size="text-xs" />
                  <span className="w-16 text-right font-mono text-xs text-muted">
                    {topBenchmarkScore(c) >= 0 ? topBenchmarkScore(c) : "—"}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </Section>
    </div>
  );
}
