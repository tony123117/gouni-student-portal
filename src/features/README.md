# Features

Each domain has its own folder: `auth`, `dashboard`, `payments`,
`course-registration`, `results`, `exam-clearance`, `hostel`, and `account`.

As features are implemented, each one should use the same internal structure:

```text
<feature>/
├── components/   # UI specific to this feature
├── hooks/        # Feature state and data hooks
├── services/     # Service contracts plus mock/live implementations
├── types/        # Feature-specific TypeScript types
└── validation/   # Zod schemas and form validation
```

Guidelines:

- Keep feature internals private; another feature must not import them
  directly. Promote genuinely shared code to `components/shared`, `hooks`, or
  `utils`.
- Components consume feature hooks or services, never Axios or Supabase
  directly.
- UI must not assume mock data exists. The mock/live choice belongs in the
  service adapter layer.
- The `dashboard` feature is implemented as the reference structure. The other
  feature folders remain placeholders; authentication, payments, and the
  remaining modules are not implemented.
