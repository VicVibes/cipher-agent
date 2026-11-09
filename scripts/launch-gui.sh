#!/usr/bin/env bash
# vibeX GUI launcher for Kali/Linux.
# Boots the vibeX engine and opens the UI in a standalone Chrome/Chromium app window.
set -e
cd "$(dirname "$0")/.."
export DSH_HOME="$PWD/.dsh"
exec node scripts/launch-gui.mjs "$@"
