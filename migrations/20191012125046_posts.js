
exports.up = function(knex) {
    return knex.schema.createTable('Posts', (table) => {
        table.increments('id')
        table.integer('userId').references('Users.id')
        table.string('postedImage')
        table.integer('numberOfNotes')
        table.string('userImage').references('Users.userImage')
        table.date('date')
        table.string('postedMessage')
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE posts')
};
