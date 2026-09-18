"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  PartyPopper,
  Star,
  Trophy,
  Wrench,
  Zap,
} from "lucide-react";
import { getSubject } from "@/lib/subjects";
import { getProject, projects } from "@/lib/projects";
import { useEduTech } from "@/lib/store";
import { Badge, Button, LevelDots, Progress } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { cn } from "@/lib/utils";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const project = getProject(projectId);
  const [checked, setChecked] = useState<boolean[]>([]);
  const { completeProject, isProjectDone } = useEduTech();

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-black">Project not found 😢</h1>
        <Link href="/projects">
          <Button className="mt-6" variant="primary">
            <ArrowLeft size={16} /> All projects
          </Button>
        </Link>
      </div>
    );
  }

  const subject = getSubject(project.subjectId);
  const Icon = subject?.icon ?? Wrench;
  const done = isProjectDone(project.id);
  const doneSteps = checked.filter(Boolean).length;
  const stepPct = Math.round((doneSteps / project.steps.length) * 100);
  const related = projects.filter((p) => p.id !== project.id && p.subjectId === project.subjectId).slice(0, 2);

  return (
    <div>
      <div className={cn("relative overflow-hidden bg-gradient-to-br", subject?.gradient ?? "from-indigo-500 to-violet-600")}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/85 hover:text-white">
            <ArrowLeft size={16} /> All projects
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur">
              <Icon size={32} />
            </div>
            <div>
              <Badge variant="solid">{project.category}</Badge>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{project.title}</h1>
            </div>
          </div>
          <p className="mt-3 max-w-3xl leading-relaxed text-white/90">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-[13px] font-bold text-white">
            <span className="flex items-center gap-1.5 rounded-full bg-black/25 px-3.5 py-1.5">
              <Clock size={14} /> {project.duration}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-black/25 px-3.5 py-1.5">
              <Zap size={14} /> {project.xp} XP
            </span>
            <span className="rounded-full bg-black/25 px-3.5 py-1.5">{project.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black">Build steps</h2>
                <span className="text-sm font-bold text-indigo-500">
                  {doneSteps}/{project.steps.length} · {stepPct}%
                </span>
              </div>
              <Progress value={stepPct} className="mt-2.5" />
              <div className="mt-4 space-y-3">
                {project.steps.map((s, i) => {
                  const isChecked = checked[i] ?? false;
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        setChecked((prev) => {
                          const n = [...prev];
                          n[i] = !n[i];
                          return n;
                        })
                      }
                      className={cn(
                        "flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition sm:p-5",
                        isChecked ? "border-emerald-500/50 bg-emerald-500/5" : "border-border bg-card hover:border-indigo-400"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black",
                          isChecked ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isChecked ? <CheckCircle2 size={17} /> : i + 1}
                      </span>
                      <span>
                        <span className="block font-black">{s.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{s.detail}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 font-black">
                <Star size={18} className="text-amber-500" /> What you&apos;ll walk away with
              </h2>
              <ul className="mt-3 space-y-2 text-[15px] text-muted-foreground">
                {project.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-500" /> {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-6 text-center sm:p-8">
              {done ? (
                <>
                  <PartyPopper className="mx-auto text-indigo-500" size={36} />
                  <h2 className="mt-3 text-2xl font-black">Project shipped! 🚀</h2>
                  <p className="mt-2 text-muted-foreground">You earned {project.xp} XP. Add it to your portfolio!</p>
                </>
              ) : (
                <>
                  <Trophy className="mx-auto text-amber-500" size={36} />
                  <h2 className="mt-3 text-2xl font-black">Finished building?</h2>
                  <p className="mt-2 text-muted-foreground">
                    Tick the steps above, then claim your {project.xp} XP reward.
                  </p>
                  <Button size="lg" variant="gradient" className="mt-5" onClick={() => completeProject(project.id, project.xp)}>
                    <CheckCircle2 size={18} /> Mark as Built · +{project.xp} XP
                  </Button>
                </>
              )}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-black">Details</h3>
              <div className="mt-3">
                <LevelDots level={project.difficulty} />
              </div>
              <h3 className="mt-5 font-black">Tools you&apos;ll use</h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {project.tools.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
              <h3 className="mt-5 font-black">Subject</h3>
              <Link
                href={subject ? `/learn/${subject.id}` : "/learn"}
                className="mt-2 flex items-center justify-between rounded-xl bg-muted/60 p-3 text-sm font-bold hover:bg-muted"
              >
                {subject?.name}
                <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-black tracking-tight">Keep building</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
