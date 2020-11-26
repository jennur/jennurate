import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
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
    console.log("Window:", window.innerWidth)
    let buttonText = window.innerWidth > 900 ? "Download my masterpiece!" : "";
    let colors = ["#2eb1bd", "#d13333", "#a1258b", "#db5d23", "#e9d735"];
    let swatches = colors.map((color, index) => {
      return (
        <span style={{backgroundColor: color}} 
              onClick={event => this.setColor(event,color)}
              key={index}
        >
        </span>
      )
    })
    return (
      <section className="drawing-canvas">
        <canvas id="canvas" style={{width: window.innerWidth, height: window.innerHeight}}></canvas>
        <div className="bottom-bar">
        <button className="button" onClick={this.downloadCanvas}>
            <FontAwesomeIcon className="button-icon" icon={faDownload}/>
            {buttonText}
          </button>   
          <div className="color-picker">
            {swatches}
          </div>
        </div>
      </section>
      )
  }
  draw(e){
    if(e.touches) e.preventDefault();
    if(this.state.mouseDown){
      let ctx = this.state.ctx;
      ctx.lineWidth++;
      this.setState({ctx});
    }
    this.state.ctx.beginPath();
    if(e.offsetX) {
      this.state.ctx.lineTo(e.offsetX, e.offsetY);
    } else if(e.touches && e.touches[0].clientX){
      this.state.ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    }
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

    canvas.addEventListener('touchstart', (e) => this.draw(e));
    canvas.addEventListener('touchmove', (e) => this.draw(e));

    canvas.addEventListener('mousedown', (e) => this.increaseBrushSize(e));
    canvas.addEventListener('mouseup', (e) => this.resetBrushSize(e));
  }
}

export default DrawingCanvas;