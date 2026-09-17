"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

const floatingCards = [
  {
    emoji: "🤖",
    title: "Micro:bit",
    subtitle: "LED matrix + sensors",
    className: "left-0 top-6 animate-float",
    accent: "linear-gradient(135deg,#fb923c,#f59e0b)",
  },
  {
    emoji: "💻",
    title: "Python",
    subtitle: "for line in scores:",
    className: "right-2 top-0 animate-float-slow",
    accent: "linear-gradient(135deg,#6366f1,#22d3ee)",
  },
  {
    emoji: "🎨",
    title: "Figma",
    subtitle: "Auto layout · 12 px gap",
    className: "left-4 bottom-24 animate-float-delayed",
    accent: "linear-gradient(135deg,#ec4899,#8b5cf6)",
  },
  {
    emoji: "➗",
    title: "Maths",
    subtitle: "3/4 > 5/8",
    className: "right-6 bottom-16 animate-float",
    accent: "linear-gradient(135deg,#0ea5e9,#6366f1)",
  },
  {
    emoji: "🏛️",
    title: "History",
    subtitle: "17 August 1945",
    className: "left-1/2 top-1/2 animate-float-slow",
    accent: "linear-gradient(135deg,#f59e0b,#ef4444)",
  },
  {
    emoji: "🔬",
    title: "Science",
    subtitle: "F = m × a",
    className: "right-1/4 bottom-2 animate-float-delayed",
    accent: "linear-gradient(135deg,#10b981,#22d3ee)",
  },
];

const stats = [
  { icon: Users, value: 148000, label: "students learning" },
  { icon: Sparkles, value: 96, label: "interactive lessons" },
  { icon: Star, value: 4.8, label: "average rating", suffix: "/5" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" aria-hidden />
        <div
          className="absolute -left-24 top-10 size-[26rem] rounded-full opacity-25 blur-[110px] animate-pulse-glow"
          style={{ background: "var(--brand-indigo)" }}
          aria-hidden
        />
        <div
          className="absolute right-0 top-32 size-[22rem] rounded-full opacity-20 blur-[120px] animate-pulse-glow"
          style={{ background: "var(--brand-cyan)", animationDelay: "1.2s" }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-1/3 size-[20rem] rounded-full opacity-20 blur-[120px]"
          style={{ background: "var(--brand-pink)" }}
          aria-hidden
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-24 lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1.5 text-xs font-bold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            New: Micro:bit simulator & Python playground
          </span>

          <h1 className="mt-5 text-[2.6rem] font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]">
            Learn. Create.
            <br />
            <span className="text-gradient">Build the Future.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Explore robotics, coding, design, science, mathematics, history and more through
            interactive lessons and real-world projects. Write real Python, program a virtual
            Micro:bit and design in a studio that runs in your browser.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="xl" variant="gradient" className="group">
              <Link href="/learn">
                Start Learning
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/projects">
                <Play className="size-4" />
                Explore Projects
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <stat.icon className="size-3.5 text-primary" />
                  {stat.label}
                </dt>
                <dd className="mt-1 text-xl font-black tracking-tight">
                  <AnimatedStat value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual collage */}
        <div className="relative isolate">
          <div className="relative mx-auto aspect-square w-full max-w-[520px] perspective-card">
            {/* Main panel: code editor + microbit */}
            <div className="absolute inset-6 rounded-[32px] border border-border/70 bg-card/80 p-4 shadow-[0_40px_80px_-40px_rgba(79,70,229,0.45)] backdrop-blur-xl">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  led_heart.py
                </span>
              </div>
              <pre className="mt-3 overflow-hidden rounded-2xl bg-slate-950 p-3.5 font-mono text-[11px] leading-relaxed text-slate-200">
                <code>{`for frame in ["♥", "♡", "♥"]:
    display.show(frame)
    sleep(400)

# 3 frames · 25 LEDs · 1 idea`}</code>
              </pre>

              <div className="mt-3 grid grid-cols-5 gap-1.5 rounded-2xl bg-slate-950/80 p-3">
                {[
                  0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0,
                ].map((on, index) => (
                  <span
                    key={index}
                    className={`aspect-square rounded-[3px] ${on ? "led-on" : "led-off"}`}
                    style={{ animationDelay: `${index * 40}ms` }}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between rounded-2xl bg-primary/8 px-3 py-2">
                <span className="text-[11px] font-bold text-primary">Level 3 · Creator</span>
                <span className="text-[11px] font-bold text-muted-foreground">2,870 XP 🔥</span>
              </div>
            </div>

            {/* Floating subject cards */}
            {floatingCards.map((card) => (
              <div
                key={card.title}
                className={`absolute ${card.className} hidden w-[9.5rem] rounded-2xl border border-border/70 bg-card/85 p-3 shadow-xl backdrop-blur-md sm:block`}
              >
                <span
                  className="grid size-8 place-items-center rounded-xl text-base"
                  style={{ background: card.accent }}
                >
                  {card.emoji}
                </span>
                <p className="mt-2 text-xs font-bold leading-tight">{card.title}</p>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  if (value >= 1000) {
    return (
      <>
        {formatNumber(Math.round(display))}
        {suffix}
      </>
    );
  }
  if (Number.isInteger(value)) {
    return (
      <>
        {Math.round(display).toLocaleString("en-US")}
        {suffix}
      </>
    );
  }
  return (
    <>
      {display.toFixed(1)}
      {suffix}
    </>
  );
}
