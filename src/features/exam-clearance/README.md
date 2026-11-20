# Exam Clearance

Route: `/exam-clearance`

The module lets a student review the university's overall clearance verdict,
examination eligibility, academic context, and every clearance requirement the
university has determined for that student. Requirements can be searched,
filtered, and opened for full verification details, secure actions, and
authenticated supporting documents.

## Data ownership

All clearance data comes from the service contract in
`types/exam-clearance.ts`:

- optional academic session, semester, student identity, matriculation number,
  programme, department, faculty, and level
- the university's own overall clearance verdict and examination-eligibility
  verdict, status label/tone/description, message, last verification date,
  completed and outstanding requirement counts, and request capability
- a backend-determined requirement list with optional category, responsible
  office, status, verification message, outstanding amount and currency, due
  date, last-updated date, action, and supporting documents
- request-submission and authenticated document-download capabilities plus an
  optional service-supplied reason a request is blocked
- receipt details returned after a request is submitted

The portal never infers overall clearance, examination eligibility, completed
or outstanding counts, requirement completion, amounts, deadlines, actions, or
documents. A missing value stays explicitly unavailable.

`overallStatus.cleared === null` and
`overallStatus.eligibleForExaminations === null` mean the university did not
supply those verdicts. They are never derived from requirement statuses, counts,
or a fully completed visible list. `requirements: null` means the requirement
list was unavailable; `requirements: []` means the university supplied an empty
list. An empty list does not change the overall verdict.

## Requirements and actions

- Requirements are displayed in the order returned by the service. The portal
  does not add, remove, prioritise, or complete them.
- Filter choices are built only from status labels and categories the service
  actually returned.
- A requirement action is only opened when the service supplies an absolute
  **HTTPS** destination. The portal never constructs, guesses, or upgrades an
  action URL; malformed or insecure destinations render as unavailable.
- Supporting-document downloads are offered only when the service advertises
  `documentDownload`. The document is retrieved through the authenticated
  `downloadRequirementDocument` operation and saved from the returned blob.
  No public document URL is assumed and no clearance document is generated
  locally.

## Request submission

A clearance request is submitted without any client-supplied student identity;
a live adapter must derive the student from the authenticated session. A
resolved response is treated as a **receipt only**. The receipt view never
claims clearance, requirement approval, or examination eligibility, and the
overall status panel continues to show the last university-supplied verdict.
Final review and the clearance decision belong to the university.

## Service wiring

`services/exam-clearance-service.ts` selects a mock or live implementation with
`selectAdapter`. The production mock in
`src/services/mock/exam-clearance.ts` returns an honest unavailable snapshot,
rejects request submission, and rejects document downloads. The live adapter in
`services/exam-clearance-live.ts` sends nothing and documents the missing
endpoint, schema, status vocabulary, count definitions, action rules, document
storage, request/idempotency, and authorization contracts.

## Related files

- `components/ExamClearancePage.tsx` — page orchestration and state branches
- `components/ClearanceStatusPanel.tsx` — overall verdict, eligibility, counts,
  refresh, and request entry point
- `components/ClearanceContextPanel.tsx` — service-supplied academic context
- `components/ClearanceRequirementsSection.tsx` / `ClearanceFilters.tsx` /
  `ClearanceRequirementCard.tsx` — searchable requirement list and empty states
- `components/ClearanceRequirementDialog.tsx` — full details, secure actions,
  verification message, and authenticated document downloads
- `components/ClearanceRequestDialog.tsx` — request confirmation and receipt-only
  outcome
- `components/ClearanceStates.tsx` / `ClearanceSkeleton.tsx` — unavailable,
  error, refresh, empty, and loading states
- `hooks/useExamClearance.ts` / `useClearanceRequest.ts` /
  `useClearanceDocumentDownload.ts` — TanStack Query and AbortSignal-aware
  mutations
- `utils/filter.ts` / `utils/format.ts` — service-derived filters, safe date,
  amount, destination, and file-name handling
