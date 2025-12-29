#!/bin/bash

# Uninstallation script for Calendar Progress Bar Extension

set -e

EXTENSION_UUID="calendar-progress@gnome-extensions"
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/$EXTENSION_UUID"

echo "🗑️  Uninstalling Calendar Progress Bar Extension..."

# Disable the extension
echo "⏸️  Disabling extension..."
gnome-extensions disable "$EXTENSION_UUID" 2>/dev/null || true

# Remove extension directory
if [ -d "$EXTENSION_DIR" ]; then
    echo "📦 Removing extension files..."
    rm -rf "$EXTENSION_DIR"
    echo "✅ Extension removed successfully!"
else
    echo "⚠️  Extension directory not found: $EXTENSION_DIR"
fi

echo ""
echo "To complete uninstallation, restart GNOME Shell:"
echo "- X11: Press Alt+F2, type 'r', and press Enter"
echo "- Wayland: Log out and log back in"
echo ""
echo "Extension uninstalled! 👋"
