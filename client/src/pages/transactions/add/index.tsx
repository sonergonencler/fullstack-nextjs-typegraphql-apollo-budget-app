import type { NextPage } from 'next';
import styles from './index.module.scss';
import { validators } from '../../../utils/validators';
import { useCreateTransactionMutation } from '../../../generated/graphql';
import { getFormattedDate } from '../../../utils/formatters';
import Form from '../../../components/Form';
import FormInput from '../../../components/FormInput';
import FormSelect from '../../../components/FormSelect';
import PageHeader from '../../../components/PageHeader';
import ThemeCard from '../../../components/ThemeCard';
import AppLayout from '../../../layouts/AppLayout';
import useForm from '../../../hooks/useForm';
import ThemeButton from '../../../components/ThemeButton';

const CreateTransaction: NextPage = () => {
  const [createTransactionMutation] = useCreateTransactionMutation();

  const { formInputs, formIsValid, formError, handleForm, handleSubmit } = useForm(
    {
      name: {
        id: 'name',
        value: '',
        isTouched: false,
        isValid: false,
      },
      amount: {
        id: 'amount',
        value: '',
        isTouched: false,
        isValid: false,
      },
      type: {
        id: 'type',
        value: '',
        isTouched: false,
        isValid: false,
      },
    },
    async ({ formData, reset, setError }) => {
      try {
        await createTransactionMutation({
          variables: { input: { name: formData.name, amount: Number(formData.amount), type: formData.type } },
        });

        reset();
      } catch ({ message }) {
        setError(message as string);
      }
    }
  );

  const typeOptions = [
    { id: 'income', text: 'Income' },
    { id: 'expense', text: 'Expense' },
  ];

  return (
    <AppLayout title='Add Transaction'>
      <PageHeader title={getFormattedDate()} subTitle='Add Transaction' showButton={false} />
      <ThemeCard>
        <div className={styles.formContainer}>
          <Form handleSubmit={handleSubmit}>
            <FormInput
              {...formInputs.name}
              validations={[validators.notEmpty(), validators.minLength(3), validators.maxLength(20)]}
              handleForm={handleForm}
              label='Transaction name'
              type='text'
              placeholder='Car payment...'
            />
            <FormInput
              {...formInputs.amount}
              validations={[validators.min(0), validators.max(1e6)]}
              handleForm={handleForm}
              label='Transaction amount'
              type='number'
              placeholder='0'
            />
            <FormSelect
              {...formInputs.type}
              validations={[validators.notEmpty()]}
              handleForm={handleForm}
              label='Transaction type'
              placeholder='Select Type'
              options={typeOptions}
            />
            {formError && <span className={styles.info}>{formError}</span>}
            <ThemeButton type='submit' disabled={!formIsValid} primary full>
              Save
            </ThemeButton>
          </Form>
        </div>
      </ThemeCard>
    </AppLayout>
  );
};

export default CreateTransaction;
