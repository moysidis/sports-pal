// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAY84YlavZkyB1sfEayfAJ68XkpimHepAA',
  authDomain: 'sports-pal-36bd0.firebaseapp.com',
  databaseURL:
    'https://sports-pal-36bd0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'sports-pal-36bd0',
  storageBucket: 'sports-pal-36bd0.appspot.com',
  messagingSenderId: '995180146711',
  appId: '1:995180146711:web:6b26a39280650de638ac52',
  measurementId: 'G-WYPG1LTZET',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
// const analytics = getAnalytics(app);

export { db, auth, storage };
