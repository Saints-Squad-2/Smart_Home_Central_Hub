// Smart Home App class

const Base = require('../database/base');
const { SmartAppliance, restoreAppliance } = require('./appliance');

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

    set available(avail) {
        this._available = avail;
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

    getApplianceById(id) {
        for (let appliance of this._available) {
            if (appliance.id === id) {
                return appliance;
            }
        }

        return null;
    }

    async saveAvailable() {
        for(let appliance of this.available) {
            appliance.smartHomeAppId = this.id;
            await appliance.fullSave();
        }
    }

    async loadAvailable() {
        this._available = await SmartHomeApp
        .relatedQuery('_available')
        .for(this.id);

        for(let i = 0; i < this._available.length; i++) {
            const preLoaded = this._available[i];
            await preLoaded.loadNotificationArray();
        
            this._available[i] = restoreAppliance(preLoaded);
        }
    }

    async fullSave() {
        await this.save(SmartHomeApp);
        await this.saveAvailable();
    }

    static async fullLoadById(id) {
        const loaded = await Base.loadById(SmartHomeApp, id);
        await loaded.loadAvailable();

        return loaded;
    }

    static async loadOrNew(id) {
        let smartHomeApp;
        
        try {
            smartHomeApp = await SmartHomeApp.fullLoadById(id);
        } catch {
            smartHomeApp = new SmartHomeApp();
        }
    
        return smartHomeApp;
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