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

    const handleClickRoom= () => {
        router.push('/rooms');
    };

    const handleClickMyPage= () => {
        router.push('/mypage');
    };

    const handleClickSignout = () => {
        dispatch(logout());
        if (router.asPath === '/') {
            window.location.reload();
        } else {
            router.push('/');
        }
    };

    return (
        <div className={styles.navbarList}>
            <div className={styles.navbarLeft}>
                <div className={styles.title} onClick={backHome}>Let's Draw Together!</div>
            </div>
            <div className={styles.navbarRight}>
                {authenticated && (
                    <button className={styles.itemButton} onClick={handleClickMyPage}>
                        My Rooms
                    </button>
                )}
                <button className={styles.itemButton} onClick={handleClickRoom}>New Room</button>
                {authenticated ? (
                    <button className={styles.itemButton} onClick={handleClickSignout}>SignOut</button>
                ) : (
                    <button className={styles.itemButton} onClick={handleClickSignup}>Login / Signup</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;