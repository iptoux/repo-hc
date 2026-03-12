# Project Rules

These rules apply to all contributors and all AI-assisted changes in this repository.

## Required Workflow

1. Create a dedicated feature branch.
2. Create a scoped implementation plan before coding (`.agents/plans/*.md`).
3. Keep implementation and documentation synchronized in the same change.

## AI-Assisted Work (Required)

If AI is used for planning, implementation, review, or docs:

- follow the matching baseline file:
  - [AGENTS.md](../../AGENTS.md) for Codex-oriented workflows
  - [CLAUDE.md](../../CLAUDE.md) for Anthropic Claude CLI workflows
- apply relevant guidance from `.agents/rules`, `.agents/learnings`, `.agents/prompts`, and `.agents/skills`
- treat `.agents/rules` as user-defined source-of-truth for operational behavior

## Documentation Requirements

For behavior, architecture, or workflow changes, update in the same change:

- `docs/<feature>/README.md`
- `docs/<feature>/developers.md`
- `docs/<feature>/users.md`
- `docs/mermaid/*` diagrams when architecture/workflow changes
- `docs/README.md` index links

## Security Baseline

- never commit secrets or unmasked sensitive data
- validate untrusted input
- enforce least-privilege for automation permissions
- avoid leaking sensitive details in logs and errors

## Environment Variables

When introducing a new environment variable:

1. add it to `.env.example` in the same change
2. document purpose, scope, format, and fallback behavior in relevant developer docs
3. never commit real values

## Reference Rules

- [.agents/rules/01_mask_sensitive-data.md](../../.agents/rules/01_mask_sensitive-data.md)
- [.agents/rules/02_write-in-english.md](../../.agents/rules/02_write-in-english.md)
- [.agents/rules/03_keep-readme-updated.md](../../.agents/rules/03_keep-readme-updated.md)
- [.agents/rules/04_use-dedicated-branch-for-large-features.md](../../.agents/rules/04_use-dedicated-branch-for-large-features.md)
- [.agents/rules/05_update-mermaid-on-architecture-changes.md](../../.agents/rules/05_update-mermaid-on-architecture-changes.md)
- [.agents/rules/06_require-comprehensive-feature-docs.md](../../.agents/rules/06_require-comprehensive-feature-docs.md)
- [.agents/rules/07_require-feature-plan-and-env-docs.md](../../.agents/rules/07_require-feature-plan-and-env-docs.md)
- [.agents/rules/08_agents-override-prefer-reusable-modules.md](../../.agents/rules/08_agents-override-prefer-reusable-modules.md)
