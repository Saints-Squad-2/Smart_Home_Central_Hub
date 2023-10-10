const { SmartAppliance } = require('./appliance');

class Thermostat extends SmartAppliance {
    constructor(notifications, name='', units='F') {
        super(notifications, name);

        this._units = units;
        this._preferredTemp = null;
        this._minTemp = null;
        this._maxTemp = null;
    }

    get units() {
        return this._units;
    }

    set units(units) {
        units = units.toUpperCase()[0];
        
        if (units === 'C' || units === 'F') {
            this._units = units;
        }
    }

    get preferredTemp() {
        return this._preferredTemp;
    }

    set preferredTemp(temp) {
        if (typeof temp === 'number') {
            this._preferredTemp = temp;
        }
    }

    get minTemp() {
        return this._minTemp;
    }

    set minTemp(temp) {
        if (typeof temp ===' number') {
            this._minTemp = temp;
        }
    }

    get maxTemp() {
        return this._maxTemp;
    }

    set maxTemp(temp) {
        if (typeof temp ===' number') {
            this._maxTemp = temp;
        }
    }

    get validTemps() {
        let valid = true;
        const [pref, min, max] = [this._preferredTemp, this._minTemp, this._maxTemp];

        if (min && max) {
            if (min > max) valid = false;
        }

        if (min && (pref < min)) valid = false;
        if (max && (pref > max)) valid = false;

        return valid;
    }

    resetTemps() {
        this._preferredTemp = null;
        this._minTemp = null;
        this._maxTemp = null;
    }
}

module.exports = { Thermostat }