exports.up = knex => knex.schema.createTable('games', (tbl) => {
  tbl.increments();
  tbl
    .string('title')
    .notNullable()
    .unique();
  tbl.string('genre').notNullable();
  tbl.integer('releaseYear');
});

exports.down = knex => knex.schema.dropTableIfExists('games');
