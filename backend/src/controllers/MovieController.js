const axios = require('axios');

const api = 'http://www.omdbapi.com/?apikey=75a7cb8b&';

module.exports = {
      async getMovies(req, res) {
        const movies = await axios.get(api + `s=${req.params.s}`);
        return res.send(JSON.stringify(movies.data));
      },
      
      async getData(req, res) {
        const movie = await axios.get(api + `i=${req.params.i}`);
        return res.send(JSON.stringify(movie.data));
      }
}