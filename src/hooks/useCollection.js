import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"
export const useCollection = (collection, _query, _orderBy) => {
    const [messages, setMessages] = useState(null)
    const [error, setError] = useState(null)
  

    useEffect(() => {
      const db = projectFirestore.collection('chatroom')
        .orderBy('createdAt')

      const unsubscribe = db.onSnapshot(
        (snapshot) => {
          let results = [];
          console.log("Snapshot is", snapshot);
          snapshot.docs.forEach((doc) => {
            if (doc.exists) {
              results.push({ ...doc.data(), id: doc.id });
            }
          });
          //update states
          setMessages(results);
          setError(null);
        },
        (error) => {
          console.log(error);
          setError("could not fetch the data");
        }
      );
      console.log('messages', messages);
      //unsub on unmount
      return () => unsubscribe();
    }, [collection]);
  
    
    return {messages, error}
}