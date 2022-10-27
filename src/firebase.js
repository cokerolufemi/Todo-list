// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYK3V6gePkLD3keF-8eDUnRDo7mPJZBUE",
  authDomain: "todolist-3eed7.firebaseapp.com",
  projectId: "todolist-3eed7",
  storageBucket: "todolist-3eed7.appspot.com",
  messagingSenderId: "791112646574",
  appId: "1:791112646574:web:7e351c9dce90438c24d23f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
