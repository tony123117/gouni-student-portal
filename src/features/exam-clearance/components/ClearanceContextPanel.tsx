import { GraduationCap } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import type { ClearanceAcademicContext } from '../types/exam-clearance';

interface ClearanceContextPanelProps {
  context: ClearanceAcademicContext | null;
}

interface ContextItemProps {
  label: string;
  value: string | null;
  wide?: boolean;
}

function ContextItem({ label, value, wide = false }: ContextItemProps) {
  const supplied = Boolean(value?.trim());

  return (
    <div className={wide ? 'min-w-0 sm:col-span-2' : 'min-w-0'}>
      <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-[11.5px] font-semibold leading-[17px] ${
          supplied ? 'text-navy-950' : 'font-medium text-slate-400'
        }`}
      >
        {supplied ? value : 'Not supplied'}
      </dd>
    </div>
  );
}

export function ClearanceContextPanel({ context }: ClearanceContextPanelProps) {
  return (
    <SectionCard
      title="Academic context"
      description="Student and programme details supplied by the university."
    >
      {context ? (
        <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          <ContextItem
            label="Academic session"
            value={context.academicSession}
          />
          <ContextItem label="Semester" value={context.semester} />
          <ContextItem
            label="Student"
            value={context.student?.fullName ?? null}
            wide
          />
          <ContextItem
            label="Matriculation number"
            value={context.student?.matriculationNumber ?? null}
          />
          <ContextItem label="Programme" value={context.programme} />
          <ContextItem label="Department" value={context.department} />
          <ContextItem label="Faculty" value={context.faculty} />
          <ContextItem label="Level" value={context.level} />
        </dl>
      ) : (
        <div className="flex items-start gap-2.5 rounded-xl border border-portal-line/80 bg-portal-surface/50 px-3.5 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy-700 ring-1 ring-portal-line">
            <PortalIcon
              icon={GraduationCap}
              className="size-[18px]"
              strokeWidth={2.2}
              duotone
            />
          </span>
          <div className="min-w-0">
            <p className="text-[11.5px] font-bold text-navy-950">
              Academic context unavailable
            </p>
            <p className="mt-0.5 text-[10.5px] leading-[16px] text-slate-500">
              Student, programme, department, faculty, level, and academic
              period details will appear when the university supplies them.
            </p>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
