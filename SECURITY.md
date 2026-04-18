# Security Policy

## Supported versions

Loyus follows the latest public release only. Security fixes land on `main` and ship in the next App Store / Play Store update.

| Version | Supported |
|---------|-----------|
| Latest  | Yes       |
| Older   | No        |

## Reporting a vulnerability

**Please do not open a public issue for security bugs.** Use GitHub's private Security Advisories instead:

1. Go to <https://github.com/Loyus-App/Loyus/security/advisories/new>
2. Describe the issue, impact, and — if possible — a minimal reproduction.
3. I'll acknowledge within 72 hours and work with you on a fix.

If you cannot use Security Advisories, email `arthurmtro@gmail.com` with `[SECURITY]` in the subject line.

## Scope

Loyus is offline-first and ships no server. The threat model is:

- **On-device data exposure** — loyalty codes leaking to other apps, being logged, or included in crash reports.
- **Camera misuse** — anything that would persist, transmit, or log camera frames.
- **Unintended network calls** — any code path that hits a remote endpoint (the critical path is CI-tested to have none).
- **MMKV bypass** — cross-app access to the local store.
- **Dependency CVEs** — vulnerable transitive deps (Dependabot monitors these weekly).

Issues outside this scope (e.g., "an attacker with full physical device access can read the data") are noted but typically not addressed — the iOS/Android sandbox is the defense.

## Coordinated disclosure

I'd appreciate a 30-day embargo between a confirmed report and public disclosure so a release can ship to both stores. Longer if the fix requires a non-trivial architectural change.

## Hall of thanks

Contributors who report valid issues will be credited here (with permission).
