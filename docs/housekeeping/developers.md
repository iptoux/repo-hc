# Housekeeping Developer Guide

This guide explains how to implement and evolve `repo-hc` as a secure, modular npm package.

## Scope

`repo-hc` aims to provide reusable logic that helps AI agents execute GitHub housekeeping tasks safely and consistently.

Current status: architecture and documentation baseline, package runtime not published yet.

## Target Responsibilities

- define machine-readable repository housekeeping rules
- orchestrate policy-aware automation flows
- enforce branch + plan + documentation sync workflow
- capture AI-assisted change intent and outcomes
- protect sensitive data and avoid risky automation defaults

## Suggested Internal Module Boundaries

- `policy/`: rule definitions and validation contracts
- `planner/`: plan generation and plan-state checks
- `orchestration/`: task sequencing and guardrails
- `github-adapter/`: GitHub API wrappers and permission-aware operations
- `reporting/`: changelog/protocol output and audit summaries
- `types/`: shared public and internal contracts
- `config/`: environment parsing and defaults

## Security Requirements

- Never embed real tokens, secrets, or private repository data in source or docs.
- Require explicit opt-in for destructive operations.
- Use least-privilege token scopes.
- Validate all untrusted inputs.
- Keep error output sanitized.

## Environment Variables (Future Runtime)

When runtime variables are introduced:

1. Add them to `.env.example` in the same change.
2. Document purpose, scope, format, and fallback behavior.
3. Keep secret values out of repository history.

## Development Workflow

1. Create a dedicated feature branch.
2. Create or update a scoped plan in `.agents/plans/`.
3. Implement focused changes.
4. Update docs in the same change.
5. Update Mermaid diagrams when workflow or architecture changes.
6. Open PR with implementation and docs together.

## Validation

At minimum, validate:

- docs links remain valid
- architecture docs reflect current structure
- security guidance is still enforced
- rule references in `.agents` remain accurate

## Related

- [Housekeeping User Guide](./users.md)
- [Housekeeping Package Architecture](../mermaid/housekeeping-architecture.md)
- [Project Rules](../project/rules.md)
