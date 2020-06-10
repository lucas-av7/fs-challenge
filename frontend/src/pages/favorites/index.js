import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { getFavorites } from '../../functions/favorite';

import './styles.css'

export default class Favorites extends Component {
    state = {

    }

    componentDidMount() {
        const favoriteMovies = getFavorites();
        console.log(favoriteMovies);
    }
}