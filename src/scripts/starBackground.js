import * as d3 from 'd3';

export default function bg() {

    for(let i = 0; i < 300; i++){
      
      d3.select('#bg')
        .append('i')
        .attr('class', 'dot')
        .style('top', Math.random()*window.innerHeight +'px')
        .style('left', Math.random()*window.innerWidth+'px')
        .transition()
        .duration(20000)
        .style('top', Math.random()*window.innerHeight+'px')
        .style('left', Math.random()*window.innerWidth+'px');
      
    }
}