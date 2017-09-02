import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './containers/Home';
import ArticlePage from './containers/ArticlePage';
import User from './containers/User';
import AllComments from './containers/AllComments';
import NotFound from './containers/NotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route path='/comments' component={ AllComments } />
      <Route path='/articles/:id' component={ ArticlePage } />
      <Route path='/users/:id' component={ User } />

      <Route component={ NotFound } />
    </Switch>
  </Router>
);

export default Routes;
