exports.up = function (knex) {
  return knex.schema.alterTable('Posts', function (table) {
    table.string('source')
  })
}
exports.down = function (knex) {
  return knex.schema.alterTable('Posts', function (table) {
    table.dropColumn('source')
  })
}
