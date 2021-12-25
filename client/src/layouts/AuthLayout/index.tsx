import styles from './index.module.scss';
import Head from 'next/head';
import { useMeQuery } from '../../generated/graphql';

const AuthLayout: React.FC<{ title: string }> = ({ title, children }) => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loading}></div>
      </div>
    );
  }

  if (!loading && data && data.me) {
    return <div>You are authenticated as {data.me.username}</div>;
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className={styles.authContainer}>
        <div className={styles.authBody}>
          <div className={styles.heading}>
            <div className={styles.title}>
              <div className={styles.round}></div>
              Budget App
            </div>
            {title}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
