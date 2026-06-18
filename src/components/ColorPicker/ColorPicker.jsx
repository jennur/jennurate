import styles from './ColorPicker.module.scss';

export default function ColorPicker({ color, onChange }) {
  const handleChange = (event) => {
    onChange(event, event.target.value);
  };

  return (
    <div className={styles.colorPicker}>
      <label htmlFor='swatch' className={styles.label}>
        Custom:
      </label>
      <input
        type='color'
        name='swatch'
        value={color}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
}
