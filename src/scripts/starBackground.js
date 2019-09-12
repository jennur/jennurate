import * as d3 from "d3";

export default function bg() {
  const background = d3.select("#bg");

  for (let i = 0; i < 300; i++) {
    background
      .append("i")
      .attr("class", "dot")
      .style("top", Math.random() * window.innerHeight + "px")
      .style("left", Math.random() * window.innerWidth + "px")
      .transition()
      .duration(20000)
      .ease(d3.easeBack)
      .style("top", Math.random() * window.innerHeight + "px")
      .style("left", Math.random() * window.innerWidth + "px");
  }
  const dots = background.selectAll(".dot");

  setInterval(() => {
    for (let i = 0; i < dots.size(); i++) {
      let dot = dots["_groups"][0][i];

      d3.select(dot)
        .style("top", dot.getBoundingClientRect().top + "px")
        .style("left", dot.getBoundingClientRect().left + "px")
        .transition()
        .duration(20000)
        .ease(d3.easeBack)
        .style("top", Math.random() * window.innerHeight + "px")
        .style("left", Math.random() * window.innerWidth + "px");
    }
  }, 20000);
}
