import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PortfolioBlock from "../components/PortfolioBlock";

class Portfolio extends React.Component {
  render() {
    return (
      <section className="main">
        <Header title="Portfolio" />
        <span className="horizontal-line" />
        <div className="portfolio__items">
          <PortfolioBlock
            title="Kokebokami"
            type="Website/Service"
            url="https://kokebokami.com"
          >
            Kokebokami is an online digital cookbook where you can store your
            personal recipes and share them with other users privately or
            public. It's built with Nuxtjs/Vue and Firebase.
            <dl>
              <dt>
                Web address:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://kokebokami.com"
                >
                  kokebokami.com
                </a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="Asteroid of the Day"
            type="Website"
            url="https://asteroidod.netlify.app"
          >
            This project was my project exam the first year of my front-end
            development studies. It pulls data from NASA's NEOWS API's to
            display today's nearest asteroids. The site is built with React and
            basic CSS.
            <dl>
              <dt>
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jennur/asteroidod/tree/master/newsite"
                >
                  github/jennur/asteroidod
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://asteroidod.netlify.app"
                >
                  asteroidod.netlify.app
                </a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="A Game of Ice and Fire"
            type="Website / Game"
            url="https://icefireboard.netlify.app"
          >
            This is a Game of Thrones digital one-player board game built with
            HTML, CSS and vanilla JS. Test your GOT-quote knowledge and get to
            the dragon before your enemy!
            <br />
            <br />
            The graphics are made by me, while the GOT related content is pulled
            from the following two API's:
            <dl>
              <dt>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href=" https://www.anapioficeandfire.com/api/characters/"
                >
                  anapioficeandfire.com/api/characters/
                </a>
              </dt>
              <dt>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://got-quotes.herokuapp.com/quotes"
                >
                  got-quotes.herokuapp.com/quotes
                </a>
              </dt>
            </dl>
            <dl>
              <dt>
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jennur/gameoficeandfire"
                >
                  github/jennur/gameoficeandfire
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://icefireboard.netlify.app"
                >
                  icefireboard.netlify.app
                </a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="Letha"
            type="Prototype"
            url="https://letha.netlify.app/"
          >
            Letha is a prototype for a fictional shoe store that I made during
            the first year of my FED studies. It is built with pure HTML, CSS
            and vanilla JS and was focused on the UX.
            <dl>
              <dt>
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jennur/letha"
                >
                  github/jennur/letha
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://letha.netlify.app/"
                >
                  letha.netlify.app
                </a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="Community Science Museum"
            type="Prototype"
            url="https://community-science-museum.netlify.app/"
          >
            Community Science Museum is a prototype for a fictional science
            museum that I made during the first year of my FED studies. It is
            built with pure HTML and CSS and was focused on the design.
            <dl>
              <dt>
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jennur/csm"
                >
                  github/jennur/csm
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://community-science-museum.netlify.app/"
                >
                  community-science-museum.netlify.app
                </a>
              </dt>
            </dl>
          </PortfolioBlock>
          <PortfolioBlock
            title="Recycle"
            type="Prototype"
            url="https://re-cycle.netlify.app/"
          >
            Recycle is a prototype for a fictional tour company that offers bike
            tours around a city. This prototype was built during my first year
            of the FED studies with pure HTML and CSS and a focus on the design.
            <dl>
              <dt>
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jennur/recycle"
                >
                  github/jennur/recycle
                </a>
              </dt>
              <dt>
                Web address:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://re-cycle.netlify.app/"
                >
                  re-cycle.netlify.app
                </a>
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
