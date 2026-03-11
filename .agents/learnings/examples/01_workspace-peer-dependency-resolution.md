# Workspace Peer-Dependency Resolution: Example Learning

## Links
- README: `../../README.md`
- Prompt: `../../prompts/examples/01_workspace-peer-dependency-resolution.md`

## Context
During dependency installation in a multi-module workspace, peer dependency warnings appeared for transitive packages.

## Root Cause
An indirect dependency introduced stricter peer requirements that were not satisfied by the currently resolved versions.

## Proven Fix
Add explicitly compatible versions in affected modules and run dependency installation again so the lockfile is updated.

## Result
Peer dependency warnings disappear after installation.

## Setup Note For Later
When dependencies move between beta/alpha channels, verify peer requirements first and pin compatible versions where needed.
