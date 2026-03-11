# Security Policy

## Supported Versions

The latest `main` branch is the supported target for security fixes.

| Version | Supported |
| --- | --- |
| latest (`main`) | Yes |
| older commits | No |

## Reporting a Vulnerability

Do not report vulnerabilities publicly.

Use one of these private channels:

1. GitHub Security Advisories for this repository
2. Private maintainer security contact configured for this project

## What to Include in a Report

- clear description of impact
- affected area (for example: policy, orchestration, GitHub adapter, docs workflow)
- reproducible steps
- proof of concept (if available)
- suggested mitigation (optional)

## Security Focus Areas

- secret handling and masking
- token scope and least-privilege permissions
- unsafe or destructive automation paths
- authorization and guardrail bypasses
- injection risks from untrusted input
- sensitive data exposure in logs/reports

## Response Timeline

- acknowledgement target: within 72 hours
- triage update target: within 7 days
- remediation timeline depends on severity and exploitability

Critical issues are prioritized.

## Disclosure Policy

This project follows coordinated disclosure:

1. private validation and triage
2. fix preparation and review
3. advisory publication when appropriate
4. reporter credit unless anonymity is requested
