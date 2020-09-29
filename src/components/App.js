import React, { useEffect, useState } from 'react';

import AppRouter from 'components/Router';
import { auth } from 'myFirebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserObj(user);
      }

      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        '불러오는중..'
      )}
      <footer>&copy; {new Date().getFullYear()} Cawitter</footer>
    </>
  );
}

export default App;
