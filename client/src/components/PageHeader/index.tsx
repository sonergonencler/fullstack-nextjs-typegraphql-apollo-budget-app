import { BsPlus } from 'react-icons/bs';
import ThemeButton from '../ThemeButton';
import styles from './index.module.scss';

interface Props {
  title?: string;
  subTitle?: string;
  showButton?: boolean;
}

const PageHeader: React.FC<Props> = ({ title, subTitle, showButton = true }) => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.title}>
        <span>{subTitle}</span>
        <h1>{title}</h1>
      </div>
      {showButton && (
        <div className={styles.addButton}>
          <ThemeButton secondary link to='/transactions/add'>
            <BsPlus />
            <span>Add Transaction</span>
          </ThemeButton>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
