# Plan: Publishable repo-hc Package Bootstrap

## Date
- 2026-03-11

## Goal
Enable consumers to run `pnpm add repo-hc` (without `-D`) and receive the following assets in their project root:
- `.agents/`
- `docs/`
- `AGENTS.md` (canonical)

## Scope
1. Add a publishable npm package scaffold (`package.json`, CLI entrypoint, install hook).
2. Implement non-destructive root bootstrap logic for copying package assets into `INIT_CWD`.
3. Provide a manual command (`repo-hc init`) for re-running bootstrap.
4. Add tests for bootstrap copy behavior.
5. Update documentation to reflect installation and bootstrap behavior.

## Non-Goals
- Implementing full AI workflow runtime logic.
- Publishing to npm in this change.

## Validation
- Run tests for copy behavior.
- Dry-run local CLI init into a temporary folder.
- Verify docs mention `pnpm add repo-hc` and expected copied assets.

