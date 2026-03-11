# Plan: GitHub Housekeeping Package Documentation Refresh

## Date
- 2026-03-11

## Goal
Align repository documentation with the current project direction: a future npm package for automated GitHub housekeeping guided by an AI agent (initially optimized for OpenAI Codex).

## Scope
1. Update `AGENTS.md` to remove stack-specific assumptions that are unrelated to agent behavior rules.
2. Replace root `README.md` with a package-focused project overview.
3. Refresh docs under `docs/` so links and narrative match the current repository.
4. Sync supporting docs (`CONTRIBUTING.md`, `SECURITY.md`, `.agents/README.md`, and affected `.agents/rules/*`) where stale references exist.

## Non-Goals
- Implementing runtime package code.
- Publishing to npm in this change.

## Deliverables
- Updated guidance for AI-assisted repository housekeeping workflows.
- New root README with centered shields and actionable onboarding.
- Cleaned documentation graph with valid links and consistent terminology.

## Validation
- Manual link and terminology consistency pass across edited docs.
- `git diff --name-only` review to ensure changes stay documentation-focused.
