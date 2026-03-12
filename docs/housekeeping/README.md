# Housekeeping Documentation

This section documents the planned `repo-hc` npm package for automated GitHub housekeeping with AI-agent guidance.

Core install behavior:

```bash
pnpm add repo-hc
```

This bootstraps `.agents/`, `docs/`, and `AGENTS.md` into the project root.
In interactive installs, users are prompted to optionally add VS Code `files.exclude` entries for common agent files.
For `.agents/rules`, `.agents/learnings`, `.agents/plans`, and `.agents/prompts`, bootstrap transfers only each folder's `examples/` content.

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

