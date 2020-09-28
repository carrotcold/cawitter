import React, { useState } from 'react';
import { firebaseInstance, auth } from 'myFirebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState(null);

  const onChange = ev => {
    const { name, value } = ev.target;
    console.log(name, value);

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async ev => {
    ev.preventDefault();
    try {
      let userData;
      if (newAccount) {
        // createUserWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >
        userData = await auth.createUserWithEmailAndPassword(email, password);
      } else {
        // signInWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >
        userData = await auth.signInWithEmailAndPassword(email, password);
      }
      console.log(userData);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);
  const onSocialClick = async ev => {
    const { name } = ev.target;
    let provider;

    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await auth.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Log In' : 'Create Account'}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
      {error}
    </div>
  );
};

export default Auth;
