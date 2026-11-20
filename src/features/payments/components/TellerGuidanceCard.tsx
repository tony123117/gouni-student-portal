import { FileLock2, ListChecks, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';

const guidanceItems = [
  {
    title: 'Evidence, not confirmation',
    description:
      'Submitting a teller means the university has received your evidence for review — it is not a payment confirmation.',
    icon: ShieldCheck,
  },
  {
    title: 'Association needs official data',
    description:
      'Linking a submission to an invoice is only possible with invoices supplied by the university service.',
    icon: ListChecks,
  },
  {
    title: 'Documents stay private',
    description:
      'Teller files belong in secure university storage. Nothing is kept in your browser.',
    icon: FileLock2,
  },
];

export function TellerGuidanceCard() {
  return (
    <SectionCard
      title="Good to know"
      description="How teller submission works."
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
        This portal never invents invoices, payment records, review outcomes, or
        submission references.
      </p>
    </SectionCard>
  );
}
