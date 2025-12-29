# Quick Reference Guide

## Quick Install
```bash
./install.sh
```

## Enable Extension
```bash
gnome-extensions enable calendar-progress@gnome-extensions
```

## Open Preferences
```bash
gnome-extensions prefs calendar-progress@gnome-extensions
```

## Restart GNOME Shell
- **X11**: `Alt + F2` → type `r` → Enter
- **Wayland**: Log out and log back in

## Uninstall
```bash
./uninstall.sh
```

## Default Settings

| Setting | Default Value |
|---------|---------------|
| Bar Width | 150px |
| Bar Height | 8px |
| Border Radius | 4px |
| Day Color | Blue (rgba(61, 174, 233, 1)) |
| Year Color | Green (rgba(39, 174, 96, 1)) |
| Background | Gray (rgba(50, 50, 50, 0.5)) |
| Show Labels | Yes |

## Customizable Colors

You can set any color in the preferences using the color picker:
- Day progress bar color
- Year progress bar color
- Background color

All colors support transparency (alpha channel).

## How Progress is Calculated

**Day Progress**: 
```
(Current Time - Midnight Today) / (Midnight Tomorrow - Midnight Today) × 100%
```

**Year Progress**:
```
(Current Time - Jan 1 00:00) / (Next Jan 1 00:00 - Jan 1 00:00) × 100%
```

## Troubleshooting Commands

**View extension logs:**
```bash
journalctl -f -o cat | grep calendar-progress
```

**Check if extension is enabled:**
```bash
gnome-extensions list --enabled | grep calendar-progress
```

**Recompile schemas:**
```bash
cd ~/.local/share/gnome-shell/extensions/calendar-progress@gnome-extensions
glib-compile-schemas schemas/
```

**Check extension info:**
```bash
gnome-extensions info calendar-progress@gnome-extensions
```

## File Locations

- **Extension**: `~/.local/share/gnome-shell/extensions/calendar-progress@gnome-extensions/`
- **Settings**: Stored in dconf at `/org/gnome/shell/extensions/calendar-progress/`

## Tips

1. **Color Matching**: Use a color picker to match your GTK theme
2. **Compact Mode**: Set bar height to 4-6px for a minimal look
3. **Hidden Labels**: Turn off labels for a cleaner appearance
4. **Wide Bars**: Increase width to 200-250px for better visibility
5. **Rounded Style**: Set border radius to 8-10px for a modern look
