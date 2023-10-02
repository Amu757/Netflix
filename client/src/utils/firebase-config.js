// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBSMaoTZNbjkpOiLhR91HLJwk3P5Q6FuRw",
    authDomain: "netflixclone-2c0bc.firebaseapp.com",
    projectId: "netflixclone-2c0bc",
    storageBucket: "netflixclone-2c0bc.appspot.com",
    messagingSenderId: "12739886429",
    appId: "1:12739886429:web:32905815a8116920b67cb4",
    measurementId: "G-QKHCBR16Z9"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);