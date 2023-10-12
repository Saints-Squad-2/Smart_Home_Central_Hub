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
        const available = await SmartAppliance.query();
        this._available = available;
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