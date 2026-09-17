"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Planet {
  id: string;
  name: string;
  emoji: string;
  color: string;
  radius: number;
  orbitSeconds: number;
  distance: string;
  diameter: string;
  yearLength: string;
  moons: string;
  fact: string;
}

const planets: Planet[] = [
  { id: "mercury", name: "Mercury", emoji: "☿", color: "#a8a29e", radius: 4, orbitSeconds: 3.2, distance: "58 million km", diameter: "4,879 km", yearLength: "88 days", moons: "0", fact: "A day on Mercury is longer than its year." },
  { id: "venus", name: "Venus", emoji: "♀", color: "#fbbf24", radius: 6, orbitSeconds: 5, distance: "108 million km", diameter: "12,104 km", yearLength: "225 days", moons: "0", fact: "Surface temperature is about 465 °C — hot enough to melt lead." },
  { id: "earth", name: "Earth", emoji: "🌍", color: "#3b82f6", radius: 6.5, orbitSeconds: 7, distance: "150 million km", diameter: "12,742 km", yearLength: "365 days", moons: "1", fact: "The only place in the universe known to host life." },
  { id: "mars", name: "Mars", emoji: "🔴", color: "#ef4444", radius: 5, orbitSeconds: 10, distance: "228 million km", diameter: "6,779 km", yearLength: "687 days", moons: "2", fact: "Home to Olympus Mons, the tallest volcano in the solar system." },
  { id: "jupiter", name: "Jupiter", emoji: "🟠", color: "#fb923c", radius: 12, orbitSeconds: 18, distance: "778 million km", diameter: "139,820 km", yearLength: "12 years", moons: "95+", fact: "Its Great Red Spot is a storm wider than the whole Earth." },
  { id: "saturn", name: "Saturn", emoji: "🪐", color: "#fcd34d", radius: 10, orbitSeconds: 26, distance: "1.4 billion km", diameter: "116,460 km", yearLength: "29 years", moons: "146+", fact: "Its rings are mostly ice, and only about 10 metres thick." },
  { id: "uranus", name: "Uranus", emoji: "🔵", color: "#67e8f9", radius: 8, orbitSeconds: 34, distance: "2.9 billion km", diameter: "50,724 km", yearLength: "84 years", moons: "28", fact: "It rotates on its side, likely because of an ancient collision." },
  { id: "neptune", name: "Neptune", emoji: "🔷", color: "#60a5fa", radius: 8, orbitSeconds: 42, distance: "4.5 billion km", diameter: "49,244 km", yearLength: "165 years", moons: "16", fact: "Winds here reach 2,100 km/h — the fastest in the solar system." },
];

export function SolarSystem() {
  const [playing, setPlaying] = React.useState(true);
  const [speed, setSpeed] = React.useState(1);
  const [selected, setSelected] = React.useState<Planet>(planets[2]);
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setTick((current) => current + delta * speed);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed]);

  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-[radial-gradient(120%_100%_at_50%_0%,#0b1120,#111827_60%,#020617)] shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <p className="text-sm font-bold text-white">Orbit simulator</p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setPlaying((value) => !value)}
            className="gap-1.5 bg-white/10 text-white hover:bg-white/20"
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            {playing ? "Pause" : "Play"}
          </Button>
          <div className="flex items-center gap-1 rounded-lg bg-white/10 p-0.5">
            {[0.5, 1, 2, 4].map((value) => (
              <button
                key={value}
                onClick={() => setSpeed(value)}
                className={cn(
                  "rounded-md px-2 py-1 text-[11px] font-bold transition",
                  speed === value ? "bg-white text-slate-900" : "text-white/70 hover:text-white",
                )}
              >
                {value}×
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-square max-h-[420px] w-full">
          {/* Sun */}
          <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff7c2,#fbbf24_45%,#f97316)] shadow-[0_0_60px_18px_rgba(251,191,36,0.35)] animate-pulse-glow" />
          <p className="absolute left-1/2 top-[calc(50%+38px)] -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-amber-200/80">
            Sun
          </p>

          {/* Orbits */}
          {planets.map((planet, index) => {
            const size = 42 + index * 20;
            const angle = (tick / planet.orbitSeconds) * 360 + index * 24;
            const radians = (angle * Math.PI) / 180;
            return (
              <React.Fragment key={planet.id}>
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                  style={{ width: `${size}%`, height: `${size}%` }}
                  aria-hidden
                />
                <button
                  onClick={() => setSelected(planet)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 hover:scale-125"
                  style={{
                    left: `calc(50% + ${(Math.cos(radians) * size) / 2}%)`,
                    top: `calc(50% + ${(Math.sin(radians) * size) / 2}%)`,
                  }}
                  aria-label={`${planet.name} — view details`}
                >
                  <span
                    className={cn(
                      "block rounded-full ring-1 ring-white/25",
                      selected.id === planet.id && "ring-2 ring-white/70",
                    )}
                    style={{
                      width: planet.radius * 2 + 6,
                      height: planet.radius * 2 + 6,
                      background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.75), ${planet.color} 55%, rgba(0,0,0,0.6))`,
                    }}
                  />
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <aside className="border-t border-white/10 p-4 text-white lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              {selected.emoji}
            </span>
            <div>
              <p className="text-lg font-black">{selected.name}</p>
              <p className="text-[11px] text-white/60">Click any planet to inspect it</p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {[
              ["Distance from Sun", selected.distance],
              ["Diameter", selected.diameter],
              ["Year length", selected.yearLength],
              ["Moons", selected.moons],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white/5 p-2.5">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                  {label}
                </dt>
                <dd className="mt-0.5 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 rounded-xl bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-100">
            {selected.fact}
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-white/50">
            Orbit size and speed are not to scale — see the lesson on scale models to work out why
            real distances are impossible to draw.
          </p>
        </aside>
      </div>
    </div>
  );
}
