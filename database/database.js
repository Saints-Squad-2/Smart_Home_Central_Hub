const {testKnex, createSchema} = require('./knex/testKnex');
const Base = require('../database/base');
const { SmartAppliance } = require('../classes/appliance');

const {Notification, NotificationArray} = require('../classes/notifications'); 

const knex = testKnex;
Base.knex(knex);

async function main() {
    await createSchema(knex);

    const testNotifArr = new NotificationArray([]);
    await testNotifArr.save(NotificationArray);
    //console.log(testNotifArr, '\n');

    const testNotif = new Notification('this is a test!');
    testNotifArr.add(testNotif);


    //console.log(testNotif, '\n');
    const test = new SmartAppliance(testNotifArr, 'test');
    await test.save(SmartAppliance);
    test.setIds();

    await testNotif.save(Notification);

    console.log(test);
    console.log('\n', testNotif);

    // const keys = Object.keys(test);
    // for (k of keys) {
    //     console.log(k, test[k]);
    // }

    // // test.name = 'hey world!';
    // // test.powerOn();
    // // await test.save(SmartAppliance);

    // const notifs = await NotificationArray.relatedQuery('_data').for(1);
    // console.log('\n', notifs);

    // const test2 = await SmartAppliance.query().findById(1);
    // console.log('\n', test2);

    knex.destroy();
}

main();