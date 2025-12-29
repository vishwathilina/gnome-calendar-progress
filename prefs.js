/* prefs.js
 *
 * Preferences for Calendar Progress Bar Extension
 */

import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import Gio from 'gi://Gio';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class CalendarProgressPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();
        
        // Create a preferences page
        const page = new Adw.PreferencesPage();
        window.add(page);
        
        // Display Group
        const displayGroup = new Adw.PreferencesGroup({
            title: 'Display Options',
            description: 'Choose what to show'
        });
        page.add(displayGroup);
        
        // Show Day Progress
        const showDayRow = new Adw.SwitchRow({
            title: 'Show Day Progress',
            subtitle: 'Display the day progress bar'
        });
        settings.bind('show-day', showDayRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        displayGroup.add(showDayRow);
        
        // Show Year Progress
        const showYearRow = new Adw.SwitchRow({
            title: 'Show Year Progress',
            subtitle: 'Display the year progress bar'
        });
        settings.bind('show-year', showYearRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        displayGroup.add(showYearRow);
        
        // Show Labels
        const showLabelsRow = new Adw.SwitchRow({
            title: 'Show Labels',
            subtitle: 'Display "Day:" and "Year:" labels'
        });
        settings.bind('show-labels', showLabelsRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        displayGroup.add(showLabelsRow);
        
        // Position Group
        const positionGroup = new Adw.PreferencesGroup({
            title: 'Panel Position',
            description: 'Choose where to place the indicator'
        });
        page.add(positionGroup);
        
        // Panel Position
        const panelPositionRow = new Adw.ComboRow({
            title: 'Panel Position',
            subtitle: 'Location on the top panel',
            model: new Gtk.StringList({strings: ['Left', 'Center', 'Right']})
        });
        const positions = ['left', 'center', 'right'];
        const currentPosition = settings.get_string('panel-position');
        panelPositionRow.selected = positions.indexOf(currentPosition);
        panelPositionRow.connect('notify::selected', (widget) => {
            settings.set_string('panel-position', positions[widget.selected]);
        });
        positionGroup.add(panelPositionRow);
        
        // Appearance Group
        const appearanceGroup = new Adw.PreferencesGroup({
            title: 'Appearance',
            description: 'Customize the look of the progress bars'
        });
        page.add(appearanceGroup);
        
        // Bar Width
        const barWidthRow = new Adw.SpinRow({
            title: 'Bar Width',
            subtitle: 'Width of the progress bar in pixels',
            adjustment: new Gtk.Adjustment({
                lower: 50,
                upper: 300,
                step_increment: 10,
                page_increment: 20,
                value: settings.get_int('bar-width')
            })
        });
        settings.bind('bar-width', barWidthRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        appearanceGroup.add(barWidthRow);
        
        // Bar Height
        const barHeightRow = new Adw.SpinRow({
            title: 'Bar Height',
            subtitle: 'Height of the progress bar in pixels',
            adjustment: new Gtk.Adjustment({
                lower: 4,
                upper: 30,
                step_increment: 1,
                page_increment: 5,
                value: settings.get_int('bar-height')
            })
        });
        settings.bind('bar-height', barHeightRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        appearanceGroup.add(barHeightRow);
        
        // Border Radius
        const borderRadiusRow = new Adw.SpinRow({
            title: 'Border Radius',
            subtitle: 'Roundness of the progress bar corners',
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 15,
                step_increment: 1,
                page_increment: 2,
                value: settings.get_int('border-radius')
            })
        });
        settings.bind('border-radius', borderRadiusRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        appearanceGroup.add(borderRadiusRow);
        
        // Colors Group
        const colorsGroup = new Adw.PreferencesGroup({
            title: 'Colors',
            description: 'Customize progress bar colors'
        });
        page.add(colorsGroup);
        
        // Day Progress Color
        const dayColorRow = new Adw.ActionRow({
            title: 'Day Progress Color',
            subtitle: 'Color for the day progress bar'
        });
        const dayColorButton = new Gtk.ColorButton({
            valign: Gtk.Align.CENTER
        });
        const dayRgba = new Gdk.RGBA();
        dayRgba.parse(settings.get_string('day-color'));
        dayColorButton.set_rgba(dayRgba);
        dayColorButton.connect('color-set', (button) => {
            const rgba = button.get_rgba();
            const color = `rgba(${Math.round(rgba.red * 255)}, ${Math.round(rgba.green * 255)}, ${Math.round(rgba.blue * 255)}, ${rgba.alpha})`;
            settings.set_string('day-color', color);
        });
        dayColorRow.add_suffix(dayColorButton);
        colorsGroup.add(dayColorRow);
        
        // Year Progress Color
        const yearColorRow = new Adw.ActionRow({
            title: 'Year Progress Color',
            subtitle: 'Color for the year progress bar'
        });
        const yearColorButton = new Gtk.ColorButton({
            valign: Gtk.Align.CENTER
        });
        const yearRgba = new Gdk.RGBA();
        yearRgba.parse(settings.get_string('year-color'));
        yearColorButton.set_rgba(yearRgba);
        yearColorButton.connect('color-set', (button) => {
            const rgba = button.get_rgba();
            const color = `rgba(${Math.round(rgba.red * 255)}, ${Math.round(rgba.green * 255)}, ${Math.round(rgba.blue * 255)}, ${rgba.alpha})`;
            settings.set_string('year-color', color);
        });
        yearColorRow.add_suffix(yearColorButton);
        colorsGroup.add(yearColorRow);
        
        // Background Color
        const bgColorRow = new Adw.ActionRow({
            title: 'Background Color',
            subtitle: 'Background color for progress bars'
        });
        const bgColorButton = new Gtk.ColorButton({
            valign: Gtk.Align.CENTER
        });
        const bgRgba = new Gdk.RGBA();
        bgRgba.parse(settings.get_string('background-color'));
        bgColorButton.set_rgba(bgRgba);
        bgColorButton.connect('color-set', (button) => {
            const rgba = button.get_rgba();
            const color = `rgba(${Math.round(rgba.red * 255)}, ${Math.round(rgba.green * 255)}, ${Math.round(rgba.blue * 255)}, ${rgba.alpha})`;
            settings.set_string('background-color', color);
        });
        bgColorRow.add_suffix(bgColorButton);
        colorsGroup.add(bgColorRow);
        
        // Reset Button Group
        const resetGroup = new Adw.PreferencesGroup();
        page.add(resetGroup);
        
        const resetRow = new Adw.ActionRow({
            title: 'Reset to Defaults',
            subtitle: 'Restore all settings to their default values'
        });
        const resetButton = new Gtk.Button({
            label: 'Reset',
            valign: Gtk.Align.CENTER,
            css_classes: ['destructive-action']
        });
        resetButton.connect('clicked', () => {
            settings.reset('bar-width');
            settings.reset('bar-height');
            settings.reset('border-radius');
            settings.reset('day-color');
            settings.reset('year-color');
            settings.reset('background-color');
            settings.reset('show-labels');
            
            // Update color buttons
            dayRgba.parse(settings.get_string('day-color'));
            dayColorButton.set_rgba(dayRgba);
            yearRgba.parse(settings.get_string('year-color'));
            yearColorButton.set_rgba(yearRgba);
            bgRgba.parse(settings.get_string('background-color'));
            bgColorButton.set_rgba(bgRgba);
        });
        resetRow.add_suffix(resetButton);
        resetGroup.add(resetRow);
    }
}
