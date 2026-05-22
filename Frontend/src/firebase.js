// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "onereal-estate.firebaseapp.com",
  projectId: "onereal-estate",
  storageBucket: "onereal-estate.firebasestorage.app",
  messagingSenderId: "191783740374",
  appId: "1:191783740374:web:fb857eb05f977ee5de3a77"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);