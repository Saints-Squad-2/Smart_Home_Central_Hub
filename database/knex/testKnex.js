// Knex instance for testing

const Knex = require('knex');

module.exports = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:'
    }
});