import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css'

export default class Movie extends Component {

    state = {
        movieId: this.props.match.params.i,
        movieData: {}
    }

    componentDidMount() {
        this.loadDataMovie();
    }

    loadDataMovie = async () => {
        const { movieId } = this.state;
        const responseMovie = await api.get(`/movie/${movieId}`);
        this.setState({ movieData: responseMovie.data });
    }

    render() {
        const { searchText, recent } = this.props.location.state;
        return (
        <div><Link to={{ pathname: '/', state: { searchText, recent } }}>Voltar</Link></div>
    )}
}