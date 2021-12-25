import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsBoxArrowRight, BsList, BsArrowLeftRight, BsHouse, BsPerson, BsPlus, BsX } from 'react-icons/bs';
import NavItem from '../NavItem';
import Portal from '../Portal';
import Search from '../Search';
import ThemeButton from '../ThemeButton';
import styles from './index.module.scss';

const Header: React.FC = () => {
  const router = useRouter();
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => {
    setNavIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (!navIsOpen) return;

    toggleNav();
  }, [router]);

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <Search />
        <div className={styles.helpers}>
          <div className={styles.menuButton}>
            <ThemeButton contained onClick={toggleNav}>
              <BsList />
            </ThemeButton>
          </div>
          <div className={styles.logoutButton}>
            <ThemeButton link to='/signout'>
              <BsBoxArrowRight />
              <span>Logout</span>
            </ThemeButton>
          </div>
        </div>
      </div>
      {navIsOpen && (
        <Portal>
          <nav className={styles.mobilNav}>
            <div className={styles.navContent}>
              <div className={styles.navHead}>
                <ThemeButton onClick={toggleNav} contained>
                  <BsX />
                </ThemeButton>
              </div>
              <ul className={styles.navList}>
                <NavItem link='/' title='Dashboard' icon={<BsHouse />} />
                <NavItem link='/transactions' title='Transactions' icon={<BsArrowLeftRight />} />
                <NavItem link='/profile' title='Profile' icon={<BsPerson />} />
                <NavItem link='/transactions/add' title='Add Transaction' iconIsLarge icon={<BsPlus />} />
                <NavItem link='/signout' title='Logout' iconIsLarge icon={<BsBoxArrowRight />} />
              </ul>
            </div>
          </nav>
        </Portal>
      )}
    </div>
  );
};

export default Header;
