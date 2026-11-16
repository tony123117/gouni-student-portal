import { User, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { BrandMark } from '@/components/shared/BrandMark';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { PortalSearch } from './PortalSearch';
import { SidebarNav } from './SidebarNav';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({
  open,
  onClose,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    // Move focus into the drawer after capturing the trigger element so
    // closing the drawer can restore focus correctly.
    panelRef.current
      ?.querySelector<HTMLElement>('[data-drawer-close]')
      ?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close navigation menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy-950/55"
      />
      <div
        id="mobile-navigation"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Student menu"
        className="absolute inset-y-0 left-0 flex w-[20rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden bg-white shadow-[0_16px_40px_rgba(5,36,85,0.22)]"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-portal-line px-3.5 py-3.5">
          <BrandMark onNavigate={onClose} />
          <button
            type="button"
            onClick={onClose}
            data-drawer-close
            aria-label="Close navigation menu"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-navy-800 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <PortalIcon icon={X} className="size-[18px]" />
          </button>
        </div>

        <div className="shrink-0 border-b border-portal-line bg-portal-surface px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
              <PortalIcon icon={User} className="size-[19px]" duotone />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-bold text-navy-950">
                Student account
              </p>
              <p className="truncate text-[10.5px] font-medium text-slate-500">
                Profile details unavailable
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-b border-portal-line px-3.5 py-2">
          <PortalSearch idPrefix="mobile" onNavigate={onClose} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2.5 py-2.5">
          <SidebarNav variant="mobile" onNavigate={onClose} />
        </div>

        <div className="shrink-0 border-t border-portal-line px-3.5 py-3.5 text-[10.5px] leading-[18px] text-slate-500">
          <p className="font-semibold text-navy-900">Need help?</p>
          <p className="mt-0.5">Contact the ICT Help Desk.</p>
        </div>
      </div>
    </div>
  );
}
