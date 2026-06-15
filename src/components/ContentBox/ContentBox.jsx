import styles from './ContentBox.module.scss';

export default function ContentBox({ children, className }) {
  return (
    <div className={`${styles.contentBox} ${className || ''}`}>{children}</div>
  );
}
