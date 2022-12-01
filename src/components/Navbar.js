import styles from './Navbar.module.css'

import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
  const { user } = useAuthContext()
  const { logout, error } = useLogout()
  
  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.title}>Chatroom</li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <span>Hello, {user.displayName}</span>
            </li>
            <li>
              <button className={styles.btn} onClick={logout}>
                logout
              </button>
            </li>
          </>
        )}
        {error && <p>{error}</p>}
      </ul>
    </div>
  );
}
