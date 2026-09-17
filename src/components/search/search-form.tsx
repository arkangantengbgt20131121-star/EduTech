"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialQuery);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  return (
    <form onSubmit={submit} className="mt-6 flex gap-2" role="search">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Try “Python loops”, “World War II” or “Figma components”…"
          aria-label="Search EduTech"
          className="h-12 pl-10 pr-10 text-[15px]"
          autoFocus
        />
        {value ? (
          <button
            type="button"
            onClick={() => {
              setValue("");
              router.push("/search");
            }}
            aria-label="Clear search"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>
      <Button type="submit" variant="gradient" className="h-12 px-6">
        Search
      </Button>
    </form>
  );
}
