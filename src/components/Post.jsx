import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
export default function Post({ id, username, userImg, img, caption }) {
  return (
    <div className="bg-white my-7 border rounded-sm">
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

      {/* input box */}
      <form className="flex items-center p-4 ">
        <EmojiHappyIcon className="h-7" />
        <input type="text" placeholder="Add a comment..." className="border-none flex-1 focus:ring-0 outline-none" />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
}
