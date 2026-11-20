export function ResultsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading academic results"
      className="space-y-4 sm:space-y-5"
    >
      <span className="sr-only">Loading academic results</span>

      <div className="overflow-hidden rounded-2xl border border-portal-line/90 bg-white shadow-[0_2px_14px_rgba(5,42,94,0.035)]">
        <div className="flex items-center justify-between gap-3 border-b border-portal-line/80 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <div className="h-5 w-36 animate-pulse rounded bg-portal-sky" />
            <div className="mt-2 h-3 w-64 max-w-full animate-pulse rounded bg-portal-sky" />
          </div>
          <div className="h-9 w-24 shrink-0 animate-pulse rounded-lg bg-portal-sky" />
        </div>
        <div className="space-y-3 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="h-2.5 w-20 animate-pulse rounded bg-portal-sky" />
              <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-portal-sky" />
            </div>
            <div>
              <div className="h-2.5 w-16 animate-pulse rounded bg-portal-sky" />
              <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-portal-sky" />
            </div>
          </div>
          <div className="h-11 animate-pulse rounded-lg bg-portal-surface" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6 xl:gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-[96px] items-center gap-3 rounded-2xl border border-portal-line/90 bg-white px-3.5 py-3.5"
          >
            <div className="size-10 shrink-0 animate-pulse rounded-2xl bg-portal-sky xl:size-11" />
            <div className="min-w-0 flex-1">
              <div className="h-3 w-full max-w-24 animate-pulse rounded bg-portal-sky" />
              <div className="mt-2 h-6 w-12 animate-pulse rounded bg-portal-sky" />
              <div className="mt-1.5 h-2.5 w-20 animate-pulse rounded bg-portal-sky" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] xl:gap-5">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-portal-line/90 bg-white shadow-[0_2px_14px_rgba(5,42,94,0.035)]"
          >
            <div className="border-b border-portal-line/80 px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="h-5 w-40 animate-pulse rounded bg-portal-sky" />
              <div className="mt-2 h-3 w-56 max-w-full animate-pulse rounded bg-portal-sky" />
            </div>
            <div className="space-y-3 p-4 sm:p-5">
              {Array.from({ length: index === 0 ? 3 : 2 }).map((__, row) => (
                <div
                  key={row}
                  className="h-9 animate-pulse rounded-lg bg-portal-surface"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-portal-line/90 bg-white shadow-[0_2px_14px_rgba(5,42,94,0.035)]">
        <div className="flex items-center justify-between gap-3 border-b border-portal-line/80 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <div className="h-5 w-28 animate-pulse rounded bg-portal-sky" />
            <div className="mt-2 h-3 w-64 max-w-full animate-pulse rounded bg-portal-sky" />
          </div>
          <div className="h-5 w-16 animate-pulse rounded-full bg-portal-sky" />
        </div>
        <div className="grid gap-3 border-b border-portal-line/80 px-4 py-4 sm:grid-cols-2 sm:px-5 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="h-2.5 w-16 animate-pulse rounded bg-portal-sky" />
              <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-portal-sky" />
            </div>
          ))}
        </div>
        <div className="space-y-2 p-4 sm:p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-lg bg-portal-surface"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
