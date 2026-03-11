# Housekeeping User Guide

This guide explains what `repo-hc` is intended to provide for maintainers and teams.

## What Is `repo-hc`?

`repo-hc` is a planned developer package that helps AI agents perform repository housekeeping in a predictable way.

Primary target: OpenAI Codex workflows.

## Intended User Value

- cleaner pull requests
- better documentation consistency
- safer automation defaults
- reduced repo drift between code and docs
- clearer audit trails for AI-assisted changes

## Intended Usage Model (Future)

After publication, usage is expected to look like:

```bash
pnpm add repo-hc
```

During installation, `repo-hc` bootstraps the following assets into the project root:

- `.agents/`
- `docs/`
- `AGENTS.md` (canonical)
- `AGENT.md` (compatibility alias)

Manual re-run:

```bash
pnpm exec repo-hc init
```

## Typical Workflow

1. Start from repository `AGENTS.md` guidance.
2. Generate or validate a scoped plan.
3. Run housekeeping checks and recommendations.
4. Apply safe updates.
5. Record outcomes in docs and logs.

## Limitations (Current State)

- package runtime is not implemented in this repository yet
- npm publish is not available yet
- documentation currently defines architecture and process expectations

## Related

- [Housekeeping Overview](./README.md)
- [Housekeeping Developer Guide](./developers.md)
- [Workflow User Guide](../workflow/users.md)

