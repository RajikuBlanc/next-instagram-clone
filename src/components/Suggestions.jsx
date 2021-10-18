import { useEffect, useState } from 'react';
import faker from 'faker';

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions For You</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map(profile => (
        <div key={profile.id} className="flex items-center justify-between mt-3">
          <img
            className="rounded-full w-10 h-10 p-[2px] border cursor-pointer"
            src={profile.avatar}
            alt={profile.username}
          />
          <div className="flex-1 mx-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400 truncate">Works at {profile.company.name}</h3>
          </div>
          <button className="text-sm text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
}
