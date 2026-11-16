import { BrandMark } from '@/components/shared/BrandMark';
import { SidebarNav } from './SidebarNav';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="relative h-full overflow-hidden bg-navy-950">
      {/* Layered navy, gold, and pale-blue curves at the foot of the sidebar. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[280px] -left-[190px] size-[460px] rounded-full border-[70px] border-gold-400/65"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[170px] -left-[80px] size-[290px] rounded-full bg-[#dce8f8]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[130px] -right-[90px] size-[260px] rounded-full bg-[#0a3b7c]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[40px] -right-[30px] size-[150px] rounded-full border-[24px] border-white/[0.05]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950/45 to-transparent"
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 justify-center px-4 pb-6 pt-7">
          <BrandMark variant="sidebar" onNavigate={onNavigate} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-2.5">
          <SidebarNav onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
