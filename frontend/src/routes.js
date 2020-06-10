import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Movie from './pages/movie';
import Favorites from './pages/favorites';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/movie/:i" component={Movie} />
            <Route path="/favorites" component={Favorites} />
        </Switch>
    </BrowserRouter>
)

export default Routes;