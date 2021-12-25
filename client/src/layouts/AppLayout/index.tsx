import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import { useMeQuery } from '../../generated/graphql';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import styles from './index.module.scss';

interface Props {
  title?: string;
}

const AppLayout: React.FC<Props> = ({ title = 'Budget App', children }) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!data) {
      router.push('/signin');
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loading}></div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {!loading && data && (
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.body}>
            <Header />
            <main>{children}</main>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
