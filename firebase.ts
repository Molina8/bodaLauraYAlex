// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbsTrbAc9Dvmn8MpPczZWegzkt4s5LkWQ",
  authDomain: "bodalauraalex.firebaseapp.com",
  projectId: "bodalauraalex",
  storageBucket: "bodalauraalex.firebasestorage.app",
  messagingSenderId: "408611551513",
  appId: "1:408611551513:web:43678d49c2d68102926d88",
  measurementId: "G-9N3S5V90PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
