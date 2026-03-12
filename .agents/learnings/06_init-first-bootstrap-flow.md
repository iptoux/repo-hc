# Learning: Init-First Bootstrap Flow

## Links
- README: `../README.md`
- Prompt: `../prompts/06_init-first-bootstrap-flow.md`
- Plan: `../plans/2026-03-12-switch-to-init-first-bootstrap.md`

## Context
`postinstall` required pnpm build-script approval in many setups and reduced install UX predictability.

## Decision
- Use `repo-hc init` as the explicit bootstrap entrypoint after package installation.
- Remove `postinstall` script wiring from `package.json`.
- Keep VS Code hide prompt behavior, but run it from `init`.
- Keep bootstrap copy behavior non-destructive and unchanged.

## Implementation Structure
- `package.json`: remove `postinstall`
- `bin/repo-hc.cjs`: remove `install` command and run VS Code prompt in `init`
- `docs/*`: update usage, workflow, and Mermaid flow to init-first

## Validation
- `node --test ./test/*.test.cjs`
