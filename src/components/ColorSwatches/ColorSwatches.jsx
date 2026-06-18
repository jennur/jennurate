import styles from './ColorSwatches.module.scss';
import { useDrawing } from '../../context';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function ColorSwatches({ className = "" }) {
  const { colors, updateColor, strokeColor } = useDrawing();

  return (
    <div className={`${styles.colorSwatches} ${className}`}>
      {colors.map((color) => {
        return (
          <button
            className={styles.swatch}
            style={{ backgroundColor: color }}
            onClick={(event) => updateColor(event, color)}
            key={color}
          ></button>
        );
      })}
      <ColorPicker color={strokeColor} onChange={(event, newColor) => updateColor(event, newColor)} />
    </div>
  );
}
