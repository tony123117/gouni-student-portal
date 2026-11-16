# Components

- `ui/` — reusable, domain-agnostic primitives such as badges and future
  buttons, inputs, and dialogs.
- `layout/` — page shells and structural layout components. `AppShell`
  composes the fixed navy sidebar, desktop topbar, mobile drawer, shared
  support bar, and content area. `PortalBackdrop` holds the restrained
  background shapes.
- `navigation/` — navigation configuration, expandable sidebar links,
  navigation-based search (`PortalSearch`), notifications, mobile drawer,
  mobile bottom navigation, and the neutral account menu.
- `forms/` — reusable form composition and field wrappers shared across
  features. Feature-specific forms belong inside their feature.
- `shared/` — small cross-feature components that do not fit the categories
  above, such as `BrandMark`, `Badge`, `PageHeading`, `SectionCard`, and
  `ModulePlaceholder`.

Keep domain logic out of this directory. Feature-specific components belong in
`src/features/<feature>/components/`.
