export function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading student dashboard"
      className="space-y-4 sm:space-y-5"
    >
      <span className="sr-only">Loading student dashboard</span>

      <div className="min-h-[184px] rounded-2xl bg-navy-950 p-5 sm:min-h-[196px] sm:p-7 lg:min-h-0 lg:bg-transparent lg:p-0">
        <div className="h-3 w-28 animate-pulse rounded bg-white/20 lg:bg-navy-100" />
        <div className="mt-3.5 h-9 w-72 max-w-full animate-pulse rounded bg-white/25 lg:bg-navy-100" />
        <div className="mt-2.5 h-4 w-80 max-w-full animate-pulse rounded bg-white/20 lg:bg-navy-100" />
        <div className="mt-3.5 h-1 w-28 animate-pulse rounded bg-gold-400/60 lg:bg-gold-200" />
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-[100px] items-center gap-3 rounded-2xl border border-portal-line bg-white px-3 py-3.5 sm:px-3.5"
          >
            <div className="size-[56px] animate-pulse rounded-2xl bg-portal-sky" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-24 animate-pulse rounded bg-portal-sky" />
              <div className="h-4 w-32 max-w-full animate-pulse rounded bg-portal-sky" />
              <div className="h-2 w-28 max-w-full animate-pulse rounded bg-portal-sky" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="h-64 rounded-2xl border border-portal-line bg-white" />
        <div className="h-64 rounded-2xl border border-portal-line bg-white" />
      </div>

      <div className="grid gap-3.5 md:grid-cols-2">
        <div className="h-56 rounded-2xl border border-portal-line bg-white" />
        <div className="h-56 rounded-2xl border border-portal-line bg-white" />
      </div>

      <div className="h-40 rounded-2xl border border-portal-line bg-white" />
    </div>
  );
}
