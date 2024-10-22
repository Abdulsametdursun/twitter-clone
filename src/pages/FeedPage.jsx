import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Main from '../components/Main';
import Aside from '../components/Aside';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const FeedPage = () => {
  const [user, setUser] = useState(null);
  // sub to the current user info
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser));
    return () => unsub();
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default FeedPage;
