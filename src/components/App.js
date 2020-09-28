import React, { useEffect, useState } from 'react';

import AppRouter from 'components/Router';
import { auth } from 'myFirebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : '불러오는중..'}
      <footer>&copy; {new Date().getFullYear()} Cawitter</footer>
    </>
  );
}

export default App;
