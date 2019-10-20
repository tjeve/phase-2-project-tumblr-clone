
exports.up = function (knex) {
    return knex.schema.alterTable('Posts', function (table) {
      table.string('title')
    })
  }
  exports.down = function (knex) {
    return knex.schema.alterTable('Posts', function (table) {
      table.dropColumn('title')
    })
  }
  