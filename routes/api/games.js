const server = require('express').Router();
const db = require('../../dbHelper/index');

const getAllMovies = async (req, res) => {
  try {
    const games = await db.find('games', req.query);

    const results = games.data.map(async (game) => {
      games.test = 'mikko pogi';
      return game;
    });


    Promise.all(results).then((completed) => {
      games.data = completed;
      res.status(200).json(games);
    });
  } catch (err) {
    db.errHelper(res, err);
  }
};

// @route    GET api/games
// @desc     get all games & query
// @Access   Public
server.get('/', (req, res) => {
  getAllMovies(req, res);
});

// @route    GET api/games/:id
// @desc     get single games
// @Access   Public
server.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const games = await db.findById('games', { id });
    if (games) {
      res.status(200).json(games);
    } else {
      res.status(404).json({ message: 'games cannot find' });
    }
  } catch (err) {
    db.errHelper(res, err);
  }
});

// @route    post api/games
// @desc     post game
// @Access   Public
server.post('/', async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title) {
    // or 422
    return res.status(400).json({ message: 'title field is required' });
  }
  if (!genre) {
    return res.status(400).json({ message: 'genre field is required' });
  }

  try {
    const unique = await db.findBy('games', { title });
    if (unique) {
      await db.insert('games', { title, genre, releaseYear });
      getAllMovies(req, res);
    } else {
      res.status(405).json({ message: 'must be unique title ' });
    }
  } catch (err) {
    db.errHelper(res, err);
  }
});

// @route    PUT api/games
// @desc     update games
// @Access   Public
server.put('/:id', async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const { id } = req.params;
  try {
    const games = await db.update('games', id, { title, genre, releaseYear });
    if (games) {
      getAllMovies(req, res);
    } else {
      res.status(404).json({ message: 'games not found' });
    }
  } catch (err) {
    db.errHelper(res, err);
  }
});

// @route    DELETE api/games
// @desc     Delete
// @Access   Public
server.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const games = await db.remove('games', id);
    if (games) {
      getAllMovies(req, res);
    } else {
      res.status(404).json({ message: 'games not `found' });
    }
  } catch (err) {
    db.errHelper(res, err);
  }
});

//   title: 'Pacman', // required
//   genre: 'Arcade', // required
//   releaseYear: 1980 // not required
module.exports = server;
