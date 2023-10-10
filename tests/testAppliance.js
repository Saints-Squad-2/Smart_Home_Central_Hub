// Tests for Smart Appliance classes

const assert = require('assert');

const { SmartAppliance } = require('../classes/appliance');
const { Thermostat } = require('../classes/thermostat');

describe('SmartAppliance Classes', () => {
    
    describe('Base', () => {
        before(() => {
            this.appliance = new SmartAppliance([]);
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

    describe('Thermostat', () => {
        before(() => {
            this.appliance = new Thermostat([]);
        });

        it("should only allow units of 'C' or 'F'", () => {
            this.appliance.units = 'C';
            assert.equal(this.appliance.units, 'C');

            this.appliance.units = 'F';
            assert.equal(this.appliance.units, 'F');

            this.appliance.units = 'Hello world!';
            assert.equal(this.appliance.units, 'F');
        });

        it('should only allow numbers for preferred, max, and min temps', () => {
            this.appliance.preferredTemp = 70;
            this.appliance.maxTemp = 75;
            this.appliance.minTemp = 65;

            this.appliance.preferredTemp = NaN;
            this.appliance.maxTemp = 'string!';
            this.appliance.minTemp = [1, 2, 3];

            assert.equal(this.appliance.preferredTemp, 70);
            assert.equal(this.appliance.maxTemp, 75);
            assert.equal(this.appliance.minTemp, 65);
        });

        it('should be able to determine if the temp combinations are valid', () => {
            assert.equal(this.appliance.validTemps, true);

            this.appliance.preferredTemp = 80;
            assert.equal(this.appliance.validTemps, false);

            this.appliance.preferredTemp = 65;
            assert.equal(this.appliance.validTemps, true);

            this.appliance.minTemp = 75;
            this.appliance.maxTemp = 65;
            assert.equal(this.appliance.validTemps, false);
        });

        it('should be able to reset all temps', () => {
            this.appliance.resetTemps();

            assert.equal(this.appliance.preferredTemp, null);
            assert.equal(this.appliance.maxTemp, null);
            assert.equal(this.appliance.minTemp, null);

            assert.equal(this.appliance.validTemps, true);
        });
    });
});