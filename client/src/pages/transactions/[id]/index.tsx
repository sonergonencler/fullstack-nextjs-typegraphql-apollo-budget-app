import { Fragment, useEffect } from 'react';
import type { NextPage } from 'next';
import { BsCalendar, BsGraphDown, BsGraphUp, BsTrash2, BsWallet2 } from 'react-icons/bs';
import { useDeleteTransactionMutation, useTransactionQuery } from '../../../generated/graphql';
import { useRouter } from 'next/router';
import { getFormattedDate, toDate, toMoney } from '../../../utils/formatters';
import AppLayout from '../../../layouts/AppLayout';
import PageHeader from '../../../components/PageHeader';
import ThemeCard from '../../../components/ThemeCard';
import styles from './index.module.scss';
import ThemeButton from '../../../components/ThemeButton';

const TransactionDetail: NextPage<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { data, loading, refetch } = useTransactionQuery({ variables: { transactionId: id } });

  const [deleteTransactionMutation] = useDeleteTransactionMutation();

  const deleteTransaction = async () => {
    try {
      await deleteTransactionMutation({ variables: { transactionId: data?.transaction?._id! } });
      router.push('/transactions');
    } catch (err) {}
  };

  useEffect(() => {
    refetch();
  }, []);

  if (!loading && !data?.transaction) {
    return <div>No Transaction</div>;
  }

  if (loading && !data) {
    return (
      <AppLayout>
        <PageHeader title={getFormattedDate()} subTitle='Transaction Detail' />
        <div className={styles.loading}></div>
      </AppLayout>
    );
  }

  return (
    <Fragment>
      <AppLayout title={data?.transaction?.name}>
        <PageHeader title={getFormattedDate(data?.transaction?.date)} subTitle='Transaction Detail' />
        <ThemeCard title={data?.transaction?.name}>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>
              <span className={styles.detailIcon}>
                <BsCalendar />
              </span>
              Date
            </div>
            <span>{toDate(data?.transaction?.date)}</span>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>
              <span className={styles.detailIcon}>
                {data?.transaction?.type == 'income' ? <BsGraphUp /> : <BsGraphDown />}
              </span>
              Type
            </div>
            <span>{data?.transaction?.type}</span>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>
              <span className={styles.detailIcon}>
                <BsWallet2 />
              </span>
              Amount
            </div>
            <span>{toMoney(data?.transaction?.amount)}</span>
          </div>
          <div className={styles.deleteButton}>
            <ThemeButton onClick={deleteTransaction} contained>
              <BsTrash2 />
              <span>Delete</span>
            </ThemeButton>
          </div>
        </ThemeCard>
      </AppLayout>
    </Fragment>
  );
};

TransactionDetail.getInitialProps = ({ query: { id } }) => {
  return { id: id as string };
};

export default TransactionDetail;
