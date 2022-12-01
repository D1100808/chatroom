import './Userstatus.css'
import React, { useEffect, useState } from 'react'
import SendIcon from "@mui/icons-material/Send";
import Userinputs from './Userinputs';
import { useDatabase } from '../hooks/useDatabase';

export default function Userstatus({username, uid}) {
  const [inputs, setInputs] = useState('')
  const { addMessage, response } = useDatabase('chatroom')

  const handleSubmit = (e) => {
    e.preventDefault()

    addMessage({
      uid,
      inputs,
      username
    })
  }

  useEffect(() => {
    if (response.success) {
      setInputs('')
    }
  }, [response.success])

  return (
    <div className="container">
      <div className="userinfo">
        <h3>Welcome to Chatroom</h3>
      </div>
      <div className="content">
        <Userinputs/>
      </div>
      <div className="messages">
        <form>
          <textarea onChange={(e)=>setInputs(e.target.value)} value={inputs}></textarea>
          <button onClick={handleSubmit}>
            <SendIcon
              style={{ height: "40px", width: "35px", color: "blueviolet", display:'flex', alignItems:'center' }}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
