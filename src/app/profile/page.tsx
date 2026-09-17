import type { Metadata } from "next";
import Link from "next/link";
import { Award, BookOpen, FolderKanban, Pencil, Share2, Sparkles, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/primitives";
import { ProfileBadges, ProfileProjects, ProfileSettings } from "@/components/profile/profile-panels";
import { RecentAchievements } from "@/components/dashboard/dashboard-panels";
import { currentUser, progressStats, studyBuddies } from "@/data";

export const metadata: Metadata = {
  title: "My profile",
  description:
    "Your EduTech profile: level, badges, submitted projects, learning interests and account settings.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
      <header className="relative overflow-hidden rounded-3xl border border-border/70 bg-card">
        <div className="h-32 bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] sm:h-40">
          <span className="block h-full w-full bg-grid opacity-25" aria-hidden />
        </div>

        <div className="px-5 pb-6 sm:px-7">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <span className="grid size-24 place-items-center rounded-3xl border-4 border-card bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-4xl shadow-xl">
                {currentUser.avatarEmoji}
              </span>
              <div className="pb-1">
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                  {currentUser.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {currentUser.grade} · {currentUser.school}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {currentUser.country} · joined {currentUser.joinedAt} · {currentUser.initials}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pb-1">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 className="size-3.5" /> Share profile
              </Button>
              <Button variant="gradient" size="sm" className="gap-1.5">
                <Pencil className="size-3.5" /> Edit profile
              </Button>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {currentUser.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {currentUser.interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <dl className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Badges", value: progressStats.badges.length, emoji: "🏆" },
          { label: "Lessons finished", value: progressStats.completedLessons.length, emoji: "📘" },
          { label: "Projects submitted", value: progressStats.completedProjects.length, emoji: "🚀" },
          { label: "Study buddies", value: studyBuddies.length, emoji: "🤝" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-border/70 bg-card p-4">
            <dt className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span aria-hidden>{item.emoji}</span>
              {item.label}
            </dt>
            <dd className="mt-1.5 text-2xl font-black tracking-tight">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <ProfileProjects />
          <ProfileBadges />
        </div>

        <div className="space-y-6">
          <RecentAchievements />
          <ProfileSettings />
          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Sparkles className="size-4 text-primary" /> Study buddies
            </p>
            <ul className="mt-3 space-y-3">
              {studyBuddies.map((buddy) => (
                <li key={buddy.name} className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-muted text-base">
                    {buddy.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{buddy.name}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {buddy.status}
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 text-[11px] font-bold tabular-nums text-muted-foreground">
                    {buddy.xp.toLocaleString("en-US")} XP
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Keep going"
          title="Your next milestones"
          description="Badges unlock automatically — these are the closest ones to your current progress."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            {
              emoji: "🎨",
              name: "Design Master",
              requirement: "Finish 3 design lessons",
              progress: "2 of 3",
            },
            {
              emoji: "🤖",
              name: "Robot Builder",
              requirement: "Complete a robotics challenge",
              progress: "Submission in review",
            },
            {
              emoji: "🧠",
              name: "Science Explorer",
              requirement: "Finish 3 science lessons",
              progress: "1 of 3",
            },
          ].map((badge) => (
            <div key={badge.name} className="rounded-3xl border border-dashed border-border bg-card/50 p-5">
              <span className="grid size-11 place-items-center rounded-2xl bg-muted text-xl grayscale">
                {badge.emoji}
              </span>
              <p className="mt-3 text-sm font-bold">{badge.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{badge.requirement}</p>
              <Badge variant="outline" className="mt-2.5">
                {badge.progress}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild variant="outline" className="gap-1.5">
            <Link href="/challenges">
              <Trophy className="size-4" /> Join a challenge
            </Link>
          </Button>
          <Button asChild variant="ghost" className="gap-1.5">
            <Link href="/learn">
              <BookOpen className="size-4" /> Find another lesson
            </Link>
          </Button>
          <Button asChild variant="ghost" className="gap-1.5">
            <Link href="/projects">
              <FolderKanban className="size-4" /> Browse projects
            </Link>
          </Button>
          <Button asChild variant="ghost" className="gap-1.5">
            <Link href="/dashboard">
              <Award className="size-4" /> Back to progress
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
