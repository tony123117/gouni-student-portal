import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  description?: string;
  headerAside?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function SectionCard({
  title,
  description,
  headerAside,
  children,
  className = '',
  bodyClassName = 'p-5 sm:p-6',
}: SectionCardProps) {
  return (
    <section
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-portal-line/90 bg-white shadow-[0_2px_14px_rgba(5,42,94,0.035)] ${className}`}
    >
      <div className="flex flex-col gap-2 border-b border-portal-line/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div className="min-w-0">
          <h2 className="text-[19px] font-extrabold tracking-[-0.03em] text-navy-950 sm:text-[21px] lg:text-[23px]">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-[12.5px] leading-5 text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
        {headerAside ? <div className="shrink-0">{headerAside}</div> : null}
      </div>
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
