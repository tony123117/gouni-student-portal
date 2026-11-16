import { Menu } from 'lucide-react';
import { BrandMark } from '@/components/shared/BrandMark';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { NotificationMenu } from '@/components/navigation/NotificationMenu';
import { PortalSearch } from '@/components/navigation/PortalSearch';
import { UserMenu } from '@/components/navigation/UserMenu';

interface HeaderProps {
  isNavigationOpen: boolean;
  onOpenNavigation: () => void;
}

export function Header({
  isNavigationOpen,
  onOpenNavigation,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-portal-line bg-white shadow-[0_1px_0_rgba(5,42,94,0.02)]">
      <div className="flex h-[70px] items-center justify-between gap-3 px-3.5 sm:h-[80px] sm:px-6 lg:h-[104px] lg:gap-8 lg:px-10">
        <div className="flex min-w-0 items-center lg:hidden">
          <BrandMark />
        </div>

        <div className="hidden min-w-0 flex-1 items-center lg:flex">
          <PortalSearch />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:gap-5">
          <NotificationMenu />

          <span
            aria-hidden="true"
            className="hidden h-9 w-px bg-portal-line lg:block"
          />

          <div className="hidden lg:block">
            <UserMenu />
          </div>

          <button
            type="button"
            onClick={onOpenNavigation}
            aria-label="Open navigation menu"
            aria-expanded={isNavigationOpen}
            aria-controls="mobile-navigation"
            className="inline-flex size-11 items-center justify-center rounded-lg text-navy-950 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 lg:hidden"
          >
            <PortalIcon icon={Menu} className="size-[22px] text-navy-950" />
          </button>
        </div>
      </div>
    </header>
  );
}
