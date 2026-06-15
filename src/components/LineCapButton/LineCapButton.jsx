import { useDrawing } from '../../context';
import styles from './LineCapButton.module.scss';

export default function LineCapButton({ capType }) {
  const { setLineCap, strokeColor } = useDrawing();
  return (
    <button
      className={styles.lineCap}
      onClick={(event) => setLineCap(event, capType)}
    >
      <span
        className={`${styles.lineCapIndicator} ${styles[capType]}`}
        style={{
          backgroundColor: strokeColor,
        }}
      ></span>
    </button>
  );
}
