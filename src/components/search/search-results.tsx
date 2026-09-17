import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { SearchResult } from "@/data";

const groupOrder: SearchResult["group"][] = ["Lessons", "Projects", "Challenges", "Subjects"];

export function SearchResults({
  grouped,
  showHeaders = true,
  limitPerGroup,
}: {
  grouped: Record<SearchResult["group"], SearchResult[]>;
  showHeaders?: boolean;
  limitPerGroup?: number;
}) {
  const groups = groupOrder
    .map((group) => ({
      group,
      results: limitPerGroup ? grouped[group].slice(0, limitPerGroup) : grouped[group],
      total: grouped[group].length,
    }))
    .filter((entry) => entry.results.length > 0);

  return (
    <div className="space-y-8">
      {groups.map(({ group, results, total }) => (
        <section key={group}>
          {showHeaders ? (
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                {group}
              </h2>
              <span className="h-px flex-1 bg-border" aria-hidden />
              <Badge variant="outline">{total}</Badge>
            </div>
          ) : null}

          <ul className={showHeaders ? "mt-3 space-y-2" : "space-y-2"}>
            {results.map((result) => (
              <li key={`${result.group}-${result.id}`}>
                <Link
                  href={result.href}
                  className="card-lift flex items-start gap-3.5 rounded-2xl border border-border/70 bg-card p-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-lg">
                    {result.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-snug">{result.title}</span>
                    <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {result.description}
                    </span>
                    <span className="mt-1.5 block text-[11px] font-semibold text-primary">
                      {result.meta}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
