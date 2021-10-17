import Image from 'next/image';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
export default function Header() {
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/* left */}
        {/* logo1 */}
        <div className="hidden lg:inline-grid relative w-24 cursor-pointer">
          <Image src="/images/logo-1.svg" alt="Logo" layout="fill" objectFit={'contain'}></Image>
        </div>
        {/* logo2 */}
        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image src="/images/logo-2.svg" alt="Logo" layout="fill" objectFit={'contain'}></Image>
        </div>

        {/* middle */}
        {/* SerchBox */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Serch"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            />
          </div>
        </div>

        {/* right */}
        {/* Icon */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className="absolute -top-1 -right-2 w-5 h-5 text-xs bg-red-500 flex justify-center items-center rounded-full text-white animate-bounce">
              3
            </div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <img
            src="https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?b=1&k=20&m=1291208214&s=170667a&w=0&h=sAq9SonSuefj3d4WKy4KzJvUiLERXge9VgZO-oqKUOo="
            alt="profileImg"
            className="h-10 w-10 rounded-full object-cover cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
