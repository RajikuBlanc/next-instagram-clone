import Stories from './Stories';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';
import { useSession, signIn as SignIntoProvider } from 'next-auth/react';
export default function Feed() {
  const { data: session } = useSession();
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      {/* Section */}
      <section className="md:col-span-2">
        {/* Stories */}
        <Stories />
        {/* Post */}
        <Posts />
      </section>

      {/* Section */}
      <section className="hidden xl:inline-grid md:col-span-1">
        {/* MiniProfile */}
        <div className="fixed">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
}
