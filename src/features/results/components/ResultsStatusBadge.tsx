import type { ResultStatus, ResultStatusTone } from '../types/results';

const toneClasses: Record<ResultStatusTone, string> = {
  neutral: 'border-navy-200 bg-navy-50 text-navy-800',
  positive: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-gold-300/70 bg-gold-50 text-gold-800',
  critical: 'border-rose-200 bg-rose-50 text-rose-700',
};

const dotClasses: Record<ResultStatusTone, string> = {
  neutral: 'bg-navy-500',
  positive: 'bg-emerald-500',
  warning: 'bg-gold-500',
  critical: 'bg-rose-500',
};

interface ResultsStatusBadgeProps {
  status: ResultStatus;
  className?: string;
}

/**
 * Renders a university-supplied status label exactly as returned. Unknown
 * tones stay neutral; the portal never assigns its own meaning to a label.
 */
export function ResultsStatusBadge({
  status,
  className = '',
}: ResultsStatusBadgeProps) {
  const tone = status.tone ?? 'neutral';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold leading-4 whitespace-nowrap ${toneClasses[tone]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${dotClasses[tone]}`}
      />
      {status.label}
    </span>
  );
}
