
exports.up = function(knex) {
    return knex.schema.createTable('Posts', (table) => {
        table.increments('id')
        table.integer('userId').references('usersId')
        table.string('postedImage')
        table.integer('numberOfNotes')
        table.string('userImage').references('usersUserImage')
        table.date('date')
        table.string('postedMessage')
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE posts')
};
