import React from "react";
import "../styles/Portfolio.scss";
import { faGithub, faBitbucket } from "@fortawesome/free-brands-svg-icons";
import { faLink} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Portfolio extends React.Component {
  constructor(props){
    super(props);
    let contentAnimations = [];
    let numProjects = this.projects.length;
    this.projects.forEach((project, index) => {
      let movePercent = 20 + index*100;
      contentAnimations.push({
        transform: `translateX(${-movePercent}%)`,
        opacity: (numProjects-index)/100
      });
    })

    this.state = {
      contentAnimations
    }

  }
  render() {
    let projects = this.projects.map((project, index) => {
      let sourceCodeUrl;
      if(project.gitHubUrl) {
        sourceCodeUrl = <li><FontAwesomeIcon className="icon" icon={faGithub}/><a className="link" target="_blank" rel="noreferrer" href={project.gitHubUrl}>GitHub</a></li>
      } else if (project.bitbucketUrl) {
        sourceCodeUrl = <li><FontAwesomeIcon className="icon" icon={faBitbucket}/><a className="link" target="_blank" rel="noreferrer" href={project.bitbucketUrl}>Bitbucket</a></li>
      }
      let techStack = project.techStack && project.techStack.map((tech, techIndex) => {
        return (
          <span className="pill" key={techIndex}>{tech}</span>
        )
      })
      return (
        <div className="content-box" 
          style={this.state.contentAnimations[index]}
          key={index}
        >
          <h2 className="content-heading">{project.title}</h2>
          <div className="pill-wrap">
            {techStack}
          </div>
          <ul>
            <li>
              <FontAwesomeIcon className="icon" icon={faLink}/>
              <a className="link" target="_blank" rel="noreferrer" href={project.url}>{project.url}</a>
            </li>
            {sourceCodeUrl}
          </ul>
          <div  className="content-img" 
                style={{backgroundImage: `url(${project.imgSrc})`}}
          >
          <a  className="info link" 
              href={project.url} 
              target="_blank" 
              rel="noreferrer"
              title={project.url}
          >
            <p>{project.description}</p>
          </a>
          </div>
        </div>
        )
    });

    return (
      <section className="portfolio">
        <div className="projects">
          {projects}
        </div>
      </section>
    )
  }

  componentDidMount(){
    let contentAnimations = this.state.contentAnimations;
    contentAnimations = contentAnimations.map(() => {
      return {
        transform: "translateX(0px)",
        opacity: 1
      }
    })
    setTimeout(() => {
      this.setState({
        contentAnimations
      })
    }, 10)
  }

  projects = [
    {
      title: "Kokebokami",
      type: "Web Service",
      techStack: ["Vue/Nuxt", "Firebase"],
      imgSrc: "/kokebokami_screenshot.png",
      description: `
        An online cookbook service where you can upload your personal recipes,
        and save external ones in an organized way. Share, or don't share, publicly
        or with other users. Create shopping lists manually or from your saved recipes.
      `,
      url: "https://kokebokami.com",
      gitHubUrl: "https://github.com/jennur/kokebokami",
      year: "2020-present"
    },
    {
      title: "Asterix",
      type: "Simulation Service",
      techStack: ["Vue", "Threejs"],
      imgSrc: "/asterix_screenshot.png",
      description: `
        GUI for a multibody simulation service. The first goal is to make
        the user able to configure his/her own simulation with selected bodies and
        run the simulation, discovering the trajectories created by the gravitational forces.
      `,
      url: "https://asterix-sim.herokuapp.com",
      bitbucketUrl: "https://bitbucket.org/whoisthegingerbreadman/asteroids/src/master/asteroid_viz/Web/gui/",
      year: "2020-present"
    },
    {
      title: "Asteroid of the day",
      type: "Web Page",
      techStack: ["React"],
      imgSrc: "/asteroidod_screenshot.png",
      description: `
        Discover today's nearest asteroid and other near earth objects. 
      `,
      url: "https://asteroidod.netlify.app",
      gitHubUrl: "https://github.com/jennur/asteroidod/tree/master/newsite",
      apiUrl: "https://api.nasa.gov/api.html#neows-feed",
      year: "2019"
    }
  ]
}

export default Portfolio;