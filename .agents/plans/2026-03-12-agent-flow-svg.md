# Plan: Add Agent Flow SVG Asset

## Date
- 2026-03-12

## Goal
Create an additional SVG in the same visual style as `docs/assets/codex-workflow.svg` that illustrates the agent flow:
- scan repo
- create plan
- create branch
- implement plan
- update docs
- run tests
- verify

## Scope
1. Create a new SVG under `docs/assets/` with matching visual language (panel, cards, arrows, color classes).
2. Keep text concise and readable with light/dark mode compatibility.
3. Ensure the diagram clearly represents the ordered flow from start to verification.

## Non-Goals
- Changing existing SVG assets.
- Updating runtime/package behavior.

## Validation
- Open/read the SVG content and verify all requested steps are present.
- Keep SVG syntax valid and self-contained.
