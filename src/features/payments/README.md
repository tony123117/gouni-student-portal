# Payment History

The Payment History module follows the portal architecture:

`components → hooks/usePaymentHistory → services/payment-history-service → adapters`

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

## Data rules

- Only figures returned by the service are displayed.
- Development data is empty and reports `availability: 'unavailable'`.
- No invoices, references, receipts, or successful transactions are generated.
- Receipt actions render only when the service advertises receipt support and
  supplies an actual receipt URL.
- Retry and confirmation actions stay hidden until the university exposes real
  operations for them.
