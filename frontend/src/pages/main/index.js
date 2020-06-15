import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cinema from './img/cinema.svg';
import Void from './img/void.svg';
import ImgNotFound from '../../img/img-not-found.jpg';
import { haveFavorite, getFavorites } from '../../functions/favorite';
import { searchMovies } from '../../functions/getApi';

import './styles.css'

export default class Main extends Component {

    state = {
        movies: [],
        page: 1,
        totalPages: 1,
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
                moviePage: this.props.location.state.moviePage,
                page: this.props.location.state.page,
                totalPages: this.props.location.state.totalPages,
            })
        }
    }

    loadMovies = async () => {
        const { searchText, recent, page } = this.state;
        if(searchText === '') return;
        this.setState({loading: true, movies: [], home: false, Error: '', moviePage: false});
        const movies = await searchMovies(searchText, page);
        if(movies.response === true) {
            this.setState({movies: movies.valores, loading: false, Error: '', home: false, moviePage: true, totalPages: movies.totalPages });
            if(recent) {
                this.recentOrder();
            } else {
                this.ratingOrder();
            }
        } else {
            this.setState({movies: [], loading: false, home: false, Error: movies.Error, moviePage: false});
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
            // Alguns filmes tem nota 'N/A', o que faz dar erro no sort()
            let notaA = a.imdbRating, notaB = b.imdbRating;
            notaA = (notaA === 'N/A') ? 0 : parseFloat(notaA);
            notaB = (notaB === 'N/A') ? 0 : parseFloat(notaB);

            if (notaB < notaA) {
                return -1;
              } else if (notaA < notaB) {
                return 1;
              } else return 0;
        });
        this.setState({movies, recent: false});
    }


    render() {
        const { movies, loading, home, Error, recent, moviePage, searchText, totalPages, page } = this.state;
        const favorites = haveFavorite();
        const favoriteList = getFavorites();

        return (
            <div className="container">

                <div className="searchBox">
                    <input onChange={(e) => {

                        if(e.target.value[0] === ' ') {e.target.value = ''; return };

                        const { searchLoad } = this.state;

                        if(searchLoad) clearTimeout(searchLoad);
                        this.setState({
                            page: 1,
                            searchText: e.target.value,
                            searchLoad: setTimeout(this.loadMovies, 1500)
                        });
                        }} type="text" placeholder="Search by movie title" value={searchText}/>

                        <Link to={'/favorites'}><button disabled={!favorites} id="favoriteButton">&hearts;</button></Link>
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
                        
                        <Link  key={movie.imdbID} to={{ pathname: `/movie/${movie.imdbID}`, state: { searchText, recent, movies, page, totalPages}, backFavorite: false }}>
                            <article>
                                <img src={movie.Poster} onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = ImgNotFound;
                                }} alt={movie.Title} />
                                <section className="rate">
                                    <p>{movie.imdbRating}</p>
                                </section>
                                <section className="movieInfo">
                                    <p className={(favoriteList.indexOf(movie.imdbID) !== -1) ? 'heartOn' : 'heartOff' }>&hearts;</p>
                                    <h2>{movie.Title}</h2>
                                    <p>{movie.Year}</p>
                                    <p>{movie.Genre}</p>
                                    <br />
                                    <p>{movie.Plot}</p>
                                </section>
                            </article>
                        </Link>
                    ))}

                    <div className="divPagination">
                        <button disabled={page === 1} onClick={() => {
                            this.setState({ page: page - 1 });
                            setTimeout(this.loadMovies, 300);
                        }}>&#8678;</button>
                        <p>{page} / {totalPages}</p>
                        <button disabled={page === totalPages} onClick={() => {
                            this.setState({ page: page + 1 });
                            setTimeout(this.loadMovies, 300);
                        }}>&#8680;</button>
                    </div>
                </div>
            </div>
        )
    }

}