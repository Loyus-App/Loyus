---
name: full-check
description: Run the complete Loyus quality check suite (Biome, TypeScript, Jest, Maestro)
disable-model-invocation: true
allowed-tools: Bash(pnpm *)
---

# Full Quality Check

Run the complete verification suite for Loyus. Execute each step sequentially — stop and diagnose on failure before proceeding.

## Steps

### 1. Biome check

```bash
pnpm check:fix
```

Auto-fixes lint and format issues. If errors remain after auto-fix, diagnose and resolve them.

### 2. TypeScript

```bash
pnpm typecheck
```

Strict type checking. All errors must be resolved — no `any` escape hatches, no `@ts-ignore`.

### 3. Unit tests

```bash
pnpm test
```

Jest 29 suite. All tests must pass. If a test fails, diagnose the root cause and fix it.

### 4. E2E tests (if simulator available)

```bash
pnpm test:e2e
```

Maestro flows. Requires iOS simulator running. If the simulator is not available, skip this step and report it.

## Rules

- Do NOT skip failing steps — each must pass before moving to the next
- Report results for each step with pass/fail status
- If any step fails, diagnose and suggest fixes
- After all steps pass, report the full suite status
