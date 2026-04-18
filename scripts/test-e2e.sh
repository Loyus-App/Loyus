#!/usr/bin/env bash
set -euo pipefail

EXPECTED=$(cat .maestro/maestro-version)
ACTUAL=$(maestro --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)

if [ "$ACTUAL" != "$EXPECTED" ]; then
  echo "ERROR: Maestro version mismatch. Expected $EXPECTED, got ${ACTUAL:-not installed}"
  echo "Install: export MAESTRO_VERSION=$EXPECTED; curl -fsSL https://get.maestro.mobile.dev | bash"
  exit 1
fi

maestro test .maestro/
