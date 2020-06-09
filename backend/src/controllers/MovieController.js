const {api, apiSearch, apiData} = require('../services/api');

module.exports = {
      async getMovies(req, res) {
      const movies = await api.get(apiSearch + req.params.s);

      const MoviesMerge = movies.data.Search.map(async movie => {
        const id = movie.imdbID;
        const responseMovie = await api.get(apiData + id);
        const {Genre, imdbRating, Plot} = responseMovie.data;
        const newMovie = movie;
        newMovie['Genre'] = Genre;
        newMovie['imdbRating'] = imdbRating;
        newMovie['Plot'] = Plot;

        return newMovie;
      })
      const valores = await Promise.all(MoviesMerge);
      
      movies['data']['Search'] = valores;
      return res.send(movies.data);
      },
      
      async getData(req, res) {
        const movie = await api.get(apiData + req.params.i);
        return res.send(movie.data);
      }
}