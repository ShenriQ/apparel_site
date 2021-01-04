// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAEgAUuJzZBp5VQRQT62_eoH1U3NvMzA-Y",
    authDomain: "vendos-291d2.firebaseapp.com",
    databaseURL: "https://vendos-291d2-default-rtdb.firebaseio.com",
    projectId: "vendos-291d2",
    storageBucket: "vendos-291d2.appspot.com",
    messagingSenderId: "621498192205",
    appId: "1:621498192205:web:e8081cea603cd039ada704",
    measurementId: "G-K04LKWV32N"
};


// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);


export const db = app.firestore();
export const auth = firebase.auth();
export const storage = app.storage();
export const serverTime = firebase.firestore.FieldValue.serverTimestamp();