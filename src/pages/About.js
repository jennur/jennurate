import React from "react";
import Header from "../components/Header";
import BlogPost from "../components/BlogPost";

class Home extends React.Component {
  render() {
    return (
      <section className="main">
        <Header title="Another collection of stardust" />
        <BlogPost>
          <div className="blog__text--narrow ">
            First things first, I'm a girl{" "}
            <span role="img" aria-label="emoji">
              💁‍♀️
            </span>
            , born in the beginning of the 90's, in the deepest and deepest
            forests of Norway. Surrounded by fields and fields of grains,{" "}
            <span role="img" aria-label="emoji">
              🌾
            </span>{" "}
            where moose and deer are your nearest friends{" "}
            <span role="img" aria-label="emoji">
              🦌
            </span>
            and the mighty night sky pulls you into questioning all its secrets
            over and over again...
            <br />
            <br />
            ... So I almost became a physicists, but after 3 years of staring at
            lines and lines of equations my creativity neurons were screaming{" "}
            <span role="img" aria-label="emoji">
              💀
            </span>
            , so I found the perfect balance of creativity and nerditivity
            <span role="img" aria-label="emoji">
              👩‍🎨🤓💻
            </span>
            in front-end development. So now I'm happily living off of turning
            my own, and others', sketches into living things on the internet.
            <div className="center-content">
              <iframe
                title="programming-cat"
                src="https://giphy.com/embed/lXiRzPb8C5JTJcfPq"
                width="480"
                height="264"
                frameBorder="0"
              />
            </div>
          </div>
        </BlogPost>
      </section>
    );
  }
  componentDidMount() {}
}

export default Home;
