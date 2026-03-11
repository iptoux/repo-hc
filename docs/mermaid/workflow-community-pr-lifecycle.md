# Workflow Community PR Lifecycle (Mermaid)

Back to docs:

- [Docs Home](../README.md)
- [Workflow Documentation](../workflow/README.md)
- [Project Rules](../project/rules.md)

## Contribution Lifecycle

```mermaid
flowchart TD
  A["Contributor Idea"] --> B["Create Feature Branch"]
  B --> C["Write Scoped Plan"]
  C --> D["Implement Focused Change"]
  D --> E["Update Docs + Mermaid"]
  E --> F["Validation"]
  F --> G["Open PR"]
  G --> H["Review"]
  H --> I["Merge"]
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
