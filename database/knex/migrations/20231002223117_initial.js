/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('appliances', table => {
        table.increments('id').primary();
        table.boolean('_poweredOn');
        table.boolean('_connected');
        table.string('_name');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('appliances');
};
