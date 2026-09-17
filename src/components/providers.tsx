"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { ProgressProvider } from "@/components/progress/progress-provider";
import { TooltipProvider } from "@/components/ui/misc";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className:
                "rounded-xl border border-border/70 bg-card text-foreground shadow-lg",
            }}
          />
        </TooltipProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}
