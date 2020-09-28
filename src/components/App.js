import React, { useState } from 'react';

import AppRouter from 'components/Router';
import { auth } from 'myFirebase';

function App() {
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0
  // auth.currentUser: User | null
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Cawitter</footer>
    </>
  );
}

export default App;
