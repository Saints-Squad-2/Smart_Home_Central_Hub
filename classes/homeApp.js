// Smart Home App class

const { SmartAppliance } = require('./appliance');

class SmartHomeApp {
    constructor() {
        this._available = [];
    }

    get available() {
        return this._available;
    }

    addAppliance(appliance) {
        if (appliance instanceof SmartAppliance) {
            this._available.push(appliance);
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
}

module.exports = SmartHomeApp;