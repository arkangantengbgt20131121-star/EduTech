"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Cpu,
  FlaskConical,
  Figma,
  History,
  Menu,
  Moon,
  Palette,
  Play,
  Rocket,
  Search,
  Sparkles,
  Sun,
  Trophy,
  X,
} from "lucide-react";

const subjects = [
  {
    icon: Cpu,
    title: "Robotics",
    description: "Build amazing projects with Micro:bit, sensors and electronics.",
    lessons: "24 lessons",
  },
  {
    icon: Code2,
    title: "Coding",
    description: "Learn Python, JavaScript, HTML and CSS through projects.",
    lessons: "42 lessons",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Master Figma, Adobe and the fundamentals of UI/UX.",
    lessons: "31 lessons",
  },
  {
    icon: History,
    title: "History",
    description: "Explore important people, civilizations and historical events.",
    lessons: "28 lessons",
  },
  {
    icon: Brain,
    title: "Mathematics",
    description: "Solve problems and understand math with interactive lessons.",
    lessons: "36 lessons",
  },
  {
    icon: FlaskConical,
    title: "Science",
    description: "Discover biology, physics, chemistry and our universe.",
    lessons: "40 lessons",
  },
];

const lessons = [
  {
    category: "ROBOTICS",
    title: "Make Your First Micro:bit Project",
    description: "Create a heart animation using the 5×5 LED matrix.",
    icon: Cpu,
    progress: 65,
  },
  {
    category: "CODING",
    title: "Python: Understanding Loops",
    description: "Learn how loops make repetitive tasks simple.",
    icon: Code2,
    progress: 40,
  },
  {
    category: "DESIGN",
    title: "Figma: Build Your First UI",
    description: "Design a beautiful mobile application interface.",
    icon: Figma,
    progress: 20,
  },
];

const projects = [
  {
    icon: Cpu,
    title: "Digital Dice",
    category: "Micro:bit",
    difficulty: "Beginner",
  },
  {
    icon: Code2,
    title: "Number Guessing Game",
    category: "Python",
    difficulty: "Beginner",
  },
  {
    icon: Palette,
    title: "Mobile App UI",
    category: "Figma",
    difficulty: "Intermediate",
  },
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <main className={dark ? "dark min-h-screen bg-[#080b12]" : "min-h-screen bg-white"}>
      <div className="min-h-screen text-slate-900 dark:text-white">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#080b12]/85">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Rocket size={21} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Edu<span className="text-indigo-500">Tech</span>
              </span>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              <a href="#learn" className="text-sm font-medium hover:text-indigo-500">
                Learn
              </a>
              <a href="#projects" className="text-sm font-medium hover:text-indigo-500">
                Projects
              </a>
              <a href="#challenges" className="text-sm font-medium hover:text-indigo-500">
                Challenges
              </a>
              <a href="#progress" className="text-sm font-medium hover:text-indigo-500">
                Progress
              </a>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <button
                onClick={() => setDark(!dark)}
                className="rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={19} /> : <Moon size={19} />}
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/10">
                Sign in
              </button>

              <button className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 dark:bg-white dark:text-slate-950">
                Start Learning
              </button>
            </div>

            <button
              className="rounded-xl p-2 md:hidden"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>

          {menu && (
            <div className="border-t border-slate-200 px-6 py-5 dark:border-white/10 md:hidden">
              <div className="flex flex-col gap-5">
                <a href="#learn">Learn</a>
                <a href="#projects">Projects</a>
                <a href="#challenges">Challenges</a>
                <a href="#progress">Progress</a>
                <button className="rounded-xl bg-slate-950 py-3 text-white dark:bg-white dark:text-slate-950">
                  Start Learning
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:py-32">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
                <Sparkles size={15} />
                Learning made interactive
              </div>

              <h1 className="max-w-3xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Learn.
                <br />
                Create.
                <br />
                <span className="text-indigo-600">Build the Future.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                Explore robotics, coding, design, science, mathematics,
                history and more through interactive lessons and real-world
                projects.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button className="group flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950">
                  Start Learning
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3.5 font-semibold hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/10">
                  <Play size={17} />
                  Explore Projects
                </button>
              </div>

              <div className="mt-10 flex items-center gap-8 text-sm">
                <div>
                  <strong className="text-2xl">200+</strong>
                  <p className="text-slate-500">Lessons</p>
                </div>
                <div>
                  <strong className="text-2xl">50+</strong>
                  <p className="text-slate-500">Projects</p>
                </div>
                <div>
                  <strong className="text-2xl">8</strong>
                  <p className="text-slate-500">Subjects</p>
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-indigo-500/10 dark:border-white/10 dark:bg-[#10141d]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Today's lesson</p>
                    <h3 className="mt-1 font-bold">Micro:bit LED Matrix</h3>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10">
                    <Cpu size={21} />
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-950 p-7">
                  <div className="mx-auto grid w-fit grid-cols-5 gap-3">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-5 w-5 rounded-full ${
                          [2, 6, 8, 10, 14, 16, 18, 22].includes(i)
                            ? "bg-indigo-400 shadow-lg shadow-indigo-500/70"
                            : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center gap-4">
                    <div className="rounded-full bg-slate-800 px-5 py-2 text-xs text-white">
                      A
                    </div>
                    <div className="rounded-full bg-slate-800 px-5 py-2 text-xs text-white">
                      B
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Progress</p>
                    <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                      <div className="h-full w-[65%] rounded-full bg-indigo-500" />
                    </div>
                  </div>
                  <span className="font-bold text-indigo-500">65%</span>
                </div>
              </div>

              <div className="absolute -right-5 -top-7 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block dark:border-white/10 dark:bg-[#10141d]">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-yellow-100 p-2.5 text-yellow-600 dark:bg-yellow-500/10">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Achievement</p>
                    <p className="font-bold">+250 XP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUBJECTS */}
        <section id="learn" className="bg-slate-50 py-24 dark:bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="font-semibold text-indigo-500">EXPLORE</p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  What do you want to learn?
                </h2>
                <p className="mt-3 text-slate-500">
                  Choose a subject and start building your skills.
                </p>
              </div>

              <button className="flex items-center gap-2 font-semibold text-indigo-500">
                View all subjects <ArrowRight size={17} />
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => {
                const Icon = subject.icon;

                return (
                  <div
                    key={subject.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-white/10 dark:bg-[#10141d] dark:hover:border-indigo-500/30"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <Icon size={23} />
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
                      />
                    </div>

                    <h3 className="text-xl font-bold">{subject.title}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                      {subject.description}
                    </p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {subject.lessons}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LESSONS */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <p className="font-semibold text-indigo-500">KEEP LEARNING</p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Popular lessons
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {lessons.map((lesson) => {
                const Icon = lesson.icon;

                return (
                  <article
                    key={lesson.title}
                    className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10"
                  >
                    <div className="flex h-44 items-center justify-center bg-slate-100 dark:bg-[#151a24]">
                      <div className="rounded-2xl bg-white p-5 text-indigo-500 shadow-lg dark:bg-[#202633]">
                        <Icon size={42} />
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-bold tracking-widest text-indigo-500">
                        {lesson.category}
                      </p>
                      <h3 className="mt-2 text-xl font-bold">{lesson.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {lesson.description}
                      </p>

                      <div className="mt-6">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-slate-500">Progress</span>
                          <span className="font-bold">{lesson.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                      </div>

                      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 font-semibold text-white hover:bg-indigo-600 dark:bg-white dark:text-slate-950">
                        Continue
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="bg-slate-50 py-24 dark:bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="font-semibold text-indigo-500">BUILD SOMETHING</p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  Featured projects
                </h2>
              </div>

              <button className="hidden items-center gap-2 font-semibold text-indigo-500 sm:flex">
                See all <ArrowRight size={17} />
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => {
                const Icon = project.icon;

                return (
                  <div
                    key={project.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#10141d]"
                  >
                    <div className="flex h-44 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#181e29]">
                      <Icon
                        size={50}
                        className="text-indigo-500 transition group-hover:scale-110"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {project.difficulty}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold">{project.title}</h3>

                    <button className="mt-5 flex items-center gap-2 text-sm font-bold text-indigo-500">
                      Start project <ArrowRight size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section id="challenges" className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12 dark:bg-white dark:text-slate-950">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500">
                  <Trophy size={26} />
                </div>

                <p className="font-semibold text-indigo-400">WEEKLY CHALLENGE</p>

                <h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-4xl">
                  Build a Micro:bit Reaction Game
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-400 dark:text-slate-600">
                  Use buttons, LEDs and timing to create your own reaction
                  game. Complete the challenge and earn XP.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button className="rounded-xl bg-white px-6 py-3 font-bold text-slate-950 hover:bg-indigo-100 dark:bg-slate-950 dark:text-white">
                    Take Challenge
                  </button>

                  <span className="text-sm text-slate-400">
                    ⭐ 250 XP reward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRESS */}
        <section id="progress" className="border-t border-slate-200 bg-slate-50 py-24 dark:border-white/10 dark:bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <p className="font-semibold text-indigo-500">YOUR JOURNEY</p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  Make progress every day.
                </h2>
                <p className="mt-4 leading-7 text-slate-500">
                  Keep track of your lessons, projects, XP and achievements
                  from one simple dashboard.
                </p>

                <button className="mt-7 flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white dark:bg-white dark:text-slate-950">
                  Open Dashboard <ArrowRight size={17} />
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-[#10141d]">
                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-5 dark:bg-white/5">
                    <p className="text-sm text-slate-500">Total XP</p>
                    <p className="mt-2 text-3xl font-black">1,240</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5 dark:bg-white/5">
                    <p className="text-sm text-slate-500">Lessons</p>
                    <p className="mt-2 text-3xl font-black">24</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5 dark:bg-white/5">
                    <p className="text-sm text-slate-500">Streak</p>
                    <p className="mt-2 text-3xl font-black">7 🔥</p>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Current level</p>
                      <p className="mt-1 text-xl font-bold">Creator</p>
                    </div>
                    <span className="font-bold text-indigo-500">72%</span>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-indigo-500" />
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-4 rounded-xl border border-slate-200 p-4 dark:border-white/10">
                  <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-500/10">
                    <Trophy size={22} />
                  </div>
                  <div>
                    <p className="font-bold">Robot Builder</p>
                    <p className="text-sm text-slate-500">
                      Complete 5 robotics projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl shadow-indigo-500/5 sm:p-16 dark:border-white/10 dark:bg-[#10141d]">
            <BookOpen className="mx-auto text-indigo-500" size={40} />
            <h2 className="mt-5 text-3xl font-black sm:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Pick a subject, start a project and build something amazing
              today.
            </p>

            <button className="mt-8 rounded-xl bg-indigo-600 px-7 py-3.5 font-bold text-white hover:bg-indigo-700">
              Start Learning
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 dark:border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Rocket size={17} />
              </div>
              <span className="font-bold">
                Edu<span className="text-indigo-500">Tech</span>
              </span>
            </div>

            <p className="text-sm text-slate-500">
              Learn. Create. Build the Future. © 2026 EduTech
            </p>

            <div className="flex gap-5 text-sm text-slate-500">
              <a href="#" className="hover:text-indigo-500">
                Privacy
              </a>
              <a href="#" className="hover:text-indigo-500">
                Terms
              </a>
              <a href="#" className="hover:text-indigo-500">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
