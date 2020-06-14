import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toggleFavorite, isFavorite } from '../../functions/favorite';
import { getMovieData } from '../../functions/getApi';
import ImgNotFound from '../../img/img-not-found.jpg';

import './styles.css'
import './responsive.css'

export default class Movie extends Component {

    state = {
        movieId: this.props.match.params.i,
        movieData: {},
        loading: true,
        favorited: false,
        searchText: '',
        movies: [],
        recent: true,
        home: true,
        moviePage: false,
        backFavorite: false
    }

    componentDidMount() {
        if(this.props.location.state !== undefined) {
            this.setState({
                searchText: this.props.location.state.searchText,
                movies: this.props.location.state.movies,
                recent: this.props.location.state.recent,
                home: false,
                moviePage: true
            })
        }

        if(this.props.location.backFavorite !== undefined) {
            this.setState({ backFavorite: this.props.location.backFavorite.back });
        }

        const favorited = isFavorite(this.state.movieId);
        this.setState({favorited});

        this.loadDataMovie();
    }

    loadDataMovie = async () => {
        const { movieId } = this.state;
        const responseMovie = await getMovieData([movieId]);
        this.setState({ movieData: responseMovie[0], loading: false });
    }

    render() {
        const { movieData, loading, searchText, movies, recent, home, moviePage, favorited, backFavorite } = this.state;
        return (
        <div className="containerMovie">
            <div className={loading ? 'loadingOn' : 'lodingOff'}></div>
            <div className={!loading ? 'movieDataOn' : 'movieDataOff'}>
                <div className="movieDesc">
                    <Link to={{ pathname: backFavorite ? '/favorites' : '/', state: { searchText, movies, recent, home, moviePage } }}><button>&#8678;</button></Link>
                    <h3>{movieData.Runtime} - {movieData.Year}</h3>
                    <h1>{movieData.Title}</h1>
                    <div className="rating">
                        <p className={movieData.imdbRating > 7 ? 'greenRating' : movieData.imdbRating > 5 ? 'yellowRating' : 'redRating'} >IMDb: {movieData.imdbRating} / 10</p>
                        
                        <p  className={favorited ? 'favoritedOn' : 'favoritedOff'}
                            title={favorited ? 'Remove from favorites' : 'Favorite this movie'}
                            onClick={() => {
                            toggleFavorite(movieData.imdbID);
                            this.setState({favorited: !favorited})
                        }}>&hearts;</p>
                    </div>
                    <h3>Plot</h3>
                    <p>{movieData.Plot}</p>
                    <hr/>
                    <h3>Cast</h3>
                    <p>{movieData.Actors}</p>
                    <hr/>
                    <h3>Genre</h3>
                    <p>{movieData.Genre}</p>
                    <hr/>
                    <h3>Director</h3>
                    <p>{movieData.Director}</p>                  
                </div>
                <img src={movieData.Poster} onError={(e) => {
                    e.target.onError = null;
                    e.target.src = ImgNotFound;
                 }} alt={movieData.Title} />
            </div>
        </div>
    )}
}