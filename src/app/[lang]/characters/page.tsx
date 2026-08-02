import type { Metadata } from "next";
import CharacterCard from "@/components/CharacterCard";
import EmptyState from "@/components/EmptyState";
import { getCharacters, sortForTierList } from "@/lib/content";
import { UI, tx, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  return { title: tx(UI.nav.characters, lang) };
}

export default async function CharactersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const characters = sortForTierList(await getCharacters());

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gold-300">
        {tx(UI.nav.characters, lang)}
      </h1>
      <div className="mt-6">
        {characters.length === 0 ? (
          <EmptyState text={tx(UI.empty.characters, lang)} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((c) => (
              <CharacterCard key={c.slug} character={c} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
