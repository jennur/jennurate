import { cloneElement } from 'react';
import styles from './ColorButton.module.scss';
import { useThemeColor } from '../../context';

export default function ColorButton({ text, icon, onClick, disabled }) {
  const { color: themeColor } = useThemeColor();

  const iconClone = icon
    ? cloneElement(icon, {
        className: [styles.icon, styles[themeColor]].join(' '),
      })
    : null;

  return (
    <button
      className={[
        styles.colorButton,
        styles[themeColor],
        disabled ? styles.disabled : '',
      ].join(' ')}
      onClick={(event) => {
        event.stopPropagation();
        onClick(event);
      }}
      disabled={disabled}
    >
      {iconClone}
      {text}
    </button>
  );
}
