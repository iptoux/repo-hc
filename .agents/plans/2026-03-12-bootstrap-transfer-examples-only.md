# Plan: Bootstrap Transfer Examples-Only for Agent Artifacts

## Date
- 2026-03-12

## Goal
Ensure `repo-hc` `postinstall` / `install` bootstrap only transfers example artifacts for `.agents/rules`, `.agents/learnings`, `.agents/plans`, and `.agents/prompts`, instead of repository-internal non-example files.

## Scope
1. Add a targeted path filter for `.agents` copy behavior in bootstrap logic.
2. Keep transfer non-destructive and preserve existing target files.
3. Add regression tests for example-only transfer rules.
4. Update user/developer docs to reflect new bootstrap behavior.

## Non-Goals
- Changing transfer behavior for `docs/` or `AGENTS.md`.
- Introducing new environment variables.

## Validation
- Run `node --test ./test/*.test.cjs`.
- Verify non-example files under `.agents/rules|learnings|plans|prompts` are not copied.
- Verify `examples/` files in those folders are copied.

