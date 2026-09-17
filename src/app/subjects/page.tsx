import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Layers, Sparkles, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/primitives";
import { getSubjectIcon } from "@/lib/icons";
import { formatNumber } from "@/lib/utils";
import { publishedLessonsBySubject, subjectStats, subjects } from "@/data";

export const metadata: Metadata = {
  title: "All subjects",
  description:
    "Ten learning categories: robotics, coding, design, history, mathematics, science, English, Bahasa Indonesia, geography and general knowledge.",
};

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
      <SectionHeading
        eyebrow="Subjects"
        title="Every subject, with its own learning path"
        description="Each subject is built from units — small, ordered groups of lessons. Start at unit one or jump to the topic you need."
        action={
          <Button asChild variant="outline">
            <Link href="/learn">
              Browse all lessons <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {subjectStats.map((subject) => {
          const Icon = getSubjectIcon(subject.icon);
          const lessons = publishedLessonsBySubject(subject.id);
          const minutes = lessons.reduce((total, lesson) => total + lesson.minutes, 0);

          return (
            <article
              key={subject.id}
              className="card-lift flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card"
            >
              <div
                className="relative p-5"
                style={{
                  background: `linear-gradient(135deg, color-mix(in oklab, ${subject.gradient[0]} 18%, var(--card)), color-mix(in oklab, ${subject.gradient[1]} 12%, var(--card)))`,
                }}
              >
                <span className="absolute inset-0 bg-grid opacity-30" aria-hidden />
                <div className="relative flex items-start justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-2xl text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
                    }}
                  >
                    <Icon className="size-5.5" />
                  </span>
                  <div className="text-right">
                    <Badge variant="default" className="bg-card/80">
                      {subject.published} live lessons
                    </Badge>
                    <p className="mt-1.5 flex items-center justify-end gap-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="size-3 text-amber-500" /> {subject.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3" /> {formatNumber(subject.learnerCount)}
                      </span>
                    </p>
                  </div>
                </div>
                <h2 className="relative mt-4 text-xl font-black tracking-tight">
                  <span aria-hidden className="mr-1.5">
                    {subject.emoji}
                  </span>
                  {subject.name}
                </h2>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {subject.tagline}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-5 pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {subject.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {subject.units.map((unit) => (
                    <li key={unit.id} className="flex items-center gap-2 text-sm">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                        {lessons.filter((lesson) => lesson.unitId === unit.id).length || "·"}
                      </span>
                      <Link
                        href={`/subjects/${subject.id}#${unit.id}`}
                        className="truncate text-muted-foreground transition hover:text-foreground"
                      >
                        {unit.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="size-3" /> {subject.total} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="size-3" /> {subject.units.length} units
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {minutes} min
                    </span>
                  </div>
                  <Button asChild variant="gradient" size="sm" className="mt-4 w-full gap-1.5">
                    <Link href={`/subjects/${subject.id}`}>
                      Start {subject.name} <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-14 rounded-3xl border border-border/70 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--brand-indigo)_10%,var(--card)),var(--card))] p-6 text-center sm:p-10">
        <Sparkles className="mx-auto size-6 text-primary" />
        <h2 className="mt-3 text-2xl font-black tracking-tight">
          Not sure where to begin?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Try the guided starting path: Micro:bit LED basics → Python loops → Figma frames. It takes
          about an hour and touches robotics, coding and design.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gradient">
            <Link href="/lessons/microbit-led-basics">Start with Micro:bit LEDs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">See my progress</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {subjects.length} subjects · {subjectStats.reduce((total, subject) => total + subject.total, 0)}{" "}
          lessons in the catalog
        </p>
      </section>
    </div>
  );
}
