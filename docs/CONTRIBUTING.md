# Contributing to Loyus

Thanks for considering a contribution. This document covers the development workflow, CI/CD pipeline, and repository conventions.

## Dev setup

```bash
pnpm install         # triggers `prepare` script, which wires Husky hooks
```

After install, commits will run `pnpm lint-staged` automatically (fast Biome check on staged files only). To skip in an emergency: `git commit --no-verify`. CI enforces the same checks, so skipping only delays the pain.

## Quality gates (local)

```bash
pnpm check:fix       # Biome lint + format (autofix)
pnpm typecheck       # TypeScript strict
pnpm test            # Jest unit tests
pnpm test:e2e        # Maestro E2E (requires iOS simulator + Maestro CLI)
```

## CI pipeline

Four workflows run on every PR and push to `main`:

| Workflow            | Trigger                    | Purpose                                       |
|---------------------|----------------------------|-----------------------------------------------|
| `ci.yml`            | PR + push `main`           | Lint (Biome) / Typecheck (tsc) / Unit tests (Jest) in parallel |
| `e2e.yml`           | PR + push `main`           | Maestro E2E on macOS + iOS simulator          |
| `pr-title.yml`      | PR open/edit/sync          | Enforce conventional commit title             |
| `eas-build.yml`     | Manual dispatch + push `main` paths | EAS preview build (non-blocking, --no-wait) |
| `eas-submit.yml`    | Push tag `v*` + manual     | Production build + submit to App Store / Play |

### PR title convention

All PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <Subject starting with capital letter>
```

Allowed types: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`, `perf`, `ci`, `build`, `style`, `revert`. Scope is optional (domain layer: `domain`, state: `state`, a phase number like `06`, etc.).

### Release flow

1. Merge feature PRs to `main` (each PR triggers CI + E2E + preview build).
2. When ready for a release, tag on `main`:
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```
3. `eas-submit.yml` builds production and submits to:
   - iOS App Store Connect (for TestFlight, then promotable to App Store)
   - Google Play Console (internal track, draft status — promote manually)

To dispatch manually with a platform/profile picker: Actions → EAS Submit → Run workflow.

## Repository secrets (publisher-only)

These live in **repo Settings → Secrets and variables → Actions**. Not required for contributor PRs (EAS workflows skip if token missing and repo != `Loyus-App/Loyus`).

| Secret                            | Used by                | How to get it                                                          |
|-----------------------------------|------------------------|------------------------------------------------------------------------|
| `EXPO_TOKEN`                      | eas-build + eas-submit | https://expo.dev/accounts/<owner>/settings/access-tokens (Personal Access Token) |
| `APPLE_ID`                        | eas-submit (iOS)       | Apple ID email of the App Store Connect account                        |
| `ASC_APP_ID`                      | eas-submit (iOS)       | App Store Connect → your app → App Information → Apple ID (numeric)    |
| `APPLE_TEAM_ID`                   | eas-submit (iOS)       | Apple Developer → Membership → Team ID (10 chars, uppercase)           |
| `GOOGLE_SERVICE_ACCOUNT_JSON`     | eas-submit (Android)   | Play Console → API access → Create service account → download JSON (paste full JSON content as the secret value) |

### Required GitHub Actions environment

The `eas-submit` workflow uses an environment named `production`. Create it under Settings → Environments → New environment → `production`, and (recommended) add:

- **Required reviewers** — at least one approver before a deploy proceeds
- **Deployment branches** — restrict to `main` only
- **Wait timer** — optional 5 min grace to cancel accidental tags

## Branch protection (recommended settings)

Under **Settings → Branches → Branch protection rules** for `main`:

- Require a pull request before merging
- Require approvals — 1 (solo) or 2 (team)
- Dismiss stale reviews on new commits
- **Require status checks to pass before merging:**
  - `Lint (Biome)`
  - `Typecheck`
  - `Unit tests (Jest)`
  - `e2e-ios`
  - `PR Title / Validate conventional commit title`
- Require branches to be up to date before merging
- Require linear history (no merge commits)
- Include administrators (keeps Arthur honest too)
- Restrict who can push to matching branches — only `main` requires PR, other branches are free

## Code conventions

- Strict 4-layer architecture — see root `CLAUDE.md` and `.claude/rules/*`
- TypeScript strict, no `any` (Biome enforces)
- No `console.log` in committed code
- New user-facing strings → add to all 6 locale files (`src/infra/i18n/locales/`)
- Domain layer → zero RN/Expo imports (test enforces)
- No network calls on critical path (test enforces)
- Commits in English; conventional style (`type(scope): message`)
