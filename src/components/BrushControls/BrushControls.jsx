import LineCapButton from '../LineCapButton/LineCapButton';
import styles from './BrushControls.module.scss';
import { useDrawing } from '../../context';
import { PlusIcon, MinusIcon } from '../../assets/icons';

export default function BrushControls() {
  const { increaseBrushSize, descreaseBrushSize } = useDrawing();

  return (
    <div className={styles.brushControls}>
      <div className={styles.lineCapControls}>
        <LineCapButton capType='round' />
        <LineCapButton capType='square' />
        <LineCapButton capType='butt' />
      </div>

      <div className={styles.brushSizeDisplay}>
        <div className={styles.brushSizeControls}>
          <div className={[styles.buttonWrapper, styles.increase].join(' ')}>
            <button className={styles.resizeButton} onClick={increaseBrushSize}>
              <PlusIcon className={styles.buttonIcon} />
            </button>
            <div className={[styles.hoverText, styles.increase].join(' ')}>
              Increase brush size
            </div>
          </div>
          <div className={[styles.buttonWrapper, styles.decrease].join(' ')}>
            <button
              className={styles.resizeButton}
              onClick={descreaseBrushSize}
            >
              <MinusIcon className={styles.buttonIcon} />
            </button>
            <div className={[styles.hoverText, styles.decrease].join(' ')}>
              Decrease brush size
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
