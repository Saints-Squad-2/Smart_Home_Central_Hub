// Smart Appliance base class

const Base = require('../database/base');
const { NotificationArray } = require('../classes/notifications');

class SmartAppliance extends Base {
    static get tableName() {
        return 'appliances';
    }

    constructor(notifications, name='') {
        super();
        
        this._connected = false;
        this._poweredOn = false;
        this._name = String(name);

        this.notifications = notifications;
        this._smartHomeAppId = null;
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

    get notifications() {
        return this._notifications;
    }

    set notifications(notifs) {
        this._notifications = notifs;
        this.setIds();
    }

    get smartHomeAppId() {
        return this._smartHomeAppId;
    }

    set smartHomeAppId(id) {
        this._smartHomeAppId = id;
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

    // set ids for correct database saving
    setIds() {
        try {
            this._notifications.applianceId = this.id;
        } catch {}
    }

    async saveNotificationArray() {
        this.setIds();
        await this._notifications.fullSave();
    }

    async loadNotificationArray() {
        this.notifications = await NotificationArray.fullLoadByApplianceId(this.id);
    }


    async fullSave() {
        await this.save(SmartAppliance);
        await this.saveNotificationArray();
    }

    static async fullLoadById(id) {
        const loaded = await Base.loadById(SmartAppliance, id);
        await loaded.loadNotificationArray();
        
        return loaded;
    }

    static get relationMappings() {
        return {
            _notifications: {
                relation: Base.HasOneRelation,
                modelClass: NotificationArray,
                join: {
                    from: 'appliances.id',
                    to: 'notificationArrays._applianceId'
                }
            }
        }
    }
}

module.exports = { SmartAppliance }