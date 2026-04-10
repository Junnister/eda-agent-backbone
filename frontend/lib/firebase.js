import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY9sLrSS-N7Jw1Py8_VKU5EZt50qMEZqs",
  authDomain: "eda-agent-backbone.firebaseapp.com",
  projectId: "eda-agent-backbone",
  storageBucket: "eda-agent-backbone.firebasestorage.app",
  messagingSenderId: "622366923672",
  appId: "1:622366923672:web:71f53204d88d6e1f2ae9ed",
  measurementId: "G-3C3WFGWH6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

