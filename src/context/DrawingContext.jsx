import { createContext, useState, useRef, useEffect, useContext } from 'react';

const DEFAULT_STROKE_WIDTH = 40;
const DEFAULT_COLORS = [
  '#1e1e1e',
  '#d13333',
  '#db5d23',
  '#e9d735',
  '#1e7c3b',
  '#2eb1bd',
  '#a1258b',
  '#f2f2f2',
];
const DEFAULT_STROKE_COLOR = DEFAULT_COLORS[6];
const DEFAULT_SHAPE = 'round';
const MIN_STROKE_WIDTH = 5;

const DrawingContext = createContext({
  resizeCanvas: () => {},
  downloadCanvas: () => {},
  drawLine: () => {},
  drawPoint: () => {},
  canvasCtxRef: null,
  colors: [],
  setColor: () => {},
  setLineCap: () => {},
  increaseBrushSize: () => {},
  descreaseBrushSize: () => {},
  strokeColor: DEFAULT_STROKE_COLOR,
  strokeWidth: DEFAULT_STROKE_WIDTH,
  activeShape: DEFAULT_SHAPE,
});

export const DrawingProvider = ({ children }) => {
  const colors = DEFAULT_COLORS;
  const [strokeColor, setStrokeColor] = useState(DEFAULT_STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(DEFAULT_STROKE_WIDTH);
  const [activeShape, setActiveShape] = useState(DEFAULT_SHAPE);
  const activeShapeRef = useRef(activeShape);

  const canvasCtxRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    console.log('CANVAS CONTEXT', canvasCtxRef.current);
  }, [canvasCtxRef]);

  useEffect(() => {
    console.log('STROKE WIDTH', strokeWidth);
  }, [strokeWidth]);

  useEffect(() => {
    console.log('ACTIVE SHAPE', activeShape);
  }, [activeShape]);

  const drawLine = (e) => {
    console.log('DRAWING', isDrawingRef.current);
    e.preventDefault();
    e.stopPropagation();

    if (!isDrawingRef.current) return;

    if (e.clientX) {
      drawPoint(e.clientX, e.clientY);
    } else if (e.touches && e.touches[0].clientX) {
      drawPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const drawPoint = (x, y) => {
    const ctx = canvasCtxRef.current;
    const moveOffsetX = activeShapeRef.current === 'butt' ? 0.05 : 0;
    const moveOffsetY = activeShapeRef.current === 'butt' ? 0.05 : 0;
    console.log('Active shape in drawPoint:', activeShapeRef.current);
    console.log('DRAWING POINT', { x, y, moveOffsetX, moveOffsetY });
    ctx.beginPath();
    ctx.moveTo(x + moveOffsetX, y + moveOffsetY);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const startDrawing = (e) => {
    console.log('STARTING TO DRAW');
    drawPoint(e.clientX, e.clientY);
    isDrawingRef.current = true;
  };

  const stopDrawing = () => {
    console.log('STOPPING DRAWING');
    isDrawingRef.current = false;
  };

  const setColor = (event, color) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    ctx.strokeStyle = color;
    setStrokeColor(color);
  };

  const setLineCap = (event, shape) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    ctx.lineCap = shape;
    activeShapeRef.current = shape;
    setActiveShape(shape);
  };

  const increaseBrushSize = (event) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    ctx.lineWidth += 10;
    console.log('INCREASING BRUSH SIZE', ctx.lineWidth);
    setStrokeWidth(ctx.lineWidth);
  };

  const descreaseBrushSize = (event) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    if (ctx.lineWidth <= MIN_STROKE_WIDTH) return;
    ctx.lineWidth -= 10;
    console.log('DECREASING BRUSH SIZE', ctx.lineWidth);
    setStrokeWidth(ctx.lineWidth);
  };

  // const resizeCanvas = () => {
  //   const prevCtx = canvasCtxRef.current;

  //   const canvas = document.getElementById('my-jennur-art');
  //   const tempCanvas = document.createElement('canvas');
  //   const tempCtx = tempCanvas.getContext('2d');
  //   tempCanvas.width = canvas.width;
  //   tempCanvas.height = canvas.height;
  //   tempCtx.drawImage(canvas, 0, 0);

  //   const newCtx = canvas.getContext('2d');
  //   canvas.width = 4 * window.innerWidth;
  //   canvas.height = 4 * window.innerHeight;

  //   newCtx.lineJoin = prevCtx.lineJoin;
  //   newCtx.lineCap = prevCtx.lineCap;
  //   newCtx.lineWidth = prevCtx.lineWidth;
  //   newCtx.strokeStyle = prevCtx.strokeStyle;
  //   newCtx.fillStyle = prevCtx.fillStyle;
  //   newCtx.fillRect(0, 0, canvas.width, canvas.height);
  //   newCtx.drawImage(tempCanvas, 0, 0);
  //   newCtx.scale(4, 4);

  //   canvasCtxRef.current = newCtx;
  // };

  const downloadCanvas = () => {
    const canvas = document.getElementById('my-jennur-art');
    const img = canvas.toDataURL('image/png');
    const url = img;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'my_jennur_art.png');
    link.click();
  };

  const showShapePreview = (event) => {
    const shapePreview = document.getElementById('shape-preview');
    const previewRect = shapePreview.getBoundingClientRect();
    const offsetX =
      activeShapeRef.current === 'butt' ? 0 : previewRect.width / 2;
    const offsetY =
      activeShapeRef.current === 'butt' ? 0 : previewRect.height / 2;
    shapePreview.style.display = 'block';
    shapePreview.style.left = `${event.clientX - offsetX}px`;
    shapePreview.style.top = `${event.clientY - offsetY}px`;
  };

  useEffect(() => {
    const canvas = document.getElementById('my-jennur-art');
    const ctx = canvas.getContext('2d');
    canvas.width = 4 * window.innerWidth;
    canvas.height = 4 * window.innerHeight;
    ctx.scale(4, 4);
    ctx.lineJoin = 'round';
    ctx.lineCap = activeShapeRef.current || DEFAULT_SHAPE;
    ctx.lineWidth = strokeWidth || DEFAULT_STROKE_WIDTH;
    ctx.strokeStyle = DEFAULT_STROKE_COLOR;
    ctx.fillStyle = '#0c0c0e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtxRef.current = ctx;

    document.body.addEventListener('pointermove', (event) =>
      showShapePreview(event)
    );

    canvas.addEventListener('touchstart', startDrawing, {
      passive: false,
    });
    canvas.addEventListener('touchmove', (e) => drawLine(e), {
      passive: false,
    });

    canvas.addEventListener('mousemove', (e) => drawLine(e), {
      passive: false,
    });
    canvas.addEventListener('mousedown', startDrawing, {
      passive: false,
    });
    canvas.addEventListener('mouseup', stopDrawing, {
      passive: false,
    });

    // window.addEventListener('resize', resizeCanvas);

    return () => {
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchmove', drawLine);

      canvas.removeEventListener('mousemove', drawLine);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);

      // window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <DrawingContext.Provider
      value={{
        // resizeCanvas,
        downloadCanvas,
        drawLine,
        drawPoint,
        canvasCtxRef,
        colors,
        setColor,
        setLineCap,
        increaseBrushSize,
        descreaseBrushSize,
        strokeColor,
        strokeWidth,
        activeShape,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawing = () => useContext(DrawingContext);
