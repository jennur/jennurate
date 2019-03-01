import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/main.scss';
import './scripts/starBackground';


import Home from './pages/Home';
import Blog from './pages/Blog';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/blogish" component={Blog}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
