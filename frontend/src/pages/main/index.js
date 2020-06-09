import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Cinema from './img/cinema.svg';
import Void from './img/void.svg';

import './styles.css'

export default class Main extends Component {

    state = {
        movies: [],
        searchText: '',
        loading: false,
        home: true,
        searchLoad: null,
        Error: '',
        recent: true,
        moviePage: false
    }

    componentDidMount() {
        if(this.props.location.state === undefined) return;
        else {
            this.setState({
                searchText: this.props.location.state.searchText,
                movies: this.props.location.state.movies,
                recent: this.props.location.state.recent,
                home: this.props.location.state.home,
                moviePage: this.props.location.state.moviePage
            })
        }
    }

    loadMovies = async () => {
        const { searchText, recent } = this.state;
        if(searchText === '') return;
        this.setState({loading: true, movies: [], home: false, Error: '', moviePage: false});
        const responseSearch = await api.get(`/search/${searchText}`);
        const { Search, Response } = responseSearch.data;

        if(Response === 'True') {
            const Movies = Search.map(async movie => {
                const id = movie.imdbID;
                const responseMovie = await api.get(`/movie/${id}`);
                const {Genre, imdbRating, Plot} = responseMovie.data;
                const newMovie = movie;
                newMovie['Genre'] = Genre;
                newMovie['imdbRating'] = imdbRating;
                newMovie['Plot'] = Plot;
    
                return newMovie;
            })
    
            let valores = await Promise.all(Movies);

            // Removendo objetos duplicados
            valores = UniqueArraybyId(valores ,"imdbID");

            function UniqueArraybyId(collection, keyname) {
                      let output = [], 
                          keys = [];
        
                      collection.forEach(item => {
                          let key = item[keyname];
                          if(keys.indexOf(key) === -1) {
                              keys.push(key);
                              output.push(item);
                          }
                      });
                return output;
           };
    
            this.setState({movies: valores, loading: false, Error: '', home: false, moviePage: true});

            if(recent) {
                this.recentOrder();
            } else {
                this.ratingOrder();
            }
        } else {
            const { Error } = responseSearch.data;
            this.setState({movies: [], loading: false, home: false, Error, moviePage: false});
        }
    };

    recentOrder = () => {
        const { movies } = this.state;
        movies.sort((a, b) => {
            const numberA = parseInt(a.Year);
            const numberB = parseInt(b.Year);

            if (numberB < numberA) {
                return -1;
            } else if (numberA < numberB) {
                return 1;
            }
            else return 0;
        });
        this.setState({movies, recent: true});
    }

    ratingOrder = () => {
        const { movies } = this.state;
        movies.sort((a, b) => {
            const numberA = parseFloat(a.imdbRating);
            const numberB = parseFloat(b.imdbRating);

            if (numberB < numberA) {
                return -1;
              }
            else if (numberA < numberB) {
                return 1;
              }
            else return 0;
        });
        this.setState({movies, recent: false});
    }


    render() {
        const { movies, loading, home, Error, recent, moviePage, searchText } = this.state;

        return (
            <div className="container">

                <div className="searchBox">
                    <input onChange={(e) => {

                        if(e.target.value[0] === ' ') {e.target.value = ''; return };

                        const { searchLoad } = this.state;

                        if(searchLoad) clearTimeout(searchLoad);
                        this.setState({
                            searchText: e.target.value,
                            searchLoad: setTimeout(this.loadMovies, 1500)
                        });
                        }} type="text" placeholder="Search by movie title" value={searchText}/>
                </div>

                <div className={loading ? 'loadingOn' : 'loadingOff'}></div>

                <div className={home || Error ? 'homeImgsOn' : 'homeImgsOff'}>
                    <div className={home ? 'homeOn' : 'homeOff'}>
                    <img src={Cinema} alt="Cinema" />
                    <h2>Search for movies and series</h2>
                    </div>
                    <div className={Error ? 'errorOn' : 'errorOff'}>
                    <img src={Void} alt="Not Found" />
                    <h2>{Error}</h2>
                    </div>
                </div>

                <div className={moviePage ? 'movieList' : 'movieListOff'}>
                    <div className="order">
                        <button disabled={recent} onClick={this.recentOrder}>Most Recent</button>
                        <button disabled={!recent} onClick={this.ratingOrder}>Highest Rating</button>
                    </div>
                    { movies.map(movie => (
                        
                        <Link  key={movie.imdbID} to={{ pathname: `/movie/${movie.imdbID}`, state: { searchText, recent, movies} }}>
                            <article>
                                <img src={movie.Poster} alt={movie.Title} />
                                <section className="rate">
                                    <p>{movie.imdbRating}</p>
                                </section>
                                <section className="movieInfo">
                                    <strong>{movie.Title}</strong>
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