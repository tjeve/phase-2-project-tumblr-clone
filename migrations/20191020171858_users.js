exports.up = function (knex) {
  return knex.schema.alterTable('Users', function (table) {
    table.text('email')
    table.unique('email')
    table.unique('slug')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('Users', function (table) {
    table.dropUnique('email')
    table.dropColumn('email')
    table.dropUnique('slug')
  })
}
