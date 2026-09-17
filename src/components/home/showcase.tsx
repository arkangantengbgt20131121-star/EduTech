"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Palette, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodingPlayground } from "@/components/coding/coding-playground";
import { MicrobitSimulator } from "@/components/microbit/microbit-simulator";
import { DesignCanvas } from "@/components/widgets/design-canvas";
import { FractionLab } from "@/components/widgets/fraction-lab";

const tabs = [
  {
    id: "code",
    label: "Coding",
    icon: Code2,
    emoji: "💻",
    title: "A real Python playground",
    body: "Students write real code and see real output — with friendly error messages that explain what went wrong and how to fix it.",
    href: "/playground",
    linkLabel: "Open the playground",
  },
  {
    id: "microbit",
    label: "Micro:bit",
    icon: Cpu,
    emoji: "🤖",
    title: "Program a virtual Micro:bit",
    body: "The simulator runs the same programs as a physical board: LED matrix, buttons, shake, light and temperature sensors, plus an event log.",
    href: "/microbit",
    linkLabel: "Open the simulator",
  },
  {
    id: "design",
    label: "Design",
    icon: Palette,
    emoji: "🎨",
    title: "A design studio in the browser",
    body: "Add shapes, drag them around and edit fill, radius and size — the same mental model as Figma, without the install.",
    href: "/subjects/design",
    linkLabel: "Explore design lessons",
  },
  {
    id: "math",
    label: "Maths",
    icon: Sparkles,
    emoji: "➗",
    title: "See the maths, don't memorise it",
    body: "Interactive bar models make fractions visible. Change the numbers and watch the comparison update instantly.",
    href: "/subjects/math",
    linkLabel: "Explore maths lessons",
  },
];

export function InteractiveShowcase() {
  const [active, setActive] = React.useState("code");
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Interactive learning"
        title="Learn by doing, not by watching"
        description="Every subject has something you can actually touch: code that runs, a board that blinks, a canvas that moves."
      />

      <Tabs value={active} onValueChange={setActive} className="mt-8">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              <tab.icon className="size-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5 grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-3xl border border-border/70 bg-card p-5">
            <Badge variant="default">{activeTab.emoji} {activeTab.label}</Badge>
            <h3 className="mt-3 text-lg font-black tracking-tight">{activeTab.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {activeTab.body}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
              <Link href={activeTab.href}>
                {activeTab.linkLabel} <ArrowRight className="size-3.5" />
              </Link>
            </Button>

            <div className="mt-5 rounded-2xl bg-muted/50 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Included with every lesson
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                <li>✅ Learning objectives</li>
                <li>✅ Step-by-step instructions</li>
                <li>✅ Worked examples with output</li>
                <li>✅ Quiz with explanations</li>
                <li>✅ XP and progress tracking</li>
              </ul>
            </div>
          </aside>

          <div className="min-w-0">
            <TabsContent value="code" className="mt-0">
              <CodingPlayground
                language="python"
                title="led_heart.py"
                height="260px"
                instructions={[
                  "Read the code — what will it print?",
                  "Press Run, then change the pause value.",
                ]}
                initialCode={'frames = ["heart", "small heart", "heart"]\n\nfor frame in frames:\n    print(f"show {frame}")\n\nprint("Animation complete — 3 frames, 25 LEDs.")'}
              />
            </TabsContent>

            <TabsContent value="microbit" className="mt-0">
              <MicrobitSimulator programId="heart" showSensors showEventLog />
            </TabsContent>

            <TabsContent value="design" className="mt-0">
              <DesignCanvas mode="canvas" />
            </TabsContent>

            <TabsContent value="math" className="mt-0">
              <FractionLab />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </section>
  );
}
