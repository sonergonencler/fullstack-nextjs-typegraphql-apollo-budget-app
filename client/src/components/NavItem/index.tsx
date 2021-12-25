import Link from 'next/link';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { ReactElement } from 'react';

interface Props {
  link: string;
  icon: ReactElement;
  title: string;
  hasTooltip?: boolean;
  iconIsLarge?: boolean;
}

const NavItem: React.FC<Props> = ({ link, title, icon, hasTooltip = false, iconIsLarge = false }) => {
  const router = useRouter();

  return (
    <li className={styles.navItem}>
      <Link href={link}>
        <a
          className={cn(
            styles.link,
            !hasTooltip && styles.full,
            iconIsLarge && styles.largeIcon,
            router.pathname === link && styles.activeLink,
          )}
        >
          {icon}
          {hasTooltip ? <div className={styles.tooltip}>{title}</div> : <span className={styles.title}>{title}</span>}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
