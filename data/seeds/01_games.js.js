exports.seed = knex => (
  // Deletes ALL existing entries
  knex('games')
    .truncate()
    .then(() => (
      // Inserts seed entries
      knex('games').insert([
        {
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980, // not required}
        },
        {
          title: 'Spiderman', // required
          genre: 'Arcade', // required
          releaseYear: 1980, // not required}
        },
        {
          title: 'OnePiece', // required
          genre: 'Anime', // required
          releaseYear: 1980, // not required}
        },
        {
          title: 'Naruto', // required
          genre: 'Anime', // required
          releaseYear: 1980, // not required}
        },
        {
          title: 'Avatar', // required
          genre: 'Anime', // required
          releaseYear: 1980, // not required}
        },
      ])
    ))
);

