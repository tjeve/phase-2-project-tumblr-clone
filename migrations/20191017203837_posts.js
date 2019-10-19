
exports.up = function(knex) {
  return knex.schema.alterTable('Posts', function(table){
    table.integer('userId')
    table.foreign('userId').references('Users.id')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('Posts', function(table){
    table.dropColumn('userId')
  })
};
