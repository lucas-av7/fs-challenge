const api = require('axios');

const apiSearch = `http://www.omdbapi.com/?apikey=${process.env.IMDB_API_KEY}&s=`;
const apiData = `http://www.omdbapi.com/?apikey=${process.env.IMDB_API_KEY}&i=`;

module.exports = { api, apiSearch, apiData };