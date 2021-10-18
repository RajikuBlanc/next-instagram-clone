import Feed from '../components/Feed';
import { useSession } from 'next-auth/react';
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import SignIn from '../components/SignIn';

export default function Home({ providers }) {
  const { data: session } = useSession();
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      {/* Header */}
      {/* Feed */}
      {session && <Feed />}
      {!session && <SignIn providers={providers} />}
      {/* Modal */}
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
};
