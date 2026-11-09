#!/usr/bin/env bash
# vibeX phone mode for Kali/Linux: serve on this machine's LAN address
# so a phone on the same Wi-Fi can open the token link printed in the console.
set -e
cd "$(dirname "$0")/.."
export DSH_HOME="$PWD/.dsh"
export VIBEX_LAN=1
exec node scripts/launch-gui.mjs "$@"
