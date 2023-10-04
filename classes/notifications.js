// Notification classes for SmartAppliance

const Base = require('../database/base');

class Notification {
    constructor(info) {
        this._info = info;
        this._active = true;
    }

    get info() {
        return this._info;
    }

    get active() {
        return this._active;
    }

    make_inactive() {
        this._active = false;
    }

    make_active() {
        this._active = true;
    }
}

class NotificationArray {
    constructor(data=[]) {
        this._data = data;
        this._show = true;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get show() {
        return this._show;
    }

    add(notification) {
        this._data.push(notification);
    }

    remove(notification) {
        notif_idx = this._data.indexOf(notification);
        
        if (notif_idx) {
            this._data.splice(notif_idx, 1);
        }
    }

    showNotifications() {
        this._show = true;
    }

    hideNotifications() {
        this._show = false;
    }
}