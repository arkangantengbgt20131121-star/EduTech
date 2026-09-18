"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Braces, FileCode2, Globe } from "lucide-react";
import { CodePlayground } from "@/components/code-playground";
import { SectionHeading } from "@/components/ui";

function PlaygroundInner() {
  const params = useSearchParams();
  const langParam = params.get("lang");
  const defaultLang =
    langParam === "python" ? "python" : langParam === "html" ? "html" : "javascript";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Code playground"
        title="Write code. Run it. Instantly."
        description="A real coding environment in your browser — JavaScript runs natively, Python runs on our beginner-friendly runtime, and HTML renders live."
      />

      <CodePlayground key={defaultLang} defaultLang={defaultLang} />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: FileCode2, title: "New to Python?", desc: "Start with variables & print, then loops.", href: "/lessons/c-python-basics", color: "text-emerald-500 bg-emerald-500/10" },
          { icon: Braces, title: "New to JavaScript?", desc: "Make buttons, counters and dark mode.", href: "/lessons/c-javascript", color: "text-amber-500 bg-amber-500/10" },
          { icon: Globe, title: "New to HTML & CSS?", desc: "Build your first web page from zero.", href: "/lessons/c-html-css", color: "text-sky-500 bg-sky-500/10" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.title} href={c.href} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-indigo-500/40">
              <span className={`inline-flex rounded-xl p-2.5 ${c.color}`}>
                <Icon size={20} />
              </span>
              <h3 className="mt-3 font-black group-hover:text-indigo-500">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <span className="mt-3 flex items-center gap-1 text-sm font-bold text-indigo-500">
                Start lesson <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-24 text-center font-bold">Loading playground…</div>}>
      <PlaygroundInner />
    </Suspense>
  );
}
