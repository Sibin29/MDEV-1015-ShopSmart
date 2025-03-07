// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyCEshTohwNXEvW-Cv-CpctJSXXBKpiuU",
  authDomain: "shopsmart-react.firebaseapp.com",
  projectId: "shopsmart-react",
  storageBucket: "shopsmart-react.firebasestorage.app",
  messagingSenderId: "277253949154",
  appId: "1:277253949154:web:ab3f0fedbe0806b82c00bb",
  measurementId: "G-9F7RNFJ5RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);