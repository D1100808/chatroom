import React, { useEffect, useState } from 'react'
import { useCollection } from '../hooks/useCollection';
import './Userinputs.css'
import { useAuthContext } from "../hooks/useAuthContext";
export default function Userinputs() {
  const { messages, error } = useCollection('chatroom')
  const { user } = useAuthContext()
  useEffect(() => {
  }, [user])

  return (
    <div className="chat-list">
        {messages &&
          messages.map((m) => (
            <div key={m.id} className={m.uid === user.uid? 'user-message':'reverse'}>
              <h6 className="username">{m.username}</h6>
              <hr />
              <p>{m.inputs}</p>
              <hr />
              <span>{m.createdAt.toDate().toLocaleString()}</span>
            </div>
          ))}
        {error && <p>{error}</p>}
    </div>
  );
}
