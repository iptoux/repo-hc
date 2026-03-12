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

## Install Bootstrap Flow

```mermaid
flowchart LR
  ADD["pnpm add repo-hc"] --> POSTINSTALL["postinstall: repo-hc install"]
  POSTINSTALL --> COPY["Bootstrap Copy"]
  POSTINSTALL --> PROMPT["Prompt: Hide agent files in VS Code?"]
  COPY --> AGENTS[".agents/"]
  COPY --> EXAMPLES["Only examples in rules/learnings/plans/prompts"]
  COPY --> DOCS["docs/"]
  COPY --> AGENTSFILE["AGENTS.md (canonical)"]
  COPY --> SAFE["Non-destructive by default"]
  PROMPT -->|yes| VSCODE[".vscode/settings.json merge"]
  PROMPT -->|no/non-interactive| SKIP["No VS Code changes"]
```

