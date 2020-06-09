export function setFavorite(id) {
    const favorites = localStorage.getItem('favoriteMovies');
    if (favorites === null) {
        const moviesString = JSON.stringify([id]);
        localStorage.setItem('favoriteMovies', moviesString)
    } else {
        const favoriteMovies = localStorage.getItem('favoriteMovies');
        const moviesArray = JSON.parse(favoriteMovies);
        const indexMovie = moviesArray.indexOf(id);
        if(indexMovie === -1) {
            moviesArray.push(id);
            const moviesString = JSON.stringify(moviesArray);
            localStorage.setItem('favoriteMovies', moviesString);
        } else {
            moviesArray.splice(indexMovie, 1);
            const moviesString = JSON.stringify(moviesArray);
            localStorage.setItem('favoriteMovies', moviesString);
        }
    }
}

export function isFavorite(id) {
    const favoriteMovies = localStorage.getItem('favoriteMovies');
    if(favoriteMovies === null) return false
    const moviesArray = JSON.parse(favoriteMovies);
    const indexMovie = moviesArray.indexOf(id);
    if(indexMovie === -1) {
        return false;
    } else {
        return true;
    }
}