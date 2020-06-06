const {api, apiSearch, apiData} = require('../services/api');

module.exports = {
      async getMovies(req, res) {
        const movies = await api.get(apiSearch + req.params.s);
        return res.send(movies.data);
      },
      
      async getData(req, res) {
        const movie = await api.get(apiData + req.params.i);
        return res.send(movie.data);
      }
}