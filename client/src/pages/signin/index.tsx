import type { NextPage } from 'next';
import { validators } from '../../utils/validators';
import { useRouter } from 'next/router';
import { useSigninMutation } from '../../generated/graphql';
import styles from './index.module.scss';
import Form from '../../components/Form';
import FormInput from '../../components/FormInput';
import AuthLayout from '../../layouts/AuthLayout';
import useForm from '../../hooks/useForm';
import ThemeButton from '../../components/ThemeButton';

const SignIn: NextPage = () => {
  const router = useRouter();
  const [signinMutation] = useSigninMutation();

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
        const { data } = await signinMutation({
          variables: { input: { username: formData.username, password: formData.password } },
        });

        if (data && data.signin.user) {
          router.push('/');
          reset();
        }
      } catch ({ message }) {
        setError(message as string);
      }
    }
  );

  return (
    <AuthLayout title='Sign in'>
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
              Sign in
            </ThemeButton>
          </div>
          <ThemeButton link to='/signup' contained full>
            Sign up
          </ThemeButton>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
