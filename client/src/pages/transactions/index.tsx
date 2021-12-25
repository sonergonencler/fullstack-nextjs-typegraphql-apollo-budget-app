import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useMonthlyTransactionsQuery } from '../../generated/graphql';
import { getFormattedDate } from '../../utils/formatters';
import AppLayout from '../../layouts/AppLayout';
import PageHeader from '../../components/PageHeader';
import TransactionList from '../../components/TransactionList';

const Transactions: NextPage = () => {
  const { data, loading, refetch } = useMonthlyTransactionsQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <AppLayout title='Transactions'>
      <PageHeader title={getFormattedDate()} subTitle='Transactions' />
      <TransactionList transactions={data?.monthlyTransactions ? data.monthlyTransactions : []} loading={loading} />
    </AppLayout>
  );
};

export default Transactions;
