# Housekeeping Documentation

This section documents the planned `repo-hc` npm package for automated GitHub housekeeping with AI-agent guidance.

Core install behavior:

```bash
pnpm add repo-hc
pnpm exec repo-hc init
```

`repo-hc init` bootstraps `.agents/`, `docs/`, and `AGENTS.md` into the project root.
When `repo-hc init` runs interactively, users are prompted to optionally add VS Code `files.exclude` entries for common agent files.
For `.agents/rules`, `.agents/learnings`, `.agents/plans`, and `.agents/prompts`, bootstrap transfers only each folder's `examples/` content.

Claude CLI support note:

- this repository provides `CLAUDE.md` for Anthropic Claude CLI guidance
- package bootstrap currently guarantees `AGENTS.md` as canonical transfer file

## Documents

- [Developer Guide](./developers.md)
- [User Guide](./users.md)

## Related Diagrams

- [Housekeeping Package Architecture](../mermaid/housekeeping-architecture.md)
- [Docs System and Sync Flow](../mermaid/workflow-docs-system.md)

## Related

- [Docs Home](../README.md)
- [Workflow Overview](../workflow/README.md)
- [AGENTS.md](../../AGENTS.md)
- [CLAUDE.md](../../CLAUDE.md)

