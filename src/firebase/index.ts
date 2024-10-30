// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeukbVSnycp_9taRHT-FsERjH8-nv0GlU",
  authDomain: "highprepschool-client.firebaseapp.com",
  projectId: "highprepschool-client",
  storageBucket: "highprepschool-client.appspot.com",
  messagingSenderId: "1095130093524",
  appId: import.meta.env.FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
