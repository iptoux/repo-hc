# Plan: Postinstall VS Code Hide Option for Agent Files

## Date
- 2026-03-12

## Goal
Add an optional `postinstall` step that asks whether common agent files and directories should be hidden in VS Code. If accepted, create or update `.vscode/settings.json` in the consumer project root.

## Scope
1. Extend install command flow with an interactive confirmation prompt when running in a TTY.
2. Implement reusable `.vscode/settings.json` merge logic that preserves existing user settings.
3. Add tests for settings creation/merge behavior and prompt integration boundaries.
4. Update package docs for new postinstall behavior and re-run guidance.

## Non-Goals
- Force-enable VS Code hiding without user consent.
- Override existing `files.exclude` entries that users already configured.
- Add editor support beyond VS Code in this change.

## Validation
- Run `node --test ./test/*.test.cjs`.
- Verify settings creation in an empty target root.
- Verify merge with an existing `.vscode/settings.json` file.
