import styles from './ColorSwatches.module.scss';
import { useDrawing } from '../../context';

export default function ColorSwatches({ className }) {
  const { colors, setColor } = useDrawing();

  return (
    <div className={`${styles.colorSwatches} ${className}`}>
      {colors.map((color) => {
        return (
          <button
            className={styles.swatch}
            style={{ backgroundColor: color }}
            onClick={(event) => setColor(event, color)}
            key={color}
          ></button>
        );
      })}
    </div>
  );
}
