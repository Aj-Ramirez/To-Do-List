// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0NoAIvyAa31j9VpCglBAJXWzLX3Upx-M",
  authDomain: "to-do-list-app-b4f01.firebaseapp.com",
  projectId: "to-do-list-app-b4f01",
  storageBucket: "to-do-list-app-b4f01.appspot.com",
  messagingSenderId: "517689275318",
  appId: "1:517689275318:web:41b2f291359f2827884717",
  measurementId: "G-3TF60CT9S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);