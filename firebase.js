require('dotenv').config();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,setPersistence, browserLocalPersistence } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCa498gniDpl8F3J6LmJ_1VMlAsea7FndI",
    authDomain: "let-s-draw-together--new.firebaseapp.com",
    projectId: "let-s-draw-together--new",
    storageBucket: "let-s-draw-together--new.appspot.com",
    messagingSenderId: "741132498109",
    appId: "1:741132498109:web:6235891a52a0d6da92f3d4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const setLocalPersistence = async () => {
    try {
        await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
        console.error('設置失敗', error);
    }
};