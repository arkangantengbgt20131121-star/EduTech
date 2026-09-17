import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Layers, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DifficultyBadge, SectionHeading, XpChip } from "@/components/shared/primitives";
import { ContinueLearning } from "@/components/learn/continue-learning";
import { getSubjectIcon } from "@/lib/icons";
import { formatNumber } from "@/lib/utils";
import {
  courseProgress,
  getLesson,
  publishedLessons,
  subjects,
  subjectStats,
} from "@/data";
import { getUnit } from "@/data/subjects";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Browse every EduTech course by subject: robotics, coding, design, history, maths, science, languages, geography and general knowledge.",
};

const tracks = [
  { id: "Beginner", label: "Beginner friendly", emoji: "🌱" },
  { id: "Intermediate", label: "Intermediate", emoji: "🚀" },
  { id: "Advanced", label: "Advanced", emoji: "🔥" },
] as const;

export default function LearnPage() {
  const continueItems = courseProgress
    .map((course) => ({ course, lesson: getLesson(course.lessonId) }))
    .filter((item) => Boolean(item.lesson))
    .slice(0, 3);

  const newest = [...publishedLessons].reverse().slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
      <SectionHeading
        eyebrow="Learning hub"
        title="Everything you can learn on EduTech"
        description="Ten subjects, each organised into units and short lessons. Pick a track below or continue where you stopped last time."
        action={
          <Button asChild variant="gradient">
            <Link href="/playground">
              <Sparkles className="size-4" /> Open the playground
            </Link>
          </Button>
        }
      />

      {/* Continue learning */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
            <Flame className="size-4.5 text-[#f97316]" /> Continue learning
          </h2>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View dashboard <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ContinueLearning items={continueItems} />
      </section>

      {/* Difficulty tracks */}
      <section className="mt-12">
        <div className="flex flex-wrap items-center gap-2">
          {tracks.map((track) => (
            <Badge key={track.id} variant="secondary" className="px-3 py-1.5 text-xs">
              {track.emoji} {track.label}
            </Badge>
          ))}
          <span className="text-xs text-muted-foreground">
            Every lesson is labelled so you always know what you are signing up for.
          </span>
        </div>
      </section>

      {/* Subjects */}
      <section className="mt-8 space-y-4">
        {subjectStats.map((subject) => {
          const Icon = getSubjectIcon(subject.icon);
          return (
            <div
              key={subject.id}
              className="card-lift rounded-3xl border border-border/70 bg-card p-5"
            >
              <div className="flex flex-wrap items-start gap-4">
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
                  }}
                >
                  <Icon className="size-5.5" />
                </span>

                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black tracking-tight">{subject.name}</h3>
                    <Badge variant="outline">{subject.published} lessons live</Badge>
                    <Badge variant="secondary">
                      <Layers className="size-3" /> {subject.units.length} units
                    </Badge>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {subject.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {subject.topics.slice(0, 6).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-stretch gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/subjects/${subject.id}`}>Open subject</Link>
                  </Button>
                  <span className="text-center text-[11px] text-muted-foreground">
                    ⭐ {subject.rating} · {formatNumber(subject.learnerCount)} students
                  </span>
                </div>
              </div>

              {/* Units preview */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {subject.units.map((unit) => (
                  <Link
                    key={unit.id}
                    href={`/subjects/${subject.id}#${unit.id}`}
                    className="rounded-2xl border border-border/60 bg-muted/25 p-3 transition hover:border-primary/40"
                  >
                    <p className="text-xs font-bold">{unit.title}</p>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                      {unit.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Newest lessons */}
      <section className="mt-14">
        <SectionHeading
          eyebrow="Fresh content"
          title="Recently added lessons"
          description="New lessons, projects and challenges are published every week."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newest.map((lesson) => {
            const subject = subjects.find((item) => item.id === lesson.subjectId);
            const unit = getUnit(lesson.subjectId, lesson.unitId);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="card-lift flex flex-col rounded-3xl border border-border/70 bg-card p-5"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {subject?.emoji} {subject?.name}
                  </Badge>
                  <Badge variant="outline">{unit?.title}</Badge>
                </div>
                <h3 className="mt-3 text-base font-bold leading-snug">{lesson.title}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {lesson.summary}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <DifficultyBadge difficulty={lesson.difficulty} />
                  <span className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {lesson.minutes}m
                    </span>
                    <XpChip xp={lesson.xp} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
