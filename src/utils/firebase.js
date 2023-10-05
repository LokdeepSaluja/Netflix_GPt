// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRMjYUnRsP9lNADp97gzV1Wfw_2ljK1KQ",
  authDomain: "netflixgpt-2b2ef.firebaseapp.com",
  projectId: "netflixgpt-2b2ef",
  storageBucket: "netflixgpt-2b2ef.appspot.com",
  messagingSenderId: "742521158931",
  appId: "1:742521158931:web:210e86bf36cb18f779aee6",
  measurementId: "G-B24XB5D88B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export {auth}