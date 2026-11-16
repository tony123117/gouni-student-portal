import { ArrowLeft, Inbox, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeading } from '@/components/shared/PageHeading';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { ROUTES } from '@/constants';

interface ModulePlaceholderProps {
  title: string;
  description: string;
  emptyMessage: string;
}

export function ModulePlaceholder({
  title,
  description,
  emptyMessage,
}: ModulePlaceholderProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <PageHeading
        eyebrow="Student services"
        title={title}
        description={description}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-portal-line/90 bg-white p-5 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-7">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
            <PortalIcon icon={Inbox} className="size-6" duotone />
          </span>
          <h2 className="mt-4 text-[22px] font-extrabold tracking-[-0.025em] text-navy-950">
            No information available
          </h2>
          <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-slate-600">
            {emptyMessage}
          </p>
          <p className="mt-2 max-w-xl text-[12px] leading-5 text-slate-500">
            When this information becomes available, it will be shown here.
          </p>

          <Link
            to={ROUTES.dashboard}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-xs font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          >
            <ArrowLeft
              aria-hidden="true"
              strokeWidth={2.3}
              className="size-3.5"
            />
            Back to dashboard
          </Link>
        </section>

        <aside className="rounded-2xl border border-portal-line/90 bg-white p-5 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
            <PortalIcon icon={LifeBuoy} className="size-[20px]" duotone />
          </span>
          <h2 className="mt-3.5 text-[17px] font-bold tracking-tight text-navy-950">
            Need help?
          </h2>
          <p className="mt-1.5 text-[12.5px] leading-5 text-slate-500">
            Contact the ICT Help Desk if you need assistance with{' '}
            {title.toLowerCase()}.
          </p>
          <Link
            to={ROUTES.dashboard}
            className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-[12px] font-bold text-navy-800 transition-colors hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          >
            Return to your dashboard
          </Link>
        </aside>
      </div>
    </div>
  );
}
