exports.up = function (knex) {
    return knex.schema.alterTable('Users', function (table) {
      table.string('tagline')
    })
  }
  exports.down = function (knex) {
    return knex.schema.alterTable('Users', function (table) {
      table.dropColumn('tagline')
    })
  }
  