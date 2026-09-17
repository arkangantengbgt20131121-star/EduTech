import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Flame, Lightbulb, Target, Trophy, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeaderboardCard } from "@/components/challenges/leaderboard-card";
import { ChallengeSubmit } from "@/components/challenges/challenge-submit";
import { formatNumber } from "@/lib/utils";
import { challenges, getBadge, getChallenge, getSubject } from "@/data";

export function generateStaticParams() {
  return challenges.map((challenge) => ({ id: challenge.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const challenge = getChallenge(id);
  if (!challenge) return { title: "Challenge not found" };
  return { title: challenge.title, description: challenge.blurb };
}

export default async function ChallengePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const challenge = getChallenge(id);
  if (!challenge) notFound();

  const subject = getSubject(challenge.subjectId);
  const badge = challenge.badgeId ? getBadge(challenge.badgeId) : null;
  const others = challenges.filter((item) => item.id !== challenge.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/challenges" className="transition hover:text-foreground">
          Challenges
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{challenge.title}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article>
          <div
            className="relative overflow-hidden rounded-3xl p-6 text-white sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${challenge.gradient[0]}, ${challenge.gradient[1]})`,
            }}
          >
            <span className="absolute inset-0 bg-grid opacity-15" aria-hidden />
            <span className="absolute -right-12 -top-12 size-48 rounded-full bg-white/15 blur-3xl" aria-hidden />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-0 bg-white/20 text-white backdrop-blur">
                  <Flame className="size-3.5" /> {challenge.type}
                </Badge>
                <Badge className="border-0 bg-white/20 text-white backdrop-blur">
                  Difficulty {"⭐".repeat(challenge.difficulty)}
                </Badge>
                {subject ? (
                  <Badge className="border-0 bg-white/20 text-white backdrop-blur">
                    {subject.emoji} {subject.name}
                  </Badge>
                ) : null}
              </div>
              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {challenge.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
                {challenge.blurb}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/85">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> Deadline: {challenge.deadline}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5" /> {formatNumber(challenge.participants)} entries so far
                </span>
              </div>
            </div>
          </div>

          <section className="mt-8 rounded-3xl border border-border/70 bg-card p-5">
            <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
              <Target className="size-4.5 text-primary" /> What you must deliver
            </h2>
            <ul className="mt-4 space-y-3">
              {challenge.requirements.map((requirement, index) => (
                <li key={requirement} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/12 text-[11px] font-black text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-3xl border border-border/70 bg-card p-5">
            <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
              <Lightbulb className="size-4.5 text-[color-mix(in_oklab,var(--warning)_75%,var(--foreground))]" /> Hints
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {challenge.hints.map((hint) => (
                <li
                  key={hint}
                  className="rounded-2xl bg-[color-mix(in_oklab,var(--warning)_9%,transparent)] p-3.5 text-xs leading-relaxed text-muted-foreground"
                >
                  💡 {hint}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-black tracking-tight">Other open challenges</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.map((item) => (
                <Link
                  key={item.id}
                  href={`/challenges/${item.id}`}
                  className="card-lift rounded-2xl border border-border/70 bg-card p-4"
                >
                  <span className="text-2xl" aria-hidden>
                    {item.emoji}
                  </span>
                  <p className="mt-2 text-sm font-bold leading-snug">{item.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {item.type} · {item.xp} XP
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Trophy className="size-4 text-primary" /> Rewards
            </p>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-muted/50 p-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-lg">⚡</span>
                <div>
                  <p className="text-sm font-bold">{challenge.xp} XP</p>
                  <p className="text-[11px] text-muted-foreground">on approval</p>
                </div>
              </div>
              {badge ? (
                <div className="flex items-center gap-3 rounded-2xl bg-muted/50 p-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-lg">
                    {badge.emoji}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{badge.name}</p>
                    <p className="text-[11px] text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ) : null}
            </div>

            <ChallengeSubmit challengeTitle={challenge.title} xp={challenge.xp} />

            <Button asChild variant="ghost" size="sm" className="mt-2 w-full gap-1.5">
              <Link href="/challenges">
                <ArrowLeft className="size-3.5" /> Back to all challenges
              </Link>
            </Button>
          </div>

          <LeaderboardCard />
        </aside>
      </div>
    </div>
  );
}
