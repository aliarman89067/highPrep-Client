// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjRf4mK_3ciH_56F5JY-BfvSjxFbbXGoM",
  authDomain: "highprepschool.firebaseapp.com",
  projectId: "highprepschool",
  storageBucket: "highprepschool.appspot.com",
  messagingSenderId: "518689222976",
  appId: import.meta.env.FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
