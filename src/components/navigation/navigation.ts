import {
  BookOpen,
  Building2,
  CalendarCheck,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FilePlus2,
  History,
  LayoutDashboard,
  Upload,
  User,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/constants';

export interface NavigationChild {
  label: string;
  to: string;
  icon: LucideIcon;
  duotone?: boolean;
}

export interface NavigationItem {
  label: string;
  icon: LucideIcon;
  to?: string;
  children?: NavigationChild[];
  duotone?: boolean;
}

export interface NavigationTarget {
  label: string;
  to: string;
  group?: string;
}

export const primaryNavigation: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: ROUTES.dashboard,
    duotone: true,
  },
  {
    label: 'Payments',
    icon: Wallet,
    duotone: true,
    children: [
      { label: 'Payment History', to: ROUTES.paymentHistory, icon: History },
      {
        label: 'Generate Invoice',
        to: ROUTES.generateInvoice,
        icon: FilePlus2,
        duotone: true,
      },
      { label: 'Upload Teller', to: ROUTES.uploadTeller, icon: Upload },
    ],
  },
  {
    label: 'Course Registration',
    icon: BookOpen,
    to: ROUTES.courseRegistration,
    duotone: true,
  },
  {
    label: 'Results',
    icon: ChartNoAxesColumnIncreasing,
    to: ROUTES.results,
  },
  {
    label: 'Exam Clearance',
    icon: ClipboardCheck,
    to: ROUTES.examClearance,
    duotone: true,
  },
  {
    label: 'Hostel',
    icon: Building2,
    duotone: true,
    children: [
      {
        label: 'Hostel Booking',
        to: ROUTES.hostelBooking,
        icon: CalendarCheck,
        duotone: true,
      },
      { label: 'Hostel History', to: ROUTES.hostelHistory, icon: History },
    ],
  },
  {
    label: 'Account',
    icon: User,
    to: ROUTES.account,
    duotone: true,
  },
];

export function isPathActive(pathname: string, to: string): boolean {
  if (to === ROUTES.dashboard) {
    return pathname === ROUTES.dashboard;
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

export function getNavigationTargets(): NavigationTarget[] {
  return primaryNavigation.flatMap((item) => {
    if (item.to) {
      return [{ label: item.label, to: item.to }];
    }

    return (
      item.children?.map((child) => ({
        label: child.label,
        to: child.to,
        group: item.label,
      })) ?? []
    );
  });
}
