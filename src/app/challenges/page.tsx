import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Flame, Sparkles, Target, Trophy, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/primitives";
import { getBadge } from "@/data/gamification";
import { formatNumber } from "@/lib/utils";
import { challengeStats, challenges, leaderboard, subjects } from "@/data";

export const metadata: Metadata = {
  title: "Challenges",
  description:
    "Weekly and monthly build challenges with XP rewards, badges, hints and a leaderboard. Submit your project and compete with students around the world.",
};

export default function ChallengesPage() {
  const active = challenges.filter((challenge) => challenge.status === "active");
  const upcoming = challenges.filter((challenge) => challenge.status !== "active");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
      <SectionHeading
        eyebrow="Challenges"
        title="Real briefs, real rewards"
        description="Challenges are short, open-ended builds. Read the requirements, use the hints if you get stuck, then submit your work to earn XP and badges."
        action={
          <Button asChild variant="outline">
            <Link href="/projects">
              <Sparkles className="size-4" /> Need a warm-up? Try a project
            </Link>
          </Button>
        }
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { emoji: "🔥", label: "Open challenges", value: challengeStats.activeCount },
          { emoji: "👥", label: "Total entries", value: formatNumber(challengeStats.totalParticipants) },
          { emoji: "⚡", label: "XP available", value: formatNumber(challengeStats.xpAvailable) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
          >
            <span className="text-2xl" aria-hidden>
              {stat.emoji}
            </span>
            <div>
              <p className="text-lg font-black tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
          <Flame className="size-4.5 text-[#f97316]" /> Open now
        </h2>
        <div className="mt-4 space-y-4">
          {active.map((challenge) => {
            const subject = subjects.find((item) => item.id === challenge.subjectId);
            const badge = challenge.badgeId ? getBadge(challenge.badgeId) : null;
            return (
              <article
                key={challenge.id}
                className="card-lift grid gap-5 overflow-hidden rounded-3xl border border-border/70 bg-card p-5 lg:grid-cols-[1.5fr_1fr]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className="border-0 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${challenge.gradient[0]}, ${challenge.gradient[1]})`,
                      }}
                    >
                      {challenge.emoji} {challenge.type}
                    </Badge>
                    <Badge variant="outline">{"⭐".repeat(challenge.difficulty)}</Badge>
                    {subject ? (
                      <Badge variant="secondary">
                        {subject.emoji} {subject.name}
                      </Badge>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-xl font-black tracking-tight">{challenge.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {challenge.blurb}
                  </p>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {challenge.requirements.slice(0, 4).map((requirement) => (
                      <li key={requirement} className="flex gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {requirement}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button asChild variant="gradient" size="sm" className="gap-1.5">
                      <Link href={`/challenges/${challenge.id}`}>
                        <Target className="size-3.5" /> Open challenge
                      </Link>
                    </Button>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> Closes {challenge.deadline}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="size-3.5" /> {formatNumber(challenge.participants)} entries
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Rewards
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-lg">
                      ⚡
                    </span>
                    <div>
                      <p className="text-sm font-bold">{challenge.xp} XP</p>
                      <p className="text-[11px] text-muted-foreground">added on approval</p>
                    </div>
                  </div>
                  {badge ? (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-lg">
                        {badge.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{badge.name} badge</p>
                        <p className="text-[11px] text-muted-foreground">{badge.requirement}</p>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 border-t border-border/60 pt-3">
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      💡 {challenge.hints[0]}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {upcoming.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-black tracking-tight">Coming up</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {upcoming.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-3xl border border-dashed border-border bg-card/50 p-5"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{challenge.type}</Badge>
                  <Badge variant="secondary">{challenge.deadline}</Badge>
                </div>
                <h3 className="mt-3 text-base font-bold">{challenge.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{challenge.blurb}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12">
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
              <Trophy className="size-4.5 text-primary" /> This week’s leaderboard
            </h2>
            <Badge variant="secondary">Resets every Monday</Badge>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 py-2 font-bold">Rank</th>
                  <th className="px-3 py-2 font-bold">Student</th>
                  <th className="px-3 py-2 font-bold">XP this week</th>
                  <th className="px-3 py-2 font-bold">Streak</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={
                      entry.isCurrentUser
                        ? "rounded-xl bg-primary/10 font-bold text-primary"
                        : "border-t border-border/60"
                    }
                  >
                    <td className="px-3 py-2.5 tabular-nums">
                      {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : `#${entry.rank}`}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="mr-2" aria-hidden>
                        {entry.avatarEmoji}
                      </span>
                      {entry.name}
                      {entry.isCurrentUser ? " (you)" : ""}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums">{formatNumber(entry.xp)}</td>
                    <td className="px-3 py-2.5">🔥 {entry.streak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Leaderboards are optional for teachers — schools can switch them off in class settings.
          </p>
        </div>
      </section>
    </div>
  );
}
