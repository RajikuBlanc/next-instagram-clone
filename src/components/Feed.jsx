import Stories from './Stories';
import Posts from './Posts';
export default function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:mx-w-6xl mx-auto">
      {/* Section */}
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Post */}
        <Posts />
      </section>

      {/* Section */}
      <section>
        {/* MiniProfile */}
        {/* Suggestions */}
      </section>
    </main>
  );
}
