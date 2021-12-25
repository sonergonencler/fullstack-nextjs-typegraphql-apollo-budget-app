import Link from 'next/link';
import cn from 'classnames';
import styles from './index.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link?: boolean;
  to?: string;
  primary?: boolean;
  secondary?: boolean;
  rounded?: boolean;
  contained?: boolean;
  full?: boolean;
}

const ThemeButton: React.FC<Props> = ({
  link,
  to,
  type,
  primary,
  contained,
  secondary,
  children,
  rounded,
  disabled,
  full,
  onClick,
}) => {
  if (link && to) {
    return (
      <Link href={to}>
        <a
          className={cn(
            styles.base,
            primary && styles.primary,
            contained && styles.contained,
            rounded && styles.rounded,
            secondary && styles.secondary,
            full && styles.full
          )}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={cn(
        styles.base,
        primary && styles.primary,
        contained && styles.contained,
        rounded && styles.rounded,
        secondary && styles.secondary,
        disabled && styles.disabled,
        full && styles.full
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ThemeButton;
