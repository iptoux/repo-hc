# Rule: Always Mask Sensitive Data

## Links
- README: `../README.md`
- Related Rule: `./02_write-in-english.md`
- Related Rule: `./03_keep-readme-updated.md`

## Scope
This rule applies to the creation and maintenance of:

- Learnings
- Prompts
- Docs
- Notes and internal agent files

## Requirement
Sensitive data must always be masked or removed.
No real secrets may appear in files or examples.

## Never Store Unmasked
- API Keys
- Access Tokens / Refresh Tokens
- Passwords
- Private Keys / Certificate Contents
- Session-Cookies
- Webhook Secrets
- Connection strings with credentials
- Personal or confidential operational data

## Allowed Representation
Use placeholders only, for example:

- `<API_KEY_REDACTED>`
- `<TOKEN_REDACTED>`
- `<PASSWORD_REDACTED>`
- `<SECRET_REDACTED>`

## Decision Rule
If it is unclear whether a value is sensitive, treat it as sensitive and mask it.
