// Tests for Smart Appliance base class

const assert = require('assert');
const { SmartAppliance } = require('../classes/appliance');

describe('SmartAppliance', () => {
    before(() => {
        this.appliance = new SmartAppliance();
    })

    it('should connect when connect method is called', () => {
        this.appliance.connect();
        assert.equal(this.appliance.connected, true);
    });

    it('should disconnect when disconnect method is called', () => {
        this.appliance.disconnect();
        assert.equal(this.appliance.connected, false)
    });

    it('should power on when powerOn method is called', () => {
        this.appliance.powerOn();
        assert.equal(this.appliance.poweredOn, true);
    });

    it('should power off when powerOff method is called', () => {
        this.appliance.powerOff();
        assert.equal(this.appliance.poweredOn, false);
    });

    it('should be able to set a custom name', () => {
        this.appliance.name = 'Bingo';
        assert.equal(this.appliance.name, 'Bingo');
    });
});