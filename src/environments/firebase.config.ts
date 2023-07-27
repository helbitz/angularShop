// export const FireBaseConfig = {
//   apiKey: "<YOUR_API_KEY>",
//   authDomain: "<YOUR_AUTH_DOMAIN>",
//   databaseURL: "<YOUR_DATABASE_URL>",
//   projectId: "<YOUR_PROJECT_ID>",
//   storageBucket: "<YOUR_STORAGE_BUCKETS>",
//   messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
// };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// analytics broken
//import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const FireBaseConfig = {
  apiKey: "AIzaSyDsa02tnqmZeWSo4dmZgGhiteq9vCy8AoQ",
  authDomain: "web-shop-helbitz.firebaseapp.com",
  projectId: "web-shop-helbitz",
  databaseURL: "https://web-shop-helbitz-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "web-shop-helbitz.appspot.com",
  messagingSenderId: "358082016372",
  appId: "1:358082016372:web:6e96a3003531a6aa47cd21",
  measurementId: "G-HR86JSHH2D"
};

// Initialize Firebase
const app = initializeApp(FireBaseConfig);


// analytics broken
//const analytics = getAnalytics(app);