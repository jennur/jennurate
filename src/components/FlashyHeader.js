import React from "react";
import { Link } from "react-router-dom";

class FlashyHeader extends React.Component {
  render() {
    return (
      <div className="display-content">
        <h1 className="title">jennurate</h1>
        <div className="flash__buttons-container">
          <Link className="button" to="/about">
            About
          </Link>
          <Link className="button" to="/portfolio">
            Portfolio
          </Link>
        </div>
      </div>
    );
  }
}

export default FlashyHeader;
