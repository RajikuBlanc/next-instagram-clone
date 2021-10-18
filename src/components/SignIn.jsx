import { signIn as SignIntoProvider } from 'next-auth/react';

export default function SignIn({ providers }) {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 justify-center -mt-56 px-14 text-center">
      <img src="/images/logo-1.svg" alt="logo" className="w-60" />
      <div className="mt-10 flex flex-col space-y-2">
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button
              className="p-3 rounded-lg bg-blue-400 text-white"
              onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}
            >
              Sign in with {provider.name}{' '}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
