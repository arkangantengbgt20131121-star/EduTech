import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/primitives";
import { PlaygroundWorkspace } from "@/components/coding/playground-workspace";

export const metadata: Metadata = {
  title: "Coding playground",
  description:
    "Write and run real Python, JavaScript and HTML/CSS in your browser. Includes starter examples, error explanations and a live preview.",
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
      <SectionHeading
        eyebrow="Coding laboratory"
        title="Write code. Run it. Break it. Fix it."
        description="This is a real playground, not a simulation of one: Python runs in a safe interpreter built for learning, and HTML/CSS/JS renders in a sandboxed preview."
        action={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/microbit">
                <Cpu className="size-4" /> Micro:bit simulator
              </Link>
            </Button>
            <Button asChild variant="gradient">
              <Link href="/subjects/coding">
                <Code2 className="size-4" /> Coding lessons
              </Link>
            </Button>
          </div>
        }
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary">🐍 Python 3 subset</Badge>
        <Badge variant="secondary">⚡ JavaScript</Badge>
        <Badge variant="secondary">🎨 HTML · CSS · JS</Badge>
        <Badge variant="outline">
          <Lightbulb className="size-3.5" /> Friendly error messages
        </Badge>
      </div>

      <div className="mt-8">
        <PlaygroundWorkspace />
      </div>

      <section className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="text-sm font-bold">What runs here?</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>✅ Variables, numbers, strings, f-strings</li>
            <li>✅ Conditions, loops, functions</li>
            <li>✅ Lists, dictionaries, input()</li>
            <li>✅ HTML, CSS and JavaScript with live preview</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="text-sm font-bold">What does not (yet)?</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>⏳ Files, modules and pip packages</li>
            <li>⏳ Classes and object-oriented Python</li>
            <li>⏳ Third-party libraries like NumPy</li>
            <li>⏳ Multi-file projects</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border/70 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--brand-indigo)_12%,var(--card)),var(--card))] p-5">
          <p className="text-sm font-bold">Stuck? Start from a lesson</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Every coding lesson embeds the same playground with its own starter code, so you can
            follow along and experiment in the same place.
          </p>
          <Button asChild size="sm" variant="outline" className="mt-3 w-full gap-1.5">
            <Link href="/lessons/python-first-program">
              Open “Python: Your First Program” <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
