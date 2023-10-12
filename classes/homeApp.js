// Smart Home App class

const Base = require('../database/base');
const { SmartAppliance } = require('./appliance');

class SmartHomeApp extends Base {
    static get tableName() {
        return 'smartHomeApps';
    }

    constructor() {
        super();

        this._available = [];
    }

    get available() {
        return this._available;
    }

    addAppliance(appliance) {
        if (appliance instanceof SmartAppliance) {
            this._available.push(appliance);
            appliance.smartHomeAppId = this.id;
            
            return true;
        }

        return false;
    }

    removeAppliance(appliance) {
        const available = this._available;

        for (let i = 0; i < available.length; i++) {
            const currentAppliance = available[i];

            if (currentAppliance === appliance) {
                available.splice(i, 1);  
                appliance.smartHomeAppId = null;
                
                return true;
            }
        }

        return false;
    }

    numberOfAppliances() {
        return this._available.length;
    }

    async loadAvailable() {
        this._available = await SmartHomeApp
        .relatedQuery('_available')
        .for(this.id);

        for(let preLoaded of this._available) {
            await preLoaded.loadNotificationArray();
        }
    }

    async fullSave() {
        await this.save(SmartHomeApp);

        for(let appliance of this.available) {
            appliance.smartHomeAppId = this.id;
            await appliance.fullSave();
        }
    }

    static async fullLoadById(id) {
        const loaded = await Base.loadById(SmartHomeApp, id);
        await loaded.loadAvailable();

        return loaded;
    }

    static get relationMappings() {
        return {
            _available: {
                relation: Base.HasManyRelation,
                modelClass: SmartAppliance,
                join: {
                    from: 'smartHomeApps.id',
                    to: 'appliances._smartHomeAppId'
                }
            }
        }
    }
}

module.exports = SmartHomeApp;