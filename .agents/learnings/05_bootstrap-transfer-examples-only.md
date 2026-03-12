# Learning: Bootstrap Transfers Examples-Only for Agent Artifacts

## Links
- README: `../README.md`
- Prompt: `../prompts/05_bootstrap-transfer-examples-only.md`
- Plan: `../plans/2026-03-12-bootstrap-transfer-examples-only.md`

## Context
`postinstall` previously copied full `.agents` trees, including repository-internal non-example files in `rules`, `learnings`, `plans`, and `prompts`.

## Decision
- Keep bootstrap targets unchanged (`.agents`, `docs`, `AGENTS.md`).
- Add `.agents` path filtering so:
  - `rules/examples/**` is copied
  - `learnings/examples/**` is copied
  - `plans/examples/**` is copied
  - `prompts/examples/**` is copied
  - non-example files in those four areas are not copied
- Keep existing non-destructive overwrite behavior unchanged.

## Implementation Structure
- `lib/bootstrap.cjs`: add reusable include-path filtering for `.agents` copy.
- `test/bootstrap.test.cjs`: add regression coverage for examples-only transfer.

## Validation
- `node --test ./test/*.test.cjs`
