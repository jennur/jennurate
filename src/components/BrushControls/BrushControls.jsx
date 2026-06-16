import LineCapButton from '../LineCapButton/LineCapButton';
import styles from './BrushControls.module.scss';
import { useDrawing } from '../../context';
import { PlusIcon, MinusIcon, RotateIcon } from '../../assets/icons';
import OpacitySelector from '../OpacitySelector/OpacitySelector';

export default function BrushControls() {
  const { increaseBrushSize, descreaseBrushSize, updateRotation } =
    useDrawing();

  return (
    <div className={styles.brushControls}>
      <div className={styles.lineCapControls}>
        <div className={[styles.buttonWrapper, styles.rotate].join(' ')}>
          <button className={styles.rotateButton} onClick={updateRotation}>
            <RotateIcon className={styles.buttonIcon} />
          </button>
          <div className={[styles.hoverText, styles.rotate].join(' ')}>
            Rotate brush
          </div>
        </div>
        <LineCapButton capType='round' />
        <LineCapButton capType='square' />
        <LineCapButton capType='butt' />
      </div>

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
          <button className={styles.resizeButton} onClick={descreaseBrushSize}>
            <MinusIcon className={styles.buttonIcon} />
          </button>
          <div className={[styles.hoverText, styles.decrease].join(' ')}>
            Decrease brush size
          </div>
        </div>
      </div>

      <div className={styles.opacityControls}>
        <OpacitySelector />
      </div>
    </div>
  );
}
