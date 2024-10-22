import { BiDoorOpen } from 'react-icons/bi';
import { navSections } from '../utils/constant';
import { auth } from './../firebase/config';
import { signOut } from 'firebase/auth';

const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      {/* links */}
      <div>
        <img className="w-8 mb-4" src="x-logo.png" alt="x-logo" />

        {navSections.map(i => (
          <div
            key={i.title}
            className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b7]"
          >
            {i.icon}
            <span className="max-md:hidden whitespace-nowrap">{i.title}</span>
          </div>
        ))}
      </div>

      {/* user info */}
      <div>
        {!user ? (
          <div className="w-14 h-14 bg-gray-300 rounded-full animate-bounce">
            Loading...
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="{user.photoURL}"
                alt="user"
              />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>

            <button
              onClick={() => {
                signOut(auth);
              }}
              className="flex justify-center gap-2 items-center bg-gray-700 rounded text-2xl md:text-[15px]"
            >
              <BiDoorOpen />
              <span className="max-md:hidden">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
