import React from "react";
//import "../styles/Portfolio.scss";

class Portfolio extends React.Component {
  render() {
    return (
      <section><h2 style={{color: "white"}}>Portfolio</h2></section>
    )
  }
  componentDidMount(){
    console.log("Portfolio");
  }
}

export default Portfolio;