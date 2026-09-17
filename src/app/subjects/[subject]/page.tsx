import type { Metadata } from "next";
import { createElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Layers,
  ListChecks,
  Play,
  Star,
  Target,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DifficultyBadge, SectionHeading, XpChip } from "@/components/shared/primitives";
import { getSubjectIcon } from "@/lib/icons";
import { formatNumber } from "@/lib/utils";
import {
  getSubject,
  projects,
  subjectById,
  subjectCurriculum,
  subjects,
} from "@/data";

export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) return { title: "Subject not found" };
  return {
    title: `${subject.name} for students`,
    description: subject.description,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();

  const curriculum = subjectCurriculum(subject);
  const icon = getSubjectIcon(subject.icon);
  const publishedCount = curriculum.reduce(
    (total, unit) => total + unit.lessons.filter((lesson) => !lesson.comingSoon).length,
    0,
  );
  const totalMinutes = curriculum.reduce(
    (total, unit) => total + unit.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0),
    0,
  );
  const relatedProjects = projects.filter((project) => project.subjectId === subject.id).slice(0, 3);
  const firstLesson = curriculum.flatMap((unit) => unit.lessons).find((lesson) => !lesson.comingSoon);

  return (
    <div className="pb-20">
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border/60"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklab, ${subject.gradient[0]} 16%, var(--background)), color-mix(in oklab, ${subject.gradient[1]} 10%, var(--background)))`,
        }}
      >
        <span className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/subjects" className="transition hover:text-foreground">
              Subjects
            </Link>
            <span>/</span>
            <span className="text-foreground">{subject.name}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-start gap-6">
            <span
              className="grid size-16 place-items-center rounded-3xl text-white shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
              }}
            >
              {createElement(icon, { className: "size-7" })}
            </span>

            <div className="min-w-[260px] flex-1">
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                <span aria-hidden className="mr-2">
                  {subject.emoji}
                </span>
                {subject.name}
              </h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {subject.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3.5" /> {publishedCount} published lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="size-3.5" /> {subject.units.length} units
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {totalMinutes} minutes of content
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="size-3.5 text-amber-500" /> {subject.rating} average rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5" /> {formatNumber(subject.learnerCount)} students
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {firstLesson ? (
                  <Button asChild variant="gradient" className="gap-2">
                    <Link href={`/lessons/${firstLesson.id}`}>
                      <Play className="size-4" /> Start with lesson 1
                    </Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline" className="gap-2">
                  <Link href={`/projects?category=${encodeURIComponent(mapCategory(subject.id))}`}>
                    <Target className="size-4" /> {subject.name} projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {subject.topics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Course structure"
          title={`The ${subject.name} learning path`}
          description="Work through the units in order, or jump straight to the skill you need right now."
        />

        <div className="mt-8 space-y-6">
          {curriculum.map(({ unit, lessons }, unitIndex) => (
            <div
              key={unit.id}
              id={unit.id}
              className="scroll-mt-24 rounded-3xl border border-border/70 bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-xl text-sm font-black text-white"
                    style={{
                      background: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
                    }}
                  >
                    {unitIndex + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{unit.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{unit.description}</p>
                  </div>
                </div>
                <Badge variant="outline">
                  {lessons.length} lesson{lessons.length === 1 ? "" : "s"}
                </Badge>
              </div>

              <ul className="mt-4 divide-y divide-border/60">
                {lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/lessons/${lesson.id}`}
                      className="group flex flex-wrap items-center gap-4 py-3 transition"
                    >
                      <span
                        className={
                          lesson.comingSoon
                            ? "grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-sm text-muted-foreground"
                            : "grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
                        }
                      >
                        {lesson.comingSoon ? "⏳" : <Play className="size-3.5" />}
                      </span>
                      <span className="min-w-[220px] flex-1">
                        <span className="block text-[15px] font-bold group-hover:text-primary">
                          {lesson.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {lesson.summary}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <DifficultyBadge difficulty={lesson.difficulty} />
                        <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                          <Clock className="size-3" /> {lesson.minutes}m
                        </span>
                        {!lesson.comingSoon ? <XpChip xp={lesson.xp} /> : <Badge variant="outline">Soon</Badge>}
                      </span>
                    </Link>
                  </li>
                ))}
                {lessons.length === 0 ? (
                  <li className="py-3 text-sm text-muted-foreground">
                    Lessons for this unit are being written. Check back soon!
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <SectionHeading
            eyebrow="Apply it"
            title={`Things to build with ${subject.name}`}
            action={
              <Button asChild variant="outline">
                <Link href="/projects">
                  All projects <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="card-lift overflow-hidden rounded-3xl border border-border/70 bg-card"
              >
                <div
                  className="flex h-28 items-center justify-center text-4xl"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                  }}
                >
                  <span aria-hidden>{project.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-bold leading-snug">{project.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                    {project.blurb}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <DifficultyBadge difficulty={project.difficulty} />
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <ListChecks className="size-3" /> {project.skills.length} skills
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Other subjects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Explore another subject
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects
            .filter((item) => item.id !== subject.id)
            .map((item) => (
              <Link
                key={item.id}
                href={`/subjects/${item.id}`}
                className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <span aria-hidden>{item.emoji}</span>
                {item.name}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

function mapCategory(subjectId: string) {
  switch (subjectId) {
    case "robotics":
      return "Robotics";
    case "coding":
      return "Coding";
    case "design":
      return "Design";
    case "science":
      return "Science";
    case "math":
      return "Math";
    default:
      return "all";
  }
}

export const dynamicParams = false;

export function generateStaticParamsForSubjects() {
  return Object.keys(subjectById).map((id) => ({ subject: id }));
}
