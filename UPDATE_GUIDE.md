# 🎉 Extension Updated Successfully!

## ✅ What's Fixed

Your GNOME Calendar Progress extension now has:

### 📏 **Single-Line Horizontal Layout**
```
Before (Vertical):          Now (Horizontal):
Day:  ████ 52.3%            Day: ████ 52.3% | Year: ███ 99.4%
Year: ███  99.4%
```

### 👁️ **Show/Hide Options**
- Want only day progress? Turn off year!
- Want only year progress? Turn off day!
- Full control over what you see

### 📍 **Panel Positioning**
- Move to Left, Center, or Right
- Place it wherever works best for you

## 🔧 How to Configure

Open the preferences:
```bash
gnome-extensions prefs calendar-progress@gnome-extensions
```

Or click on the extension in Extensions app and click Settings.

### New Settings Available:

#### 📊 Display Options
- ✓ Show Day Progress
- ✓ Show Year Progress  
- ✓ Show Labels

#### 📍 Panel Position
- Choose: Left | Center | Right

#### 🎨 Appearance (unchanged)
- Bar Width, Height, Border Radius
- Day/Year/Background Colors

## ⚠️ Important: Restart Required

The extension has been installed. To see the changes:

**For Wayland (most common):**
1. Save your work
2. Log out
3. Log back in

**For X11:**
1. Press `Alt + F2`
2. Type `r`
3. Press Enter

## 📋 Quick Examples

### Example 1: Only Show Day Progress
```
Settings:
✓ Show Day Progress
✗ Show Year Progress

Result: Day: ████████ 52.3%
```

### Example 2: Only Show Year Progress
```
Settings:
✗ Show Day Progress
✓ Show Year Progress

Result: Year: ███ 99.4%
```

### Example 3: Both Without Labels
```
Settings:
✓ Show Day Progress
✓ Show Year Progress
✗ Show Labels

Result: ████████ 52.3% | ███ 99.4%
```

### Example 4: Move to Left Panel
```
Panel Position: Left

Your extension will appear on the left side 
of the top panel after restart.
```

## 🎨 Recommended Styles

### Minimal Setup
```
Bar Width: 100px
Bar Height: 6px
Show Labels: OFF
Show only one progress bar
```

### Standard Setup
```
Bar Width: 150px
Bar Height: 8px
Show Labels: ON
Show both progress bars
```

### Maximum Visibility
```
Bar Width: 200px
Bar Height: 12px
Show Labels: ON
Bold colors
```

## 🐛 Troubleshooting

### Extension doesn't appear after restart
```bash
gnome-extensions enable calendar-progress@gnome-extensions
journalctl -f -o cat /usr/bin/gnome-shell
```

### Preferences won't open
```bash
cd ~/.local/share/gnome-shell/extensions/calendar-progress@gnome-extensions
glib-compile-schemas schemas/
```

### Want to reset everything
In preferences, click the "Reset" button at the bottom.

## 📦 Files Updated

- `extension.js` - Horizontal layout + visibility controls
- `prefs.js` - New preference options
- `schemas/*.xml` - New settings keys
- `stylesheet.css` - Single-line styles
- `metadata.json` - Version 3

## 🚀 Next Steps

1. **Restart GNOME Shell** (log out/in)
2. **Open Preferences** to customize
3. **Enjoy your personalized time tracker!**

---

**Version 3** - Enhanced layout and flexibility
