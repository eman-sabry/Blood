import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import {
    getFirestore
} from "firebase/firestore";
import {
    getStorage
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANxOyWh9HKqGwaRKTgH2SyaVaKYnF1jUg",
    authDomain: "blood-donation-23a96.firebaseapp.com",
    projectId: "blood-donation-23a96",
    storageBucket: "blood-donation-23a96.firebasestorage.app",
    messagingSenderId: "938002951373",
    appId: "1:938002951373:web:6eefb5bbbd14292784cd84",
    measurementId: "G-9CBPBVXPBF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);