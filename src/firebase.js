import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCSMOzyLKBZkP3iifCJ6UuYgNYo14Jg4t4",
  authDomain: "v4x11001.firebaseapp.com",
  projectId: "v4x11001",
  storageBucket: "v4x11001.appspot.com",
  messagingSenderId: "46452091653",
  appId: "1:46452091653:web:f7f0ab389b9eb9d907a56c",
  measurementId: "G-YBLYW99TNX",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
