# Plan: Claude CLI Documentation Sync

## Goal

Update all repository docs and README files so Claude CLI support is clearly documented alongside existing AI-agent guidance.

## Scope

1. Add consistent references to `CLAUDE.md` in root and `docs/` markdown files where agent guidance is described.
2. Clarify Anthropic Claude CLI support in workflow and project-rule documentation.
3. Keep existing behavior statements accurate (no undocumented runtime behavior changes).
4. Update Mermaid documentation text where agent-guidance entrypoints are described.

## Non-Goals

- Changing package runtime behavior in code.
- Introducing new environment variables.
- Refactoring unrelated documentation sections.

## Validation

1. Verify all updated docs remain internally consistent.
2. Confirm markdown links are valid and paths resolve.
3. Confirm wording does not claim unsupported runtime behavior.
