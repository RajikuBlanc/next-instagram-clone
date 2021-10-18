import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import SignIn from '../../components/SignIn';

export default function signIn({ providers }) {
  return <SignIn providers={providers} />;
}

export const getServerSideProps = async ctx => {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
};
