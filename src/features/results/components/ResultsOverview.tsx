import {
  BadgeCheck,
  BookOpen,
  CircleCheckBig,
  CircleX,
  GraduationCap,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { ResultsSummary } from '../types/results';
import { formatSuppliedNumber } from '../utils/format';

type SummaryNumberKey =
  | 'semesterGpa'
  | 'cumulativeGpa'
  | 'registeredCreditUnits'
  | 'earnedCreditUnits'
  | 'passedCourses'
  | 'failedCourses';

interface SummaryItem {
  key: SummaryNumberKey;
  label: string;
  detail: string;
  icon: LucideIcon;
  duotone?: boolean;
}

const summaryItems: SummaryItem[] = [
  {
    key: 'semesterGpa',
    label: 'Semester GPA',
    detail: 'As supplied by the university',
    icon: GraduationCap,
    duotone: true,
  },
  {
    key: 'cumulativeGpa',
    label: 'Cumulative GPA',
    detail: 'As supplied by the university',
    icon: TrendingUp,
  },
  {
    key: 'registeredCreditUnits',
    label: 'Registered units',
    detail: 'This period',
    icon: BookOpen,
  },
  {
    key: 'earnedCreditUnits',
    label: 'Earned units',
    detail: 'This period',
    icon: BadgeCheck,
  },
  {
    key: 'passedCourses',
    label: 'Passed courses',
    detail: 'This period',
    icon: CircleCheckBig,
  },
  {
    key: 'failedCourses',
    label: 'Failed courses',
    detail: 'This period',
    icon: CircleX,
  },
];

interface ResultsOverviewProps {
  summary: ResultsSummary | null;
}

/**
 * Displays only figures returned by the university. The portal never derives
 * GPA, CGPA, unit totals, pass/fail counts, outstanding courses, or standing.
 */
export function ResultsOverview({ summary }: ResultsOverviewProps) {
  const outstanding = summary?.outstandingCourses ?? null;
  const standing = summary?.academicStanding?.trim()
    ? summary.academicStanding
    : null;

  return (
    <section aria-label="Performance overview" className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6 xl:gap-3">
        {summaryItems.map((item) => {
          const value = summary?.[item.key] ?? null;
          const isUnavailable = value === null;

          return (
            <div
              key={item.key}
              className="flex min-h-[96px] items-center gap-2.5 rounded-2xl border border-portal-line/90 bg-white px-3 py-3 shadow-[0_2px_12px_rgba(5,42,94,0.035)] xl:gap-2 xl:px-3 xl:py-3.5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] via-[#e9f1fc] to-[#dfeafa] text-navy-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70 xl:size-9">
                <PortalIcon
                  icon={item.icon}
                  className="size-[18px] xl:size-[17px]"
                  strokeWidth={item.duotone ? 2.2 : 2.5}
                  duotone={item.duotone}
                />
              </span>
              <div className="min-w-0">
                <p className="text-[10.5px] font-bold leading-[14px] tracking-[0.005em] text-navy-700 xl:text-[10px] xl:leading-[13px]">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[20px] font-extrabold leading-6 tracking-[-0.02em] text-navy-950 xl:text-[22px]">
                  {formatSuppliedNumber(value)}
                </p>
                <p className="mt-0.5 text-[9.5px] font-medium leading-[13px] text-slate-500 xl:text-[10px]">
                  {isUnavailable ? 'Not supplied' : item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-portal-line/90 bg-white px-3.5 py-2.5 shadow-[0_1px_8px_rgba(5,42,94,0.03)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <p className="text-[10.5px] font-medium text-slate-500">
            Outstanding courses{' '}
            <span className="ml-1 font-bold text-navy-950">
              {outstanding === null
                ? 'Unavailable'
                : formatSuppliedNumber(outstanding)}
            </span>
          </p>
          <span
            aria-hidden="true"
            className="hidden h-3.5 w-px bg-portal-line sm:block"
          />
          <p className="text-[10.5px] font-medium text-slate-500">
            Academic standing{' '}
            <span className="ml-1 font-bold text-navy-950">
              {standing ?? 'Unavailable'}
            </span>
          </p>
        </div>
        <p className="text-[9.5px] font-medium text-slate-400">
          Values are supplied by the university
        </p>
      </div>
    </section>
  );
}
