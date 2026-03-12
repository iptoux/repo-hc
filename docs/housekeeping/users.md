# Housekeeping User Guide

This guide explains what `repo-hc` is intended to provide for maintainers and teams.

## What Is `repo-hc`?

`repo-hc` is a planned developer package that helps AI agents perform repository housekeeping in a predictable way.

Primary targets: OpenAI Codex workflows and Anthropic Claude CLI workflows.

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

```bash
pnpm add repo-hc
pnpm exec repo-hc init
```

After running `repo-hc init`, these assets are bootstrapped into the project root:

- `.agents/`
- `docs/`
- `AGENTS.md` (canonical)

If `repo-hc init` runs in an interactive terminal, it asks whether these common agent files and directories should be hidden in VS Code Explorer.  
If accepted, `.vscode/settings.json` is created or merged with `files.exclude` entries for `.agents` and `AGENTS.md`.
For `.agents/rules`, `.agents/learnings`, `.agents/plans`, and `.agents/prompts`, only `examples/` content is transferred to your project.

Manual re-run:

```bash
pnpm exec repo-hc init
```

## Typical Workflow

1. Start from repository `AGENTS.md` guidance.
2. For Claude CLI workflows, apply repository `CLAUDE.md` guidance.
3. Generate or validate a scoped plan.
4. Run housekeeping checks and recommendations.
5. Apply safe updates.
6. Record outcomes in docs and logs.

## Limitations (Current State)

- package runtime is not implemented in this repository yet
- npm publish is not available yet
- documentation currently defines architecture and process expectations

## Related

- [Housekeeping Overview](./README.md)
- [Housekeeping Developer Guide](./developers.md)
- [Workflow User Guide](../workflow/users.md)
- [AGENTS.md](../../AGENTS.md)
- [CLAUDE.md](../../CLAUDE.md)


