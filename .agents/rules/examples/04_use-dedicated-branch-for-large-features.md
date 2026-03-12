# Rule: Use a Dedicated Git Branch for Large Features

## Links
- README: `../README.md`
- Related Rule: `./03_keep-readme-updated.md`

## Scope
This rule applies to all new large feature work.

## Requirement
For every new large feature, create and use a dedicated git branch.
Do not implement large features directly on `main`.

## What Counts as a Large Feature
Treat work as a large feature if one or more of the following is true:

- It affects multiple modules, docs sections, or workflows.
- It introduces new architecture, major workflows, or cross-cutting behavior.
- It requires multiple commits over more than one working session.
- It has elevated risk, migration impact, or broad testing surface.

## Branch Guidance
- Use clear branch names, for example: `feat/<topic>` or `feature/<topic>`.
- Keep branch scope focused to one feature.
- Open a PR for review before merge.
