import styles from './OpacitySelector.module.scss';
import { useDrawing } from '../../context';

export default function OpacitySelector() {
  const { updateOpacity, opacity, strokeColor } = useDrawing();

  return (
    <div
      className={styles.opacitySelector}
      style={{ '--opacity': opacity, '--color': strokeColor }}
    >
      <label className={styles.opacityLabel} htmlFor='opacity'>
        Opacity
      </label>
      <input
        className={styles.opacitySlider}
        type='range'
        id='opacity'
        name='opacity'
        min='0.1'
        max='1'
        step='0.1'
        defaultValue='1'
        onChange={(event) => updateOpacity(event, event.target.value)}
      />
    </div>
  );
}
