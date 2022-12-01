import React, { useEffect } from 'react'
import './Home.css'

import Userstatus from '../components/Userstatus'
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';

export default function Home() {
  const {user}=useAuthContext()

  return (
    <div>
      <Userstatus username={user.displayName} uid={user.uid}/>
    </div>
  );
    
}
