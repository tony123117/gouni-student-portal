# Payments

The payments feature contains three independent modules that share the portal's
architecture and formatting utilities:

`components → hooks → services → adapters`

## Payment History

- `types/payment-history.ts` — payment records, filters, summaries, statuses,
  availability, service capabilities, and the `PaymentHistoryService` contract.
- `validation/payment-history-filters.ts` — validates search and filter inputs
  before they reach the service.
- `services/payment-history-service.ts` — selects the mock or live adapter with
  the shared `selectAdapter` helper.
- `services/payment-history-live.ts` — intentionally disconnected. The
  university has not supplied an endpoint or response contract, so it reports
  that official data is unavailable rather than calling an invented endpoint.
- `hooks/usePaymentHistory.ts` — TanStack Query hook that forwards the
  AbortSignal to the service.
- `components/` — page heading, summary tiles, filters, table, mobile cards,
  details dialog, skeleton, empty, filtered-empty, error, and unavailable
  states.

## Generate Invoice

- `types/invoice.ts` — invoice request, select options, invoice document,
  payment availability, and the `InvoiceService` contract.
- `validation/invoice-request.ts` — React Hook Form resolver backed by Zod.
- `services/invoice-service.ts` — selects the mock or live implementation
  independently from Payment History.
- `services/invoice-live.ts` — intentionally disconnected until the university
  supplies an invoice endpoint, response schema, and e-Transact contract.
- `hooks/useInvoiceOptions.ts` — loads official sessions, semesters, and fee
  categories.
- `hooks/useInvoice.ts` — TanStack Query hook that forwards AbortSignal through
  the invoice request.
- `components/` — selection form, guidance, invoice preview, official invoice
  document, print-only invoice sheet, actions, payment information, skeletons,
  and selection/error/unavailable states.
- `components/InvoicePrintSheet.tsx` — body-level print copy. The print
  stylesheet hides the application shell and prints only the invoice document.

## Upload Teller

- `types/teller.ts` — submission context, form options, upload constraints,
  invoice association options, review statuses, submission request/result,
  history records, and the `TellerService` contract.
- `validation/teller-submission.ts` — Zod schema factory + React Hook Form
  resolver. Fields become required only when the university requires them.
- `services/teller-service.ts` — selects the mock or live implementation
  independently from the other payment modules.
- `services/teller-live.ts` — intentionally disconnected. Documents the pending
  server-side security requirements (private storage, server-side validation,
  authorization) in its header.
- `hooks/useTellerContext.ts` — loads official options, requirements,
  constraints, associable invoices, and submission history.
- `hooks/useTellerSubmission.ts` — submission query keyed by request plus a
  submission counter; the evidence file travels through a ref and is never
  placed in a query key or persisted.
- `components/` — submission form (payment details + evidence upload),
  guidance card, accessible file upload with remove/replace, submission
  history, status badge, skeleton, and availability/error/success states.

### Data rules

- Options, invoices, history, and statuses are only ever rendered when the
  service supplies them.
- The mock adapter returns an unavailable context with no invoices, options,
  history, or official upload limits, and `submitTeller` fails honestly rather
  than faking an upload.
- Success wording confirms receipt only: "Your payment evidence has been
  submitted and is awaiting verification." A payment is never reported as
  successful, verified, or confirmed unless the authorised service explicitly
  returns that status.
- File validation is client-side for usability only; server-side validation of
  type, size, and content remains a pending university requirement.
- The maximum file size shown without an official university limit is labelled
  as a technical limit, not university policy.

## Data rules

- Only figures returned by the service are displayed.
- Development data is empty and reports `availability: 'unavailable'`.
- No invoices, references, receipts, fee amounts, student records, or
  successful transactions are generated.
- Receipt actions render only when the service advertises receipt support and
  supplies an actual receipt URL.
- Print and payment actions appear only after an official invoice response.
- The e-Transact action remains disabled unless the service advertises payment
  availability and supplies a valid HTTPS destination.
- No academic session, semester, fee category, payment instruction, bank
  account, or payment channel is hardcoded in the UI.
