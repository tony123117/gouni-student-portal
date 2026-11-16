import { Megaphone } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import type {
  AcademicUpdate,
  AcademicUpdateCategory,
} from '../types/dashboard';

const categoryDetails: Record<
  AcademicUpdateCategory,
  { label: string; variant: BadgeVariant }
> = {
  announcement: { label: 'Announcement', variant: 'navy' },
  reminder: { label: 'Reminder', variant: 'warning' },
  guidance: { label: 'Guidance', variant: 'neutral' },
};

interface AnnouncementsCardProps {
  updates: AcademicUpdate[];
}

export function AnnouncementsCard({ updates }: AnnouncementsCardProps) {
  return (
    <SectionCard
      title="Announcements"
      bodyClassName="flex flex-col px-4 py-3.5 sm:px-5 sm:py-4"
    >
      {updates.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
          <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
            <PortalIcon icon={Megaphone} className="size-[22px]" duotone />
          </span>
          <p className="mt-3 text-[14px] font-bold text-navy-950">
            No announcements
          </p>
          <p className="mt-1 max-w-xs text-[12px] leading-[18px] text-slate-500">
            University announcements will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-portal-line/70">
          {updates.map((update) => {
            const category = categoryDetails[update.category];

            return (
              <li key={update.id} className="flex items-start gap-3 py-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
                  <PortalIcon icon={Megaphone} className="size-[17px]" duotone />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="text-[13px] font-bold leading-[18px] text-navy-950">
                      {update.title}
                    </h3>
                    <Badge variant={category.variant}>{category.label}</Badge>
                  </div>
                  <p className="mt-1 text-[11px] leading-[18px] text-slate-500">
                    {update.summary}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
