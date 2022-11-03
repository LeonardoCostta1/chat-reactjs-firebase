// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAdsXiCCobNfQkL4JUzMnbNdS9uNPBSEoc",
  // authDomain: "chat-7ba7f.firebaseapp.com",
  // databaseURL: "https://chat-7ba7f-default-rtdb.firebaseio.com",
  // projectId: "chat-7ba7f",
  // storageBucket: "chat-7ba7f.appspot.com",
  // messagingSenderId: "645426388708",
  // appId: "1:645426388708:web:4c18b59cb1c7a8f4d056f1"
  apiKey: "AIzaSyDfJumLjggT4iqhCyIYlbJOMSgenTVOC3Y",
  authDomain: "chattest-e74b8.firebaseapp.com",
  projectId: "chattest-e74b8",
  storageBucket: "chattest-e74b8.appspot.com",
  messagingSenderId: "595975356974",
  appId: "1:595975356974:web:65c66fb7cafc72922055bf",
  measurementId: "G-RQYFVLDDYW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);