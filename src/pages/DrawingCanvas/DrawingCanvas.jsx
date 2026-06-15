import styles from './DrawingCanvas.module.scss';
import { DownloadIcon, MinusIcon, PlusIcon } from '../../assets/icons';
import { useDrawing, useThemeColor } from '../../context';
import LineCapButton from '../../components/LineCapButton/LineCapButton';

export function DrawingCanvas() {
  const {
    colors,
    setColor,
    downloadCanvas,
    increaseBrushSize,
    descreaseBrushSize,
    strokeColor,
    strokeWidth,
    activeShape,
  } = useDrawing();

  const { color: themeColor } = useThemeColor();
  return (
    <section className={styles.drawingCanvas}>
      <div
        id='shape-preview'
        className={`${styles.shapePreview} ${styles[activeShape]}`}
        style={{
          width: activeShape === 'butt' ? '1px' : `${strokeWidth}px`,
          height: `${strokeWidth}px`,
          backgroundColor: strokeColor,
        }}
      ></div>

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
        <div className={styles.lineCapControls}>
          <LineCapButton capType='round' />
          <LineCapButton capType='square' />
          <LineCapButton capType='butt' />
        </div>

        <div className={styles.brushSizeDisplay}>
          <div className={styles.brushSizeControls}>
            <button
              className={styles.resizeButton}
              onClick={(event) => increaseBrushSize(event)}
            >
              <PlusIcon className={styles.buttonIcon} />
            </button>
            <button
              className={styles.resizeButton}
              onClick={(event) => descreaseBrushSize(event)}
            >
              <MinusIcon className={styles.buttonIcon} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button
          className={[styles.downloadButton, styles[themeColor]].join(' ')}
          onClick={downloadCanvas}
        >
          <DownloadIcon
            className={[styles.buttonIcon, styles[themeColor]].join(' ')}
          />
          {window.innerWidth > 900 ? 'Download my masterpiece!' : ''}
        </button>

        <div className={styles.colorPicker}>
          {colors.map((color) => {
            return (
              <button
                className={styles.colorSwatch}
                style={{ backgroundColor: color }}
                onClick={(event) => setColor(event, color)}
                key={color}
              ></button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
