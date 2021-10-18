import faker from 'faker';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Story from './Story';

export default function Stories() {
  const [suggestions, setsuggestions] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i
    }));
    setsuggestions(suggestions);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-20 boder rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
      {session && <Story avatar={session.user.image} username={session.user.username} />}
      {suggestions.map(profile => (
        <Story key={profile.id} avatar={profile.avatar} username={profile.username} />
      ))}
    </div>
  );
}
