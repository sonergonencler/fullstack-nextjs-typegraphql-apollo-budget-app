import type { NextPage } from 'next';
import { useMeQuery } from '../../generated/graphql';
import AppLayout from '../../layouts/AppLayout';
import PageHeader from '../../components/PageHeader';
import ThemeCard from '../../components/ThemeCard';
import styles from './index.module.scss';

const ProfileDetail: NextPage = () => {
  const { data, loading } = useMeQuery();

  if (loading && !data) {
    return (
      <AppLayout>
        <div className={styles.headerLoading}></div>
        <div className={styles.loading}></div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={data?.me?.username}>
      <PageHeader title={data?.me?.username} subTitle='Profile Detail' />
      <ThemeCard>
        <div className={styles.detail}>
          <div className={styles.detailTitle}>UserId</div>
          <span>{data?.me?._id}</span>
        </div>
        <div className={styles.detail}>
          <div className={styles.detailTitle}>Username</div>
          <span>{data?.me?.username}</span>
        </div>
      </ThemeCard>
    </AppLayout>
  );
};

export default ProfileDetail;
