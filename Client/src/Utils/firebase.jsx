import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCYkKsLzn9iDeCH4o7ELUfnJoyExjLBiwE",
  authDomain: "return-treasure.firebaseapp.com",
  projectId: "return-treasure",
  storageBucket: "return-treasure.firebasestorage.app",
  messagingSenderId: "26716130647",
  appId: "1:26716130647:web:7c9488de51593f08cdc212"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };