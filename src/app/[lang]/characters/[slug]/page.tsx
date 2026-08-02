import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BenchmarkTable from "@/components/BenchmarkTable";
import RarityStars from "@/components/RarityStars";
import Section from "@/components/Section";
import SeriesIcon from "@/components/SeriesIcon";
import TeamCard from "@/components/TeamCard";
import WeaponCard from "@/components/WeaponCard";
import {
  getCharacter,
  getTeamsBySlugs,
  getWeaponsBySlugs,
  type Character,
} from "@/lib/content";
import { ROLES, UI, tx, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Params = { lang: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const character = await getCharacter(slug);
  return { title: character ? tx(character.name, lang) || slug : slug };
}

function formatContextWindow(n?: number): string | null {
  if (!n || n <= 0) return null;
  return n >= 1000 ? `${Math.round(n / 1000)}K` : String(n);
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right text-parchment">{value}</span>
    </div>
  );
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const character: Character | undefined = await getCharacter(slug);
  if (!character) notFound();

  const [weapons, teams] = await Promise.all([
    getWeaponsBySlugs(character.bestWeapons),
    getTeamsBySlugs(character.bestTeams),
  ]);

  const name = tx(character.name, lang) || character.slug;
  const contextWindow = formatContextWindow(character.contextWindow);
  const currency = character.pricing?.currency ?? "USD";
  const fmtPrice = (n?: number) =>
    typeof n === "number" ? `$${n.toFixed(2)} ${currency}` : null;

  return (
    <div>
      <Link href={`/${lang}/characters`} className="text-sm text-muted hover:text-gold-300">
        {tx(UI.back, lang)}
      </Link>

      <header className="mt-4 rounded-lg border border-white/10 bg-ink-850 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-parchment">{name}</h1>
            {tx(character.title, lang) && (
              <p className="mt-1 font-display text-sm text-gold-300">
                {tx(character.title, lang)}
              </p>
            )}
          </div>
          <RarityStars rarity={character.rarity} lang={lang} size="text-lg" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <SeriesIcon series={character.series} lang={lang} />
          {(character.roles ?? []).map((role) => (
            <span
              key={role}
              className="rounded border border-white/10 px-1.5 py-0.5 text-[11px] leading-4 text-muted"
            >
              {tx(ROLES[role], lang) || role}
            </span>
          ))}
        </div>
        {tx(character.tagline, lang) && (
          <p className="mt-4 text-sm text-parchment/90">{tx(character.tagline, lang)}</p>
        )}
        {tx(character.lore, lang) && (
          <p className="mt-2 text-sm leading-6 text-muted">{tx(character.lore, lang)}</p>
        )}
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-ink-850 p-5">
          <InfoRow label={tx(UI.character.releaseDate, lang)} value={character.releaseDate} />
          <InfoRow
            label={tx(UI.character.contextWindow, lang)}
            value={contextWindow ? `${contextWindow} ${tx(UI.character.tokens, lang)}` : null}
          />
          <InfoRow
            label={`${tx(UI.character.pricing, lang)} · ${tx(UI.character.pricingInput, lang)}`}
            value={
              fmtPrice(character.pricing?.inputPer1M) &&
              `${fmtPrice(character.pricing?.inputPer1M)} ${tx(UI.character.per1M, lang)}`
            }
          />
          <InfoRow
            label={`${tx(UI.character.pricing, lang)} · ${tx(UI.character.pricingOutput, lang)}`}
            value={
              fmtPrice(character.pricing?.outputPer1M) &&
              `${fmtPrice(character.pricing?.outputPer1M)} ${tx(UI.character.per1M, lang)}`
            }
          />
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-gold-300">
            {tx(UI.character.benchmarks, lang)}
          </h2>
          <BenchmarkTable benchmarks={character.benchmarks} />
        </div>
      </div>

      {(character.skills ?? []).length > 0 && (
        <Section title={tx(UI.character.skills, lang)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {(character.skills ?? []).map((skill, i) => (
              <div key={i} className="rounded border border-white/10 bg-ink-850 p-4">
                <h3 className="text-sm font-semibold text-parchment">
                  {tx(skill.name, lang)}
                </h3>
                <p className="mt-1 text-sm text-muted">{tx(skill.desc, lang)}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(character.constellations ?? []).length > 0 && (
        <Section title={tx(UI.character.constellations, lang)}>
          <ol className="space-y-2">
            {(character.constellations ?? []).map((c, i) => (
              <li
                key={c.level ?? i}
                className="flex gap-3 rounded border border-white/10 bg-ink-850 p-4"
              >
                <span className="shrink-0 font-display text-sm font-bold text-gold-400">
                  {tx(UI.character.constellationLevel, lang).replace(
                    "{level}",
                    String(c.level ?? i + 1),
                  )}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-parchment">
                    {tx(c.name, lang)}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{tx(c.desc, lang)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {weapons.length > 0 && (
        <Section title={tx(UI.character.bestWeapons, lang)}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {weapons.map((w) => (
              <WeaponCard key={w.slug} weapon={w} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      {teams.length > 0 && (
        <Section title={tx(UI.character.bestTeams, lang)}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((t) => (
              <TeamCard key={t.slug} team={t} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      {tx(character.weaknesses, lang) && (
        <Section title={tx(UI.character.weaknesses, lang)}>
          <p className="rounded border border-white/10 bg-ink-850 p-4 text-sm leading-6 text-muted">
            {tx(character.weaknesses, lang)}
          </p>
        </Section>
      )}

    </div>
  );
}
