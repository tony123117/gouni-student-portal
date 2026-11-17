import { FileCheck2, ListChecks, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';

const guidanceItems = [
  {
    title: 'Official options only',
    description:
      'Academic sessions, semesters, and fee categories are loaded from the university service.',
    icon: ListChecks,
  },
  {
    title: 'Review before paying',
    description:
      'An invoice preview appears only after the university returns an official response.',
    icon: FileCheck2,
  },
  {
    title: 'Payment stays guarded',
    description:
      'e-Transact remains disabled until the university supplies a valid payment destination.',
    icon: ShieldCheck,
  },
];

export function InvoiceGuidanceCard() {
  return (
    <SectionCard
      title="Good to know"
      description="How official invoice generation works."
      className="h-full"
    >
      <ul className="space-y-3">
        {guidanceItems.map((item) => (
          <li key={item.title} className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-portal-sky text-navy-800">
              <PortalIcon
                icon={item.icon}
                className="size-[15px]"
                strokeWidth={2.2}
              />
            </span>
            <div className="min-w-0">
              <p className="text-[10.5px] font-bold leading-[15px] text-navy-950">
                {item.title}
              </p>
              <p className="mt-0.5 text-[9.5px] leading-[15px] text-slate-500">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 border-t border-portal-line/80 pt-3 text-[9px] leading-[14px] text-slate-400">
        This portal never creates invoice numbers, fees, student records, or
        payment references on its own.
      </p>
    </SectionCard>
  );
}
