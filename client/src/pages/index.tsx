import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useMonthlyTransactionsQuery } from '../generated/graphql';
import AppLayout from '../layouts/AppLayout';
import MonthlySummary from '../components/MonthlySummary';
import PageHeader from '../components/PageHeader';
import TransactionList from '../components/TransactionList';

const Dashboard: NextPage = () => {
  const { data, loading, refetch } = useMonthlyTransactionsQuery({ variables: { limit: 5 }, errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <AppLayout title='Dashboard'>
      <PageHeader title='Welcome Back!' subTitle='Dashboard' />
      <MonthlySummary />
      <TransactionList
        title='Recent Transactions'
        transactions={data?.monthlyTransactions ? data.monthlyTransactions : []}
        loading={loading}
      />
    </AppLayout>
  );
};

export default Dashboard;
