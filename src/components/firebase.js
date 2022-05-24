import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkv4TNxWiwQNbaEE2qS_l7UIX8AwZi43o",
  authDomain: "file-upload-c225b.firebaseapp.com",
  projectId: "file-upload-c225b",
  storageBucket: "file-upload-c225b.appspot.com",
  messagingSenderId: "596257002059",
  appId: "1:596257002059:web:88767a32869c81bed173ce",
  measurementId: "G-7QGJSHR0GZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
