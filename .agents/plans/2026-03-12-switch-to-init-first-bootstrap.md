# Plan: Switch to Init-First Bootstrap Flow

## Date
- 2026-03-12

## Goal
Use `repo-hc init` as the primary bootstrap action instead of `postinstall`, and keep the VS Code hide prompt in the `init` flow.

## Scope
1. Remove package `postinstall` script wiring.
2. Remove `install` command flow from CLI and move VS Code hide prompt handling into `init`.
3. Update docs (`README`, housekeeping docs, Mermaid) to describe init-first usage.
4. Update `.agents` learnings/prompts to avoid stale postinstall guidance.
5. Keep current bootstrap copy behavior (including examples-only filtering) unchanged.

## Non-Goals
- Changing copied asset set.
- Introducing additional commands or environment variables.

## Validation
- Run `node --test ./test/*.test.cjs`.
- Verify docs no longer describe postinstall as default bootstrap mechanism.
