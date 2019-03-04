import React from 'react';
import { Link } from 'react-router-dom';

class FlashyHeader extends React.Component {
  render(){
    return(
      <div className="display-content">
        <h1 className="title">jennurate</h1>
        <p>Blogish ~ <Link to="blogish">Plants and Codies</Link></p>
        <ul className="flashy__links">
          <li>
            <a className="display-link" href="http://www.asteroidod.com" title="Asteroid of the Day">AsteroidOD</a>
          </li>
          <li>
            <a className="display-link" href="http://www.icefireboard.com" title="A Game of Ice and Fire">A Game of Ice and Fire</a>
          </li>
        </ul>
        
        
        <p className="sign">by Jenny Bonsak</p>
      </div>
    );
  }
}

export default FlashyHeader;