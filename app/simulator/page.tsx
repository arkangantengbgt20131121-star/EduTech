"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MicrobitSimulator } from "@/components/microbit-simulator";
import { SectionHeading } from "@/components/ui";

export default function SimulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Interactive hardware lab"
        title="Micro:bit simulator"
        description="A virtual BBC micro:bit with clickable LEDs, buttons, shake sensor and thermometer. Everything here works on a real device too."
      />

      <MicrobitSimulator />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Start: Blinking Heart", desc: "Your first micro:bit program in 20 minutes.", href: "/lessons/r-microbit-hello" },
          { title: "Next: Buttons & Sensors", desc: "React to presses, shakes and temperature.", href: "/lessons/r-buttons-sensors" },
          { title: "Project: Reaction Game", desc: "Build the 2-player battle from the weekly challenge.", href: "/projects/p-reaction-game" },
        ].map((c, i) => (
          <Link key={c.title} href={c.href} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-cyan-500/40">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-500">Step {i + 1}</span>
            <h3 className="mt-2 font-black group-hover:text-cyan-500">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            <span className="mt-3 flex items-center gap-1 text-sm font-bold text-cyan-600 dark:text-cyan-400">
              Open <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
