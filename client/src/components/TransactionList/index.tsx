import styles from './index.module.scss';
import { Transaction } from '../../generated/graphql';
import { toDate, toMoney } from '../../utils/formatters';
import cn from 'classnames';
import ThemeCard from '../ThemeCard';
import Link from 'next/link';

interface Props {
  title?: string;
  transactions: Transaction[];
  loading: boolean;
}

const TransactionList: React.FC<Props> = ({ title, transactions, loading }) => {
  if (loading && !transactions) {
    return <div className={styles.loading}></div>;
  }

  return (
    <ThemeCard title={title}>
      <div className={styles.transactionList}>
        <div className={styles.heading}>
          <div>Transaction</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Detail</div>
        </div>
        {transactions && transactions.length > 0 && (
          <ul className={styles.list}>
            {transactions.map((transaction) => (
              <li className={styles.listItem} key={transaction._id}>
                <div className={styles.listItemCol}>
                  <span className={styles.listItemHead}>Transaction</span>
                  <span className={styles.listItemVal}>{transaction.name}</span>
                </div>
                <div className={styles.listItemCol}>
                  <span className={styles.listItemHead}>Type</span>
                  <span className={styles.listItemVal}>{transaction.type}</span>
                </div>
                <div className={styles.listItemCol}>
                  <span className={styles.listItemHead}>Amount</span>
                  <span className={styles.listItemVal}>{toMoney(transaction.amount)}</span>
                </div>
                <div className={styles.listItemCol}>
                  <span className={styles.listItemHead}>Date</span>
                  <span className={styles.listItemVal}>{toDate(transaction.date)}</span>
                </div>
                <div className={styles.listItemCol}>
                  <span className={styles.listItemHead}>Detail</span>
                  <Link href={`/transactions/${transaction._id}`}>
                    <a className={cn(styles.listItemVal, styles.listItemLink)}>View More</a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ThemeCard>
  );
};

export default TransactionList;
