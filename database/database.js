const {testKnex, createSchema} = require('./knex/testKnex');
const Base = require('../database/base');
const { SmartAppliance } = require('../classes/appliance');

const knex = testKnex;
Base.knex(knex);

async function main() {
    await createSchema(knex);

    const test = new SmartAppliance('test');
    await test.save(SmartAppliance);
    console.log(test);

    test.name = 'hey world!';
    test.powerOn();
    await test.save(SmartAppliance);

    const test2 = await SmartAppliance.query().findById(1);
    console.log('\n', test2);

    knex.destroy();
}

main();