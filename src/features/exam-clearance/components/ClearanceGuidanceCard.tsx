import { ExternalLink, Info, ShieldCheck } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';

const notes = [
  {
    icon: ShieldCheck,
    title: 'Requirements are set by the university',
    description:
      'The portal displays the requirements returned for your student record. It does not add, remove, or prioritise them.',
  },
  {
    icon: Info,
    title: 'Eligibility is never inferred',
    description:
      'Completing visible requirements does not mark you cleared. The overall verdict and examination eligibility must come from the university.',
  },
  {
    icon: ExternalLink,
    title: 'Actions and documents stay with the university',
    description:
      'Only service-supplied secure action destinations are opened. Supporting documents are retrieved through authenticated university storage.',
  },
] as const;

export function ClearanceGuidanceCard() {
  return (
    <SectionCard
      title="Clearance notes"
      description="How the portal presents university decisions."
    >
      <ul className="space-y-3">
        {notes.map((note) => (
          <li key={note.title} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
              <PortalIcon
                icon={note.icon}
                className="size-4"
                strokeWidth={2.3}
              />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-navy-950">
                {note.title}
              </p>
              <p className="mt-0.5 text-[10.5px] leading-[16px] text-slate-500">
                {note.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 border-t border-portal-line/80 pt-3 text-[9.5px] leading-[15px] text-slate-400">
        Clearance requirements, amounts, deadlines, verdicts, and eligibility
        are controlled by Godfrey Okoye University.
      </p>
    </SectionCard>
  );
}
