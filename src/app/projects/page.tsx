import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ListChecks, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/primitives";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { formatNumber } from "@/lib/utils";
import { projectCategories, projects } from "@/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Guided builds in robotics, coding, design, science and maths — each with skills, materials and step-by-step instructions.",
};

export default function ProjectsPage() {
  const totalMinutes = projects.reduce((total, project) => total + project.minutes, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
      <SectionHeading
        eyebrow="Project gallery"
        title="Build something real"
        description="Twelve guided projects across five categories. Each one lists the skills you will practise, what you need and roughly how long it takes."
        action={
          <Button asChild variant="outline">
            <Link href="/challenges">
              <Sparkles className="size-4" /> Browse challenges
            </Link>
          </Button>
        }
      />

      <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-semibold">
          <ListChecks className="size-3.5" /> {projects.length} projects
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-semibold">
          <Clock className="size-3.5" /> {Math.round(totalMinutes / 60)} hours of building
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-semibold">
          <Users className="size-3.5" />{" "}
          {formatNumber(projects.reduce((total, project) => total + project.learners, 0))} builders
        </span>
      </div>

      <ProjectBrowser
        projects={projects}
        categories={projectCategories.map((category) => ({ ...category }))}
      />
    </div>
  );
}
