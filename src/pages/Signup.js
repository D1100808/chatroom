import './Signup.css'
import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("")
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, displayName)
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="title">Welcome</div>
          <div className="subtitle">Let's create your account!</div>

          <div className="input-container ic1">
            <input
              className="input"
              type="email"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="cut"></div>
            <label className="placeholder">Email</label>
          </div>

          <div className="input-container ic2">
            <input
              className="input"
              type="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="cut"></div>
            <label className="placeholder">Password</label>
          </div>

          <div className="input-container ic2">
            <input
              className="input"
              type="text"
              placeholder=" "
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
            <div className="cut cut-short"></div>
            <label className="placeholder">DisplayName</label>
          </div>
          {!isPending && (
            <button type="text" className="submit">
              submit
            </button>
          )}
          {isPending && (
            <button type="text" className="submit" disabled>
              pending...
            </button>
          )}
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}
