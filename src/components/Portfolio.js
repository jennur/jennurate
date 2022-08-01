import React from "react";
import "../styles/Portfolio.scss";
import { projects } from "../json/projects.json";
import Project from "./Project";

class Portfolio extends React.Component {
  constructor(props){
    super(props);
    let contentAnimations = [];
    let numProjects = projects.length;

    projects.forEach((project, index) => {
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
    let projectElements = projects.map(
      (project, index) => 
        <Project 
          key={project.title}
          imgSrc={project.imgSrc}
          title={project.title}
          type={project.type}
          description={project.description}
          repo={project.repo}
          url={project.url}
          techStack={project.techStack}
          year={project.year}
          apis={project.apis}
          style={this.state.contentAnimations[index]}
        />
    );

    return (
      <section className="portfolio main-content">
        <div className="projects">
          { projectElements }
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
}


export default Portfolio;