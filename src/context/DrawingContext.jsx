import { createContext, useState, useRef, useEffect, useContext } from 'react';

const DEFAULT_STROKE_WIDTH = 40;
const DEFAULT_COLORS = [
  '#0c0c0e',
  '#1e1e1e',
  '#d13333',
  '#db5d23',
  '#e9d735',
  '#2f6a49',
  '#15a2ae',
  '#a1258b',
  '#f2f2f2',
];
const DEFAULT_STROKE_COLOR = DEFAULT_COLORS[6];
const DEFAULT_SHAPE = 'round';
const DEFAULT_ROTATION = 0;
const DEFAULT_OPACITY = 1;
const DEFAULT_OFFSETS = { offsetX: 0, offsetY: 0 };
const MIN_STROKE_WIDTH = 5;

const DrawingContext = createContext({
  resizeCanvas: () => {},
  downloadCanvas: () => {},
  drawLine: () => {},
  drawPoint: () => {},
  canvasCtxRef: null,
  colors: [],
  updateColor: () => {},
  updateLineCap: () => {},
  updateRotation: () => {},
  updateOpacity: () => {},
  increaseBrushSize: () => {},
  descreaseBrushSize: () => {},
  strokeColor: DEFAULT_STROKE_COLOR,
  strokeWidth: DEFAULT_STROKE_WIDTH,
  activeShape: DEFAULT_SHAPE,
  rotation: DEFAULT_ROTATION,
  opacity: DEFAULT_OPACITY,
  offsets: DEFAULT_OFFSETS,
});

export const DrawingProvider = ({ children }) => {
  const colors = DEFAULT_COLORS;
  const [strokeColor, setStrokeColor] = useState(DEFAULT_STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(DEFAULT_STROKE_WIDTH);
  const [activeShape, setActiveShape] = useState(DEFAULT_SHAPE);
  const [rotation, setRotation] = useState(DEFAULT_ROTATION);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [offsets, setOffsets] = useState(DEFAULT_OFFSETS);

  const strokeWidthRef = useRef(strokeWidth);
  const rotationRef = useRef(rotation);
  const rotationOffsets = useRef(offsets);
  const activeShapeRef = useRef(activeShape);
  const canvasCtxRef = useRef(null);
  const isDrawingRef = useRef(false);

  const updateRotation = () => {
    const newRotation = rotation + 45;
    setRotation(newRotation);
    rotationRef.current = newRotation;

    const angleInRadians = (newRotation * Math.PI) / 180;
    const offsetX = Math.cos(angleInRadians);
    const offsetY = Math.sin(angleInRadians);

    setOffsets({ offsetX, offsetY });
    rotationOffsets.current = { offsetX, offsetY };
  };

  const updateStrokeWidth = (newWidth) => {
    setStrokeWidth(newWidth);
    strokeWidthRef.current = newWidth;
  };

  const updateActiveShape = (newShape) => {
    setActiveShape(newShape);
    activeShapeRef.current = newShape;
  };

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
    const { offsetX, offsetY } = rotationOffsets.current;
    console.log('Active shape in drawPoint:', activeShapeRef.current);
    console.log('DRAWING POINT', { x, y, offsetX, offsetY });

    ctx.beginPath();
    ctx.moveTo(x, y);
    if (activeShapeRef.current === 'butt' && offsetX === 0 && offsetY === 0) {
      ctx.lineTo(x - 1, y);
    } else {
      ctx.lineTo(x + offsetX, y + offsetY);
    }
    ctx.stroke();
  };

  const startDrawing = (e) => {
    drawPoint(e.clientX, e.clientY);
    isDrawingRef.current = true;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const updateOpacity = (event, opacity) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    ctx.globalAlpha = opacity;
    setOpacity(opacity);
  };

  const updateColor = (event, color) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    ctx.strokeStyle = color;
    setStrokeColor(color);
  };

  const updateLineCap = (event, shape) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    ctx.lineCap = shape;
    updateActiveShape(shape);
  };

  const increaseBrushSize = (event) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    ctx.lineWidth += 10;
    updateStrokeWidth(ctx.lineWidth);
  };

  const descreaseBrushSize = (event) => {
    event.stopPropagation();
    const ctx = canvasCtxRef.current;
    if (ctx.lineWidth <= MIN_STROKE_WIDTH) return;
    ctx.lineWidth -= 10;
    updateStrokeWidth(ctx.lineWidth);
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
    const width =
      activeShapeRef.current === 'butt' ? 1 : strokeWidthRef.current;
    const height = strokeWidthRef.current;
    const posOffsetX = width / 2;
    const posOffsetY = height / 2;
    shapePreview.style.left = `${event.clientX - posOffsetX}px`;
    shapePreview.style.top = `${event.clientY - posOffsetY}px`;
    shapePreview.style.transform = `rotate(${rotationRef.current}deg)`;
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
    ctx.strokeStyle = strokeColor || DEFAULT_STROKE_COLOR;
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
        updateColor,
        updateLineCap,
        updateRotation,
        updateOpacity,
        increaseBrushSize,
        descreaseBrushSize,
        strokeColor,
        strokeWidth,
        activeShape,
        rotation,
        opacity,
        offsets,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawing = () => useContext(DrawingContext);
