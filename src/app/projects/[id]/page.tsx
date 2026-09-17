import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ClipboardList,
  Package,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DifficultyBadge, SectionHeading, XpChip } from "@/components/shared/primitives";
import { ProjectSubmitDialog } from "@/components/projects/project-submit-dialog";
import { formatNumber } from "@/lib/utils";
import { getProject, getSubject, projects } from "@/data";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.blurb };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const subject = getSubject(project.subjectId);
  const related = projects
    .filter((item) => item.id !== project.id && item.category === project.category)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/projects" className="transition hover:text-foreground">
          Projects
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{project.title}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article>
          <div
            className="relative flex h-44 items-center justify-center overflow-hidden rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
            }}
          >
            <span className="absolute inset-0 bg-grid opacity-20" aria-hidden />
            <span className="text-6xl drop-shadow-lg" aria-hidden>
              {project.emoji}
            </span>
            <Badge className="absolute left-4 top-4 border-0 bg-white/85 text-slate-900">
              {project.category}
            </Badge>
          </div>

          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={project.difficulty} />
              <Badge variant="outline">
                <Clock className="size-3.5" /> {project.minutes} minutes
              </Badge>
              <XpChip xp={project.xp} />
              <Badge variant="secondary">
                <Users className="size-3.5" /> {formatNumber(project.learners)} students built this
              </Badge>
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {project.blurb}
            </p>
          </header>

          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-black tracking-tight">
              <ClipboardList className="size-5 text-primary" /> Step-by-step build
            </h2>
            <ol className="mt-4 space-y-3">
              {project.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-card p-4"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-bold">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {related.length > 0 ? (
            <section className="mt-10">
              <SectionHeading
                eyebrow="Keep building"
                title={`More ${project.category} projects`}
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/projects/${item.id}`}
                    className="card-lift rounded-2xl border border-border/70 bg-card p-4"
                  >
                    <span className="text-2xl" aria-hidden>
                      {item.emoji}
                    </span>
                    <p className="mt-2 text-sm font-bold leading-snug">{item.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.minutes} min</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <CheckCircle2 className="size-4 text-primary" /> Requirements
            </p>
            <ul className="mt-3 space-y-2">
              {(project.requirements ?? []).map((requirement) => (
                <li key={requirement} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {requirement}
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-border/60 pt-4">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Package className="size-4 text-primary" /> What you need
              </p>
              <ul className="mt-3 space-y-2">
                {project.materials.map((material) => (
                  <li key={material} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 border-t border-border/60 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Skills you will practise
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <ProjectSubmitDialog projectTitle={project.title} xp={project.xp} />

            {subject ? (
              <Button asChild variant="ghost" size="sm" className="mt-2 w-full gap-1.5">
                <Link href={`/subjects/${subject.id}`}>
                  <ArrowLeft className="size-3.5" /> More {subject.name} lessons
                </Link>
              </Button>
            ) : null}
          </div>

          <div className="rounded-3xl border border-border/70 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--brand-indigo)_12%,var(--card)),var(--card))] p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Sparkles className="size-4 text-primary" /> Turn it into a challenge entry
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Many projects count towards a weekly challenge. Finish this build, then submit it for
              extra XP and a badge.
            </p>
            <Button asChild variant="gradient" size="sm" className="mt-3 w-full gap-1.5">
              <Link href="/challenges">
                See open challenges <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
