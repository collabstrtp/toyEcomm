import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbzkb1bxtlDewZ7qxRfAxGK07BexFO7q8",
  authDomain: "returntreasure.firebaseapp.com",
  projectId: "returntreasure",
  storageBucket: "returntreasure.firebasestorage.app",
  messagingSenderId: "59748296700",
  appId: "1:59748296700:web:526c47bfae571cbc3c7479",
  measurementId: "G-MS503G45K5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
