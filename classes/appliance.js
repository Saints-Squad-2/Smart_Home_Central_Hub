// Smart Appliance base class

class SmartAppliance {
    constructor() {
        this.connected = false;
    }

    connect() {
        this.connected = true;
    }

    disconnect() {
        this.connected = false;
    }
}

module.exports = { SmartAppliance }