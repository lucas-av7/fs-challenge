const api = require('../services/api');

module.exports = {
      async getMovies(req, res) {
        const movies = await api.get('&s=' + req.params.s);
        return res.send(movies.data);
      },
      
      async getData(req, res) {
        const movie = await api.get('&i=' + req.params.i);
        return res.send(movie.data);
      }
}