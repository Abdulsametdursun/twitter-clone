// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC7i66oRgCOtK6-GGAQo8Tjj0OzaJofIoM',
  authDomain: 'twitter-clone-aa5a9.firebaseapp.com',
  projectId: 'twitter-clone-aa5a9',
  storageBucket: 'twitter-clone-aa5a9.appspot.com',
  messagingSenderId: '330830745438',
  appId: '1:330830745438:web:d2bbd796f7ef42ae44c9cf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth reference
export const auth = getAuth(app);

// Google provider
export const provider = new GoogleAuthProvider();

// Database reference
export const db = getFirestore(app);

// media reference
export const storage = getStorage(app);
