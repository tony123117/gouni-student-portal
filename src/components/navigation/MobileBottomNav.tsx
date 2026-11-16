import {
  ChartNoAxesColumnIncreasing,
  House,
  User,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { ROUTES } from '@/constants';
import { isPathActive } from './navigation';

interface MobileNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  isActive: (pathname: string) => boolean;
  duotone?: boolean;
}

const mobileNavigation: MobileNavItem[] = [
  {
    label: 'Home',
    to: ROUTES.dashboard,
    icon: House,
    isActive: (pathname) => pathname === ROUTES.dashboard,
    duotone: true,
  },
  {
    label: 'Payments',
    to: ROUTES.paymentHistory,
    icon: Wallet,
    isActive: (pathname) => isPathActive(pathname, ROUTES.payments),
    duotone: true,
  },
  {
    label: 'Results',
    to: ROUTES.results,
    icon: ChartNoAxesColumnIncreasing,
    isActive: (pathname) => isPathActive(pathname, ROUTES.results),
  },
  {
    label: 'Account',
    to: ROUTES.account,
    icon: User,
    isActive: (pathname) => isPathActive(pathname, ROUTES.account),
    duotone: true,
  },
];

export function MobileBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-portal-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_18px_rgba(5,42,94,0.06)] lg:hidden"
    >
      <div className="mx-auto grid h-[72px] max-w-md grid-cols-4">
        {mobileNavigation.map((item) => {
          const active = item.isActive(pathname);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.to}
              aria-current={active ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center gap-1 text-[12px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-600 ${
                active
                  ? 'text-navy-950'
                  : 'text-slate-500 hover:text-navy-800'
              }`}
            >
              <PortalIcon
                icon={Icon}
                className={`size-[23px] ${
                  active ? 'text-navy-950' : 'text-slate-500'
                }`}
                strokeWidth={
                  item.duotone ? (active ? 2.35 : 2.15) : active ? 2.55 : 2.4
                }
                duotone={item.duotone}
              />
              {item.label}
              {active ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 h-[3px] w-9 rounded-t-full bg-gold-400"
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
