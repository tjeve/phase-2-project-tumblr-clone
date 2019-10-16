exports.up = function(knex) {
    return knex.schema.createTable('Posts', (table) => {
        table.increments('id')
        // table.string('userId')
        // table.foreign('userId').references('Users.id')
        table.string('postedImage')
        table.integer('numberOfNotes')
        // table.string('userImage')
        // table.foreign('userImage').references('Users.userImage')
        table.date('date')
        table.string('postedMessage')
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE Posts')
};