const { Model } = require('objection');
const knex = require('./knex/knex');

const { SmartAppliance } = require('../classes/appliance');

Model.knex(knex);

async function createSchema() {
    if (await knex.schema.hasTable('appliances')) return;

    await knex.schema.createTable('appliances', table => {
        table.increments('id').primary();
        table.boolean('_poweredOn');
        table.boolean('_connected');
        table.string('_name');
    });
}

async function main() {
    await createSchema();

    test = new SmartAppliance('test');
    const app = await SmartAppliance.query().insert(test);
    console.log(app);

    knex.destroy();
}

main();