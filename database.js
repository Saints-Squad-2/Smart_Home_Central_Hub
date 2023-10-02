const { Model } = require('objection');
const Knex = require('knex');

const { SmartAppliance } = require('./classes/appliance');

const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'example.db'
    }
});

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