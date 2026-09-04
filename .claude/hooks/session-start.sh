#!/bin/bash
set -euo pipefail

# Only run this setup in Claude Code on the web (remote sessions).
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Power Platform CLI (pac) requires the .NET 10 SDK.
if ! dpkg -s dotnet-sdk-10.0 >/dev/null 2>&1; then
  sudo apt-get update -qq
  sudo apt-get install -y dotnet-sdk-10.0
fi

# dotnet global tools install to ~/.dotnet/tools
export PATH="$PATH:$HOME/.dotnet/tools"

if ! command -v pac >/dev/null 2>&1; then
  dotnet tool install --global Microsoft.PowerApps.CLI.Tool
fi

# Persist PATH for the rest of the session.
echo "export PATH=\"\$PATH:$HOME/.dotnet/tools\"" >> "$CLAUDE_ENV_FILE"
