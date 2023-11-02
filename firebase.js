require('dotenv').config();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: "465467127019",
    storageBucket:  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const setLocalPersistence = async () => {
    try {
        await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
        console.error('設置失敗', error);
    }
};