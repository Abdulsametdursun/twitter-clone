import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase/config';

const ProtectedRoute = () => {
  // Is user have a authorization
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    // watch user login and logout
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return () => unsub();
  }, []);

  // if user not login, sent user login page
  if (isAuth === false) {
    return <Navigate to={'/'} replace={true} />;
  }

  // if user login, sent user main page
  return <Outlet />;
};

export default ProtectedRoute;
