import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../styles/signup.module.scss'; 
import Navbar from '../components/Navbar';
import { register } from '../store/actions/authActionsCreator';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (authenticated === true) {
            router.push('/');
        }
    }, [authenticated]);

    const handleClick = () => {
        router.push('/signin');
    };

    const handleSignup = () => {
        dispatch(register(email, password, userName));
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <h2 className={styles.title}>Sign Up</h2>
            <input className={styles.input} type="text" placeholder="Display Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.btnContinue}`} onClick={handleSignup}>Continue</button>
            </div>
            <p className={styles.change} onClick={handleClick} >Already have an account?  → Log In</p>
        </div>
    );
};

export default Signup;