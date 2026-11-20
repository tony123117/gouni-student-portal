export function ClearanceSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading exam clearance"
      className="space-y-4 sm:space-y-5"
    >
      <span className="sr-only">Loading exam clearance</span>

      <div className="overflow-hidden rounded-2xl border border-portal-line/90 bg-white shadow-[0_2px_14px_rgba(5,42,94,0.035)]">
        <div className="flex items-center justify-between gap-3 border-b border-portal-line/80 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <div className="h-5 w-36 animate-pulse rounded bg-portal-sky" />
            <div className="mt-2 h-3 w-64 max-w-full animate-pulse rounded bg-portal-sky" />
          </div>
          <div className="h-8 w-20 shrink-0 animate-pulse rounded-lg bg-portal-sky" />
        </div>
        <div className="space-y-3 p-4 sm:p-5">
          <div className="h-28 animate-pulse rounded-xl bg-portal-sky/70" />
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`h-20 animate-pulse rounded-xl bg-portal-sky/60 ${
                  index === 2 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              />
            ))}
          </div>
          <div className="h-12 animate-pulse rounded-xl bg-portal-surface" />
        </div>
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
            <div className="h-5 w-48 animate-pulse rounded bg-portal-sky" />
            <div className="mt-2 h-3 w-72 max-w-full animate-pulse rounded bg-portal-sky" />
          </div>
          <div className="h-5 w-24 shrink-0 animate-pulse rounded-full bg-portal-sky" />
        </div>
        <div className="grid gap-3 border-b border-portal-line/80 px-4 py-4 sm:grid-cols-2 sm:px-5 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="h-2.5 w-16 animate-pulse rounded bg-portal-sky" />
              <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-portal-sky" />
            </div>
          ))}
        </div>
        <div className="grid gap-3 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 animate-pulse rounded-xl bg-portal-surface"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
