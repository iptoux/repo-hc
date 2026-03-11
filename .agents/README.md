# Agents Docs Guide

## Purpose

This folder stores reusable agent knowledge for consistent, safe, and fast collaboration.

- `rules/`: mandatory policies for documentation and workflow
- `plans/`: scoped implementation plans used before coding
- `learnings/`: reusable implementation learnings and outcomes
- `prompts/`: sanitized source prompt context
- `skills/`: task-specific playbooks (`SKILL.md`)

## How To Use

1. Read relevant files under `rules/` first.
2. Check `skills/` and apply matching skills before implementation.
3. Create or update a plan in `plans/` before coding feature work.
4. When adding a learning, add the matching sanitized prompt where useful.
5. Mask sensitive data in all stored content.
6. Keep all text in English unless explicitly requested otherwise.
7. Update this README whenever `.agents` files are added, removed, or renamed.

## Naming Convention

- Prefer date-prefixed plan files: `YYYY-MM-DD-<topic>.md`.
- Keep filenames concise and topic-specific.
- Keep one clear topic per file.

## Current Index

### Plans

- [2026-03-11-github-housekeeping-doc-refresh.md](./plans/2026-03-11-github-housekeeping-doc-refresh.md)
- [examples/2026-03-11-add-docs-workflow-guides.md](./plans/examples/2026-03-11-add-docs-workflow-guides.md)
- [examples/2026-03-11-central-api-docs-mermaid.md](./plans/examples/2026-03-11-central-api-docs-mermaid.md)

### Learnings

- [examples/01_workspace-peer-dependency-resolution.md](./learnings/examples/01_workspace-peer-dependency-resolution.md)
- [examples/02_shared-drizzle-workspace-package.md](./learnings/examples/02_shared-drizzle-workspace-package.md)

### Prompts

- [examples/01_workspace-peer-dependency-resolution.md](./prompts/examples/01_workspace-peer-dependency-resolution.md)
- [examples/02_shared-drizzle-workspace-package.md](./prompts/examples/02_shared-drizzle-workspace-package.md)

### Rules

- [01_mask_sensitive-data.md](./rules/01_mask_sensitive-data.md)
- [02_write-in-english.md](./rules/02_write-in-english.md)
- [03_keep-readme-updated.md](./rules/03_keep-readme-updated.md)
- [04_use-dedicated-branch-for-large-features.md](./rules/04_use-dedicated-branch-for-large-features.md)
- [05_update-mermaid-on-architecture-changes.md](./rules/05_update-mermaid-on-architecture-changes.md)
- [06_require-comprehensive-feature-docs.md](./rules/06_require-comprehensive-feature-docs.md)
- [07_require-feature-plan-and-env-docs.md](./rules/07_require-feature-plan-and-env-docs.md)
- [08_agents-override-prefer-reusable-modules.md](./rules/08_agents-override-prefer-reusable-modules.md)

### Skills

- No repository-local skills currently.

## Notes

- `examples/` files are historical references and may describe earlier repository phases.
- New project-direction learnings should be added outside `examples/`.
