import { cloneElement } from 'react';
import styles from './IconLink.module.scss';
import { useThemeColor } from '../../context';

export default function IconLink({ href, IconComponent, label }) {
  const { color } = useThemeColor();
  const iconClone = cloneElement(IconComponent, {
    className: [styles.icon, styles[color]].join(' '),
  });
  return (
    <a
      className={styles.link}
      target='_blank'
      rel='noreferrer'
      href={href}
      title={href}
    >
      {iconClone}
      {label}
    </a>
  );
}
