# Rule: Update Mermaid Diagrams on Architecture Changes

## Links
- README: `../README.md`
- Related Rule: `./03_keep-readme-updated.md`
- Related Rule: `./04_use-dedicated-branch-for-large-features.md`
- Related Rule: `./06_require-comprehensive-feature-docs.md`

## Scope
This rule applies whenever architecture is added, changed, or removed.

## Requirement
When architecture changes, update documentation in the same change and include updated Mermaid diagrams that reflect the new architecture.

## Documentation Targets
- Prefer files under `docs/mermaid/` for architecture and workflow diagrams.
- Keep related references in `AGENTS.md` and `.agents` aligned when architecture guidance changes.

## Minimum Update
- Add or update at least one Mermaid diagram for the changed architecture.
- Ensure diagram nodes, boundaries, and data flow match the implementation.
- Ensure Mermaid syntax renders on GitHub (quote labels with special characters where needed).
- Remove or replace stale Mermaid diagrams that no longer reflect reality.

## Enforcement
Architecture changes are incomplete if Mermaid architecture docs are missing or outdated.
