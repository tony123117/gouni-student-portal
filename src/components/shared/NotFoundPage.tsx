import { ArrowLeft, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeading } from '@/components/shared/PageHeading';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { ROUTES } from '@/constants';

export function NotFoundPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <PageHeading
        eyebrow="404"
        title="Page not found"
        description="The page you requested does not exist in the student portal."
      />

      <div className="max-w-xl rounded-2xl border border-portal-line/90 bg-white p-5 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-6">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
          <PortalIcon icon={SearchX} className="size-6" duotone />
        </span>
        <p className="mt-4 text-[13.5px] leading-6 text-slate-600">
          Check the address, or return to your dashboard to continue from the
          available student services.
        </p>
        <Link
          to={ROUTES.dashboard}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-xs font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
        >
          <ArrowLeft
            aria-hidden="true"
            strokeWidth={2.3}
            className="size-3.5"
          />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
