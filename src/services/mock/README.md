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
- `payment-history.ts` — no invoices, payment references, amounts, statuses,
  receipt links, or summary counts. The Payment History page renders its
  unavailable state and reports that official records are not yet available.
- `invoice.ts` — no academic sessions, semesters, fee categories, student
  records, invoice numbers, fees, payment references, instructions, or payment
  destinations. The Generate Invoice page renders its unavailable state and
  never fabricates an official document.
- `teller.ts` — no form options, invoices, submission history, upload limits,
  payment channels, or submission results. Submission fails honestly instead of
  faking an upload success, and no file is ever written anywhere.
- `course-registration.ts` — no student identity, academic term, status,
  eligibility decision, registration period, course catalogue, credit-unit
  rules, warnings, restrictions, current registration, history, or confirmation
  documents. The Course Registration page renders its unavailable states, and
  submission fails honestly instead of faking receipt.
- `results.ts` — no student identity, academic periods, publication status,
  course results, scores, grades, GPA/CGPA values, academic standing, summaries,
  or statement documents. The Results page renders its unavailable state, and
  statement download fails honestly instead of generating a document.

These adapters exist for local development only and never represent official
university records.
