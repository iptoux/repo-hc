# Rule: Require Feature Plans and Environment Variable Documentation

## Links
- README: `../README.md`
- Related Rule: `./04_use-dedicated-branch-for-large-features.md`
- Related Rule: `./06_require-comprehensive-feature-docs.md`

## Scope
This rule applies to all feature work, regardless of feature size.

## Requirement
Every feature must include:

1. A dedicated feature branch.
2. A scoped implementation plan before coding.
3. Documentation updates for any new environment variables.

## Branch Requirement
- Do not implement feature work directly on `main`.
- Use clear branch naming such as `feat/<topic>` or `feature/<topic>`.

## Plan Requirement
- Create or update a plan before implementation starts.
- Prefer storing plans under `.agents/plans/`.
- Keep the plan focused, actionable, and aligned with final implementation.

## Environment Variable Documentation Requirement
When introducing or changing environment variables:

- Add the variable to `.env.example` in the same change.
- Document it in relevant developer docs (at minimum in `docs/<feature>/developers.md` or equivalent).
- Include:
  - purpose
  - server-only vs public exposure scope
  - expected format/example placeholder
  - default/fallback behavior (if any)

## Enforcement
Feature work is incomplete if branch + plan + env-doc requirements are not satisfied.
