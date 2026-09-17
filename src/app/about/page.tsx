import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  BookOpenCheck,
  Bot,
  Building2,
  Compass,
  Heart,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/primitives";
import { catalogStats } from "@/data";

export const metadata: Metadata = {
  title: "About EduTech",
  description:
    "EduTech blends an online school, coding lab, robotics workshop, design studio, interactive textbook and gamified progress tracking for students aged 10–18.",
};

const pillars = [
  {
    emoji: "🏫",
    title: "Online school",
    body: "Structured lessons with objectives, explanations, worked examples and quizzes — aligned to how classrooms actually teach.",
  },
  {
    emoji: "💻",
    title: "Coding lab",
    body: "A real editor with a Python interpreter and a sandboxed HTML/CSS/JS preview, so code runs where the lesson is.",
  },
  {
    emoji: "🤖",
    title: "Robotics workshop",
    body: "A Micro:bit simulator with a 5×5 LED matrix, buttons, shake and sensors — practice before you touch hardware.",
  },
  {
    emoji: "🎨",
    title: "Design studio",
    body: "Figma and Adobe fundamentals, colour and typography practice, plus design challenges with real briefs.",
  },
  {
    emoji: "📚",
    title: "Interactive textbook",
    body: "Rich lesson blocks: timelines, comparisons, key-term lists, diagrams and widgets you can poke at.",
  },
  {
    emoji: "🏆",
    title: "Gamified progress",
    body: "XP, badges, streaks and levels that reward consistency — not just talent.",
  },
];

const numbers = [
  { value: catalogStats.subjects, label: "subjects" },
  { value: catalogStats.lessons, label: "lessons and roadmap topics" },
  { value: catalogStats.projects, label: "guided projects" },
  { value: catalogStats.quizzes, label: "quiz sets" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
      <header className="relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand-indigo)_14%,var(--card)),color-mix(in_oklab,var(--brand-cyan)_10%,var(--card)))] p-6 sm:p-10">
        <span className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="relative">
          <Badge variant="secondary">About EduTech</Badge>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Learn. Create. Build the Future.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            EduTech is a learning platform for students aged 10–18 that treats school subjects,
            coding, robotics and design as one connected world. A student can learn how the heart
            pumps in science, then build a Micro:bit heart in robotics, then design the poster that
            explains it — all in the same place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="gradient">
              <Link href="/learn">
                <Compass className="size-4" /> Start learning
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/subjects">Browse subjects</Link>
            </Button>
          </div>
        </div>
      </header>

      <dl className="mt-6 grid gap-3 sm:grid-cols-4">
        {numbers.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border/70 bg-card p-4">
            <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {item.label}
            </dt>
            <dd className="mt-1 text-2xl font-black tracking-tight">{item.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-12">
        <SectionHeading
          eyebrow="What is inside"
          title="Six products, one learning journey"
          description="Everything below is built from the same design system, so moving between them never feels like leaving the platform."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="card-lift rounded-3xl border border-border/70 bg-card p-5"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-muted text-xl">
                {pillar.emoji}
              </span>
              <h3 className="mt-3.5 text-base font-bold">{pillar.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Users className="size-4 text-primary" /> For students
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Learn at your own pace, keep a streak, collect badges and build a portfolio of projects
            you can actually show people.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Building2 className="size-4 text-primary" /> For teachers
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every lesson maps to learning objectives and includes a quiz, so you can assign a unit,
            review submissions and see who needs help — teacher accounts and class management plug
            into the same data layer.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Heart className="size-4 text-primary" /> For parents
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Progress is visible and honest: minutes learned, lessons completed, quiz scores and the
            projects your child has submitted for review.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Built to grow"
          title="A demo today, a platform tomorrow"
          description="EduTech ships with realistic demo data, but every layer is designed to be swapped for real services."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <span className="flex items-center gap-2 text-sm font-bold">
              <BookOpenCheck className="size-4 text-primary" /> Content as data
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Lessons, quizzes, projects and challenges are plain typed records. Swap the files for an
              API or a CMS without touching a single component.
            </p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <span className="flex items-center gap-2 text-sm font-bold">
              <Bot className="size-4 text-primary" /> Ready for AI tutoring
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Lesson context, quiz explanations and code sandboxes are already structured, so an
              AI tutor can explain a wrong answer with the same vocabulary as the lesson.
            </p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <span className="flex items-center gap-2 text-sm font-bold">
              <ShieldCheck className="size-4 text-primary" /> Safe by default
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Code runs in a sandboxed frame with strict guards, students never need to install
              anything, and no personal data leaves the demo environment.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12" id="faq">
        <SectionHeading eyebrow="Questions" title="Frequently asked" />
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="age">
            <AccordionTrigger>Which ages is EduTech designed for?</AccordionTrigger>
            <AccordionContent>
              Roughly 10–18. Beginner lessons use short sentences and lots of visuals, while
              Intermediate and Advanced lessons add real state machines, trigonometry and data
              analysis. Filtering by difficulty keeps everyone appropriately challenged.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="hardware">
            <AccordionTrigger>Do I need a real Micro:bit?</AccordionTrigger>
            <AccordionContent>
              No. The simulator runs the same programs in the browser, including buttons, shake,
              light and temperature sensors. If you do own a board, the program logic transfers
              directly to MakeCode.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="python">
            <AccordionTrigger>Is the Python playground a toy?</AccordionTrigger>
            <AccordionContent>
              It is a genuine subset interpreter written for this platform: variables, f-strings,
              conditionals, loops, functions, lists, dictionaries and <code>input()</code>. It is
              intentionally limited — no files or third-party packages — so the error messages can
              stay friendly for beginners.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="schools">
            <AccordionTrigger>Can schools use it?</AccordionTrigger>
            <AccordionContent>
              Yes. The data layer already models subjects, units, lessons and progress per student,
              so class rosters, teacher accounts and assignments can be added on top without
              rewriting the interface.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="progress">
            <AccordionTrigger>How is progress tracked?</AccordionTrigger>
            <AccordionContent>
              XP, streaks, badges, quiz scores and course progress are stored in your browser for the
              demo, and hydrate into the dashboard, profile and every lesson page. In production the
              same shape syncs to an account.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Sparkles className="size-4 text-primary" /> Accessibility
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Semantic landmarks, keyboard navigation, visible focus rings, reduced-motion support and
            a contrast-checked palette in both themes.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Accessibility className="size-4 text-primary" /> Performance
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Animations use transforms and opacity, heavy widgets load on demand, and the interpreter
            stops runaway loops with clear guardrails.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <MapPin className="size-4 text-primary" /> Who made it
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            A small team of educators and engineers building the platform they wish they had at
            school. The demo student, Alya, is named after one of our first testers.
          </p>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <div className="scroll-mt-24 rounded-3xl border border-border/70 bg-card p-6" id="privacy">
          <h2 className="text-lg font-black tracking-tight">Privacy</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This demo stores learning progress (XP, streaks, completed lessons and quiz scores) in
            your browser’s local storage under <code>edutech.progress.v1</code>. Nothing is sent to a
            server. Clearing site data, or pressing “Reset demo progress” on your profile, removes it
            completely. In a production deployment, accounts would be handled by a dedicated
            authentication provider with parental consent flows for students under 13.
          </p>
        </div>

        <div className="scroll-mt-24 rounded-3xl border border-border/70 bg-card p-6" id="terms">
          <h2 className="text-lg font-black tracking-tight">Terms of use</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            EduTech content is provided for educational use. Sample lessons, project briefs and quiz
            questions may be reused in classrooms with attribution. Code you write in the playground
            belongs to you. The platform is a demonstration and comes with no warranty of
            availability or fitness for assessment purposes.
          </p>
        </div>

        <div className="scroll-mt-24 rounded-3xl border border-border/70 bg-card p-6" id="contact">
          <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
            <Mail className="size-4.5 text-primary" /> Contact
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Questions, bug reports and lesson suggestions are all welcome.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">hello@edutech.example</Badge>
            <Badge variant="outline">teachers@edutech.example</Badge>
            <Badge variant="outline">Bandung, Indonesia 🇮🇩</Badge>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-2">
        <Button asChild variant="gradient">
          <Link href="/learn">Explore the learning library</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/challenges">See this week’s challenge</Link>
        </Button>
      </div>
    </div>
  );
}
