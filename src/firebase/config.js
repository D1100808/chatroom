import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDPyMPCU0hYqyLAdbvPVPoHsYa6wGOK3dc",
  authDomain: "chatroom-7400e.firebaseapp.com",
  projectId: "chatroom-7400e",
  storageBucket: "chatroom-7400e.appspot.com",
  messagingSenderId: "383178791564",
  appId: "1:383178791564:web:509b4e27237cb5456239a9",
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.Timestamp

export {projectAuth, projectFirestore, timestamp}