import styles from './index.module.scss';
import { BsArrowLeftRight, BsHouse, BsPerson, BsPlus } from 'react-icons/bs';
import NavItem from '../NavItem';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.round}>
        <div className={styles.roundInner}></div>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <NavItem link='/' title='Dashboard' hasTooltip icon={<BsHouse />} />
          <NavItem link='/transactions' title='Transactions' hasTooltip icon={<BsArrowLeftRight />} />
          <NavItem link='/profile' title='Profile' hasTooltip icon={<BsPerson />} />
          <NavItem link='/transactions/add' title='Add Transaction' hasTooltip iconIsLarge icon={<BsPlus />} />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
