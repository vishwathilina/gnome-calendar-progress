#!/usr/bin/env bash
set -euo pipefail

# Package this extension in a zip that GNOME Extensions website accepts.
# Produces: dist/<uuid>.v<version>.shell-extension.zip containing a top-level
# directory named exactly like the UUID, with extension.js, metadata.json, etc.

ROOT_DIR=$(cd "$(dirname "$0")" && pwd)
cd "$ROOT_DIR"

# Determine archiver implementation
HAVE_ZIP=0
if command -v zip >/dev/null 2>&1; then
  HAVE_ZIP=1
elif ! command -v python3 >/dev/null 2>&1; then
  echo "Error: Need either 'zip' or 'python3' available to create archive." >&2
  exit 1
fi

# Read uuid and version from metadata.json (jq if available, fallback to grep/sed)
if command -v jq >/dev/null 2>&1; then
  UUID=$(jq -r .uuid metadata.json)
  VERSION=$(jq -r .version metadata.json)
else
  UUID=$(grep -Po '"uuid"\s*:\s*"\K[^"]+' metadata.json)
  VERSION=$(grep -Po '"version"\s*:\s*\K[0-9]+' metadata.json)
fi

if [[ -z "${UUID:-}" || -z "${VERSION:-}" ]]; then
  echo "Error: Failed to read uuid/version from metadata.json" >&2
  exit 1
fi

STAGE_DIR="$ROOT_DIR/build/$UUID"
DIST_DIR="$ROOT_DIR/dist"

echo "• Packaging extension: $UUID (version $VERSION)"
rm -rf "$STAGE_DIR" "$DIST_DIR"
mkdir -p "$STAGE_DIR" "$DIST_DIR"

# Copy required files
cp "$ROOT_DIR/metadata.json" "$STAGE_DIR/"
cp "$ROOT_DIR/extension.js" "$STAGE_DIR/"
if [[ -f "$ROOT_DIR/prefs.js" ]]; then cp "$ROOT_DIR/prefs.js" "$STAGE_DIR/"; fi
if [[ -f "$ROOT_DIR/stylesheet.css" ]]; then cp "$ROOT_DIR/stylesheet.css" "$STAGE_DIR/"; fi

if [[ -d "$ROOT_DIR/schemas" ]]; then
  mkdir -p "$STAGE_DIR/schemas"
  cp "$ROOT_DIR/schemas"/*.xml "$STAGE_DIR/schemas/" 2>/dev/null || true
  # Optional: compile schemas for local installs; harmless if present in zip
  if command -v glib-compile-schemas >/dev/null 2>&1; then
    glib-compile-schemas "$STAGE_DIR/schemas/" || true
  fi
fi

# Create a flat zip (no top-level folder) as required by extensions.gnome.org
ZIP_NAME="$UUID.v$VERSION.shell-extension.zip"
if [[ $HAVE_ZIP -eq 1 ]]; then
  (
    cd "$STAGE_DIR" && \
    zip -r -9 "$DIST_DIR/$ZIP_NAME" . \
      -x '*/.*' '*.map' '*~' '*.swp' '*.bak'
  )
else
  # Python fallback archiver
  python3 - "$STAGE_DIR" "$DIST_DIR/$ZIP_NAME" <<'PY'
import os, sys, zipfile
src = sys.argv[1]
dst = sys.argv[2]
excludes = ('.git', '.svn')
with zipfile.ZipFile(dst, 'w', compression=zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(src):
        # prune hidden/ignored dirs
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in excludes]
        for f in files:
            if f.startswith('.') or f.endswith(('~', '.swp', '.bak', '.map')):
                continue
            full = os.path.join(root, f)
            arc = os.path.relpath(full, src)
            zf.write(full, arc)
print(dst)
PY
fi

echo "✓ Created: $DIST_DIR/$ZIP_NAME"
echo "Upload this file to https://extensions.gnome.org/upload/"
