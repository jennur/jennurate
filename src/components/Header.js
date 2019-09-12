import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Link className="button--home" to="/">
          ⇦ Go home
        </Link>
        <h1>{this.props.title}</h1>
        <p>{this.props.lead}</p>
      </header>
    );
  }
}

export default Header;
