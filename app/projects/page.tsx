"use client";

import { useMemo, useState } from "react";
import { getSubject } from "@/lib/subjects";
import { projects } from "@/lib/projects";
import type { LessonLevel } from "@/lib/types";
import { useEduTech } from "@/lib/store";
import { SectionHeading } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { cn } from "@/lib/utils";

const difficulties: ("All" | LessonLevel)[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function ProjectsPage() {
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");
  const [subject, setSubject] = useState("All");
  const { completedProjects } = useEduTech();

  const subjectIds = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.subjectId)))],
    []
  );

  const filtered = projects.filter((p) => {
    if (difficulty !== "All" && p.difficulty !== difficulty) return false;
    if (subject !== "All" && p.subjectId !== subject) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow={`${completedProjects.length}/${projects.length} built`}
        title="Build real projects"
        description="Lessons teach you skills — projects prove them. Every build earns big XP and becomes portfolio work you can show off."
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[13px] font-bold transition",
                difficulty === d ? "bg-background shadow" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {subjectIds.map((id) => (
            <button
              key={id}
              onClick={() => setSubject(id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition",
                subject === id
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : "border-input hover:border-indigo-400 hover:text-indigo-500"
              )}
            >
              {id === "All" ? "All subjects" : getSubject(id)?.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
