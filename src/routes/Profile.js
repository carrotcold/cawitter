import React from 'react';
import { auth } from 'myFirebase';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const history = useHistory();
  const onLogOutClick = () => {
    auth.signOut();
    history.push('/');
  };

  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}
