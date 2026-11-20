# GOUNI Student Portal

Frontend for the **Godfrey Okoye University Student Portal**. This build
contains the responsive application shell, dashboard, payment-history,
invoice-generation, teller-upload, course-registration, academic-results, and
exam-clearance experiences. Authentication and live university integrations
have not been implemented yet, and hostel and account remain placeholders, so
unavailable information is presented through loading, empty, and error states
rather than invented student records.

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
  satisfy the same contracts as live services. The dashboard, payment,
  registration, results, and exam-clearance fallbacks return unavailable
  snapshots with no student identity, records, scores, grades, requirements,
  amounts, deadlines, documents, or clearance verdicts, so the UI only renders
  empty states. UI code is never coupled to mock data.
- **Switching implementations:** `selectAdapter` in
  `src/services/adapters/index.ts` chooses the mock or live factory based on
  `VITE_USE_MOCK_API`. Features own the contracts and both implementations.

The dashboard feature is implemented under `src/features/dashboard/`. Payment
History, Generate Invoice, and Upload Teller are implemented under
`src/features/payments/`, Course Registration under
`src/features/course-registration/`, Academic Results under
`src/features/results/`, and Exam Clearance under
`src/features/exam-clearance/`. Each feature owns its components, query hooks,
typed service contract, and mock/live adapters. Hostel and Account still
contain placeholders only.

### Implemented modules

| Route | Module | Live data status |
| --- | --- | --- |
| `/` | Dashboard | University API not connected; unavailable states |
| `/payments/history` | Payment History | University API not connected; unavailable states |
| `/payments/generate-invoice` | Generate Invoice | University API not connected; unavailable states |
| `/payments/upload-teller` | Upload Teller | University evidence contract not connected; submissions fail honestly |
| `/course-registration` | Course Registration | University registration contract not connected; unavailable states |
| `/results` | Academic Results | University results contract not connected; unavailable states |
| `/exam-clearance` | Exam Clearance | University clearance contract not connected; unavailable states |

Course Registration renders only the academic term, student details,
eligibility, catalogue, credit-unit rules, statuses, and history supplied by
the service. Missing rules stay missing: eligibility is never assumed, credit
limits are never invented, prerequisites are never evaluated in the browser,
and submission is offered only when the service enables it and returns an
eligible verdict. A successful response is presented as **Registration
received**, not as approval. Confirmation documents appear only when the
service supplies them.

Academic Results renders only the periods, academic context, publication
information, course results, and summaries supplied by the university. GPA,
CGPA, registered and earned units, pass/fail counts, outstanding courses, and
academic standing are displayed only when the service returns them; the portal
never calculates them or infers pass/fail, grades, or score boundaries. Optional
CA, exam, total, grade, grade-point, remark, and result-status fields remain
missing when not supplied, and table columns appear only when at least one
result provides that field. Unpublished periods are explained rather than
rendered as empty results. Printing produces a clearly labelled portal printout,
not an official transcript; statement download is offered only when an
authenticated university document exists.

Exam Clearance renders only the overall verdict, examination eligibility,
counts, academic context, and backend-determined requirements supplied by the
university. Eligibility and clearance are never inferred from visible
completion states or requirement statuses; a missing verdict stays
**Not supplied**. Requirement filters are built from returned status labels and
categories, actions open only service-supplied HTTPS destinations, and
supporting documents are retrieved through authenticated downloads. A
successful clearance request is presented as a receipt only: the portal never
claims that the student is cleared, approved, or eligible for examinations.

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
- No student records, successful transactions, results, scores, grades, GPA
  values, clearance verdicts, examination eligibility, requirements, amounts,
  deadlines, credentials, or API endpoints are included. Mock payment,
  registration, results, and exam-clearance services return no official
  records, and load failures show retryable error states.
- Implemented experiences are the shell, dashboard, Payment History, Generate
  Invoice, Upload Teller, Course Registration, Academic Results, and Exam
  Clearance. Hostel and Account remain placeholders until authorized and
  built.
