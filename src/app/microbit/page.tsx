import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Lightbulb, Radio, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/primitives";
import { MicrobitSimulator } from "@/components/microbit/microbit-simulator";
import { microbitPrograms } from "@/lib/microbit/simulator";

export const metadata: Metadata = {
  title: "Micro:bit simulator",
  description:
    "Program a virtual Micro:bit in your browser: 5×5 LED matrix, buttons A and B, shake, light and temperature sensors, plus a live event log.",
};

export default function MicrobitPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
      <SectionHeading
        eyebrow="Robotics workshop"
        title="Your Micro:bit, right here in the browser"
        description="The simulator runs the same programs as a physical board. Write, run and debug before you ever plug in a USB cable — then move the same code onto real hardware."
        action={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/playground">
                <Cpu className="size-4" /> Coding playground
              </Link>
            </Button>
            <Button asChild variant="gradient">
              <Link href="/subjects/robotics">Robotics lessons</Link>
            </Button>
          </div>
        }
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary">5×5 LED matrix</Badge>
        <Badge variant="secondary">Buttons A / B / A+B</Badge>
        <Badge variant="secondary">Shake & tilt</Badge>
        <Badge variant="secondary">Light + temperature</Badge>
        <Badge variant="outline">11 example programs</Badge>
      </div>

      <div className="mt-8">
        <MicrobitSimulator programId="heart" showSensors showEventLog />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-black tracking-tight">Example programs</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every program is written in the same style as MakeCode blocks. Pick one in the simulator
          above and press Run — then open the lesson that builds it from scratch.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {microbitPrograms.map((program) => (
            <div
              key={program.id}
              className="card-lift flex flex-col rounded-3xl border border-border/70 bg-card p-5"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#fb923c,#f59e0b)] text-xl">
                {program.emoji}
              </span>
              <h3 className="mt-3.5 text-base font-bold">{program.name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {program.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {program.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="size-4 text-primary" /> Read the event log
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The log shows every action your program takes, with timestamps. It is the fastest way to
            understand why a program behaves the way it does — exactly like a debugger.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Wrench className="size-4 text-primary" /> Architecture
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Programs are plain async generators that talk to a runtime API. Swap the runtime for a
            WebUSB driver and the same programs run on a physical board — no changes to the lessons.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--brand-indigo)_12%,var(--card)),var(--card))] p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Radio className="size-4 text-primary" /> Also available
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>🤖 Motor driver simulation (rover)</li>
            <li>🏃 Step counter with sensors</li>
            <li>🌙 Night light and motion alarm</li>
          </ul>
          <Button asChild size="sm" variant="outline" className="mt-3 w-full gap-1.5">
            <Link href="/lessons/microbit-led-basics">
              Start the LED lesson <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
