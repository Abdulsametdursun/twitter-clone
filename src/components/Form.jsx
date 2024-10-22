import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BsCardImage } from 'react-icons/bs';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const tweetsCol = collection(db, 'tweets');

  // map the url to storage coming from media
  const uploadImage = async file => {
    // if file is not image stop function
    if (!file || !file.type.startsWith('image')) return null;
    // Get reference of place to uploading file
    const fileRef = ref(storage, file.name.concat(v4()));
    // Upload file
    await uploadBytes(fileRef, file);

    // Get url of file
    return await getDownloadURL(fileRef);
  };

  // sent tweet
  const handleSubmit = async e => {
    e.preventDefault();

    // Get data in form
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // verification
    if (!textContent && !imageContent) return toast.info('Please add contents');

    // value of loading is true
    setIsLoading(true);

    // Initialize url to null
    let url = null;

    // If image is selected, upload it and get the URL
    if (imageContent) {
      url = await uploadImage(imageContent);
    }

    // add new doc to tweets collection
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL || null,
      },
      likes: [],
      isEdited: false,
    });

    // value of loading is false
    setIsLoading(false);

    // reset inputs
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt="user"
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="What's happening?"
          type="text"
        />
        <div className="flex justify-between items-center">
          <input className="hidden" id="image" type="file" />
          <label
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
            htmlFor="image"
          >
            <BsCardImage />
          </label>

          <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
            {isLoading ? <Spinner /> : 'Post'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
