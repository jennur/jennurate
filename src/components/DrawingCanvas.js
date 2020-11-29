import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "../styles/DrawingCanvas.scss";

class DrawingCanvas extends React.Component {
  constructor(props){
    super(props);
    this.draw = this.draw.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setLineCap = this.setLineCap.bind(this);
    this.downloadCanvas = this.downloadCanvas.bind(this);

    this.state = {
      ctx: null,
      mouseDown: false
    }
    this.resizeCanvas = this.resizeCanvas.bind(this);
  }
  render(){
    let buttonText = window.innerWidth > 900 ? "Download my masterpiece!" : "";
    let colors = ["#2eb1bd", "#d13333", "#a1258b", "#db5d23", "#e9d735"];
    let swatches = colors.map((color, index) => {
      return (
        <span style={{backgroundColor: color}} 
              onClick={event => this.setColor(event, color)}
              key={index}
        >
        </span>
      )
    })
    let strokeColor = this.state.ctx ? this.state.ctx.strokeStyle : "#2eb1bd";
    return (
      <section className="drawing-canvas">
        <canvas id="canvas" style={{width: window.innerWidth, height: window.innerHeight}}>
          <a className="browser-button" href="https://www.google.com/intl/no/chrome/">Download Chrome</a>
        </canvas>
        <div className="side-bar">
          <span className="line-cap round" 
                style={{backgroundColor: strokeColor}}
                onClick={event => this.setLineCap(event,'round')}
          >
          </span>
          <span className="line-cap square"
                style={{backgroundColor: strokeColor}}
                onClick={event => this.setLineCap(event,'square')}
          ></span>
          <span className="line-cap butt"
                style={{backgroundColor: strokeColor}}
                onClick={event => this.setLineCap(event,'butt')}
          ></span>
        </div>
        <div className="bottom-bar">
        <button className="button" onClick={this.downloadCanvas}>
            <FontAwesomeIcon className={buttonText && 'button-icon'} icon={faDownload}/>
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
    e.preventDefault();
    e.stopPropagation();
    if(this.state.mouseDown){
      let ctx = this.state.ctx;
      ctx.lineWidth++;
      this.setState({ctx});
    }
    this.state.ctx.beginPath();
    if(e.clientX) {
      this.state.ctx.moveTo(e.clientX-0.5, e.clientY-0.5);
      this.state.ctx.lineTo(e.clientX, e.clientY);
    } else if(e.touches && e.touches[0].clientX){
      this.state.ctx.moveTo(e.touches[0].clientX-0.5, e.touches[0].clientY-0.5);
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
  setLineCap(event, shape) {
    event.stopPropagation();
    let ctx = this.state.ctx;
    ctx.lineCap = shape;
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
  resizeCanvas(){
    let prevCtx = {
      lineJoin: this.state.ctx.lineJoin,
      lineCap: this.state.ctx.lineCap,
      lineWidth: this.state.ctx.lineWidth,
      strokeStyle: this.state.ctx.strokeStyle,
      fillStyle: this.state.ctx.fillStyle
    }

    let canvas = document.getElementById("canvas");
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);

    let ctx = canvas.getContext('2d');
    canvas.width = 4 * window.innerWidth;
    canvas.height = 4 * window.innerHeight;
    ctx.lineJoin = prevCtx.lineJoin;
    ctx.lineCap = prevCtx.lineCap;
    ctx.lineWidth = prevCtx.lineWidth;
    ctx.strokeStyle = prevCtx.strokeStyle;
    ctx.fillStyle = prevCtx.fillStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0,0);
    ctx.scale(4,4);

    this.setState({ctx});
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
    
    canvas.addEventListener('touchstart', (e) => this.draw(e), {passive: false});
    canvas.addEventListener('touchmove', (e) => this.draw(e), {passive: false});
    
    canvas.addEventListener('mousemove', (e) => this.draw(e),{passive: false});
    canvas.addEventListener('mousedown', (e) => this.increaseBrushSize(e), {passive: false});
    canvas.addEventListener('mouseup', (e) => this.resetBrushSize(e), {passive: false});
    
    window.addEventListener('resize', this.resizeCanvas)
  }

  componentWillUnmount() {
    const canvas = document.getElementById('canvas');

    canvas.removeEventListener('touchstart', this.draw);
    canvas.removeEventListener('touchmove', this.draw);
    
		canvas.removeEventListener('mousemove', this.draw);
    canvas.removeEventListener('mousedown', this.increaseBrushSize);
    canvas.removeEventListener('mouseup', this.resetBrushSize);

    window.removeEventListener('resize', this.resizeCanvas)
	}
}

export default DrawingCanvas;