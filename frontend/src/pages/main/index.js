import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Cinema from './img/cinema.svg';
import Void from './img/void.svg';

import './styles.css'

export default class Main extends Component {

    state = {
        movies: [],
        page: 1,
        searchText: '',
        loading: false,
        home: true,
        notFound: false
    }

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies = async () => {
        const { searchText } = this.state;
        if(searchText === '') return;
        this.setState({loading: true, movies: [], home: false, notFound: false});
        const responseSearch = await api.get(`/search/${searchText}`);
        const { Search, totalResults, Response } = responseSearch.data;

        if(Response === 'True') {
            const Movies = Search.map(async movie => {
                const id = movie.imdbID;
                const responseMovie = await api.get(`/movie/${id}`);
                const {Genre, imdbRating} = responseMovie.data;
                const newMovie = movie;
                newMovie['Genre'] = Genre;
                newMovie['imdbRating'] = imdbRating;
    
                return newMovie;
            })
    
            const valores = await Promise.all(Movies);
    
            this.setState({movies: valores, page: totalResults, loading: false, notFound: false, home: false});
        } else {
            this.setState({movies: [], page: 1, loading: false, notFound: true, home: false});
        }
    };


    render() {
        const { movies, page, loading, home, notFound } = this.state;

        return (
            <div className="container">

                <div className="searchBox">
                    <input onInput={(e) => this.setState({searchText: e.target.value})} type="text" placeholder="Search by movie title" />
                    <button onClick={this.loadMovies}>Search</button>
                </div>

                <div className={loading ? 'loadingOn' : 'loadingOff'}></div>

                <div className={home || notFound ? 'homeImgsOn' : 'homeImgsOff'}>
                    <div className={home ? 'homeOn' : 'homeOff'}>
                    <img src={Cinema} alt="Cinema" />
                    </div>
                    <div className={notFound ? 'notFoundOn' : 'notFoundOff'}>
                    <img src={Void} alt="Not Found" />
                    </div>
                </div>

                <div className="movieList">
                    { movies.map(movie => (
                        
                        <Link to={`/movie/${movie.imdbID}`}>
                            <article key={movie.imdbID}>
                                <img src={movie.Poster} alt={movie.Title} />
                                <section className="rate">
                                    <p>{movie.imdbRating}</p>
                                </section>
                                <section className="movieInfo">
                                    <strong>{movie.Title}</strong>
                                    <p>{movie.Year}</p>
                                    <p>{movie.Genre}</p>
                                </section>
                            </article>
                        </Link>

                        
                        
                    ))}
                </div>
            </div>
        )
    }

}