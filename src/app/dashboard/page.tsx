import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Rocket, Sparkles, Target, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DifficultyBadge, SectionHeading, XpChip } from "@/components/shared/primitives";
import {
  BadgeShelf,
  ContinueLearningList,
  DashboardHeader,
  LevelCard,
  StatGrid,
  StudyGoals,
  SubjectBreakdown,
  WeeklyChart,
} from "@/components/dashboard/dashboard-panels";
import { getSubject, recommendedLessons as resolveRecommended } from "@/data";
import { recommendedLessonIds } from "@/data/user";

export const metadata: Metadata = {
  title: "My progress",
  description:
    "Your EduTech dashboard: level, XP, streak, completed lessons, current courses, achievements and recommended next lessons.",
};

export default function DashboardPage() {
  const recommended = resolveRecommended(recommendedLessonIds).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
      <DashboardHeader />

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <StatGrid />
          <ContinueLearningList />
          <WeeklyChart />
        </div>

        <div className="space-y-5">
          <LevelCard />
          <StudyGoals />
          <SubjectBreakdown />
        </div>
      </div>

      <section className="mt-12" id="badges">
        <SectionHeading
          eyebrow="Achievements"
          title="Badges you have earned — and the ones still waiting"
          description="Badges unlock automatically as you complete lessons, keep streaks and submit projects."
        />
        <BadgeShelf />
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Recommended for you"
          title="What to learn next"
          description="Based on your recent lessons and the subjects you have started."
          action={
            <Button asChild variant="outline">
              <Link href="/learn">
                Browse everything <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((lesson) => {
            const subject = getSubject(lesson.subjectId);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="card-lift flex flex-col rounded-3xl border border-border/70 bg-card p-5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="grid size-9 place-items-center rounded-xl text-white"
                    style={{
                      background: subject
                        ? `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`
                        : "var(--primary)",
                    }}
                  >
                    <BookOpen className="size-4" />
                  </span>
                  <Badge variant="secondary">{subject?.name}</Badge>
                </div>
                <h3 className="mt-3 text-[15px] font-bold leading-snug">{lesson.title}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {lesson.summary}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <DifficultyBadge difficulty={lesson.difficulty} />
                  <XpChip xp={lesson.xp} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Target className="size-4 text-primary" /> Keep your streak alive
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Fifteen minutes a day beats three hours on Sunday. Short sessions are how habits form —
            and habits are how skills form.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <TrendingUp className="size-4 text-primary" /> Your best subject
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Coding is leading at the moment. Consider pushing into algorithms — you already have the
            fundamentals.
          </p>
          <Button asChild size="sm" variant="outline" className="mt-3 w-full">
            <Link href="/subjects/coding">Explore coding</Link>
          </Button>
        </div>
        <div className="rounded-3xl border border-border/70 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--brand-indigo)_12%,var(--card)),var(--card))] p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Rocket className="size-4 text-primary" /> Project idea
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            You finished the Micro:bit LEDs and buttons lessons — a digital dice is the perfect next
            build.
          </p>
          <Button asChild size="sm" variant="gradient" className="mt-3 w-full">
            <Link href="/projects/digital-dice-microbit">
              <Sparkles className="size-3.5" /> Open the dice project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
