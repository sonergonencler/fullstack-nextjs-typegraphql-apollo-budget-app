import styles from './index.module.scss';

interface Props {
  title?: string;
}

const ThemeCard: React.FC<Props> = ({ title, children }) => {
  return (
    <section className={styles.card}>
      {title && <div className={styles.cardTitle}>{title}</div>}
      <div>{children}</div>
    </section>
  );
};

export default ThemeCard;
