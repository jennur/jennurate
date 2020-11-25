import React from "react";
import "../styles/DrawingCanvas.scss";

class DrawingCanvas extends React.Component {
  constructor(props){
    super(props);
    this.draw = this.draw.bind(this);
    this.setColor = this.setColor.bind(this);
    this.downloadCanvas = this.downloadCanvas.bind(this);

    this.state = {
      ctx: null,
      mouseDown: false
    }
  }
  render(){
    return (
      <section className="drawing-canvas">
        <div className="side-bar">
          <div className="color-picker">
            <span style={{backgroundColor: '#2eb1bd'}} 
                  onClick={event => this.setColor(event,"#2eb1bd")}>
            </span>
            <span style={{backgroundColor: '#d13333'}} 
                  onClick={event => this.setColor(event,"#d13333")}>
            </span>
            <span style={{backgroundColor: '#a1258b'}} 
                  onClick={event => this.setColor(event,"#a1258b")}>
            </span>
            <span style={{backgroundColor: '#db5d23'}} 
                  onClick={event => this.setColor(event,"#db5d23")}>
            </span>
            <span style={{backgroundColor: '#e9d735'}} 
                  onClick={event => this.setColor(event,"#e9d735")}>
            </span>
          </div>
        </div>
        <canvas id="canvas" style={{width: window.innerWidth, height: window.innerHeight}}></canvas>
          <button className="button" onClick={this.downloadCanvas}>Download my masterpiece!</button>      
        </section>
      )
  }
  draw(e){
    if(this.state.mouseDown){
      let ctx = this.state.ctx;
      ctx.lineWidth++;
      this.setState({ctx});
    }
    this.state.ctx.beginPath();
    this.state.ctx.lineTo(e.offsetX + 0.5, e.offsetY);
    this.state.ctx.stroke();
  }
  setColor(event, color){
    event.stopPropagation();
    let ctx = this.state.ctx;
    ctx.strokeStyle = color;
    this.setState({ctx});
  }
  increaseBrushSize(event){
    event.stopPropagation();
    this.setState({mouseDown: true});
  }
  resetBrushSize(event){
    event.stopPropagation();
    this.setState({mouseDown: false})
    let ctx = this.state.ctx;
    ctx.lineWidth = 5;
    this.setState({ctx});
  }
  downloadCanvas(){
    let canvas = document.getElementById("canvas");
    var img = canvas.toDataURL("image/png");
    const url = img;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "my_jennurate_art.png");
    link.click();
  }
  componentDidMount(){
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 4 * window.innerWidth;
    canvas.height = 4 * window.innerHeight;
    ctx.scale(4,4);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#2eb1bd";
    ctx.fillStyle = "#0c0c0e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.setState({ctx});
    canvas.addEventListener('mousemove', (e) => this.draw(e));
    canvas.addEventListener('mousedown', (e) => this.increaseBrushSize(e));
    canvas.addEventListener('mouseup', (e) => this.resetBrushSize(e));
  }
}

export default DrawingCanvas;