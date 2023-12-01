import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles  from '../styles/navbar.module.scss' 
import { useRouter } from 'next/router';
import { logout } from '../store/actions/authActionsCreator';
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

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
        <div className={styles.navbarListContanier}>
        <div className={styles.navbarList}>
            <div className={styles.navbarLeft}>
                <div className={styles.title} onClick={backHome}>Let's Draw Together!</div>
            </div>
            <div className={styles.navbarRight}>
                <button className={styles.itemButton} onClick={handleClickMyPage}>
                    My Rooms
                </button>
                <button className={styles.itemButton} onClick={handleClickRoom}>New Room</button>
                {authenticated ? (
                    <button className={styles.itemButton} onClick={handleClickSignout}>SignOut</button>
                ) : (
                    <button className={styles.itemButton} onClick={handleClickSignup}>Login / Signup</button>
                )}
            </div>
            <div className={styles.navbarRightSmall} onClick={handleToggle}>
                <GiHamburgerMenu size={40}/>
            </div>
        </div>
            {isOpen && (
                <div className={styles.dropdown}>
                    <div onClick={handleClickMyPage}>My Rooms</div>
                    <div onClick={handleClickRoom}>New Room</div>
                    {authenticated ? (
                    <div onClick={handleClickSignout}>SignOut</div>
                    ) : (
                    <div onClick={handleClickSignup}>Login / Signup</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;