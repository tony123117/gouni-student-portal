import { SectionCard } from '@/components/shared/SectionCard';

export function TellerPageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading teller submission"
      className="space-y-4 sm:space-y-5"
    >
      <span className="sr-only">Loading teller submission</span>

      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]">
        <div className="space-y-3.5">
          <SectionCard
            title="Payment Details"
            description="Provide the payment information printed on your teller."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="h-2.5 w-28 animate-pulse rounded bg-portal-sky" />
                  <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-portal-sky" />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Payment Evidence"
            description="Attach your bank teller as proof of payment."
          >
            <div className="h-2.5 w-52 animate-pulse rounded bg-portal-sky" />
            <div className="mt-2 h-16 w-full animate-pulse rounded-xl bg-portal-sky" />
          </SectionCard>
        </div>

        <SectionCard
          title="Good to know"
          description="How teller submission works."
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
        title="Submission History"
        description="Previously submitted tellers and their review status."
      >
        <div className="space-y-2.5">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-[74px] animate-pulse rounded-xl bg-portal-sky"
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
