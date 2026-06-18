import styles from './DrawingCanvas.module.scss';
import {
  DownloadIcon,
  RotateLeftIcon,
  RotateRightIcon,
  XIcon,
} from '../../assets/icons';
import { useDrawing } from '../../context';
import BrushControls from '../../components/BrushControls/BrushControls';
import ColorButton from '../../components/ColorButton/ColorButton';
import ColorSwatches from '../../components/ColorSwatches/ColorSwatches';

export function DrawingCanvas() {
  const {
    clearCanvas,
    undo,
    redo,
    canUndo,
    canRedo,
    downloadCanvas,
    strokeColor,
    strokeWidth,
    activeShape,
    opacity,
  } = useDrawing();

  return (
    <section className={styles.drawingCanvas}>
      <div
        id='shape-preview'
        className={`${styles.shapePreview} ${styles[activeShape]}`}
        style={{
          width: activeShape === 'butt' ? '1px' : `${strokeWidth}px`,
          height: `${strokeWidth}px`,
          backgroundColor: strokeColor,
          opacity: opacity,
          display: window.innerWidth > 900 ? 'block' : 'none',
        }}
      ></div>

      <div className={styles.topBar}>
        <ColorButton
          text={window.innerWidth > 900 ? 'Undo' : ''}
          icon={<RotateLeftIcon />}
          onClick={undo}
          disabled={!canUndo}
        />
        <ColorButton
          text={window.innerWidth > 900 ? 'Redo' : ''}
          icon={<RotateRightIcon />}
          onClick={redo}
          disabled={!canRedo}
        />
        <ColorButton
          text={window.innerWidth > 900 ? 'Clear' : ''}
          icon={<XIcon />}
          onClick={clearCanvas}
          className={styles.clearButton}
        />
        <ColorButton
          text={window.innerWidth > 900 ? 'Download my masterpiece!' : ''}
          icon={<DownloadIcon />}
          onClick={downloadCanvas}
        />
      </div>

      <canvas
        id='my-jennur-art'
        style={{ width: window.innerWidth, height: window.innerHeight }}
      >
        Canvas doesn&apos;t seem to be supported in your browser. Please try
        downloading the latest version of{' '}
        <a
          className={styles.browserButton}
          href='https://vivaldi.com/no/download/'
        >
          Download Vivaldi
        </a>
      </canvas>

      <div className={styles.sideBar}>
        <BrushControls />
      </div>

      <div className={styles.bottomBar}>
        <ColorSwatches className={styles.colorSwatches} />
      </div>
    </section>
  );
}
