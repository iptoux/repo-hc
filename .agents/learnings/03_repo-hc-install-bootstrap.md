# Learning: repo-hc Install Bootstrap to Project Root

## Links
- README: `../README.md`
- Prompt: `../prompts/03_repo-hc-install-bootstrap.md`
- Plan: `../plans/2026-03-11-publishable-repo-hc-package-bootstrap.md`

## Context
The package needed to support one-step installation with:

```bash
pnpm add repo-hc
```

while ensuring these assets appear in consumer project roots:

- `.agents/`
- `docs/`
- `AGENTS.md` (canonical)

## Decision
- Use `postinstall` to run an internal bootstrap command (`repo-hc install`).
- Implement a non-destructive copy strategy:
  - copy missing files/directories
  - preserve existing files by default
  - allow explicit overwrite via `repo-hc init --force`

## Implementation Structure
- `bin/repo-hc.cjs`: CLI command dispatch (`init`, `install`)
- `lib/bootstrap.cjs`: reusable recursive copy logic
- `package.json`: `bin`, `files`, `postinstall`, and test script

## Guardrails
- `install` never breaks package installation if bootstrap fails.
- `REPO_HC_SKIP_POSTINSTALL=1` allows skipping bootstrap in CI or controlled setups.
- Global installs are ignored by bootstrap to avoid writing outside intended project roots.

## Validation
- Added `node:test` coverage for copy and force-overwrite behavior.
- Updated docs to describe install behavior and manual re-run commands.
