import React, { useEffect, useState } from 'react';
import { db } from 'myFirebase';

export default function Home() {
  const [caweet, setCaweet] = useState('');
  const [caweets, setCaweets] = useState([]);

  useEffect(() => {
    const getCaweets = async () => {
      const caweetsFromDb = await db.collection('caweets').get();
      caweetsFromDb.forEach(document => {
        const caweetObject = {
          ...document.data(),
          id: document.id,
        };
        setCaweets(prev => [caweetObject, ...prev]);
      });
      return caweetsFromDb;
    };

    getCaweets();
  }, []);

  const onSubmit = async ev => {
    ev.preventDefault();
    await db.collection('caweets').add({ caweet, createdAt: Date.now() });
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
            <h4>{caweet.caweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
