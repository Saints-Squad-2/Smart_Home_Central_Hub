// Database tests

const assert = require('assert');
const Base = require('../database/base');
const {testKnex, createSchema} = require('../database/knex/testKnex');
const { SmartAppliance } = require('../classes/appliance');

async function loadInstance(id) {
    return await SmartAppliance.query().findById(id);
}

function compareInstances(inst1, inst2) {
    assert.equal(inst1.name, inst2.name);
    assert.equal(inst1.poweredOn, inst2.poweredOn);
    assert.equal(inst1.connected, inst2.connected);
    assert.equal(inst1.id, inst2.id);
}

describe('ORM Base Class', () => {
    before(async () => {
        Base.knex(testKnex);
        this.appliance = new SmartAppliance('test');
        this.appliance2 = new SmartAppliance('test2');
        
        await createSchema(testKnex);
    });

    it('should be able to insert into a database', async () => {
        await this.appliance.insert(SmartAppliance)
        const loaded = await loadInstance(1) 
        
        compareInstances(this.appliance, loaded);
    });

    it('should be able to update an instance in a database', async () => {
        this.appliance.name = 'hey world!';
        await this.appliance.update(SmartAppliance);
        const loaded = await loadInstance(1);

        compareInstances(this.appliance, loaded);
    });

    it('should have a save method that dynamically inserts or updates', async () => {
        this.appliance.powerOn();
        await this.appliance.save(SmartAppliance);
        const loaded = await loadInstance(1);

        await this.appliance2.save(SmartAppliance);
        const loaded2 = await loadInstance(2);

        compareInstances(this.appliance, loaded);
        compareInstances(this.appliance2, loaded2);
    });

    it('should be able to delete an instance from a database', async () => {
        await this.appliance2.deleteFromDB(SmartAppliance);
        const loaded = await loadInstance(2);

        assert.equal(loaded, undefined);
    });

    after(async () => {
        testKnex.destroy();
    })
});
