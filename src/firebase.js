// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJV9PIhQ1lbMMFRnpQDaI4o0xJQ-1A3Ew",
  authDomain: "itstep-books.firebaseapp.com",
  databaseURL: "https://itstep-books-default-rtdb.firebaseio.com",
  projectId: "itstep-books",
  storageBucket: "itstep-books.appspot.com",
  messagingSenderId: "406126461490",
  appId: "1:406126461490:web:a548e2a7232f954dac322b",
  measurementId: "G-P4TL91WFX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);