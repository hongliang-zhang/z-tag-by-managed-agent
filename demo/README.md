# Z Tag Configuration Demo

Production demo: https://z-tag-configuration-demo.hl-z.chatgpt.site

## Implemented flow

1. Open #agent-platform Channel Scope.
2. Create the prefilled agent-platform-write Access Bundle.
3. Review Connection, Repository, Domain, Plugin and Instructions.
4. Attach the elevated Bundle to the public channel and confirm risk.
5. Inspect Effective Access diff and provenance.
6. Open Channel Preview and validate success, revoked and 403/no-fallback scenarios.

## Validation

- Production build and Sites artifact validation passed.
- Browser-tested the complete create → save → attach → risk confirm → channel preview path.
- Browser-tested Success, Credential revoked and 403/no-fallback results.
- No real credentials, APIs, repositories or LLM calls are used.

The runnable site is maintained through Sites; this directory contains the core application source mirrored for research and review.
