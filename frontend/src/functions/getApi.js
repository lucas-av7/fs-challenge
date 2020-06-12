import api from '../services/api';

export async function getMovieData(movieId) {
    const moviesData = movieId.map(async(ID) => {
        const responseMovie = await api.get(`/movie/${ID}`);
        return responseMovie.data;
    })

    const valores = await Promise.all(moviesData);
    return valores;
}

export async function searchMovies(searchText) {
    const responseSearch = await api.get(`/search/${searchText}`);
    const { Search, Response } = responseSearch.data;

    if(Response === 'True') {
        // Removendo objetos duplicados pela api da OMDB
        const valores = UniqueArraybyId(Search ,"imdbID");
        function UniqueArraybyId(collection, keyname) {
                    let output = [], keys = [];
    
                    collection.forEach(item => {
                        let key = item[keyname];
                        if(keys.indexOf(key) === -1) {
                            keys.push(key);
                            output.push(item);
                        }
                    });
            return output;
        };

        return {response: true, valores };

    } else {
        const { Error } = responseSearch.data;
        return {response: false, Error };
    }
}