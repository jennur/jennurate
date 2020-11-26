import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './styles/App.scss';
import DrawingCanvas from "./components/DrawingCanvas";
import About from "./components/About";
import Portfolio from "./components/Portfolio";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      titleColorClass: "orange"
    }
    this.changeColor = this.changeColor.bind(this);
  }
  render() {
    return (
      <Router>
        <div className={`app ${this.state.titleColorClass}`} onClick={this.changeColor}>
          <header className="app-header">
            <Link to="/" className="site-title">jennurate</Link>
            <nav>
              <Link to="/about" className="link">About</Link>
              <Link to="/portfolio" className="link">Portfolio</Link>
            </nav>
          </header>
          <Switch>
            <Route exact path="/about" component={About}/>
            <Route exact path="/portfolio"component={Portfolio}/>
            <Route exact path="/" component={DrawingCanvas}/>
          </Switch>
        </div>
      </Router>
    );
  }
  changeColor(){
    let randomNum = Math.abs(Math.round(Math.random()*10) - 5);
    let colors = ["red", "orange", "blue", "purple", "blue-green", "yellow"];
    let titleColorClass = colors[randomNum];
    this.setState({ titleColorClass });
  }
  
}

export default App;
