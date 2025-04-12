// src/firebase.js
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyBvMRmB_GyIWPQPezMdm1WamTrCsEZAXeY",
//   authDomain: "first-sample-project-5da08.firebaseapp.com",
//   databaseURL: "https://first-sample-project-5da08-default-rtdb.firebaseio.com",
//   projectId: "first-sample-project-5da08",
//   storageBucket: "first-sample-project-5da08.firebasestorage.app",
//   messagingSenderId: "250706512412",
//   appId: "1:250706512412:web:ef20110b09976978e7edd9",
// };


const firebaseConfig = {
  apiKey: "AIzaSyC0CH5zAgx8K34bQPf3KEHqD8UcilcFCNQ",
  authDomain: "neighbourgov.firebaseapp.com",
  databaseURL: "https://neighbourgov-default-rtdb.firebaseio.com",
      projectId: "neighbourgov",
      storageBucket: "neighbourgov.firebasestorage.app",
      messagingSenderId: "348825259497",
      appId: "1:348825259497:web:26f46d22939ac8844ccf78"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  export const auth = getAuth(app); // For authentication
  export const db = getFirestore(app); // For Firestore database
  export const database = getDatabase(app);
  
  // export { app, database };
export default app;
