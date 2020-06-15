const express = require('express');
const routes = express.Router();

const MovieController = require('./controllers/MovieController');

routes.get('/search/:s/:p', MovieController.getMovies);
routes.get('/movie/:i', MovieController.getData);

module.exports = routes;