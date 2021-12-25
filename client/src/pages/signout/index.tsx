import type { NextPage } from 'next';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useByeMutation } from '../../generated/graphql';

const SignOut: NextPage = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [byeMutation] = useByeMutation();

  useEffect(() => {
    byeMutation()
      .then(() => {
        client.resetStore();
      })
      .finally(() => {
        router.push('/signin');
      });
  }, []);

  return <div>Bye</div>;
};

export default SignOut;
