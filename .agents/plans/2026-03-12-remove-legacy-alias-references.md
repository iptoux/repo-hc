# Plan: Remove Legacy Alias References

## Date
- 2026-03-12

## Goal
Remove all legacy single-file alias references and compatibility-alias notes. Keep only `AGENTS.md` as the single canonical file.

## Scope
1. Remove legacy alias copy behavior from bootstrap logic.
2. Update CLI output/help text to reference only `AGENTS.md`.
3. Update tests affected by alias removal.
4. Update docs and `.agents` notes/prompts/plans to remove legacy alias references.
5. Keep existing postinstall behavior and all other functionality unchanged.

## Non-Goals
- Removing postinstall behavior.
- Changing example-only transfer behavior.
- Introducing new commands or environment variables.

## Validation
- Run `node --test ./test/*.test.cjs`.
- Verify no legacy alias references remain in repository files.
