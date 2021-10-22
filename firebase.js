// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDozTerG1muiZW8lPGEPsyZCsFJ4TJjxzc",
  authDomain: "next-instagram-clone-a5631.firebaseapp.com",
  projectId: "next-instagram-clone-a5631",
  storageBucket: "next-instagram-clone-a5631.appspot.com",
  messagingSenderId: "90923951950",
  appId: "1:90923951950:web:dc9d523aad42293d49201f",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
