export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>

      <div className="space-y-3">
        <div className="animate-pulse bg-muted h-4 w-32 rounded-full" />
        <div className="animate-pulse bg-muted h-9 w-2/3 rounded-xl" />
        <div className="animate-pulse bg-muted h-4 w-1/2 rounded-full" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-3xl border border-border/70 bg-card p-5">
            <div className="animate-pulse bg-muted size-11 rounded-2xl" />
            <div className="animate-pulse bg-muted mt-4 h-4 w-3/4 rounded-full" />
            <div className="animate-pulse bg-muted mt-2.5 h-3 w-full rounded-full" />
            <div className="animate-pulse bg-muted mt-2 h-3 w-5/6 rounded-full" />
            <div className="mt-5 flex gap-2">
              <div className="animate-pulse bg-muted h-5 w-16 rounded-full" />
              <div className="animate-pulse bg-muted h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
