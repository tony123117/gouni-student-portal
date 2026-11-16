import { ChevronDown, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { ROUTES } from '@/constants';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
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
    <div ref={menuRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="account-menu"
        aria-label={isOpen ? 'Close account menu' : 'Open account menu'}
        className="flex items-center gap-2.5 rounded-md py-1 pl-1 pr-1.5 text-left transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
          <PortalIcon icon={User} className="size-[21px]" duotone />
        </span>
        <span className="hidden min-w-0 lg:block">
          <span className="block max-w-44 truncate text-[15px] font-bold leading-4 text-navy-950">
            Student account
          </span>
          <span className="mt-1.5 block max-w-44 truncate text-[11px] font-medium leading-3 text-slate-500">
            Profile unavailable
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={2.2}
          className={`hidden size-[17px] text-navy-700 transition-transform lg:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen ? (
        <div
          id="account-menu"
          aria-label="Account menu"
          className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-portal-line bg-white shadow-[0_10px_30px_rgba(5,36,85,0.12)]"
        >
          <div className="border-b border-portal-line bg-portal-surface px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
                <PortalIcon icon={User} className="size-[21px]" duotone />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold text-navy-950">
                  Student account
                </p>
                <p className="mt-0.5 truncate text-[11.5px] font-medium text-slate-500">
                  Profile details unavailable
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">
              Your profile information will appear here when it is available.
            </p>
          </div>

          <div className="p-1.5">
            <Link
              to={ROUTES.account}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13.5px] font-semibold text-navy-800 transition-colors hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
            >
              <PortalIcon icon={User} className="size-[17px] text-navy-600" />
              Account
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
