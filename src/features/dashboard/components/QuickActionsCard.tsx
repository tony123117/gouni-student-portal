import {
  BookOpen,
  Building2,
  ChartNoAxesColumnIncreasing,
  Upload,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import { ROUTES } from '@/constants';

interface QuickAction {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
  duotone?: boolean;
}

const quickActions: QuickAction[] = [
  {
    label: 'Register courses',
    description: 'Review registration status',
    to: ROUTES.courseRegistration,
    icon: BookOpen,
    duotone: true,
  },
  {
    label: 'View results',
    description: 'Open your result records',
    to: ROUTES.results,
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    label: 'Upload teller',
    description: 'Submit payment evidence',
    to: ROUTES.uploadTeller,
    icon: Upload,
  },
  {
    label: 'Book hostel',
    description: 'Review accommodation options',
    to: ROUTES.hostelBooking,
    icon: Building2,
    duotone: true,
  },
];

export function QuickActionsCard() {
  return (
    <SectionCard
      title="Quick Actions"
      bodyClassName="flex flex-1 flex-col p-4 sm:p-5"
    >
      <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-3.5">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              to={action.to}
              className="group flex min-h-[118px] flex-col items-center justify-center gap-2.5 rounded-xl border border-[#dfe9f7] bg-[#eaf2fc] px-2.5 py-4 text-center transition-colors hover:border-navy-200 hover:bg-[#e2edfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 sm:min-h-[126px]"
            >
              <PortalIcon
                icon={Icon}
                className="size-[27px] text-navy-950"
                strokeWidth={action.duotone ? 2.2 : 2.5}
                duotone={action.duotone}
              />
              <span className="text-[13.5px] font-bold leading-[1.2] text-navy-950">
                {action.label}
              </span>
              <span className="hidden text-[10.5px] font-medium leading-[1.35] text-slate-500 sm:block">
                {action.description}
              </span>
            </Link>
          );
        })}
      </div>
    </SectionCard>
  );
}
