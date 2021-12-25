import { Fragment } from 'react';
import Portal from '../Portal';
import styles from './index.module.scss';

const Modal: React.FC<{ isOpen: boolean; title: string; onClose: () => void }> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  const closeHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget != e.target) return;
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Fragment>
      <Portal>
        <div className={styles.modal} onClick={(e) => closeHandler(e)}>
          <div className={styles.content}>
            <div className={styles.heading}>
              <h2>{title}</h2>
            </div>
            <section>{children}</section>
          </div>
        </div>
      </Portal>
    </Fragment>
  );
};

export default Modal;
