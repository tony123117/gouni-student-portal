# Course Registration

Route: `/course-registration`

The module lets a student review the university registration context, search
and filter the official course catalogue, build a selection, review it, submit
it, and inspect previous registrations.

## Data ownership

All academic data comes from the university service contract in
`types/registration.ts`:

- academic session, semester, and optional student details
- official status label/tone, eligibility verdict, registration period
- course catalogue with service-supplied `selectable` and prerequisite verdicts
- official credit-unit limits
- current registration and registration history
- submission and confirmation-download capabilities

The portal never invents courses, eligibility, prerequisites, deadlines,
credit limits, restrictions, approvals, or confirmation documents. Missing
values remain missing and disable the dependent action.

`selectable` and `prerequisiteSatisfied` are the only sources of course
availability. Prerequisite text is displayed for context but never evaluated in
the browser. Credit totals are validated only against supplied limits.

## Submission

Submission is offered only when all of the following are true:

- `availability === 'available'`
- `capabilities.submission === true`
- an academic term is supplied
- `eligibility.eligible === true`
- no current registration is already held for the term

The request contains only the academic session, semester, and course IDs.
Student identity must be derived server-side from the authenticated session.

A resolved call means the university confirmed receipt. The success state says
**Registration received** and never claims approval. Final status is shown only
from the service-supplied status label/tone. A synchronous submission lock plus
disabled controls prevents duplicate submission from repeated activation.

## Service wiring

`services/registration-service.ts` selects a mock or live implementation with
`selectAdapter`. The production mock in
`src/services/mock/course-registration.ts` returns an honest unavailable
snapshot and rejects submission. The live adapter in
`services/registration-live.ts` sends nothing and documents the missing
university contracts and security requirements.

## Related files

- `components/CourseRegistrationPage.tsx` — page orchestration and outcome states
- `components/RegistrationWorkspace.tsx` — selection form, totals, review flow
- `components/CourseCatalogue.tsx` — search, classification filter, rows
- `components/SelectedCoursesPanel.tsx` — selection summary and submission gate
- `validation/registration.ts` — selection, eligibility, availability, and limit validation
- `hooks/useRegistrationContext.ts` / `hooks/useRegistrationSubmission.ts` — queries
