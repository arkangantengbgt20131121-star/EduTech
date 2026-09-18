"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LayoutDashboard, Menu, Moon, Rocket, Search, Sun, X, Zap } from "lucide-react";
import { useEduTech } from "@/lib/store";
import { cn } from "@/lib/utils";
import { SearchDialog } from "./search-dialog";

const links = [
  { href: "/learn", label: "Learn" },
  { href: "/lessons", label: "Lessons" },
  { href: "/projects", label: "Projects" },
  { href: "/challenges", label: "Challenges" },
  { href: "/playground", label: "Playground" },
  { href: "/simulator", label: "Simulator" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { xp } = useEduTech();
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30">
              <Rocket size={20} />
            </div>
            <span className="text-xl font-black tracking-tight">
              Edu<span className="text-gradient">Tech</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  pathname === l.href || pathname.startsWith(l.href + "/")
                    ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-xl border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent md:flex"
              aria-label="Search"
            >
              <Search size={16} />
              <span className="hidden xl:inline">Search lessons…</span>
              <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-bold xl:inline">
                Ctrl K
              </kbd>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-xl p-2.5 hover:bg-accent md:hidden"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl p-2.5 transition hover:bg-accent"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <Link
              href="/dashboard"
              className="hidden items-center gap-1.5 rounded-xl bg-amber-500/10 px-3 py-2 text-sm font-black text-amber-600 ring-1 ring-amber-500/25 transition hover:bg-amber-500/20 dark:text-amber-400 sm:flex"
              title="Your XP"
            >
              <Zap size={16} className="fill-amber-500 text-amber-500" />
              {xp.toLocaleString()}
            </Link>

            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-100 md:flex"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            <button
              className="rounded-xl p-2 hover:bg-accent lg:hidden"
              onClick={() => setMenu(!menu)}
              aria-label="Menu"
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menu && (
          <div className="border-t border-border px-4 py-4 sm:px-6 lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-[15px] font-semibold",
                    pathname === l.href || pathname.startsWith(l.href + "/")
                      ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                      : "hover:bg-accent"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                <Link
                  href="/dashboard"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 text-[15px] font-bold text-white dark:bg-white dark:text-slate-950"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-input py-3 text-[15px] font-bold"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
