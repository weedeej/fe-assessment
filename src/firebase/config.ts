// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvQq5k2Tyw5CsHcbEa0QRZ-KyCKeew0Bg",
  authDomain: "assessment-5d6b1.firebaseapp.com",
  projectId: "assessment-5d6b1",
  storageBucket: "assessment-5d6b1.appspot.com",
  messagingSenderId: "278119612938",
  appId: "1:278119612938:web:46f0ab57fbd5dfa00595f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);