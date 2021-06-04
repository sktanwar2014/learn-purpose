import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYluB68jM1FRBKOhV1tDk4nQWSXTR6FUI",
  authDomain: "expo-signal-clone.firebaseapp.com",
  projectId: "expo-signal-clone",
  storageBucket: "expo-signal-clone.appspot.com",
  messagingSenderId: "788819814594",
  appId: "1:788819814594:web:9713ee4bdd6cc681b7335b"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };