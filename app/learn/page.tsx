"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { subjects } from "@/lib/subjects";
import { getLessonsBySubject } from "@/lib/lessons";
import { getProjectsBySubject } from "@/lib/projects";
import { useEduTech } from "@/lib/store";
import { Badge, Progress, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const { completedLessons } = useEduTech();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Learn"
        title="Explore all subjects"
        description="Nine subjects, one mission: make learning irresistible. Each subject has interactive lessons, hands-on projects and quizzes that earn XP."
      />

      <div className="stagger grid gap-5 md:grid-cols-2">
        {subjects.map((s) => {
          const Icon = s.icon;
          const subjectLessons = getLessonsBySubject(s.id);
          const done = subjectLessons.filter((l) => completedLessons.includes(l.id)).length;
          const pct = subjectLessons.length ? Math.round((done / subjectLessons.length) * 100) : 0;
          const projectCount = getProjectsBySubject(s.id).length;
          return (
            <Link
              key={s.id}
              href={`/learn/${s.id}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", s.gradient)}>
                  <Icon size={26} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl font-black tracking-tight transition group-hover:text-indigo-500">
                      {s.name}
                    </h2>
                    <ArrowRight size={19} className="shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-indigo-500" />
                  </div>
                  <p className="mt-0.5 text-[13px] font-bold text-muted-foreground">{s.tagline}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.longDescription}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.topics.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between text-[13px] font-bold">
                  <span className="text-muted-foreground">
                    {subjectLessons.length} lessons · {projectCount} project{projectCount === 1 ? "" : "s"}
                  </span>
                  {done === subjectLessons.length && subjectLessons.length > 0 ? (
                    <span className="flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 size={15} /> Completed!
                    </span>
                  ) : (
                    <span className="text-indigo-500">
                      {done}/{subjectLessons.length} done
                    </span>
                  )}
                </div>
                <Progress value={pct} className="mt-2.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
