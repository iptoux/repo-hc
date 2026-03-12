# CLAUDE.md

## Purpose

This repository is prepared as a **GitHub housekeeping npm package**.
The package helps an AI agent maintain repository quality, automate repository hygiene tasks, and keep changes well documented.

Current AI target: **Claude CLI first**.

All changes must prioritize:

- security
- modularity
- maintainability
- reusability
- clear architectural boundaries
- long-term project health

Prefer clean, secure, and well-structured solutions over quick shortcuts.

---

## Required First Step

Before making changes, always check:

- `/.agents/rules`
- `/.agents/learnings`
- `/.agents/prompts`
- `/.agents/skills`

If relevant guidance already exists there, follow it.

`/.agents/rules` is the source of truth for operational behavior rules and is user-defined.

### Skills Usage (`/.agents/skills`)

If a task matches a skill topic, read and apply that skill before implementation.

If no relevant skill exists and a repeatable pattern emerges, add a new skill under `/.agents/skills`.

---

## Documentation Maintenance

Keep internal knowledge up to date.

When useful, create or update files under `/.agents` with concise, actionable, discoverable, repository-specific guidance.

Prefer updating existing files over adding redundant new ones.

### Documentation Sync Requirement (Mandatory)

Keep `/docs` and `/.agents` in sync with implementation changes.

- If behavior, architecture, setup, conventions, rules, or reusable patterns change, update docs in the same change.
- If architecture or workflow changes, update Mermaid diagrams in `docs/mermaid/` in the same change.
- For feature-level docs, keep `docs/<feature>/developers.md`, `docs/<feature>/users.md`, and `docs/<feature>/README.md` aligned when relevant.
- If no documentation update is needed, explicitly verify docs are still accurate.

### Feature Branch and Plan Requirement (Mandatory)

- Every new feature must be implemented on a dedicated branch (never directly on `main`).
- Every new feature must start with a scoped implementation plan before coding.
- Prefer storing plans in `/.agents/plans` with clear filenames.

### AI Usage Requirement (Mandatory)

AI-assisted planning, implementation, review, and documentation must follow:

- this file (`CLAUDE.md`) as baseline for Claude CLI
- repository guidance in `AGENTS.md`
- linked guidance in `/.agents` (`rules`, `learnings`, `prompts`, `skills`)

If guidance conflicts, follow `/.agents/rules` first, then `AGENTS.md`, then this file.

---

## Security Requirements

Security is mandatory.

### Core security rules

- Never expose secrets, tokens, API keys, credentials, or private configuration.
- Never commit unmasked secrets to docs, prompts, examples, tests, scripts, or code.
- Keep sensitive decision logic in trusted boundaries.
- Treat all external input as untrusted and validate/sanitize it.
- Avoid leaking sensitive details in logs, CLI output, or errors.
- Apply least privilege for tokens, app permissions, and automation scopes.
- Return or expose only minimum required data.

### GitHub automation security

- Do not assume repository-level permissions are safe by default.
- Scope GitHub tokens to minimum permissions needed.
- Prefer read-only operations unless write access is explicitly required.
- Require explicit user approval for destructive or broad write operations.
- Keep audit trails for automated modifications where feasible.

### Secrets and environment handling

- Keep secrets private and out of public/client-facing artifacts.
- Any new environment variable must be added to `.env.example` in the same change.
- New environment variables must be documented in developer docs with:
  - purpose
  - private vs public exposure scope
  - expected format
  - fallback/default behavior

---

## Architecture and Separation of Concerns

Maintain strict separation between:

- policy and rule definitions
- prompt orchestration
- GitHub integration adapters
- domain logic and workflows
- logging/reporting
- configuration and secrets handling
- shared types and utilities

Required:

- No domain/security logic inside presentation-only modules.
- Keep authorization checks in dedicated boundaries.
- Keep integration-specific code separate from core workflows.
- Keep API/client wrappers separate from decision logic.
- Extract shared types into dedicated type files when reused.
- Keep utilities focused and small.

---

## File Size and Structure

- Keep files small and focused.
- Avoid mixing unrelated concerns.
- Split files early when they grow.
- Prefer multiple small modules over one large module.

Preferred structure:

- Handlers: input parsing and orchestration only.
- Services: domain workflows and business rules.
- Adapters: external API integrations.
- Types: reusable definitions.
- Utilities: small helpers.
- Constants: shared static values.

---

## Functions, Types, Services

- Keep functions single-purpose with clear inputs/outputs.
- Extract repeated/nested logic into helpers.
- Use descriptive names.
- Avoid hidden side effects unless necessary and documented.
- Keep shared contracts in dedicated type files.
- Keep business logic in services/domain modules, not presentation paths.

---

## Testing

- Add tests for new functionality when reasonable.
- Add/update tests for bug fixes.
- Prioritize edge cases and regression-prone logic.
- Keep tests small and readable.

Expected coverage includes:

- new services
- utility functions
- security-sensitive logic
- authorization/permission checks
- integration boundaries
- bug fixes

---

## Security Review Expectations

When touching auth, permissions, secrets, data access, or protected workflows, review:

- secret protection
- least-privilege permissions
- trusted-boundary authorization
- untrusted input validation
- error/log redaction

---

## Naming, Organization, and Change Style

- Use clear, consistent names.
- Keep imports clean; remove unused imports.
- Maintain predictable structure and boundary-respecting imports.
- Prefer targeted, minimal edits.
- Do not refactor unrelated areas unless necessary.
- Preserve behavior unless explicitly changing it.

---

## Default Working Approach

For each implementation:

1. Check `/.agents` (`rules`, `learnings`, `prompts`, `skills`).
2. Understand request scope and constraints.
3. Identify security implications first.
4. Implement the smallest safe solution.
5. Preserve architecture boundaries.
6. Extract reusable logic where appropriate.
7. Add or update tests.
8. Update `/.agents` and `/docs` when relevant.
9. Keep files organized and small.
10. Verify alignment with `AGENTS.md` and `/.agents/rules`.

---

## Final Standard

Every change should improve:

- security
- automation safety
- architecture clarity
- modularity
- reusability
- testability
- maintainability
- internal documentation quality

## Strict Rules

- Do not create unnecessarily large files.
- Split code early when maintainability drops.
- Do not place non-trivial business logic in presentation modules.
- Extract shared types and repeated logic into reusable modules.
- Add tests for non-trivial new logic by default.
