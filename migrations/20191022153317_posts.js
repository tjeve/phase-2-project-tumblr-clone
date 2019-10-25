exports.up = function (knex) {
  return knex.schema.alterTable('Posts', function (table) {
    table.string('quote')
  })
}
exports.down = function (knex) {
  return knex.schema.alterTable('Posts', function (table) {
    table.dropColumn('quote')
  })
}
