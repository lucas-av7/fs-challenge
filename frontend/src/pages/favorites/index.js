import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites } from '../../functions/favorite';
import { getMovieData } from '../../functions/getApi';

import './styles.css'

export default class Favorites extends Component {
    state = {
        movies: [],
        loading: true
    }

    componentDidMount() {

        this.getMovies();
    }

    async getMovies() {
        const favoriteMovies = getFavorites();
        const movies =  await getMovieData(favoriteMovies);
        this.setState({ movies, loading: false });
    }

    render() {
        const { movies, loading } = this.state;
        return(
            <div className="container">
                <div className="buttonBack">
                <Link to={'/'}><button>&#8678;</button></Link>
                </div>
                <h1 className="favoriteTitle">Favorites list</h1>

                <div className={loading ? 'loadingOn' : 'loadingOff'}></div>

                <div className="favoriteList">
                    { movies.map(movie => (
                            <Link  key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                                <article>
                                    <img src={movie.Poster} alt={movie.Title} />
                                    <section className="rate">
                                        <p>{movie.imdbRating}</p>
                                    </section>
                                    <section className="movieInfo">
                                        <h2>{movie.Title}</h2>
                                        <p>{movie.Year}</p>
                                        <p>{movie.Genre}</p>
                                        <br />
                                        <p>{movie.Plot}</p>
                                    </section>
                                </article>
                            </Link>
                        ))}
                    </div>
            </div>
        )
    }
}