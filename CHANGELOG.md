# Updates - Version 3

## What's New

### ✨ Single-Line Horizontal Layout
- Progress bars now display side-by-side in one line
- Cleaner, more compact appearance
- Better integration with panel

### 👁️ Show/Hide Individual Bars
- Toggle Day progress bar on/off
- Toggle Year progress bar on/off
- Show only what you want to see
- Separator automatically hides when only one bar is shown

### 📍 Customizable Panel Position
- Choose Left, Center, or Right panel position
- Position the indicator wherever you prefer
- Changes apply after GNOME Shell restart

## New Settings

Open preferences to access new options:
```bash
gnome-extensions prefs calendar-progress@gnome-extensions
```

### Display Options
- **Show Day Progress** - Toggle day progress bar
- **Show Year Progress** - Toggle year progress bar
- **Show Labels** - Toggle "Day:" and "Year:" text

### Panel Position
- **Panel Position** - Choose Left, Center, or Right

## Migration from Version 2

Your existing settings (colors, sizes) will be preserved. New defaults:
- Both Day and Year progress: Enabled
- Panel Position: Right
- All other settings: Unchanged

## After Installing

**You must restart GNOME Shell:**
- **Wayland**: Log out and log back in
- **X11**: Press `Alt + F2`, type `r`, press Enter

Then the extension will appear in your chosen position with the new horizontal layout!

## Usage Examples

### Show Only Day Progress
1. Open preferences
2. Turn OFF "Show Year Progress"
3. Keep "Show Day Progress" ON

### Show Only Year Progress
1. Open preferences
2. Turn OFF "Show Day Progress"
3. Keep "Show Year Progress" ON

### Move to Left Panel
1. Open preferences
2. Select "Left" from Panel Position dropdown
3. Restart GNOME Shell

### Minimal Look
1. Turn off "Show Labels"
2. Set bar height to 4-6px
3. Reduce bar width to 100px

## Version History

- **v3** - Horizontal layout, show/hide options, panel positioning
- **v2** - GNOME 49 support
- **v1** - Initial release
