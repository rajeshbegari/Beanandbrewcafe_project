import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCX65hJdBI2-ZR1SXlDqSK6Jpv_ocQfL_E",
    authDomain: "bean-and-brew-cafe.firebaseapp.com",
    databaseURL: "https://bean-and-brew-cafe-default-rtdb.firebaseio.com",
    projectId: "bean-and-brew-cafe",
    storageBucket: "bean-and-brew-cafe.appspot.com",
    messagingSenderId: "125472565718",
    appId: "1:125472565718:web:86d79619ce2589f8461c77",
    measurementId: "G-QNKXTM1GKJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };