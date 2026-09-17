import Link from "next/link";
import { Camera, GitBranch, Mail, Rocket, Video } from "lucide-react";

import { subjects } from "@/data/subjects";

const productLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/projects", label: "Projects" },
  { href: "/challenges", label: "Challenges" },
  { href: "/dashboard", label: "Dashboard" },
];

const resourceLinks = [
  { href: "/playground", label: "Coding playground" },
  { href: "/microbit", label: "Micro:bit simulator" },
  { href: "/about", label: "About EduTech" },
  { href: "/search", label: "Search" },
];

const legalLinks = [
  { href: "/about#privacy", label: "Privacy" },
  { href: "/about#terms", label: "Terms" },
  { href: "/about#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/25">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-white">
                <Rocket className="size-4.5" />
              </span>
              <span className="text-[17px] font-black tracking-tight">
                Edu<span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm font-semibold text-foreground/90">
              Learn. Create. Build the Future.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An interactive learning platform where students aged 10–18 build robots, write real
              code and design things they are proud of.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Camera, label: "Instagram" },
                { icon: Video, label: "YouTube" },
                { icon: GitBranch, label: "GitHub" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Platform" links={productLinks} />
          <FooterColumn title="Explore" links={resourceLinks} />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Subjects
            </h3>
            <ul className="mt-3 space-y-2">
              {subjects.slice(0, 6).map((subject) => (
                <li key={subject.id}>
                  <Link
                    href={`/subjects/${subject.id}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    <span aria-hidden>{subject.emoji}</span>
                    {subject.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/subjects" className="text-sm font-semibold text-primary hover:underline">
                  View all 10 subjects →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduTech. Built for curious students everywhere. 🇮🇩
          </p>
          <ul className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-muted-foreground transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
