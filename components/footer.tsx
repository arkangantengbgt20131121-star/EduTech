import Link from "next/link";
import { Github, Instagram, Rocket, Twitter, Youtube } from "lucide-react";
import { subjects } from "@/lib/subjects";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50/60 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30">
                <Rocket size={20} />
              </div>
              <span className="text-xl font-black tracking-tight">
                Edu<span className="text-gradient">Tech</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Learn. Create. Build the Future. Interactive lessons in robotics, coding, design and
              school subjects — made for curious students.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-xl border border-border p-2.5 text-muted-foreground transition hover:bg-indigo-500/10 hover:text-indigo-500"
                  aria-label="Social link"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Subjects</p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              {subjects.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/learn/${s.id}`} className="text-muted-foreground transition hover:text-indigo-500">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Platform</p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              <li><Link href="/learn" className="text-muted-foreground hover:text-indigo-500">All subjects</Link></li>
              <li><Link href="/lessons" className="text-muted-foreground hover:text-indigo-500">Lessons</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-indigo-500">Projects</Link></li>
              <li><Link href="/challenges" className="text-muted-foreground hover:text-indigo-500">Challenges</Link></li>
              <li><Link href="/playground" className="text-muted-foreground hover:text-indigo-500">Code playground</Link></li>
              <li><Link href="/simulator" className="text-muted-foreground hover:text-indigo-500">Micro:bit simulator</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Student</p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-indigo-500">Dashboard</Link></li>
              <li><Link href="/profile" className="text-muted-foreground hover:text-indigo-500">Profile</Link></li>
              <li><Link href="/challenges" className="text-muted-foreground hover:text-indigo-500">Weekly challenge</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-indigo-500">Badges & levels</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>Learn. Create. Build the Future. © 2026 EduTech</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-indigo-500">Privacy</a>
            <a href="#" className="transition hover:text-indigo-500">Terms</a>
            <a href="#" className="transition hover:text-indigo-500">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
