import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EmptyState, SectionHeading } from "@/components/shared/primitives";
import { SearchForm } from "@/components/search/search-form";
import { SearchResults } from "@/components/search/search-results";
import { groupSearchResults, searchCatalog } from "@/data";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search every EduTech lesson, project, challenge and subject — from Python loops to the micro:bit sensors.",
};

const popularQueries = [
  "Python loops",
  "Micro:bit sensors",
  "World War II",
  "Fractions",
  "Figma components",
  "Solar system",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchCatalog(query, 24) : [];
  const grouped = groupSearchResults(results);
  const total = results.length;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
      <SectionHeading
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "What do you want to learn today?"}
        description={
          query
            ? `${total} ${total === 1 ? "match" : "matches"} across lessons, projects, challenges and subjects.`
            : "Type a topic, a tool or a question — results are grouped by lessons, projects, challenges and subjects."
        }
      />

      <SearchForm key={query} initialQuery={query} />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Popular
        </span>
        {popularQueries.map((item) => (
          <Link
            key={item}
            href={`/search?q=${encodeURIComponent(item)}`}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            {item}
          </Link>
        ))}
      </div>

      {!query ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/12 text-2xl">
            <SearchIcon className="size-6 text-primary" />
          </span>
          <p className="mt-4 text-sm font-bold">Start typing above</p>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground">
            Not sure where to begin? Every subject page lists its lessons in order, and the learning
            library lets you filter by subject, difficulty and duration.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link
              href="/subjects"
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
            >
              Browse subjects
            </Link>
            <Link
              href="/learn"
              className="rounded-full border border-border px-4 py-2 text-xs font-bold"
            >
              Browse lessons
            </Link>
          </div>
        </div>
      ) : total === 0 ? (
        <EmptyState
          className="mt-10"
          emoji="🕵️"
          title={`No results for “${query}”`}
          description="Check the spelling, try a shorter phrase, or explore one of the popular searches above."
          action="Reset search"
          actionHref="/search"
        />
      ) : (
        <div className="mt-8">
          <SearchResults grouped={grouped} />
        </div>
      )}

      <section className="mt-12 rounded-3xl border border-border/70 bg-card p-5">
        <p className="text-sm font-bold">Search tips</p>
        <ul className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
          <li>🔎 Search by tool: “CodeMirror”, “Figma”, “MakeCode”, “Scratch”.</li>
          <li>📚 Search by concept: “for loop”, “fractions”, “photosynthesis”.</li>
          <li>🏛️ Search by era or place: “Majapahit”, “World War II”, “Nile”.</li>
          <li>🎨 Search by outcome: “logo design”, “poster”, “login screen”.</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline">⌘K opens search anywhere</Badge>
          <Badge variant="outline">Keyboard: ↑ ↓ to move, ↵ to open</Badge>
        </div>
      </section>
    </div>
  );
}
