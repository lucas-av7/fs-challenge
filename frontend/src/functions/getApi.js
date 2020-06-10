import api from '../services/api';

export async function getMovieData(movieId) {

    const moviesData = movieId.map(async(ID) => {
        const responseMovie = await api.get(`/movie/${ID}`);
        return responseMovie.data;
    })

    const valores = await Promise.all(moviesData);
    return valores;
}
