import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CharacterCard from "@/components/CharacterCard";
import RarityStars from "@/components/RarityStars";
import Section from "@/components/Section";
import { getCharactersBySlugs, getWeapon, type Weapon } from "@/lib/content";
import { UI, WEAPON_TYPES, tx, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Params = { lang: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const weapon = await getWeapon(slug);
  return { title: weapon ? tx(weapon.name, lang) || slug : slug };
}

export default async function WeaponDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const weapon: Weapon | undefined = await getWeapon(slug);
  if (!weapon) notFound();

  const characters = await getCharactersBySlugs(weapon.bestFor);
  const name = tx(weapon.name, lang) || weapon.slug;

  return (
    <div>
      <Link href={`/${lang}/weapons`} className="text-sm text-muted hover:text-gold-300">
        {tx(UI.back, lang)}
      </Link>

      <header className="mt-4 rounded-lg border border-white/10 bg-ink-850 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-display text-3xl font-bold text-parchment">{name}</h1>
          <RarityStars rarity={weapon.rarity} lang={lang} size="text-lg" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {weapon.type && (
            <span className="rounded border border-gold-400/30 px-1.5 py-0.5 text-[11px] leading-4 text-gold-300">
              {tx(UI.weapon.type, lang)} · {tx(WEAPON_TYPES[weapon.type], lang) || weapon.type}
            </span>
          )}
          {weapon.vendor && (
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[11px] leading-4 text-muted">
              {tx(UI.weapon.vendor, lang)} · {weapon.vendor}
            </span>
          )}
        </div>
        {tx(weapon.tagline, lang) && (
          <p className="mt-4 text-sm text-parchment/90">{tx(weapon.tagline, lang)}</p>
        )}
        {tx(weapon.desc, lang) && (
          <p className="mt-2 text-sm leading-6 text-muted">{tx(weapon.desc, lang)}</p>
        )}
      </header>

      {(weapon.passive || (weapon.stats ?? []).length > 0 || tx(weapon.pricing, lang)) && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {weapon.passive && (
            <div className="rounded-lg border border-white/10 bg-ink-850 p-5">
              <h2 className="font-display text-lg font-semibold text-gold-300">
                {tx(UI.weapon.passive, lang)}
                {tx(weapon.passive.name, lang) && (
                  <span className="ml-2 text-sm text-parchment/90">
                    {tx(weapon.passive.name, lang)}
                  </span>
                )}
              </h2>
              {tx(weapon.passive.desc, lang) && (
                <p className="mt-2 text-sm leading-6 text-muted">
                  {tx(weapon.passive.desc, lang)}
                </p>
              )}
            </div>
          )}
          <div className="rounded-lg border border-white/10 bg-ink-850 p-5">
            {(weapon.stats ?? []).length > 0 && (
              <>
                <h2 className="mb-3 font-display text-lg font-semibold text-gold-300">
                  {tx(UI.weapon.stats, lang)}
                </h2>
                <div className="overflow-x-auto rounded border border-white/10">
                  <table className="w-full text-sm">
                    <tbody>
                      {(weapon.stats ?? []).map((s, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-ink-850" : "bg-ink-800"}>
                          <td className="px-3 py-2 text-parchment/90">{tx(s.name, lang)}</td>
                          <td className="px-3 py-2 text-right font-mono text-gold-300">
                            {s.value ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {tx(weapon.pricing, lang) && (
              <p className="mt-4 text-sm text-muted">
                <span className="text-gold-400">{tx(UI.weapon.pricing, lang)}：</span>
                {tx(weapon.pricing, lang)}
              </p>
            )}
          </div>
        </div>
      )}

      {characters.length > 0 && (
        <Section title={tx(UI.weapon.bestFor, lang)}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((c) => (
              <CharacterCard key={c.slug} character={c} lang={lang} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
