# Housekeeping Package Architecture (Mermaid)

Back to docs:

- [Docs Home](../README.md)
- [Housekeeping Documentation](../housekeeping/README.md)
- [Workflow Documentation](../workflow/README.md)

## Module Boundaries

```mermaid
flowchart LR
  CLI["CLI / Command Entry"] --> ORCH["Orchestration"]
  ORCH --> POLICY["Policy Engine"]
  ORCH --> PLAN["Plan Manager"]
  ORCH --> GH["GitHub Adapter"]
  ORCH --> REPORT["Reporting"]

  CONFIG["Config + Env"] --> ORCH
  TYPES["Shared Types"] --> ORCH
  TYPES --> POLICY
  TYPES --> GH
```

## Security Control Points

```mermaid
flowchart TD
  INPUT["User/Repo Input"] --> VALIDATE["Input Validation"]
  VALIDATE --> PERM["Permission + Scope Check"]
  PERM --> ACTION["Read/Write GitHub Action"]
  ACTION --> AUDIT["Audit Report"]

  PERM -->|deny| BLOCK["Blocked Operation"]
```
