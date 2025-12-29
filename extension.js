/* extension.js
 *
 * Calendar Progress Bar Extension
 * Shows day and year progress with customizable styles
 */

import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const CalendarProgressIndicator = GObject.registerClass(
class CalendarProgressIndicator extends PanelMenu.Button {
    _init(settings) {
        super._init(0.0, 'Calendar Progress');
        
        this._settings = settings;
        
        // Create main container - horizontal layout
        this._container = new St.BoxLayout({
            style_class: 'calendar-progress-container',
            vertical: false,
            y_align: Clutter.ActorAlign.CENTER
        });
        
        // Day progress widgets
        this._dayBox = new St.BoxLayout({
            style_class: 'progress-box',
            vertical: false,
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._dayLabel = new St.Label({
            text: 'Day: ',
            style_class: 'progress-label',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._dayProgressBar = new St.BoxLayout({
            style_class: 'progress-bar-container',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._dayProgressFill = new St.Widget({
            style_class: 'progress-bar-fill day-fill',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._dayPercentLabel = new St.Label({
            style_class: 'progress-percent',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._dayProgressBar.add_child(this._dayProgressFill);
        this._dayBox.add_child(this._dayLabel);
        this._dayBox.add_child(this._dayProgressBar);
        this._dayBox.add_child(this._dayPercentLabel);
        
        // Year progress widgets
        this._yearBox = new St.BoxLayout({
            style_class: 'progress-box',
            vertical: false,
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._yearLabel = new St.Label({
            text: 'Year: ',
            style_class: 'progress-label',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._yearProgressBar = new St.BoxLayout({
            style_class: 'progress-bar-container',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._yearProgressFill = new St.Widget({
            style_class: 'progress-bar-fill year-fill',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._yearPercentLabel = new St.Label({
            style_class: 'progress-percent',
            y_align: Clutter.ActorAlign.CENTER
        });
        
        this._yearProgressBar.add_child(this._yearProgressFill);
        this._yearBox.add_child(this._yearLabel);
        this._yearBox.add_child(this._yearProgressBar);
        this._yearBox.add_child(this._yearPercentLabel);
        
        // Add to container
        this._container.add_child(this._dayBox);
        
        // Add separator between day and year
        this._separator = new St.Label({
            text: ' | ',
            style_class: 'progress-separator',
            y_align: Clutter.ActorAlign.CENTER
        });
        this._container.add_child(this._separator);
        
        this._container.add_child(this._yearBox);
        
        this.add_child(this._container);
        
        // Connect settings changes
        this._settingsChangedId = this._settings.connect('changed', () => {
            this._applyStyles();
            this._updateVisibility();
        });
        
        // Update progress and visibility
        this._updateProgress();
        this._applyStyles();
        this._updateVisibility();
        
        // Update every minute
        this._timeout = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 60, () => {
            this._updateProgress();
            return GLib.SOURCE_CONTINUE;
        });
    }
    
    _updateVisibility() {
        const showDay = this._settings.get_boolean('show-day');
        const showYear = this._settings.get_boolean('show-year');
        
        this._dayBox.visible = showDay;
        this._yearBox.visible = showYear;
        this._separator.visible = showDay && showYear;
    }
    
    _updateProgress() {
        const now = new Date();
        
        // Calculate day progress
        const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const dayProgress = ((now - dayStart) / (dayEnd - dayStart)) * 100;
        
        // Calculate year progress
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
        const yearProgress = ((now - yearStart) / (yearEnd - yearStart)) * 100;
        
        // Update UI
        this._dayPercentLabel.text = `${dayProgress.toFixed(1)}%`;
        this._yearPercentLabel.text = `${yearProgress.toFixed(1)}%`;
        
        const barWidth = this._settings.get_int('bar-width');
        this._dayProgressFill.set_width(barWidth * dayProgress / 100);
        this._yearProgressFill.set_width(barWidth * yearProgress / 100);
    }
    
    _applyStyles() {
        const barWidth = this._settings.get_int('bar-width');
        const barHeight = this._settings.get_int('bar-height');
        const dayColor = this._settings.get_string('day-color');
        const yearColor = this._settings.get_string('year-color');
        const bgColor = this._settings.get_string('background-color');
        const borderRadius = this._settings.get_int('border-radius');
        const showLabels = this._settings.get_boolean('show-labels');
        
        // Apply bar container styles
        this._dayProgressBar.set_style(`
            width: ${barWidth}px;
            height: ${barHeight}px;
            background-color: ${bgColor};
            border-radius: ${borderRadius}px;
        `);
        
        this._yearProgressBar.set_style(`
            width: ${barWidth}px;
            height: ${barHeight}px;
            background-color: ${bgColor};
            border-radius: ${borderRadius}px;
        `);
        
        // Apply fill styles
        this._dayProgressFill.set_style(`
            height: ${barHeight}px;
            background-color: ${dayColor};
            border-radius: ${borderRadius}px;
        `);
        
        this._yearProgressFill.set_style(`
            height: ${barHeight}px;
            background-color: ${yearColor};
            border-radius: ${borderRadius}px;
        `);
        
        // Show/hide labels
        this._dayLabel.visible = showLabels;
        this._yearLabel.visible = showLabels;
        
        this._updateProgress();
    }
    
    destroy() {
        if (this._timeout) {
            GLib.source_remove(this._timeout);
            this._timeout = null;
        }
        
        if (this._settingsChangedId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = null;
        }
        
        super.destroy();
    }
});

export default class CalendarProgressExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._indicator = new CalendarProgressIndicator(this._settings);

        // Get panel position from settings
        const position = this._settings.get_string('panel-position');
        const panelIndex = this._settings.get_int('panel-index');

        // Add to status area first (creates menu button)
        Main.panel.addToStatusArea(this.uuid, this._indicator);

        // Then move to the correct position
        const container = this._indicator.container;
        const parent = container.get_parent();
        if (parent) {
            parent.remove_child(container);
        }

        let box;
        let index = 0;

        switch (position) {
            case 'left':
                box = Main.panel._leftBox;
                // Default to end of left box
                index = box.get_n_children();
                // Try to locate workspace switcher and insert AFTER it
                for (let i = 0; i < box.get_n_children(); i++) {
                    const actor = box.get_child_at_index(i);
                    const style = actor?.style_class ?? '';
                    const name = actor?.get_accessible_name?.() ?? '';
                    const isSwitcher = style.includes('workspace') || name.toLowerCase().includes('workspace');
                    if (isSwitcher) {
                        index = i + 1; // insert AFTER workspace switcher
                        break;
                    }
                }
                // Respect user-provided index if within bounds
                if (panelIndex >= 0 && panelIndex <= box.get_n_children()) {
                    index = panelIndex;
                }
                break;
            case 'center':
                box = Main.panel._centerBox;
                index = panelIndex >= 0 ? panelIndex : 0;
                break;
            case 'right':
            default:
                box = Main.panel._rightBox;
                index = panelIndex >= 0 ? panelIndex : 0;
                break;
        }

        box.insert_child_at_index(container, index);

        // Watch for position changes
        this._positionChangedId = this._settings.connect('changed::panel-position', () => {
            this._reload();
        });

        this._indexChangedId = this._settings.connect('changed::panel-index', () => {
            this._reload();
        });
    }
    
    _reload() {
        this.disable();
        this.enable();
    }
    
    disable() {
        if (this._positionChangedId) {
            this._settings.disconnect(this._positionChangedId);
            this._positionChangedId = null;
        }
        
        if (this._indexChangedId) {
            this._settings.disconnect(this._indexChangedId);
            this._indexChangedId = null;
        }
        
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
        
        this._settings = null;
    }
}
