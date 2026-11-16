import { Bell, BellOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PortalIcon } from '@/components/shared/PortalIcon';

export function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="notification-menu"
        aria-label={isOpen ? 'Close notifications' : 'Open notifications'}
        className="relative inline-flex size-10 items-center justify-center rounded-lg text-navy-900 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
      >
        <PortalIcon icon={Bell} className="size-5" strokeWidth={2.15} />
      </button>

      {isOpen ? (
        <div
          id="notification-menu"
          aria-label="Notifications"
          className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-portal-line bg-white shadow-[0_10px_30px_rgba(5,36,85,0.12)]"
        >
          <div className="flex items-center justify-between border-b border-portal-line px-3.5 py-2.5">
            <p className="text-[14px] font-bold text-navy-950">Notifications</p>
          </div>
          <div className="flex flex-col items-center px-4 py-6 text-center">
            <span className="flex size-10 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
              <PortalIcon icon={BellOff} className="size-5" />
            </span>
            <p className="mt-2.5 text-[13.5px] font-bold text-navy-950">
              No notifications
            </p>
            <p className="mt-1 text-[11.5px] leading-[18px] text-slate-500">
              New notifications will appear here when they are available.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
