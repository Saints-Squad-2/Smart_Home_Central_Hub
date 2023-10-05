const {testKnex, createSchema} = require('./knex/testKnex');
const Base = require('../database/base');
const { SmartAppliance } = require('../classes/appliance');

const {Notification, NotificationArray} = require('../classes/notifications'); 

const knex = testKnex;
Base.knex(knex);

async function main() {
    await createSchema(knex);

    const testNotifArr = new NotificationArray([]);
    const testNotif = new Notification('this is a test!');
    testNotifArr.add(testNotif);

    const test = new SmartAppliance(testNotifArr, 'test');
    await test.fullSave();

    test.notifications.add(new Notification('hello world!'));
    test.notifications.hideNotifications();
    await test.fullSave();

    console.log(test);
    console.log('\n', testNotif);

    // const notifs = await NotificationArray.relatedQuery('_data').for(1);
    // console.log('\n', notifs);

    // const test2 = await SmartAppliance.query().findById(1);
    // console.log('\n', test2);

    knex.destroy();
}

main();