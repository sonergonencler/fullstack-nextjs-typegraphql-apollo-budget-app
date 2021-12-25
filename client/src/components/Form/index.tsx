import styles from './index.module.scss';

interface Props {
  handleSubmit: () => void;
}

const Form: React.FC<Props> = ({ children, handleSubmit }) => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.content}>
        {children}
      </div>
    </form>
  );
};

export default Form;
