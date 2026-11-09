#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 24.9+ is required. Install it from https://nodejs.org/ or with nvm, then retry." >&2
  exit 1
fi

if ! node -e 'const [major, minor] = process.versions.node.split(".").map(Number); process.exit(major > 24 || (major === 24 && minor >= 9) ? 0 : 1);'; then
  echo "CIPHER requires Node.js 24.9+. Update Node.js, then retry." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm was not found. Reinstall Node.js 24.9+ and retry." >&2
  exit 1
fi

if [ ! -f node-app/node_modules/@deepseek-ai/dsh/lib/bin.js ]; then
  echo "Installing CIPHER CLI dependencies. This may take a few minutes..."
  npm install --prefix node-app
fi

exec node scripts/launch-cli.mjs "$@"
