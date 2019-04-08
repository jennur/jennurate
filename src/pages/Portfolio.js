import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PortfolioBlock from "../components/PortfolioBlock";

class Portfolio extends React.Component {
  render() {
    return (
      <section className="main">
        <Link className="button--home" to="/">
          ⇦ Go home
        </Link>
        <Header title="Portfolio" />
        <span className="horizontal-line" />

        <div className="portfolio__items">
          <PortfolioBlock
            title="Asteroid of the Day"
            type="Website"
            url="https://asteroidod.com"
          >
            This project was my project exam the first year of my front-end
            development studies. It pulls data from NASA's NEOWS API's to
            display today's nearest asteroids. The site is built with React and
            basic CSS.
            <dl>
              <dt>
                Source code:{" "}
                <a href="https://github.com/jennur/asteroidod/tree/master/newsite">
                  github/jennur/asteroidod
                </a>
              </dt>
              <dt>
                Web address: <a href="https://asteroidod.com">asteroidod.com</a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="A Game of Ice and Fire"
            type="Website / Game"
            url="https://icefireboard.com"
          >
            This is a Game of Thrones digital one-player board game built with
            HTML, CSS and vanilla JS. Test your GOT-quote knowledge and get to
            the dragon before your enemy!
            <dl>
              <dt>
                Source code:{" "}
                <a href="https://github.com/jennur/gameoficeandfire">
                  github/jennur/gameoficeandfire
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a href="https://icefireboard.com">icefireboard.com</a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="Letha"
            type="Prototype"
            url="https://letha.netlify.com/"
          >
            Letha is a prototype for a fictional shoe store that I made during
            the first year of my FED studies. It is built with pure HTML, CSS
            and vanilla JS and was focused on the UX.
            <dl>
              <dt>
                Source code:{" "}
                <a href="https://github.com/jennur/letha">
                  github/jennur/letha
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a href="https://letha.netlify.com/">letha.netlify.com</a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="Community Science Museum"
            type="Prototype"
            url="https://community-science-museum.netlify.com/"
          >
            Community Science Museum is a prototype for a fictional science
            museum that I made during the first year of my FED studies. It is
            built with pure HTML and CSS and was focused on the design.
            <dl>
              <dt>
                Source code:{" "}
                <a href="https://github.com/jennur/csm">github/jennur/csm</a>
              </dt>
              <dt>
                Web address:{" "}
                <a href="https://community-science-museum.netlify.com/">
                  community-science-museum.netlify.com
                </a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="Recycle"
            type="Prototype"
            url="https://re-cycle.netlify.com/"
          >
            Recycle is a prototype for a fictional tour company that offers bike
            tours around a city. This prototype was built during my first year
            of the FED studies with pure HTML and CSS and a focus on the design.
            <dl>
              <dt>
                Source code:{" "}
                <a href="https://github.com/jennur/recycle">
                  github/jennur/recycle
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a href="https://re-cycle.netlify.com/">re-cycle.netlify.com</a>
              </dt>
            </dl>
          </PortfolioBlock>
        </div>
      </section>
    );
  }
  componentDidMount() {}
}

export default Portfolio;
