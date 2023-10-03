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
}

module.exports = {
  testKnex,
  createSchema
};