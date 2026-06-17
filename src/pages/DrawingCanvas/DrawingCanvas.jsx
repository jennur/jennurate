import styles from './DrawingCanvas.module.scss';
import { DownloadIcon, XIcon } from '../../assets/icons';
import { useDrawing } from '../../context';
import BrushControls from '../../components/BrushControls/BrushControls';
import ColorButton from '../../components/ColorButton/ColorButton';
import ColorSwatches from '../../components/ColorSwatches/ColorSwatches';

export function DrawingCanvas() {
  const {
    clearCanvas,
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
        }}
      ></div>

      <div className={styles.topBar}>
        <ColorButton
          text={window.innerWidth > 900 ? 'Download my masterpiece!' : ''}
          icon={<DownloadIcon />}
          onClick={downloadCanvas}
        />
        <ColorButton
          text={window.innerWidth > 900 ? 'Start over' : ''}
          icon={<XIcon />}
          onClick={clearCanvas}
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
