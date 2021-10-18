import { signIn, signOut, useSession } from 'next-auth/react';

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <div className="flex items-center justify-between mt-14 ml-10 ">
          <img className="w-16 h-16 rounded-full border p-[2px] object-cover " src={session?.user?.image} alt="" />
          <div className="flex-1 mx-4">
            <h2 className="font-bold">{session?.user?.name}</h2>
            <h3 className="text-sm text-gray-400">{session?.user?.username}</h3>
          </div>
          <button onClick={signOut} className="text-semibold text-blue-400 text-sm">
            Sign Out
          </button>
        </div>
      )}
      {!session && (
        <div className="flex items-center justify-end mt-14 ml-10 ">
          <button onClick={signIn} className="text-semibold text-blue-400 text-sm border w-full p-2 rounded-md">
            Sign In
          </button>
        </div>
      )}
    </>
  );
}
