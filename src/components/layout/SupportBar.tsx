import { Info } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';

export function SupportBar() {
  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-portal-line/80 bg-[#eaf1fb] px-4 py-4 text-[13px] leading-5 text-navy-800 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
      <p className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
          <PortalIcon icon={Info} className="size-[19px]" strokeWidth={2.4} />
        </span>
        <span className="font-medium">
          Need help? Contact the{' '}
          <span className="font-bold text-navy-950">ICT Help Desk</span>.
        </span>
      </p>
      <p className="pl-[52px] text-[11.5px] font-medium text-slate-500 sm:pl-0 sm:text-right">
        Powered by{' '}
        <span className="font-bold text-navy-900">
          Godfrey Okoye University
        </span>
      </p>
    </div>
  );
}
