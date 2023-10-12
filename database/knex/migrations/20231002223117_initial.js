/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('smartHomeApps', table => {
            table.increments('id').primary();
        })
        .createTable('appliances', table => {
            
            // Base
            table.increments('id').primary();
            table.boolean('_poweredOn');
            table.boolean('_connected');
            table.string('_name');
            table.integer('_smartHomeAppId');
            
            // Camera
            table.string('_resolution');
            table.boolean('_isRecording');
            table.json('_recordings');

            // Thermostat
            table.string('_units');
            table.decimal('_preferredTemp');
            table.decimal('_minTemp');
            table.decimal('_maxTemp');
        })
        .createTable('notifications', table => {
            table.increments('id').primary();
            table.string('_info');
            table.boolean('_active');
            table.integer('_notArrId');
        })
        .createTable('notificationArrays', table => {
            table.increments('id').primary();
            table.integer('_applianceId');
            table.boolean('_show');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('appliances')
        .dropTable('notifications')
        .dropTable('notificationArrays');
};
