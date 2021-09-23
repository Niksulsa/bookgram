import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig=firebase.initializeApp({
    apiKey: "AIzaSyCZljDCmeIPwTaOX1DRVuUQGtHfAOFo8mU",
  authDomain: "bookgram-d5394.firebaseapp.com",
  projectId: "bookgram-d5394",
  databaseURL:'https://bookgram-d5394-default-rtdb.firebaseio.com/',
  storageBucket: "bookgram-d5394.appspot.com",
  messagingSenderId: "577777825958",
  appId: "1:577777825958:web:a6c210b1a02448ac08dc67",
  measurementId: "G-B03PCWZ6F4"
})


const db =firebaseConfig.firestore();
const auth=firebase.auth();
const storage=firebase.storage();



export {db,auth,storage};
export default firebaseConfig;

