// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeQL6Y2SupUY6QaKQ47A6kxl20oybKYOc",
  authDomain: "netflix-gpt-44480.firebaseapp.com",
  projectId: "netflix-gpt-44480",
  storageBucket: "netflix-gpt-44480.appspot.com",
  messagingSenderId: "124520638397",
  appId: "1:124520638397:web:df7b73fe1eb39318b5d4d4",
  measurementId: "G-KJE3V6RPPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();