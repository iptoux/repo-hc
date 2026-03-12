# AGENTS.md

## Purpose

This repository is being prepared as a **GitHub housekeeping npm package**.
The package goal is to help an AI agent maintain repository quality, automate repository hygiene tasks, and keep changes well documented.

Current AI targets: **OpenAI Codex first**, with **Anthropic Claude CLI support** via `CLAUDE.md`.

All changes must prioritize:

- security
- modularity
- maintainability
- reusability
- clear architectural boundaries
- long-term project health

When making changes, prefer clean, secure, well-structured solutions over quick or convenient shortcuts.

---

## Required First Step

Before making changes, always check:

- `/.agents/rules`
- `/.agents/learnings`
- `/.agents/prompts`
- `/.agents/skills`

These folders contain repository-specific instructions, conventions, previous learnings, implementation notes, and reusable prompt context.

If relevant guidance already exists there, follow it.

If new useful knowledge is discovered during the task, document it appropriately in `/.agents` so the repository improves over time.

`/.agents/rules` is the source of truth for operational behavior rules and is user-defined.

### Skills Usage (`/.agents/skills`)

The `/.agents/skills` folder contains reusable task-specific playbooks.
Each skill is defined by its own `SKILL.md`.

When a task matches a skill topic, read and apply that skill before implementing changes.

If a relevant skill exists, treat it as implementation guidance (not optional reference).
If no relevant skill exists and a repeatable pattern emerges, add a new skill under `/.agents/skills`.

---

## Documentation Maintenance

The agent should actively help maintain the internal project knowledge base.

When useful, create or update files under `/.agents`, especially in areas such as:

- new implementation learnings
- architecture notes
- security notes
- recurring patterns
- prompt refinements
- rules for future work
- mistakes to avoid
- project-specific conventions

Only add documentation when it provides real future value. Do not create noisy or redundant files.

Documentation should be:

- concise
- actionable
- clearly named
- easy to discover
- specific to the repository

Prefer updating existing files over creating unnecessary new ones, unless a new file is clearly the better structure.

### Documentation Sync Requirement (Mandatory)

To avoid stale documentation, keep `/docs` and especially `/.agents` in sync with implementation changes.

- If behavior, architecture, setup, conventions, rules, or reusable patterns change, update relevant docs in the same change.
- If architecture or workflow changes, update Mermaid diagrams in `docs/mermaid/` (or the relevant architecture doc) in the same change.
- For feature-level docs, keep `docs/<feature>/developers.md`, `docs/<feature>/users.md`, and `docs/<feature>/README.md` aligned when relevant.
- Do not leave documentation updates for later when the current change affects documented behavior.
- Treat documentation updates as part of done for relevant changes.
- If no documentation update is needed, explicitly verify existing docs are still accurate.

### Feature Branch and Plan Requirement (Mandatory)

- Every new feature must be implemented on a dedicated branch (do not develop features directly on `main`).
- Every new feature must start with a scoped implementation plan before coding begins.
- Prefer storing plans in `/.agents/plans` using clear, discoverable filenames.

### AI Usage Requirement (Mandatory)

- When AI tooling is used for planning, implementation, review, or documentation, `AGENTS.md` is required baseline guidance.
- For Anthropic Claude CLI workflows, apply `CLAUDE.md` in addition to `AGENTS.md`.
- AI-assisted work must follow this file and linked guidance in `/.agents` (`rules`, `learnings`, `prompts`, `skills`).

---

## Security Requirements

Security is a core requirement, not an optional improvement.

Always design and implement changes with a **security-first mindset**.

### Core security rules

- Never expose secrets, tokens, API keys, credentials, or private configuration.
- Never commit unmasked secrets to docs, prompts, examples, tests, scripts, or code.
- Keep all sensitive logic and decision checks in trusted execution boundaries.
- Treat all external input as untrusted.
- Validate and sanitize input where appropriate.
- Avoid leaking sensitive internal details in public logs, CLI output, or error messages.
- Use least-privilege principles for tokens, app permissions, and automation scopes.
- Return or expose only minimum required data.

### GitHub automation security

- Do not assume repository-level permissions are safe by default.
- Scope GitHub tokens to minimum permissions required for each workflow.
- Prefer read-only operations unless write access is explicitly required.
- Require explicit user approval for destructive or broad write operations.
- Keep audit trails for automated modifications where feasible.

### Secrets and environment handling

- Secrets must remain private and out of client-facing or public artifacts.
- Any new environment variable must be added to `.env.example` in the same change.
- New environment variables must be documented in relevant developer docs, including:
  - purpose
  - private vs public exposure scope
  - expected format
  - fallback/default behavior (if any)

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

### Required separation rules

- Avoid putting domain or security logic directly into presentation-only modules.
- Keep authorization and permission checks in dedicated logic boundaries.
- Keep integration-specific code separate from core domain workflows.
- Keep API/client wrappers separate from decision-making logic.
- Extract shared types into dedicated type files when reused.
- Keep utilities focused and small.

---

## File Size and Structure

- Keep files small and focused.
- Avoid mixing unrelated concerns in the same file.
- If a file grows too large, split it into smaller modules.
- Prefer multiple small files over one large file.

### Preferred structure principles

- Handlers: input parsing and orchestration only.
- Services: domain workflows and business rules.
- Adapters: external API integrations.
- Types: dedicated reusable definitions.
- Utilities: small reusable helpers.
- Constants: shared static values instead of repeated inline values.

---

## Functions

- Keep functions small and single-purpose.
- Use clear inputs and outputs.
- Extract repeated or nested logic into helpers.
- Prefer descriptive names over comment-heavy unclear logic.
- Avoid hidden side effects unless necessary and documented.

---

## Types

- Keep type definitions focused and discoverable.
- Use dedicated type files for shared contracts.
- Separate domain types, external API types, and UI/CLI-facing types where useful.

---

## Services

- Keep business logic in clearly named services or domain modules.
- Keep external API calls and side effects outside presentation paths.
- Keep services predictable, testable, and easy to review.

---

## Testing

- Add tests for new functionality whenever reasonable.
- Cover important behavior, edge cases, and regression-prone logic.
- Add or update tests for bug fixes.
- Prefer small, readable tests with clear intent.

### Test expectations

Create tests for:

- new services
- utility functions
- security-sensitive logic
- authorization and permission checks
- integration boundary behavior
- bug fixes

---

## Security Review Expectations

When touching auth, permissions, secrets, data access, or protected workflows, review:

- whether secrets remain protected
- whether permissions are least-privilege
- whether authorization is enforced in trusted boundaries
- whether untrusted input is validated
- whether errors leak sensitive details
- whether logs and generated docs avoid secret exposure

---

## Naming and Organization

- Use clear, descriptive, consistent names.
- File names should reflect responsibility.
- Keep imports clean and remove unused imports.
- Maintain a predictable structure.
- Avoid imports that blur architecture boundaries.

---

## Change Style

When making changes:

- Prefer targeted, minimal edits.
- Do not refactor unrelated areas unless necessary.
- Preserve behavior unless explicitly required to change it.
- Keep the codebase cleaner, safer, and more structured after every change.

---

## Default Working Approach

For every implementation, aim for:

1. Check `/.agents` for existing rules, learnings, prompts, and skills.
2. Understand the feature, fix, or request.
3. Identify security implications first.
4. Keep the solution as small, clean, and safe as possible.
5. Maintain strict architecture boundaries.
6. Extract reusable logic where appropriate.
7. Add or update tests.
8. Update docs in `/.agents` and `/docs` where meaningful.
9. Keep files organized and reasonably small.
10. Follow repository conventions defined in `AGENTS.md` and `/.agents/rules`.

---

## Final Standard

Every change should move the project toward:

- better security
- stronger protection of automation workflows
- clearer architecture boundaries
- better modularity
- stronger reusability
- better testability
- easier maintenance
- better internal documentation

## Strict Rules

- Never create unnecessarily large files.
- Split code early instead of waiting until files become difficult to maintain.
- Do not place business logic in presentation-oriented modules unless truly trivial.
- Extract shared types into dedicated type files.
- Extract repeated logic into services or utilities.
- Add tests for new non-trivial logic by default.
- Prefer reusable and composable solutions over one-off implementations.
