# repo-hc

<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Status-Planning-2563EB?style=for-the-badge" alt="Status: Planning" /></a>
  <a href="./README.md"><img src="https://img.shields.io/badge/npm-package%20(target)-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm package target" /></a>
  <a href="https://openai.com/"><img src="https://img.shields.io/badge/AI-OpenAI%20Codex-111827?style=for-the-badge&logo=openai&logoColor=white" alt="AI: OpenAI Codex" /></a>
  <a href="./docs/README.md"><img src="https://img.shields.io/badge/Docs-Structured-0EA5E9?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Documentation: structured" /></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-DC2626?style=for-the-badge&logo=shield&logoColor=white" alt="Security policy" /></a>
  <a href="./LICENSE.txt"><img src="https://img.shields.io/badge/License-AGPL--3.0-6B7280?style=for-the-badge" alt="License: AGPL-3.0" /></a>
</p>

<h3 align="center">
  <code>repo-hc</code> is a future developer npm package for automated GitHub housekeeping.<br/>
  It provides AI-agent guidance and workflow contracts to keep repositories clean, secure, and well documented.
</h3>

> [!IMPORTANT]
> The npm package is not published yet. This repository currently focuses on architecture, rules, and documentation.

## Vision

`repo-hc` is designed to standardize how an AI agent maintains a repository by enforcing repeatable housekeeping practices:

- plan-first execution
- branch discipline
- security-aware changes
- synchronized documentation
- explicit auditability of AI-assisted work

## AI Agent Workflow System

AI-assisted work in this repository is guided by [AGENTS.md](./AGENTS.md) and the local [`.agents/`](./.agents/README.md) knowledge base:

![repo-hc AI Workflow](./docs/assets/codex-workflow.svg)

- [AGENTS.md](./AGENTS.md): baseline collaboration, architecture, security, and documentation rules
- [`.agents/rules/`](./.agents/rules/): user-defined operational rules
- [`.agents/skills/`](./.agents/skills/): reusable `SKILL.md` playbooks
- [`.agents/learnings/`](./.agents/learnings/): implementation learnings and decisions
- [`.agents/prompts/`](./.agents/prompts/): sanitized source prompts for traceability
- [`.agents/plans/`](./.agents/plans/): scoped feature implementation plans


Initial optimization target: **OpenAI Codex**.

## Planned Installation (When Published)

```bash
<package-manager> add -D <package-name>
```

The final package name is still pending. Until publish time, this repository is the source of truth for the workflow model and documentation.

> [!TIP]
> Start every AI-assisted task with [AGENTS.md](./AGENTS.md), then continue with [`.agents/README.md`](./.agents/README.md), then [docs/README.md](./docs/README.md).
> The effective behavior rules are user-defined in [`/.agents/rules`](./.agents/rules/).

## What The Package Will Cover

- repository hygiene workflows for AI agents
- change planning and branch policies
- documentation synchronization rules
- security and secret-handling safeguards
- reusable prompts, learnings, and skills integration

## Documentation System

Project documentation is centralized in [`docs/`](./docs/) and organized by feature, audience, and architecture diagrams:

- [`docs/README.md`](./docs/README.md): docs index and reading order
- [`docs/project/`](./docs/project/): global standards and rules
- [`docs/workflow/`](./docs/workflow/): contributor workflow guides
- [`docs/housekeeping/`](./docs/housekeeping/): package-specific developer and user docs
- [`docs/mermaid/`](./docs/mermaid/): architecture and workflow diagrams

## Repository Layout

- [AGENTS.md](./AGENTS.md): baseline guidance for AI-assisted implementation
- [`.agents/`](./.agents/README.md): internal rules, prompts, learnings, plans, and skills
- [docs/](./docs/README.md): public project documentation and Mermaid diagrams
- [CONTRIBUTING.md](./CONTRIBUTING.md): contributor workflow
- [SECURITY.md](./SECURITY.md): vulnerability reporting and security baseline

## Contributing

Please follow the process in [CONTRIBUTING.md](./CONTRIBUTING.md).

Short version:

1. Create a dedicated feature branch.
2. Create a scoped plan in `.agents/plans/` before implementation.
3. Keep documentation in sync with every behavior or workflow change.

## License

Licensed under AGPL-3.0. See [LICENSE.txt](./LICENSE.txt).
