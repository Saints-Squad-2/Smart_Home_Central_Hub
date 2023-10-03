const environment = process.env.ENVIRONMENT || 'development';
const config = require('../../knexfile')[environment];
const Knex = require('knex');

module.exports = Knex(config);