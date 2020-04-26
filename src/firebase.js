import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmz5sbQot5U1angPPF5UyKzznooBBp_6c",
    authDomain: "facciolamiaparte-c9cec.firebaseapp.com",
    databaseURL: "https://facciolamiaparte-c9cec.firebaseio.com",
    projectId: "facciolamiaparte-c9cec",
    storageBucket: "facciolamiaparte-c9cec.appspot.com",
    messagingSenderId: "852527221872",
    appId: "1:852527221872:web:384f504b38a62fd838b8b5",
    measurementId: "G-4KVGGCZP4Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();