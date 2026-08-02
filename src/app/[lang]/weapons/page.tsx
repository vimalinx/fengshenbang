import type { Metadata } from "next";
import WeaponCard from "@/components/WeaponCard";
import EmptyState from "@/components/EmptyState";
import { getWeapons } from "@/lib/content";
import { UI, tx, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  return { title: tx(UI.nav.weapons, lang) };
}

const RARITY_ORDER = (r?: number) => -(r ?? 0);

export default async function WeaponsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const weapons = (await getWeapons()).sort(
    (a, b) => RARITY_ORDER(a.rarity) - RARITY_ORDER(b.rarity) || a.slug.localeCompare(b.slug),
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gold-300">
        {tx(UI.nav.weapons, lang)}
      </h1>
      <div className="mt-6">
        {weapons.length === 0 ? (
          <EmptyState text={tx(UI.empty.weapons, lang)} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {weapons.map((w) => (
              <WeaponCard key={w.slug} weapon={w} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
