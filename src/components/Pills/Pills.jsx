import styles from './Pills.module.scss';
import { useThemeColor } from '../../context';

export default function Pills({ title, titleLevel = 3, items }) {
  const { color } = useThemeColor();
  const TitleTag = `h${titleLevel}`;
  return (
    <div className={styles.container}>
      <TitleTag className={styles.title}>{title}</TitleTag>

      <ul className={styles.pillsWrap}>
        {items.map((item, index) => (
          <li key={index} className={[styles.pill, styles[color]].join(' ')}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
