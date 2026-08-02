import type { Metadata } from "next";
import TeamCard from "@/components/TeamCard";
import EmptyState from "@/components/EmptyState";
import { getTeams, sortTeamsByRating } from "@/lib/content";
import { UI, tx, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  return { title: tx(UI.nav.teams, lang) };
}

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const teams = sortTeamsByRating(await getTeams());

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gold-300">
        {tx(UI.nav.teams, lang)}
      </h1>
      <div className="mt-6">
        {teams.length === 0 ? (
          <EmptyState text={tx(UI.empty.teams, lang)} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((t) => (
              <TeamCard key={t.slug} team={t} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
