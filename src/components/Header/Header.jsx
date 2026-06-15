import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useThemeColor } from '../../context';

export default function Header() {
  const { color } = useThemeColor();

  return (
    <header className={styles.header}>
      <Link to='/' className={[styles.title, styles[color]].join(' ')}>
        jennur
      </Link>
      <nav>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            [styles.link, isActive ? styles.active : '', styles[color]].join(
              ' '
            )
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
