import type { ReactNode } from 'react';

export type BadgeVariant =
  | 'neutral'
  | 'navy'
  | 'gold'
  | 'warning'
  | 'success';

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'border-portal-line bg-portal-surface text-slate-600',
  navy: 'border-navy-200 bg-navy-50 text-navy-800',
  gold: 'border-gold-300/70 bg-gold-50 text-gold-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold leading-4 whitespace-nowrap ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
