# Academic Results

Route: `/results`

The module lets a student select a university-supplied academic period, review
published course results, filter them, inspect individual result details, and
read the performance summary and publication state for that period.

## Data ownership

All academic data comes from the service contract in `types/results.ts`:

- academic periods (session, semester, optional publication label)
- optional student, programme, department, faculty, and level context
- publication verdict, status label/tone, date, and message
- course results with optional CA, exam, total, grade, grade point, remark, and
  result status
- semester GPA, CGPA, registered and earned units, passed, failed, outstanding
  courses, and academic standing
- print and statement-download capabilities plus an optional document
  descriptor

The portal never calculates GPA, CGPA, unit totals, pass/fail counts,
outstanding courses, grades, grade points, score boundaries, classification, or
academic standing. Every value is rendered exactly as supplied; a missing value
stays missing. Optional table columns appear only when at least one returned
result supplies that field.

`periods: null` means the university did not supply period history, while
`periods: []` means history was supplied but contains no periods.
`publication.published` is the university's own verdict; the portal never
derives it from a date, a label, or the presence of results.

## Publication and documents

- An unpublished period is explained and never rendered as an empty result set.
- Printing produces a body-level portal printout explicitly labelled
  **PORTAL PRINTOUT — NOT AN OFFICIAL TRANSCRIPT OR CERTIFIED STATEMENT**. It is
  generated from portal-rendered values and is not an official document.
- Statement download is enabled only when the service advertises
  `statementDownload` and supplies a document descriptor. The authenticated
  `downloadStatement` operation returns the university's blob; the portal never
  builds an official-looking statement locally.
- If download is unsupported or fails, the action is disabled or shows a
  retryable explanation.

## Service wiring

`services/results-service.ts` selects a mock or live implementation with
`selectAdapter`. The production mock in `src/services/mock/results.ts` returns
an honest unavailable snapshot and rejects statement download. The live adapter
in `services/results-live.ts` sends nothing and documents the missing results,
publication, grading, history, document, and authorization contracts.

## Related files

- `components/ResultsPage.tsx` — page orchestration and state branches
- `components/ResultsPeriodSelector.tsx` — session/semester selection and refresh
- `components/ResultsOverview.tsx` — service-supplied performance figures
- `components/ResultsPublicationPanel.tsx` / `ResultsActions.tsx` — publication,
  print, and statement download
- `components/ResultsRecords.tsx` / `ResultsTable.tsx` / `ResultsCards.tsx` —
  filters, responsive records, and empty states
- `components/ResultsDetailDialog.tsx` — full course-result details
- `components/ResultsHistory.tsx` — available result periods
- `components/ResultsPrintSheet.tsx` — labelled portal printout
- `utils/filter.ts` / `utils/format.ts` — filter options, active filters, column
  availability, and non-calculating formatters
- `hooks/useResults.ts` / `hooks/useResultStatement.ts` — TanStack Query and
  AbortSignal-aware statement retrieval
