# Workflow Docs System (Mermaid)

Back to docs:

- [Docs Home](../README.md)
- [Workflow Documentation](../workflow/README.md)
- [Housekeeping Documentation](../housekeeping/README.md)

## Self-Contained Documentation Structure

```mermaid
flowchart LR
  HOME["docs/README.md"] --> FEATURE["docs/<feature>/README.md"]
  FEATURE --> DEV["docs/<feature>/developers.md"]
  FEATURE --> USER["docs/<feature>/users.md"]
  FEATURE --> MMD["docs/mermaid/*"]
  AGENTS[".agents/rules + plans + learnings + prompts"] --> FEATURE
```

## Documentation Sync Workflow

```mermaid
flowchart LR
  CHANGE["Behavior / Workflow Change"] --> SCOPE["Scope Review"]
  SCOPE --> DOCS["Update Feature Docs"]
  DOCS --> DIAGRAMS["Update Mermaid Diagrams"]
  DIAGRAMS --> INDEX["Update docs/README Index"]
  INDEX --> REVIEW["PR Review"]
```
