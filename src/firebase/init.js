import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBJV9PIhQ1lbMMFRnpQDaI4o0xJQ-1A3Ew",
    authDomain: "itstep-books.firebaseapp.com",
    projectId: "itstep-books",
    storageBucket: "itstep-books.appspot.com",
    messagingSenderId: "406126461490",
    appId: "1:406126461490:web:a548e2a7232f954dac322b",
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app);

export{
  db,
  auth,
} 
