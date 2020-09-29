import React, { useEffect, useState } from 'react';
import { db } from 'myFirebase';

export default function Home({ userObj }) {
  const [caweet, setCaweet] = useState('');
  const [caweets, setCaweets] = useState([]);

  useEffect(() => {
    db.collection('caweets').onSnapshot(snapshot => {
      const caweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCaweets(caweetArray);
    });
  }, []);

  const onSubmit = async ev => {
    ev.preventDefault();
    await db.collection('caweets').add({
      text: caweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      // userObj.photoUrl
    });
    setCaweet('');
  };
  const onChange = ev => {
    const { value } = ev.target;
    setCaweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={caweet}
          onChange={onChange}
          placeholder="무슨 생각을 하고 있나요?"
          maxLength={120}
        />
        <input type="submit" value="Caweet🥕" />
      </form>
      <div>
        {caweets.map(caweet => (
          <div key={caweet.id}>
            <h4>{caweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
