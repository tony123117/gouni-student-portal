# Supabase services

Domain-specific Supabase operations belong here once a reviewed use case
requires them. Import the shared client from `@/config/supabase` through a
feature service; do not instantiate clients or call Supabase directly from
components.

No tables, queries, row-level security policies, or authentication flows are
defined at this stage. Those decisions wait for the requirements review and the
university's backend integration plan.
