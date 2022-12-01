import  './Login.css'
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const {login, isPending, error} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password);
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="title">Welcome</div>
          <div className="subtitle">Enter your account!</div>

          <div className="input-container ic2">
            <input
              className="input"
              type="text"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="cut cut-short"></div>
            <label htmlFor="email" className="placeholder">
              Email
            </label>
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

          {!isPending && (
            <button type="text" className="submit">
              submit
            </button>
          )}
          {isPending && (
            <button type="text" className="submit">
              pending...
            </button>
          )}
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}
