// Knex instance for testing

const Knex = require('knex');

const testKnex =  Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: ':memory:'
  }
});

async function createSchema(knex) {
  if (await knex.schema.hasTable('appliances')) return;

  await knex.schema.createTable('appliances', table => {
    table.increments('id').primary();
    table.boolean('_poweredOn');
    table.boolean('_connected');
    table.string('_name');
  });

  await knex.schema.createTable('notifications', table => {
    table.increments('id').primary();
    table.string('_info');
    table.boolean('_active');
    table.integer('_notArrId');
  });

  await knex.schema.createTable('notificationArrays', table => {
    table.increments('id').primary();
    table.integer('_applianceId');
    table.boolean('_show');
  });
}

module.exports = {
  testKnex,
  createSchema
};