# Calendar Progress Bar - GNOME Shell Extension

A beautiful GNOME Shell extension that displays day and year progress bars in your panel with fully customizable styles.

## Features

✨ **Real-time Progress Tracking**
- Day progress: See how much of the day has passed
- Year progress: Track your yearly progress
- Updates every minute automatically

🎨 **Fully Customizable Styles**
- Adjustable bar width (50-300px)
- Adjustable bar height (4-30px)
- Customizable border radius (0-15px)
- Custom colors for day progress bar
- Custom colors for year progress bar
- Custom background color
- Toggle labels on/off

📊 **Clean Display**
- Shows percentage for both day and year
- Smooth transitions
- Hover effects
- Minimal and elegant design

## Installation

### Method 1: Manual Installation

1. Clone or download this repository
2. Copy the extension to your GNOME Shell extensions directory:
   ```bash
   cp -r gnome-calender ~/.local/share/gnome-shell/extensions/calendar-progress@vishwathilina.github.io
   ```

3. Compile the GSettings schema:
   ```bash
   cd ~/.local/share/gnome-shell/extensions/calendar-progress@gnome-extensions
   glib-compile-schemas schemas/
   ```

4. Restart GNOME Shell:
   - **X11**: Press `Alt + F2`, type `r`, and press Enter
   - **Wayland**: Log out and log back in

5. Enable the extension:
   ```bash
   gnome-extensions enable calendar-progress@vishwathilina.github.io
   ```

### Method 2: Using Extension Manager

1. Install [Extension Manager](https://github.com/mjakeman/extension-manager) from GNOME Software or Flathub
2. Open Extension Manager
3. Click "Install from File"
4. Select the extension directory or zip file
5. Enable the extension

## Configuration

Open the extension preferences to customize:

```bash
gnome-extensions prefs calendar-progress@vishwathilina.github.io
```

Or use Extension Manager or GNOME Extensions app.

### Customization Options

**Appearance:**
- **Bar Width**: Set the width of progress bars (50-300px, default: 150px)
- **Bar Height**: Set the height of progress bars (4-30px, default: 8px)
- **Border Radius**: Round the corners (0-15px, default: 4px)
- **Show Labels**: Toggle "Day:" and "Year:" text labels

**Colors:**
- **Day Progress Color**: Color for day progress (default: blue)
- **Year Progress Color**: Color for year progress (default: green)
- **Background Color**: Background of the progress bars (default: semi-transparent gray)

### Reset to Defaults

Click the "Reset" button in preferences to restore all settings to their default values.

## Usage

Once enabled, the extension will appear in your GNOME Shell top panel. It shows:

```
Day:  ████████░░░░░░░░ 52.3%
Year: ███░░░░░░░░░░░░░ 99.3%
```

The progress bars update automatically every minute, showing:
- How much of the current day has elapsed
- How much of the current year has elapsed

## Compatibility

This extension is compatible with GNOME Shell versions:
- 45
- 46
- 47
- 48

## File Structure

```
calendar-progress@gnome-extensions/
├── extension.js          # Main extension logic
├── prefs.js             # Preferences UI
├── metadata.json        # Extension metadata
├── stylesheet.css       # Styles for the extension
├── schemas/             # GSettings schemas
│   └── org.gnome.shell.extensions.calendar-progress.gschema.xml
└── README.md           # This file
```

## Development

### Testing Changes

After making changes to the extension:

1. Reload GNOME Shell (X11: `Alt + F2`, type `r`)
2. Or restart your session (Wayland)
3. Check logs: `journalctl -f -o cat /usr/bin/gnome-shell`

### Debugging

View extension logs:
```bash
journalctl -f -o cat | grep calendar-progress
```

Or check GNOME Shell logs:
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

This extension is free and open source software.

## Screenshots

The extension displays cleanly in your top panel with:
- Two progress bars (day and year)
- Percentage labels
- Smooth color transitions
- Hover effects

Customize it to match your theme perfectly!

## Troubleshooting

### Extension doesn't appear after enabling
- Make sure you compiled the schemas
- Restart GNOME Shell
- Check for errors: `journalctl -f -o cat /usr/bin/gnome-shell`

### Preferences won't open
- Ensure schemas are compiled: `glib-compile-schemas schemas/`
- Check permissions on the extension directory

### Colors not updating
- Try resetting to defaults
- Restart GNOME Shell after changing colors

## Credits

Created for GNOME Shell to provide an elegant way to track time progress throughout the day and year.

---

**Enjoy tracking your time! ⏰📊**
# gnome-calender-progress
# gnome-calendar-progress
