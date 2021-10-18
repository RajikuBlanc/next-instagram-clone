// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqe-PIld0XVySa9Nj_uFGtuPfVAdT_Fw4",
  authDomain: "instagram-clone-43120.firebaseapp.com",
  projectId: "instagram-clone-43120",
  storageBucket: "instagram-clone-43120.appspot.com",
  messagingSenderId: "729808149406",
  appId: "1:729808149406:web:a063f547bfc972223bd48f",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
