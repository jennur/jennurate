import React from "react";
import "../styles/Portfolio.scss";

class Portfolio extends React.Component {
  render() {
    return (
      <section className="portfolio">
        <h2 style={{color: "white"}}>Portfolio</h2>
        <p>This site is under construction, stay tuned 👩‍💻</p>
      </section>
    )
  }
  componentDidMount(){
    console.log("Portfolio");
  }
}

export default Portfolio;