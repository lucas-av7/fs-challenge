import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css'

export default class Movie extends Component {

    state = {
        movieId: this.props.match.params.i,
        movieData: {},
        loading: true
    }

    componentDidMount() {
        this.loadDataMovie();
    }

    loadDataMovie = async () => {
        const { movieId } = this.state;
        const responseMovie = await api.get(`/movie/${movieId}`);
        this.setState({ movieData: responseMovie.data, loading: false });
    }

    render() {
        const { searchText, recent } = this.props.location.state;
        const { movieData, loading } = this.state;
        return (
        <div className="containerMovie">
            <div className={loading ? 'loadingOn' : 'lodingOff'}></div>
            <div className={!loading ? 'movieDataOn' : 'movieDataOff'}>
                <div className="movieDesc">
                    <Link to={{ pathname: '/', state: { searchText, recent } }}>Voltar</Link>
                    <p>{movieData.Runtime} - {movieData.Year}</p>
                    <h1>{movieData.Title}</h1>
                    <p>IMDb: {movieData.imdbRating} Add to Favorites</p>
                    <h3>Plot:</h3>
                    <p>{movieData.Plot}</p>

                    <h3>Cast</h3>
                    <p>{movieData.Actors}</p>

                    <h3>Genre</h3>
                    <p>{movieData.Genre}</p>

                    <h3>Director</h3>
                    <p>{movieData.Director}</p>
                </div>
                <img src={movieData.Poster} alt={movieData.Title} />
            </div>
        </div>
    )}
}