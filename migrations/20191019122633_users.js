exports.up = function (knex) {
  return knex.schema.alterTable('Users', function (table) {
    table.text('password')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('Users', function (table) {
    table.dropColumn('password')
  })
}
