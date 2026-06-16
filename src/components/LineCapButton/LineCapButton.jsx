import { useDrawing } from '../../context';
import styles from './LineCapButton.module.scss';

export default function LineCapButton({ capType }) {
  const { updateLineCap, strokeColor, rotation } = useDrawing();
  return (
    <button
      className={styles.lineCap}
      onClick={(event) => updateLineCap(event, capType)}
    >
      <span
        className={`${styles.lineCapIndicator} ${styles[capType]}`}
        style={{
          backgroundColor: strokeColor,
          transform: `rotate(${rotation}deg)`,
        }}
      ></span>
    </button>
  );
}
