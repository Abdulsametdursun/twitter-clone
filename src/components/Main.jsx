import { useEffect, useState } from 'react';
import Form from './Form';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import Spinner from './Spinner';
import Post from '../components/Post/index';

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  // Get collection reference
  const tweetsCol = collection(db, 'tweets');

  // filtering
  const options = query(tweetsCol, orderBy('createdAt', 'desc'));

  useEffect(() => {
    // sub to tweet collection
    const unsub = onSnapshot(options, snapshot => {
      const tempTweets = [];

      // return all documents. Transfer objects consisting of data and IDs to temporary array
      snapshot.forEach(doc => tempTweets.push({ id: doc.id, ...doc.data() }));

      // transfer data from temporary array to state
      setTweets(tempTweets);
    });

    return () => unsub();
  }, []);

  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Main Page
      </header>

      <Form user={user} />
      {/* List of the twits */}
      {!tweets ? (
        <div className="flex justify-center my-10">
          <Spinner style={'w-8 h-8 text-blue-600'} />
        </div>
      ) : (
        tweets.map(tweet => <Post tweet={tweet} key={tweet.id} />)
      )}
    </main>
  );
};

export default Main;
