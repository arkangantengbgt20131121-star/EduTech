"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // In production this is where you would report to your error service.
    console.error("EduTech error boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="grid size-16 place-items-center rounded-3xl bg-destructive/10 text-2xl">
        <AlertTriangle className="size-7 text-destructive" />
      </span>
      <h1 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">
        Something broke on this page
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
        The rest of EduTech is fine — your XP, streak and progress are safe. Try again, or head back
        to a page that works.
      </p>
      {error.digest ? (
        <p className="mt-3 rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
          Reference: {error.digest}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button variant="gradient" onClick={reset} className="gap-2">
          <RotateCcw className="size-4" /> Try again
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/">
            <Home className="size-4" /> Back home
          </Link>
        </Button>
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/learn">Continue learning</Link>
        </Button>
      </div>
    </div>
  );
}
