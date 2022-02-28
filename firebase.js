// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbQ-PRw0QByWvlU8WuBAZsRLfYR_g9YYo",
  authDomain: "reels-a961e.firebaseapp.com",
  projectId: "reels-a961e",
  storageBucket: "reels-a961e.appspot.com",
  messagingSenderId: "992051387676",
  appId: "1:992051387676:web:bf98e08a4cfedbe2f1eed9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication
const auth = getAuth();
// storage
const storage = getStorage();
// firestore
const db = getFirestore();


export { auth , storage, db };
export default app;
