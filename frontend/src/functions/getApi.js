import api from '../services/api';

export async function getMovieData(movieId) {

    try {
        const moviesData = movieId.map(async(ID) => {
            const responseMovie = await api.get(`/movie/${ID}`);
            return responseMovie.data;
        })
    
        const valores = await Promise.all(moviesData);
        return valores;
    } catch (err) {
        return [{Title: 'Database connection lost!'}];
    }
    
}

export async function searchMovies(searchText, page) {
    try {
        const responseSearch = await api.get(`/search/${searchText}/${page}`);
        const { Search, Response} = responseSearch.data;
        

        if(Response === 'True') {
            const { totalResults  } = responseSearch.data;
            const totalPages = Math.floor(totalResults / 10);
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

            return {response: true, valores, totalPages };

        } else {
            const { Error } = responseSearch.data;
            return {response: false, Error };
        }
    } catch (err) {
        return {response: false, Error: 'Database connection lost!' };
    }
}