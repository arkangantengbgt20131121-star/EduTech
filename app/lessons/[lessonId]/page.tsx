"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Copy,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  ListChecks,
  PartyPopper,
  Target,
  Zap,
} from "lucide-react";
import { getSubject } from "@/lib/subjects";
import { getLesson, getNextLesson } from "@/lib/lessons";
import { useEduTech } from "@/lib/store";
import { Badge, Button, LevelDots, Progress } from "@/components/ui";
import { QuizRunner } from "@/components/quiz";
import { cn } from "@/lib/utils";

type Phase = "learn" | "activity" | "quiz";

const phases: { id: Phase; label: string; icon: typeof BookOpen }[] = [
  { id: "learn", label: "1 · Learn", icon: BookOpen },
  { id: "activity", label: "2 · Try it", icon: FlaskConical },
  { id: "quiz", label: "3 · Quiz", icon: ListChecks },
];

function CodeBlock({ title, language, code, explanation }: { title: string; language: string; code: string; explanation: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  const playgroundLang = language === "python" ? "python" : language === "javascript" ? "javascript" : "html";
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/50 px-5 py-3">
        <p className="text-sm font-black">
          {title} <span className="ml-1 rounded-md bg-indigo-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-indigo-500">{language}</span>
        </p>
        <div className="flex gap-2">
          <Link href={`/playground?lang=${playgroundLang}`}>
            <span className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-500">
              ▶ Try it live
            </span>
          </Link>
          <button onClick={copy} className="flex items-center gap-1 rounded-lg border border-input px-2.5 py-1.5 text-xs font-bold hover:bg-accent">
            <Copy size={13} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="code-scroll overflow-x-auto bg-[#0b0f1a] p-5 font-mono text-[13px] leading-6 text-slate-100">
        {code}
      </pre>
      <p className="border-t border-border bg-indigo-500/[0.04] px-5 py-3.5 text-sm leading-relaxed text-muted-foreground">
        <strong className="text-foreground">How it works: </strong>
        {explanation}
      </p>
    </div>
  );
}

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  const lesson = getLesson(lessonId);
  const [phase, setPhase] = useState<Phase>("learn");
  const [activityChecked, setActivityChecked] = useState<boolean[]>([]);
  const { completeLesson, isLessonDone } = useEduTech();

  if (!lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-black">Lesson not found 😢</h1>
        <Link href="/lessons">
          <Button className="mt-6" variant="primary">
            <ArrowLeft size={16} /> All lessons
          </Button>
        </Link>
      </div>
    );
  }

  const subject = getSubject(lesson.subjectId);
  const done = isLessonDone(lesson.id);
  const next = getNextLesson(lesson);
  const phaseIndex = phases.findIndex((p) => p.id === phase);
  const phaseProgress = ((phaseIndex + 1) / phases.length) * 100;

  return (
    <div>
      {/* Header */}
      <div className={cn("relative overflow-hidden bg-gradient-to-br", subject?.gradient ?? "from-indigo-500 to-violet-600")}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white/85">
            <Link href="/lessons" className="hover:text-white">Lessons</Link>
            <span>/</span>
            <Link href={subject ? `/learn/${subject.id}` : "/learn"} className="hover:text-white">
              {subject?.name}
            </Link>
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 max-w-3xl leading-relaxed text-white/90">{lesson.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] font-bold text-white">
            <span className="flex items-center gap-1.5 rounded-full bg-black/25 px-3.5 py-1.5">
              <Clock size={14} /> {lesson.durationMin} min
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-black/25 px-3.5 py-1.5">
              <Zap size={14} /> {lesson.xp} XP
            </span>
            <span className="rounded-full bg-black/25 px-3.5 py-1.5">{lesson.level}</span>
            {done && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5">
                <CheckCircle2 size={14} /> Completed
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Phase nav */}
        <div className="sticky top-[65px] z-30 -mx-4 bg-background/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
          <div className="flex gap-2">
            {phases.map((p) => {
              const Icon = p.icon;
              const active = phase === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPhase(p.id)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2.5 text-[13px] font-black transition sm:text-sm",
                    active
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                      : "border-border text-muted-foreground hover:border-indigo-300"
                  )}
                >
                  <Icon size={16} /> {p.label}
                </button>
              );
            })}
          </div>
          <Progress value={phaseProgress} className="mt-2.5" />
        </div>

        {/* ── LEARN ── */}
        {phase === "learn" && (
          <div className="mt-4 space-y-8 animate-fade-up">
            <div className="rounded-2xl border border-indigo-500/25 bg-indigo-500/[0.05] p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-black">
                <Target size={18} className="text-indigo-500" /> What you&apos;ll learn
              </h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                {lesson.objectives.map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-black text-white">
                      {i + 1}
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {lesson.sections.map((s, i) => (
              <article key={i}>
                <h2 className="text-2xl font-black tracking-tight">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-[15.5px] leading-8 text-muted-foreground">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            ))}

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-black">
                <GraduationCap size={18} className="text-indigo-500" /> Key terms
              </h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                {lesson.keyTerms.map((t) => (
                  <div key={t.term} className="rounded-xl bg-muted/60 p-4">
                    <dt className="font-black text-indigo-500">{t.term}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-black tracking-tight">Examples</h2>
              {lesson.examples.map((e, i) => (
                <CodeBlock key={i} title={e.title} language={e.language} code={e.code} explanation={e.explanation} />
              ))}
            </div>

            <Button size="lg" variant="primary" className="w-full sm:w-auto" onClick={() => setPhase("activity")}>
              Continue to activity <ArrowRight size={17} />
            </Button>
          </div>
        )}

        {/* ── ACTIVITY ── */}
        {phase === "activity" && (
          <div className="mt-4 space-y-6 animate-fade-up">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <Badge variant="success">✋ Hands-on activity</Badge>
              <h2 className="mt-3 text-2xl font-black tracking-tight">{lesson.activity.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{lesson.activity.description}</p>

              <div className="mt-6 space-y-3">
                {lesson.activity.steps.map((step, i) => {
                  const checked = activityChecked[i] ?? false;
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        setActivityChecked((prev) => {
                          const nextArr = [...prev];
                          nextArr[i] = !nextArr[i];
                          return nextArr;
                        })
                      }
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition",
                        checked ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-indigo-400"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                          checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-muted-foreground/40"
                        )}
                      >
                        {checked && <CheckCircle2 size={14} />}
                      </span>
                      <span className="text-[15px] leading-relaxed">
                        <strong className="mr-1.5">Step {i + 1}.</strong>
                        {step}
                      </span>
                    </button>
                  );
                })}
              </div>

              {lesson.activity.starterCode && (
                <div className="mt-6">
                  <CodeBlock
                    title="Starter code"
                    language={lesson.activity.language ?? "python"}
                    code={lesson.activity.starterCode}
                    explanation="Copy this into the Playground and build on it. Experiment freely — you can't break anything!"
                  />
                </div>
              )}

              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                <h3 className="flex items-center gap-2 text-sm font-black text-amber-600 dark:text-amber-400">
                  <Lightbulb size={16} /> Hints
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                  {lesson.activity.hints.map((h, i) => (
                    <li key={i}>💡 {h}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={() => setPhase("learn")}>
                <ArrowLeft size={16} /> Back to lesson
              </Button>
              <Button variant="primary" onClick={() => setPhase("quiz")}>
                Take the quiz <ArrowRight size={17} />
              </Button>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === "quiz" && (
          <div className="mt-4 space-y-6 animate-fade-up">
            <QuizRunner quiz={lesson.quiz} lessonId={lesson.id} />

            <div className="rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-6 text-center sm:p-8">
              {done ? (
                <>
                  <PartyPopper className="mx-auto text-indigo-500" size={36} />
                  <h2 className="mt-3 text-2xl font-black">Lesson completed! 🎉</h2>
                  <p className="mt-2 text-muted-foreground">
                    You earned {lesson.xp} XP for this lesson. {next ? "Ready for the next one?" : "You finished them all — amazing!"}
                  </p>
                </>
              ) : (
                <>
                  <Zap className="mx-auto fill-amber-500 text-amber-500" size={36} />
                  <h2 className="mt-3 text-2xl font-black">Claim your {lesson.xp} XP!</h2>
                  <p className="mt-2 text-muted-foreground">
                    Finished reading and tried the activity? Mark this lesson complete to earn XP and badges.
                  </p>
                  <Button size="lg" variant="gradient" className="mt-5" onClick={() => completeLesson(lesson.id, lesson.xp)}>
                    <CheckCircle2 size={18} /> Mark as Complete · +{lesson.xp} XP
                  </Button>
                </>
              )}
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="outline" onClick={() => setPhase("activity")}>
                  <ArrowLeft size={16} /> Review activity
                </Button>
                {next && (
                  <Link href={`/lessons/${next.id}`}>
                    <Button variant="primary" className="w-full sm:w-auto">
                      Next: {next.title.length > 32 ? next.title.slice(0, 32) + "…" : next.title}
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <LevelDots level={lesson.level} />
              <div className="flex gap-1.5">
                {lesson.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    #{t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
