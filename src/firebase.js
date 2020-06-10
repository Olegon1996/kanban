import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCo5PES1-XQ9rp7zq9jssnm212PRehmlK4",
  authDomain: "parse-upwork.firebaseapp.com",
  databaseURL: "https://parse-upwork.firebaseio.com",
  projectId: "parse-upwork",
  storageBucket: "parse-upwork.appspot.com",
  messagingSenderId: "1077528839335",
  appId: "1:1077528839335:web:b95f8803a79f09927a8782",
  measurementId: "G-L0VM9RWBH6"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
