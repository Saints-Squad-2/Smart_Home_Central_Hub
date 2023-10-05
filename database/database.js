const {testKnex, createSchema} = require('./knex/testKnex');
const Base = require('../database/base');
const { SmartAppliance } = require('../classes/appliance');

const {Notification, NotificationArray} = require('../classes/notifications'); 

const knex = testKnex;
Base.knex(knex);

async function main() {
    await createSchema(knex);

    const testNotif = new Notification('this is a test!');
    await testNotif.save(Notification);
    console.log(testNotif, '\n');

    const test = new SmartAppliance([testNotif], 'test');
    await test.save(SmartAppliance);
    console.log(test);

    testNotif.applianceId = 1;
    await testNotif.save(Notification);

    // test.name = 'hey world!';
    // test.powerOn();
    // await test.save(SmartAppliance);

    const notifs = await SmartAppliance.relatedQuery('_notifications').for(1);
    console.log('\n', notifs);

    const test2 = await SmartAppliance.query().findById(1);
    console.log('\n', test2);

    knex.destroy();
}

main();