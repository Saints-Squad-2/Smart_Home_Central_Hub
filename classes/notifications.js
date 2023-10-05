// Notification classes for SmartAppliance

const Base = require('../database/base');

class Notification extends Base {
    static get tableName() {
        return 'notifications';
    }

    constructor(info, notArrId=null) {
        super(); 
        
        this._info = info;
        this._active = true;
        
        this._notArrId = notArrId;
    }

    get info() {
        return this._info;
    }

    get active() {
        return this._active;
    }

    get notArrId() {
        return this._notArrId;
    }

    set notArrId(id) {
        this._notArrId = id;
    }

    make_inactive() {
        this._active = false;
    }

    make_active() {
        this._active = true;
    }
}

class NotificationArray extends Base {
    static get tableName() {
        return 'notificationArrays';
    }

    constructor(data=[], applianceId=null) {
        super();

        this._data = data;
        this._show = true;

        this._applianceId = applianceId;
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

    get applianceId() {
        return this._applianceId;
    }

    set applianceId(id) {
        this._applianceId = id;
    }

    add(notification) {
        this._data.push(notification);
        notification.notArrId = this.id;
    }

    remove(notification) {
        notif_idx = this._data.indexOf(notification);
        
        if (notif_idx) {
            this._data.splice(notif_idx, 1);
            notification.notArrId = null;
        }
    }

    showNotifications() {
        this._show = true;
    }

    hideNotifications() {
        this._show = false;
    }

    static get relationMappings() {
        return {
            _data: {
                relation: Base.HasManyRelation,
                modelClass: Notification,
                join: {
                    from: 'notificationArrays.id',
                    to: 'notifications._notArrId'
                }
            }
        }
    }
}

module.exports = {
    Notification,
    NotificationArray
}