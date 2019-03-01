import React from 'react';
import { Link } from 'react-router-dom';

class FlashyHeader extends React.Component {
  render(){
    return(
      <div className="display-content">
        <h1 className="title">jennurate</h1>
        <p>Blogish ~ <Link to="blogish">Plants and Codies</Link></p>
        <a className="display-link" href="http://www.asteroidod.com" title="Asteroid of the Day">AsteroidOD</a>
        <a className="display-link" href="http://www.icefireboard.com" title="A Game of Ice and Fire">A Game of Ice and Fire</a>
        <p className="sign">by Jenny Bonsak</p>
      </div>
    );
  }
}

export default FlashyHeader;