# Services

The service layer isolates data sources from components and feature UI.

- `api/` — Axios client for the university's existing backend. The base URL
  comes from `VITE_API_BASE_URL` and is empty until authorized access and the
  integration contract are available.
- `mock/` — development implementations. Mock services must satisfy the same
  feature-level contracts as live services and must not leak into UI
  components. The dashboard and payment-history fallbacks contain no student or
  payment records; they return unavailable snapshots so the UI can render empty
  and unavailable states.
- `adapters/` — selects the mock or live implementation through
  `VITE_USE_MOCK_API`, using the `selectAdapter` helper.
- `supabase/` — Supabase-specific operations (added only when a reviewed use
  case requires them). Import the shared client from `@/config/supabase`; do
  not create additional clients in components.

No university endpoints are defined at this stage. Feature services define
their own contracts, then provide mock and live implementations through the
adapter helper. The live dashboard and payment-history implementations report
that official data is currently unavailable until the university integration is
authorized.
