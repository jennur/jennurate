import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.badgeList}>
        <li>
          <Link
            to='https://ko-fi.com/s/4662b19f61'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='/made-by-human.svg'
              alt='This website does not contain AI-generated content'
            />
          </Link>
        </li>
        <li>
          <Link
            to='https://www.dataguri.no'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/dataguri.svg' alt='Made by dataguri' />
          </Link>
        </li>
        <li>
          <Link
            to='https://pysj.party'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/pysj-party.png' alt='Join the pysj party' />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
