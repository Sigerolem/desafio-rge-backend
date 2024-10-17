/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invoices', table => {
    table.increments('id');
    table.string('n_cliente').notNullable();
    table.string('n_instalacao').notNullable();
    table.integer('mes_referente').notNullable();
    table.integer('ano_referente').notNullable();
    table.string('quant_energia').notNullable();
    table.string('valor_energia').notNullable();
    table.string('quant_energia_scee').notNullable();
    table.string('valor_energia_scee').notNullable();
    table.string('quant_energia_gdi').notNullable();
    table.string('valor_energia_gdi').notNullable();
    table.string('contrib_publica').notNullable();
    table.string('file_name').notNullable();
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('invoices')
};
