const environment = process.env.ENVIRONMENT || 'development';
const config = require('../../knexfile')[environment];
const knex = require('knex');

module.exports = knex(config);