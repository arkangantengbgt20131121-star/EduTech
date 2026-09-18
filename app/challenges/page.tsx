"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Swords, Trophy, Users, Zap } from "lucide-react";
import { challenges } from "@/lib/projects";
import type { Challenge } from "@/lib/types";
import { useEduTech } from "@/lib/store";
import { Button, Progress, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

function ChallengePanel({ challenge, big = false }: { challenge: Challenge; big?: boolean }) {
  const { completeChallenge, isChallengeDone } = useEduTech();
  const [joined, setJoined] = useState(false);
  const done = isChallengeDone(challenge.id);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-8",
        big ? "border-amber-500/40 shadow-xl shadow-amber-500/10" : "border-border"
      )}
    >
      {big && <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-amber-400 to-orange-500" />}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
            challenge.kind === "weekly" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            challenge.kind === "streak" && "bg-orange-500/10 text-orange-600 dark:text-orange-400",
            challenge.kind === "community" && "bg-sky-500/10 text-sky-600 dark:text-sky-400"
          )}
        >
          {challenge.kind} challenge
        </span>
        <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
          <Clock size={13} /> {challenge.endsIn}
        </span>
        <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
          <Users size={13} /> {challenge.participants.toLocaleString()} joined
        </span>
        {done && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-500">
            <CheckCircle2 size={13} /> Completed
          </span>
        )}
      </div>

      <h2 className={cn("mt-4 font-black tracking-tight", big ? "text-2xl sm:text-3xl" : "text-xl")}>
        {challenge.title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{challenge.description}</p>

      <div className="mt-4 rounded-xl bg-muted/60 p-4">
        <p className="text-[13px] font-black uppercase tracking-wider text-muted-foreground">
          To complete
        </p>
        <ul className="mt-2.5 space-y-2 text-sm">
          {challenge.requirements.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={15} className={cn("mt-0.5 shrink-0", done ? "text-emerald-500" : "text-muted-foreground")} />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-4 py-2.5 font-black text-amber-600 dark:text-amber-400">
          <Zap size={17} className="fill-amber-500 text-amber-500" /> {challenge.xp} XP
        </span>
        {done ? (
          <span className="flex items-center gap-2 font-bold text-emerald-500">
            <Trophy size={18} /> Reward claimed!
          </span>
        ) : !joined ? (
          <Button variant="primary" onClick={() => setJoined(true)}>
            <Swords size={16} /> Accept challenge
          </Button>
        ) : (
          <Button variant="gradient" onClick={() => completeChallenge(challenge.id, challenge.xp)}>
            <CheckCircle2 size={16} /> Submit & claim {challenge.xp} XP
          </Button>
        )}
        <span className="text-xs font-semibold text-muted-foreground">{challenge.difficulty}</span>
      </div>

      {joined && !done && (
        <div className="mt-4">
          <Progress value={35} barClassName="from-amber-500 to-orange-500" />
          <p className="mt-1.5 text-xs font-semibold text-muted-foreground">
            Challenge accepted! Work through the requirements, then submit.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ChallengesPage() {
  const weekly = challenges.filter((c) => c.kind === "weekly");
  const rest = challenges.filter((c) => c.kind !== "weekly");
  const featured = challenges.find((c) => c.featured) ?? challenges[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Compete & create"
        title="Challenges"
        description="Weekly builds, learning streaks and community contests. Accept a challenge, do the work, claim big XP."
      />

      <ChallengePanel challenge={featured} big />

      <h2 className="mt-10 text-xl font-black">⚡ More weekly challenges</h2>
      <div className="mt-4 space-y-5">
        {weekly
          .filter((c) => c.id !== featured.id)
          .map((c) => (
            <ChallengePanel key={c.id} challenge={c} />
          ))}
      </div>

      <h2 className="mt-10 text-xl font-black">🌍 Streak & community</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {rest.map((c) => (
          <ChallengePanel key={c.id} challenge={c} />
        ))}
      </div>
    </div>
  );
}
