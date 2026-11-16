# GOUNI Student Portal

Frontend for the **Godfrey Okoye University Student Portal**. This build
contains the responsive application shell and a production-style student
dashboard. Authentication, live university integrations, payments, and the
remaining feature modules have not been implemented yet, so unavailable
information is presented through loading, empty, and error states rather than
invented student records.

## Technology stack

| Package | Version | Purpose |
| --- | --- | --- |
| React / React DOM | 19.3.x | UI runtime |
| TypeScript | 7.0.x | Strict static typing |
| Vite | 8.3.x | Development server and production build |
| Tailwind CSS | 4.3.x | Styling via `@tailwindcss/vite` |
| React Router DOM | 7.18.x | Client-side routing |
| TanStack Query | 5.107.x | Server-state provider |
| Axios | 1.21.x | University API client |
| React Hook Form | 7.92.x | Form state |
| Zod | 4.6.x | Schema validation |
| Lucide React | 1.72.x | Icons |
| Recharts | 3.10.x | Charts |
| Supabase JS | 2.119.x | Optional Supabase integration |

Exact resolved versions are recorded in `package-lock.json`.

## Getting started

```bash
cd gouni-student-portal
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

The app starts with empty environment variables. Supabase access fails with a
clear, actionable error only when a service requests the client; missing
configuration never crashes application startup.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run typecheck` | Run TypeScript strict checks |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |

## Environment variables

Copy `.env.example` to `.env` and fill values only when available.

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public/anonymous key |
| `VITE_API_BASE_URL` | University backend base URL |
| `VITE_USE_MOCK_API` | `true` uses mock service adapters; `false` uses live services |

Only variables prefixed with `VITE_` reach the browser. Never place the
Supabase service role key in this project or any other frontend environment
file. Use only the public anonymous key.

## Architecture

```text
public/
├── images/                  Static images
└── logo/                    Brand assets

src/
├── app/                     Application composition
│   ├── router/              Route configuration
│   ├── providers/           TanStack Query and future app providers
│   └── App.tsx
├── assets/                  Bundled images and icons
├── components/
│   ├── ui/                  Reusable UI primitives
│   ├── layout/              AppShell and structural layouts
│   ├── navigation/          Header/sidebar navigation
│   ├── forms/               Shared form components
│   └── shared/              Cross-feature components
├── features/                One folder per domain
│   ├── auth/
│   ├── dashboard/
│   ├── payments/
│   ├── course-registration/
│   ├── results/
│   ├── exam-clearance/
│   ├── hostel/
│   └── account/
│       Each feature reserves components/, hooks/, services/, types/, and
│       validation/ for implementation.
├── services/
│   ├── api/                 University HTTP client (Axios)
│   ├── mock/                Temporary mock implementations
│   ├── adapters/            Mock/live selection via environment
│   └── supabase/            Supabase-specific operations
├── hooks/                   Cross-feature hooks
├── contexts/                Cross-feature React contexts
├── types/                   Shared TypeScript types
├── utils/                   Framework-agnostic helpers
├── constants/               Application constants
├── config/                  Environment and Supabase configuration
└── styles/                  Global Tailwind CSS
```

### Service boundaries

- **University backend:** `src/services/api/` owns the Axios client and reads
  `VITE_API_BASE_URL`. No endpoints are invented before the university
  integration contract is available.
- **Supabase:** `src/config/supabase.ts` creates one lazy, public-key client.
  Domain operations belong in `src/services/supabase/`; components must not
  import the client directly.
- **Development fallback:** `src/services/mock/` holds local adapters that
  satisfy the same contracts as live services. The dashboard fallback returns
  an unavailable snapshot with no student identity or records, so the UI only
  renders empty states. UI code is never coupled to mock data.
- **Switching implementations:** `selectAdapter` in
  `src/services/adapters/index.ts` chooses the mock or live factory based on
  `VITE_USE_MOCK_API`. Features own the contracts and both implementations.

The dashboard feature is implemented under `src/features/dashboard/` with
components, a query hook, service contract, and types. The remaining feature
folders still contain placeholders only. All non-dashboard routes render a
student-facing empty state rather than a working module.

### Interface shell

- **Desktop:** a fixed deep-navy sidebar with a restrained university wordmark,
  expandable Payments and Hostel menus, and a gold active indicator. The white
  topbar contains page search over the existing routes, notifications, and a
  neutral account menu.
- **Dashboard:** a compact welcome panel, four overview tiles (payment,
  registration, latest result, exam clearance), Announcements beside Quick
  Actions, then Payment Summary and Course Registration. Recent payment
  activity remains below. Sections render empty states whenever records are
  unavailable.
- **Mobile:** a compact branded header with notification and menu controls, a
  navy welcome panel, vertically stacked content, and a four-item bottom
  navigation (Home, Payments, Results, Account). Page search, account context,
  and remaining links live in the drawer rather than a shrunken desktop
  sidebar.
- **Design tokens:** `src/styles/index.css` defines the royal-navy, muted-gold,
  and pale portal surfaces/lines used across the shell, dashboard, and module
  pages.

The search field navigates between implemented routes only; it does not request
university records. The notification panel shows an empty state until a live
notification service is available.

## Scope and next steps

- The existing university backend remains the production source of truth; no
  competing student database or schema has been created.
- Supabase schema, row-level security, and authentication strategy will be
  decided after reviewing requirements and the university's backend.
- No student records, successful transactions, credentials, or API endpoints
  are included. Unavailable dashboard data is represented by empty states, and
  a load failure shows a retryable error state.
- The shell and dashboard are the only implemented UI. Every other navigation
  destination shows an empty state until that module is authorized and built.
