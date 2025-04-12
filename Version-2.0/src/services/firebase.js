// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvMRmB_GyIWPQPezMdm1WamTrCsEZAXeY",
  authDomain: "first-sample-project-5da08.firebaseapp.com",
  databaseURL: "https://first-sample-project-5da08-default-rtdb.firebaseio.com",
  projectId: "first-sample-project-5da08",
  storageBucket: "first-sample-project-5da08.firebasestorage.app",
  messagingSenderId: "250706512412",
  appId: "1:250706512412:web:ef20110b09976978e7edd9",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
