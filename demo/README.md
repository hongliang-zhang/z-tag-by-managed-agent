# Z Tag Configuration Demo

The application is deployable as a standalone Next.js service. It includes:

- `/` — interactive Z Tag configuration demo
- `/product-plan` — full product plan rendered as HTML
- `/technical-plan` — full technical plan rendered as HTML

## Implemented flow

1. Open #agent-platform Channel Scope.
2. Create the prefilled agent-platform-write Access Bundle.
3. Review Connection, Repository, Domain, Plugin and Instructions.
4. Attach the elevated Bundle to the public channel and confirm risk.
5. Inspect Effective Access diff and provenance.
6. Open Channel Preview and validate success, revoked and 403/no-fallback scenarios.

## Local development

```bash
npm install
npm run dev
```

## Production validation

- ESLint and the production Next.js build pass.
- The complete create → save → attach → risk confirm → channel preview path is stateful.
- Success, Credential revoked and 403/no-fallback scenarios are included.
- Product and technical plans are statically generated from the reviewed Markdown sources.
- No real credentials, APIs, repositories or LLM calls are used.
