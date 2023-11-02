import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db, auth, setLocalPersistence} from '../firebase.js';
import { signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore";
import styles from '../styles/signup.module.scss'; 
import Navbar from '../components/Navbar';
import { login, loginWithGoogle} from '../store/actions/authActionsCreator';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => { 
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.displayName) {
                // const setGoogleDoc = async() => {
                //     const uid = user.uid;
                //     const usersCollection = collection(db, 'users');
                //     const userDocRef = doc(usersCollection, uid);
                //     const docSnapshot = await getDoc(userDocRef);
                //     if (docSnapshot.exists()) {
                //     } else {
                //         await setDoc(userDocRef, {
                //             uid: uid,
                //             name: user.displayName,
                //             email: user.email
                //         });
                //     }
                //     router.push('/');
                // }
                // setGoogleDoc();
                dispatch(loginWithGoogle());
                router.push('/');
            } else if (user){
                router.push('/');
            }
    });
        return () => unsubscribe();
    }, []);

    const router = useRouter();

    const handleClick = () => {
        router.push('/signup');
    };

    const handleSignin = () => {
        dispatch(login(email, password));
    };

    const handleSigninWithGoogle = async() => {
        const provider = new GoogleAuthProvider();
        await setLocalPersistence();
        signInWithRedirect(auth, provider);
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <h2 className={styles.title}>Log In</h2>
            <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.btnContinue}`} onClick={handleSignin}>Continue</button>
            </div> 
            <p className={styles.change} onClick={handleClick} >Don't have an account yet?  → Sign Up</p>
            <hr className={styles.hr}/>
            <div className={styles.btnContainer}>
                <div className={styles.btnGooleImg}></div>
                <button className={`${styles.btn} ${styles.btnGoogle}`} onClick={handleSigninWithGoogle}>Continue with Google</button>
            </div> 
        </div>
        
    );
};

export default Signin;