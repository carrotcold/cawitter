import React, { useState } from 'react';
import { db } from 'myFirebase';

export default function Caweet({ caweetObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCaweet, setNewCaweet] = useState(caweetObj.text);

  const onDeleteClick = () => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      db.doc(`caweets/${caweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setIsEditing(prev => !prev);
  const onSubmit = async ev => {
    ev.preventDefault();
    console.log(caweetObj.text, newCaweet);
    await db.doc(`caweets/${caweetObj.id}`).update({
      text: newCaweet,
    });
    toggleEditing();
  };
  const onChange = ev => {
    const { value } = ev.target;
    setNewCaweet(value);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Edit your Caweet"
            value={newCaweet}
            onChange={onChange}
            required
          />
          <input type="submit" value="Update Caweet!" />
          <button onClick={toggleEditing}>Cancel</button>
        </form>
      ) : (
        <>
          <h4>{caweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Caweet</button>
              <button onClick={toggleEditing}>Edit Caweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
