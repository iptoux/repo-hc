# Workflow Community PR Lifecycle (Mermaid)

Back to docs:

- [Docs Home](../README.md)
- [Workflow Documentation](../workflow/README.md)
- [Project Rules](../project/rules.md)
- [AGENTS.md](../../AGENTS.md)
- [CLAUDE.md](../../CLAUDE.md)

## Contribution Lifecycle

```mermaid
flowchart TD
  A["Contributor Idea"] --> B["Read AGENTS.md or CLAUDE.md"]
  B --> C["Create Feature Branch"]
  C --> D["Write Scoped Plan"]
  D --> E["Implement Focused Change"]
  E --> F["Update Docs + Mermaid"]
  F --> G["Validation"]
  G --> H["Open PR"]
  H --> I["Review"]
  I --> J["Merge"]
```

## Quality Effects

```mermaid
flowchart LR
  BRANCH["Scoped Branch"] --> CLEAN["Cleaner Diffs"]
  PLAN["Plan-First"] --> TRACE["Clear Intent"]
  DOCSYNC["Docs in Same PR"] --> ALIGN["Behavior/Docs Aligned"]
  CLEAN --> REVIEW["Faster Review"]
  TRACE --> REVIEW
  ALIGN --> TRUST["Higher Maintainer Trust"]
```
