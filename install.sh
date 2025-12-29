#!/bin/bash

# Installation script for Calendar Progress Bar Extension

set -e

EXTENSION_UUID="calendar-progress@gnome-extensions"
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/$EXTENSION_UUID"

echo "🚀 Installing Calendar Progress Bar Extension..."

# Create extension directory
mkdir -p "$EXTENSION_DIR"

# Copy extension files
echo "📦 Copying extension files..."
cp extension.js "$EXTENSION_DIR/"
cp prefs.js "$EXTENSION_DIR/"
cp metadata.json "$EXTENSION_DIR/"
cp stylesheet.css "$EXTENSION_DIR/"

# Copy schemas
echo "📋 Copying schemas..."
mkdir -p "$EXTENSION_DIR/schemas"
cp schemas/*.xml "$EXTENSION_DIR/schemas/"

# Compile schemas
echo "🔧 Compiling schemas..."
glib-compile-schemas "$EXTENSION_DIR/schemas/"

echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Restart GNOME Shell:"
echo "   - X11: Press Alt+F2, type 'r', and press Enter"
echo "   - Wayland: Log out and log back in"
echo ""
echo "2. Enable the extension:"
echo "   gnome-extensions enable $EXTENSION_UUID"
echo ""
echo "3. Configure the extension (optional):"
echo "   gnome-extensions prefs $EXTENSION_UUID"
echo ""
echo "Enjoy! 🎉"
