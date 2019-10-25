exports.up = function (knex) {
  return knex.schema.alterTable('Posts', function (table) {
    table.text('postedImage').alter()
    table.text('postedMessage').alter()
    table.text('title').alter()
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('Posts', function (table) {
    table.string('postedImage').alter()
    table.string('postedMessage').alter()
    table.string('title').alter()
  })
}
