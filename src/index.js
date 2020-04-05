import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";
import "./style/global.scss";

var firebaseConfig = {
  apiKey: "AIzaSyAmz5sbQot5U1angPPF5UyKzznooBBp_6c",
  authDomain: "facciolamiaparte-c9cec.firebaseapp.com",
  databaseURL: "https://facciolamiaparte-c9cec.firebaseio.com",
  projectId: "facciolamiaparte-c9cec",
  storageBucket: "facciolamiaparte-c9cec.appspot.com",
  messagingSenderId: "852527221872",
  appId: "1:852527221872:web:384f504b38a62fd838b8b5",
  measurementId: "G-4KVGGCZP4Z"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
