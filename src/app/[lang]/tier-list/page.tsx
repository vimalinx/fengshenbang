import type { Metadata } from "next";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import RarityStars from "@/components/RarityStars";
import Section from "@/components/Section";
import SeriesIcon from "@/components/SeriesIcon";
import {
  getCharacters,
  sortForTierList,
  tierBucket,
  topBenchmarkScore,
  type Character,
} from "@/lib/content";
import { ROLES, UI, tx, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  return { title: tx(UI.nav.tierList, lang) };
}

const BUCKET_LABEL: Record<string, { key: "tierSS" | "tierS" | "tierA"; className: string }> = {
  SS: { key: "tierSS", className: "border-star-6/50 text-star-6" },
  S: { key: "tierS", className: "border-gold-400/50 text-gold-300" },
  A: { key: "tierA", className: "border-star-4/50 text-star-4" },
};

function TierTable({ characters, lang }: { characters: Character[]; lang: Lang }) {
  return (
    <div className="overflow-x-auto rounded border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-ink-800 text-left text-xs text-muted">
            <th className="px-3 py-2 font-normal">{tx(UI.tierList.rank, lang)}</th>
            <th className="px-3 py-2 font-normal">{tx(UI.nav.characters, lang)}</th>
            <th className="px-3 py-2 font-normal"></th>
            <th className="px-3 py-2 text-right font-normal">
              {tx(UI.tierList.topScore, lang)}
            </th>
          </tr>
        </thead>
        <tbody>
          {characters.map((c, i) => (
            <tr key={c.slug} className={i % 2 === 0 ? "bg-ink-850" : "bg-ink-800"}>
              <td className="px-3 py-2 font-display font-bold text-gold-400">{i + 1}</td>
              <td className="px-3 py-2">
                <Link
                  href={`/${lang}/characters/${c.slug}`}
                  className="text-parchment hover:text-gold-300"
                >
                  {tx(c.name, lang) || c.slug}
                </Link>
              </td>
              <td className="px-3 py-2">
                <span className="inline-flex items-center gap-2">
                  <SeriesIcon series={c.series} lang={lang} />
                  <RarityStars rarity={c.rarity} lang={lang} size="text-xs" />
                </span>
              </td>
              <td className="px-3 py-2 text-right font-mono text-gold-300">
                {topBenchmarkScore(c) >= 0 ? topBenchmarkScore(c) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function TierListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const sorted = sortForTierList(await getCharacters());

  if (sorted.length === 0) {
    return (
      <div>
        <h1 className="font-display text-2xl font-bold text-gold-300">
          {tx(UI.nav.tierList, lang)}
        </h1>
        <div className="mt-6">
          <EmptyState text={tx(UI.empty.characters, lang)} />
        </div>
      </div>
    );
  }

  const buckets: Record<string, Character[]> = { SS: [], S: [], A: [] };
  for (const c of sorted) buckets[tierBucket(c.rarity)].push(c);

  const roles = Array.from(new Set(sorted.flatMap((c) => c.roles ?? [])));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gold-300">
        {tx(UI.nav.tierList, lang)}
      </h1>
      <p className="mt-2 text-sm text-muted">{tx(UI.tierList.note, lang)}</p>

      <Section title={tx(UI.tierList.overall, lang)}>
        <div className="space-y-6">
          {(["SS", "S", "A"] as const)
            .filter((b) => buckets[b].length > 0)
            .map((b) => (
              <div key={b}>
                <h3
                  className={`mb-2 inline-block rounded border px-2 py-0.5 font-display text-sm font-bold ${BUCKET_LABEL[b].className}`}
                >
                  {tx(UI.tierList[BUCKET_LABEL[b].key], lang)}
                </h3>
                <TierTable characters={buckets[b]} lang={lang} />
              </div>
            ))}
        </div>
      </Section>

      {roles.length > 0 && (
        <Section title={tx(UI.tierList.byRole, lang)}>
          <div className="space-y-8">
            {roles.map((role) => {
              const inRole = sortForTierList(
                sorted.filter((c) => (c.roles ?? []).includes(role)),
              );
              if (inRole.length === 0) return null;
              return (
                <div key={role}>
                  <h3 className="mb-2 text-sm font-semibold text-parchment">
                    {tx(ROLES[role], lang) || role}
                  </h3>
                  <TierTable characters={inRole} lang={lang} />
                </div>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}
