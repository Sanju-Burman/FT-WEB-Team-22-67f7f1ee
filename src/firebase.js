// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0CH5zAgx8K34bQPf3KEHqD8UcilcFCNQ",
    authDomain: "neighbourgov.firebaseapp.com",
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
export default app;