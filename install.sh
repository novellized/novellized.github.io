#!/usr/bin/env bash
set -e

REPO="novellized/novellized-editor"
API_URL="https://api.github.com/repos/$REPO/releases/latest"

echo "===================================================="
echo "   Novellized Studio Linux Installer"
echo "===================================================="

ARCH=$(uname -m)
if [ "$ARCH" != "x86_64" ]; then
    echo "[ERROR] Currently, Novellized Studio supports x86_64 architectures. Detected: $ARCH"
    exit 1
fi

echo "[INFO] Querying latest release from GitHub..."
RELEASE_JSON=$(curl -fsSL -H "Accept: application/vnd.github.v3+json" "$API_URL" || true)

if [ -z "$RELEASE_JSON" ]; then
    echo "[ERROR] Failed to query releases from GitHub API."
    exit 1
fi

DEB_URL=$(echo "$RELEASE_JSON" | grep -o 'https://github.com/[^"]*novellized-studio[^"]*_amd64\.deb' | head -n 1)

if [ -z "$DEB_URL" ]; then
    echo "[ERROR] Could not find a suitable .deb release asset in latest release."
    exit 1
fi

TMP_DEB="/tmp/novellized-studio-latest.deb"
echo "[INFO] Downloading: $DEB_URL ..."
curl -fSL "$DEB_URL" -o "$TMP_DEB"

echo "[INFO] Installing via apt..."
if [ "$(id -u)" -eq 0 ]; then
    apt install -y "$TMP_DEB"
else
    sudo apt install -y "$TMP_DEB"
fi

rm -f "$TMP_DEB"

echo ""
echo "===================================================="
echo "   Novellized Studio successfully installed!"
echo "   Launch it by typing 'novellized' or from your"
echo "   Desktop Applications menu."
echo "===================================================="
