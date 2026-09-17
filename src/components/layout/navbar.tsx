"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  Rocket,
  Search,
  Settings,
  Sparkles,
  Trophy,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/misc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search/search-dialog";
import { useProgress } from "@/components/progress/progress-provider";
import { currentUser } from "@/data/user";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/projects", label: "Projects" },
  { href: "/challenges", label: "Challenges" },
  { href: "/dashboard", label: "Progress" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpenPath, setMobileOpenPath] = React.useState<string | null>(null);
  // The menu is keyed by pathname, so navigating collapses it without an effect.
  const mobileOpenFor = mobileOpenPath === pathname;
  const mobileOpen = mobileOpenFor;
  const setMobileOpen = (next: boolean) => setMobileOpenPath(next ? pathname : null);
  const { stats, level } = useProgress();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6"
          aria-label="Main navigation"
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-white shadow-[0_10px_24px_-12px_var(--brand-indigo)]">
              <Rocket className="size-4.5" />
            </span>
            <span className="text-[17px] font-black tracking-tight">
              Edu<span className="text-primary">Tech</span>
            </span>
          </Link>

          <div className="ml-2 hidden items-center gap-0.5 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                ) : null}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground md:flex"
              aria-label="Search EduTech"
            >
              <Search className="size-4" />
              <span className="pr-6">Search</span>
              <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="grid size-9 place-items-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground transition hover:text-foreground md:hidden"
              aria-label="Search EduTech"
            >
              <Search className="size-4" />
            </button>

            <ThemeToggle />

            <div className="hidden items-center gap-1.5 rounded-xl border border-border/70 bg-card/60 px-2.5 py-1.5 lg:flex">
              <Flame className="size-3.5 text-[#f97316]" />
              <span className="text-xs font-bold tabular-nums">{stats.streak}</span>
              <span className="mx-1 h-4 w-px bg-border" />
              <Sparkles className="size-3.5 text-primary" />
              <span className="text-xs font-bold tabular-nums">{formatNumber(stats.xp)}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-full ring-offset-2 ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Open profile menu"
                >
                  <Avatar className="size-9 border border-border/70">
                    <AvatarFallback className="text-base">{currentUser.avatarEmoji}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="flex items-center gap-3 py-2">
                  <Avatar className="size-9">
                    <AvatarFallback>{currentUser.initials}</AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">{currentUser.name}</span>
                    <span className="text-[11px] font-medium normal-case tracking-normal text-muted-foreground">
                      {level.emoji} Level {level.level} · {level.name}
                    </span>
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User /> My profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard#badges">
                    <Trophy /> Achievements
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/learn">
                    <BookOpen /> My courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile#settings">
                    <Settings /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="gradient" size="sm" className="hidden sm:inline-flex">
              <Link href="/learn">Start Learning</Link>
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid size-9 place-items-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
            mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
                {isActive(link.href) ? <Badge variant="default">Current</Badge> : null}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Button asChild variant="gradient" className="flex-1">
                <Link href="/learn">Start Learning</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
