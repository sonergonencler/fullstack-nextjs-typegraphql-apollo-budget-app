import { useEffect } from 'react';
import { BsGraphDown, BsGraphUp, BsWallet2 } from 'react-icons/bs';
import { useMonthlySummaryQuery } from '../../generated/graphql';
import { toMoney } from '../../utils/formatters';
import styles from './index.module.scss';

const MonthlySummary: React.FC = () => {
  const { data, loading, refetch } = useMonthlySummaryQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  if (loading && !data) {
    return (
      <section className={styles.monthlySummary}>
        <div className={styles.cardLoading}></div>
        <div className={styles.cardLoading}></div>
        <div className={styles.cardLoading}></div>
      </section>
    );
  }

  return (
    <section className={styles.monthlySummary}>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>Current Balance</h4>
        <div className={styles.cardBody}>
          <span className={styles.cardVal}>{toMoney(data?.monthlySummary.currentBalance)}</span>
          <div className={styles.cardIcon}>
            <BsWallet2 />
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>Monthly Income</h4>
        <div className={styles.cardBody}>
          <span className={styles.cardVal}>{toMoney(data?.monthlySummary.totalIncome)}</span>
          <div className={styles.cardIcon}>
            <BsGraphUp />
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>Monthly Expense</h4>
        <div className={styles.cardBody}>
          <span className={styles.cardVal}>{toMoney(data?.monthlySummary.totalExpenses)}</span>
          <div className={styles.cardIcon}>
            <BsGraphDown />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlySummary;
