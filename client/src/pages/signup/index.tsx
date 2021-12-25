import type { NextPage } from 'next';
import { validators } from '../../utils/validators';
import { useSignupMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Form from '../../components/Form';
import FormInput from '../../components/FormInput';
import AuthLayout from '../../layouts/AuthLayout';
import useForm from '../../hooks/useForm';
import ThemeButton from '../../components/ThemeButton';

const Signup: NextPage = () => {
  const router = useRouter();
  const [signupMutation] = useSignupMutation();

  const { formInputs, formIsValid, formError, handleForm, handleSubmit } = useForm(
    {
      username: {
        id: 'username',
        value: '',
        isTouched: false,
        isValid: false,
      },
      password: {
        id: 'password',
        value: '',
        isTouched: false,
        isValid: false,
      },
    },
    async ({ formData, reset, setError }) => {
      try {
        const { data } = await signupMutation({
          variables: { input: { username: formData.username, password: formData.password } },
        });

        if (data && data.signup.user) {
          router.push('/');
          reset();
        }
      } catch ({ message }) {
        setError(message as string);
      }
    }
  );

  return (
    <AuthLayout title='Sign up'>
      <div className={styles.formContainer}>
        <Form handleSubmit={handleSubmit}>
          <FormInput
            {...formInputs.username}
            validations={[
              validators.notEmpty(),
              validators.minLength(5),
              validators.maxLength(20),
              validators.isPattern(/^[a-zA-Z0-9_.-]+$/),
            ]}
            handleForm={handleForm}
            label='Username'
            type='text'
            placeholder='Username'
          />
          <FormInput
            {...formInputs.password}
            validations={[validators.notEmpty(), validators.minLength(5), validators.maxLength(50)]}
            handleForm={handleForm}
            label='Password'
            type='password'
            placeholder='Password'
          />
          {formError && <span className={styles.info}>{formError}</span>}
          <div className={styles.submitButton}>
            <ThemeButton type='submit' disabled={!formIsValid} primary full>
              Sign up
            </ThemeButton>
          </div>
          <ThemeButton link to='/signin' contained full>
            Sign in
          </ThemeButton>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
