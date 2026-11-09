#!/usr/bin/env bash
# vibeX admin mode for Kali/Linux: run the whole agent elevated.
# Needed for raw-socket tools (nmap SYN scans, packet capture, binding <1024).
# Only run this on a machine you own.
set -e
cd "$(dirname "$0")/.."
if [ "$(id -u)" -eq 0 ]; then
  export DSH_HOME="$PWD/.dsh"
  exec node scripts/launch-gui.mjs "$@"
fi
echo "  Admin mode needs root. You will be asked for your password."
exec sudo -E env "DSH_HOME=$PWD/.dsh" node scripts/launch-gui.mjs "$@"
