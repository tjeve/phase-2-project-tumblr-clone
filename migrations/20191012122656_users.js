
exports.up = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments('id')
        table.string('name')
        table.string('userImage')
        table.string('slug')
        table.integer('postId')
        table.foreign('postId').references('posts.id')
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE Users')
};
