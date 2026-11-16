# Mock services

Development adapters live here. They are selected through
`VITE_USE_MOCK_API=true` and the `selectAdapter` helper in
`src/services/adapters/`.

Mock services must implement the same feature-level contracts as live
services, and components must never depend on mock data directly.

The dashboard fallback intentionally returns an unavailable snapshot:

- `dashboard.ts` — no student identity, balances, courses, results, clearance
  status, announcements, or transactions. The dashboard renders its production
  empty states from this snapshot.

These adapters exist for local development only and never represent official
university records.
