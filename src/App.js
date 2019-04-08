import React, { Component } from "react";
import "./scripts/firebase.js";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./styles/main.scss";
import "./scripts/starBackground";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";

class App extends Component {
  render() {
    return (
      <main>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/blogish" component={Blog} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/about" component={About} />
          </Switch>
        </HashRouter>
        <Footer />
      </main>
    );
  }
}

export default App;
