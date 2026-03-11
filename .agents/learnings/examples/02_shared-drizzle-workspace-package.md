# Shared Drizzle Workspace Package: Implementation Learnings

## Links
- README: `../../README.md`
- Prompt: `../../prompts/examples/02_shared-drizzle-workspace-package.md`

## Context
A new large feature introduced a shared Drizzle package under `packages/db` for reuse across apps.

## Decisions
- Created `@workspace/db` as the canonical package for shared DB concerns.
- Kept responsibilities modular (`schema`, `types`, `config`, `adapters`, `migrations`, `seeds`).
- Exposed stable subpath exports instead of a single barrel.
- Implemented runtime-specific adapter factories:
  - `@workspace/db/adapters/node-postgres`
  - `@workspace/db/adapters/libsql`
- Added explicit connection validation helpers with sanitized error messages.
- Kept env reads out of schema and adapter modules.

## Test And Validation Pattern
- Add unit tests for adapter config validation, especially invalid input paths.
- Run package-local checks first:
  - run package-local `typecheck`
  - run package-local `test`
- Then run workspace-wide checks.

## Documentation Pattern
When a cross-cutting package is added, update both:
- root docs (`README.md`, `CONTRIBUTING.md`)
- `.agents/README.md` index (if `.agents` files changed)

## Branching Rule Reminder
This scope is a large feature and must be implemented on a dedicated feature branch, not `main`.
