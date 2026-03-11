# Housekeeping Documentation

This section documents the planned `repo-hc` npm package for automated GitHub housekeeping with AI-agent guidance.

Core install behavior:

```bash
pnpm add repo-hc
```

This bootstraps `.agents/`, `docs/`, and `AGENTS.md` into the project root.
`AGENT.md` is generated as a compatibility alias from `AGENTS.md`.

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
