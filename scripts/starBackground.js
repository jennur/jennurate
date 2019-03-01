for(let i = 0; i < 300; i++){
  let bgElement = d3.select('#bg')
                  .append('i')
                  .attr('class', 'dot')
                  .style('top', Math.random()*window.innerHeight+'px')
                  .style('left', Math.random()*window.innerWidth+'px')
                  .transition()
                  .duration(20000)
                  .style('top', Math.random()*window.innerHeight+'px')
                  .style('left', Math.random()*window.innerWidth+'px');
}

//var dots = document.getElementById('bg').childNodes;
var dots = d3.selectAll('.dot');
