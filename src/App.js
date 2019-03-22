import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './styles/main.scss';
import './scripts/starBackground';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';


const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <main>
      <Router history={ history }>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/blogish" component={Blog}/>
        </Switch>
      </Router>
      <Footer/>
      </main>
    );
  }
}

export default App;
