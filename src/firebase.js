// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJqMvb0KsJ0yL7oDG7jx_KRYYFJC9xi6w",
  authDomain: "weather-app-89c38.firebaseapp.com",
  projectId: "weather-app-89c38",
  storageBucket: "weather-app-89c38.appspot.com",
  messagingSenderId: "1088650032831",
  appId: "1:1088650032831:web:f509ebdef470d48fa6b80a",
  measurementId: "G-657HN3EV78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);