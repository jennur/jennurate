import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './styles/main.scss';
import './scripts/starBackground';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';


const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <main>
      <HashRouter history={ history }>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/blogish" component={Blog}/>
          <Route path="/about" component={About}/>
        </Switch>
      </HashRouter>
      <Footer/>
      </main>
    );
  }
}

export default App;
