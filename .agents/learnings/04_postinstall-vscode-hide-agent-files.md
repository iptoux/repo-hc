# Learning: Optional VS Code Hide Prompt During Postinstall

## Links
- README: `../README.md`
- Prompt: `../prompts/04_postinstall-vscode-hide-agent-files.md`
- Plan: `../plans/2026-03-12-postinstall-vscode-hide-agent-files.md`

## Context
`repo-hc` postinstall needed an optional user-facing step to reduce explorer noise in VS Code by hiding common agent files and directories.

## Decision
- Keep bootstrap copy behavior non-destructive and unchanged.
- Add a separate VS Code settings helper module (`lib/vscode-settings.cjs`).
- Prompt only when installation is interactive (`stdin`/`stdout` TTY).
- Merge `files.exclude` keys without overriding existing user-defined patterns.
- Skip settings writes in non-interactive installs and when users decline.

## Implementation Structure
- `lib/vscode-settings.cjs`: load/merge/write settings and interactive confirmation
- `bin/repo-hc.cjs`: `install` now calls the VS Code settings helper after bootstrap
- `test/vscode-settings.test.cjs`: merge, update, decline, non-interactive, idempotency coverage

## Guardrails
- Existing `.vscode/settings.json` is preserved and only augmented with missing patterns.
- `install` remains fail-safe: any prompt/settings error is warning-only and must not fail package installation.

## Validation
- `node --test ./test/*.test.cjs`
