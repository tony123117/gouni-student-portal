import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { ROUTES } from '@/constants';
import {
  isPathActive,
  primaryNavigation,
  type NavigationItem,
} from './navigation';

type SidebarNavVariant = 'sidebar' | 'mobile';

interface SidebarNavProps {
  onNavigate?: () => void;
  variant?: SidebarNavVariant;
}

function getGroupId(variant: SidebarNavVariant, label: string): string {
  return `${variant}-nav-group-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function getActiveGroupLabel(pathname: string): string | undefined {
  return primaryNavigation.find((item) =>
    item.children?.some((child) => isPathActive(pathname, child.to)),
  )?.label;
}

export function SidebarNav({
  onNavigate,
  variant = 'sidebar',
}: SidebarNavProps) {
  const { pathname } = useLocation();
  const isMobile = variant === 'mobile';
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(
    () => new Set(['Payments', 'Hostel']),
  );

  useEffect(() => {
    const activeGroupLabel = getActiveGroupLabel(pathname);

    if (!activeGroupLabel) {
      return;
    }

    setOpenGroups((current) => {
      if (current.has(activeGroupLabel)) {
        return current;
      }

      const next = new Set(current);
      next.add(activeGroupLabel);
      return next;
    });
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setOpenGroups((current) => {
      const next = new Set(current);

      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }

      return next;
    });
  };

  const itemClassName = (isActive: boolean, isGroup = false) =>
    `relative flex items-center gap-3 rounded-lg px-3 text-[14.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
      isMobile ? 'min-h-[44px]' : 'min-h-[50px]'
    } ${
      isMobile
        ? isActive
          ? 'bg-portal-sky font-bold text-navy-950 focus-visible:ring-navy-600'
          : 'font-semibold text-navy-800 hover:bg-portal-sky/70 focus-visible:ring-navy-600'
        : isActive
          ? isGroup
            ? 'bg-white/[0.06] font-bold text-white focus-visible:ring-gold-400/80'
            : 'bg-[#0b449c] font-bold text-white shadow-[0_10px_22px_rgba(2,22,50,0.25)] focus-visible:ring-gold-400/80'
          : 'font-semibold text-[#e8f0fb] hover:bg-white/[0.07] hover:text-white focus-visible:ring-gold-400/80'
    }`;

  const iconClassName = (isActive: boolean) =>
    `size-5 shrink-0 ${
      isMobile
        ? isActive
          ? 'text-navy-950'
          : 'text-navy-700'
        : isActive
          ? 'text-gold-300'
          : 'text-navy-200'
    }`;

  const renderDirectLink = (item: NavigationItem) => {
    if (!item.to) {
      return null;
    }

    const Icon = item.icon;

    return (
      <NavLink
        key={item.label}
        to={item.to}
        end={item.to === ROUTES.dashboard}
        onClick={onNavigate}
        className={({ isActive }) => itemClassName(isActive)}
      >
        {({ isActive }) => (
          <>
            {isActive ? (
              <span
                aria-hidden="true"
                className="absolute inset-y-1.5 -left-1.5 w-[5px] rounded-full bg-gold-400"
              />
            ) : null}
            <PortalIcon
              icon={Icon}
              className={iconClassName(isActive)}
              strokeWidth={item.duotone ? 2.2 : 2.5}
              duotone={item.duotone}
            />
            <span className="truncate">{item.label}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <nav
      aria-label={isMobile ? 'Mobile navigation' : 'Primary navigation'}
      className="flex flex-col gap-1"
    >
      {primaryNavigation.map((item) => {
        if (!item.children) {
          return renderDirectLink(item);
        }

        const Icon = item.icon;
        const isOpen = openGroups.has(item.label);
        const isGroupActive = item.children.some((child) =>
          isPathActive(pathname, child.to),
        );

        return (
          <div key={item.label}>
            <button
              type="button"
              onClick={() => toggleGroup(item.label)}
              aria-expanded={isOpen}
              aria-controls={getGroupId(variant, item.label)}
              className={`${itemClassName(isGroupActive, true)} w-full text-left`}
            >
              {isGroupActive ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1.5 -left-1.5 w-[5px] rounded-full bg-gold-400"
                />
              ) : null}
              <PortalIcon
                icon={Icon}
                className={iconClassName(isGroupActive)}
                strokeWidth={item.duotone ? 2.2 : 2.5}
                duotone={item.duotone}
              />
              <span className="flex-1 truncate">{item.label}</span>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={2.2}
                className={`size-4 shrink-0 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                } ${
                  isMobile
                    ? isGroupActive
                      ? 'text-navy-800'
                      : 'text-slate-500'
                    : isGroupActive
                      ? 'text-gold-300'
                      : 'text-navy-300'
                }`}
              />
            </button>

            {isOpen ? (
              <div
                id={getGroupId(variant, item.label)}
                className={`ml-4 mt-1 space-y-1 border-l pl-4 ${
                  isMobile ? 'border-portal-line' : 'border-white/10'
                }`}
              >
                {item.children.map((child) => {
                  const ChildIcon = child.icon;

                  return (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `flex min-h-[34px] items-center gap-2.5 rounded-md px-2 py-1.5 text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
                          isMobile
                            ? isActive
                              ? 'bg-portal-sky font-semibold text-navy-950 focus-visible:ring-navy-600'
                              : 'font-medium text-slate-600 hover:bg-portal-surface hover:text-navy-900 focus-visible:ring-navy-600'
                            : isActive
                              ? 'bg-white/[0.1] font-semibold text-gold-200 focus-visible:ring-gold-400/80'
                              : 'font-medium text-navy-200/85 hover:bg-white/[0.05] hover:text-white focus-visible:ring-gold-400/80'
                        }`
                      }
                    >
                      <PortalIcon
                        icon={ChildIcon}
                        className={`size-4 shrink-0 ${
                          isMobile ? 'text-navy-600' : 'text-navy-300'
                        }`}
                        strokeWidth={child.duotone ? 2.1 : 2.4}
                        duotone={child.duotone}
                      />
                      <span className="truncate">{child.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
