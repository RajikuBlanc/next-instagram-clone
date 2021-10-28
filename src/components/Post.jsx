import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { collection, onSnapshot, query, orderBy } from '@firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';

export default function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'asc')), snapshot =>
        setComments(snapshot.docs)
      ),
    [db]
  );

  const sendComment = async e => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm max-w-full">
      {/* header */}
      <div className="flex items-center justify-between p-5">
        <img className="h-12 w-12 rounded-full object-cover border p-1 mr-3 cursor-pointer" src={userImg} alt="" />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img className="w-full object-cover" src={img} alt="" />

      {/* button */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-2">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* caption */}
      <p className="p-5 truncate">
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin scrollbar-track-white">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img src={comment.data().userImage} alt="UserImage" className="h-7 rounded-full" />
              <p className="text-sm flex-1">
                <span className="font-bold mr-1">{comment.data().username}</span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      <form className="flex items-center p-4 ">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button type="submit" disabled={!comment.trim()} onClick={sendComment} className="font-semibold text-blue-400">
          Post
        </button>
      </form>
    </div>
  );
}
