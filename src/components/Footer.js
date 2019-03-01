import React from 'react';

export class Footer extends React.Component {
    render(){
      return(
        <footer className="footer">
          <ul className="social-media">
            <li><a href="https://www.instagram.com/jennur"><i className="fa fa-instagram"></i></a></li>
            <li><a href="https://www.facebook.com/jenny.bonsak"><i className="fa fa-facebook"></i></a></li>
            <li><a href="https://www.linkedin.com/in/jenny-bonsak/"><i className="fa fa-linkedin"></i></a></li>
          </ul>
        </footer>
      );
    }
  }

  export default Footer; 