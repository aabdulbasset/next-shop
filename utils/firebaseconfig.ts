
import { initializeApp } from "firebase/app";
import {getAuth,signOut} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAZCWT-Ft5TAyq-JUVvTf9XkhUin9FXgYA",
    authDomain: "realchit-e1bb9.firebaseapp.com",
    databaseURL: "https://realchit-e1bb9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "realchit-e1bb9",
    storageBucket: "realchit-e1bb9.appspot.com",
    messagingSenderId: "966066199801",
    appId: "1:966066199801:web:bc61ca480ee0f649a79628"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {
    app,
    auth,
    signOut
}