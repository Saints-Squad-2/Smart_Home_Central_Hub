// Tests for Smart Home App class

const assert = require('assert');

const SmartHomeApp = require('../classes/homeApp');
const { SmartAppliance } = require('../classes/appliance');

describe('SmartHomeApp Class', () => {
    before(() => {
        this.testApp = new SmartHomeApp();
        this.testAppliance = new SmartAppliance();
    })

    it('should be able to add SmartAppliance instances to available array', () => {
        const appliance = this.testAppliance; 
        const added = this.testApp.addAppliance(appliance);

        assert.equal(added, true);
        assert.equal(this.testApp.available[0], appliance);
    });

    it('should only add SmartAppliance instances to available array', () => {
        const added = this.testApp.addAppliance(5);

        assert.equal(added, false);
    });

    it('should be able to remove instances from the available array', () => {
        const appliance = this.testAppliance;
        const removed = this.testApp.removeAppliance(appliance);

        assert.equal(removed, true);
        assert.equal(this.testApp.available.length, 0);
    });

    it('should correctly return the number of available appliances', () => {
        assert.equal(this.testApp.numberOfAppliances(), 0);

        for(let i = 0; i < 2; i++) {
            this.testApp.addAppliance(new SmartAppliance());
        }

        assert.equal(this.testApp.numberOfAppliances(), 2);
    });
});