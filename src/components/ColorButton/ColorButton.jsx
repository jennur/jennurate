import { cloneElement } from 'react';
import styles from './ColorButton.module.scss';
import { useThemeColor } from '../../context';

export default function ColorButton({ text, icon, onClick }) {
  const { color: themeColor } = useThemeColor();

  const iconClone = icon
    ? cloneElement(icon, {
        className: [styles.icon, styles[themeColor]].join(' '),
      })
    : null;

  return (
    <button
      className={[styles.colorButton, styles[themeColor]].join(' ')}
      onClick={onClick}
    >
      {iconClone}
      {text}
    </button>
  );
}
