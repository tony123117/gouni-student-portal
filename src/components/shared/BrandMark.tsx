import { Link } from 'react-router-dom';
import { APP_NAME, ROUTES } from '@/constants';

const UNIVERSITY_LOGO = '/logo/gouni-logo.png';

type BrandVariant = 'sidebar' | 'header';

interface BrandMarkProps {
  onNavigate?: () => void;
  variant?: BrandVariant;
}

export function BrandMark({
  onNavigate,
  variant = 'header',
}: BrandMarkProps) {
  const isSidebar = variant === 'sidebar';

  return (
    <Link
      to={ROUTES.dashboard}
      onClick={onNavigate}
      aria-label={`${APP_NAME} home`}
      className={`group flex min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${
        isSidebar
          ? 'flex-col items-center text-center focus-visible:ring-offset-navy-950'
          : 'items-center gap-2.5 focus-visible:ring-offset-white'
      }`}
    >
      {isSidebar ? (
        <>
          <img
            src={UNIVERSITY_LOGO}
            alt=""
            width={177}
            height={177}
            draggable={false}
            className="size-[58px] shrink-0 object-contain"
          />
          <span className="mt-2 min-w-0">
            <span className="block text-[17.5px] font-extrabold leading-[1.22] tracking-[-0.022em] text-white">
              Godfrey Okoye
              <br />
              University
            </span>
            <span className="mt-2.5 flex items-center justify-center gap-2">
              <span
                aria-hidden="true"
                className="h-px w-4 bg-gold-400/80"
              />
              <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-gold-200">
                Student Portal
              </span>
              <span
                aria-hidden="true"
                className="h-px w-4 bg-gold-400/80"
              />
            </span>
          </span>
        </>
      ) : (
        <>
          <img
            src={UNIVERSITY_LOGO}
            alt=""
            width={177}
            height={177}
            draggable={false}
            className="size-8 shrink-0 object-contain sm:size-9"
          />
          <span className="min-w-0">
            <span className="block text-[15px] font-extrabold leading-[1.16] tracking-[-0.02em] text-navy-950 sm:text-[16px]">
              Godfrey Okoye
              <br />
              University
            </span>
            <span className="mt-1 block text-[7.5px] font-bold uppercase tracking-[0.2em] text-navy-600">
              Student Portal
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
