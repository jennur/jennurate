import { createContext, useState, useRef, useEffect, useContext } from 'react';
import {
  deleteFromIndexedDB,
  getFromIndexedDB,
  saveToIndexedDB,
} from '../helpers/indexedDBStorage';

const INDEX_DB = 'jennur_db';
const INDEX_DB_STORE = 'canvas_store';
const INDEX_DB_KEY = 'canvas';
const CANVAS_SCALE = 4;
const CANVAS_BG_COLOR = '#0c0c0e';

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
  clearCanvas: () => {},
  undo: () => {},
  redo: () => {},
  canUndo: false,
  canRedo: false,
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
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const historyRef = useRef([]);
  const redoStackRef = useRef([]);

  const canvasRef = useRef(null);
  const canvasCtxRef = useRef(null);
  const strokeWidthRef = useRef(strokeWidth);
  const rotationRef = useRef(rotation);
  const rotationOffsets = useRef(offsets);
  const activeShapeRef = useRef(activeShape);
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
    e.preventDefault();
    e.stopPropagation();

    if (!isDrawingRef.current) return;

    if (e.clientX) {
      drawPoint(e.clientX, e.clientY);
    } else if (e.touches && e.touches[0].clientX) {
      drawPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvasCtxRef.current;
    ctx.fillStyle = CANVAS_BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [];
    redoStackRef.current = [];
    saveToHistory();
    updateUndoRedoState();

    deleteFromIndexedDB({
      dbName: INDEX_DB,
      storeName: INDEX_DB_STORE,
      key: INDEX_DB_KEY,
    });
  };

  const drawImage = (image) => {
    const canvas = canvasRef.current;
    const ctx = canvasCtxRef.current;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.globalAlpha = 1; // Reset opacity to ensure the image is drawn at full opacity
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width / CANVAS_SCALE,
        canvas.height / CANVAS_SCALE
      );
      ctx.globalAlpha = opacity;
    };
  };

  const updateUndoRedoState = () => {
    setCanUndo(() => historyRef.current.length > 1);
    setCanRedo(() => redoStackRef.current.length > 0);
  };

  const undo = () => {
    if (historyRef.current.length === 0) return;

    const newHistory = [...historyRef.current];
    const currentBlob = newHistory.pop();
    const prevBlob = newHistory[newHistory.length - 1];

    historyRef.current = newHistory;
    redoStackRef.current = [...redoStackRef.current, currentBlob];

    const prevURL = URL.createObjectURL(prevBlob);
    drawImage(prevURL);
    updateUndoRedoState();
  };

  const redo = () => {
    if (redoStackRef.current.length === 0) return;
    const newRedoStack = [...redoStackRef.current];
    const lastUndoneBlob = newRedoStack.pop();
    redoStackRef.current = newRedoStack;
    historyRef.current = [...historyRef.current, lastUndoneBlob];
    const lastURL = URL.createObjectURL(lastUndoneBlob);
    drawImage(lastURL);
    updateUndoRedoState();
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (blob) {
        const lastThreeEntries = historyRef.current.slice(-3);
        historyRef.current = [...lastThreeEntries, blob];
        redoStackRef.current = [];
        updateUndoRedoState();
      } else {
        console.error(
          'Failed to save canvas to history: Blob conversion failed'
        );
      }
    });
  };

  const drawPoint = (x, y) => {
    const ctx = canvasCtxRef.current;
    const { offsetX, offsetY } = rotationOffsets.current;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeShapeRef.current === 'butt' && offsetX === 0 && offsetY === 0) {
      ctx.lineTo(x - 1, y); // Add offset for 'butt' shape to make it visible
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

    saveToHistory();

    try {
      saveCanvas();
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
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

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref element not found');
      return null;
    }
    const canvasURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = canvasURL;
    link.setAttribute('download', 'my_jennur_art.png');
    link.click();
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref element not found');
      return;
    }
    canvas.toBlob((blob) => {
      if (blob) {
        saveToIndexedDB({
          dbName: INDEX_DB,
          storeName: INDEX_DB_STORE,
          data: blob,
          key: INDEX_DB_KEY,
        });
      } else {
        console.error('Failed to convert canvas to blob');
      }
    });
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

  const initializeCanvas = () => {
    const canvas = document.getElementById('my-jennur-art');

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    canvasRef.current = canvas;
    canvas.width = CANVAS_SCALE * window.innerWidth;
    canvas.height = CANVAS_SCALE * window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.scale(CANVAS_SCALE, CANVAS_SCALE);
    ctx.lineJoin = 'round';
    ctx.lineCap = DEFAULT_SHAPE;
    ctx.lineWidth = DEFAULT_STROKE_WIDTH;
    ctx.strokeStyle = DEFAULT_STROKE_COLOR;
    ctx.fillStyle = CANVAS_BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtxRef.current = ctx;
  };

  const restoreContextState = async () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error('Canvas ref element not found');
      return;
    }
    const blob = await getFromIndexedDB({
      dbName: INDEX_DB,
      storeName: INDEX_DB_STORE,
      key: INDEX_DB_KEY,
    });

    let canvasURL = null;

    if (!blob) {
      const image = await import('/create-canvas.png');
      canvasURL = image.default;
    } else {
      canvasURL = URL.createObjectURL(blob);
    }

    if (canvasURL) {
      try {
        drawImage(canvasURL);
      } catch (error) {
        console.error('Error restoring canvas:', error);
      }
    }
  };

  useEffect(() => {
    const canvas = document.getElementById('my-jennur-art');
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    initializeCanvas();
    restoreContextState();

    canvas.addEventListener('pointermove', (event) => showShapePreview(event));

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

    return () => {
      canvas.removeEventListener('pointermove', showShapePreview);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchmove', drawLine);

      canvas.removeEventListener('mousemove', drawLine);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, []);

  return (
    <DrawingContext.Provider
      value={{
        clearCanvas,
        undo,
        redo,
        canUndo,
        canRedo,
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
