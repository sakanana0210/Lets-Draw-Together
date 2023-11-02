import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles  from '../styles/navbar.module.scss' 
import { useRouter } from 'next/router';
import { logout } from '../store/actions/authActionsCreator';

function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const authenticated = useSelector((state) => state.auth.isAuthenticated);

    const backHome = () => {
        router.push('/');
    };

    const handleClickSignup = () => {
        router.push('/signin');
    };

    const handleClickSignout = () => {
        dispatch(logout());
        if (router.asPath === '/') {
            window.location.reload();
        } else {
            router.push('/');
        }
    };

    if (authenticated === true) {
        return (
            <div className={styles.navbarList}>
                <div className={styles.navbarLeft}>
                    <div className={styles.title} onClick={backHome}>Let's  Draw  Together!</div>
                </div>
                <div className={styles.navbarRight}>
                    <button className={styles.itemButton}>Rooms</button>
                    <button className={styles.itemButton} onClick={handleClickSignout}>SignOut</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.navbarList}>
                <div className={styles.navbarLeft}>
                    <div className={styles.title} onClick={backHome}>Let's  Draw  Together!</div>
                </div>
                <div className={styles.navbarRight}>
                    <button className={styles.itemButton}>Rooms</button>
                    <button className={styles.itemButton} onClick={handleClickSignup}>Login / Signup</button>
                </div>
            </div>
        );
    }
}

export default Navbar;