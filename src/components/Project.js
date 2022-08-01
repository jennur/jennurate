import React from "react";
import "../styles/Project.scss";
import { faGithub, faBitbucket } from "@fortawesome/free-brands-svg-icons";
import { faCalendarCheck, faGear } from "@fortawesome/free-solid-svg-icons";

import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Portfolio extends React.Component {
  render() {
    const { 
      title, 
      description, 
      imgSrc, 
      url, 
      repo, 
      techStack,
      style,
      year,
      apis
    } = this.props;

    let techStackPills = techStack && techStack.map(tech => 
      <span className="pill" key={tech}>{tech}</span>
    );

    let apiListItems = apis && apis.map(api =>
      <a href={api.url} className="link apis" key={api.name} title="API used in this project">{api.name}</a>
    )

   return (
    <div className="project content-box" style={style}>
      <h2 className="content-heading">{title}</h2>

      <div className="details">
        <div className="pills-wrap">
          {techStackPills}
        </div>

        <ul>
          <li>
            <FontAwesomeIcon className="icon" icon={faLink}/>
            <a className="link" target="_blank" rel="noreferrer" href={url}>{url}</a>
          </li>
          <li>
            <FontAwesomeIcon className="icon" icon={repo.name === "GitHub" ? faGithub : faBitbucket}/>
            <a className="link" target="_blank" rel="noreferrer" href={repo.url}>
              {repo.name}
            </a>
          </li>
          { apiListItems && 
            <li>
              <FontAwesomeIcon className="icon" icon={faGear} />
              { apiListItems }
            </li>
          }
          <li>
            <FontAwesomeIcon className="icon" icon={faCalendarCheck} />
            <span className="year">{year}</span>
          </li>
        </ul>
      </div>
      <div className="screenshot-container">
        <div  
          className="screenshot" 
          style={{backgroundImage: `url(${imgSrc})`}}
        >
          <a  className="info link" 
              href={url} 
              target="_blank" 
              rel="noreferrer"
              title={url}
          >
            <p>{description}</p>
          </a>
        </div>
      </div>
    </div>
   )
  }
}

export default Portfolio;