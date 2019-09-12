import React from "react";

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <ul className="social-media">
          <li>
            <a href="https://www.github.com/jennur">
              <i className="fa fa-github" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/jenny.bonsak">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jenny-bonsak/">
              <i className="fa fa-linkedin" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/jennur/">
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
        <p className="copyright-notice">&copy; Jennurate All Rights Reserved</p>
      </footer>
    );
  }
}

export default Footer;
