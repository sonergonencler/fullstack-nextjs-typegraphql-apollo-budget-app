import { Fragment } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { initializeApollo } from '../../utils/apollo';
import { SearchDocument, Transaction } from '../../generated/graphql';
import Modal from '../Modal';
import styles from './index.module.scss';
import Link from 'next/link';

const Search: React.FC = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Partial<Transaction>[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setInput('');
  };

  const searchTransactions = async () => {
    if (!input || input.length > 20) {
      setResults([]);
      return;
    }

    const apollo = initializeApollo();
    const { data } = await apollo.query<{ search: Partial<Transaction>[] }>({
      query: SearchDocument,
      variables: { input: input.trim() },
      fetchPolicy: 'network-only',
    });
    setResults(data.search);
  };

  useEffect(() => {
    if (input.length < 3 && !modalIsOpen) return;

    if (input.length >= 3 && !modalIsOpen) setModalIsOpen(true);

    searchTransactions();
  }, [input]);

  return (
    <Fragment>
      <div className={styles.search}>
        <div className={styles.inputContainer}>
          <input
            type='text'
            placeholder='Search expenses, payments or income'
            className={styles.input}
            onChange={onChange}
            value={modalIsOpen ? '' : input}
          />
          <div className={styles.inputIcon}>
            <BsSearch />
          </div>
        </div>
      </div>
      <Modal title='Search' isOpen={modalIsOpen} onClose={closeModal}>
        <div className={styles.searchModal}>
          <div className={styles.inputContainer}>
            <input
              type='text'
              placeholder='Search expenses, payments or income'
              className={styles.input}
              onChange={onChange}
              value={input}
              autoFocus
            />
            <div className={styles.inputIcon}>
              <BsSearch />
            </div>
          </div>
          <ul className={styles.results}>
            {results.map((result) => (
              <li key={result._id}>
                <Link href={`/transactions/${result._id}`}>
                  <a className={styles.result}>
                    <span>{result.name}</span>
                    <span>{result.type}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Search;
