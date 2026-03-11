# Rule: Require Comprehensive Feature Documentation

## Links
- README: `../README.md`
- Related Rule: `./03_keep-readme-updated.md`
- Related Rule: `./05_update-mermaid-on-architecture-changes.md`

## Scope
This rule applies to every feature that changes one or more of the following:

- architecture
- setup or runtime configuration
- developer workflow
- user-facing behavior
- shared contracts or interfaces

## Requirement
For in-scope feature work, documentation is part of the implementation and must be added or updated in the same change.

## Mandatory Documentation Structure
For each affected feature area `<feature>`:

1. Add or update `docs/<feature>/developers.md`.
2. Add or update `docs/<feature>/users.md`.
3. Add or update `docs/<feature>/README.md` as a local index.
4. Add or update Mermaid diagrams in `docs/mermaid/` (at minimum architecture or workflow).
5. Add or update global index links in `docs/README.md`.

## Content Expectations

### Developer Documentation (`developers.md`)
Must cover:

- architecture intent and boundaries
- setup and environment requirements
- validation and test workflow
- extension/change workflow
- security notes
- troubleshooting for common failures

### User Documentation (`users.md`)
Must cover:

- quick start and primary usage flows
- stable API/usage surface
- safe integration examples
- limitations and constraints
- FAQ or operational notes where relevant

### Mermaid Documentation
Must cover:

- system architecture or data flow
- at least one runtime or change workflow
- GitHub-compatible Mermaid syntax (quote labels when using special characters)

## Linking Requirements
Cross-link all relevant docs in both directions:

- `docs/README.md` -> feature docs + Mermaid docs
- `docs/<feature>/README.md` -> developers/users + Mermaid docs
- each Mermaid file -> docs home + related feature docs

## Definition of Done
A feature is not done until:

- implementation and docs are merged together
- docs link graph is complete and non-stale
- Mermaid diagrams match the current implementation
- no duplicated or contradictory setup/usage instructions remain

## Enforcement
PRs that change in-scope behavior without the required docs updates should be treated as incomplete.
