import { BiMessageRounded } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import { SlOptions } from 'react-icons/sl';
import moment from 'moment/moment';
import { auth, db } from '../../firebase/config';
import Dropdown from './DropDown';
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { useState } from 'react';
import EditMode from './EditMode';

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // date calculator
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // check the user did liked tweet
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // delete tweet
  const handleDelete = async () => {
    if (confirm('Are you sure about deleting?')) {
      // get reference of the doc which is going to delete
      const tweetRef = doc(db, 'tweets', tweet.id);
      // remove doc
      await deleteDoc(tweetRef);
    }
  };

  // like tweet
  const handleLike = async () => {
    // get reference of doc which is going to update
    const ref = doc(db, 'tweets', tweet.id);
    // add active user's id to likes string
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user?.photo || 'default-photo-url'}
        alt="user"
      />

      <div className="w-full">
        {/* Up side - user info */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user?.name || 'Unknown User'}</p>
            <p className="text-gray-400">
              @
              {tweet.user?.name
                ? tweet.user.name.toLowerCase().replace(' ', '_')
                : 'unknown_user'}
            </p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* Mid side - tweet */}
        <div className="my-3">
          {isEditMode && (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          )}

          {!isEditMode && tweet.textContent && (
            <p className="my-2">{tweet.textContent}</p>
          )}

          {!isEditMode && tweet.imageContent && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>

        {/* Down side - interaction */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436]">
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className="place-items-center flex items-center gap-3 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e857d969]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
