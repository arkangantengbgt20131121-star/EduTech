"use client";

import { Crown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/components/progress/progress-provider";
import { formatNumber } from "@/lib/utils";
import { leaderboard as seedLeaderboard } from "@/data/challenges";

export function LeaderboardCard() {
  const { stats } = useProgress();

  // Merge the student's live XP into the demo leaderboard so their position changes.
  const rows = seedLeaderboard
    .map((entry) => (entry.isCurrentUser ? { ...entry, xp: stats.xp, streak: stats.streak } : entry))
    .sort((a, b) => b.xp - a.xp)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold">
          <Crown className="size-4 text-[#f59e0b]" /> Leaderboard
        </p>
        <Badge variant="outline">Top 10</Badge>
      </div>

      <ol className="mt-3 space-y-1.5">
        {rows.slice(0, 8).map((entry) => (
          <li
            key={entry.name}
            className={
              entry.isCurrentUser
                ? "flex items-center gap-3 rounded-xl bg-primary/10 px-2.5 py-2 text-sm font-bold text-primary"
                : "flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm"
            }
          >
            <span className="w-6 shrink-0 text-center text-xs font-black tabular-nums">
              {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : entry.rank}
            </span>
            <span className="text-base" aria-hidden>
              {entry.avatarEmoji}
            </span>
            <span className="min-w-0 flex-1 truncate">
              {entry.name}
              {entry.isCurrentUser ? " (you)" : ""}
            </span>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
              {formatNumber(entry.xp)}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Your XP updates live as you complete lessons and challenges.
      </p>
    </div>
  );
}
