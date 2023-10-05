// Smart Appliance base class

const Base = require('../database/base');
const { Notification } = require('../classes/notifications');

class SmartAppliance extends Base {
    static get tableName() {
        return 'appliances';
    }

    constructor(notifications, name='') {
        super();
        
        this._connected = false;
        this._poweredOn = false;
        this._notifications = notifications;
        this._name = String(name);
    }

    get connected() {
        return this._connected;
    }

    get poweredOn() {
        return this._poweredOn;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = String(name);
    }

    connect() {
        this._connected = true;
    }

    disconnect() {
        this._connected = false;
    }

    powerOn() {
        this._poweredOn = true;
    }

    powerOff() {
        this._poweredOn = false;
    }

    static get relationMappings() {
        return {
            _notifications: {
                relation: Base.HasManyRelation,
                modelClass: Notification,
                join: {
                    from: 'appliances.id',
                    to: 'notifications.applianceId'
                }
            }
        }
    }
}

module.exports = { SmartAppliance }