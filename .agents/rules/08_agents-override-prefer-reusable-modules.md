# AGENTS Override: Prefer Reusable Internal Modules

## Links
- README: `../README.md`
- Related Rule: `./03_keep-readme-updated.md`

## Override Policy
Whenever useful, prefer reusable internal modules over one-off implementation blocks.

## Applies To
- policy definitions
- orchestration helpers
- GitHub adapter logic
- shared utilities and domain helpers
- shared type contracts

## Decision Heuristic
Prefer extracting a reusable module when at least one condition is true:

- logic is likely to be reused by multiple workflows
- logic encodes shared domain behavior
- logic is expected to grow and needs isolated tests
- keeping it inline would duplicate patterns

## Exception
Keep implementation local when it is clearly one-off and unlikely to be reused.
