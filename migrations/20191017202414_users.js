
exports.up = function(knex) {
  return knex.schema.alterTable('Users', function(table){
      table.unique('userImage')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('Users', function(table){
      table.dropUnique('userImage')
  }) 
};
