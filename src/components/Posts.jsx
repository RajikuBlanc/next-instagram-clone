import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Post from './Post';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      // Firebaseから投稿順に並べ替えたPostを読み込み、setPostsに格納
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
        setPosts(snapshot.docs);
      }),
    // dbが更新されるたびに実行する
    [db]
  );

  return (
    <div>
      {/* Post */}
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}
