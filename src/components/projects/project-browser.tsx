"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, Search, Sparkles, Users, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chip, DifficultyBadge, EmptyState, XpChip } from "@/components/shared/primitives";
import { cn, formatNumber } from "@/lib/utils";
import type { Project } from "@/data/types";

const difficulties = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;

export function ProjectBrowser({
  projects,
  categories,
  initialCategory = "all",
}: {
  projects: Project[];
  categories: { id: string; label: string; emoji: string }[];
  initialCategory?: string;
}) {
  const [category, setCategory] = React.useState(initialCategory);
  const [difficulty, setDifficulty] = React.useState<(typeof difficulties)[number]>("All levels");
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<"popular" | "quickest" | "xp">("popular");

  const filtered = React.useMemo(() => {
    const search = query.trim().toLowerCase();
    const result = projects.filter((project) => {
      const matchesCategory = category === "all" || project.category === category;
      const matchesDifficulty =
        difficulty === "All levels" || project.difficulty === difficulty;
      const matchesQuery =
        search.length === 0 ||
        project.title.toLowerCase().includes(search) ||
        project.blurb.toLowerCase().includes(search) ||
        project.skills.some((skill) => skill.toLowerCase().includes(search));
      return matchesCategory && matchesDifficulty && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sort === "quickest") return a.minutes - b.minutes;
      if (sort === "xp") return b.xp - a.xp;
      return b.learners - a.learners;
    });
  }, [category, difficulty, projects, query, sort]);

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((item) => (
            <Chip
              key={item.id}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              <span aria-hidden>{item.emoji}</span>
              {item.label}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, skills or tools…"
              className="pl-9"
              aria-label="Search projects"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5">
            {difficulties.map((level) => (
              <Chip
                key={level}
                active={difficulty === level}
                onClick={() => setDifficulty(level)}
                className="text-xs"
              >
                {level}
              </Chip>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as typeof sort)}
              className="rounded-lg border border-border bg-card px-2 py-1.5 text-xs font-semibold text-foreground"
            >
              <option value="popular">Most popular</option>
              <option value="quickest">Quickest first</option>
              <option value="xp">Most XP</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing <span className="font-bold text-foreground">{filtered.length}</span> of{" "}
        {projects.length} projects
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-6"
          emoji="🧪"
          title="No projects match those filters"
          description="Try a different category, or clear the search box to see everything again."
          action="Reset filters"
          actionHref="/projects"
        />
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="card-lift group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card"
            >
              <Link href={`/projects/${project.id}`} className="flex flex-1 flex-col">
                <div
                  className="relative flex h-36 items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                  }}
                >
                  <span className="absolute inset-0 bg-grid opacity-20" aria-hidden />
                  <span className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110" aria-hidden>
                    {project.emoji}
                  </span>
                  <Badge className="absolute left-3 top-3 border-0 bg-white/85 text-slate-900">
                    {project.category}
                  </Badge>
                  <Badge className="absolute right-3 top-3 border-0 bg-slate-900/70 text-white backdrop-blur">
                    +{project.xp} XP
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold leading-snug group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.blurb}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        +{project.skills.length - 3}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <DifficultyBadge difficulty={project.difficulty} />
                      <span className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" /> {project.minutes} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="size-3" /> {formatNumber(project.learners)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="p-5 pt-0">
                <Button asChild variant="gradient" size="sm" className="w-full gap-1.5">
                  <Link href={`/projects/${project.id}`}>
                    <Sparkles className="size-3.5" /> Start Project
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className={cn("mt-10 rounded-3xl border border-dashed border-border bg-card/50 p-6 text-center")}>
        <p className="text-sm font-bold">Finished a project?</p>
        <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground">
          Submit it to the community gallery from your profile page and earn the matching badge.
          Teachers can also review submissions.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/profile">Submit a project</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/challenges">
              <Sparkles className="size-3.5" /> Try a challenge instead
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProjectMiniCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex items-center gap-3 rounded-2xl border border-border/70 p-3 transition hover:border-primary/40"
    >
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl text-lg"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        {project.emoji}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold">{project.title}</span>
        <span className="text-[11px] text-muted-foreground">
          {project.category} · {project.minutes} min
        </span>
      </span>
      <XpChip xp={project.xp} className="ml-auto shrink-0" />
    </Link>
  );
}
