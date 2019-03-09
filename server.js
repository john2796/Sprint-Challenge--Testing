const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const server = express();

const games = require('./routes/api/games');

server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  }),
);
server.use(helmet());
server.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
server.use(logger('dev'));

server.use('/api/games', games);

// 404
server.use((req, res) => res
  .status(404)
  .send({ message: '[Route] --> " + req.url + " <-- Not found.' }));
// 500 - Any server error
server.use((err, res) => res.status(500).json({ error: err }));

module.exports = server;
