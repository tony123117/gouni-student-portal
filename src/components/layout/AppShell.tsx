import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { PortalBackdrop } from '@/components/layout/PortalBackdrop';
import { SupportBar } from '@/components/layout/SupportBar';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { Sidebar } from '@/components/navigation/Sidebar';

export function AppShell() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const location = useLocation();
  const closeNavigation = useCallback(() => setIsNavigationOpen(false), []);
  const openNavigation = useCallback(() => setIsNavigationOpen(true), []);

  useEffect(() => {
    closeNavigation();
  }, [location.pathname, closeNavigation]);

  return (
    <div className="min-h-screen bg-portal-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-900 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-navy-600"
      >
        Skip to main content
      </a>

      <aside
        aria-label="Primary navigation sidebar"
        className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block"
      >
        <Sidebar />
      </aside>

      <MobileNavigation
        open={isNavigationOpen}
        onClose={closeNavigation}
      />

      <div className="flex min-h-screen flex-col lg:pl-[264px]">
        <Header
          isNavigationOpen={isNavigationOpen}
          onOpenNavigation={openNavigation}
        />

        <main
          id="main-content"
          tabIndex={-1}
          className="relative flex flex-1 flex-col overflow-hidden"
        >
          <PortalBackdrop />

          <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-3.5 pb-[84px] pt-3 sm:px-6 sm:pt-4 lg:px-10 lg:pb-7 lg:pt-8">
            <div className="flex-1">
              <Outlet />
            </div>
            <SupportBar />
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
