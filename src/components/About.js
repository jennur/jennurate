import React from "react";
import "../styles/About.scss";

class About extends React.Component {
  render() {
    return (
      <section class="about">
        <h2 style={{color: "white"}}>About</h2>
        <p>This site is under construction, stay tuned 👩‍💻</p>
      </section>
    )
  }
  componentDidMount(){
    console.log("About");
  }
}

export default About;