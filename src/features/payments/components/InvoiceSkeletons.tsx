import { SectionCard } from '@/components/shared/SectionCard';

export function InvoicePageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading invoice options"
      className="space-y-4 sm:space-y-5"
    >
      <span className="sr-only">Loading invoice options</span>

      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]">
        <SectionCard
          title="Invoice Selection"
          description="Choose the official session, semester, and fee category for your invoice."
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <div className="h-2.5 w-24 animate-pulse rounded bg-portal-sky" />
                <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-portal-sky" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-portal-line/80 pt-4">
            <div className="h-3 w-full max-w-md animate-pulse rounded bg-portal-sky" />
            <div className="h-10 w-32 shrink-0 animate-pulse rounded-lg bg-portal-sky" />
          </div>
        </SectionCard>

        <SectionCard
          title="Good to know"
          description="How official invoice generation works."
        >
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <div className="size-8 shrink-0 animate-pulse rounded-lg bg-portal-sky" />
                <div className="min-w-0 flex-1">
                  <div className="h-3 w-28 animate-pulse rounded bg-portal-sky" />
                  <div className="mt-2 h-2.5 w-full animate-pulse rounded bg-portal-sky" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Invoice Preview"
        description="Your official invoice will appear here after generation."
      >
        <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-portal-line bg-white">
          <div className="h-1 bg-portal-sky" />
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4 border-b border-portal-line pb-4">
              <div className="flex items-center gap-3">
                <div className="size-12 animate-pulse rounded-full bg-portal-sky" />
                <div>
                  <div className="h-3.5 w-36 animate-pulse rounded bg-portal-sky" />
                  <div className="mt-2 h-2 w-20 animate-pulse rounded bg-portal-sky" />
                </div>
              </div>
              <div className="h-7 w-24 animate-pulse rounded bg-portal-sky" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="h-24 animate-pulse rounded-xl bg-portal-surface" />
              <div className="h-24 animate-pulse rounded-xl bg-portal-surface" />
            </div>
            <div className="mt-3 h-14 animate-pulse rounded-xl bg-portal-surface" />
            <div className="mt-3 h-32 animate-pulse rounded-xl bg-portal-surface" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export function InvoiceGenerationSkeleton() {
  return (
    <div role="status" aria-label="Generating invoice">
      <span className="sr-only">Generating invoice</span>
      <SectionCard
        title="Invoice Preview"
        description="Your official invoice will appear here after generation."
      >
        <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-portal-line bg-white">
          <div className="h-1 bg-portal-sky" />
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4 border-b border-portal-line pb-4">
              <div className="flex items-center gap-3">
                <div className="size-12 animate-pulse rounded-full bg-portal-sky" />
                <div>
                  <div className="h-3.5 w-36 animate-pulse rounded bg-portal-sky" />
                  <div className="mt-2 h-2 w-20 animate-pulse rounded bg-portal-sky" />
                </div>
              </div>
              <div className="h-7 w-24 animate-pulse rounded bg-portal-sky" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="h-24 animate-pulse rounded-xl bg-portal-surface" />
              <div className="h-24 animate-pulse rounded-xl bg-portal-surface" />
            </div>
            <div className="mt-3 h-14 animate-pulse rounded-xl bg-portal-surface" />
            <div className="mt-3 h-32 animate-pulse rounded-xl bg-portal-surface" />
            <div className="mt-3 ml-auto h-20 w-full max-w-[260px] animate-pulse rounded-xl bg-portal-surface" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
