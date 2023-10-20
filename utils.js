// Utility functions

function isANumber(val) {
    return ((typeof val === 'number') && !isNaN(val));
}

function matchVariables(restored, appliance) {
    restored['id'] = appliance.id;
    restored['_smartHomeAppId'] = appliance._smartHomeAppId;
    restored.setIds();

    for (key of Object.keys(restored)) {
        restored[key] = appliance[key];
    }
}

function restoreAppliance(appliance) {
    const { Thermostat } = require('./classes/thermostat');
    const { Camera } = require('./classes/camera');
    const { Light } = require('./classes/light/light');

    let restored;

    if (appliance['_units']) {
        restored = new Thermostat(appliance.notifications, appliance.name);
    } else if (appliance['_resolution']) {
        restored = new Camera(appliance.notifications, appliance.name, appliance._resolution);
    } else if (appliance['_brightness']) {
        restored = new Light(appliance.notifications, appliance.name, appliance._brightness);
    } else {
        return appliance;
    }

    matchVariables(restored, appliance);
    return restored;
}

module.exports = { isANumber, restoreAppliance }