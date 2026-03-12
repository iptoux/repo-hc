# Contributing to repo-hc

Thanks for contributing.

`repo-hc` is currently documentation-first and is being prepared as a future npm package for automated GitHub housekeeping workflows.

## Before You Start

1. Read [AGENTS.md](./AGENTS.md).
2. If you are working via Anthropic Claude CLI, read [CLAUDE.md](./CLAUDE.md).
3. Review `.agents/rules`, `.agents/learnings`, `.agents/prompts`, and `.agents/skills` before implementing.
4. Follow [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Project Status

- Runtime package code is not published yet.
- This repository currently defines architecture, security expectations, and workflow standards.

## Contribution Workflow

1. Create a dedicated branch from `main` (for example `feat/<topic>`).
2. Implement your intended change or extension directly, preferably as reusable `.agents` updates (for example new rules, learnings, prompts, skills, or examples).
3. Make focused, minimal changes.
4. Keep docs synchronized in the same change.
5. Update Mermaid diagrams when architecture/workflow changes.
6. Open a PR with clear validation notes.

## AI Contributions (Required)

If AI tooling is used for planning, implementation, review, or docs:

- Use the matching baseline guidance file:
  - `AGENTS.md` for Codex-oriented workflows
  - `CLAUDE.md` for Anthropic Claude CLI workflows
- linked `.agents` rules and references must be followed.
- Contributions can include support files for additional AI agents (for example Claude, Kiro, Kilo) when they improve project maintainability and reuse.

## Documentation Requirements

- Keep `.agents/README.md` up to date when `.agents` content changes.
- Keep all docs in English unless explicitly requested otherwise.
- Mask sensitive values in all docs and examples.
- Keep `docs/README.md` links current.
- Useful contributions include adding or improving `.agents` examples and project rules when they provide clear long-term value.

## Environment Variables (When Introduced)

When adding a new variable:

1. add it to `.env.example` in the same change
2. never commit real secret values
3. document purpose, scope, format, and fallback behavior in relevant developer docs

## Commit and PR Guidance

1. Use clear, descriptive commit messages.
2. Keep one logical change per PR where possible.
3. Include what changed, why, and how it was validated.

## Reporting Issues

- Open an issue with clear steps and expected vs actual behavior.
- For security-sensitive issues, follow [SECURITY.md](./SECURITY.md).
