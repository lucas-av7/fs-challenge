const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

const setFavorites = favoriteMovies => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}

const isFavorite = movieId => {
    const favoriteMovies = getFavorites();
    return favoriteMovies.includes(movieId);
}

const haveFavorite = () => {
    const favoriteMovies = getFavorites();
    return favoriteMovies.length > 0;
}

const toggleFavorite = movieId => {
    let favoriteMovies = getFavorites();

    if(isFavorite(movieId)) {
        favoriteMovies.splice(favoriteMovies.indexOf(movieId), 1);
    } else {
        favoriteMovies.push(movieId);
    }

    setFavorites(favoriteMovies);
}

export { getFavorites, setFavorites, isFavorite, haveFavorite, toggleFavorite }