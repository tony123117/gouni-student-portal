import { SectionCard } from '@/components/shared/SectionCard';

export function CourseRegistrationSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading course registration"
      className="space-y-4 sm:space-y-5"
    >
      <span className="sr-only">Loading course registration</span>

      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {Array.from({ length: 2 }).map((_, index) => (
          <SectionCard
            key={index}
            title={index === 0 ? 'Academic Session' : 'Registration Status'}
            description={
              index === 0
                ? 'The registration term supplied by the university.'
                : 'Eligibility and period supplied by the university.'
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, row) => (
                <div key={row}>
                  <div className="h-2.5 w-24 animate-pulse rounded bg-portal-sky" />
                  <div className="mt-2 h-4 w-full max-w-36 animate-pulse rounded bg-portal-sky" />
                </div>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.45fr)]">
        <SectionCard
          title="Available Courses"
          description="Courses supplied by the university for this registration period."
        >
          <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_200px]">
            <div className="h-10 animate-pulse rounded-lg bg-portal-sky" />
            <div className="h-10 animate-pulse rounded-lg bg-portal-sky" />
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[72px] animate-pulse rounded-xl bg-portal-surface"
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Selected Courses"
          description="Your current selection."
        >
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-lg bg-portal-surface"
              />
            ))}
          </div>
          <div className="mt-4 h-16 animate-pulse rounded-xl bg-portal-sky" />
          <div className="mt-3 h-10 animate-pulse rounded-lg bg-portal-sky" />
        </SectionCard>
      </div>

      <SectionCard
        title="Registration History"
        description="Previously submitted registrations and their status."
      >
        <div className="space-y-2.5">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-[78px] animate-pulse rounded-xl bg-portal-sky"
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
