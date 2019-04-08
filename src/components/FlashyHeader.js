import React from "react";
import { Link } from "react-router-dom";

class FlashyHeader extends React.Component {
  render() {
    return (
      <div className="display-content">
        <h1 className="title">jennurate</h1>
        <p>
          <Link className="button" to="blogish">
            Plants and Codies
          </Link>
          <Link className="button" to="/portfolio">
            Portfolio
          </Link>
        </p>
      </div>
    );
  }
}

export default FlashyHeader;
